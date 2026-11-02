import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const page = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

test("unconfigured lead intake offers Relay's published support address", () => {
  assert.match(page, /delivery === "unavailable" && <a className="email-fallback"/);
  assert.match(page, /mailto:support@relaydigital\.agency\?subject=100xReach%20campaign%20enquiry/);
});
test("fallback never claims automatic lead receipt", () => {
  assert.match(page, /your email app will open a draft for you to review and send/i);
  assert.match(page, /placement: "email_fallback"/);
});
test("fallback is keyboard-visible and touch-sized", () => {
  assert.match(css, /\.email-fallback:focus-visible\{outline:3px/);
  assert.match(css, /\.lead-unavailable \.email-fallback\{[^}]*min-height:48px/);
});
