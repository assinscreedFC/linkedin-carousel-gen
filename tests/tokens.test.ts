// tests/tokens.test.ts
// Enforce D-10a: no hex literal outside src/tokens.ts in slide templates.
import { test, expect } from "bun:test";
import { Glob } from "bun";

// Strip TS line + block comments, preserving line/col positions (for accurate violation reports).
function stripTsComments(src: string): string {
  const out: string[] = [];
  let i = 0;
  const n = src.length;
  while (i < n) {
    const c = src[i], next = src[i + 1];
    if (c === '"' || c === "'" || c === '`') {
      const q = c; out.push(c); i++;
      while (i < n) {
        const cc = src[i];
        if (cc === '\\' && i + 1 < n) { out.push(cc, src[i + 1]); i += 2; continue; }
        out.push(cc); i++;
        if (cc === q) break;
      }
      continue;
    }
    if (c === '/' && next === '/') { while (i < n && src[i] !== '\n') { out.push(' '); i++; } continue; }
    if (c === '/' && next === '*') {
      out.push('  '); i += 2;
      while (i < n && !(src[i] === '*' && src[i + 1] === '/')) { out.push(src[i] === '\n' ? '\n' : ' '); i++; }
      if (i < n) { out.push('  '); i += 2; }
      continue;
    }
    out.push(c); i++;
  }
  return out.join('');
}

test("no stray hex colors in solidscale slide templates (D-10a allowlist)", async () => {
  const glob = new Glob("src/slides/solidscale/**/*.tsx");
  const violations: string[] = [];
  for await (const file of glob.scan(".")) {
    const text = await Bun.file(file).text();
    const scanned = stripTsComments(text);
    const matches = scanned.match(/#[0-9a-fA-F]{3,8}\b/g) ?? [];
    if (matches.length > 0) {
      violations.push(`${file}: ${matches.join(", ")}`);
    }
  }
  if (violations.length > 0) {
    console.error("D-10a violations — import COLORS from '../../tokens' instead:");
    violations.forEach(v => console.error("  " + v));
  }
  expect(violations).toEqual([]);
});
