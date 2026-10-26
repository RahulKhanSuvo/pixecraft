"use client";

import type Konva from "konva";
import { useEffect, useRef, useState } from "react";
import { useEditorShortcuts } from "../hooks/use-editor-shortcuts";
import { calculateFitViewport } from "../lib/zoom";
import { useDocumentStore } from "../stores/document-store";
import { useViewportStore } from "../stores/viewport";
import { EditorCanvas } from "./editor-canvas";
import { ViewportControls } from "./viewport-controls";

export function EditorWorkspace() {
  useEditorShortcuts();
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const hasFittedRef = useRef(false);

  const docWidth = useDocumentStore((s) => s.width);
  const docHeight = useDocumentStore((s) => s.height);
  const lastDimensionsRef = useRef({ width: docWidth, height: docHeight });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const dimensionsChanged =
      lastDimensionsRef.current.width !== docWidth ||
      lastDimensionsRef.current.height !== docHeight;

    const update = (): void => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      setSize({ width: w, height: h });

      if ((!hasFittedRef.current || dimensionsChanged) && w > 0 && h > 0) {
        hasFittedRef.current = true;
        lastDimensionsRef.current = { width: docWidth, height: docHeight };
        const fit = calculateFitViewport(w, h, docWidth, docHeight);
        useViewportStore.getState().setViewport(fit);
      }
    };
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [docWidth, docHeight]);

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      <EditorCanvas
        stageRef={stageRef}
        width={size.width}
        height={size.height}
      />
      <div className="absolute left-4 bottom-4 z-10">
        <ViewportControls stageRef={stageRef} />
      </div>
    </div>
  );
}
