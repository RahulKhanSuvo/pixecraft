"use client";

import { Image as KonvaImage, Rect } from "react-konva";
import { useImageElement } from "../hooks/use-image-element";
import type { ImageNode } from "../types/editor-node";
import type { CommonNodeProps } from "./common-node-props";

interface Props {
  node: ImageNode;
  common: CommonNodeProps;
}

export function ImageNodeView({ node, common }: Props) {
  const { image, status } = useImageElement(node.src);

  if (status === "loading") {
    return (
      <Rect
        {...common}
        fill="#e5e7eb"
        cornerRadius={node.cornerRadius}
        listening={false}
      />
    );
  }

  if (status === "error" || !image) {
    return (
      <Rect
        {...common}
        fill="#fee2e2"
        stroke="#ef4444"
        strokeWidth={1}
        cornerRadius={node.cornerRadius}
      />
    );
  }

  return (
    <KonvaImage {...common} image={image} cornerRadius={node.cornerRadius} />
  );
}
