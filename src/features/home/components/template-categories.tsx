import {
  BubbleChatIcon,
  CodeIcon,
  Globe02Icon,
  GridIcon,
  Rocket01Icon,
  SmartPhone01Icon,
  Video01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

import { TEMPLATE_CATEGORIES } from "../data/home-data";
import type { TemplateCategory } from "../types/home-types";

type HugeIcon = React.ComponentProps<typeof HugeiconsIcon>["icon"];

const iconMap: Record<string, HugeIcon> = {
  socialMedia: BubbleChatIcon,
  smartphone: SmartPhone01Icon,
  code: CodeIcon,
  rocket: Rocket01Icon,
  video: Video01Icon,
  globe: Globe02Icon,
  grid: GridIcon,
};

function CategoryCard({ category }: { category: TemplateCategory }) {
  const Icon = iconMap[category.iconName] ?? GridIcon;

  return (
    <Link
      href={`/templates?category=${category.id}`}
      className="group flex flex-col rounded-xl border border-border/80 bg-card p-4 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xs"
    >
      <div
        className={`mb-3 flex size-10 items-center justify-center rounded-lg transition-transform group-hover:scale-105 ${category.iconBgClass} ${category.iconColorClass}`}
      >
        <HugeiconsIcon icon={Icon} size={20} aria-hidden="true" />
      </div>
      <p className="truncate text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
        {category.label}
      </p>
      <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
        {category.description}
      </p>
    </Link>
  );
}

export function TemplateCategories() {
  return (
    <section aria-labelledby="categories-heading" className="space-y-3">
      <h2
        id="categories-heading"
        className="font-heading text-base font-bold text-foreground"
      >
        Explore Categories
      </h2>

      <ul
        aria-label="Template categories"
        className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7"
      >
        {TEMPLATE_CATEGORIES.map((category) => (
          <li key={category.id}>
            <CategoryCard category={category} />
          </li>
        ))}
      </ul>
    </section>
  );
}
