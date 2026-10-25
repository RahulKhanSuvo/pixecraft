"use client";

import { TextIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import { createTextNode } from "../../lib/node-factory";
import { useDocumentStore } from "../../stores/document-store";
import { useSelectionStore } from "../../stores/selection-store";

export function TextPanel() {
  const addNode = useDocumentStore((s) => s.addNode);
  const docWidth = useDocumentStore((s) => s.width);
  const docHeight = useDocumentStore((s) => s.height);
  const select = useSelectionStore((s) => s.select);

  const handleAdd = (type: "heading" | "subheading" | "body") => {
    const configs = {
      heading: {
        text: "Add a Heading",
        fontSize: 48,
        width: 360,
        height: 64,
      },
      subheading: {
        text: "Add a Subheading",
        fontSize: 28,
        width: 300,
        height: 40,
      },
      body: {
        text: "Add little bit of body text",
        fontSize: 18,
        width: 260,
        height: 32,
      },
    };
    const cfg = configs[type];
    const node = createTextNode({
      ...cfg,
      x: Math.round((docWidth - cfg.width) / 2),
      y: Math.round((docHeight - cfg.height) / 2),
    });
    addNode(node);
    select(node.id);
  };

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-xs text-muted-foreground">
        Click to add text to the canvas
      </p>
      <Button
        variant="outline"
        className="h-12 w-full justify-start text-base font-bold"
        onClick={() => handleAdd("heading")}
      >
        <HugeiconsIcon icon={TextIcon} size={18} className="mr-2" />
        Add a heading
      </Button>
      <Button
        variant="outline"
        className="h-10 w-full justify-start text-sm font-semibold"
        onClick={() => handleAdd("subheading")}
      >
        <HugeiconsIcon icon={TextIcon} size={16} className="mr-2" />
        Add a subheading
      </Button>
      <Button
        variant="outline"
        className="h-9 w-full justify-start text-xs"
        onClick={() => handleAdd("body")}
      >
        <HugeiconsIcon icon={TextIcon} size={14} className="mr-2" />
        Add body text
      </Button>
    </div>
  );
}
