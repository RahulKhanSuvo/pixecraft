export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number; // 0 to 1
}

export interface HSV {
  h: number; // 0 to 360
  s: number; // 0 to 1
  v: number; // 0 to 1
  a: number; // 0 to 1
}

export interface GradientStop {
  id: string;
  offset: number; // 0 to 1
  color: string; // rgba or hex
}

export interface LinearGradient {
  type: "linear";
  angle: number; // degrees, 0 to 360
  stops: GradientStop[];
}

export function hsvToRgb(
  h: number,
  s: number,
  v: number,
): { r: number; g: number; b: number } {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let r1 = 0;
  let g1 = 0;
  let b1 = 0;

  if (h >= 0 && h < 60) {
    r1 = c;
    g1 = x;
    b1 = 0;
  } else if (h >= 60 && h < 120) {
    r1 = x;
    g1 = c;
    b1 = 0;
  } else if (h >= 120 && h < 180) {
    r1 = 0;
    g1 = c;
    b1 = x;
  } else if (h >= 180 && h < 240) {
    r1 = 0;
    g1 = x;
    b1 = c;
  } else if (h >= 240 && h < 300) {
    r1 = x;
    g1 = 0;
    b1 = c;
  } else if (h >= 300 && h < 360) {
    r1 = c;
    g1 = 0;
    b1 = x;
  }

  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
  };
}

