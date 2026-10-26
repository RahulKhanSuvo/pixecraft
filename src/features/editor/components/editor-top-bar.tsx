"use client";

import {
  ArrowDown01Icon,
  CloudIcon,
  Download01Icon,
  Redo02Icon,
  Undo02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Konva from "konva";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDocumentStore } from "../stores/document-store";
import { useSelectionStore } from "../stores/selection-store";
import { ResizePopover } from "./resize-popover";

export function EditorTopBar() {
  const past = useDocumentStore((s) => s.past);
  const future = useDocumentStore((s) => s.future);
  const undo = useDocumentStore((s) => s.undo);
  const redo = useDocumentStore((s) => s.redo);
  const title = useDocumentStore((s) => s.title);
  const setTitle = useDocumentStore((s) => s.setTitle);
  const docWidth = useDocumentStore((s) => s.width);
  const docHeight = useDocumentStore((s) => s.height);
  const clearSelection = useSelectionStore((s) => s.clear);

  const [localTitle, setLocalTitle] = useState(title);

  // Keep local title in sync if store changes externally
  useEffect(() => {
    setLocalTitle(title);
  }, [title]);

  // Update browser window title
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = title ? `${title} - Pixecraft` : "Pixecraft";
    }
  }, [title]);

  const handleCommitTitle = useCallback(() => {
    const trimmed = localTitle.trim();
    const finalTitle = trimmed || "Untitled design";
    setLocalTitle(finalTitle);
    setTitle(finalTitle);
  }, [localTitle, setTitle]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.currentTarget.blur();
      } else if (e.key === "Escape") {
        setLocalTitle(title);
        e.currentTarget.blur();
      }
    },
    [title],
  );

  const handleExport = useCallback(() => {
    const stage = Konva.stages[0];
    if (!stage) {
      toast.error("No active canvas to export");
      return;
    }

    // Deselect active node so selection box is not rendered in the exported image
    clearSelection();

    // Use requestAnimationFrame to let the transformer unmount before snapshot
    requestAnimationFrame(() => {
      try {
        const layer = stage.getLayers()[0];
        if (!layer) return;

        const checkerboard = layer.findOne(".canvas-checkerboard");
        if (checkerboard) checkerboard.visible(false);

        const dataUrl = layer.toDataURL({
          x: 0,
          y: 0,
          width: docWidth,
          height: docHeight,
          pixelRatio: 2,
        });

        if (checkerboard) {
          checkerboard.visible(true);
          layer.batchDraw();
        }

        const safeFilename = `${(title.trim() || "untitled-design")
          .toLowerCase()
          .replace(/[^a-z0-9_-]/g, "-")}.png`;

        const link = document.createElement("a");
        link.download = safeFilename;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success(`Exported "${safeFilename}"`);
      } catch (err) {
        console.error("Export error:", err);
        toast.error("Failed to export image");
      }
    });
  }, [clearSelection, docWidth, docHeight, title]);

  return (
    <TooltipProvider>
      <header className="flex h-14 w-full shrink-0 items-center justify-between border-b bg-white px-4">
        {/* ─── Left Section ─── */}
        <div className="flex items-center gap-1.5">
          {/* Brand Logo */}
          <div className="mr-2 flex size-9 items-center justify-center rounded-md bg-black">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Pixecraft Logo"
            >
              <path d="M6 6V18M6 12L14 6M6 12L14 18" strokeLinecap="round" />
              <circle cx="18" cy="6" r="2" fill="white" />
            </svg>
          </div>

          {/* Canvas Resize Popover */}
          <ResizePopover />

          {/* Undo / Redo */}
          <div className="ml-2 flex items-center gap-0.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={past.length === 0}
                  onClick={undo}
                  aria-label="Undo"
                  className="size-8"
                >
                  <HugeiconsIcon
                    icon={Undo02Icon}
                    size={16}
                    aria-hidden="true"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={future.length === 0}
                  onClick={redo}
                  aria-label="Redo"
                  className="size-8"
                >
                  <HugeiconsIcon
                    icon={Redo02Icon}
                    size={16}
                    aria-hidden="true"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Redo (Ctrl+Shift+Z)</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* ─── Right Section ─── */}
        <div className="flex items-center gap-3">
          {/* Cloud Sync Status */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="flex items-center justify-center text-emerald-500 cursor-default"
                role="status"
                aria-label="Cloud sync active"
              >
                <HugeiconsIcon icon={CloudIcon} size={20} aria-hidden="true" />
              </div>
            </TooltipTrigger>
            <TooltipContent>All changes saved</TooltipContent>
          </Tooltip>

          {/* Document Title Input */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Input
                value={localTitle}
                onChange={(e) => setLocalTitle(e.target.value)}
                onBlur={handleCommitTitle}
                onKeyDown={handleKeyDown}
                aria-label="Document title"
                placeholder="Untitled design"
                className="h-8 w-44 rounded-md border border-transparent bg-muted/40 hover:bg-muted/70 hover:border-border/60 focus:bg-background focus:border-ring focus:w-60 px-2.5 text-center text-xs font-medium text-foreground transition-all duration-200 focus-visible:ring-1 focus-visible:ring-ring cursor-text"
              />
            </TooltipTrigger>
            <TooltipContent>Click to rename</TooltipContent>
          </Tooltip>

          {/* Export / Download */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleExport}
                aria-label="Export document"
                className="size-8 cursor-pointer"
              >
                <HugeiconsIcon
                  icon={Download01Icon}
                  size={18}
                  aria-hidden="true"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Export ({title || "Untitled"}.png)</TooltipContent>
          </Tooltip>

          {/* User Avatar */}
          <button
            type="button"
            aria-label="User menu"
            className="flex items-center gap-1 rounded-md p-1 transition-colors hover:bg-muted"
          >
            <Avatar className="size-7 bg-purple-100 text-purple-700">
              <AvatarFallback className="bg-transparent text-xs font-semibold">
                AV
              </AvatarFallback>
            </Avatar>
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              size={14}
              className="text-muted-foreground"
              aria-hidden="true"
            />
          </button>
        </div>
      </header>
    </TooltipProvider>
  );
}
