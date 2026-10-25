"use client";

import type Konva from "konva";
import type { KonvaEventObject } from "konva/lib/Node";
import { useCallback } from "react";
import { Layer, Stage } from "react-konva";

import { useZoomPan } from "../hooks/useZoomPan";
import { useViewportStore } from "../stores/viewport";

interface EditorCanvasProps {
  stageRef: React.RefObject<Konva.Stage | null>;
  width: number;
  height: number;
}

export function EditorCanvas({ stageRef, width, height }: EditorCanvasProps) {
  const viewport = useViewportStore((s) => s.viewport);
  const { handleWheel, handleTouchMove, handleTouchEnd } = useZoomPan(stageRef);

  const handleDragEnd = useCallback((e: KonvaEventObject<DragEvent>): void => {
    const stage = e.target.getStage();
    if (!stage) return;
    const { viewport: v, setViewport } = useViewportStore.getState();
    setViewport({ ...v, x: stage.x(), y: stage.y() });
  }, []);
  console.log(width);
  return (
    <Stage
      ref={stageRef}
      width={width}
      height={height}
      x={viewport.x}
      y={viewport.y}
      scaleX={viewport.scale}
      scaleY={viewport.scale}
      draggable
      onWheel={handleWheel}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onDragEnd={handleDragEnd}
      style={{ background: "#f5f5f5" }}
    >
      <Layer></Layer>
    </Stage>
  );
}
