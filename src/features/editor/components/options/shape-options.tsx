"use client";

import { useDocumentStore } from "../../stores/document-store";
import type { ShapeNode } from "../../types/editor-node";

interface ShapeOptionsProps {
  node: ShapeNode;
}

export function ShapeOptions({ node }: ShapeOptionsProps) {
  const updateNode = useDocumentStore((s) => s.updateNode);

  return (
    <div className="flex items-center gap-3">
      {/* Fill color */}
      <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
        <span>Fill</span>
        <span className="relative flex items-center">
          <input
            type="color"
            value={node.fill}
            onChange={(e) => updateNode(node.id, { fill: e.target.value })}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            aria-label="Shape fill color"
          />
          <span
            className="inline-block size-5 rounded border border-border shadow-sm"
            style={{ background: node.fill }}
            aria-hidden="true"
          />
        </span>
        <span className="font-mono text-foreground">{node.fill}</span>
      </label>

      <div className="h-4 w-px bg-border" aria-hidden="true" />

      {/* Corner radius — only relevant for rect */}
      {node.shape === "rect" && (
        <>
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-muted-foreground">Radius</span>
            <input
              type="number"
              min={0}
              max={500}
              value={node.cornerRadius ?? 0}
              onChange={(e) =>
                updateNode(node.id, {
                  cornerRadius: Math.max(0, Number(e.target.value)),
                })
              }
              className="w-14 h-7 rounded border border-border bg-background px-1.5 text-center text-xs font-mono focus:outline-none focus:ring-1 focus:ring-ring"
              aria-label="Corner radius"
            />
          </div>

          <div className="h-4 w-px bg-border" aria-hidden="true" />
        </>
      )}

      {/* Opacity */}
      <div className="flex items-center gap-1">
        <span className="text-[11px] text-muted-foreground">Opacity</span>
        <input
          type="number"
          min={0}
          max={100}
          value={Math.round(node.opacity * 100)}
          onChange={(e) =>
            updateNode(node.id, {
              opacity: Math.min(1, Math.max(0, Number(e.target.value) / 100)),
            })
          }
          className="w-14 h-7 rounded border border-border bg-background px-1.5 text-center text-xs font-mono focus:outline-none focus:ring-1 focus:ring-ring"
          aria-label="Opacity percentage"
        />
        <span className="text-[11px] text-muted-foreground">%</span>
      </div>
    </div>
  );
}
