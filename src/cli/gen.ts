// src/cli/gen.ts
// CLI: bun run gen <spec.json> [--square]
// - Validates spec via Zod (CarouselSpecSchema) - exit 3 on parse failure
// - Em-dash sentinel before render (Pitfall 5, T-12-07) - exit 4
// - Output naming D-11: output/carousels/{YYYY-MM-DD}-{slug}.pdf
// - Size guard CAROUSEL-07 (T-12-08): exit 5 if > 100MB

import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { CarouselSpecSchema, type CarouselSpec } from "../spec/schema";
import { scanText } from "../../scripts/check-no-em-dash";
import { renderCarousel } from "../render/index";

const SIZE_LIMIT_BYTES = 100 * 1024 * 1024; // 100MB (CAROUSEL-07)

interface ParsedArgs {
  specPath: string;
  square: boolean;
}

export function parseArgs(argv: string[]): ParsedArgs {
  const args = argv.filter(a => !a.startsWith("-"));
  const specPath = args[0];
  if (!specPath) {
    console.error("Usage: bun run gen <spec.json> [--square]");
    process.exit(2);
  }
  return { specPath, square: argv.includes("--square") };
}

export async function loadSpec(path: string): Promise<CarouselSpec> {
  const raw = await Bun.file(path).text();
  const parsed = CarouselSpecSchema.safeParse(JSON.parse(raw));
  if (!parsed.success) {
    console.error("Spec validation failed:");
    console.error(JSON.stringify(parsed.error.format(), null, 2));
    process.exit(3);
  }
  return parsed.data;
}

export function emDashSentinel(spec: CarouselSpec): void {
  // Pitfall 5: humanizer may miss short strings (cta_label, eyebrow).
  // Scan the full spec serialized; any em/en/figure dash -> exit 4.
  const violations = scanText(JSON.stringify(spec));
  if (violations.length > 0) {
    console.error("Em-dash sentinel: forbidden dash characters in spec content:");
    for (const v of violations) {
      console.error(`  line ${v.line} col ${v.col}: ${v.text}`);
    }
    process.exit(4);
  }
}

export async function main(): Promise<void> {
  const { specPath, square } = parseArgs(Bun.argv.slice(2));
  const spec = await loadSpec(specPath);
  if (square) spec.format = "square";
  emDashSentinel(spec);

  const outPath = `output/carousels/${spec.date}-${spec.slug}.pdf`;
  await mkdir(dirname(outPath), { recursive: true });

  const { pageCount, sizeBytes } = await renderCarousel(spec, outPath);
  const sizeMB = sizeBytes / (1024 * 1024);

  if (sizeBytes > SIZE_LIMIT_BYTES) {
    console.error(`PDF size ${sizeMB.toFixed(1)}MB > 100MB limit (CAROUSEL-07)`);
    process.exit(5);
  }

  console.log(`OK ${outPath} (${pageCount} pages, ${sizeMB.toFixed(2)}MB)`);
}

if (import.meta.main) {
  await main();
}
