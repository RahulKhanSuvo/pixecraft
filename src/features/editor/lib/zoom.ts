import type { Point, Viewport } from "../types/zome";

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

/**
 * Calculate the viewport to center and fit a document of (docWidth, docHeight)
 * within a container of (containerWidth, containerHeight) with padding.
 */
export function calculateFitViewport(
  containerWidth: number,
  containerHeight: number,
  docWidth: number,
  docHeight: number,
  padding = 64,
): Viewport {
  if (
    containerWidth <= 0 ||
    containerHeight <= 0 ||
    docWidth <= 0 ||
    docHeight <= 0
  ) {
    return { scale: 1, x: 0, y: 0 };
  }

  const availableWidth = Math.max(containerWidth - padding * 2, 50);
  const availableHeight = Math.max(containerHeight - padding * 2, 50);

  const scale = clamp(
    Math.min(availableWidth / docWidth, availableHeight / docHeight),
    MIN_SCALE,
    1,
  );

  const x = Math.round((containerWidth - docWidth * scale) / 2);
  const y = Math.round((containerHeight - docHeight * scale) / 2);

  return { scale, x, y };
}
