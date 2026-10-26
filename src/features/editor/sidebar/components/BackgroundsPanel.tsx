"use client";

import {
  Cancel01Icon,
  Palette,
  Search01Icon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMemo, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ColorPicker } from "../../components/color-picker/color-picker";
import { useDocumentStore } from "../../stores/document-store";

interface BackgroundPhoto {
  id: string;
  title: string;
  url: string;
  aspectRatio: string;
  tags: string[];
}

const PRESET_SWATCHES = [
  { label: "White", value: "#ffffff" },
  { label: "Blue", value: "#3b82f6" },
  { label: "Orange", value: "#f97316" },
  { label: "Green", value: "#84cc16" },
  { label: "Yellow", value: "#facc15" },
  { label: "Purple", value: "#a855f7" },
];

// Curated high-resolution Unsplash abstract & gradient backgrounds
// matched closely with the reference design
const BACKGROUND_PHOTOS: BackgroundPhoto[] = [
  {
    id: "abstract-curve",
    title: "Abstract Curve",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "aspect-[16/10]",
    tags: [
      "abstract",
      "curve",
      "blur",
      "minimal",
      "monochrome",
      "wave",
      "light",
      "dark",
    ],
  },
  {
    id: "purple-nebula",
    title: "Purple Grain Nebula",
    url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "aspect-[16/10]",
    tags: [
      "purple",
      "blue",
      "grain",
      "mesh",
      "neon",
      "dark",
      "indigo",
      "gradient",
    ],
  },
  {
    id: "sunset-horizon",
    title: "Sunset Horizon Blur",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "aspect-[16/10]",
    tags: [
      "sunset",
      "sunrise",
      "horizon",
      "beach",
      "ocean",
      "blur",
      "peach",
      "pink",
      "blue",
    ],
  },
  {
    id: "solar-aura",
    title: "Warm Solar Aura",
    url: "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "aspect-[9/16]",
    tags: [
      "aura",
      "orb",
      "sun",
      "orange",
      "yellow",
      "pastel",
      "blue",
      "circle",
      "minimal",
    ],
  },
  {
    id: "deep-ocean-mesh",
    title: "Deep Ocean Mesh",
    url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "aspect-[4/5]",
    tags: [
      "teal",
      "cyan",
      "navy",
      "blue",
      "deep",
      "mesh",
      "gradient",
      "minimal",
    ],
  },
  {
    id: "liquid-fire-wave",
    title: "Liquid Fire Wave",
    url: "https://images.unsplash.com/photo-1550684847-75bdda21cc95?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "aspect-[16/10]",
    tags: ["liquid", "fire", "orange", "red", "fluid", "warm", "wave", "flow"],
  },
  {
    id: "sky-horizon-glow",
    title: "Sky Horizon Glow",
    url: "https://images.unsplash.com/photo-1439405326854-014607f694d7?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "aspect-[4/5]",
    tags: [
      "horizon",
      "sky",
      "white",
      "blue",
      "navy",
      "clean",
      "minimal",
      "dawn",
    ],
  },
  {
    id: "violet-dusk",
    title: "Violet Dusk Gradient",
    url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "aspect-[16/10]",
    tags: ["violet", "dusk", "plum", "bronze", "purple", "evening", "moody"],
  },
  {
    id: "emerald-flow",
    title: "Emerald Flow",
    url: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "aspect-[16/10]",
    tags: ["green", "emerald", "mint", "lime", "fresh", "nature", "gradient"],
  },
  {
    id: "golden-glow",
    title: "Golden Glow",
    url: "https://images.unsplash.com/photo-1557682260-96773eb01377?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "aspect-[4/5]",
    tags: ["yellow", "gold", "orange", "warm", "sunrise", "light"],
  },
  {
    id: "prism-spectrum",
    title: "Prism Spectrum",
    url: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "aspect-[16/10]",
    tags: ["rainbow", "vibrant", "multicolor", "spectrum", "mesh", "gradient"],
  },
  {
    id: "electric-magenta",
    title: "Electric Magenta",
    url: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "aspect-[9/16]",
    tags: ["magenta", "pink", "violet", "purple", "neon", "bright"],
  },
  {
    id: "minimalist-silk",
    title: "Minimalist Silk",
    url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "aspect-[16/10]",
    tags: ["minimal", "silk", "grey", "white", "neutral", "aesthetic", "clean"],
  },
  {
    id: "cosmic-mist",
    title: "Cosmic Mist",
    url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "aspect-[16/10]",
    tags: ["stars", "cosmic", "night", "dark", "mist", "mountain", "violet"],
  },
  {
    id: "pastel-cloudscape",
    title: "Pastel Cloudscape",
    url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "aspect-[9/16]",
    tags: ["pastel", "cloud", "soft", "pink", "sky", "dreamy"],
  },
  {
    id: "atmospheric-dawn",
    title: "Atmospheric Dawn",
    url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "aspect-[16/10]",
    tags: ["dawn", "morning", "fog", "calm", "serene", "nature"],
  },
];

