"use client";

import { useDocumentStore } from "../../stores/document-store";
import { ColorPickerButton } from "../color-picker/color-picker-button";

export function DefaultOptions() {
  const background = useDocumentStore((s) => s.background);
  const setBackground = useDocumentStore((s) => s.setBackground);

  return (
    <div className="flex items-center gap-4">
      {/* Background color */}
      <ColorPickerButton value={background} onChange={setBackground} />
    </div>
  );
}
