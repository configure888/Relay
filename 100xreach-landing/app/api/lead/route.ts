import { NextResponse } from "next/server";
import { forwardLead, isLeadDeliveryConfigured, LeadInputError, qualifyLead, readLeadJson, validateWebhookUrl } from "./core";

export const runtime = "nodejs";

// Public readiness is boolean-only: never disclose the webhook URL.
export async function GET() {
  return NextResponse.json(
    { available: isLeadDeliveryConfigured(process.env.LEAD_WEBHOOK_URL) },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  // Fail closed before accepting data. Do not expose configuration details to visitors.
  let webhook: URL;
  try {
    webhook = validateWebhookUrl(process.env.LEAD_WEBHOOK_URL);
  } catch {
    console.error("100xReach lead delivery is not configured correctly");
    return NextResponse.json({ ok: false, error: "Submission is temporarily unavailable." }, { status: 503 });
  }

  try {
    const result = qualifyLead(await readLeadJson(request));
    if (result.kind === "honeypot") return NextResponse.json({ ok: true });
    const accepted = await forwardLead(webhook, result.lead);
    if (!accepted) {
      console.error("100xReach lead webhook returned a non-success status");
      return NextResponse.json({ ok: false, error: "Submission could not be delivered. Please try again." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof LeadInputError) {
      return NextResponse.json({ ok: false, error: error.message }, { status: error.status });
    }
    console.error("100xReach lead delivery failed", error instanceof Error ? error.name : "unknown error");
    return NextResponse.json({ ok: false, error: "Submission could not be delivered. Please try again." }, { status: 502 });
  }
}
