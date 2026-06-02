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

// --- D-10 enriched fixtures (Phase 12.1-02) ---
// Used by schema.test.ts and future template rendering tests (Plan 04/05).
// No em-dash allowed (anti em-dash gate).

export const HOOK_ENRICHED_FIXTURE: Extract<Slide, { template: "Hook" }> = {
  template: "Hook",
  eyebrow: "ADOPTION IA",
  title: "Vos concurrents ont deja demarre",
  kicker: "S3 FRAMEWORK",
  subtitle: "Scan, Solve, Scale: la methode SolidScale pour dirigeants d'entreprise",
  byline: "Anis Hammouche, 3 min de lecture",
  tags: ["IA", "B2B", "Automation"],
  readingTime: "3 min",
};

export const STAT_ENRICHED_FIXTURE: Extract<Slide, { template: "Stat" }> = {
  template: "Stat",
  figure: "73%",
  label: "des entreprises investissent dans l'IA en 2025",
  source: "https://example.com/rapport-ia-2025",
  subLabel: "contre 41% en 2023",
  comparator: "+32 points en 2 ans",
};

export const FRAMEWORK_ENRICHED_FIXTURE: Extract<Slide, { template: "FrameworkStep" }> = {
  template: "FrameworkStep",
  step: "Scan",
  headline: "Cartographier les gains potentiels IA",
  body: "Une analyse systematique de vos processus pour identifier les zones a fort ROI et les automatisations prioritaires.",
  calloutQuote:
    "Le scan revele toujours 3 a 5 opportunites cachees dans les workflows existants.",
  microAnnotation: "Duree moyenne: 2 semaines",
};

export const CTA_ENRICHED_FIXTURE: Extract<Slide, { template: "CTA" }> = {
  template: "CTA",
  headline: "Pret a scaler votre entreprise avec l'IA?",
  cta_label: "Audit gratuit 30 min",
  url: "https://solidscale.tech",
  kicker: "PROCHAINE ETAPE",
  subtitle: "Un audit offert, sans engagement",
  ctaLabel: "Audit gratuit 30 min",
  urlDisplay: "solidscale.tech/audit",
  urlReal: "https://solidscale.tech/audit-gratuit",
  signature: "Anis Hammouche, fondateur SolidScale",
};
