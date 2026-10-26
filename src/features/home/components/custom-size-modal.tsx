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

interface CustomSizeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Convert units to standard pixels (96 DPI)
const convertToPixels = (value: number, unit: string) => {
  switch (unit) {
    case "in":
      return Math.round(value * 96);
    case "cm":
      return Math.round(value * 37.795);
    case "mm":
      return Math.round(value * 3.7795);
    default:
      return Math.round(value);
  }
};

export function CustomSizeModal({ isOpen, onClose }: CustomSizeModalProps) {
  const router = useRouter();
  const [width, setWidth] = useState("1080");
  const [height, setHeight] = useState("1080");
  const [unit, setUnit] = useState("px");
  const [error, setError] = useState<string | null>(null);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const numWidth = parseFloat(width);
    const numHeight = parseFloat(height);

    if (
      isNaN(numWidth) ||
      numWidth <= 0 ||
      isNaN(numHeight) ||
      numHeight <= 0
    ) {
      setError("Please enter valid positive numbers.");
      return;
    }

    const pixelWidth = convertToPixels(numWidth, unit);
    const pixelHeight = convertToPixels(numHeight, unit);

    // Max limit to prevent canvas crashes (e.g., 8000px)
    if (pixelWidth > 8000 || pixelHeight > 8000) {
      setError("Dimensions too large. Maximum size is 8000x8000 pixels.");
      return;
    }

    // Navigate to editor with query params
    // Modify this route to match your actual editor path
    router.push(`/editor?w=${pixelWidth}&h=${pixelHeight}&name=Custom+Size`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleCreate}>
          <DialogHeader>
            <DialogTitle>Custom Size</DialogTitle>
            <DialogDescription>
              Create a blank canvas with your exact dimensions.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex gap-4">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="width">Width</Label>
                <Input
                  id="width"
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  min="1"
                />
              </div>
              <div className="grid flex-1 gap-2">
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  min="1"
                />
              </div>
              <div className="grid w-[80px] gap-2">
                <Label htmlFor="unit">Unit</Label>
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger id="unit">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="px">px</SelectItem>
                    <SelectItem value="in">in</SelectItem>
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="mm">mm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Design</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
