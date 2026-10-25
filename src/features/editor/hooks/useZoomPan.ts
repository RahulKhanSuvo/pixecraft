"use client";

import type Konva from "konva";
import type { KonvaEventObject } from "konva/lib/Node";
import { useCallback, useRef } from "react";
import { PINCH_STEP, WHEEL_STEP, zoomAt } from "../lib/zoom";
import { useViewportStore } from "../stores/viewport";
import type { Point } from "../types/zome";

interface PinchState {
  dist: number;
  scale: number;
}

export interface UseZoomPanResult {
  handleWheel: (e: KonvaEventObject<WheelEvent>) => void;
  handleTouchMove: (e: KonvaEventObject<TouchEvent>) => void;
  handleTouchEnd: (e: KonvaEventObject<TouchEvent>) => void;
  zoomBy: (factor: number) => void;
  reset: () => void;
}

export function useZoomPan(
  stageRef: React.RefObject<Konva.Stage | null>,
): UseZoomPanResult {
  const pinchRef = useRef<PinchState | null>(null);

  const apply = useCallback((factor: number, anchor: Point): void => {
    const { viewport, setViewport } = useViewportStore.getState();
    setViewport(zoomAt(viewport, anchor, factor));
  }, []);

  const handleWheel = useCallback(
    (e: KonvaEventObject<WheelEvent>): void => {
      e.evt.preventDefault();
      const stage = stageRef.current;
      if (!stage) return;

      // Ctrl (Win/Linux/Mac) or Cmd (Mac) → zoom.
      // Trackpad pinch on macOS is delivered as wheel + ctrlKey, so it
      // flows through the same branch. Everything else → pan.
      const isZoom = e.evt.ctrlKey || e.evt.metaKey;

      if (!isZoom) {
        // Plain wheel = pan. Negative signs match "scroll content" feel.
        const { panBy } = useViewportStore.getState();
        panBy(-e.evt.deltaX, -e.evt.deltaY);
        return;
      }

      stage.setPointersPositions(e.evt);
      const pointer = stage.getPointerPosition();
      if (!pointer) return;

      // Trackpad pinch emits small deltas; a wheel notch is ~100+.
      // Used only to pick a gentler step so pinch doesn't jump.
      const isPinch = Math.abs(e.evt.deltaY) < 10;
      const step = isPinch ? PINCH_STEP : WHEEL_STEP;
      const factor = e.evt.deltaY > 0 ? 1 / step : step;
      apply(factor, pointer);
    },
    [apply, stageRef],
  );

  const handleTouchMove = useCallback(
    (e: KonvaEventObject<TouchEvent>): void => {
      const stage = stageRef.current;
      if (!stage) return;

      const pts = stage.getPointersPositions();
      if (pts.length !== 2) return;
      e.evt.preventDefault();

      const [a, b] = pts;
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const mid: Point = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };

      if (!pinchRef.current) {
        pinchRef.current = {
          dist,
          scale: useViewportStore.getState().viewport.scale,
        };
        return;
      }

      const current = useViewportStore.getState().viewport.scale;
      if (current === 0) return;

      const target = pinchRef.current.scale * (dist / pinchRef.current.dist);
      apply(target / current, mid);
    },
    [apply, stageRef],
  );

  const handleTouchEnd = useCallback((): void => {
    pinchRef.current = null;
  }, []);

  const zoomBy = useCallback(
    (factor: number): void => {
      const stage = stageRef.current;
      if (!stage) return;
      apply(factor, { x: stage.width() / 2, y: stage.height() / 2 });
    },
    [apply, stageRef],
  );

  const reset = useViewportStore((s) => s.reset);

  return { handleWheel, handleTouchMove, handleTouchEnd, zoomBy, reset };
}
