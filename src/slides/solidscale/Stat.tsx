// src/slides/solidscale/Stat.tsx
// D-06 Stat template (sourced number). Chiffres sourcés obligatoires
// (feedback_chiffres_source_verite.md): source field always rendered.

import React from "react";
import { COLORS, FONTS } from "../../tokens";
import type { Slide } from "../../spec/schema";

type StatSlide = Extract<Slide, { template: "Stat" }>;

export function Stat({ slide }: { slide: StatSlide }): React.ReactElement {
  // Source display: strip protocol + path for readability
  const sourceLabel = (() => {
    try {
      const u = new URL(slide.source);
      return u.hostname.replace(/^www\./, "");
    } catch {
      return slide.source;
    }
  })();

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      padding: 80,
      backgroundColor: COLORS.bgElevated,
      fontFamily: FONTS.sans,
    }}>
      <div style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{
          display: "flex",
          fontFamily: FONTS.display,
          fontSize: 260,
          fontWeight: 400,
          lineHeight: 1,
          letterSpacing: -6,
          color: COLORS.cobalt,
          marginBottom: 32,
        }}>
          {slide.figure}
        </div>
        <div style={{
          display: "flex",
          fontFamily: FONTS.sans,
          fontSize: 36,
          fontWeight: 500,
          lineHeight: 1.3,
          color: COLORS.text,
          textAlign: "center",
          maxWidth: 800,
        }}>
          {slide.label}
        </div>
      </div>
      <div style={{
        display: "flex",
        justifyContent: "center",
        fontFamily: FONTS.mono,
        fontSize: 16,
        color: COLORS.textSubtle,
      }}>
        Source : {sourceLabel}
      </div>
    </div>
  );
}
