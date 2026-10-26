"use client";

import Link from "next/link";
import type { DesignFormat } from "../../data/design-formats";
import { FormatPreview } from "./format-preview";

interface FormatCardProps {
  format: DesignFormat;
  onSelect?: () => void;
}

export function FormatCard({ format, onSelect }: FormatCardProps) {
  const editorHref = `/editor?w=${format.width}&h=${format.height}&name=${encodeURIComponent(format.name)}&preset=${format.id}`;

  return (
    <Link
      href={editorHref}
      onClick={onSelect}
      className="group flex flex-col justify-between rounded-xl border border-border/80 bg-card p-3 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-xs focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      aria-label={`Create ${format.name} (${format.width} by ${format.height} pixels)`}
    >
      <FormatPreview width={format.width} height={format.height} />

      <div className="mt-2.5 min-w-0">
        <h4 className="truncate text-xs font-semibold text-foreground transition-colors group-hover:text-primary">
          {format.name}
        </h4>
        <p className="mt-0.5 truncate font-mono text-[11px] text-muted-foreground">
          {format.width} × {format.height} px
        </p>
      </div>
    </Link>
  );
}
