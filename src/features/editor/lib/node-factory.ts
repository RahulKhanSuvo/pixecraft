import type { ShapeNode, TextNode } from "../types/editor-node";

export function createTextNode(overrides: Partial<TextNode> = {}): TextNode {
  return {
    id: crypto.randomUUID(),
    type: "text",
    x: 100,
    y: 100,
    width: 280,
    height: 80,
    rotation: 0,
    opacity: 1,
    text: "Your text",
    fontSize: 32,
    fontFamily: "Inter",
    fill: "#111111",
    align: "left",
    ...overrides,
  };
}

export function createRectNode(overrides: Partial<ShapeNode> = {}): ShapeNode {
  return {
    id: crypto.randomUUID(),
    type: "shape",
    shape: "rect",
    x: 100,
    y: 100,
    width: 200,
    height: 200,
    rotation: 0,
    opacity: 1,
    fill: "#6366f1",
    ...overrides,
  };
}
