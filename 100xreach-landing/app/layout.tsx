import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "100xReach — Clipping, Mass Posting & Managed Distribution",
  description:
    "Short-form clipping, high-volume managed publishing and authorized device operations for brands, creators and campaigns.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
