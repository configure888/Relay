import assert from "node:assert/strict";
import test from "node:test";
import { forwardLead, LeadInputError, qualifyLead, readLeadJson, validateWebhookUrl, MAX_LEAD_BYTES } from "../app/api/lead/core.ts";

const good = { name: "Taylor Client", email: "TAYLOR@example.com", service: "Clipping + creative versioning", volume: "100–500 posts / month", goal: "More distribution / posting volume", brief: "Please call" };
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
    return new Response(null, { status: 202 });
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
