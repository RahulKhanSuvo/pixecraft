"use client";

import { Resize01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { calculateFitViewport } from "../lib/zoom";
import { useDocumentStore } from "../stores/document-store";
import { useViewportStore } from "../stores/viewport";

const PRESETS = [
  { label: "Square (Post)", width: 1080, height: 1080 },
  { label: "Story / Reel", width: 1080, height: 1920 },
  { label: "YouTube Thumb", width: 1280, height: 720 },
  { label: "Full HD (16:9)", width: 1920, height: 1080 },
];

export function ResizeDialog() {
  const [open, setOpen] = useState(false);
  const currentWidth = useDocumentStore((s) => s.width);
  const currentHeight = useDocumentStore((s) => s.height);
  const setDocumentSize = useDocumentStore((s) => s.setDocumentSize);

  const [width, setWidth] = useState(currentWidth);
  const [height, setHeight] = useState(currentHeight);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setWidth(currentWidth);
      setHeight(currentHeight);
    }
    setOpen(isOpen);
  };

  const handleApply = (newW: number, newH: number) => {
    if (newW > 50 && newH > 50) {
      setDocumentSize(newW, newH);
      // Center and fit canvas in the viewport
      const stageEl = document.querySelector(".konvajs-content");
      if (stageEl) {
        const fit = calculateFitViewport(
          stageEl.clientWidth,
          stageEl.clientHeight,
          newW,
          newH,
        );
        useViewportStore.getState().setViewport(fit);
      }
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-[#7c3aed] text-white hover:bg-[#6d28d9] text-xs h-8 px-3">
          <HugeiconsIcon icon={Resize01Icon} size={15} aria-hidden="true" />
          Resize ({currentWidth} × {currentHeight})
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Canvas Resolution</DialogTitle>
          <DialogDescription>
            Change the layout dimensions for the current canvas.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3 py-2">
          <div className="space-y-1.5">
            <label
              htmlFor="canvas-width"
              className="text-xs font-medium text-foreground block"
            >
              Width (px)
            </label>
            <Input
              id="canvas-width"
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="h-8 text-xs"
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="canvas-height"
              className="text-xs font-medium text-foreground block"
            >
              Height (px)
            </label>
            <Input
              id="canvas-height"
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="h-8 text-xs"
            />
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-medium text-muted-foreground block">
            Popular Presets
          </span>
          <div className="grid grid-cols-2 gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => {
                  setWidth(preset.width);
                  setHeight(preset.height);
                }}
                className={`flex flex-col items-start rounded-lg border p-2.5 text-left transition-colors ${
                  width === preset.width && height === preset.height
                    ? "border-[#7c3aed] bg-[#7c3aed]/5"
                    : "border-border hover:bg-muted"
                }`}
              >
                <span className="text-xs font-medium text-foreground">
                  {preset.label}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {preset.width} × {preset.height} px
                </span>
              </button>
            ))}
          </div>
        </div>

        <DialogFooter className="pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen(false)}
            className="h-8 text-xs"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={() => handleApply(width, height)}
            className="h-8 text-xs bg-[#7c3aed] text-white hover:bg-[#6d28d9]"
          >
            Apply Resolution
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
