"use client";

import type { KonvaEventObject } from "konva/lib/Node";
import { memo, useCallback } from "react";
import { Rect, Text } from "react-konva";
import { useDocumentStore } from "../stores/document-store";
import { useSelectionStore } from "../stores/selection-store";
import type { EditorNode } from "../types/editor-node";
import type { CommonNodeProps } from "./common-node-props";
import { ImageNodeView } from "./image-node-view";

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
    draggable: !node.locked,
    onClick: handleSelect,
    onTap: handleSelect,
    onDragStart: handleDragStart,
    onDragMove: handleDragMove,
    onDragEnd: handleDragEnd,
  };

  switch (node.type) {
    case "text":
      return (
        <Text
          {...common}
          text={node.text}
          fontSize={node.fontSize}
          fontFamily={node.fontFamily}
          fill={node.fill}
          align={node.align}
        />
      );
    case "shape":
      return (
        <Rect {...common} fill={node.fill} cornerRadius={node.cornerRadius} />
      );
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
