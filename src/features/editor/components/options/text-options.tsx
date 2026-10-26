"use client";

import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextUnderlineIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useDocumentStore } from "../../stores/document-store";
import type { TextNode } from "../../types/editor-node";
import { ColorPickerButton } from "../color-picker/color-picker-button";
import { FontPickerPopover } from "../font-picker/font-picker-popover";

const ALIGN_OPTIONS = [
  { value: "left" as const, icon: TextAlignLeftIcon, label: "Align left" },
  {
    value: "center" as const,
    icon: TextAlignCenterIcon,
    label: "Align center",
  },
  { value: "right" as const, icon: TextAlignRightIcon, label: "Align right" },
  { value: "justify" as const, icon: TextAlignJustifyIcon, label: "Justify" },
] as const;

interface TextOptionsProps {
  node: TextNode;
}

function Separator() {
  return <div className="mx-0.5 h-4 w-px bg-border" aria-hidden="true" />;
}

interface ToggleButtonProps {
  pressed: boolean;
  onClick: () => void;
  label: string;
  icon: React.ComponentProps<typeof HugeiconsIcon>["icon"];
}

function ToggleButton({ pressed, onClick, label, icon }: ToggleButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className={`flex h-7 w-7 items-center justify-center rounded text-xs transition-colors ${
        pressed
          ? "bg-foreground text-background"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      <HugeiconsIcon icon={icon} size={14} aria-hidden="true" />
    </button>
  );
}

export function TextOptions({ node }: TextOptionsProps) {
  const updateNode = useDocumentStore((s) => s.updateNode);

  function toggle(key: "bold" | "italic" | "underline" | "strikethrough") {
    updateNode(node.id, { [key]: !node[key] });
  }

  return (
    <div className="flex items-center gap-1.5">
      {/* Fill color swatch */}
      <ColorPickerButton
        value={node.fill}
        onChange={(fill) => updateNode(node.id, { fill })}
        showHex={false}
      />

      <Separator />

      {/* Font family */}
      <FontPickerPopover
        value={node.fontFamily}
        onChange={(fontFamily) => updateNode(node.id, { fontFamily })}
      />

      {/* Font size stepper */}
      <div className="flex h-7 items-center rounded border border-border bg-background focus-within:ring-1 focus-within:ring-ring">
        <input
          type="number"
          min={1}
          max={999}
          value={node.fontSize}
          onChange={(e) =>
            updateNode(node.id, {
              fontSize: Math.max(1, Number(e.target.value)),
            })
          }
          className="w-10 bg-transparent px-1 text-center text-xs font-mono focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          aria-label="Font size"
        />
        <div className="flex flex-col border-l border-border h-full">
          <button
            type="button"
            onClick={() =>
              updateNode(node.id, {
                fontSize: Math.min(999, node.fontSize + 1),
              })
            }
            aria-label="Increase font size"
            className="flex h-3.5 w-4 items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
          >
            <HugeiconsIcon icon={ArrowUp01Icon} size={9} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={() =>
              updateNode(node.id, {
                fontSize: Math.max(1, node.fontSize - 1),
              })
            }
            aria-label="Decrease font size"
            className="flex h-3.5 w-4 items-center justify-center border-t border-border text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
          >
            <HugeiconsIcon icon={ArrowDown01Icon} size={9} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <Separator />

      {/* Style toggles: B I U S */}
      <fieldset className="flex items-center gap-0.5" aria-label="Text style">
        <ToggleButton
          pressed={!!node.bold}
          onClick={() => toggle("bold")}
          label="Bold"
          icon={BoldIcon}
        />
        <ToggleButton
          pressed={!!node.italic}
          onClick={() => toggle("italic")}
          label="Italic"
          icon={ItalicIcon}
        />
        <ToggleButton
          pressed={!!node.underline}
          onClick={() => toggle("underline")}
          label="Underline"
          icon={TextUnderlineIcon}
        />
        <ToggleButton
          pressed={!!node.strikethrough}
          onClick={() => toggle("strikethrough")}
          label="Strikethrough"
          icon={StrikethroughIcon}
        />
      </fieldset>

      <Separator />

      {/* Alignment */}
      <fieldset
        className="flex items-center gap-0.5"
        aria-label="Text alignment"
      >
        {ALIGN_OPTIONS.map(({ value, icon, label }) => (
          <ToggleButton
            key={value}
            pressed={node.align === value}
            onClick={() => updateNode(node.id, { align: value })}
            label={label}
            icon={icon}
          />
        ))}
      </fieldset>
    </div>
  );
}
