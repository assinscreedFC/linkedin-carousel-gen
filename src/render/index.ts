// src/render/index.ts
// renderCarousel orchestrator: spec -> slides -> SVG -> PNG -> PDF.

import { renderSlide } from "../slides/solidscale/index";
import type { CarouselSpec } from "../spec/schema";
import { renderToSvg } from "./satoriConfig";
import { svgToPng } from "./svgToPng";
import { pngsToPdf } from "./pngsToPdf";

export { renderToSvg } from "./satoriConfig";
export { svgToPng } from "./svgToPng";
export { pngsToPdf } from "./pngsToPdf";

export async function renderCarousel(
  spec: CarouselSpec,
  outPath: string,
): Promise<{ pageCount: number; sizeBytes: number }> {
  const pngs: Uint8Array[] = [];
  const total = spec.slides.length;
  for (let i = 0; i < total; i++) {
    const jsx = renderSlide(spec.slides[i], i, total);
    const svg = await renderToSvg(jsx, spec.format);
    const png = svgToPng(svg);
    pngs.push(png);
  }
  return pngsToPdf(pngs, outPath);
}
