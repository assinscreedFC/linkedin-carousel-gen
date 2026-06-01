# Snapshot PNGs

These reference PNGs (hook/stat/frameworkstep/cta.snap.png) are generated **on Linux only** to avoid cross-OS font rendering jitter (RESEARCH Pitfall 4).

Regenerate via CI (ubuntu-latest) on a dedicated branch with `bun run test:update-snapshots`, then commit the resulting PNGs back. Do NOT regenerate locally on Windows or macOS.

Tolerance for byte diff is 1% in `tests/templates.test.ts` (Plan 04).
