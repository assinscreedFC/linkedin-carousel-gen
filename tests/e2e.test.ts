// tests/e2e.test.ts
// End-to-end tests on the france-adoption-ia-generative fixture.
// Covers CAROUSEL-06 (CLI), CAROUSEL-07 (dimensions + page count + size),
// CAROUSEL-08 (full pipeline on real-article-derived fixture).

import { test, expect, beforeAll } from "bun:test";
import { mkdir, rm } from "node:fs/promises";
import { PDFDocument } from "pdf-lib";
import { CarouselSpecSchema } from "../src/spec/schema";
import { renderCarousel } from "../src/render/index";

const FIXTURE_PATH = "examples/france-adoption-ia-generative.spec.json";
const OUT_DIR = "output/carousels";

beforeAll(async () => {
  await mkdir(OUT_DIR, { recursive: true });
});

test("renderCarousel produces valid PDF on fixture (portrait)", async () => {
  const raw = JSON.parse(await Bun.file(FIXTURE_PATH).text());
  const parsed = CarouselSpecSchema.safeParse(raw);
  expect(parsed.success).toBe(true);
  if (!parsed.success) return;
  const spec = parsed.data;

  const outPath = `${OUT_DIR}/test-e2e.pdf`;
  const { pageCount, sizeBytes } = await renderCarousel(spec, outPath);

  expect(pageCount).toBeGreaterThanOrEqual(8);
  expect(pageCount).toBeLessThanOrEqual(10);
  expect(sizeBytes).toBeLessThan(100 * 1024 * 1024);

  const pdfBytes = new Uint8Array(await Bun.file(outPath).arrayBuffer());
  const pdf = await PDFDocument.load(pdfBytes);
  expect(pdf.getPageCount()).toBe(spec.slides.length);
  const { width, height } = pdf.getPage(0).getSize();
  expect(width).toBe(1200);
  expect(height).toBe(1500);
}, 30000);

test("CLI invocation produces PDF at D-11 path", async () => {
  const expected = `${OUT_DIR}/2026-06-08-france-adoption-ia-generative.pdf`;
  await rm(expected, { force: true });
  const proc = Bun.spawnSync({
    cmd: ["bun", "run", "gen", FIXTURE_PATH],
    stdout: "pipe",
    stderr: "pipe",
  });
  expect(proc.exitCode).toBe(0);
  const file = Bun.file(expected);
  expect(await file.exists()).toBe(true);
  expect(file.size).toBeGreaterThan(0);
}, 30000);

test("--square flag overrides format to 1080x1080", async () => {
  const expected = `${OUT_DIR}/2026-06-08-france-adoption-ia-generative.pdf`;
  await rm(expected, { force: true });
  const proc = Bun.spawnSync({
    cmd: ["bun", "run", "gen", FIXTURE_PATH, "--square"],
    stdout: "pipe",
    stderr: "pipe",
  });
  expect(proc.exitCode).toBe(0);
  const pdfBytes = new Uint8Array(await Bun.file(expected).arrayBuffer());
  const pdf = await PDFDocument.load(pdfBytes);
  const { width, height } = pdf.getPage(0).getSize();
  expect(width).toBe(1080);
  expect(height).toBe(1080);
}, 30000);

test("em-dash in spec content fails sentinel with exit 4", async () => {
  const raw = JSON.parse(await Bun.file(FIXTURE_PATH).text());
  // Inject an em-dash into the first Hook title
  raw.slides[0].title = "Title with em-dash — leak";
  const tmp = `${OUT_DIR}/tmp-emdash.spec.json`;
  await Bun.write(tmp, JSON.stringify(raw));
  const proc = Bun.spawnSync({
    cmd: ["bun", "run", "gen", tmp],
    stdout: "pipe",
    stderr: "pipe",
  });
  expect(proc.exitCode).toBe(4);
  await rm(tmp, { force: true });
});
