// tests/fixtures.ts
// Shared deterministic slide fixtures used by generate-snapshots.ts and templates.test.ts.
// DRY: both files MUST use these identical inputs to get matching PNG outputs.

import type { Slide } from "../src/spec/schema";

export const HOOK_FIXTURE: Extract<Slide, { template: "Hook" }> = {
  template: "Hook",
  eyebrow: "ADOPTION IA",
  title: "Vos concurrents ont deja demarre",
};

export const STAT_FIXTURE: Extract<Slide, { template: "Stat" }> = {
  template: "Stat",
  figure: "73%",
  label: "Snapshot fixture stat label",
  source: "https://example.com/source",
};

export const FRAMEWORK_FIXTURE: Extract<Slide, { template: "FrameworkStep" }> = {
  template: "FrameworkStep",
  step: "Scan",
  headline: "Snapshot fixture headline",
  body: "Snapshot fixture body text describing one step of the S3 framework deterministically.",
};

export const CTA_FIXTURE: Extract<Slide, { template: "CTA" }> = {
  template: "CTA",
  headline: "Snapshot fixture closing headline",
  cta_label: "Audit gratuit",
  url: "https://solidscale.tech",
};

export const TEMPLATE_FIXTURES: Array<{ name: string; slide: Slide }> = [
  { name: "hook", slide: HOOK_FIXTURE },
  { name: "stat", slide: STAT_FIXTURE },
  { name: "frameworkstep", slide: FRAMEWORK_FIXTURE },
  { name: "cta", slide: CTA_FIXTURE },
];
