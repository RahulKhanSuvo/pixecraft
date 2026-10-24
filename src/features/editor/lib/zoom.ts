import type { Point, Viewport } from "../types";

export const MIN_SCALE = 0.1;
export const MAX_SCALE = 8;
export const WHEEL_STEP = 1.08; // per wheel notch
export const PINCH_STEP = 1.01; // per ctrl+wheel (trackpad pinch)
export const BUTTON_FACTOR = 1.2; // per +/- click

const clamp = (v: number, lo: number, hi: number): number =>
  Math.min(hi, Math.max(lo, v));

/**
 * Compute the next viewport after scaling by `factor`, keeping the world
 * point under `anchor` (screen coordinates relative to the stage container)
 * fixed on screen.
 */
export function zoomAt(
  viewport: Viewport,
  anchor: Point,
  factor: number,
): Viewport {
  const oldScale = viewport.scale;
  const newScale = clamp(oldScale * factor, MIN_SCALE, MAX_SCALE);
  if (newScale === oldScale) return viewport;

  const worldX = (anchor.x - viewport.x) / oldScale;
  const worldY = (anchor.y - viewport.y) / oldScale;

  return {
    scale: newScale,
    x: anchor.x - worldX * newScale,
    y: anchor.y - worldY * newScale,
  };
}
