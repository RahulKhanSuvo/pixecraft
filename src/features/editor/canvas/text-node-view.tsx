"use client";

import { memo } from "react";
import { Text as KonvaText } from "react-konva";
import { getKonvaBackgroundProps } from "../lib/color-utils";
import type { TextNode } from "../types/editor-node";
import type { CommonNodeProps } from "./common-node-props";
import { useTextInlineEditor } from "./use-text-inline-editor";

interface TextNodeViewProps {
  node: TextNode;
  common: CommonNodeProps;
}

export const TextNodeView = memo(function TextNodeView({
  node,
  common,
}: TextNodeViewProps) {
  const { textRef, isEditing, handleDblClick } = useTextInlineEditor(node);

  const fontStyleParts: string[] = [];
  if (node.bold) fontStyleParts.push("bold");
  if (node.italic) fontStyleParts.push("italic");
  const fontStyle = fontStyleParts.join(" ") || "normal";

  const textDecorationParts: string[] = [];
  if (node.underline) textDecorationParts.push("underline");
  if (node.strikethrough) textDecorationParts.push("line-through");
  const textDecoration = textDecorationParts.join(" ");

  // Omit fixed height so Konva naturally resizes vertically as text wraps or spans lines
  const { height: _fixedHeight, ...commonWithoutHeight } = common;
  const fillProps = getKonvaBackgroundProps(
    node.fill,
    node.width,
    node.fontSize,
  );

  return (
    <KonvaText
      ref={textRef}
      {...commonWithoutHeight}
      text={node.text}
      fontSize={node.fontSize}
      fontFamily={node.fontFamily}
      align={node.align}
      fontStyle={fontStyle}
      textDecoration={textDecoration}
      lineHeight={1.2}
      {...fillProps}
      opacity={isEditing ? 0 : node.opacity}
      draggable={common.draggable && !isEditing}
      onDblClick={handleDblClick}
      onDblTap={handleDblClick}
    />
  );
});
