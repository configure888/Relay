/** Keep the decorative WebGL hero off constrained devices and motion-sensitive views. */
export type HeroSceneConditions = {
  isWideViewport: boolean;
  reducedMotion: boolean;
  saveData: boolean;
  deviceMemoryGB?: number;
  hardwareConcurrency?: number;
};

export function shouldRenderHeroScene({
  isWideViewport,
  reducedMotion,
  saveData,
  deviceMemoryGB,
  hardwareConcurrency,
}: HeroSceneConditions): boolean {
  return isWideViewport &&
    !reducedMotion &&
    !saveData &&
    (deviceMemoryGB === undefined || deviceMemoryGB >= 4) &&
    (hardwareConcurrency === undefined || hardwareConcurrency >= 4);
}
