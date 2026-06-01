// src/render/svgToPng.ts
// SVG -> PNG via @resvg/resvg-js. loadSystemFonts: false is critical for
// deterministic cross-OS rendering (Pitfall 4 mitigation, T-12-06).

import { Resvg } from "@resvg/resvg-js";

export function svgToPng(svg: string): Uint8Array {
  const resvg = new Resvg(svg, { font: { loadSystemFonts: false } });
  return resvg.render().asPng();
}
