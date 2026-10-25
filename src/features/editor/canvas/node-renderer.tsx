"use client";

import type { KonvaEventObject } from "konva/lib/Node";
import { memo, useCallback } from "react";
import { useDocumentStore } from "../stores/document-store";
import { useSelectionStore } from "../stores/selection-store";
import type { EditorNode } from "../types/editor-node";
import type { CommonNodeProps } from "./common-node-props";
import { ImageNodeView } from "./image-node-view";
import { ShapeNodeView } from "./shape-node-view";
import { TextNodeView } from "./text-node-view";

interface NodeRendererProps {
  node: EditorNode;
}

function NodeRendererImpl({ node }: NodeRendererProps) {
  const select = useSelectionStore((s) => s.select);
  const updateNode = useDocumentStore((s) => s.updateNode);
  const beginTransaction = useDocumentStore((s) => s.beginTransaction);
  const endTransaction = useDocumentStore((s) => s.endTransaction);

  const handleSelect = useCallback(
    (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
      e.cancelBubble = true;
      select(node.id);
    },
    [node.id, select],
  );

  const handleDragStart = useCallback(
    (e: KonvaEventObject<DragEvent>) => {
      e.cancelBubble = true;
      beginTransaction();
    },
    [beginTransaction],
  );

  const handleDragMove = useCallback((e: KonvaEventObject<DragEvent>) => {
    e.cancelBubble = true;
  }, []);

  const handleDragEnd = useCallback(
    (e: KonvaEventObject<DragEvent>) => {
      e.cancelBubble = true;
      updateNode(node.id, { x: e.target.x(), y: e.target.y() });
      endTransaction();
    },
    [node.id, updateNode, endTransaction],
  );

  const common: CommonNodeProps = {
    id: node.id,
    x: node.x,
    y: node.y,
    width: node.width,
    height: node.height,
    rotation: node.rotation,
    opacity: node.opacity,
    globalCompositeOperation:
      (node.blendMode as GlobalCompositeOperation | undefined) ?? "source-over",
    draggable: !node.locked,
    onClick: handleSelect,
    onTap: handleSelect,
    onDragStart: handleDragStart,
    onDragMove: handleDragMove,
    onDragEnd: handleDragEnd,
  };

  switch (node.type) {
    case "text":
      return <TextNodeView node={node} common={common} />;
    case "shape":
      return <ShapeNodeView node={node} common={common} />;
    case "image":
      return <ImageNodeView node={node} common={common} />;
    default: {
      const _exhaustive: never = node;
      return _exhaustive;
    }
  }
}

export const NodeRenderer = memo(
  NodeRendererImpl,
  (prev, next) => prev.node === next.node,
);
