#!/usr/bin/env bun
// scripts/check-no-em-dash.ts
// Port from portfolio scripts/check-no-em-dash.mjs
// CLAUDE.md §Anti-AI-slop : em/en dash = #1 AI text signal.
// U+2012 figure dash · U+2013 en dash · U+2014 em dash · U+2015 horizontal bar
const DASH_RE = /[‒-―]/g;

export interface Violation {
  line: number;
  col: number;
  text: string;
}

export function scanText(content: string): Violation[] {
  const violations: Violation[] = [];
  content.split("\n").forEach((line, i) => {
    let m: RegExpExecArray | null;
    DASH_RE.lastIndex = 0;
    while ((m = DASH_RE.exec(line)) !== null) {
      violations.push({ line: i + 1, col: m.index + 1, text: line.trim() });
    }
  });
  return violations;
}

export async function scanFile(path: string): Promise<Violation[]> {
  const content = await Bun.file(path).text();
  return scanText(content);
}

// CLI: bun scripts/check-no-em-dash.ts <file1> [file2 ...]
if (import.meta.main) {
  const files = Bun.argv.slice(2);
  if (files.length === 0) {
    console.error("Usage: bun scripts/check-no-em-dash.ts <file1> [file2 ...]");
    process.exit(2);
  }
  let total = 0;
  for (const f of files) {
    const v = await scanFile(f);
    for (const { line, col, text } of v) {
      console.error(`  ${f}:${line}:${col}  ${text}`);
      total++;
    }
  }
  if (total === 0) {
    console.log(`✓ check-no-em-dash : ${files.length} file(s), no em/en dash.`);
    process.exit(0);
  }
  console.error("");
  console.error(`✗ ${total} em/en dash interdit(s).`);
  console.error("  Remplace par une virgule, un point, deux-points ou des parentheses.");
  process.exit(1);
}
