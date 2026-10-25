"use client";

import type Konva from "konva";
import type { KonvaEventObject } from "konva/lib/Node";
import { useEffect, useRef } from "react";
import { Transformer } from "react-konva";
import { useDocumentStore } from "../stores/document-store";
import { useSelectionStore } from "../stores/selection-store";

export function SelectionTransformer() {
  const trRef = useRef<Konva.Transformer | null>(null);
  const selectedIds = useSelectionStore((s) => s.selectedIds);

  const nodes = useDocumentStore((s) => s.nodes);

  const isTextSelected =
    selectedIds.length === 1 &&
    nodes.find((n) => n.id === selectedIds[0])?.type === "text";

  useEffect(() => {
    const tr = trRef.current;
    if (!tr) return;
    const stage = tr.getStage();
    if (!stage) return;

    const stageNodes = selectedIds
      .map((id) => stage.findOne(`#${id}`))
      .filter((n): n is Konva.Node => Boolean(n));

    tr.nodes(stageNodes);
    tr.getLayer()?.batchDraw();
  }, [selectedIds]);

  const handleTransformStart = () => {
    useDocumentStore.getState().beginTransaction();
  };

  const handleTransform = () => {
    const tr = trRef.current;
    if (!tr) return;

    const anchor = tr.getActiveAnchor();
    if (anchor !== "middle-left" && anchor !== "middle-right") return;

    const stage = tr.getStage();
    if (!stage) return;

    const { nodes: currentNodes } = useDocumentStore.getState();

    for (const id of selectedIds) {
      const src = currentNodes.find((n) => n.id === id);
      if (src?.type !== "text") continue;

      const kNode = stage.findOne(`#${id}`) as Konva.Text | undefined;
      if (!kNode) continue;

      const scaleX = kNode.scaleX();
      kNode.setAttrs({
        width: Math.max(20, kNode.width() * scaleX),
        scaleX: 1,
      });
    }
  };

  const handleTransformEnd = () => {
    const tr = trRef.current;
    const stage = tr?.getStage();
    if (!tr || !stage) return;

    const {
      nodes: currentNodes,
      updateNode,
      endTransaction,
    } = useDocumentStore.getState();

    for (const id of selectedIds) {
      const kNode = stage.findOne(`#${id}`);
      const src = currentNodes.find((n) => n.id === id);
      if (!kNode || !src) continue;

      const scaleX = kNode.scaleX();
      const scaleY = kNode.scaleY();

      if (src.type === "text") {
        const isWidthOnlyDrag = Math.abs(scaleY - 1) < 0.01;

        if (isWidthOnlyDrag) {
          // User dragged side anchor to adjust wrapping width
          // kNode.scaleX was kept at 1 during drag and width updated smoothly
          const finalWidth = Math.max(20, Math.round(kNode.width() * scaleX));
          kNode.scaleX(1);
          kNode.scaleY(1);

          updateNode(id, {
            x: kNode.x(),
            y: kNode.y(),
            width: finalWidth,
            rotation: kNode.rotation(),
          });
        } else {
          // User dragged corner anchor to scale font size proportionally
          const averageScale = (Math.abs(scaleX) + Math.abs(scaleY)) / 2;
          const newFontSize = Math.max(
            8,
            Math.round(src.fontSize * averageScale),
          );
          const newWidth = Math.max(20, Math.round(kNode.width() * scaleX));

          kNode.scaleX(1);
          kNode.scaleY(1);

          updateNode(id, {
            x: kNode.x(),
            y: kNode.y(),
            width: newWidth,
            fontSize: newFontSize,
            rotation: kNode.rotation(),
          });
        }
      } else {
        updateNode(id, {
          x: kNode.x(),
          y: kNode.y(),
          width: Math.max(1, Math.round(src.width * scaleX)),
          height: Math.max(1, Math.round(src.height * scaleY)),
          rotation: kNode.rotation(),
        });

        kNode.scaleX(1);
        kNode.scaleY(1);
      }
    }

    endTransaction();
  };

  const handleClickEmpty = (_e: KonvaEventObject<MouseEvent>) => {
    // noop - transformer doesn't need click handling
  };

  return (
    <Transformer
      ref={trRef}
      rotateEnabled
      keepRatio={isTextSelected}
      enabledAnchors={
        isTextSelected
          ? [
              "top-left",
              "top-right",
              "bottom-left",
              "bottom-right",
              "middle-left",
              "middle-right",
            ]
          : undefined
      }
      boundBoxFunc={(oldBox, newBox) => {
        if (newBox.width < 10 || newBox.height < 10) return oldBox;
        return newBox;
      }}
      anchorSize={8}
      anchorCornerRadius={2}
      anchorStroke="#6366f1"
      anchorFill="#ffffff"
      anchorStrokeWidth={1.5}
      borderStroke="#6366f1"
      borderStrokeWidth={1.5}
      borderDash={[]}
      padding={2}
      rotateAnchorOffset={20}
      onTransformStart={handleTransformStart}
      onTransform={handleTransform}
      onTransformEnd={handleTransformEnd}
      onClick={handleClickEmpty}
    />
  );
}
