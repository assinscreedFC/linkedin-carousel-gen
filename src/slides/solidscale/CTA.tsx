// src/slides/solidscale/CTA.tsx
// SolidScale CTA template v2 (Phase 12.1-05).
// D-10: kicker? / headline / subtitle? / cta_label (ctaLabel alias) / url (urlReal/urlDisplay alias) / signature?
// Mood: Artisan technique sombre — miroir bookend de Hook (variant hookCta, grand prism).
// slideIndex transmis au Backdrop pour variante constellation deterministe (AJUST 3 Phase 12.1-04).

import React from "react";
import { COLORS, FONTS, TYPE, SPACING } from "../../tokens";
import type { Slide } from "../../spec/schema";
import { Header, Footer, Backdrop } from "./_chrome";

type CTASlide = Extract<Slide, { template: "CTA" }>;

export function CTA({
  slide,
  index,
  total,
}: {
  slide: CTASlide;
  index: number;
  total: number;
}): React.ReactElement {
  // D-10 : ctaLabel prefere sur cta_label (compat legacy)
  const ctaText = slide.ctaLabel ?? slide.cta_label;

  // D-10 : urlDisplay prefere; sinon urlReal; sinon url (legacy)
  const urlRaw = slide.urlReal ?? slide.url;
  const urlShown = slide.urlDisplay ?? urlRaw.replace(/^https?:\/\//, "");

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      backgroundColor: COLORS.bg,
      position: "relative",
    }}>
      {/* D-09: backdrop derriere le texte — variant hookCta = miroir bookend Hook */}
      {/* slideIndex pour variante constellation deterministe (AJUST 3 Phase 12.1-04) */}
      <Backdrop variant="hookCta" slideIndex={index} />

      <Header current={index} total={total} inverse />

      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        paddingLeft: SPACING.rail,
        paddingRight: SPACING.rail,
        paddingTop: 64,
      }}>

        {/* kicker : Geist Mono uppercase azurDark (optionnel) */}
        {slide.kicker ? (
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
            {slide.kicker}
          </div>
        ) : null}

        {/* headline : display 88px Geist Black, focal absolu */}
        <div style={{
          display: "flex",
          fontFamily: FONTS.sans,
          fontSize: TYPE.display.size,
          fontWeight: TYPE.display.weight,
          lineHeight: TYPE.display.lineHeight,
          letterSpacing: TYPE.display.tracking,
          color: COLORS.textInverse,
          maxWidth: 880,
          marginBottom: 40,
        }}>
          {slide.headline}
        </div>

        {/* subtitle : optionnel, sous le headline */}
        {slide.subtitle ? (
          <div style={{
            display: "flex",
            fontFamily: FONTS.sans,
            fontSize: TYPE.subtitle.size,
            fontWeight: TYPE.subtitle.weight,
            lineHeight: TYPE.subtitle.lineHeight,
            color: COLORS.textInverseMuted,
            maxWidth: 720,
            marginBottom: 48,
          }}>
            {slide.subtitle}
          </div>
        ) : null}

        {/* CTA box : fond azurDark, texte blanc, arrow mono */}
        <div style={{
          display: "flex",
          alignItems: "center",
          paddingLeft: 36,
          paddingRight: 28,
          paddingTop: 22,
          paddingBottom: 22,
          backgroundColor: COLORS.azurDark,
          borderRadius: 12,
          alignSelf: "flex-start",
          marginBottom: 32,
        }}>
          <span style={{
            fontFamily: FONTS.sans,
            fontWeight: 700,
            fontSize: 34,
            letterSpacing: -0.5,
            color: COLORS.textInverse,
          }}>{ctaText}</span>
          <span style={{
            fontFamily: FONTS.mono,
            fontWeight: 500,
            fontSize: 34,
            marginLeft: 22,
            color: COLORS.textInverse,
          }}>{">"}</span>
        </div>

        {/* urlDisplay : Geist Mono azurDark */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", width: 28, height: 1, backgroundColor: COLORS.azurDark }} />
          <span style={{
            fontFamily: FONTS.mono,
            fontWeight: 500,
            fontSize: 24,
            letterSpacing: 1.6,
            color: COLORS.azurDark,
            textTransform: "lowercase",
          }}>{urlShown}</span>
        </div>

      </div>

      {/* signature : footer-meta optionnel */}
      {slide.signature ? (
        <div style={{
          display: "flex",
          paddingLeft: SPACING.rail,
          paddingRight: SPACING.rail,
          marginBottom: 24,
        }}>
          <span style={{
            fontFamily: FONTS.mono,
            fontWeight: 400,
            fontSize: TYPE.byline.size,
            letterSpacing: 1.0,
            color: COLORS.textMuted,
            fontStyle: "italic",
          }}>
            {slide.signature}
          </span>
        </div>
      ) : null}

      <Footer current={index} total={total} inverse />
    </div>
  );
}
