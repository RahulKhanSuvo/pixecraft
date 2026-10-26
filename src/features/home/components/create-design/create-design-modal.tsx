"use client";

import { Cancel01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateDesignSidebar } from "./create-design-sidebar";
import { CustomSizeModal } from "./custom-size-modal";
import { DesignFormatsSection } from "./design-formats-section";

interface CreateDesignModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateDesignModal({
  open,
  onOpenChange,
}: CreateDesignModalProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [customSizeOpen, setCustomSizeOpen] = useState(false);

  const handleClose = () => {
    onOpenChange(false);
    setSearchQuery("");
    setSelectedCategory("all");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          style={{
            width: "95vw",
            maxWidth: "1240px",
            height: "88vh",
            maxHeight: "860px",
          }}
          className="flex flex-col gap-0 overflow-hidden p-0 rounded-2xl border-border/80 shadow-2xl w-[95vw] sm:max-w-5xl md:max-w-6xl lg:max-w-7xl h-[88vh] max-h-[860px]"
          aria-describedby={undefined}
        >
          {/* Header with Title and Wide Search Input */}
          <DialogHeader className="border-b border-border/80 px-6 py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pr-8">
              <DialogTitle className="font-heading text-xl font-bold tracking-tight text-foreground">
                Create a design
              </DialogTitle>

              {/* Search Bar matching Canva reference style */}
              <div className="relative w-full sm:w-[440px] md:w-[520px]">
                <HugeiconsIcon
                  icon={Search01Icon}
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  placeholder="What would you like to create?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 w-full rounded-xl border border-border/80 bg-muted/40 pl-10 pr-9 text-xs font-medium text-foreground placeholder:text-muted-foreground/80 focus:border-primary/80 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  aria-label="Search design formats"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                    aria-label="Clear search"
                  >
                    <HugeiconsIcon icon={Cancel01Icon} size={15} />
                  </button>
                )}
              </div>
            </div>
          </DialogHeader>

          {/* Modal Main Body */}
          <div className="flex flex-1 overflow-hidden">
            {/* Category Sidebar */}
            <CreateDesignSidebar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onOpenCustomSize={() => setCustomSizeOpen(true)}
            />

            {/* Formats Grid Content */}
            <main
              className="flex-1 overflow-y-auto p-6"
              aria-label="Available design formats"
            >
              <DesignFormatsSection
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                onSelectFormat={handleClose}
                onOpenCustomSize={() => setCustomSizeOpen(true)}
              />
            </main>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sub-modal for Custom Dimensions */}
      <CustomSizeModal
        open={customSizeOpen}
        onOpenChange={setCustomSizeOpen}
        onSuccess={handleClose}
      />
    </>
  );
}
