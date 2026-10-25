"use client";

import {
  AlignBottomIcon,
  AlignHorizontalCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AlignTopIcon,
  AlignVerticalCenterIcon,
  ArrowDown01Icon,
  ArrowUp01Icon,
  ShapeCollectionIcon,
  SquareArrowMoveDownRightIcon,
  SquareArrowMoveLeftUpIcon,
  Text,
} from "@hugeicons/core-free-icons";
import Image01Icon from "@hugeicons/core-free-icons/Image01Icon";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { EditorNode } from "../types/editor-node";

interface PositionButtonProps {
  node: EditorNode;
  nodes: EditorNode[];
  documentWidth: number;
  documentHeight: number;
  onUpdate: (patch: Partial<EditorNode>) => void;
  onReorder: (id: string, toIndex: number) => void;
  onSelect: (id: string) => void;
}

function IconButton({
  icon,
  label,
  onClick,
  disabled,
}: {
  icon: React.ComponentProps<typeof HugeiconsIcon>["icon"];
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40 cursor-pointer"
    >
      <HugeiconsIcon icon={icon} size={14} aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}

function NumericField({
  label,
  value,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  const [localVal, setLocalVal] = React.useState<string>(
    String(Math.round(value * 10) / 10),
  );
  const [isFocused, setIsFocused] = React.useState(false);

  React.useEffect(() => {
    if (!isFocused) {
      setLocalVal(String(Math.round(value * 10) / 10));
    }
  }, [value, isFocused]);

  return (
    <div className="flex flex-1 flex-col gap-0.5">
      <div className="flex h-7 items-center overflow-hidden rounded border border-border bg-background focus-within:ring-1 focus-within:ring-ring">
        <span className="pl-2 text-[10px] font-medium text-muted-foreground select-none">
          {label}
        </span>
        <input
          type="number"
          value={localVal}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => {
            setLocalVal(e.target.value);
            const num = Number(e.target.value);
            if (!Number.isNaN(num)) {
              onChange(num);
            }
          }}
          onBlur={() => {
            setIsFocused(false);
            const num = Number(localVal);
            if (Number.isNaN(num)) {
              setLocalVal(String(Math.round(value * 10) / 10));
            } else {
              onChange(num);
            }
          }}
          className="w-full bg-transparent px-1.5 text-right text-xs font-mono focus:outline-none"
          aria-label={label}
        />
        {unit && (
          <span className="pr-1.5 text-[10px] text-muted-foreground select-none">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

function getNodeIcon(node: EditorNode) {
  switch (node.type) {
    case "text":
      return Text;
    case "image":
      return Image01Icon;
    case "shape":
      return ShapeCollectionIcon;
  }
}

function getNodeLabel(node: EditorNode) {
  switch (node.type) {
    case "text":
      return node.text.trim() ? node.text.trim().slice(0, 18) : "Text";
    case "image":
      return "Image";
    case "shape":
      return node.shape
        ? `${node.shape.charAt(0).toUpperCase()}${node.shape.slice(1)}`
        : "Shape";
  }
}

export function PositionButton({
  node,
  nodes,
  documentWidth,
  documentHeight,
  onUpdate,
  onReorder,
  onSelect,
}: PositionButtonProps) {
  const nodeIndex = nodes.findIndex((n) => n.id === node.id);
  const totalNodes = nodes.length;
  const isTop = nodeIndex === totalNodes - 1;
  const isBottom = nodeIndex === 0;

  // Alignment helpers — align node relative to the document canvas
  function alignH(type: "left" | "center" | "right") {
    if (type === "left") onUpdate({ x: 0 });
    else if (type === "center")
      onUpdate({ x: Math.round((documentWidth - node.width) / 2) });
    else onUpdate({ x: Math.round(documentWidth - node.width) });
  }

  function alignV(type: "top" | "middle" | "bottom") {
    if (type === "top") onUpdate({ y: 0 });
    else if (type === "middle")
      onUpdate({ y: Math.round((documentHeight - node.height) / 2) });
    else onUpdate({ y: Math.round(documentHeight - node.height) });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Position and arrange"
          className="flex h-7 items-center gap-1.5 rounded-md border border-border px-2 text-xs text-foreground hover:bg-muted/60 transition-colors focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
        >
          <HugeiconsIcon
            icon={AlignHorizontalCenterIcon}
            size={13}
            className="text-muted-foreground"
            aria-hidden="true"
          />
          <span className="text-[11px] font-medium">Position</span>
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[270px] p-3 flex flex-col gap-2.5"
        align="end"
        sideOffset={8}
      >
        <Tabs defaultValue="arrange" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-8 p-1">
            <TabsTrigger value="arrange" className="text-xs">
              Arrange
            </TabsTrigger>
            <TabsTrigger value="layers" className="text-xs">
              Layers
            </TabsTrigger>
          </TabsList>

          {/* ── ARRANGE TAB ──────────────────────────────── */}
          <TabsContent value="arrange" className="mt-2.5 flex flex-col gap-3">
            {/* ── Layering ─────────────────────────────────── */}
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-foreground">
                Layering
              </span>
              <div className="grid grid-cols-2 gap-0.5">
                <IconButton
                  icon={ArrowUp01Icon}
                  label="Forward"
                  disabled={isTop}
                  onClick={() => onReorder(node.id, nodeIndex + 1)}
                />
                <IconButton
                  icon={ArrowDown01Icon}
                  label="Backward"
                  disabled={isBottom}
                  onClick={() => onReorder(node.id, nodeIndex - 1)}
                />
                <IconButton
                  icon={SquareArrowMoveLeftUpIcon}
                  label="To Front"
                  disabled={isTop}
                  onClick={() => onReorder(node.id, totalNodes - 1)}
                />
                <IconButton
                  icon={SquareArrowMoveDownRightIcon}
                  label="To Back"
                  disabled={isBottom}
                  onClick={() => onReorder(node.id, 0)}
                />
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* ── Align to page ────────────────────────────── */}
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-foreground">
                Align to page
              </span>
              <div className="grid grid-cols-2 gap-0.5">
                <IconButton
                  icon={AlignLeftIcon}
                  label="Left"
                  onClick={() => alignH("left")}
                />
                <IconButton
                  icon={AlignTopIcon}
                  label="Top"
                  onClick={() => alignV("top")}
                />
                <IconButton
                  icon={AlignHorizontalCenterIcon}
                  label="Center"
                  onClick={() => alignH("center")}
                />
                <IconButton
                  icon={AlignVerticalCenterIcon}
                  label="Middle"
                  onClick={() => alignV("middle")}
                />
                <IconButton
                  icon={AlignRightIcon}
                  label="Right"
                  onClick={() => alignH("right")}
                />
                <IconButton
                  icon={AlignBottomIcon}
                  label="Bottom"
                  onClick={() => alignV("bottom")}
                />
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* ── Dimensions & Position ─────────────────────── */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold text-foreground">
                Dimensions & Position
              </span>

              {/* W / H */}
              <div className="flex gap-2">
                <NumericField
                  label="W"
                  value={node.width}
                  onChange={(v) =>
                    onUpdate({ width: Math.max(1, Math.round(v)) })
                  }
                />
                <NumericField
                  label="H"
                  value={node.height}
                  onChange={(v) =>
                    onUpdate({ height: Math.max(1, Math.round(v)) })
                  }
                />
              </div>

              {/* X / Y */}
              <div className="flex gap-2">
                <NumericField
                  label="X"
                  value={node.x}
                  onChange={(v) => onUpdate({ x: Math.round(v) })}
                />
                <NumericField
                  label="Y"
                  value={node.y}
                  onChange={(v) => onUpdate({ y: Math.round(v) })}
                />
              </div>

              {/* Rotate */}
              <div className="flex gap-2">
                <NumericField
                  label="Rotate"
                  unit="°"
                  value={node.rotation ?? 0}
                  onChange={(v) => onUpdate({ rotation: Math.round(v) })}
                />
              </div>
            </div>
          </TabsContent>

          {/* ── LAYERS TAB ───────────────────────────────── */}
          <TabsContent
            value="layers"
            className="mt-2.5 flex flex-col gap-1 max-h-64 overflow-y-auto pr-0.5"
          >
            {nodes.length === 0 ? (
              <p className="py-4 text-center text-xs text-muted-foreground">
                No layers found.
              </p>
            ) : (
              [...nodes].reverse().map((item) => {
                const isSelected = item.id === node.id;
                const realIndex = nodes.findIndex((n) => n.id === item.id);
                const itemIsTop = realIndex === totalNodes - 1;
                const itemIsBottom = realIndex === 0;

                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between gap-2 rounded-md px-2.5 py-1 text-xs transition-colors ${
                      isSelected
                        ? "bg-accent text-accent-foreground font-medium ring-1 ring-border"
                        : "text-foreground hover:bg-muted/70"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => onSelect(item.id)}
                      className="flex items-center gap-2 min-w-0 flex-1 py-0.5 text-left cursor-pointer"
                    >
                      <HugeiconsIcon
                        icon={getNodeIcon(item)}
                        size={14}
                        className="shrink-0 text-muted-foreground"
                      />
                      <span className="truncate">{getNodeLabel(item)}</span>
                    </button>

                    <div className="flex items-center gap-0.5 shrink-0">
                      <button
                        type="button"
                        aria-label="Move layer up"
                        title="Move layer up"
                        disabled={itemIsTop}
                        onClick={(e) => {
                          e.stopPropagation();
                          onReorder(item.id, realIndex + 1);
                        }}
                        className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
                      >
                        <HugeiconsIcon icon={ArrowUp01Icon} size={11} />
                      </button>
                      <button
                        type="button"
                        aria-label="Move layer down"
                        title="Move layer down"
                        disabled={itemIsBottom}
                        onClick={(e) => {
                          e.stopPropagation();
                          onReorder(item.id, realIndex - 1);
                        }}
                        className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
                      >
                        <HugeiconsIcon icon={ArrowDown01Icon} size={11} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
