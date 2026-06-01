// src/spec/schema.ts
// Zod schema for CarouselSpec — contract between solidscale-carousel skill (D-07) and CLI.
// Enforces D-05 slide count, D-08 pipeline marker, path traversal protection on slug.

import { z } from "zod";

export const SlideSchema = z.discriminatedUnion("template", [
  z.object({
    template: z.literal("Hook"),
    title: z.string().min(1).max(140),
    eyebrow: z.string().max(60).optional(),
  }),
  z.object({
    template: z.literal("Stat"),
    figure: z.string().min(1).max(20),
    label: z.string().min(1).max(120),
    source: z.string().url(),
  }),
  z.object({
    template: z.literal("FrameworkStep"),
    step: z.enum(["Scan", "Solve", "Scale"]),
    headline: z.string().min(1).max(120),
    body: z.string().min(1).max(360),
  }),
  z.object({
    template: z.literal("CTA"),
    headline: z.string().min(1).max(140),
    cta_label: z.string().min(1).max(60),
    url: z.string().url().default("https://solidscale.tech"),
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
  slides: z.array(SlideSchema).min(8, "min 8 slides (D-05)").max(10, "max 10 slides (D-05)"),
  pipeline_applied: PipelineAppliedSchema,
});

export type Slide = z.infer<typeof SlideSchema>;
export type CarouselSpec = z.infer<typeof CarouselSpecSchema>;
export type PipelineApplied = z.infer<typeof PipelineAppliedSchema>;
