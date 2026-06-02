// src/render/satoriConfig.ts
// Load Geist family TTFs (Pitfall 1 - Satori does not support WOFF2)
// and expose renderToSvg(jsx, format) keyed on DIMENSIONS from tokens.ts.

import satori, { type FontWeight } from "satori";
import type { ReactNode } from "react";
import { DIMENSIONS, type Format } from "../tokens";

const geistRegular = await Bun.file("src/fonts/Geist-Regular.ttf").arrayBuffer();
const geistBold = await Bun.file("src/fonts/Geist-Bold.ttf").arrayBuffer();
const geistBlack = await Bun.file("src/fonts/Geist-Black.ttf").arrayBuffer();
const geistMonoRegular = await Bun.file("src/fonts/GeistMono-Regular.ttf").arrayBuffer();
const geistMonoMedium = await Bun.file("src/fonts/GeistMono-Medium.ttf").arrayBuffer();

export const SATORI_FONTS = [
  { name: "Geist", data: geistRegular, weight: 400 as FontWeight, style: "normal" as const },
  { name: "Geist", data: geistBold, weight: 700 as FontWeight, style: "normal" as const },
  { name: "Geist", data: geistBlack, weight: 900 as FontWeight, style: "normal" as const },
  { name: "Geist Mono", data: geistMonoRegular, weight: 400 as FontWeight, style: "normal" as const },
  { name: "Geist Mono", data: geistMonoMedium, weight: 500 as FontWeight, style: "normal" as const },
];

export async function renderToSvg(jsx: ReactNode, format: Format): Promise<string> {
  const { width, height } = DIMENSIONS[format];
  return satori(jsx, { width, height, fonts: SATORI_FONTS });
}
