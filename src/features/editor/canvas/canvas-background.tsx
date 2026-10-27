"use client";

import { useMemo } from "react";
import { Group, Image as KonvaImage, Rect } from "react-konva";
import { useImageElement } from "../hooks/use-image-element";
import { getKonvaBackgroundProps, isImageUrl } from "../lib/color-utils";

interface CanvasBackgroundProps {
  background: string;
  width: number;
  height: number;
}

function CanvasBackgroundImage({
  src,
  width,
  height,
}: {
  src: string;
  width: number;
  height: number;
}) {
  const { image, status } = useImageElement(src);

  if (status !== "loaded" || !image) return null;

  const imgW = image.naturalWidth || image.width || 1;
  const imgH = image.naturalHeight || image.height || 1;
  const canvasRatio = width / height;
  const imageRatio = imgW / imgH;

  let cropX = 0;
  let cropY = 0;
  let cropWidth = imgW;
  let cropHeight = imgH;

  if (imageRatio > canvasRatio) {
    cropWidth = imgH * canvasRatio;
    cropX = (imgW - cropWidth) / 2;
  } else {
    cropHeight = imgW / canvasRatio;
    cropY = (imgH - cropHeight) / 2;
  }

  return (
    <KonvaImage
      x={0}
      y={0}
      width={width}
      height={height}
      image={image}
      crop={{
        x: cropX,
        y: cropY,
        width: cropWidth,
        height: cropHeight,
      }}
      listening={false}
    />
  );
}

export function CanvasBackground({
  background,
  width,
  height,
}: CanvasBackgroundProps) {
  const isImage = isImageUrl(background);
  const isTransparent = background === "transparent";

  const checkerboardImage = useMemo(() => {
    if (typeof window === "undefined") return undefined;
    const img = new window.Image();
    img.src =
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><rect width='16' height='16' fill='%23ffffff'/><rect width='8' height='8' fill='%23e2e8f0'/><rect x='8' y='8' width='8' height='8' fill='%23e2e8f0'/></svg>";
    return img;
  }, []);

  const bgProps = useMemo(() => {
    if (isImage) {
      return { fill: "#ffffff", fillPriority: "color" as const };
    }
    if (isTransparent) {
      return { fill: "transparent", fillPriority: "color" as const };
    }
    return getKonvaBackgroundProps(background, width, height);
  }, [background, isImage, isTransparent, width, height]);

  return (
    <>
      {/* Base document shadow and background */}
      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        {...bgProps}
        shadowColor="rgba(0,0,0,0.25)"
        shadowBlur={5}
        shadowOffsetY={4}
        listening={false}
      />

      {/* If transparent, display subtle checkerboard pattern on canvas */}
      {isTransparent && checkerboardImage && (
        <Rect
          name="canvas-checkerboard"
          x={0}
          y={0}
          width={width}
          height={height}
          fillPriority="pattern"
          fillPatternImage={checkerboardImage}
          fillPatternRepeat="repeat"
          listening={false}
        />
      )}

      {/* If image background, render KonvaImage clipped to document bounds */}
      {isImage && (
        <Group
          clipX={0}
          clipY={0}
          clipWidth={width}
          clipHeight={height}
          listening={false}
        >
          <CanvasBackgroundImage
            src={background}
            width={width}
            height={height}
          />
        </Group>
      )}
    </>
  );
}
