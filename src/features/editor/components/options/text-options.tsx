"use client";

import {
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

const FONT_FAMILIES = [
  "Inter",
  "Roboto",
  "Georgia",
  "Courier New",
  "Arial",
  "Times New Roman",
];

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
      <select
        value={node.fontFamily}
        onChange={(e) => updateNode(node.id, { fontFamily: e.target.value })}
        className="h-7 max-w-24 rounded border border-border bg-background px-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        aria-label="Font family"
      >
        {FONT_FAMILIES.map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>

      {/* Font size */}
      <div className="flex h-7 items-center overflow-hidden rounded border border-border bg-background focus-within:ring-1 focus-within:ring-ring">
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
          className="w-12 bg-transparent px-1.5 text-center text-xs font-mono focus:outline-none"
          aria-label="Font size"
        />
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
