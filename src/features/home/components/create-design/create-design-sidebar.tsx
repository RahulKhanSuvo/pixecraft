"use client";

import {
  BubbleChatIcon,
  CropIcon,
  DashboardSquare02Icon,
  ShoppingBag01Icon,
  SmartPhone01Icon,
  Video01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";

interface CreateDesignSidebarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenCustomSize: () => void;
}

const SIDEBAR_CATEGORIES = [
  {
    id: "all",
    label: "Design Formats",
    icon: DashboardSquare02Icon,
  },
  {
    id: "social media",
    label: "Social Media",
    icon: BubbleChatIcon,
  },
  {
    id: "video & content",
    label: "Video & Content",
    icon: Video01Icon,
  },
  {
    id: "e-commerce",
    label: "E-Commerce",
    icon: ShoppingBag01Icon,
  },
  {
    id: "apps & development",
    label: "Apps & Development",
    icon: SmartPhone01Icon,
  },
] as const;

export function CreateDesignSidebar({
  selectedCategory,
  onSelectCategory,
  onOpenCustomSize,
}: CreateDesignSidebarProps) {
  return (
    <aside
      className="flex w-56 shrink-0 flex-col justify-between border-r border-border/70 bg-muted/20 p-3.5 select-none"
      aria-label="Format categories"
    >
      {/* Category List */}
      <nav className="flex flex-col gap-1">
        {SIDEBAR_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs font-medium transition-all duration-150 cursor-pointer",
                isActive
                  ? "bg-primary/10 text-primary font-semibold dark:bg-primary/20"
                  : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
              )}
              aria-current={isActive ? "true" : undefined}
            >
              <HugeiconsIcon
                icon={cat.icon}
                size={16}
                className={cn(
                  "shrink-0 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
                aria-hidden="true"
              />
              <span className="truncate">{cat.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="border-t border-border/70 pt-2">
        <button
          type="button"
          onClick={onOpenCustomSize}
          className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-foreground transition-all duration-150 hover:bg-muted/70 hover:text-primary cursor-pointer"
        >
          <HugeiconsIcon
            icon={CropIcon}
            size={16}
            className="shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <span className="truncate">Custom size</span>
        </button>
      </div>
    </aside>
  );
}