export function BackgroundsPanel() {
  const background = useDocumentStore((s) => s.background);
  const setBackground = useDocumentStore((s) => s.setBackground);
  const [search, setSearch] = useState("");

  const filteredPhotos = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return BACKGROUND_PHOTOS;
    return BACKGROUND_PHOTOS.filter(
      (photo) =>
        photo.title.toLowerCase().includes(q) ||
        photo.tags.some((tag) => tag.toLowerCase().includes(q)),
    );
  }, [search]);

  // Distribute items into 2 masonry columns for true tight staggered layout
  const [col1, col2] = useMemo(() => {
    const c1: BackgroundPhoto[] = [];
    const c2: BackgroundPhoto[] = [];
    filteredPhotos.forEach((photo, idx) => {
      if (idx % 2 === 0) c1.push(photo);
      else c2.push(photo);
    });
    return [c1, c2];
  }, [filteredPhotos]);

  const isCustomColor =
    Boolean(background) &&
    background !== "transparent" &&
    !PRESET_SWATCHES.some(
      (s) => s.value.toLowerCase() === background.toLowerCase(),
    ) &&
    !BACKGROUND_PHOTOS.some((p) => p.url === background);

  return (
    <div className="flex h-full flex-col gap-3.5">
      {/* 1. Top row of swatches */}
      <div className="flex items-center justify-between gap-1.5 shrink-0">
        {/* Custom color picker button */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={`group relative flex size-7.5 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-background transition-all hover:border-foreground/40 hover:bg-muted/50 focus:outline-none cursor-pointer ${
                isCustomColor
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  : ""
              }`}
              title="Custom Color"
              aria-label="Custom Color Picker"
            >
              <HugeiconsIcon
                icon={Palette}
                size={17}
                strokeWidth={1.8}
                className="text-foreground transition-transform group-hover:scale-110"
              />
              {isCustomColor && (
                <span
                  className="absolute bottom-0.5 right-0.5 size-1.5 rounded-full ring-1 ring-background"
                  style={{ background }}
                />
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 border-none bg-transparent shadow-2xl"
            align="start"
            sideOffset={8}
          >
            <ColorPicker value={background} onChange={setBackground} />
          </PopoverContent>
        </Popover>

        {/* 6 Preset Color Swatches */}
        {PRESET_SWATCHES.map((swatch) => {
          const isSelected =
            background?.toLowerCase() === swatch.value.toLowerCase();
          return (
            <button
              key={swatch.value}
              type="button"
              onClick={() => setBackground(swatch.value)}
              title={swatch.label}
              aria-label={swatch.label}
              className={`size-7.5 shrink-0 rounded-lg border border-border/70 transition-all hover:scale-105 active:scale-95 focus:outline-none cursor-pointer ${
                isSelected
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-xs"
                  : "hover:border-foreground/30"
              }`}
              style={{ backgroundColor: swatch.value }}
            />
          );
        })}

        {/* Transparent Checkerboard Swatch */}
        <button
          type="button"
          onClick={() => setBackground("transparent")}
          title="Transparent background"
          aria-label="Transparent background"
          className={`relative size-7.5 shrink-0 overflow-hidden rounded-lg border border-border/80 transition-all hover:scale-105 active:scale-95 focus:outline-none cursor-pointer ${
            background === "transparent"
              ? "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-xs"
              : "hover:border-foreground/40"
          }`}
          style={{
            backgroundImage:
              "conic-gradient(#cbd5e1 90deg, #ffffff 90deg 180deg, #cbd5e1 180deg 270deg, #ffffff 270deg)",
            backgroundSize: "7px 7px",
          }}
        />
      </div>

      {/* 2. Search bar */}
      <div className="relative shrink-0">
        <HugeiconsIcon
          icon={Search01Icon}
          size={15}
          strokeWidth={1.8}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="h-8.5 w-full rounded-lg border border-border bg-background pl-8.5 pr-8 text-xs text-foreground placeholder:text-muted-foreground transition-colors hover:border-foreground/30 focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Clear search"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={13} strokeWidth={2} />
          </button>
        )}
      </div>

      {/* 3. Subtitle / Attribution */}
      <div className="shrink-0 text-center">
        <p className="text-[11px] text-muted-foreground">
          Photos by{" "}
          <a
            href="https://unsplash.com?utm_source=pixecraft&utm_medium=referral"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
          >
            Unsplash
          </a>
        </p>
      </div>

      {/* 4. 2-Column Photo Grid (Scrollable) */}
      <div className="relative flex-1 min-h-0 overflow-y-auto pr-1">
        {filteredPhotos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-xs text-muted-foreground">
              No backgrounds found for &quot;{search}&quot;
            </p>
            <button
              type="button"
              onClick={() => setSearch("")}
              className="mt-2 text-xs font-medium text-primary hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="flex items-start gap-2 pb-2">
            {/* Column 1 */}
            <div className="flex flex-1 flex-col gap-2">
              {col1.map((photo) => {
                const isSelected = background === photo.url;
                return (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => setBackground(photo.url)}
                    title={photo.title}
                    aria-label={`Set background: ${photo.title}`}
                    className={`group relative w-full overflow-hidden rounded-lg border border-border/70 bg-muted/40 transition-all hover:border-foreground/30 hover:shadow-xs active:scale-[0.98] focus:outline-none cursor-pointer ${
                      photo.aspectRatio
                    } ${
                      isSelected
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                        : ""
                    }`}
                  >
                    {/* biome-ignore lint/performance/noImgElement: Unsplash preview thumbnail */}
                    <img
                      src={photo.url}
                      alt={photo.title}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {isSelected && (
                      <span className="absolute bottom-1.5 right-1.5 flex size-4.5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xs">
                        <HugeiconsIcon
                          icon={Tick01Icon}
                          size={11}
                          strokeWidth={2.5}
                        />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Column 2 */}
            <div className="flex flex-1 flex-col gap-2">
              {col2.map((photo) => {
                const isSelected = background === photo.url;
                return (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => setBackground(photo.url)}
                    title={photo.title}
                    aria-label={`Set background: ${photo.title}`}
                    className={`group relative w-full overflow-hidden rounded-lg border border-border/70 bg-muted/40 transition-all hover:border-foreground/30 hover:shadow-xs active:scale-[0.98] focus:outline-none cursor-pointer ${
                      photo.aspectRatio
                    } ${
                      isSelected
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                        : ""
                    }`}
                  >
                    {/* biome-ignore lint/performance/noImgElement: Unsplash preview thumbnail */}
                    <img
                      src={photo.url}
                      alt={photo.title}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {isSelected && (
                      <span className="absolute bottom-1.5 right-1.5 flex size-4.5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xs">
                        <HugeiconsIcon
                          icon={Tick01Icon}
                          size={11}
                          strokeWidth={2.5}
                        />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
