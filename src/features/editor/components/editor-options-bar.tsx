"use client";

import {
  Copy01Icon,
  Layers01Icon,
  TrashIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useDocumentStore } from "../stores/document-store";
import { useSelectionStore } from "../stores/selection-store";
import { DefaultOptions } from "./options/default-options";
import { ImageOptions } from "./options/image-options";
import { ShapeOptions } from "./options/shape-options";
import { TextOptions } from "./options/text-options";

export function EditorOptionsBar() {
  const selectedIds = useSelectionStore((s) => s.selectedIds);
  const clear = useSelectionStore((s) => s.clear);
  const select = useSelectionStore((s) => s.select);
  const nodes = useDocumentStore((s) => s.nodes);
  const updateNode = useDocumentStore((s) => s.updateNode);
  const addNode = useDocumentStore((s) => s.addNode);
  const removeNodes = useDocumentStore((s) => s.removeNodes);

  const selectedNode =
    selectedIds.length === 1
      ? nodes.find((n) => n.id === selectedIds[0])
      : null;

  function renderOptions() {
    if (!selectedNode) return <DefaultOptions />;

    switch (selectedNode.type) {
      case "text":
        return <TextOptions node={selectedNode} />;
      case "image":
        return <ImageOptions node={selectedNode} />;
      case "shape":
        return <ShapeOptions node={selectedNode} />;
    }
  }

  function handleDuplicate() {
    if (!selectedNode) return;
    const clone = {
      ...selectedNode,
      id: crypto.randomUUID(),
      x: selectedNode.x + 20,
      y: selectedNode.y + 20,
    };
    addNode(clone);
    select(clone.id);
  }

  function handleDelete() {
    if (!selectedNode) return;
    removeNodes([selectedNode.id]);
    clear();
  }

  return (
    <div
      role="toolbar"
      aria-label="Object options"
      className="flex h-10 w-full shrink-0 items-center gap-2 border-b bg-background px-4"
    >
      {/* Left: type-specific controls */}
      <div className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto">
        {renderOptions()}
      </div>

      {/* Right: shared node controls — only when something is selected */}
      {selectedNode && (
        <div className="flex shrink-0 items-center gap-1 border-l border-border pl-3 ml-auto">
          {/* Position / arrange */}
          <button
            type="button"
            aria-label="Position and arrange"
            className="flex h-7 items-center gap-1 rounded px-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <HugeiconsIcon icon={Layers01Icon} size={14} aria-hidden="true" />
            <span className="text-[11px]">Position</span>
          </button>

          <div className="mx-0.5 h-4 w-px bg-border" aria-hidden="true" />

          {/* Opacity */}
          <div className="flex h-7 items-center gap-1">
            <span className="text-[11px] text-muted-foreground">Opacity</span>
            <div className="flex h-7 items-center overflow-hidden rounded border border-border bg-background focus-within:ring-1 focus-within:ring-ring">
              <input
                type="number"
                min={0}
                max={100}
                value={Math.round(selectedNode.opacity * 100)}
                onChange={(e) =>
                  updateNode(selectedNode.id, {
                    opacity: Math.min(
                      1,
                      Math.max(0, Number(e.target.value) / 100),
                    ),
                  })
                }
                className="w-10 bg-transparent px-1.5 text-center text-xs font-mono focus:outline-none"
                aria-label="Opacity percentage"
              />
              <span className="pr-1.5 text-[11px] text-muted-foreground">
                %
              </span>
            </div>
          </div>

          <div className="mx-0.5 h-4 w-px bg-border" aria-hidden="true" />

          {/* Duplicate */}
          <button
            type="button"
            aria-label="Duplicate"
            onClick={handleDuplicate}
            className="flex h-7 w-7 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <HugeiconsIcon icon={Copy01Icon} size={14} aria-hidden="true" />
          </button>

          {/* Delete */}
          <button
            type="button"
            aria-label="Delete"
            onClick={handleDelete}
            className="flex h-7 w-7 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-red-500"
          >
            <HugeiconsIcon icon={TrashIcon} size={14} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
