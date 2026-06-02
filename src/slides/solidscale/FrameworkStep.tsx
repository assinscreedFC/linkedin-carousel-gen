// src/slides/solidscale/FrameworkStep.tsx
// SolidScale FrameworkStep template v3 (Phase 12.1-05 unification).
// D-10: step / headline / body / calloutQuote? / microAnnotation?
// Mood: Artisan technique sombre — layout asymetrique, constellation variant step.
// slideIndex transmis au Backdrop pour variante constellation deterministe (AJUST 3 Phase 12.1-04).
// AJUST 1 propagated: barre de progression 3 segments retires (unification chrome v3).

import React from "react";
import { COLORS, FONTS, TYPE, SPACING } from "../../tokens";
import type { Slide } from "../../spec/schema";
import { Header, Footer, Backdrop } from "./_chrome";

type FrameworkStepSlide = Extract<Slide, { template: "FrameworkStep" }>;

export function FrameworkStep({
  slide,
  index,
  total,
}: {
  slide: FrameworkStepSlide;
  index: number;
  total: number;
}): React.ReactElement {
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

        {/* Kicker S3 : Geist Mono uppercase azurDark — aligne sur Hook/CTA/Stat (TYPE.kicker, AJUST unification 12.1-05) */}
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
          {`S3 · ${slide.step.toUpperCase()}`}
        </div>

        {/* headline */}
        <div style={{
          display: "flex",
          fontFamily: FONTS.sans,
          fontSize: TYPE.headline.size,
          fontWeight: TYPE.headline.weight,
          lineHeight: TYPE.headline.lineHeight,
          letterSpacing: TYPE.headline.tracking,
          color: COLORS.textInverse,
          maxWidth: 860,
          marginBottom: 32,
        }}>
          {slide.headline}
        </div>

        {/* body */}
        <div style={{
          display: "flex",
          fontFamily: FONTS.sans,
          fontSize: TYPE.body.size,
          fontWeight: TYPE.body.weight,
          lineHeight: TYPE.body.lineHeight,
          color: COLORS.textInverseMuted,
          maxWidth: 760,
          marginBottom: 32,
        }}>
          {slide.body}
        </div>

        {/* calloutQuote : encart italic azurDark avec barre verticale gauche */}
        {slide.calloutQuote ? (
          <div style={{
            display: "flex",
            flexDirection: "column",
            borderLeft: `4px solid ${COLORS.azurDark}`,
            paddingLeft: 24,
            marginBottom: 24,
            maxWidth: 720,
          }}>
            <span style={{
              fontFamily: FONTS.sans,
              fontSize: TYPE.callout.size,
              fontWeight: TYPE.callout.weight,
              fontStyle: "italic",
              lineHeight: TYPE.callout.lineHeight,
              color: COLORS.azurDark,
            }}>
              {slide.calloutQuote}
            </span>
          </div>
        ) : null}

        {/* microAnnotation : Geist Mono muted bas de slide */}
        {slide.microAnnotation ? (
          <div style={{
            display: "flex",
            fontFamily: FONTS.mono,
            fontSize: TYPE.microAnnotation.size,
            fontWeight: 400,
            letterSpacing: 1.2,
            color: COLORS.textMuted,
          }}>
            {slide.microAnnotation}
          </div>
        ) : null}

      </div>

      <Footer current={index} total={total} inverse />
    </div>
  );
}
