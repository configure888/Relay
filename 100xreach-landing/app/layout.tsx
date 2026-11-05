import type { Metadata } from "next";
import "./globals.css";

// Canonical URL must be a confirmed public Relay route, not a temporary Vercel URL.
const requestedUrl = process.env.NEXT_PUBLIC_PUBLIC_URL;
const publicUrl = (() => {
  if (!requestedUrl) return null;
  try {
    const parsed = new URL(requestedUrl);
    return parsed.protocol === "https:" && parsed.hostname === "relaydigital.agency" && parsed.pathname === "/100xreach" && !parsed.search && !parsed.hash
      ? parsed.href
      : null;
  } catch { return null; }
})();
const indexable = Boolean(publicUrl) && process.env.VERCEL_ENV !== "preview";

export const metadata: Metadata = {
  metadataBase: publicUrl ? new URL("https://relaydigital.agency") : undefined,
  title: "100xReach — Clipping, Mass Posting & Managed Distribution",
  description:
    "Short-form clipping, high-volume managed publishing and authorized device operations for brands, creators and campaigns.",
  alternates: publicUrl ? { canonical: publicUrl } : undefined,
  openGraph: {
    type: "website",
    siteName: "100xReach by Relay Digital",
    title: "100xReach — Managed Clipping & Distribution",
    description: "Approved creative, real-device operations and accountable campaign distribution.",
    ...(publicUrl ? { url: publicUrl } : {}),
  },
  twitter: { card: "summary", title: "100xReach", description: "Clipping, managed publishing and authorized device operations." },
  robots: { index: indexable, follow: indexable },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
