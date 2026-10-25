"use client";

import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createRectNode, createTextNode } from "../../lib/node-factory";
import { useDocumentStore } from "../../stores/document-store";
import { useSelectionStore } from "../../stores/selection-store";

export function TemplatesPanel() {
  const addNode = useDocumentStore((s) => s.addNode);
  const docWidth = useDocumentStore((s) => s.width);

  const select = useSelectionStore((s) => s.select);

  const handleInsertSampleTemplate = () => {
    const title = createTextNode({
      text: "Pixecraft Studio",
      fontSize: 56,
      fill: "#1e1b4b",
      width: 500,
      height: 70,
      x: Math.round((docWidth - 500) / 2),
      y: 200,
    });
    const card = createRectNode({
      x: Math.round((docWidth - 440) / 2),
      y: 300,
      width: 440,
      height: 280,
      fill: "#ede9fe",
      cornerRadius: 16,
    });
    const subtitle = createTextNode({
      text: "Create stunning visuals with ease",
      fontSize: 24,
      fill: "#4338ca",
      width: 400,
      height: 40,
      x: Math.round((docWidth - 400) / 2),
      y: 420,
    });
    addNode(card);
    addNode(title);
    addNode(subtitle);
    select(title.id);
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-muted-foreground">
        Starter layouts &amp; presets
      </p>
      <button
        type="button"
        onClick={handleInsertSampleTemplate}
        className="group w-full cursor-pointer rounded-lg border border-border p-3 text-left transition-colors hover:border-[#7c3aed] hover:bg-accent/40"
      >
        <div className="mb-2 flex h-20 w-full items-center justify-center rounded bg-[#ede9fe] text-xs font-medium text-[#4338ca]">
          Sample Visual Layout
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-foreground">
            Starter Visual Card
          </span>
          <HugeiconsIcon
            icon={Add01Icon}
            size={14}
            className="text-muted-foreground group-hover:text-foreground"
          />
        </div>
      </button>
    </div>
  );
}
