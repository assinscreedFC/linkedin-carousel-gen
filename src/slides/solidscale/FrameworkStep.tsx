// src/slides/solidscale/FrameworkStep.tsx
// D-06 FrameworkStep template (S3 step: Scan/Solve/Scale).
// Numbered 01/02/03 per S3 mapping. Vocabulaire S3 figé.

import React from "react";
import { COLORS, FONTS } from "../../tokens";
import type { Slide } from "../../spec/schema";

type FrameworkStepSlide = Extract<Slide, { template: "FrameworkStep" }>;

const STEP_NUM: Record<FrameworkStepSlide["step"], string> = {
  Scan: "01",
  Solve: "02",
  Scale: "03",
};

export function FrameworkStep({ slide }: { slide: FrameworkStepSlide }): React.ReactElement {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      padding: 80,
      backgroundColor: COLORS.bg,
      fontFamily: FONTS.sans,
    }}>
      <div style={{
        display: "flex",
        fontFamily: FONTS.sans,
        fontWeight: 800,
        fontSize: 200,
        lineHeight: 1,
        letterSpacing: -8,
        color: COLORS.azur,
        marginBottom: 16,
      }}>
        {STEP_NUM[slide.step]}
      </div>
      <div style={{
        display: "flex",
        fontFamily: FONTS.mono,
        fontWeight: 500,
        fontSize: 28,
        letterSpacing: 6,
        textTransform: "uppercase",
        color: COLORS.cobalt,
        marginBottom: 40,
      }}>
        {slide.step}
      </div>
      <div style={{
        display: "flex",
        fontFamily: FONTS.sans,
        fontWeight: 600,
        fontSize: 64,
        lineHeight: 1.15,
        letterSpacing: -1.5,
        color: COLORS.navy,
        marginBottom: 32,
      }}>
        {slide.headline}
      </div>
      <div style={{
        display: "flex",
        fontFamily: FONTS.sans,
        fontWeight: 400,
        fontSize: 32,
        lineHeight: 1.5,
        color: COLORS.textMuted,
        flex: 1,
      }}>
        {slide.body}
      </div>
    </div>
  );
}
