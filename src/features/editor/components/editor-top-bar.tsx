"use client";

import {
  ArrowDown01Icon,
  CloudIcon,
  Download01Icon,
  Redo02Icon,
  Undo02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

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
import { ResizeDialog } from "./resize-dialog";

export function EditorTopBar() {
  const selectedIds = useSelectionStore((s) => s.selectedIds);
  const nodes = useDocumentStore((s) => s.nodes);
  const updateNode = useDocumentStore((s) => s.updateNode);
  const past = useDocumentStore((s) => s.past);
  const future = useDocumentStore((s) => s.future);
  const undo = useDocumentStore((s) => s.undo);
  const redo = useDocumentStore((s) => s.redo);

  const selectedNode =
    selectedIds.length === 1
      ? nodes.find((n) => n.id === selectedIds[0])
      : null;

  return (
    <TooltipProvider>
      <header className="flex h-14 w-full shrink-0 items-center justify-between border-b bg-white px-4">
        {/* ─── Left Section ─── */}
        <div className="flex items-center gap-1.5">
          {/* Brand Logo */}
          <div className="mr-2 flex size-8 items-center justify-center rounded-md bg-black">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Pixecraft Logo"
            >
              <path
                d="M6 6V18M6 12L14 6M6 12L14 18"
                stroke="white"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="18" cy="6" r="2" fill="white" />
            </svg>
          </div>

          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground text-xs h-8"
          >
            File
          </Button>

          {/* Canvas Resize Dialog */}
          <ResizeDialog />

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

        {/* ─── Center Section: Selected Item Dimensions / Resolution ─── */}
        <div className="flex items-center gap-2">
          {selectedNode ? (
            <div className="flex items-center gap-2 rounded-md border border-border bg-muted/40 px-2 py-1 text-xs">
              <span className="font-semibold text-muted-foreground uppercase text-[10px]">
                {selectedNode.type}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[11px] text-muted-foreground">W</span>
                <input
                  type="number"
                  value={Math.round(selectedNode.width)}
                  onChange={(e) =>
                    updateNode(selectedNode.id, {
                      width: Math.max(1, Number(e.target.value)),
                    })
                  }
                  className="w-14 rounded border border-border bg-background px-1.5 py-0.5 text-center text-xs font-mono"
                  aria-label="Item width in pixels"
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[11px] text-muted-foreground">H</span>
                <input
                  type="number"
                  value={Math.round(selectedNode.height)}
                  onChange={(e) =>
                    updateNode(selectedNode.id, {
                      height: Math.max(1, Number(e.target.value)),
                    })
                  }
                  className="w-14 rounded border border-border bg-background px-1.5 py-0.5 text-center text-xs font-mono"
                  aria-label="Item height in pixels"
                />
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-[11px]">
                <span>X: {Math.round(selectedNode.x)}</span>
                <span>Y: {Math.round(selectedNode.y)}</span>
              </div>
            </div>
          ) : null}
        </div>

        {/* ─── Right Section ─── */}
        <div className="flex items-center gap-3">
          {/* Cloud Sync Status */}
          <div
            className="flex items-center justify-center text-emerald-500"
            role="status"
            aria-label="Cloud sync active"
          >
            <HugeiconsIcon icon={CloudIcon} size={20} aria-hidden="true" />
          </div>

          {/* Document Title Input */}
          <Input
            defaultValue="Untitled"
            aria-label="Document title"
            className="h-8 w-44 border-none bg-muted/50 text-center text-xs font-medium focus-visible:ring-1 focus-visible:ring-ring"
          />

          {/* Export / Download */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Export document"
                className="size-8"
              >
                <HugeiconsIcon
                  icon={Download01Icon}
                  size={18}
                  aria-hidden="true"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Export</TooltipContent>
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
