// src/tokens.ts
// SolidScale carousel design system. Mirror of DESIGN.md v3 dark-mode swatches
// (Geist only, no serif). Real site dark-mode palette used: bg #0A1426 < surface
// #13213D < surface2 #182B4D, accents azurDark #8AC2F0 for max luminance on dark.

export const COLORS = {
  // Brand (light, kept for reference + cobalt/azur reuse)
  navy: "#1A3A6E",
  cobalt: "#2E6BB8",
  azur: "#4A90D9",
  azurDark: "#3B82F6",
  electricBlue: "#60A5FA",  // Tailwind blue-400 — constellation accent electrique (Phase 12.1-04)
  azurSoft: "#DCE9F7",
  steel: "#C0C8D0",

  // Constellation palette (Phase 12.1-04, v2 BG)
  bgNavy: "#0F2040",   // fond navy mid — remplace bg sur slides Hook/CTA v2
  navyMid: "#2E6BB8",  // lines + cercles constellation (alias cobalt, couleur nommee distincte pour allowlist)
  azurLight: "#4A90D9", // hex strokes constellation (alias azur, couleur nommee distincte pour allowlist)

  // Theme B locked : true black + electric blue (Stripe / Vercel premium tech)
  bg: "#050810",
  surface: "#0E1428",
  surface2: "#152044",
  surface3: "#1E345C",

  // Borders
  border: "#2E6BB8",
  borderStrong: "#3B82F6",

  // Text (dark)
  text: "#FFFFFF",
  textMuted: "#A8B4C9",
  textSubtle: "#6B7891",
  textInverse: "#FFFFFF",
  textInverseMuted: "#A8B4C9",
} as const;

export const FONTS = {
  sans: "Geist",
  mono: "Geist Mono",
} as const;

// LinkedIn 2026 gold standard: 1080 x 1350 portrait (ratio 4:5).
export const DIMENSIONS = {
  portrait: { width: 1080, height: 1350 },
  square: { width: 1080, height: 1080 },
} as const;

export const SPACING = {
  rail: 64,
  railThin: 20,
  bottomBar: 80,
  topPad: 72,
  blockGap: 32,
} as const;

export const TYPE = {
  // --- Existing levels (unchanged) ---
  eyebrow:  { size: 22, tracking: 4.5, weight: 500 as const },
  meta:     { size: 22, tracking: 1.6, weight: 400 as const },
  body:     { size: 36, lineHeight: 1.45, weight: 400 as const },
  headline: { size: 72, lineHeight: 1.08, weight: 700 as const, tracking: -1.6 },
  display:  { size: 88, lineHeight: 1.05, weight: 900 as const, tracking: -2.5 },
  stat:     { size: 320, lineHeight: 0.92, weight: 900 as const, tracking: -10 },
  step:     { size: 460, lineHeight: 0.85, weight: 900 as const, tracking: -16 },
  // --- D-10 new levels (Phase 12.1-02) ---
  // Used by: Hook.kicker, CTA.kicker — short uppercase text above the title
  kicker:         { size: 26, weight: 500 as const, lineHeight: 1.2, tracking: 3 },
  // Used by: Hook.subtitle, CTA.subtitle — below the title, lighter weight reading zone
  subtitle:       { size: 42, weight: 400 as const, lineHeight: 1.4, tracking: 0 },
  // Used by: FrameworkStep.calloutQuote — pull quote, italic azurDark
  callout:        { size: 38, weight: 400 as const, lineHeight: 1.45, tracking: 0 },
  // Used by: FrameworkStep.microAnnotation, Stat.comparator — small annotation Geist Mono
  microAnnotation: { size: 24, weight: 400 as const, lineHeight: 1.3, tracking: 0.5 },
  // Used by: Hook.byline — author / reading time, Geist Mono muted
  byline:         { size: 20, weight: 400 as const, lineHeight: 1.3, tracking: 0 },
  // Used by: Hook.tags[] — chip text, uppercase Geist Mono
  tag:            { size: 18, weight: 500 as const, lineHeight: 1.2, tracking: 2 },
} as const;

// Logo aspect ratio is portrait (139:180). LOGO_HEIGHT is the rendered height in px;
// LOGO_WIDTH is computed to preserve ratio. Do not assume the mark is square.
export const LOGO_HEIGHT = 52;
export const LOGO_WIDTH = Math.round((LOGO_HEIGHT * 139) / 180);

export const HEX = {
  pageDot: 18,
  brandMark: LOGO_HEIGHT,
  watermark: 720,
} as const;

export type ColorToken = keyof typeof COLORS;
export type FontToken = keyof typeof FONTS;
export type Format = keyof typeof DIMENSIONS;
