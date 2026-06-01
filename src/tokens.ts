// src/tokens.ts
// DESIGN.md mirror — single source of truth for SolidScale carousel templates.
// Any hex literal outside this file in src/slides/solidscale/** is caught by tests/tokens.test.ts.

export const COLORS = {
  navy: "#1A3A6E",
  cobalt: "#2E6BB8",
  azur: "#4A90D9",
  azurSoft: "#DCE9F7",
  steel: "#C0C8D0",
  bg: "#F8F9FA",
  bgElevated: "#FFFFFF",
  surface: "#F2F4F7",
  border: "#D6DCE5",
  borderStrong: "#C0C8D0",
  text: "#0F1E3D",
  textMuted: "#4B5870",
  textSubtle: "#6B7891",
} as const;

export const FONTS = {
  display: "Instrument Serif",
  sans: "Geist",
  mono: "Geist Mono",
} as const;

export const DIMENSIONS = {
  portrait: { width: 1200, height: 1500 },
  square: { width: 1080, height: 1080 },
} as const;

export type ColorToken = keyof typeof COLORS;
export type FontToken = keyof typeof FONTS;
export type Format = keyof typeof DIMENSIONS;
