import { NextResponse } from "next/server";

const allowedKeys = new Set(["name", "email", "service", "volume", "goal", "brief"]);

export async function POST(request: Request) {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ ok: false, error: "Lead webhook is not configured." }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  if (typeof body.companyWebsite === "string" && body.companyWebsite.trim()) {
    return NextResponse.json({ ok: true });
  }

  const clean: Record<string, string> = {};
  for (const [key, value] of Object.entries(body)) {
    if (!allowedKeys.has(key) || typeof value !== "string") continue;
    clean[key] = value.trim().slice(0, key === "brief" ? 2000 : 300);
  }

  if (!clean.name || !clean.email || !clean.service || !clean.volume || !clean.goal) {
    return NextResponse.json({ ok: false, error: "Missing required lead fields." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)) {
    return NextResponse.json({ ok: false, error: "Invalid email." }, { status: 400 });
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: "viralgrid-landing",
      submittedAt: new Date().toISOString(),
      ...clean,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json({ ok: false, error: "Lead webhook rejected the submission." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
