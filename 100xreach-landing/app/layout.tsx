import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VIRAL//GRID — Clipping & Managed Short-Form Distribution",
  description:
    "Short-form clipping, managed multi-account publishing and authorized device-fleet operations for brands, creators and campaigns.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
