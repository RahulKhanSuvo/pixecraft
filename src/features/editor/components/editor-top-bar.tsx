"use client";

import {
  ArrowDown01Icon,
  CloudIcon,
  Download01Icon,
  Redo02Icon,
  Resize01Icon,
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

export function EditorTopBar() {
  return (
    <TooltipProvider>
      <header className="flex h-14 w-full shrink-0 items-center justify-between border-b bg-white px-4">
        {/* ─── Left Section ─── */}
        <div className="flex items-center gap-1.5">
          {/* Brand Logo (Added role="img" and aria-label) */}
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
            className="text-muted-foreground hover:text-foreground"
          >
            File
          </Button>

          {/* Active Tool */}
          <Button className="gap-2 bg-[#7c3aed] text-white hover:bg-[#6d28d9]">
            <HugeiconsIcon icon={Resize01Icon} size={16} aria-hidden="true" />
            Resize
          </Button>

          {/* Undo / Redo (Added aria-label) */}
          <div className="ml-2 flex items-center gap-0.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled aria-label="Undo">
                  <HugeiconsIcon
                    icon={Undo02Icon}
                    size={18}
                    aria-hidden="true"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled aria-label="Redo">
                  <HugeiconsIcon
                    icon={Redo02Icon}
                    size={18}
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
          {/* Cloud Sync Status (Added aria-label and role) */}
          <div
            className="flex items-center justify-center text-emerald-500"
            role="status"
            aria-label="Cloud sync active"
          >
            <HugeiconsIcon icon={CloudIcon} size={20} aria-hidden="true" />
          </div>

          {/* Document Title Input (Added aria-label) */}
          <Input
            defaultValue="Untitled"
            aria-label="Document title"
            className="h-8 w-48 border-none bg-muted/50 text-center text-sm font-medium focus-visible:ring-1 focus-visible:ring-ring"
          />

          {/* Export / Download (Added aria-label) */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Export document">
                <HugeiconsIcon
                  icon={Download01Icon}
                  size={20}
                  aria-hidden="true"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Export</TooltipContent>
          </Tooltip>

          {/* User Avatar Dropdown (Added aria-label) */}
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
