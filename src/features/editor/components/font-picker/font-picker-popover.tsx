"use client";

import {
  ArrowDown01Icon,
  Cancel01Icon,
  Search01Icon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useMemo, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  GOOGLE_FONTS,
  loadGoogleFont,
  preloadFontPickerFonts,
} from "./font-constants";

interface FontPickerPopoverProps {
  value: string;
  onChange: (fontFamily: string) => void;
}

export function FontPickerPopover({ value, onChange }: FontPickerPopoverProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Preload batch fonts when popover opens for instant preview styling
  useEffect(() => {
    if (open) {
      preloadFontPickerFonts();
    }
  }, [open]);

  // Ensure current active font is loaded in browser
  useEffect(() => {
    if (value) {
      loadGoogleFont(value);
    }
  }, [value]);

  const filteredFonts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return GOOGLE_FONTS;
    return GOOGLE_FONTS.filter((f) => f.toLowerCase().includes(q));
  }, [search]);

  const handleSelect = (font: string) => {
    loadGoogleFont(font);
    onChange(font);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Choose font family"
          className="flex h-7 items-center justify-between gap-1.5 rounded border border-border bg-background px-2 text-xs font-medium text-foreground transition-colors hover:bg-muted/60 focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
        >
          <span
            className="max-w-[84px] truncate"
            style={{ fontFamily: value || "inherit" }}
          >
            {value || "Inter"}
          </span>
          <HugeiconsIcon
            icon={ArrowDown01Icon}
            size={12}
            strokeWidth={2}
            className="text-muted-foreground shrink-0"
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={6}
        className="w-60 p-2 border border-border bg-popover shadow-2xl rounded-xl"
      >
        <div className="flex flex-col gap-2">
          {/* Search Bar */}
          <div className="relative">
            <HugeiconsIcon
              icon={Search01Icon}
              size={14}
              strokeWidth={1.8}
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="h-8 w-full rounded-md border border-border bg-background pl-8 pr-7 text-xs text-foreground placeholder:text-muted-foreground transition-colors hover:border-foreground/30 focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={12} strokeWidth={2} />
              </button>
            )}
          </div>

          {/* Currently selected font pill */}
          <div className="flex items-center justify-between rounded-md bg-muted/80 px-2.5 py-1.5 text-sm font-medium text-foreground">
            <span style={{ fontFamily: value || "inherit" }}>
              {value || "Roboto"}
            </span>
            <HugeiconsIcon
              icon={Tick01Icon}
              size={13}
              strokeWidth={2.5}
              className="text-primary shrink-0"
            />
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-border/60" />

          {/* Scrollable font items */}
          <div className="flex max-h-64 flex-col overflow-y-auto pr-1">
            {filteredFonts.length === 0 ? (
              <div className="py-6 text-center text-xs text-muted-foreground">
                No fonts found for &quot;{search}&quot;
              </div>
            ) : (
              filteredFonts.map((font) => {
                const isSelected = value.toLowerCase() === font.toLowerCase();
                return (
                  <button
                    key={font}
                    type="button"
                    onClick={() => handleSelect(font)}
                    className={`flex items-center justify-between rounded px-2.5 py-2 text-left transition-colors hover:bg-muted/60 cursor-pointer ${
                      isSelected ? "bg-muted/40 font-semibold" : ""
                    }`}
                  >
                    <span
                      className="text-base text-foreground leading-tight"
                      style={{ fontFamily: font }}
                    >
                      {font}
                    </span>
                    {isSelected && (
                      <HugeiconsIcon
                        icon={Tick01Icon}
                        size={13}
                        strokeWidth={2.5}
                        className="text-primary shrink-0"
                      />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
