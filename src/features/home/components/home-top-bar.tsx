"use client";

import { Notification01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function HomeTopBar() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-background px-6">
      {/* Search Input */}
      <div className="relative w-80 md:w-96">
        <HugeiconsIcon
          icon={Search01Icon}
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Search templates, formats, or anything..."
          aria-label="Search"
          className="h-9 w-full rounded-lg border border-border/80 bg-muted/30 pl-9 pr-10 text-xs text-foreground placeholder:text-muted-foreground/80 focus:border-ring focus:bg-background focus:outline-none focus:ring-1 focus:ring-ring transition-all"
        />
        <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden select-none rounded border border-border bg-muted/60 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground sm:inline">
          ⌘ K
        </kbd>
      </div>

      {/* Right actions: notification + avatar */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
        >
          <HugeiconsIcon
            icon={Notification01Icon}
            size={18}
            aria-hidden="true"
          />
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-primary" />
        </button>

        <button
          type="button"
          aria-label="User account"
          className="rounded-full ring-2 ring-transparent transition-all hover:ring-primary/30"
        >
          <Avatar className="size-8">
            <AvatarFallback className="bg-primary text-white text-xs font-semibold">
              J
            </AvatarFallback>
          </Avatar>
        </button>
      </div>
    </header>
  );
}
