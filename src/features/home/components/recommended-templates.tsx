import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

import { RECOMMENDED_TEMPLATES } from "../data/home-data";
import type { TemplateCard } from "../types/home-types";

function TemplateThumbnail({ template }: { template: TemplateCard }) {
  switch (template.previewType) {
    case "launch":
      return (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black p-2.5 text-white flex items-center justify-between select-none">
          <div className="space-y-0.5">
            <span className="text-[6px] font-bold text-emerald-400 uppercase tracking-wider">
              NEW RELEASE
            </span>
            <p className="text-[9px] font-extrabold leading-tight">
              Launch
              <br />
              <span className="text-emerald-400">Your Idea</span>
            </p>
          </div>
          {/* Phone mockup */}
          <div className="w-8 h-14 rounded border border-emerald-500/40 bg-slate-900 p-0.5 flex flex-col justify-end shadow-sm">
            <div className="h-4 w-full rounded-xs bg-emerald-500/20" />
          </div>
        </div>
      );

    case "carousel":
      return (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-slate-900 p-2.5 text-white flex flex-col justify-between select-none border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-[6px] font-mono text-sky-400">CAROUSEL</span>
            <div className="size-2 rounded-full bg-sky-500" />
          </div>
          <div className="my-auto">
            <p className="text-[8px] font-bold leading-tight">
              Clean Code
              <br />
              <span className="text-slate-400">Better Products</span>
            </p>
          </div>
          {/* Laptop mockup representation */}
          <div className="mx-auto w-16 h-8 rounded-t border-t border-x border-slate-700 bg-slate-950 p-1">
            <div className="h-1 w-6 rounded-xs bg-sky-400/50" />
          </div>
        </div>
      );

    case "react":
      return (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-linear-to-r from-slate-950 via-slate-900 to-sky-950 p-2.5 text-white flex items-center justify-between select-none">
          <div className="space-y-0.5">
            <p className="text-[10px] font-black text-sky-400 leading-tight">
              React
            </p>
            <p className="text-[7px] font-bold text-slate-300">in 10 Minutes</p>
          </div>
          {/* React atom symbol */}
          <div className="relative size-10 flex items-center justify-center text-sky-400">
            <div className="size-2 rounded-full bg-sky-400" />
            <div className="absolute size-9 rounded-full border border-sky-400/40 rotate-45" />
            <div className="absolute size-9 rounded-full border border-sky-400/40 -rotate-45" />
          </div>
        </div>
      );

    case "build":
      return (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-linear-to-tr from-purple-900 via-indigo-900 to-pink-600 p-2.5 text-white flex flex-col justify-center items-center text-center select-none">
          <p className="text-[9px] font-black tracking-wider leading-tight">
            Build
            <br />
            Ship
            <br />
            Iterate
          </p>
        </div>
      );

    case "opensource":
      return (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-slate-950 p-2.5 text-white flex items-center justify-center gap-2 select-none border border-slate-800">
          <svg
            width="18"
            height="18"
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
          <span className="text-[9px] font-bold">Open Source</span>
        </div>
      );

    case "mobile":
      return (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-slate-900 p-2 text-white flex items-center justify-center gap-1.5 select-none">
          <div className="w-8 h-14 rounded-xs border border-slate-700 bg-slate-950 p-0.5 flex flex-col justify-between">
            <div className="h-0.5 w-3 mx-auto bg-slate-800 rounded-full" />
            <div className="h-2 w-full bg-blue-500/30 rounded-2xs" />
          </div>
          <div className="w-8 h-14 rounded-xs border border-slate-700 bg-slate-950 p-0.5 flex flex-col justify-between -mt-1">
            <div className="h-0.5 w-3 mx-auto bg-slate-800 rounded-full" />
            <div className="h-2 w-full bg-purple-500/30 rounded-2xs" />
          </div>
        </div>
      );

    case "journey":
      return (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-linear-to-b from-purple-950 to-slate-950 p-2.5 text-white flex flex-col justify-between select-none">
          <p className="text-[8px] font-bold leading-tight">
            My Dev
            <br />
            <span className="text-pink-400">Journey</span>
          </p>
          <div className="flex justify-end">
            <div className="size-6 rounded-full bg-purple-800/80 border border-purple-400/40 flex items-center justify-center text-[8px]">
              👨‍💻
            </div>
          </div>
        </div>
      );

    case "hero":
      return (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-slate-950 p-2 text-white flex items-center justify-between select-none border border-slate-800">
          <div className="space-y-0.5">
            <p className="text-[7px] font-bold text-slate-400">Modern SaaS</p>
            <p className="text-[8px] font-extrabold text-cyan-400 leading-tight">
              for Developers
            </p>
          </div>
          {/* Mockup screen */}
          <div className="w-14 h-10 rounded border border-cyan-500/30 bg-slate-900 p-1">
            <div className="h-1.5 w-8 rounded-xs bg-cyan-400/40" />
            <div className="mt-1 h-3 w-full rounded-xs bg-slate-800" />
          </div>
        </div>
      );

    default:
      return (
        <div
          className="aspect-video w-full rounded-lg"
          style={{ backgroundColor: template.thumbnailColor }}
        />
      );
  }
}

function TemplateCardItem({ template }: { template: TemplateCard }) {
  return (
    <article className="group flex flex-col">
      <div className="mb-2 overflow-hidden rounded-lg border border-border/80 shadow-2xs transition-all group-hover:border-primary/40 group-hover:shadow-xs">
        <Link
          href={`/editor?template=${template.id}`}
          aria-label={`Use template: ${template.title}`}
          className="block transition-transform duration-200 group-hover:scale-[1.02]"
        >
          <TemplateThumbnail template={template} />
        </Link>
      </div>
      <p className="truncate text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
        {template.title}
      </p>
      <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
        {template.dimensions}
      </p>
    </article>
  );
}

export function RecommendedTemplates() {
  return (
    <section aria-labelledby="recommended-heading" className="space-y-3">
      <div className="flex items-center justify-between">
        <h2
          id="recommended-heading"
          className="font-heading text-base font-bold text-foreground"
        >
          Recommended Templates
        </h2>
        <Link
          href="/templates"
          className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          View all
          <HugeiconsIcon icon={ArrowRight01Icon} size={13} aria-hidden="true" />
        </Link>
      </div>

      <ul
        aria-label="Recommended templates"
        className="grid grid-cols-2 gap-3.5 sm:grid-cols-4 lg:grid-cols-8"
      >
        {RECOMMENDED_TEMPLATES.map((template) => (
          <li key={template.id}>
            <TemplateCardItem template={template} />
          </li>
        ))}
      </ul>
    </section>
  );
}
