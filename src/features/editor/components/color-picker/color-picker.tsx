"use client";

import {
  Add01Icon,
  ArrowDown01Icon,
  ArrowLeftRightIcon,
  ArrowUp01Icon,
  Delete01Icon,
  PipetteIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  colorToHsv,
  type HSV,
  hsvToRgb,
  type LinearGradient,
  PRESET_COLORS,
  parseColor,
  parseGradient,
  rgbaToString,
  rgbToHex,
  rgbToHsv,
  serializeGradient,
} from "../../lib/color-utils";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  // ── Parse initial value ──────────────────────────────────
  const parsedGrad = parseGradient(value);
  const initialMode = parsedGrad ? "linear" : "solid";

  // Derive initial solid color string from value
  const initialSolidColor = parsedGrad
    ? (parsedGrad.stops[0]?.color ?? "#e22222")
    : value.startsWith("linear-gradient")
      ? "#e22222"
      : value;

  // ── Mode state (Solid | Linear) ──────────────────────────
  // Keep a separate "last solid color" so toggling back to solid restores it
  const [mode, setMode] = useState<"solid" | "linear">(initialMode);

  // ── Gradient state ───────────────────────────────────────
  const [gradient, setGradient] = useState<LinearGradient>(
    parsedGrad || {
      type: "linear",
      angle: 0,
      stops: [
        {
          id: "stop-1",
          offset: 0,
          color: initialSolidColor,
        },
        { id: "stop-2", offset: 1, color: "#ffffff" },
      ],
    },
  );
  const [activeStopId, setActiveStopId] = useState<string>(
    gradient.stops[0]?.id || "stop-1",
  );

  // ── HSV state — always tracks the "currently editable" color ─
  // In solid mode: the solid fill color
  // In linear mode: the active gradient stop color
  const [hsv, setHsv] = useState<HSV>(() => colorToHsv(initialSolidColor));

  // Ref to track the latest gradient without stale closures
  const gradientRef = useRef(gradient);
  gradientRef.current = gradient;

  // Sync HSV when the active stop changes (gradient mode)
  useEffect(() => {
    if (mode === "linear") {
      const stop = gradient.stops.find((s) => s.id === activeStopId);
      if (stop) {
        setHsv(colorToHsv(stop.color));
      }
    }
  }, [activeStopId, mode, gradient.stops]);

  // ── Derived rendering values ─────────────────────────────
  const { r, g, b } = hsvToRgb(hsv.h, hsv.s, hsv.v);
  const pureHue = hsvToRgb(hsv.h, 1, 1);
  const pureHueHex = rgbToHex(pureHue.r, pureHue.g, pureHue.b);
  const hexValue = rgbToHex(r, g, b).slice(1).toUpperCase();

  // Gradient bar preview css
  const sortedStops = [...gradient.stops].sort((a, b) => a.offset - b.offset);
  const gradientBarCss = `linear-gradient(to right, ${sortedStops.map((s) => `${s.color} ${Math.round(s.offset * 100)}%`).join(", ")})`;

  // ── Handle color change from HSV pickers ─────────────────
  const updateFromHsv = useCallback(
    (newHsv: HSV) => {
      setHsv(newHsv);
      const { r: nr, g: ng, b: nb } = hsvToRgb(newHsv.h, newHsv.s, newHsv.v);
      const colorStr = rgbaToString(nr, ng, nb, newHsv.a);

      if (mode === "solid") {
        onChange(colorStr);
      } else {
        const currentGrad = gradientRef.current;
        const updatedStops = currentGrad.stops.map((s) =>
          s.id === activeStopId ? { ...s, color: colorStr } : s,
        );
        const updatedGrad: LinearGradient = {
          ...currentGrad,
          stops: updatedStops,
        };
        setGradient(updatedGrad);
        onChange(serializeGradient(updatedGrad));
      }
    },
    [mode, activeStopId, onChange],
  );

  // ── Mode switch ──────────────────────────────────────────
  // Switching tabs is purely visual — onChange is NOT called here.
  // The parent value only updates when the user actively picks a color.
  const handleModeChange = (newMode: "solid" | "linear") => {
    if (newMode === mode) return;
    setMode(newMode);

    if (newMode === "linear") {
      // Seed the gradient's first stop from the current solid HSV so the
      // picker reflects the current color when the user enters linear mode.
      const { r: cr, g: cg, b: cb } = hsvToRgb(hsv.h, hsv.s, hsv.v);
      const solidColor = rgbaToString(cr, cg, cb, hsv.a);
      const currentGrad = gradientRef.current;
      const seededGrad: LinearGradient = {
        ...currentGrad,
        stops: currentGrad.stops.map((s, idx) =>
          idx === 0 ? { ...s, color: solidColor } : s,
        ),
      };
      setGradient(seededGrad);
      setActiveStopId(seededGrad.stops[0].id);
      // ← no onChange here; user must interact to apply
    }
    // When switching back to solid, hsv already holds the active stop's color
    // so the picker is ready — no extra state sync needed.
  };

  // ── Gradient stop handlers ───────────────────────────────
  const handleAddStop = () => {
    const stops = [...gradient.stops].sort((a, b) => a.offset - b.offset);
    let offset = 0.5;
    if (stops.length >= 2) {
      offset = (stops[0].offset + stops[stops.length - 1].offset) / 2;
    }
    const { r: cr, g: cg, b: cb } = hsvToRgb(hsv.h, hsv.s, hsv.v);
    const newStop = {
      id: `stop-${Date.now()}`,
      offset,
      color: rgbaToString(cr, cg, cb, hsv.a),
    };
    const updatedStops = [...gradient.stops, newStop].sort(
      (a, b) => a.offset - b.offset,
    );
    const updatedGrad: LinearGradient = { ...gradient, stops: updatedStops };
    setGradient(updatedGrad);
    setActiveStopId(newStop.id);
    onChange(serializeGradient(updatedGrad));
  };

  const handleDeleteStop = () => {
    if (gradient.stops.length <= 2) return;
    const updatedStops = gradient.stops.filter((s) => s.id !== activeStopId);
    const updatedGrad: LinearGradient = { ...gradient, stops: updatedStops };
    setGradient(updatedGrad);
    setActiveStopId(updatedStops[0].id);
    onChange(serializeGradient(updatedGrad));
  };

  const handleSwapStops = () => {
    const updatedStops = gradient.stops.map((s) => ({
      ...s,
      offset: Number((1 - s.offset).toFixed(2)),
    }));
    const updatedGrad: LinearGradient = { ...gradient, stops: updatedStops };
    setGradient(updatedGrad);
    onChange(serializeGradient(updatedGrad));
  };

  const handleAngleChange = (angle: number) => {
    const normalized = ((angle % 360) + 360) % 360;
    const updatedGrad: LinearGradient = { ...gradient, angle: normalized };
    setGradient(updatedGrad);
    onChange(serializeGradient(updatedGrad));
  };

  // ── Gradient stop drag handlers ──────────────────────────
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingStopRef = useRef(false);

  const handleStopPointerDown = (
    e: React.PointerEvent<HTMLButtonElement>,
    stopId: string,
  ) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    setActiveStopId(stopId);
    isDraggingStopRef.current = true;
  };

  const handleStopPointerMove = (
    e: React.PointerEvent<HTMLButtonElement>,
    stopId: string,
  ) => {
    if (!isDraggingStopRef.current || e.buttons === 0) return;
    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const rawOffset = (e.clientX - rect.left) / rect.width;
    const clampedOffset = Math.max(
      0,
      Math.min(1, Number(rawOffset.toFixed(2))),
    );

    const updatedStops = gradient.stops.map((s) =>
      s.id === stopId ? { ...s, offset: clampedOffset } : s,
    );
    const updatedGrad: LinearGradient = { ...gradient, stops: updatedStops };
    setGradient(updatedGrad);
    onChange(serializeGradient(updatedGrad));
  };

  const handleStopPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setTimeout(() => {
      isDraggingStopRef.current = false;
    }, 50);
  };

  // ── Eyedropper API ───────────────────────────────────────
  const handleEyeDropper = async () => {
    if (typeof window !== "undefined" && "EyeDropper" in window) {
      try {
        const eyeDropper = new (
          window as unknown as {
            EyeDropper: new () => { open: () => Promise<{ sRGBHex: string }> };
          }
        ).EyeDropper();
        const result = await eyeDropper.open();
        if (result?.sRGBHex) {
          const { r: er, g: eg, b: eb } = parseColor(result.sRGBHex);
          const newHsv = { ...rgbToHsv(er, eg, eb), a: 1 };
          updateFromHsv(newHsv);
        }
      } catch {
        // User canceled or failed
      }
    }
  };

  // ── Saturation / Value picker drag ───────────────────────
  const satValRef = useRef<HTMLDivElement>(null);
  const handleSatValPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = satValRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clamp = (val: number, min: number, max: number) =>
      Math.max(min, Math.min(max, val));
    const s = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    const v = clamp(1 - (e.clientY - rect.top) / rect.height, 0, 1);
    updateFromHsv({ ...hsv, s, v });
  };

  // ── Hue slider drag ──────────────────────────────────────
  const hueRef = useRef<HTMLDivElement>(null);
  const handleHuePointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = hueRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clamp = (val: number, min: number, max: number) =>
      Math.max(min, Math.min(max, val));
    const ratio = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    const h = Math.round(ratio * 360) % 360;
    updateFromHsv({ ...hsv, h });
  };

  // ── Alpha slider drag ────────────────────────────────────
  const alphaRef = useRef<HTMLDivElement>(null);
  const handleAlphaPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = alphaRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clamp = (val: number, min: number, max: number) =>
      Math.max(min, Math.min(max, val));
    const a = Number(
      clamp((e.clientX - rect.left) / rect.width, 0, 1).toFixed(2),
    );
    updateFromHsv({ ...hsv, a });
  };

  // ────────────────────────────────────────────────────────
  return (
    <div className="flex w-[280px] flex-col gap-3 rounded-2xl bg-popover p-3 text-popover-foreground select-none">
      {/* ── Mode Switcher (Solid | Linear) ────────────────── */}
      <div className="flex w-full items-center rounded-xl bg-muted p-1">
        <button
          type="button"
          onClick={() => handleModeChange("solid")}
          className={`flex-1 rounded-lg py-1 text-xs font-medium transition-all ${
            mode === "solid"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Solid
        </button>
        <button
          type="button"
          onClick={() => handleModeChange("linear")}
          className={`flex-1 rounded-lg py-1 text-xs font-medium transition-all ${
            mode === "linear"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Linear
        </button>
      </div>

      {/* ── Linear Gradient Controls (Only in linear mode) ── */}
      {mode === "linear" && (
        <div className="flex flex-col gap-2.5">
          {/* Gradient Track Bar with Stops */}
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: interactive gradient track for clicking to add color stops */}
          {/* biome-ignore lint/a11y/noStaticElementInteractions: interactive gradient track for clicking to add color stops */}
          <div
            ref={trackRef}
            className="relative h-6 w-full cursor-pointer rounded-full border border-border shadow-inner"
            style={{ background: gradientBarCss }}
            onClick={(e) => {
              if (isDraggingStopRef.current) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const offset = Math.max(
                0,
                Math.min(1, (e.clientX - rect.left) / rect.width),
              );
              const { r: cr, g: cg, b: cb } = hsvToRgb(hsv.h, hsv.s, hsv.v);
              const newStop = {
                id: `stop-${Date.now()}`,
                offset: Number(offset.toFixed(2)),
                color: rgbaToString(cr, cg, cb, hsv.a),
              };
              const updated = [...gradient.stops, newStop].sort(
                (x, y) => x.offset - y.offset,
              );
              const updatedGrad: LinearGradient = {
                ...gradient,
                stops: updated,
              };
              setGradient(updatedGrad);
              setActiveStopId(newStop.id);
              onChange(serializeGradient(updatedGrad));
            }}
          >
            {gradient.stops.map((stop) => {
              const isActive = stop.id === activeStopId;
              return (
                <button
                  type="button"
                  key={stop.id}
                  aria-label={`Gradient stop at ${Math.round(stop.offset * 100)}%`}
                  onPointerDown={(e) => handleStopPointerDown(e, stop.id)}
                  onPointerMove={(e) => handleStopPointerMove(e, stop.id)}
                  onPointerUp={handleStopPointerUp}
                  onPointerCancel={handleStopPointerUp}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveStopId(stop.id);
                  }}
                  className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full cursor-grab active:cursor-grabbing touch-none transition-transform ${
                    isActive
                      ? "size-6 border-2 border-black dark:border-white shadow-md ring-2 ring-white/80 scale-105"
                      : "size-5 border-2 border-white shadow hover:scale-105"
                  }`}
                  style={{
                    left: `${stop.offset * 100}%`,
                    backgroundColor: stop.color,
                  }}
                />
              );
            })}
          </div>

          {/* Action Row (+, Trash, Swap, Angle) */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleAddStop}
                title="Add gradient stop"
                className="flex size-7 items-center justify-center rounded-md hover:bg-muted hover:text-foreground"
              >
                <HugeiconsIcon icon={Add01Icon} size={15} />
              </button>
              <button
                type="button"
                onClick={handleDeleteStop}
                disabled={gradient.stops.length <= 2}
                title="Delete gradient stop"
                className="flex size-7 items-center justify-center rounded-md hover:bg-muted hover:text-destructive disabled:opacity-40"
              >
                <HugeiconsIcon icon={Delete01Icon} size={15} />
              </button>
              <button
                type="button"
                onClick={handleSwapStops}
                title="Reverse gradient"
                className="flex size-7 items-center justify-center rounded-md hover:bg-muted hover:text-foreground"
              >
                <HugeiconsIcon icon={ArrowLeftRightIcon} size={15} />
              </button>
            </div>

            {/* Angle input with spin buttons */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-medium text-foreground">
                Angle
              </span>
              <div className="flex h-7 items-center rounded-lg border border-border bg-background px-1.5 focus-within:ring-1 focus-within:ring-ring">
                <input
                  type="number"
                  min={0}
                  max={360}
                  value={gradient.angle}
                  onChange={(e) =>
                    handleAngleChange(Number(e.target.value) || 0)
                  }
                  className="w-8 bg-transparent text-center text-xs font-mono focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="text-[11px] text-muted-foreground">°</span>
                <div className="ml-1 flex flex-col -space-y-1">
                  <button
                    type="button"
                    onClick={() => handleAngleChange(gradient.angle + 15)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <HugeiconsIcon icon={ArrowUp01Icon} size={10} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAngleChange(gradient.angle - 15)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <HugeiconsIcon icon={ArrowDown01Icon} size={10} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 2D Saturation & Value Picker ──────────────────── */}
      <div
        ref={satValRef}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          handleSatValPointer(e);
        }}
        onPointerMove={(e) => {
          if (e.buttons > 0) handleSatValPointer(e);
        }}
        className="relative h-36 w-full cursor-crosshair rounded-xl overflow-hidden border border-border shadow-inner"
        style={{ backgroundColor: pureHueHex }}
      >
        {/* Saturation gradient: white → transparent */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, #ffffff, transparent)",
          }}
        />
        {/* Brightness gradient: transparent → black */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, #000000, transparent)",
          }}
        />

        {/* Circular Handle */}
        <div
          className="pointer-events-none absolute size-4.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
          style={{
            left: `${hsv.s * 100}%`,
            top: `${(1 - hsv.v) * 100}%`,
            backgroundColor: rgbToHex(r, g, b),
          }}
        />
      </div>

      {/* ── Sliders Row (Hue, Alpha + Swatch & Pipette) ───── */}
      <div className="flex items-center gap-3">
        {/* Sliders Column */}
        <div className="flex flex-1 flex-col gap-2">
          {/* Rainbow Hue Slider */}
          <div
            ref={hueRef}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              handleHuePointer(e);
            }}
            onPointerMove={(e) => {
              if (e.buttons > 0) handleHuePointer(e);
            }}
            className="relative h-3 w-full cursor-pointer rounded-full shadow-inner"
            style={{
              background:
                "linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)",
            }}
          >
            <div
              className="pointer-events-none absolute top-1/2 size-4.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-white shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
              style={{
                left: `${(hsv.h / 360) * 100}%`,
                backgroundColor: pureHueHex,
              }}
            />
          </div>

          {/* Alpha Slider with Checkerboard */}
          <div
            ref={alphaRef}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              handleAlphaPointer(e);
            }}
            onPointerMove={(e) => {
              if (e.buttons > 0) handleAlphaPointer(e);
            }}
            className="relative h-3 w-full cursor-pointer rounded-full overflow-hidden shadow-inner border border-border/50"
            style={{
              backgroundImage:
                "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
              backgroundSize: "8px 8px",
              backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to right, transparent, rgb(${r}, ${g}, ${b}))`,
              }}
            />
            <div
              className="pointer-events-none absolute top-1/2 size-4.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
              style={{
                left: `${hsv.a * 100}%`,
                backgroundColor: rgbaToString(r, g, b, hsv.a),
              }}
            />
          </div>
        </div>

        {/* Color Preview Swatch + Eyedropper */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div
            className="size-8 rounded-lg border border-border shadow-sm overflow-hidden"
            style={{
              backgroundImage:
                "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
              backgroundSize: "6px 6px",
            }}
          >
            <div
              className="h-full w-full"
              style={{ backgroundColor: rgbaToString(r, g, b, hsv.a) }}
            />
          </div>
          <button
            type="button"
            onClick={handleEyeDropper}
            title="Pick color from screen"
            className="flex size-8 items-center justify-center rounded-lg border border-border hover:bg-muted hover:text-foreground text-muted-foreground transition-colors"
          >
            <HugeiconsIcon icon={PipetteIcon} size={15} />
          </button>
        </div>
      </div>

      {/* ── Numeric Values Inputs (Hex, R, G, B, A) ───────── */}
      <div className="grid grid-cols-5 gap-1.5 text-center">
        {/* Hex */}
        <div className="flex flex-col gap-0.5">
          <input
            type="text"
            value={hexValue}
            onChange={(e) => {
              const cleaned = e.target.value
                .replace(/[^0-9a-fA-F]/g, "")
                .slice(0, 6);
              if (cleaned.length === 6) {
                const { r: nr, g: ng, b: nb } = parseColor(`#${cleaned}`);
                updateFromHsv({ ...rgbToHsv(nr, ng, nb), a: hsv.a });
              }
            }}
            className="h-7 w-full rounded-lg border border-border bg-background px-1 text-center font-mono text-xs uppercase focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <span className="text-[10px] text-muted-foreground">Hex</span>
        </div>

        {/* R */}
        <div className="flex flex-col gap-0.5">
          <input
            type="number"
            min={0}
            max={255}
            value={r}
            onChange={(e) => {
              const nr = Math.max(
                0,
                Math.min(255, Number(e.target.value) || 0),
              );
              updateFromHsv({ ...rgbToHsv(nr, g, b), a: hsv.a });
            }}
            className="h-7 w-full rounded-lg border border-border bg-background px-0.5 text-center font-mono text-xs focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <span className="text-[10px] text-muted-foreground">R</span>
        </div>

        {/* G */}
        <div className="flex flex-col gap-0.5">
          <input
            type="number"
            min={0}
            max={255}
            value={g}
            onChange={(e) => {
              const ng = Math.max(
                0,
                Math.min(255, Number(e.target.value) || 0),
              );
              updateFromHsv({ ...rgbToHsv(r, ng, b), a: hsv.a });
            }}
            className="h-7 w-full rounded-lg border border-border bg-background px-0.5 text-center font-mono text-xs focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <span className="text-[10px] text-muted-foreground">G</span>
        </div>

        {/* B */}
        <div className="flex flex-col gap-0.5">
          <input
            type="number"
            min={0}
            max={255}
            value={b}
            onChange={(e) => {
              const nb = Math.max(
                0,
                Math.min(255, Number(e.target.value) || 0),
              );
              updateFromHsv({ ...rgbToHsv(r, g, nb), a: hsv.a });
            }}
            className="h-7 w-full rounded-lg border border-border bg-background px-0.5 text-center font-mono text-xs focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <span className="text-[10px] text-muted-foreground">B</span>
        </div>

        {/* A */}
        <div className="flex flex-col gap-0.5">
          <input
            type="number"
            min={0}
            max={100}
            value={Math.round(hsv.a * 100)}
            onChange={(e) => {
              const na =
                Math.max(0, Math.min(100, Number(e.target.value) || 0)) / 100;
              updateFromHsv({ ...hsv, a: na });
            }}
            className="h-7 w-full rounded-lg border border-border bg-background px-0.5 text-center font-mono text-xs focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <span className="text-[10px] text-muted-foreground">A</span>
        </div>
      </div>

      {/* ── Preset Color Swatches (2 rows of 8) ──────────── */}
      <div className="grid grid-cols-8 gap-1.5 pt-1 border-t border-border/60">
        {PRESET_COLORS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => {
              const { r: pr, g: pg, b: pb } = parseColor(preset);
              updateFromHsv({ ...rgbToHsv(pr, pg, pb), a: 1 });
            }}
            className="size-6 rounded-[6px] border border-border/80 shadow-xs transition-transform hover:scale-110 focus:outline-none focus:ring-1 focus:ring-ring"
            style={{ backgroundColor: preset }}
            title={preset}
          />
        ))}
      </div>
    </div>
  );
}
