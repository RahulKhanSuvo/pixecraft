"use client";

import {
  MinusSignIcon,
  PlusSignIcon,
  RefreshIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type Konva from "konva";
import { Button } from "@/components/ui/button";

import { useZoomPan } from "../hooks/useZoomPan";
import { BUTTON_FACTOR } from "../lib/zoom";
import { selectScale, useViewportStore } from "../stores/viewport";

interface ViewportControlsProps {
  stageRef: React.RefObject<Konva.Stage | null>;
}

export function ViewportControls({ stageRef }: ViewportControlsProps) {
  const scale = useViewportStore(selectScale);
  const { zoomBy, reset } = useZoomPan(stageRef);

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-background p-1 shadow-sm">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => zoomBy(1 / BUTTON_FACTOR)}
        aria-label="Zoom out"
      >
        <HugeiconsIcon icon={MinusSignIcon} size={16} />
      </Button>
      <span className="min-w-12 text-center text-xs tabular-nums">
        {Math.round(scale * 100)}%
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => zoomBy(BUTTON_FACTOR)}
        aria-label="Zoom in"
      >
        <HugeiconsIcon icon={PlusSignIcon} size={16} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={reset}
        aria-label="Reset view"
      >
        <HugeiconsIcon icon={RefreshIcon} size={16} />
      </Button>
    </div>
  );
}
