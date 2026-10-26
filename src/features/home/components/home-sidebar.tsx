"use client";

import {
  AiTemplateIcon,
  BrandfetchIcon,
  FolderLibraryIcon,
  Home01Icon,
  PlusSignIcon,
  Settings02Icon,
  Upload02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const navItems = [
  { id: "home", label: "Home", href: "/", icon: Home01Icon },
  {
    id: "projects",
    label: "Projects",
    href: "/projects",
    icon: FolderLibraryIcon,
  },
  {
    id: "templates",
    label: "Templates",
    href: "/templates",
    icon: AiTemplateIcon,
  },
  { id: "uploads", label: "Uploads", href: "/uploads", icon: Upload02Icon },
  { id: "brand", label: "Brand Assets", href: "/brand", icon: BrandfetchIcon },
] as const;

export function HomeSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-border bg-sidebar">
      {/* Brand Logo */}
      <div className="flex h-14 items-center gap-2.5 px-4">
        <div className="flex size-7 items-center justify-center rounded-lg bg-primary shadow-xs">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Pixecraft Logo"
          >
            <path
              d="M6 6V18M6 12L14 6M6 12L14 18"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle cx="18" cy="6" r="2.2" fill="white" />
          </svg>
        </div>
        <span className="font-heading text-base font-semibold tracking-tight text-foreground">
          Pixecraft
        </span>
      </div>

      {/* Main Navigation & Create CTA */}
      <div className="flex flex-col gap-3 px-3 py-2">
        <nav className="flex flex-col gap-1" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary font-semibold dark:bg-primary/20"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <HugeiconsIcon
                  icon={item.icon}
                  size={18}
                  className={
                    isActive ? "text-primary" : "text-muted-foreground"
                  }
                  aria-hidden="true"
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Create New CTA */}
        <Link
          href="/editor"
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-sm font-medium text-white shadow-xs transition-all hover:bg-primary/90 hover:shadow-sm"
          aria-label="Create new design"
        >
          <HugeiconsIcon icon={PlusSignIcon} size={16} aria-hidden="true" />
          Create New
        </Link>
      </div>

      {/* Settings at the bottom */}
      <div className="mt-auto border-t border-border p-3">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
        >
          <HugeiconsIcon icon={Settings02Icon} size={18} aria-hidden="true" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
