"use client";

import { Copy01Icon, TrashIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useDocumentStore } from "../stores/document-store";
import { useSelectionStore } from "../stores/selection-store";
import type { BlendMode } from "../types/editor-node";
import { DefaultOptions } from "./options/default-options";
import { ImageOptions } from "./options/image-options";
import { ShapeOptions } from "./options/shape-options";
import { TextOptions } from "./options/text-options";
import { PositionButton } from "./position-button";
import { TransparencyBlendButton } from "./transparency-blend-button";

export function EditorOptionsBar() {
  const selectedIds = useSelectionStore((s) => s.selectedIds);
  const clear = useSelectionStore((s) => s.clear);
  const select = useSelectionStore((s) => s.select);
  const nodes = useDocumentStore((s) => s.nodes);
  const updateNode = useDocumentStore((s) => s.updateNode);
  const addNode = useDocumentStore((s) => s.addNode);
  const removeNodes = useDocumentStore((s) => s.removeNodes);
  const reorderNode = useDocumentStore((s) => s.reorderNode);
  const documentWidth = useDocumentStore((s) => s.width);
  const documentHeight = useDocumentStore((s) => s.height);

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
        <div className="flex shrink-0 items-center gap-1.5 border-l border-border pl-3 ml-auto">
          {/* Position / arrange */}
          <PositionButton
            node={selectedNode}
            nodes={nodes}
            documentWidth={documentWidth}
            documentHeight={documentHeight}
            onUpdate={(patch) => updateNode(selectedNode.id, patch)}
            onReorder={(id, toIndex) => reorderNode(id, toIndex)}
            onSelect={(id) => select(id)}
          />

          <div className="h-4 w-px bg-border" aria-hidden="true" />

          {/* Transparency + Blend Mode (combined popover) */}
          <TransparencyBlendButton
            opacity={selectedNode.opacity}
            blendMode={selectedNode.blendMode as BlendMode | undefined}
            onOpacityChange={(opacity) =>
              updateNode(selectedNode.id, { opacity })
            }
            onBlendModeChange={(blendMode) =>
              updateNode(selectedNode.id, { blendMode })
            }
          />

          <div className="h-4 w-px bg-border" aria-hidden="true" />

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
