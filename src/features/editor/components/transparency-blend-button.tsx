"use client";

import { Layers01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { BlendMode } from "../types/editor-node";

const BLEND_MODES: { value: BlendMode; label: string }[] = [
  { value: "source-over", label: "Normal" },
  { value: "multiply", label: "Multiply" },
  { value: "screen", label: "Screen" },
  { value: "overlay", label: "Overlay" },
  { value: "darken", label: "Darken" },
  { value: "lighten", label: "Lighten" },
  { value: "color-dodge", label: "Color Dodge" },
  { value: "color-burn", label: "Color Burn" },
  { value: "hard-light", label: "Hard Light" },
  { value: "soft-light", label: "Soft Light" },
  { value: "difference", label: "Difference" },
  { value: "exclusion", label: "Exclusion" },
  { value: "hue", label: "Hue" },
  { value: "saturation", label: "Saturation" },
  { value: "color", label: "Color" },
  { value: "luminosity", label: "Luminosity" },
];

interface TransparencyBlendButtonProps {
  opacity: number;
  blendMode?: BlendMode;
  onOpacityChange: (opacity: number) => void;
  onBlendModeChange: (blendMode: BlendMode) => void;
}

export function TransparencyBlendButton({
  opacity,
  blendMode = "source-over",
  onOpacityChange,
  onBlendModeChange,
}: TransparencyBlendButtonProps) {
  const opacityPct = Math.round(opacity * 100);
  const blendLabel =
    BLEND_MODES.find((m) => m.value === blendMode)?.label ?? "Normal";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Transparency and blend mode"
          className="flex h-7 items-center gap-1.5 rounded-md border border-border px-2 text-xs text-foreground hover:bg-muted/60 transition-colors focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
        >
          <HugeiconsIcon
            icon={Layers01Icon}
            size={13}
            className="text-muted-foreground"
            aria-hidden="true"
          />
          <span className="font-mono">{opacityPct}%</span>
          <span className="text-muted-foreground text-[11px]">
            {blendLabel}
          </span>
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[220px] p-3 flex flex-col gap-3"
        align="end"
        sideOffset={8}
      >
        {/* Transparency */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-foreground">
            Transparency
          </span>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={100}
              value={opacityPct}
              onChange={(e) => onOpacityChange(Number(e.target.value) / 100)}
              className="h-1.5 flex-1 cursor-pointer accent-foreground"
              aria-label="Transparency"
            />
            <div className="flex h-7 w-16 items-center overflow-hidden rounded border border-border bg-background focus-within:ring-1 focus-within:ring-ring">
              <input
                type="number"
                min={0}
                max={100}
                value={opacityPct}
                onChange={(e) =>
                  onOpacityChange(
                    Math.min(1, Math.max(0, Number(e.target.value) / 100)),
                  )
                }
                className="w-full bg-transparent px-1.5 text-center text-xs font-mono focus:outline-none"
                aria-label="Opacity percentage"
              />
              <span className="pr-1.5 text-[11px] text-muted-foreground">
                %
              </span>
            </div>
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Blending */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-foreground">Blending</span>
          <Select
            value={blendMode}
            onValueChange={(v) => onBlendModeChange(v as BlendMode)}
          >
            <SelectTrigger
              size="sm"
              className="h-7 w-[120px] text-xs"
              aria-label="Blend mode"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              {BLEND_MODES.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  );
}
