import { create } from "zustand";
import type { Viewport } from "../types/zome";

const INITIAL: Viewport = { scale: 1, x: 0, y: 0 };

interface ViewportState {
  viewport: Viewport;
  setViewport: (v: Viewport | ((prev: Viewport) => Viewport)) => void;
  panBy: (dx: number, dy: number) => void;
  reset: () => void;
}

export const useViewportStore = create<ViewportState>((set) => ({
  viewport: INITIAL,
  setViewport: (v) =>
    set((s) => ({
      viewport: typeof v === "function" ? v(s.viewport) : v,
    })),
  panBy: (dx, dy) =>
    set((s) => ({
      viewport: { ...s.viewport, x: s.viewport.x + dx, y: s.viewport.y + dy },
    })),
  reset: () => set({ viewport: INITIAL }),
}));

export const selectViewport = (s: ViewportState) => s.viewport;
export const selectScale = (s: ViewportState) => s.viewport.scale;
