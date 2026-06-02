// src/slides/solidscale/Stat.tsx
// SolidScale Stat template v2 (Phase 12.1-05).
// D-10: figure / label / subLabel? / comparator? / source (mandatory D-13).
// Mood: Artisan technique sombre — figure 320px focal absolu, constellation variant step.
// slideIndex transmis au Backdrop pour variante constellation deterministe (AJUST 3 Phase 12.1-04).

import React from "react";
import { COLORS, FONTS, TYPE, SPACING } from "../../tokens";
import type { Slide } from "../../spec/schema";
import { Header, Footer, Backdrop } from "./_chrome";

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
  // D-13: source mandatory — parse hostname pour affichage court.
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
      position: "relative",
    }}>
      {/* D-09: backdrop derriere le texte — slideIndex pour variante constellation deterministe */}
      <Backdrop variant="step" slideIndex={index} />

      <Header current={index} total={total} inverse />

      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        paddingLeft: SPACING.rail,
        paddingRight: SPACING.rail,
        paddingTop: 64,
      }}>

        {/* Kicker : Geist Mono uppercase azurDark — aligne sur Hook/CTA (TYPE.kicker, AJUST unification 12.1-05) */}
        <div style={{
          display: "flex",
          fontFamily: FONTS.mono,
          fontSize: TYPE.kicker.size,
          fontWeight: TYPE.kicker.weight,
          lineHeight: TYPE.kicker.lineHeight,
          letterSpacing: TYPE.kicker.tracking,
          color: COLORS.azurDark,
          textTransform: "uppercase",
          marginBottom: 32,
        }}>
          CHIFFRE CLE
        </div>

        {/* figure : TYPE.stat focal absolu */}
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
          marginBottom: 24,
        }}>
          {slide.figure}
        </div>

        {/* subLabel : contexte optionnel sous la figure */}
        {slide.subLabel ? (
          <div style={{
            display: "flex",
            fontFamily: FONTS.sans,
            fontSize: TYPE.body.size,
            fontWeight: 400,
            lineHeight: 1.4,
            color: COLORS.textInverseMuted,
            maxWidth: 720,
            marginBottom: 16,
          }}>
            {slide.subLabel}
          </div>
        ) : null}

        {/* label : description principale */}
        <div style={{
          display: "flex",
          fontFamily: FONTS.sans,
          fontSize: TYPE.subtitle.size,
          fontWeight: TYPE.subtitle.weight,
          lineHeight: TYPE.subtitle.lineHeight,
          color: COLORS.textInverse,
          maxWidth: 760,
          marginBottom: 32,
        }}>
          {slide.label}
        </div>

        {/* comparator : badge Geist Mono si present */}
        {slide.comparator ? (
          <div style={{
            display: "flex",
            fontFamily: FONTS.mono,
            fontSize: TYPE.microAnnotation.size,
            fontWeight: 400,
            letterSpacing: 1.2,
            color: COLORS.textInverseMuted,
            marginBottom: 24,
          }}>
            {slide.comparator}
          </div>
        ) : null}

        <div style={{ flex: 1 }} />

      </div>

      {/* source : footer-meta mandatory (D-13) juste au-dessus du Footer */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        paddingLeft: SPACING.rail,
        paddingRight: SPACING.rail,
        marginBottom: 24,
      }}>
        <div style={{ display: "flex", width: 24, height: 1, backgroundColor: COLORS.textInverseMuted }} />
        <span style={{
          fontFamily: FONTS.mono,
          fontWeight: 400,
          fontSize: TYPE.byline.size,
          letterSpacing: 1.2,
          color: COLORS.textInverseMuted,
          textTransform: "lowercase",
        }}>source · {sourceLabel}</span>
      </div>

      <Footer current={index} total={total} inverse />
    </div>
  );
}
