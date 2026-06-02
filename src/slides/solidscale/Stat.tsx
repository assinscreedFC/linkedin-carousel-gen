// src/slides/solidscale/Stat.tsx
// Engineered Authority Stat (dark theme).
// Huge azur tabular numeral, white label, source citation in muted mono.

import React from "react";
import { COLORS, FONTS, TYPE, SPACING } from "../../tokens";
import type { Slide } from "../../spec/schema";
import { Header, Footer, Eyebrow, Backdrop } from "./_chrome";

type StatSlide = Extract<Slide, { template: "Stat" }>;

export function Stat({
  slide,
  index,
  total,
}: {
  slide: StatSlide;
  index: number;
  total: number;
}): React.ReactElement {
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
      backgroundColor: COLORS.bg,
      fontFamily: FONTS.sans,
      position: "relative",
    }}>
      <Backdrop variant="step" />
      <Header current={index} total={total} inverse />

      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        paddingLeft: SPACING.rail,
        paddingRight: SPACING.rail,
        paddingTop: 64,
      }}>
        <div style={{ display: "flex", marginBottom: 36 }}>
          <Eyebrow text="Chiffre clé" color={COLORS.azurDark} withRule={true} />
        </div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
        }}>
          <div style={{
            display: "flex",
            fontFamily: FONTS.sans,
            fontSize: TYPE.stat.size,
            fontWeight: TYPE.stat.weight,
            lineHeight: TYPE.stat.lineHeight,
            letterSpacing: TYPE.stat.tracking,
            color: COLORS.azurDark,
            fontVariantNumeric: "tabular-nums",
            marginLeft: -8,
          }}>
            {slide.figure}
          </div>

          <div style={{ display: "flex", height: 4, width: 96, backgroundColor: COLORS.cobalt, marginTop: 36, marginBottom: 36 }} />

          <div style={{
            display: "flex",
            fontFamily: FONTS.sans,
            fontSize: 40,
            fontWeight: 400,
            lineHeight: 1.35,
            color: COLORS.textInverse,
            maxWidth: 820,
          }}>
            {slide.label}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 56 }}>
          <div style={{ display: "flex", width: 24, height: 1, backgroundColor: COLORS.textInverseMuted }} />
          <span style={{
            fontFamily: FONTS.mono,
            fontWeight: 400,
            fontSize: 20,
            letterSpacing: 1.2,
            color: COLORS.textInverseMuted,
            textTransform: "lowercase",
          }}>source · {sourceLabel}</span>
        </div>
      </div>

      <Footer current={index} total={total} inverse />
    </div>
  );
}
