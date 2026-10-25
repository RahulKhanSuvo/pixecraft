import type { ImageNode, ShapeNode, TextNode } from "../types/editor-node";
import { loadImage } from "./image-loader";
import { registerObjectUrl } from "./object-url-registry";

const MAX_FIT = 0.8;

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

async function fitImage(
  src: string,
  documentSize: { width: number; height: number },
): Promise<Omit<ImageNode, "id">> {
  const img = await loadImage(src);
  const scale = Math.min(
    (documentSize.width * MAX_FIT) / img.naturalWidth,
    (documentSize.height * MAX_FIT) / img.naturalHeight,
    1,
  );
  const width = Math.round(img.naturalWidth * scale);
  const height = Math.round(img.naturalHeight * scale);
  return {
    type: "image",
    src,
    x: Math.round((documentSize.width - width) / 2),
    y: Math.round((documentSize.height - height) / 2),
    width,
    height,
    rotation: 0,
    opacity: 1,
  };
}

export async function createImageNodeFromFile(
  file: File,
  documentSize: { width: number; height: number },
): Promise<ImageNode> {
  const src = URL.createObjectURL(file);
  registerObjectUrl(src);
  const base = await fitImage(src, documentSize);
  return { id: crypto.randomUUID(), ...base };
}

export async function createImageNodeFromUrl(
  src: string,
  documentSize: { width: number; height: number },
): Promise<ImageNode> {
  const base = await fitImage(src, documentSize);
  return { id: crypto.randomUUID(), ...base };
}
