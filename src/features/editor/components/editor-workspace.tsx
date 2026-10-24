"use client";

import type Konva from "konva";
import { useEffect, useRef, useState } from "react";

import { EditorCanvas } from "./editor-canvas";
import { ViewportControls } from "./viewport-controls";

export function EditorWorkspace() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = (): void =>
      setSize({ width: el.clientWidth, height: el.clientHeight });
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      <EditorCanvas
        stageRef={stageRef}
        width={size.width}
        height={size.height}
      />
      <div className="absolute right-4 top-4 z-10">
        <ViewportControls stageRef={stageRef} />
      </div>
    </div>
  );
}
