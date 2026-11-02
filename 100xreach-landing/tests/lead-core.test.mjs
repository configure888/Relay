import assert from "node:assert/strict";
import test from "node:test";
import { forwardLead, LeadInputError, qualifyLead, readLeadJson, validateWebhookUrl, MAX_LEAD_BYTES, MAX_RECEIPT_BYTES } from "../app/api/lead/core.ts";

const good = { name: "Taylor Client", email: "TAYLOR@example.com", service: "Clipping + creative versioning", volume: "100–500 posts / month", goal: "More distribution / posting volume", brief: "Please call" };
const durableReceipt = (leadId, receiptId = "crm-123", status = 201) => Response.json({ ok: true, stored: true, leadId, receiptId }, { status });
const req = (body, headers = {}) => new Request("https://example.com/api/lead", { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body });

test("valid form matches frontend and normalizes email", () => {
  const result = qualifyLead(good);
  assert.equal(result.kind, "valid");
  assert.equal(result.lead.email, "taylor@example.com");
});
test("honeypot never reaches delivery", () => assert.equal(qualifyLead({ ...good, companyWebsite: "https://spam" }).kind, "honeypot"));
test("reject malformed lead types and unapproved selections", () => {
  for (const body of [null, [], { ...good, name: 5 }, { ...good, service: "bad" }, { ...good, email: "bad" }, { ...good, brief: "x".repeat(2001) }]) {
    assert.throws(() => qualifyLead(body), LeadInputError);
  }
});
test("read valid JSON body", async () => assert.deepEqual(await readLeadJson(req(JSON.stringify(good))), good));
test("reject malformed JSON, content type and empty bodies", async () => {
  for (const r of [req("{oops"), req("hello", { "Content-Type": "text/plain" }), req("")]) {
    await assert.rejects(readLeadJson(r), LeadInputError);
  }
});
test("reject excessive body with and without content-length", async () => {
  await assert.rejects(readLeadJson(req("x".repeat(MAX_LEAD_BYTES + 1))), e => e.status === 413);
  await assert.rejects(readLeadJson(req("{}", { "Content-Length": String(MAX_LEAD_BYTES + 1) })), e => e.status === 413);
});
test("webhook URL rejects insecure, local, credentialed and malformed URLs", () => {
  for (const raw of [undefined, "http://crm.example.com/lead", "https://user:pass@crm.example.com/lead", "https://localhost/lead", "https://127.0.0.1/lead", "https://[::1]/lead", "oops", "https://crm.example.com/lead#frag"]) {
    assert.throws(() => validateWebhookUrl(raw));
  }
  assert.equal(validateWebhookUrl("https://crm.example.com/lead").hostname, "crm.example.com");
});
test("delivery sends exact qualified fields and disallows redirects", async () => {
  let options;
  const success = await forwardLead(validateWebhookUrl("https://crm.example.com/lead"), qualifyLead(good).lead, async (url, init) => {
    assert.equal(url, "https://crm.example.com/lead");
    options = init;
    return durableReceipt(JSON.parse(init.body).leadId);
  });
  assert.equal(success, true);
  assert.equal(options.redirect, "error");
  const payload = JSON.parse(options.body);
  assert.equal(payload.source, "100xreach-landing");
  assert.equal(payload.email, "taylor@example.com");
  assert.equal(payload.companyWebsite, undefined);
});
test("non-2xx webhook is not reported as success", async () => {
  assert.equal(await forwardLead(validateWebhookUrl("https://crm.example.com"), qualifyLead(good).lead, async () => new Response(null, { status: 429 })), false);
});
test("network rejection propagates to route for 502 handling", async () => {
  await assert.rejects(forwardLead(validateWebhookUrl("https://crm.example.com"), qualifyLead(good).lead, async () => { throw new Error("network"); }), /network/);
});

