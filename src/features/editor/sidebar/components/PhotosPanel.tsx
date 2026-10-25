"use client";

import { ImageAdd01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createImageNodeFromFile } from "../../lib/node-factory";
import { useDocumentStore } from "../../stores/document-store";
import { useSelectionStore } from "../../stores/selection-store";

export function PhotosPanel() {
  const addNode = useDocumentStore((s) => s.addNode);
  const docWidth = useDocumentStore((s) => s.width);
  const docHeight = useDocumentStore((s) => s.height);
  const select = useSelectionStore((s) => s.select);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const node = await createImageNodeFromFile(file, {
      width: docWidth,
      height: docHeight,
    });
    addNode(node);
    select(node.id);
    e.target.value = "";
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-muted-foreground">
        Upload and add photos to canvas
      </p>
      <label className="flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border transition-colors hover:bg-muted/50">
        <HugeiconsIcon
          icon={ImageAdd01Icon}
          size={24}
          className="mb-1 text-muted-foreground"
        />
        <span className="text-xs font-medium text-foreground">
          Upload Image
        </span>
        <span className="text-[10px] text-muted-foreground">
          PNG, JPG, WebP
        </span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </label>
    </div>
  );
}
