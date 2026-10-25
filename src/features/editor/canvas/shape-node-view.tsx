"use client";

import { memo } from "react";
import { Circle, Line, Rect } from "react-konva";
import { getKonvaBackgroundProps } from "../lib/color-utils";
import type { ShapeNode } from "../types/editor-node";
import type { CommonNodeProps } from "./common-node-props";

interface ShapeNodeViewProps {
  node: ShapeNode;
  common: CommonNodeProps;
}

export const ShapeNodeView = memo(function ShapeNodeView({
  node,
  common,
}: ShapeNodeViewProps) {
  const fillProps = getKonvaBackgroundProps(node.fill, node.width, node.height);

  switch (node.shape) {
    case "circle": {
      const radius = Math.min(node.width, node.height) / 2;
      return (
        <Circle
          {...common}
          x={node.x + radius}
          y={node.y + radius}
          radius={radius}
          {...fillProps}
        />
      );
    }
    case "triangle": {
      const points = [
        node.width / 2,
        0,
        node.width,
        node.height,
        0,
        node.height,
      ];
      return <Line {...common} points={points} closed {...fillProps} />;
    }
    default:
      return (
        <Rect {...common} cornerRadius={node.cornerRadius} {...fillProps} />
      );
  }
});
