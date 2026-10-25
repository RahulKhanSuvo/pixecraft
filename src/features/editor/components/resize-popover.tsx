"use client";

import { ScalingIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "cn";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { calculateFitViewport } from "../lib/zoom";
import { useDocumentStore } from "../stores/document-store";
import { useViewportStore } from "../stores/viewport";

export const PRESET_FORMATS = [
  { id: "leaderboard", label: "Leaderboard Ad", width: 728, height: 90 },
  { id: "square", label: "Instagram Post (Square)", width: 1080, height: 1080 },
  { id: "story", label: "Story / Reel", width: 1080, height: 1920 },
  { id: "youtube", label: "YouTube Thumbnail", width: 1280, height: 720 },
  { id: "full-hd", label: "Full HD (16:9)", width: 1920, height: 1080 },
  {
    id: "twitter-header",
    label: "Twitter / X Header",
    width: 1500,
    height: 500,
  },
  { id: "facebook-post", label: "Facebook Post", width: 1200, height: 630 },
  {
    id: "medium-rectangle",
    label: "Medium Rectangle Ad",
    width: 300,
    height: 250,
  },
  { id: "banner-ad", label: "Banner Ad", width: 468, height: 60 },
];

export function ResizePopover() {
  const [open, setOpen] = useState(false);
  const currentWidth = useDocumentStore((s) => s.width);
  const currentHeight = useDocumentStore((s) => s.height);
  const setDocumentSize = useDocumentStore((s) => s.setDocumentSize);

  const [mode, setMode] = useState<"preset" | "custom">("preset");
  const [selectedPresetId, setSelectedPresetId] =
    useState<string>("leaderboard");
  const [customWidth, setCustomWidth] = useState<number | "">(currentWidth);
  const [customHeight, setCustomHeight] = useState<number | "">(currentHeight);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setCustomWidth(currentWidth);
      setCustomHeight(currentHeight);
      const match = PRESET_FORMATS.find(
        (p) => p.width === currentWidth && p.height === currentHeight,
      );
      if (match) {
        setSelectedPresetId(match.id);
        setMode("preset");
      } else {
        setSelectedPresetId("leaderboard");
      }
    }
    setOpen(isOpen);
  };

  const handleApply = (newW: number, newH: number) => {
    if (newW >= 10 && newH >= 10) {
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

  const handleApplyPreset = () => {
    const preset = PRESET_FORMATS.find((p) => p.id === selectedPresetId);
    if (preset) {
      handleApply(preset.width, preset.height);
    }
  };

  const handleApplyCustom = () => {
    const w = Number(customWidth);
    const h = Number(customHeight);
    if (w >= 10 && h >= 10) {
      handleApply(w, h);
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button className="gap-2 bg-[#7052ff] text-white hover:bg-[#5f3ff4] text-xs h-8 px-3 cursor-pointer">
          <HugeiconsIcon icon={ScalingIcon} size={15} aria-hidden="true" />
          Resize
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={8}
        className="w-[340px] rounded-2xl bg-popover p-5 text-popover-foreground shadow-2xl border border-border/80 flex flex-col gap-4.5"
      >
        <RadioGroup
          value={mode}
          onValueChange={(val) => setMode(val as "preset" | "custom")}
          className="flex flex-col gap-5"
        >
          {/* ─── Section 1: Resize to another format ─── */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2.5">
              <RadioGroupItem
                value="preset"
                id="resize-preset-mode"
                className="size-4.5 border-2 border-zinc-300 dark:border-zinc-600 data-checked:border-blue-600 data-checked:bg-background data-checked:[&_span]:bg-blue-600 cursor-pointer"
              />
              <label
                htmlFor="resize-preset-mode"
                className="font-bold text-[14px] text-foreground cursor-pointer select-none"
              >
                Resize to another format
              </label>
            </div>

            <Select
              value={selectedPresetId}
              onValueChange={(val) => {
                setSelectedPresetId(val);
                setMode("preset");
              }}
            >
              <SelectTrigger
                onClick={() => setMode("preset")}
                className="w-full h-10 rounded-lg bg-zinc-100/90 dark:bg-muted/70 hover:bg-zinc-200/60 border-none px-3.5 text-xs font-medium text-foreground shadow-none cursor-pointer focus-visible:ring-2 focus-visible:ring-[#7052ff]/30 [&_svg]:text-[#7052ff]"
              >
                <SelectValue placeholder="Choose a format..." />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="z-50 max-h-64 rounded-xl"
              >
                <SelectGroup>
                  {PRESET_FORMATS.map((preset) => (
                    <SelectItem
                      key={preset.id}
                      value={preset.id}
                      className="text-xs py-2 cursor-pointer"
                    >
                      {preset.label} - {preset.width} × {preset.height} px
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button
              type="button"
              disabled={mode !== "preset"}
              onClick={handleApplyPreset}
              className={cn(
                "w-full h-9.5 rounded-lg text-xs font-semibold transition-all shadow-none",
                mode === "preset"
                  ? "bg-[#7052ff] hover:bg-[#5f3ff4] text-white cursor-pointer"
                  : "bg-[#7052ff]/35 text-white cursor-not-allowed opacity-80",
              )}
            >
              Resize
            </Button>
          </div>

          {/* ─── Section 2: Resize to custom dimensions ─── */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2.5">
              <RadioGroupItem
                value="custom"
                id="resize-custom-mode"
                className="size-4.5 border-2 border-zinc-300 dark:border-zinc-600 data-checked:border-blue-600 data-checked:bg-background data-checked:[&_span]:bg-blue-600 cursor-pointer"
              />
              <label
                htmlFor="resize-custom-mode"
                className={cn(
                  "text-[14px] cursor-pointer select-none transition-colors",
                  mode === "custom"
                    ? "font-bold text-foreground"
                    : "font-semibold text-muted-foreground",
                )}
              >
                Resize to custom dimensions
              </label>
            </div>

            <div className="flex items-center gap-3">
              <Input
                type="number"
                value={customWidth}
                placeholder="50"
                min={10}
                onFocus={() => setMode("custom")}
                onChange={(e) =>
                  setCustomWidth(
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
                className="h-10 flex-1 rounded-lg bg-zinc-100/90 dark:bg-muted/70 border-none text-center font-medium text-xs text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-[#7052ff]/30 shadow-none"
                aria-label="Custom width in pixels"
              />
              <span className="font-black text-xs text-muted-foreground select-none">
                X
              </span>
              <Input
                type="number"
                value={customHeight}
                placeholder="50"
                min={10}
                onFocus={() => setMode("custom")}
                onChange={(e) =>
                  setCustomHeight(
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
                className="h-10 flex-1 rounded-lg bg-zinc-100/90 dark:bg-muted/70 border-none text-center font-medium text-xs text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-[#7052ff]/30 shadow-none"
                aria-label="Custom height in pixels"
              />
            </div>

            <Button
              type="button"
              disabled={
                mode !== "custom" ||
                !customWidth ||
                !customHeight ||
                Number(customWidth) < 10 ||
                Number(customHeight) < 10
              }
              onClick={handleApplyCustom}
              className={cn(
                "w-full h-9.5 rounded-lg text-xs font-semibold transition-all shadow-none",
                mode === "custom" &&
                  customWidth &&
                  customHeight &&
                  Number(customWidth) >= 10 &&
                  Number(customHeight) >= 10
                  ? "bg-[#7052ff] hover:bg-[#5f3ff4] text-white cursor-pointer"
                  : "bg-[#7052ff]/35 text-white cursor-not-allowed opacity-80",
              )}
            >
              Resize
            </Button>
          </div>
        </RadioGroup>
      </PopoverContent>
    </Popover>
  );
}

export { ResizePopover as ResizeDialog };
