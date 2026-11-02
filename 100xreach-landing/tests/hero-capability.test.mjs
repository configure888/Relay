import assert from "node:assert/strict";
import { test } from "node:test";
import { shouldRenderHeroScene } from "../lib/hero-capability.ts";

const desktop = { isWideViewport: true, reducedMotion: false, saveData: false };

test("enables decorative 3D on a capable desktop", () => {
  assert.equal(shouldRenderHeroScene({ ...desktop, deviceMemoryGB: 8, hardwareConcurrency: 8 }), true);
});

test("does not mount WebGL on narrow/mobile layouts", () => {
  assert.equal(shouldRenderHeroScene({ ...desktop, isWideViewport: false }), false);
});

test("respects prefers-reduced-motion", () => {
  assert.equal(shouldRenderHeroScene({ ...desktop, reducedMotion: true }), false);
});

test("respects browser data-saver preference", () => {
  assert.equal(shouldRenderHeroScene({ ...desktop, saveData: true }), false);
});

test("avoids WebGL on memory-constrained devices", () => {
  assert.equal(shouldRenderHeroScene({ ...desktop, deviceMemoryGB: 2 }), false);
});

test("avoids WebGL on low-core devices", () => {
  assert.equal(shouldRenderHeroScene({ ...desktop, hardwareConcurrency: 2 }), false);
});

test("allows browsers that do not expose hardware hints", () => {
  assert.equal(shouldRenderHeroScene(desktop), true);
});
