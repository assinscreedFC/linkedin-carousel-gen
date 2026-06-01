import { test, expect, describe } from "bun:test";
import { CarouselSpecSchema, SlideSchema } from "./schema";

const validSlide = {
  template: "Hook" as const,
  title: "On optimise vos process. On build vos produits.",
};

function makeSpec(slideCount: number, overrides: Record<string, unknown> = {}) {
  return {
    slug: "s3-framework",
    date: "2026-06-08",
    slides: Array.from({ length: slideCount }, () => validSlide),
    pipeline_applied: {
      audit_score: 75,
      audit_skill: "great-web-copy/audit-copy",
      humanizer: "yes" as const,
      humanizer_date: "2026-06-01",
    },
    ...overrides,
  };
}

describe("CarouselSpecSchema", () => {
  test("accepts a valid spec with 10 slides", () => {
    const result = CarouselSpecSchema.safeParse(makeSpec(10));
    expect(result.success).toBe(true);
  });

  test("rejects fewer than 8 slides (D-05 floor)", () => {
    const result = CarouselSpecSchema.safeParse(makeSpec(7));
    expect(result.success).toBe(false);
  });

  test("rejects more than 10 slides (D-05 ceiling)", () => {
    const result = CarouselSpecSchema.safeParse(makeSpec(11));
    expect(result.success).toBe(false);
  });

  test("rejects slug containing slash or dot (path traversal protection)", () => {
    const bad1 = CarouselSpecSchema.safeParse(makeSpec(8, { slug: "../etc/passwd" }));
    const bad2 = CarouselSpecSchema.safeParse(makeSpec(8, { slug: "foo.bar" }));
    const bad3 = CarouselSpecSchema.safeParse(makeSpec(8, { slug: "with/slash" }));
    expect(bad1.success).toBe(false);
    expect(bad2.success).toBe(false);
    expect(bad3.success).toBe(false);
  });

  test("rejects audit_score below 60 (D-08 enforcement)", () => {
    const result = CarouselSpecSchema.safeParse(
      makeSpec(8, {
        pipeline_applied: {
          audit_score: 59,
          audit_skill: "x",
          humanizer: "yes",
          humanizer_date: "2026-06-01",
        },
      })
    );
    expect(result.success).toBe(false);
  });

  test("rejects humanizer not equal to 'yes'", () => {
    const result = CarouselSpecSchema.safeParse(
      makeSpec(8, {
        pipeline_applied: {
          audit_score: 80,
          audit_skill: "x",
          humanizer: "no",
          humanizer_date: "2026-06-01",
        },
      })
    );
    expect(result.success).toBe(false);
  });

  test("rejects Stat slide missing source URL (discriminated union)", () => {
    const result = SlideSchema.safeParse({
      template: "Stat",
      figure: "73%",
      label: "des entreprises ont adopté l'IA",
    });
    expect(result.success).toBe(false);
  });

  test("defaults format to 'portrait' when omitted (D-04)", () => {
    const result = CarouselSpecSchema.safeParse(makeSpec(8));
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.format).toBe("portrait");
    }
  });
});
