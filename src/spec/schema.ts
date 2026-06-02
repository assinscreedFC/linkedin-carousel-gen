// src/spec/schema.ts
// Zod schema for CarouselSpec — contract between solidscale-carousel skill (D-07) and CLI.
// Enforces D-05 slide count, D-08 pipeline marker, path traversal protection on slug.
//
// D-10 enrichment (Phase 12.1-02): Each template now exposes 4-7 text zones for editorial
// hierarchy. All new fields are .optional() (retro-compat preserved, D-12).
//
// D-11 NOTE: slideNumber, sectionLabel, footerUrl are NOT per-slide Zod fields.
// They are computed at render time from the slide index (slideNumber) and the
// carousel chrome config (footerUrl = "solidscale.tech"). Override via CarouselSpec
// metadata if needed in the future.

import { z } from "zod";

export const SlideSchema = z.discriminatedUnion("template", [
  z.object({
    template: z.literal("Hook"),
    // --- Existing fields (unchanged, retro-compat) ---
    title: z.string().min(1).max(140),
    eyebrow: z.string().max(60).optional(), // kept for compat; coexists with kicker (see Open Q1 RESEARCH)
    // --- D-10 new optional fields ---
    kicker: z.string().max(80).optional(),       // Short text above title (Geist Mono uppercase, azurDark)
    subtitle: z.string().max(200).optional(),    // Below title, lighter weight
    byline: z.string().max(80).optional(),       // Author / reading time, Geist Mono muted
    tags: z.array(z.string().max(30)).max(4).optional(), // Up to 4 chips (max 4 per D-10)
    readingTime: z.string().max(20).optional(),  // e.g. "3 min" — can also be embedded in byline
  }),
  z.object({
    template: z.literal("Stat"),
    // --- Existing fields (unchanged, retro-compat) ---
    figure: z.string().min(1).max(20),
    label: z.string().min(1).max(120),
    source: z.string().url(), // D-13: MANDATORY — Stat.source must always be present (build breaks without)
    // --- D-10 new optional fields ---
    subLabel: z.string().max(120).optional(),    // Below the figure (e.g. context/comparison)
    comparator: z.string().max(80).optional(),   // e.g. "vs 41% en 2023" — Geist Mono microAnnotation
  }),
  z.object({
    template: z.literal("FrameworkStep"),
    // --- Existing fields (unchanged, retro-compat) ---
    step: z.enum(["Scan", "Solve", "Scale"]),
    headline: z.string().min(1).max(120),
    body: z.string().min(1).max(360),
    // --- D-10 new optional fields ---
    calloutQuote: z.string().max(200).optional(),     // Pull quote, italic azurDark
    microAnnotation: z.string().max(80).optional(),   // Small annotation, Geist Mono
  }),
  z.object({
    template: z.literal("CTA"),
    // --- Existing fields (unchanged, retro-compat) ---
    headline: z.string().min(1).max(140),
    cta_label: z.string().min(1).max(60), // D-10 canonical alias: prefer ctaLabel for new specs
    url: z.string().url().default("https://solidscale.tech"), // retro-compat; prefer urlReal for new specs
    // --- D-10 new optional fields ---
    kicker: z.string().max(80).optional(),       // Short text above headline (Geist Mono uppercase, azurDark)
    subtitle: z.string().max(200).optional(),    // Below headline, lighter weight
    signature: z.string().max(80).optional(),    // e.g. "Anis Hammouche, fondateur SolidScale"
    ctaLabel: z.string().max(80).optional(),     // D-10 canonical CTA label (alias for cta_label)
    urlDisplay: z.string().max(100).optional(),  // Hostname displayed on slide (e.g. "solidscale.tech/audit")
    urlReal: z.string().url().optional(),        // Canonical clickable URL (Plan 05: slide.urlReal ?? slide.url)
  }),
]);

export const PipelineAppliedSchema = z.object({
  audit_score: z.number().int().min(60).max(100),
  audit_skill: z.string().min(1),
  humanizer: z.literal("yes"),
  humanizer_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const CarouselSpecSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "slug must match ^[a-z0-9-]+$ (path traversal protection)"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  format: z.enum(["portrait", "square"]).default("portrait"),
  slides: z.array(SlideSchema).min(7, "min 7 slides (D-05)").max(10, "max 10 slides (D-05)"),
  pipeline_applied: PipelineAppliedSchema,
});

export type Slide = z.infer<typeof SlideSchema>;
export type CarouselSpec = z.infer<typeof CarouselSpecSchema>;
export type PipelineApplied = z.infer<typeof PipelineAppliedSchema>;
