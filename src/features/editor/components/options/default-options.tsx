"use client";

import { useDocumentStore } from "../../stores/document-store";

export function DefaultOptions() {
  const width = useDocumentStore((s) => s.width);
  const height = useDocumentStore((s) => s.height);
  const background = useDocumentStore((s) => s.background);
  const setBackground = useDocumentStore((s) => s.setBackground);

  return (
    <div className="flex items-center gap-4">
      {/* Document size (read-only here; editable via ResizeDialog) */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">{width}</span>
        <span>×</span>
        <span className="font-medium text-foreground">{height}</span>
        <span>px</span>
      </div>

      <div className="h-4 w-px bg-border" aria-hidden="true" />

      {/* Background color */}
      <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
        <span>Background</span>
        <span className="relative flex items-center">
          <input
            type="color"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            aria-label="Canvas background color"
          />
          <span
            className="inline-block size-5 rounded border border-border shadow-sm"
            style={{ background }}
            aria-hidden="true"
          />
        </span>
        <span className="font-mono text-foreground">{background}</span>
      </label>
    </div>
  );
}