export function rgbToHsv(
  r: number,
  g: number,
  b: number,
): { h: number; s: number; v: number } {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === rNorm) {
      h = ((gNorm - bNorm) / delta) % 6;
    } else if (max === gNorm) {
      h = (bNorm - rNorm) / delta + 2;
    } else {
      h = (rNorm - gNorm) / delta + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  const s = max === 0 ? 0 : delta / max;
  const v = max;

  return { h, s, v };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function rgbaToString(r: number, g: number, b: number, a = 1): string {
  if (a >= 0.999) {
    return rgbToHex(r, g, b);
  }
  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${Number(a.toFixed(2))})`;
}

export function parseColor(color: string): RGBA {
  const c = color.trim().toLowerCase();

  // Hex format
  if (c.startsWith("#")) {
    const raw = c.slice(1);
    if (raw.length === 3 || raw.length === 4) {
      const r = Number.parseInt(raw[0] + raw[0], 16) || 0;
      const g = Number.parseInt(raw[1] + raw[1], 16) || 0;
      const b = Number.parseInt(raw[2] + raw[2], 16) || 0;
      const a =
        raw.length === 4
          ? (Number.parseInt(raw[3] + raw[3], 16) || 0) / 255
          : 1;
      return { r, g, b, a };
    }
    if (raw.length === 6 || raw.length === 8) {
      const r = Number.parseInt(raw.slice(0, 2), 16) || 0;
      const g = Number.parseInt(raw.slice(2, 4), 16) || 0;
      const b = Number.parseInt(raw.slice(4, 6), 16) || 0;
      const a =
        raw.length === 8
          ? (Number.parseInt(raw.slice(6, 8), 16) || 0) / 255
          : 1;
      return { r, g, b, a };
    }
  }

  // rgba or rgb format
  const rgbMatch = c.match(
    /rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/,
  );
  if (rgbMatch) {
    return {
      r: Number.parseInt(rgbMatch[1], 10),
      g: Number.parseInt(rgbMatch[2], 10),
      b: Number.parseInt(rgbMatch[3], 10),
      a: rgbMatch[4] !== undefined ? Number.parseFloat(rgbMatch[4]) : 1,
    };
  }

  // Fallback default: white
  return { r: 255, g: 255, b: 255, a: 1 };
}

export function colorToHsv(color: string): HSV {
  const { r, g, b, a } = parseColor(color);
  const { h, s, v } = rgbToHsv(r, g, b);
  return { h, s, v, a };
}

export function serializeGradient(gradient: LinearGradient): string {
  const sorted = [...gradient.stops].sort((a, b) => a.offset - b.offset);
  const stopsStr = sorted
    .map((s) => `${s.color} ${Math.round(s.offset * 100)}%`)
    .join(", ");
  return `linear-gradient(${gradient.angle}deg, ${stopsStr})`;
}

export function parseGradient(cssString: string): LinearGradient | null {
  if (!cssString.startsWith("linear-gradient")) return null;

  try {
    // Extract contents inside linear-gradient(...)
    const match = cssString.match(/^linear-gradient\((.*)\)$/);
    if (!match) return null;

    const parts = match[1].split(/,(?![^(]*\))/).map((s) => s.trim());
    if (parts.length < 2) return null;

    let angle = 90;
    let stopParts = parts;

    if (parts[0].includes("deg")) {
      angle = Number.parseInt(parts[0], 10) || 0;
      stopParts = parts.slice(1);
    } else if (parts[0].includes("to right")) {
      angle = 90;
      stopParts = parts.slice(1);
    } else if (parts[0].includes("to bottom")) {
      angle = 180;
      stopParts = parts.slice(1);
    } else if (parts[0].includes("to top")) {
      angle = 0;
      stopParts = parts.slice(1);
    } else if (parts[0].includes("to left")) {
      angle = 270;
      stopParts = parts.slice(1);
    }

    const stops: GradientStop[] = stopParts.map((p, idx) => {
      const tokens = p.split(/\s+(?![^(]*\))/);
      const color = tokens[0];
      let offset = idx / Math.max(1, stopParts.length - 1);
      if (tokens.length > 1 && tokens[1].includes("%")) {
        offset = Number.parseFloat(tokens[1]) / 100;
      }
      return {
        id: `stop-${idx}-${Date.now()}`,
        offset: Math.max(0, Math.min(1, offset)),
        color,
      };
    });

    return {
      type: "linear",
      angle,
      stops,
    };
  } catch {
    return null;
  }
}

export function getGradientPoints(
  angleDeg: number,
  width: number,
  height: number,
) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  const cx = width / 2;
  const cy = height / 2;
  const length =
    Math.abs(width * Math.cos(rad)) + Math.abs(height * Math.sin(rad));
  const half = length / 2;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  return {
    start: {
      x: cx - cos * half,
      y: cy - sin * half,
    },
    end: {
      x: cx + cos * half,
      y: cy + sin * half,
    },
  };
}

export function getKonvaBackgroundProps(
  background: string,
  width: number,
  height: number,
) {
  const gradient = parseGradient(background);
  if (!gradient) {
    return {
      fill: background,
      fillPriority: "color",
      fillLinearGradientColorStops: undefined,
      fillLinearGradientStartPoint: undefined,
      fillLinearGradientEndPoint: undefined,
    };
  }

  const { start, end } = getGradientPoints(gradient.angle, width, height);
  const sortedStops = [...gradient.stops].sort((a, b) => a.offset - b.offset);

  const colorStops: (number | string)[] = [];
  for (const s of sortedStops) {
    colorStops.push(s.offset, s.color);
  }

  return {
    fillPriority: "linear-gradient",
    fillLinearGradientStartPoint: start,
    fillLinearGradientEndPoint: end,
    fillLinearGradientColorStops: colorStops,
  };
}

export const PRESET_COLORS = [
  // Row 1
  "#e11d48", // Red
  "#ea580c", // Orange
  "#facc15", // Yellow
  "#78350f", // Brown
  "#84cc16", // Lime
  "#15803d", // Dark Green
  "#c026d3", // Magenta
  "#7c3aed", // Purple
  // Row 2
  "#3b82f6", // Blue
  "#06b6d4", // Cyan
  "#86efac", // Light Mint
  "#000000", // Black
  "#374151", // Dark Gray
  "#9ca3af", // Gray
  "#e5e7eb", // Light Gray
  "#ffffff", // White
];
