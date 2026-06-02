// src/slides/solidscale/Hook.tsx
// SolidScale Hook template v2 (Phase 12.1-04 iteration 2).
// Mood: Artisan technique sombre (RETENU, docs/design-carousels.md).
// Hierarchy D-10: kicker / title / subtitle / tags / byline (5 levels).
// Layout: colonne principale pleine largeur (constellation en background ne necessite plus d'espace reserve).
// Backdrop hookCta: GeometricConstellation multi-couches sur fond #0F2040 (bgNavy).
// Anti-patterns: pas d'IsoHexPrism, pas de hex literal, pas d'em-dash.

import React from "react";
import { COLORS, FONTS, TYPE, SPACING } from "../../tokens";
import type { Slide } from "../../spec/schema";
import { Header, Footer, Backdrop } from "./_chrome";

type HookSlide = Extract<Slide, { template: "Hook" }>;

export function Hook({
  slide,
  index,
  total,
}: {
  slide: HookSlide;
  index: number;
  total: number;
}): React.ReactElement {
  // D-10: kicker prend precedence sur eyebrow si les deux sont presents.
  // Si kicker absent mais eyebrow present, utiliser eyebrow comme kicker (compat).
  const kickerText = slide.kicker ?? slide.eyebrow ?? null;

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      backgroundColor: COLORS.bgNavy,
      position: "relative",
    }}>
      {/* D-09: backdrop derriere le texte (z-index inferieur par ordre DOM) */}
      <Backdrop variant="hookCta" />

      <Header current={index} total={total} inverse />

      {/* Zone contenu : paddingRight 400 libere la colonne droite pour le prism (D-06) */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        paddingLeft: SPACING.rail,
        paddingRight: SPACING.rail,
        paddingTop: 64,
      }}>

        {/* Niveau 1 : kicker (Geist Mono uppercase azurDark, D-10) */}
        {kickerText ? (
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
            {kickerText}
          </div>
        ) : null}

        {/* Niveau 2 : title (display 88px Geist Black, focal absolu, D-10) */}
        <div style={{
          display: "flex",
          fontFamily: FONTS.sans,
          fontSize: TYPE.display.size,
          fontWeight: TYPE.display.weight,
          lineHeight: TYPE.display.lineHeight,
          letterSpacing: TYPE.display.tracking,
          color: COLORS.textInverse,
          maxWidth: 860,
          marginBottom: 40,
        }}>
          {slide.title}
        </div>

        {/* Niveau 3 : subtitle (42px Geist 400, optionnel, D-10) */}
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

        {/* Niveau 4 : tags (chips Geist Mono uppercase, optionnel, D-10) */}
        {slide.tags && slide.tags.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "row", gap: 16 }}>
            {slide.tags.map((tag, i) => (
              <div key={i} style={{
                display: "flex",
                fontFamily: FONTS.mono,
                fontSize: TYPE.tag.size,
                fontWeight: TYPE.tag.weight,
                lineHeight: TYPE.tag.lineHeight,
                letterSpacing: TYPE.tag.tracking,
                color: COLORS.azurDark,
                textTransform: "uppercase",
                backgroundColor: COLORS.surface2,
                paddingTop: 8,
                paddingBottom: 8,
                paddingLeft: 16,
                paddingRight: 16,
                borderRadius: 4,
              }}>
                {tag}
              </div>
            ))}
          </div>
        ) : null}

      </div>

      {/* Niveau 5 : byline (Geist Mono muted, juste au-dessus du footer, D-10) */}
      {slide.byline ? (
        <div style={{
          display: "flex",
          paddingLeft: SPACING.rail,
          paddingRight: SPACING.rail,
          marginBottom: 24,
        }}>
          <span style={{
            display: "flex",
            fontFamily: FONTS.mono,
            fontSize: TYPE.byline.size,
            fontWeight: TYPE.byline.weight,
            lineHeight: TYPE.byline.lineHeight,
            color: COLORS.textMuted,
          }}>
            {slide.byline}
          </span>
        </div>
      ) : null}

      <Footer current={index} total={total} inverse />
    </div>
  );
}
