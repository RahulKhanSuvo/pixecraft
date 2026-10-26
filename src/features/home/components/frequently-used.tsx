import {
  CropIcon,
  Facebook01Icon,
  GithubIcon,
  InstagramIcon,
  Linkedin01Icon,
  NewTwitterIcon,
  Video01Icon,
  YoutubeIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

import { FREQUENTLY_USED_ITEMS } from "../data/home-data";
import type { FrequentlyUsedItem } from "../types/home-types";

type HugeIcon = React.ComponentProps<typeof HugeiconsIcon>["icon"];

const iconMap: Record<string, { icon: HugeIcon; color: string; bg: string }> = {
  linkedin: {
    icon: Linkedin01Icon,
    color: "text-[#0a66c2]",
    bg: "bg-[#0a66c2]/10",
  },
  twitter: {
    icon: NewTwitterIcon,
    color: "text-foreground",
    bg: "bg-muted",
  },
  instagram: {
    icon: InstagramIcon,
    color: "text-[#e4405f]",
    bg: "bg-[#e4405f]/10",
  },
  youtube: {
    icon: YoutubeIcon,
    color: "text-[#ff0000]",
    bg: "bg-[#ff0000]/10",
  },
  github: {
    icon: GithubIcon,
    color: "text-foreground",
    bg: "bg-muted",
  },
  facebook: {
    icon: Facebook01Icon,
    color: "text-[#1877f2]",
    bg: "bg-[#1877f2]/10",
  },
  reel: {
    icon: Video01Icon,
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-100/80 dark:bg-purple-950/40",
  },
  custom: {
    icon: CropIcon,
    color: "text-slate-600 dark:text-slate-400",
    bg: "bg-slate-100 dark:bg-slate-800",
  },
};

function FrequentlyUsedCard({ item }: { item: FrequentlyUsedItem }) {
  const iconConfig = iconMap[item.iconName] ?? iconMap.custom;
  const editorHref = `/editor?w=${item.width}&h=${item.height}&preset=${item.id}`;

  return (
    <Link
      href={editorHref}
      className="group flex flex-1 min-w-[140px] items-center gap-2.5 rounded-xl border border-border/80 bg-card p-2.5 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xs"
    >
      <div
        className={`flex size-8 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-105 ${iconConfig.bg} ${iconConfig.color}`}
      >
        <HugeiconsIcon icon={iconConfig.icon} size={16} aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
          {item.label}
        </p>
        <p className="truncate text-[10px] text-muted-foreground">
          {item.dimensions}
        </p>
      </div>
    </Link>
  );
}

export function FrequentlyUsed() {
  return (
    <section aria-labelledby="frequently-used-heading" className="space-y-3">
      <h2
        id="frequently-used-heading"
        className="font-heading text-base font-bold text-foreground"
      >
        Frequently used
      </h2>

      <ul
        aria-label="Frequently used dimensions"
        className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8"
      >
        {FREQUENTLY_USED_ITEMS.map((item) => (
          <li key={item.id}>
            <FrequentlyUsedCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
