// src/slides/solidscale/CTA.tsx
// D-06 CTA template (call-to-action audit). Closing slide of carousel.

import React from "react";
import { COLORS, FONTS } from "../../tokens";
import type { Slide } from "../../spec/schema";

type CTASlide = Extract<Slide, { template: "CTA" }>;

export function CTA({ slide }: { slide: CTASlide }): React.ReactElement {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      padding: 80,
      backgroundColor: COLORS.navy,
      fontFamily: FONTS.sans,
    }}>
      <div style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
      }}>
        <div style={{
          display: "flex",
          fontFamily: FONTS.display,
          fontWeight: 400,
          fontSize: 96,
          lineHeight: 1.08,
          letterSpacing: -2,
          color: COLORS.bgElevated,
        }}>
          {slide.headline}
        </div>
      </div>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          padding: "20px 36px",
          borderRadius: 10,
          backgroundColor: COLORS.cobalt,
          fontFamily: FONTS.sans,
          fontWeight: 500,
          fontSize: 32,
          color: COLORS.bgElevated,
          marginBottom: 40,
        }}>
          <span>{slide.cta_label}</span>
          <span style={{ fontFamily: FONTS.mono, marginLeft: 16 }}>→</span>
        </div>
        <div style={{
          display: "flex",
          fontFamily: FONTS.mono,
          fontSize: 22,
          color: COLORS.azur,
        }}>
          {slide.url}
        </div>
      </div>
    </div>
  );
}
