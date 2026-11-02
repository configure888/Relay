# 100xReach Landing Page

Standalone CRO-focused landing page for the clipping, high-volume publishing and managed device-operations offer.

## Stack

- Next.js 16
- React 19
- React Three Fiber / Three.js
- GSAP + ScrollTrigger
- TypeScript

## Included

- 3D device-array hero
- Clipping / mass-posting / managed-device offer positioning
- Three-offer self-selection ladder
- CRO qualification and objection handling
- Dynamic campaign-plan CTA
- Mobile sticky close CTA
- Server-side lead webhook
- Honeypot filtering
- Conversion events for GTM/custom analytics

## Run locally

```bash
cd 100xreach-landing
npm install
npm run dev
```

## Lead delivery

Copy `.env.example` to `.env.local` and set:

```bash
LEAD_WEBHOOK_URL=https://your-secure-webhook.example/lead
```

The browser posts to `/api/lead`. The server validates and forwards qualified lead data to the configured private webhook.

## Conversion events

The frontend emits `cta_click`, `lead_submit`, `lead_success`, and `lead_error`. If `window.dataLayer` exists, events are also pushed there.

## Deployment

Recommended: create a Vercel project using `100xreach-landing` as the project root and configure `LEAD_WEBHOOK_URL` in the deployment environment.

## Delivery reliability and launch gate

The lead endpoint validates exact service/volume/goal choices, caps JSON submissions at 8 KiB, rejects invalid content types, and requires a public HTTPS webhook without credentials in its URL. It disables redirects, enforces an 8-second timeout, and reports a failed delivery as an error rather than a successful enquiry. No lead details are logged.

**A 2xx webhook response means the downstream service accepted the request, not proof of durable CRM storage.** Before launch, configure LEAD_WEBHOOK_URL as a server-only secret, verify the receiver durably stores enquiries and rejects duplicates, and run a real test submission end-to-end. There is no built-in rate limiter or queue; add these at the hosting/CRM layer for high traffic. The form remains unavailable without a configured webhook.

Run the standalone unit tests with Node 22+ using `npm test` in this subdirectory.

## Attribution and duplicate-safe handoff

The campaign form forwards only allowlisted, length-bounded UTM parameters (source, medium, campaign, content, term). It also creates a UUIDv4 lead ID and retains that ID when a failed submission is retried unchanged. The server forwards it in the JSON body and `Idempotency-Key` header. **The receiving CRM must enforce deduplication by lead ID**; the header alone does not prevent duplicates. A 2xx response still does not establish durable storage. No advertising click IDs, cookies, or referrer URLs are collected by this change.
