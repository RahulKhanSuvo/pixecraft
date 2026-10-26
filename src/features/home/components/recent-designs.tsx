import {
  ArrowRight01Icon,
  MoreHorizontalIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

import { RECENT_DESIGNS } from "../data/home-data";
import type { RecentDesign } from "../types/home-types";

function DesignThumbnail({ design }: { design: RecentDesign }) {
  switch (design.previewType) {
    case "saas":
      return (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-slate-950 p-2.5 text-white flex flex-col justify-between select-none">
          {/* Mockup browser frame */}
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
            <div className="flex gap-1">
              <div className="size-1.5 rounded-full bg-slate-700" />
              <div className="size-1.5 rounded-full bg-slate-700" />
              <div className="size-1.5 rounded-full bg-slate-700" />
            </div>
            <span className="text-[8px] font-mono text-slate-500">
              app.devdesign.io
            </span>
            <div className="size-1.5" />
          </div>
          {/* Main SaaS hero mockup */}
          <div className="flex items-center gap-2 py-1">
            <div className="space-y-1 flex-1">
              <span className="text-[7px] font-bold text-purple-400 uppercase tracking-wider">
                DevDesign
              </span>
              <p className="text-[9px] font-bold leading-tight">
                SaaS Product
                <br />
                <span className="text-slate-400 font-normal">Landing Page</span>
              </p>
            </div>
            {/* Floating preview card */}
            <div className="w-16 rounded border border-slate-800 bg-slate-900 p-1 shadow-sm">
              <div className="h-2 w-full rounded-xs bg-purple-500/30" />
              <div className="mt-1 h-1 w-8 rounded-xs bg-slate-700" />
            </div>
          </div>
          <div className="flex justify-between items-center text-[7px] text-slate-500 border-t border-slate-900 pt-1">
            <div className="h-1 w-10 rounded bg-slate-800" />
            <div className="h-1 w-6 rounded bg-purple-500/50" />
          </div>
        </div>
      );

    case "mobile":
      return (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-slate-900 p-2 text-white flex items-center justify-center gap-2 select-none">
          {/* Phone Mockup 1 */}
          <div className="w-11 h-18 rounded-md border-2 border-slate-700 bg-slate-950 p-1 flex flex-col justify-between shadow-md">
            <div className="mx-auto h-0.5 w-3 rounded-full bg-slate-800" />
            <div className="space-y-0.5">
              <div className="h-1 w-6 rounded-xs bg-blue-500" />
              <div className="h-0.5 w-4 rounded-xs bg-slate-700" />
            </div>
            <div className="h-3 w-full rounded-xs bg-blue-500/20" />
          </div>
          {/* Phone Mockup 2 */}
          <div className="w-11 h-18 rounded-md border-2 border-slate-700 bg-slate-950 p-1 flex flex-col justify-between shadow-md -mt-2">
            <div className="mx-auto h-0.5 w-3 rounded-full bg-slate-800" />
            <div className="space-y-0.5">
              <div className="h-2 w-full rounded-xs bg-purple-500/20" />
              <div className="h-0.5 w-5 rounded-xs bg-slate-700" />
            </div>
            <div className="h-1 w-5 rounded-xs bg-purple-400" />
          </div>
        </div>
      );

    case "linkedin":
      return (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-linear-to-br from-slate-900 to-blue-950 p-3 text-white flex flex-col justify-between select-none">
          <div className="flex items-center justify-between">
            <span className="text-[7px] font-bold text-sky-400">DevDesign</span>
            <div className="size-3 rounded-xs bg-sky-500/20 flex items-center justify-center text-[7px] text-sky-300 font-bold">
              in
            </div>
          </div>
          <div className="my-auto">
            <p className="text-[10px] font-bold leading-tight text-white">
              Building
              <br />
              Better Developer
              <br />
              <span className="text-sky-400">Tools</span>
            </p>
          </div>
          <div className="flex items-center gap-1">
            <div className="size-2 rounded-full bg-sky-400" />
            <div className="h-0.5 w-12 rounded bg-slate-700" />
          </div>
        </div>
      );

    case "youtube":
      return (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-linear-to-r from-orange-600 via-amber-600 to-orange-700 p-3 text-white flex items-center justify-between select-none">
          <div className="space-y-1">
            <span className="text-[7px] font-bold uppercase tracking-wider bg-black/30 px-1 py-0.5 rounded">
              Tutorial
            </span>
            <p className="text-xs font-black tracking-tight leading-tight">
              Build
              <br />
              Faster
            </p>
          </div>
          {/* Mini mobile screen in thumbnail */}
          <div className="w-10 h-16 rounded-md border border-white/30 bg-black/40 p-1 flex flex-col justify-center items-center shadow-lg">
            <div className="size-4 rounded-full bg-white/20 flex items-center justify-center">
              <div className="size-1.5 rounded-full bg-white" />
            </div>
          </div>
        </div>
      );

    case "github":
      return (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-slate-950 p-3 text-white flex flex-col justify-between select-none border border-slate-800">
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full bg-emerald-400" />
            <span className="text-[7px] font-mono text-slate-400">
              README.md
            </span>
          </div>
          <div className="my-auto pr-8">
            <p className="text-[10px] font-bold leading-tight">
              Open Source
              <br />
              <span className="text-slate-400">Changes Everything</span>
            </p>
          </div>
          {/* GitHub Octocat icon shape */}
          <div className="absolute right-2.5 bottom-2.5 opacity-80">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
          </div>
        </div>
      );

    case "announcement":
      return (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-linear-to-br from-indigo-600 via-purple-600 to-violet-800 p-3 text-white flex flex-col justify-between select-none">
          <div className="flex items-center gap-1">
            <span className="text-[7px] font-bold bg-white/20 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
              Update v2.4
            </span>
          </div>
          <div className="my-auto pr-6">
            <p className="text-[10px] font-bold leading-tight">
              New Feature
              <br />
              Launch
            </p>
          </div>
          <div className="flex items-center justify-between text-[7px] text-white/70">
            <span>Read notes</span>
            <div className="size-4 rounded-full bg-white/20 flex items-center justify-center">
              ✦
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div
          className="aspect-video w-full rounded-lg"
          style={{ backgroundColor: design.thumbnailColor }}
        />
      );
  }
}

function RecentDesignCard({ design }: { design: RecentDesign }) {
  return (
    <article className="group flex flex-col">
      {/* Thumbnail container */}
      <div className="relative mb-2.5 overflow-hidden rounded-lg border border-border/80 shadow-2xs transition-all group-hover:border-primary/40 group-hover:shadow-xs">
        <Link
          href={`/editor?design=${design.id}`}
          aria-label={`Open ${design.title}`}
          className="block transition-transform duration-200 group-hover:scale-[1.02]"
        >
          <DesignThumbnail design={design} />
        </Link>
        {/* Three dots option button */}
        <button
          type="button"
          aria-label={`More options for ${design.title}`}
          className="absolute right-1.5 top-1.5 flex size-6 items-center justify-center rounded-md bg-black/60 text-white backdrop-blur-xs opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/80"
        >
          <HugeiconsIcon
            icon={MoreHorizontalIcon}
            size={14}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Design details */}
      <div className="flex items-start justify-between gap-1">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
            {design.title}
          </p>
          {design.subtitle && (
            <p className="truncate text-[11px] text-muted-foreground">
              {design.subtitle}
            </p>
          )}
          <p className="mt-0.5 truncate text-[10px] text-muted-foreground/80">
            {design.dimensions} · {design.updatedAt}
          </p>
        </div>
        <button
          type="button"
          aria-label={`Options for ${design.title}`}
          className="text-muted-foreground hover:text-foreground p-0.5"
        >
          <HugeiconsIcon
            icon={MoreHorizontalIcon}
            size={14}
            aria-hidden="true"
          />
        </button>
      </div>
    </article>
  );
}

export function RecentDesigns() {
  return (
    <section aria-labelledby="recent-heading" className="space-y-3">
      <div className="flex items-center justify-between">
        <h2
          id="recent-heading"
          className="font-heading text-base font-bold text-foreground"
        >
          Continue designing
        </h2>
        <Link
          href="/projects"
          className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          View all
          <HugeiconsIcon icon={ArrowRight01Icon} size={13} aria-hidden="true" />
        </Link>
      </div>

      <ul
        aria-label="Recent designs"
        className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6"
      >
        {RECENT_DESIGNS.map((design) => (
          <li key={design.id}>
            <RecentDesignCard design={design} />
          </li>
        ))}
      </ul>
    </section>
  );
}
