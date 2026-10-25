export type BlendMode =
  | "source-over"
  | "multiply"
  | "screen"
  | "overlay"
  | "darken"
  | "lighten"
  | "color-dodge"
  | "color-burn"
  | "hard-light"
  | "soft-light"
  | "difference"
  | "exclusion"
  | "hue"
  | "saturation"
  | "color"
  | "luminosity";

export interface BaseNode {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  blendMode?: BlendMode;
  locked?: boolean;
}

export interface TextNode extends BaseNode {
  type: "text";
  text: string;
  fontSize: number;
  fontFamily: string;
  fill: string;
  align: "left" | "center" | "right" | "justify";
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
}

export interface ShapeNode extends BaseNode {
  type: "shape";
  shape: "rect" | "circle" | "triangle";
  fill: string;
  cornerRadius?: number;
}

export interface ImageNode extends BaseNode {
  type: "image";
  src: string;
  cornerRadius?: number;
}

export type EditorNode = TextNode | ShapeNode | ImageNode;

export interface DocumentSnapshot {
  title?: string;
  width: number;
  height: number;
  background: string;
  nodes: EditorNode[];
}
