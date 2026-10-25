"use client";

import { useDocumentStore } from "../../stores/document-store";
import { ColorPickerButton } from "../color-picker/color-picker-button";

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
      <ColorPickerButton
        label="Background"
        value={background}
        onChange={setBackground}
      />
    </div>
  );
}
