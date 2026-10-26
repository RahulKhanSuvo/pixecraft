"use client";

import type Konva from "konva";
import type { KonvaEventObject } from "konva/lib/Node";
import { useCallback } from "react";
import { Group, Layer, Stage } from "react-konva";

import { CanvasBackground } from "../canvas/canvas-background";
import { NodesLayer } from "../canvas/nodes-layer";
import { SelectionTransformer } from "../canvas/selection-transformer";
import { useZoomPan } from "../hooks/useZoomPan";
import { useDocumentStore } from "../stores/document-store";
import { useSelectionStore } from "../stores/selection-store";
import { useViewportStore } from "../stores/viewport";

interface EditorCanvasProps {
  stageRef: React.RefObject<Konva.Stage | null>;
  width: number;
  height: number;
}

export function EditorCanvas({ stageRef, width, height }: EditorCanvasProps) {
  const viewport = useViewportStore((s) => s.viewport);
  const docWidth = useDocumentStore((s) => s.width);
  const docHeight = useDocumentStore((s) => s.height);
  const background = useDocumentStore((s) => s.background);
  const clearSelection = useSelectionStore((s) => s.clear);

  const { handleWheel, handleTouchMove, handleTouchEnd } = useZoomPan(stageRef);

  const handleDragEnd = useCallback((e: KonvaEventObject<DragEvent>): void => {
    const stage = e.target.getStage();
    if (!stage) return;
    const { viewport: v, setViewport } = useViewportStore.getState();
    setViewport({ ...v, x: stage.x(), y: stage.y() });
  }, []);

  const handleStageClick = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (e.target === e.target.getStage()) {
        clearSelection();
      }
    },
    [clearSelection],
  );

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
      onClick={handleStageClick}
      style={{ background: "#f5f5f5" }}
    >
      <Layer>
        <CanvasBackground
          background={background}
          width={docWidth}
          height={docHeight}
        />
        <Group clipX={0} clipY={0} clipWidth={docWidth} clipHeight={docHeight}>
          <NodesLayer />
        </Group>
        <SelectionTransformer />
      </Layer>
    </Stage>
  );
}
