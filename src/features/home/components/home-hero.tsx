import {
  CropIcon,
  Megaphone01Icon,
  SmartPhone01Icon,
  Ticket01Icon,
  Video01Icon,
  YoutubeIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

import { FORMAT_PRESETS } from "../data/home-data";
import type { FormatPreset } from "../types/home-types";

type HugeIcon = React.ComponentProps<typeof HugeiconsIcon>["icon"];

const iconMap: Record<string, HugeIcon> = {
  smartphone: SmartPhone01Icon,
  megaphone: Megaphone01Icon,
  ticket: Ticket01Icon,
  video: Video01Icon,
  youtube: YoutubeIcon,
  crop: CropIcon,
};

function FormatPresetItem({ preset }: { preset: FormatPreset }) {
  const Icon = iconMap[preset.iconName] ?? CropIcon;
  const editorHref = `/editor?w=${preset.width}&h=${preset.height}&preset=${preset.id}`;

  return (
    <Link
      href={editorHref}
      className="group flex min-w-[155px] flex-1 items-center gap-3 rounded-xl border border-border/80 bg-card p-3 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xs"
    >
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-105 ${preset.iconBgClass} ${preset.iconColorClass}`}
      >
        <HugeiconsIcon icon={Icon} size={18} aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
          {preset.label}
        </p>
        <p className="truncate text-[11px] text-muted-foreground">
          {preset.description}
        </p>
      </div>
    </Link>
  );
}

export function HomeHero() {
  return (
    <section aria-labelledby="hero-heading" className="space-y-6">
      {/* Hero Header & Graphic Illustration */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <h1
            id="hero-heading"
            className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
          >
            Create stunning visuals
            <br />
            for your <span className="text-primary">next big idea</span>
          </h1>
          <p className="mt-2.5 text-sm text-muted-foreground">
            Design mockups, social posts, banners, and more — built for
            developers.
          </p>
        </div>

        {/* Developer illustration matching reference image */}
        <div
          aria-hidden="true"
          className="relative hidden select-none items-center justify-center pr-6 lg:flex"
        >
          {/* Subtle purple background glow */}
          <div className="absolute -inset-2 rounded-2xl bg-primary/10 blur-xl" />

          {/* Layered illustration cards */}
          <div className="relative flex items-center">
            {/* Dark code window card */}
            <div className="w-48 rounded-xl border border-slate-700 bg-slate-900/90 p-3 shadow-lg backdrop-blur-xs">
              <div className="flex items-center gap-1.5 pb-2 border-b border-slate-800">
                <div className="size-2 rounded-full bg-rose-500/80" />
                <div className="size-2 rounded-full bg-amber-500/80" />
                <div className="size-2 rounded-full bg-emerald-500/80" />
                <span className="ml-auto font-mono text-[9px] text-purple-400 font-semibold">
                  {"</>"}
                </span>
              </div>
              <div className="mt-2 space-y-1 font-mono text-[9px] text-slate-400">
                <div className="h-1.5 w-16 rounded bg-purple-500/40" />
                <div className="h-1.5 w-24 rounded bg-slate-700" />
                <div className="h-1.5 w-20 rounded bg-slate-700/80" />
              </div>
            </div>

            {/* Light design mockup card overlapping */}
            <div className="-ml-12 mt-6 w-36 rounded-xl border border-border bg-card p-2.5 shadow-xl">
              <div className="h-12 w-full rounded-lg bg-linear-to-br from-purple-100 to-indigo-50 dark:from-purple-950/40 dark:to-indigo-950/20 p-2 flex items-center justify-center">
                <div className="size-6 rounded-md bg-primary/20 flex items-center justify-center">
                  <div className="size-2.5 rounded-xs bg-primary" />
                </div>
              </div>
              <div className="mt-2 space-y-1">
                <div className="h-1.5 w-14 rounded bg-foreground/20" />
                <div className="h-1 w-10 rounded bg-foreground/10" />
              </div>
            </div>

            {/* Handwritten style text & arrow indicator */}
            <div className="ml-4 flex flex-col items-center">
              <span className="font-heading text-xs font-semibold leading-tight text-primary">
                Design
                <br />
                Build
                <br />
                Share
              </span>
              {/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary mt-1"
              >
                <path
                  d="M6 6C14 8 20 16 18 26M18 26L13 22M18 26L23 23"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Format presets row */}
      <ul
        aria-label="Quick format presets"
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
      >
        {FORMAT_PRESETS.map((preset) => (
          <li key={preset.id}>
            <FormatPresetItem preset={preset} />
          </li>
        ))}
      </ul>
    </section>
  );
}
