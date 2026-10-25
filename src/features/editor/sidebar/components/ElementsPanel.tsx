"use client";

import { SquareIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import { createRectNode } from "../../lib/node-factory";
import { useDocumentStore } from "../../stores/document-store";
import { useSelectionStore } from "../../stores/selection-store";

export function ElementsPanel() {
  const addNode = useDocumentStore((s) => s.addNode);
  const docWidth = useDocumentStore((s) => s.width);
  const docHeight = useDocumentStore((s) => s.height);
  const select = useSelectionStore((s) => s.select);

  const handleAddRect = (cornerRadius = 0) => {
    const node = createRectNode({
      x: Math.round((docWidth - 240) / 2),
      y: Math.round((docHeight - 240) / 2),
      width: 240,
      height: 240,
      fill: "#7c3aed",
      cornerRadius,
    });
    addNode(node);
    select(node.id);
  };

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-xs text-muted-foreground">Shapes and graphic items</p>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          className="h-20 flex-col gap-2"
          onClick={() => handleAddRect(0)}
        >
          <HugeiconsIcon icon={SquareIcon} size={24} />
          <span className="text-xs">Rectangle</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex-col gap-2"
          onClick={() => handleAddRect(16)}
        >
          <div className="size-6 rounded-lg border-2 border-current" />
          <span className="text-xs">Rounded Card</span>
        </Button>
      </div>
    </div>
  );
}
