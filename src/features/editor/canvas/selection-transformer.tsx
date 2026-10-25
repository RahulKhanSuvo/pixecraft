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

  useEffect(() => {
    const tr = trRef.current;
    if (!tr) return;
    const stage = tr.getStage();
    if (!stage) return;

    const nodes = selectedIds
      .map((id) => stage.findOne(`#${id}`))
      .filter((n): n is Konva.Node => Boolean(n));

    tr.nodes(nodes);
    tr.getLayer()?.batchDraw();
  }, [selectedIds]);

  const handleTransformStart = () => {
    useDocumentStore.getState().beginTransaction();
  };

  const handleTransformEnd = () => {
    const tr = trRef.current;
    const stage = tr?.getStage();
    if (!tr || !stage) return;

    const { nodes, updateNode, endTransaction } = useDocumentStore.getState();

    for (const id of selectedIds) {
      const kNode = stage.findOne(`#${id}`);
      const src = nodes.find((n) => n.id === id);
      if (!kNode || !src) continue;

      const scaleX = kNode.scaleX();
      const scaleY = kNode.scaleY();

      updateNode(id, {
        x: kNode.x(),
        y: kNode.y(),
        width: Math.max(1, src.width * scaleX),
        height: Math.max(1, src.height * scaleY),
        rotation: kNode.rotation(),
      });

      kNode.scaleX(1);
      kNode.scaleY(1);
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
      keepRatio={false}
      boundBoxFunc={(oldBox, newBox) => {
        if (newBox.width < 8 || newBox.height < 8) return oldBox;
        return newBox;
      }}
      onTransformStart={handleTransformStart}
      onTransformEnd={handleTransformEnd}
      onClick={handleClickEmpty}
    />
  );
}