test("campaign attribution is normalized and constrained", () => {
  const id = "f3d10aa8-7e0a-4d35-a3f2-38b2796b2b18";
  const lead = qualifyLead({ ...good, leadId: id, utmSource: "  google  ", utmCampaign: "pilot-nov", utmTerm: "" }).lead;
  assert.equal(lead.leadId, id);
  assert.deepEqual(lead.attribution, { utmSource: "google", utmCampaign: "pilot-nov" });
  assert.throws(() => qualifyLead({ ...good, leadId: "not-a-uuid" }), LeadInputError);
  assert.throws(() => qualifyLead({ ...good, utmCampaign: "x".repeat(121) }), LeadInputError);
  assert.throws(() => qualifyLead({ ...good, utmMedium: "spam\u0000" }), LeadInputError);
});

test("webhook forwards a stable lead ID for receiver-side deduplication", async () => {
  const lead = qualifyLead({ ...good, leadId: "f3d10aa8-7e0a-4d35-a3f2-38b2796b2b18", utmMedium: "paid-social" }).lead;
  const captured = [];
  const transport = async (_url, init) => { captured.push(init); return durableReceipt(JSON.parse(init.body).leadId); };
  await forwardLead(validateWebhookUrl("https://crm.example.com/lead"), lead, transport);
  await forwardLead(validateWebhookUrl("https://crm.example.com/lead"), lead, transport);
  assert.equal(captured[0].headers["Idempotency-Key"], lead.leadId);
  assert.equal(captured[1].headers["Idempotency-Key"], lead.leadId);
  assert.equal(JSON.parse(captured[0].body).leadId, lead.leadId);
  assert.equal(JSON.parse(captured[0].body).attribution.utmMedium, "paid-social");
});


test("2xx webhook without a durable receipt never reports a lead captured", async () => {
  const lead = qualifyLead(good).lead;
  const endpoint = validateWebhookUrl("https://crm.example.com/lead");
  for (const response of [
    new Response(null, { status: 204 }),
    new Response("accepted", { status: 200 }),
    Response.json({ ok: true }, { status: 200 }),
    Response.json({ ok: true, stored: false, leadId: lead.leadId, receiptId: "123" }),
    Response.json({ ok: true, stored: true, leadId: "different", receiptId: "123" }),
    Response.json({ ok: true, stored: true, leadId: lead.leadId }),
    new Response("{broken", { status: 200, headers: { "content-type": "application/json" } }),
  ]) {
    assert.equal(await forwardLead(endpoint, lead, async () => response), false);
  }
});

test("bounded receipt parsing rejects forged and declared oversize responses", async () => {
  const lead = qualifyLead(good).lead;
  const endpoint = validateWebhookUrl("https://crm.example.com/lead");
  const tooLarge = JSON.stringify({ ok: true, stored: true, leadId: lead.leadId, receiptId: "x".repeat(MAX_RECEIPT_BYTES) });
  assert.equal(await forwardLead(endpoint, lead, async () => new Response(tooLarge, {
    headers: { "content-type": "application/json" },
  })), false);
  assert.equal(await forwardLead(endpoint, lead, async () => new Response("{}", {
    headers: { "content-type": "application/json", "content-length": String(MAX_RECEIPT_BYTES + 1) },
  })), false);
});

test("valid persisted receipt must match leadId and include a CRM record ID", async () => {
  const lead = qualifyLead(good).lead;
  const endpoint = validateWebhookUrl("https://crm.example.com/lead");
  assert.equal(await forwardLead(endpoint, lead, async () => durableReceipt(lead.leadId, "crm-123", 201)), true);
  assert.equal(await forwardLead(endpoint, lead, async () => durableReceipt(lead.leadId, "crm-123", 200)), true);
  assert.equal(await forwardLead(endpoint, lead, async () => durableReceipt(lead.leadId, "\u0000bad")), false);
});

test("form readiness fails closed without a validated HTTPS receiver", async () => {
  const { isLeadDeliveryConfigured } = await import("../app/api/lead/core.ts");
  for (const raw of [undefined, "", "http://crm.example.com/lead", "https://localhost/lead", "https://127.0.0.1/lead", "https://user:pass@crm.example.com/lead", "invalid"]) {
    assert.equal(isLeadDeliveryConfigured(raw), false);
  }
  assert.equal(isLeadDeliveryConfigured("https://crm.example.com/lead"), true);
});
