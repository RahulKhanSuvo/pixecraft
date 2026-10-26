"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { isImageUrl } from "../../lib/color-utils";
import { ColorPicker } from "./color-picker";

interface ColorPickerButtonProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  showHex?: boolean;
}

export function ColorPickerButton({
  label,
  value,
  onChange,
  showHex = true,
}: ColorPickerButtonProps) {
  const isGradient = value.startsWith("linear-gradient");
  const isImage = isImageUrl(value);
  const isTransparent = value === "transparent";

  return (
    <div className="flex items-center gap-1.5">
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-md border border-border p-1 hover:bg-muted/60 transition-colors focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
            aria-label={label || "Choose color"}
          >
            <span
              className="inline-block size-5 rounded-[4px] border border-border/80 shadow-xs bg-cover bg-center"
              style={{
                background: isImage
                  ? `url("${value}") center/cover no-repeat`
                  : isTransparent
                    ? "repeating-conic-gradient(#cbd5e1 0% 25%, #ffffff 0% 50%) 50% / 6px 6px"
                    : value,
              }}
              aria-hidden="true"
            />
            {showHex && (
              <span className="font-mono text-[11px] text-foreground max-w-[80px] truncate">
                {isImage
                  ? "Image"
                  : isTransparent
                    ? "None"
                    : isGradient
                      ? "Gradient"
                      : value}
              </span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 border-none bg-transparent shadow-2xl"
          align="start"
          sideOffset={8}
        >
          <ColorPicker value={value} onChange={onChange} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
