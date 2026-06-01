#!/usr/bin/env bun
// scripts/generate-snapshots.ts
// One-shot snapshot generator. Renders each fixture template via the same
// satori -> resvg pipeline used at runtime, writes PNG to tests/snapshots/.
//
// Snapshot OS sequencing (Plan 12-04 Task 4):
//   Initial generation on Windows OK; CI ubuntu-latest will own canonical
//   snapshots from Plan 12-07 onward. Windows PNGs are temporary.

import { renderSlide } from "../src/slides/solidscale/index";
import { renderToSvg } from "../src/render/satoriConfig";
import { svgToPng } from "../src/render/svgToPng";
import { TEMPLATE_FIXTURES } from "../tests/fixtures";

for (const { name, slide } of TEMPLATE_FIXTURES) {
  const jsx = renderSlide(slide);
  const svg = await renderToSvg(jsx, "portrait");
  const png = svgToPng(svg);
  const path = `tests/snapshots/${name}.snap.png`;
  await Bun.write(path, png);
  console.log(`wrote ${path} (${png.length} bytes)`);
}
