// tests/schema.test.ts
// TDD: 8 tests pour le schema Zod enrichi D-10.
// Auteur: Phase 12.1-02 — rétrocompatibilité + nouveaux champs.
import { describe, expect, test } from "bun:test";
import { SlideSchema, CarouselSpecSchema } from "../src/spec/schema";

// Test 1: Rétrocompat Hook — ancien spec (title + eyebrow) parse sans erreur
test("Hook backward-compat: title + eyebrow only", () => {
  expect(() =>
    SlideSchema.parse({ template: "Hook", title: "Mon titre accrocheur" })
  ).not.toThrow();
});

test("Hook backward-compat: with eyebrow", () => {
  expect(() =>
    SlideSchema.parse({
      template: "Hook",
      title: "Mon titre",
      eyebrow: "ADOPTION IA",
    })
  ).not.toThrow();
});

// Test 2: Hook enrichi D-10 — tous les nouveaux champs optionnels passent
test("Hook D-10: kicker, subtitle, byline, tags, readingTime parse OK", () => {
  expect(() =>
    SlideSchema.parse({
      template: "Hook",
      title: "Comment scaler ton entreprise avec l'IA en 90 jours",
      kicker: "S3 FRAMEWORK",
      subtitle: "Scan, Solve, Scale: la methode SolidScale pour dirigeants",
      byline: "Anis Hammouche, 3 min de lecture",
      tags: ["IA", "B2B", "Automation"],
      readingTime: "3 min",
    })
  ).not.toThrow();
});

// Test 3: Hook tags > 4 doit échouer
test("Hook tags max 4 — 5 tags fail", () => {
  expect(() =>
    SlideSchema.parse({
      template: "Hook",
      title: "Titre test",
      tags: ["IA", "B2B", "Automation", "Scale", "Extra"],
    })
  ).toThrow();
});

// Test 4: Stat sans source doit échouer (D-13 obligatoire)
test("Stat without source fail (D-13 mandatory)", () => {
  expect(() =>
    SlideSchema.parse({
      template: "Stat",
      figure: "73%",
      label: "des entreprises adoptent l'IA",
    })
  ).toThrow();
});

// Test 5: Stat avec subLabel et comparator parse OK
test("Stat D-10: subLabel and comparator parse OK", () => {
  expect(() =>
    SlideSchema.parse({
      template: "Stat",
      figure: "73%",
      label: "des entreprises adoptent l'IA",
      source: "https://example.com/rapport-2025",
      subLabel: "en 2025, contre 41% en 2023",
      comparator: "+32 points en 2 ans",
    })
  ).not.toThrow();
});

// Test 6: FrameworkStep avec calloutQuote et microAnnotation parse OK
test("FrameworkStep D-10: calloutQuote and microAnnotation parse OK", () => {
  expect(() =>
    SlideSchema.parse({
      template: "FrameworkStep",
      step: "Scan",
      headline: "Cartographier les gains potentiels IA",
      body: "Une analyse systematique de tes processus pour identifier les zones a fort ROI.",
      calloutQuote:
        "Le scan revele toujours 3 a 5 opportunites cachees dans les workflows existants.",
      microAnnotation: "Duree moyenne: 2 semaines",
    })
  ).not.toThrow();
});

// Test 7: CTA avec kicker, subtitle, signature parse OK
test("CTA D-10: kicker, subtitle, signature parse OK", () => {
  expect(() =>
    SlideSchema.parse({
      template: "CTA",
      headline: "Pret a scaler ton entreprise avec l'IA?",
      cta_label: "Audit gratuit 30 min",
      url: "https://solidscale.tech",
      kicker: "PROCHAINE ETAPE",
      subtitle: "Un audit offert, sans engagement",
      signature: "Anis Hammouche, fondateur SolidScale",
    })
  ).not.toThrow();
});

// Test 8: CTA ancienne spec (cta_label + url) reste valide (rétrocompat D-10)
test("CTA backward-compat: cta_label + url still valid", () => {
  expect(() =>
    SlideSchema.parse({
      template: "CTA",
      headline: "Audit gratuit disponible",
      cta_label: "Reserver",
      url: "https://solidscale.tech",
    })
  ).not.toThrow();
});

// Test 9: CTA nouveaux champs D-10 ctaLabel, urlDisplay, urlReal parse OK
test("CTA D-10: ctaLabel, urlDisplay, urlReal parse OK", () => {
  expect(() =>
    SlideSchema.parse({
      template: "CTA",
      headline: "Transforme ton entreprise en 90 jours",
      cta_label: "Audit gratuit",
      url: "https://solidscale.tech",
      ctaLabel: "Audit gratuit 30 min",
      urlDisplay: "solidscale.tech/audit",
      urlReal: "https://solidscale.tech/audit-gratuit",
    })
  ).not.toThrow();
});
