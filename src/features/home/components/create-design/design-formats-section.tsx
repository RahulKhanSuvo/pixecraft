"use client";

import { useMemo } from "react";
import { DESIGN_FORMATS, type FormatCategory } from "../../data/design-formats";
import { CustomSizeCard } from "./custom-size-card";
import { FormatCard } from "./format-card";

interface DesignFormatsSectionProps {
  searchQuery?: string;
  selectedCategory?: string; // category title or "all"
  onSelectFormat?: () => void;
  onOpenCustomSize: () => void;
}

export function DesignFormatsSection({
  searchQuery = "",
  selectedCategory = "all",
  onSelectFormat,
  onOpenCustomSize,
}: DesignFormatsSectionProps) {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredCategories = useMemo(() => {
    return DESIGN_FORMATS.map((cat: FormatCategory) => {
      // If a specific category is selected and it's not "all", skip other categories
      if (
        selectedCategory !== "all" &&
        cat.category.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return null;
      }

      const filteredItems = cat.items.filter((item) => {
        if (!normalizedQuery) return true;
        const matchesName = item.name.toLowerCase().includes(normalizedQuery);
        const matchesCategory = cat.category
          .toLowerCase()
          .includes(normalizedQuery);
        const matchesDimensions = `${item.width}x${item.height}`.includes(
          normalizedQuery.replace(/\s+/g, ""),
        );
        return matchesName || matchesCategory || matchesDimensions;
      });

      if (filteredItems.length === 0) return null;

      return {
        category: cat.category,
        items: filteredItems,
      };
    }).filter(
      (
        cat,
      ): cat is {
        category: string;
        items: (typeof DESIGN_FORMATS)[number]["items"];
      } => cat !== null,
    );
  }, [normalizedQuery, selectedCategory]);

  const totalResults = useMemo(() => {
    return filteredCategories.reduce((sum, cat) => sum + cat.items.length, 0);
  }, [filteredCategories]);

  return (
    <div className="flex flex-col gap-6">
      {/* Search results count summary */}
      {normalizedQuery && (
        <div className="flex items-center justify-between border-b border-border/60 pb-2 text-xs text-muted-foreground">
          <span>
            Found {totalResults} {totalResults === 1 ? "format" : "formats"}{" "}
            matching &ldquo;{searchQuery}&rdquo;
          </span>
        </div>
      )}

      {/* Quick Custom Size Option */}
      {!normalizedQuery && selectedCategory === "all" && (
        <section aria-labelledby="custom-size-heading">
          <h3
            id="custom-size-heading"
            className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Custom Dimensions
          </h3>
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            <CustomSizeCard onClick={onOpenCustomSize} />
          </div>
        </section>
      )}

      {/* Filtered / Predefined Format Categories */}
      {filteredCategories.length > 0 ? (
        filteredCategories.map((cat) => (
          <section
            key={cat.category}
            aria-labelledby={`category-${cat.category}`}
          >
            <div className="mb-2.5 flex items-center justify-between">
              <h3
                id={`category-${cat.category}`}
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                {cat.category}
              </h3>
              <span className="text-[11px] text-muted-foreground font-mono">
                {cat.items.length}{" "}
                {cat.items.length === 1 ? "format" : "formats"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {cat.items.map((item) => (
                <FormatCard
                  key={item.id}
                  format={item}
                  onSelect={onSelectFormat}
                />
              ))}
            </div>
          </section>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-sm font-medium text-foreground">
            No formats found for &ldquo;{searchQuery}&rdquo;
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Try searching for something else or create a custom canvas size.
          </p>
          <div className="mt-4">
            <button
              type="button"
              onClick={onOpenCustomSize}
              className="text-xs font-semibold text-primary underline underline-offset-4 hover:opacity-80"
            >
              Open Custom Size Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
