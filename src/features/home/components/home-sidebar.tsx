"use client";

import {
  AiTemplateIcon,
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
] as const;

export function HomeSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-19 shrink-0 flex-col items-center border-r border-border bg-sidebar py-4 select-none">
      {/* Top "Create New" Button */}
      <div className="mb-3 flex flex-col items-center">
        <Link
          href="/editor"
          className="group flex flex-col items-center gap-1 focus:outline-none"
          aria-label="Create new design"
        >
          <div className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xs transition-transform group-hover:scale-105 active:scale-95">
            <HugeiconsIcon icon={PlusSignIcon} size={22} strokeWidth={2.5} />
          </div>
          <span className="text-[11px] font-medium text-foreground">
            Create
          </span>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav
        className="flex w-full flex-col items-center gap-2 px-2"
        aria-label="Main navigation"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              className="group relative flex w-full flex-col items-center justify-center gap-1 py-1 focus:outline-none"
              aria-current={isActive ? "page" : undefined}
            >
              {/* Icon Container (Active Pill Style using your theme colors) */}
              <div
                className={cn(
                  "relative flex h-9 w-12 items-center justify-center rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary dark:bg-primary/20"
                    : "text-muted-foreground group-hover:bg-muted/70 group-hover:text-foreground",
                )}
              >
                <HugeiconsIcon
                  icon={item.icon}
                  size={20}
                  className={cn(
                    "transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-foreground",
                  )}
                  aria-hidden="true"
                />
              </div>

              {/* Label */}
              <span
                className={cn(
                  "max-w-full truncate px-1 text-center text-[10px] font-medium leading-tight tracking-tight",
                  isActive
                    ? "font-semibold text-primary"
                    : "text-muted-foreground group-hover:text-foreground",
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section: Settings & Profile Avatar */}
      <div className="mt-auto flex w-full flex-col items-center gap-3 px-2 pt-4">
        {/* Settings */}
        <Link
          href="/settings"
          className="group relative flex w-full flex-col items-center justify-center gap-1 py-1 focus:outline-none"
          aria-label="Settings"
          aria-current={pathname === "/settings" ? "page" : undefined}
        >
          <div
            className={cn(
              "flex h-9 w-12 items-center justify-center rounded-xl transition-all duration-200",
              pathname === "/settings"
                ? "bg-primary/10 text-primary dark:bg-primary/20"
                : "text-muted-foreground group-hover:bg-muted/70 group-hover:text-foreground",
            )}
          >
            <HugeiconsIcon
              icon={Settings02Icon}
              size={20}
              className={cn(
                "transition-colors",
                pathname === "/settings"
                  ? "text-primary"
                  : "text-muted-foreground group-hover:text-foreground",
              )}
              aria-hidden="true"
            />
          </div>
          <span
            className={cn(
              "text-center text-[10px] font-medium leading-tight tracking-tight",
              pathname === "/settings"
                ? "font-semibold text-primary"
                : "text-muted-foreground group-hover:text-foreground",
            )}
          >
            Settings
          </span>
        </Link>

        {/* Profile Avatar */}
        <Link
          href="/profile"
          className="mt-1 flex size-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground shadow-xs transition-transform hover:scale-105 active:scale-95"
          aria-label="User Profile"
        >
          RK
        </Link>
      </div>
    </aside>
  );
}
