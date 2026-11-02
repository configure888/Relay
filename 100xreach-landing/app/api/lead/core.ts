/** Lead intake primitives: bounded parsing, strict qualification, fail-closed delivery. */
export const MAX_LEAD_BYTES = 8192;
export const WEBHOOK_TIMEOUT_MS = 8000;

export type Lead = {
  leadId: string;
  name: string;
  email: string;
  service: string;
  volume: string;
  goal: string;
  brief?: string;
  attribution?: Record<string, string>;
};

export class LeadInputError extends Error {
  readonly status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "LeadInputError";
  }
}

const serviceOptions = new Set([
  "Clipping + creative versioning",
  "Mass posting / managed distribution",
  "Phone farm / managed device campaign",
  "Full system — clipping + distribution",
]);
const volumeOptions = new Set([
  "30–100 posts / month",
  "100–500 posts / month",
  "500–2,000 posts / month",
  "2,000+ posts / month",
]);
const goalOptions = new Set([
  "More content from what we already make",
  "More distribution / posting volume",
  "Launch a product, creator or campaign",
  "Build an always-on content operation",
]);

/** Read bytes, not characters; reject oversized streams even if Content-Length is omitted or false. */
export async function readLeadJson(request: Request): Promise<unknown> {
  const contentType = request.headers.get("content-type") || "";
  if (!/^application\/json(?:\s*;|\s*$)/i.test(contentType)) {
    throw new LeadInputError("Expected JSON content.", 415);
  }
  const declared = request.headers.get("content-length");
  if (declared !== null && (!/^\d+$/.test(declared) || Number(declared) > MAX_LEAD_BYTES)) {
    throw new LeadInputError("Submission is too large.", 413);
  }
  if (!request.body) throw new LeadInputError("Missing submission.", 400);
  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let bytes = 0;
  let text = "";
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_LEAD_BYTES) throw new LeadInputError("Submission is too large.", 413);
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
  } catch (error) {
    if (error instanceof LeadInputError) throw error;
    throw new LeadInputError("Invalid submission body.", 400);
  } finally {
    reader.releaseLock();
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new LeadInputError("Invalid JSON.", 400);
  }
}

export function qualifyLead(raw: unknown): { kind: "honeypot" } | { kind: "valid"; lead: Lead } {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new LeadInputError("Invalid submission.", 400);
  }
  const body = raw as Record<string, unknown>;
  if (typeof body.companyWebsite === "string" && body.companyWebsite.trim()) {
    return { kind: "honeypot" };
  }
  const read = (key: string, max: number, required = true): string => {
    const value = body[key];
    if (value === undefined && !required) return "";
    if (typeof value !== "string") throw new LeadInputError("Invalid lead fields.", 400);
    const clean = value.trim();
    if ((required && !clean) || clean.length > max || /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(clean)) {
      throw new LeadInputError("Invalid lead fields.", 400);
    }
    return clean;
  };
  const name = read("name", 120);
  const email = read("email", 254).toLowerCase();
  const service = read("service", 120);
  const volume = read("volume", 80);
  const goal = read("goal", 120);
  const brief = read("brief", 2000, false);
  const leadId = body.leadId === undefined ? crypto.randomUUID() : read("leadId", 36);
  const attribution: Record<string, string> = {};
  for (const key of ["utmSource", "utmMedium", "utmCampaign", "utmContent", "utmTerm"]) {
    const value = read(key, 120, false);
    if (value) attribution[key] = value;
  }
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(leadId) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !serviceOptions.has(service) || !volumeOptions.has(volume) || !goalOptions.has(goal)) {
    throw new LeadInputError("Invalid lead fields.", 400);
  }
  return { kind: "valid", lead: { leadId, name, email, service, volume, goal, ...(brief ? { brief } : {}), ...(Object.keys(attribution).length ? { attribution } : {}) } };
}

export function validateWebhookUrl(raw: string | undefined): URL {
  if (!raw) throw new Error("LEAD_WEBHOOK_URL missing");
  const url = new URL(raw);
  if (url.protocol !== "https:" || !url.hostname || url.username || url.password || url.hash) {
    throw new Error("LEAD_WEBHOOK_URL must be a credential-free HTTPS URL");
  }
  const host = url.hostname.toLowerCase().replace(/\.$/, "");
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") ||
      host.endsWith(".internal") || /^\d+\.\d+\.\d+\.\d+$/.test(host) || host.includes(":")) {
    throw new Error("LEAD_WEBHOOK_URL must use a public DNS hostname");
  }
  return url;
}

export async function forwardLead(
  url: URL,
  lead: Lead,
  transport: typeof fetch = fetch,
): Promise<boolean> {
  const response = await transport(url.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json", "Idempotency-Key": lead.leadId },
    body: JSON.stringify({ source: "100xreach-landing", submittedAt: new Date().toISOString(), ...lead }),
    redirect: "error",
    cache: "no-store",
    signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
  });
  return response.ok;
}
