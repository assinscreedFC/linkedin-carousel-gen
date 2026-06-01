// src/render/satoriConfig.ts
// Load Geist + Instrument Serif TTFs (Pitfall 1 — Satori doesn't support WOFF2)
// and expose renderToSvg(jsx, format) keyed on DIMENSIONS from tokens.ts.

import satori, { type FontWeight } from "satori";
import type { ReactNode } from "react";
import { DIMENSIONS, type Format } from "../tokens";

const geistRegular = await Bun.file("src/fonts/Geist-Regular.ttf").arrayBuffer();
const geistBold = await Bun.file("src/fonts/Geist-Bold.ttf").arrayBuffer();
const instrument = await Bun.file("src/fonts/InstrumentSerif-Regular.ttf").arrayBuffer();

export const SATORI_FONTS = [
  { name: "Geist", data: geistRegular, weight: 400 as FontWeight, style: "normal" as const },
  { name: "Geist", data: geistBold, weight: 700 as FontWeight, style: "normal" as const },
  { name: "Instrument Serif", data: instrument, weight: 400 as FontWeight, style: "normal" as const },
];

export async function renderToSvg(jsx: ReactNode, format: Format): Promise<string> {
  const { width, height } = DIMENSIONS[format];
  return satori(jsx, { width, height, fonts: SATORI_FONTS });
}
