interface FormatPreviewProps {
  width: number;
  height: number;
  className?: string;
}

/**
 * Renders a visual aspect ratio preview of a canvas format.
 * Dynamically scales the preview rectangle to fit the container bounds
 * while maintaining the exact proportional aspect ratio.
 */
export function FormatPreview({
  width,
  height,
  className,
}: FormatPreviewProps) {
  const isLandscape = width >= height;

  return (
    <div
      className={`relative flex h-20 w-full items-center justify-center rounded-lg bg-muted/40 p-2.5 transition-colors group-hover:bg-muted/70 ${className ?? ""}`}
      aria-hidden="true"
    >
      <div
        className="relative flex items-center justify-center rounded-[3px] border border-primary/35 bg-card/90 shadow-2xs transition-all duration-200 group-hover:border-primary group-hover:scale-105 group-hover:shadow-xs dark:bg-card/60"
        style={{
          aspectRatio: `${width} / ${height}`,
          maxWidth: "100%",
          maxHeight: "100%",
          width: isLandscape ? "100%" : "auto",
          height: isLandscape ? "auto" : "100%",
        }}
      >
        {/* Subtle grid watermark indicating a blank canvas */}
        <div className="absolute inset-0 rounded-[2px] bg-linear-to-br from-primary/5 via-transparent to-primary/10 opacity-70" />
      </div>
    </div>
  );
}
