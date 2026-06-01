// tests/templates.test.ts
// Per-template snapshot tests (D-10b). Rerenders each fixture and asserts
// byte-diff < 1% vs the committed reference PNG (Pitfall 4 tolerance).
//
// Snapshots are machine-bound: tests must run on the same OS that produced
// the committed PNG. CI ubuntu-latest owns the canonical snapshots from
// Plan 12-07 onward.

import { test, expect } from "bun:test";
import { renderSlide } from "../src/slides/solidscale/index";
import { renderToSvg } from "../src/render/satoriConfig";
import { svgToPng } from "../src/render/svgToPng";
import { TEMPLATE_FIXTURES } from "./fixtures";

function byteDiff(a: Uint8Array, b: Uint8Array): number {
  const len = Math.max(a.length, b.length);
  if (len === 0) return 0;
  let diff = Math.abs(a.length - b.length);
  const min = Math.min(a.length, b.length);
  for (let i = 0; i < min; i++) if (a[i] !== b[i]) diff++;
  return diff / len;
}

for (const { name, slide } of TEMPLATE_FIXTURES) {
  test(`${name} template matches snapshot`, async () => {
    const jsx = renderSlide(slide);
    const svg = await renderToSvg(jsx, "portrait");
    const rendered = svgToPng(svg);
    const expected = new Uint8Array(
      await Bun.file(`tests/snapshots/${name}.snap.png`).arrayBuffer(),
    );
    const diff = byteDiff(rendered, expected);
    expect(diff).toBeLessThan(0.01);
  });
}
