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
