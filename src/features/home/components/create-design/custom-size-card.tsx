"use client";

import { CropIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface CustomSizeCardProps {
  onClick: () => void;
}

export function CustomSizeCard({ onClick }: CustomSizeCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col justify-between rounded-xl border border-dashed border-primary/40 bg-primary/5 p-3 text-left shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/10 hover:shadow-xs focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none cursor-pointer"
      aria-label="Open custom canvas size dialog"
    >
      <div className="relative flex h-20 w-full items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
        <HugeiconsIcon
          icon={CropIcon}
          size={24}
          className="text-primary transition-transform group-hover:scale-110"
          aria-hidden="true"
        />
      </div>

      <div className="mt-2.5 min-w-0">
        <h4 className="truncate text-xs font-semibold text-foreground transition-colors group-hover:text-primary">
          Custom Size
        </h4>
        <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
          Enter custom dimensions
        </p>
      </div>
    </button>
  );
}
