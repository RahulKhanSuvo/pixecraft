import { create } from "zustand";
import type { Viewport } from "../types";

const INITIAL: Viewport = { scale: 1, x: 0, y: 0 };

interface ViewportState {
  viewport: Viewport;
  setViewport: (v: Viewport | ((prev: Viewport) => Viewport)) => void;
  reset: () => void;
}

export const useViewportStore = create<ViewportState>((set) => ({
  viewport: INITIAL,
  setViewport: (v) =>
    set((s) => ({
      viewport: typeof v === "function" ? v(s.viewport) : v,
    })),
  reset: () => set({ viewport: INITIAL }),
}));

// Selectors — keep subscriptions narrow
export const selectViewport = (s: ViewportState) => s.viewport;
export const selectScale = (s: ViewportState) => s.viewport.scale;
