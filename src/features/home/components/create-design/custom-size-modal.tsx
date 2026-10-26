"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type DimensionUnit = "px" | "in" | "cm" | "mm";

interface CustomSizeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function convertToPixels(value: number, unit: DimensionUnit): number {
  switch (unit) {
    case "in":
      return Math.round(value * 96);
    case "cm":
      return Math.round((value * 96) / 2.54);
    case "mm":
      return Math.round((value * 96) / 25.4);
    default:
      return Math.round(value);
  }
}

export function CustomSizeModal({
  open,
  onOpenChange,
  onSuccess,
}: CustomSizeModalProps) {
  const router = useRouter();
  const [width, setWidth] = useState("1080");
  const [height, setHeight] = useState("1080");
  const [unit, setUnit] = useState<DimensionUnit>("px");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const numWidth = Number.parseFloat(width);
    const numHeight = Number.parseFloat(height);

    if (
      Number.isNaN(numWidth) ||
      numWidth <= 0 ||
      Number.isNaN(numHeight) ||
      numHeight <= 0
    ) {
      setError("Please enter valid positive numbers for width and height.");
      return;
    }

    const pixelWidth = convertToPixels(numWidth, unit);
    const pixelHeight = convertToPixels(numHeight, unit);

    if (pixelWidth < 10 || pixelHeight < 10) {
      setError("Canvas dimensions must be at least 10 × 10 pixels.");
      return;
    }

    if (pixelWidth > 8000 || pixelHeight > 8000) {
      setError("Canvas dimensions cannot exceed 8,000 × 8,000 pixels.");
      return;
    }

    onOpenChange(false);
    onSuccess?.();
    router.push(
      `/editor?w=${pixelWidth}&h=${pixelHeight}&name=${encodeURIComponent("Custom Size")}`,
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Custom Size</DialogTitle>
            <DialogDescription>
              Create a new blank canvas with your specified dimensions.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-5">
            <div className="grid grid-cols-12 gap-3">
              {/* Width */}
              <div className="col-span-5 grid gap-1.5">
                <Label htmlFor="custom-width" className="text-xs">
                  Width
                </Label>
                <Input
                  id="custom-width"
                  type="number"
                  step="any"
                  min="0.1"
                  value={width}
                  onChange={(e) => {
                    setWidth(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="1080"
                  className="h-9 text-xs"
                  required
                />
              </div>

              {/* Height */}
              <div className="col-span-4 grid gap-1.5">
                <Label htmlFor="custom-height" className="text-xs">
                  Height
                </Label>
                <Input
                  id="custom-height"
                  type="number"
                  step="any"
                  min="0.1"
                  value={height}
                  onChange={(e) => {
                    setHeight(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="1080"
                  className="h-9 text-xs"
                  required
                />
              </div>

              {/* Unit Selector */}
              <div className="col-span-3 grid gap-1.5">
                <Label htmlFor="custom-unit" className="text-xs">
                  Unit
                </Label>
                <Select
                  value={unit}
                  onValueChange={(val) => setUnit(val as DimensionUnit)}
                >
                  <SelectTrigger id="custom-unit" className="h-9 text-xs">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="px" className="text-xs">
                      px
                    </SelectItem>
                    <SelectItem value="in" className="text-xs">
                      in
                    </SelectItem>
                    <SelectItem value="cm" className="text-xs">
                      cm
                    </SelectItem>
                    <SelectItem value="mm" className="text-xs">
                      mm
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Approximate pixel size preview if unit is not px */}
            {unit !== "px" &&
              !Number.isNaN(Number.parseFloat(width)) &&
              !Number.isNaN(Number.parseFloat(height)) &&
              Number.parseFloat(width) > 0 &&
              Number.parseFloat(height) > 0 && (
                <p className="text-[11px] text-muted-foreground">
                  Converts to ~{convertToPixels(Number.parseFloat(width), unit)}{" "}
                  × {convertToPixels(Number.parseFloat(height), unit)} px at 96
                  DPI
                </p>
              )}

            {error && (
              <p
                role="alert"
                className="rounded-md bg-destructive/10 p-2 text-xs font-medium text-destructive"
              >
                {error}
              </p>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Design</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
