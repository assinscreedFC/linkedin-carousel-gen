// src/slides/solidscale/_chrome.tsx
// Shared graphic atoms for SolidScale Engineered Authority direction (dark theme).
// Real logo mark (webp) loaded as data URL, hexagon page indicator,
// footer rail, eyebrow with cobalt rule.

import React from "react";
import { COLORS, HEX, SPACING, TYPE, LOGO_HEIGHT, LOGO_WIDTH } from "../../tokens";

// Load real SolidScale logo mark once at module init (top-level await OK in Bun).
const _logoBytes = await Bun.file("src/assets/logo-mark.png").arrayBuffer();
export const LOGO_DATA_URL = `data:image/png;base64,${Buffer.from(_logoBytes).toString("base64")}`;

// Pointy-top hexagon primitive (page indicator only — brand mark uses real logo).
export function Hex({
  size,
  fill = "none",
  stroke = "none",
  strokeWidth = 0,
}: {
  size: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: "flex" }}>
      <polygon
        points="50,3 93,27 93,73 50,97 7,73 7,27"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

// BrandMark using the real logo asset (webp).
export function BrandMark({ inverse = false }: { inverse?: boolean }): React.ReactElement {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <img src={LOGO_DATA_URL} width={LOGO_WIDTH} height={LOGO_HEIGHT} style={{ display: "flex" }} />
      <span style={{
        fontFamily: "Geist Mono",
        fontWeight: 500,
        fontSize: 18,
        letterSpacing: 2.2,
        color: inverse ? COLORS.textInverse : COLORS.navy,
        textTransform: "uppercase",
      }}>SolidScale</span>
    </div>
  );
}

export function PageDots({
  current,
  total,
  inverse = false,
}: { current: number; total: number; inverse?: boolean }): React.ReactElement {
  const accentColor = COLORS.azur;
  const dimColor = inverse ? COLORS.textInverseMuted : COLORS.steel;
  return (
    <div style={{ display: "flex", gap: 9 }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{ display: "flex" }}>
          {i === current ? (
            <Hex size={HEX.pageDot} fill={accentColor} />
          ) : (
            <Hex size={HEX.pageDot} stroke={dimColor} strokeWidth={2} />
          )}
        </div>
      ))}
    </div>
  );
}

export function Header({
  current,
  total,
  inverse = false,
}: { current: number; total: number; inverse?: boolean }): React.ReactElement {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      paddingLeft: SPACING.rail,
      paddingRight: SPACING.rail,
      paddingTop: 56,
    }}>
      <BrandMark inverse={inverse} />
      <PageDots current={current} total={total} inverse={inverse} />
    </div>
  );
}

export function Footer({
  current,
  total,
  inverse = false,
}: { current: number; total: number; inverse?: boolean }): React.ReactElement {
  const textColor = inverse ? COLORS.textInverseMuted : COLORS.textMuted;
  const accentColor = COLORS.azur;
  const ruleColor = COLORS.azur;
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      paddingLeft: SPACING.rail,
      paddingRight: SPACING.rail,
      paddingBottom: 48,
    }}>
      <div style={{ display: "flex", height: 1, backgroundColor: ruleColor, width: "100%", marginBottom: 22, opacity: 0.5 }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <span style={{
          fontFamily: "Geist Mono",
          fontWeight: 400,
          fontSize: TYPE.meta.size,
          letterSpacing: TYPE.meta.tracking,
          color: textColor,
        }}>
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span style={{
          fontFamily: "Geist Mono",
          fontWeight: 500,
          fontSize: TYPE.meta.size,
          letterSpacing: TYPE.meta.tracking,
          color: accentColor,
          textTransform: "lowercase",
        }}>solidscale.tech</span>
      </div>
    </div>
  );
}

// Isometric wireframe hexagonal prism — conserve pour retrocompat eventuelle (non utilise dans Hook/CTA v2).
export function IsoHexPrism({
  cx,
  cy,
  size,
  opacity = 0.7,
  color,
  strokeWidth = 2,
}: {
  cx: number;
  cy: number;
  size: number;
  opacity?: number;
  color?: string;
  strokeWidth?: number;
}): React.ReactElement {
  const c = color ?? COLORS.azurDark;
  const r = size / 2;
  const offsetY = r * 0.6;
  const top = [
    [cx, cy - r],
    [cx + r * 0.866, cy - r * 0.5],
    [cx + r * 0.866, cy + r * 0.5],
    [cx, cy + r],
    [cx - r * 0.866, cy + r * 0.5],
    [cx - r * 0.866, cy - r * 0.5],
  ];
  const bot = top.map(([x, y]) => [x, y + offsetY]);
  return (
    <svg
      width={1080}
      height={1350}
      viewBox="0 0 1080 1350"
      style={{ display: "flex", position: "absolute", top: 0, left: 0, opacity }}
    >
      <polygon points={top.map((p) => p.join(",")).join(" ")} fill="none" stroke={c} strokeWidth={strokeWidth} />
      <polygon points={bot.map((p) => p.join(",")).join(" ")} fill="none" stroke={c} strokeWidth={strokeWidth} />
      {top.map((p, i) => (
        <line key={`s${i}`} x1={p[0]} y1={p[1]} x2={bot[i][0]} y2={bot[i][1]} stroke={c} strokeWidth={strokeWidth} />
      ))}
    </svg>
  );
}

// Constellation geometrique multi-couches (Phase 12.1-04 v2).
// Remplace IsoHexPrism sur les slides Hook/CTA.
// Reference visuelle : hero "A propos" solidscale.tech.
// D-06: positions fixes, pattern sur TOUT le canvas, meme fond sur chaque slide.
export function GeometricConstellation(): React.ReactElement {
  const hexStroke = COLORS.azurLight;   // #4A90D9 — hex doubles
  const lineStroke = COLORS.navyMid;    // #2E6BB8 — cercles + diagonales

  return (
    <svg
      width={1080}
      height={1350}
      viewBox="0 0 1080 1350"
      style={{ display: "flex", position: "absolute", top: 0, left: 0 }}
    >
      {/* COUCHE 1 : Lignes diagonales croisees — traversent tout le canvas */}
      <line x1={0} y1={1180} x2={1080} y2={180} stroke={lineStroke} strokeWidth={1} opacity={0.10} />
      <line x1={0} y1={180} x2={1080} y2={1180} stroke={lineStroke} strokeWidth={1} opacity={0.10} />

      {/* COUCHE 2 : Hexagones imbriques (outer + inner) x3 */}

      {/* Hex haut-gauche */}
      <polygon
        points="120,120 195,78 270,120 270,204 195,246 120,204"
        fill="none" stroke={hexStroke} strokeWidth={1.5} opacity={0.18}
      />
      <polygon
        points="165,150 210,126 255,150 255,192 210,216 165,192"
        fill="none" stroke={hexStroke} strokeWidth={1.5} opacity={0.18}
      />

      {/* Hex central focal (plus grand) */}
      <polygon
        points="420,480 600,384 780,480 780,672 600,768 420,672"
        fill="none" stroke={hexStroke} strokeWidth={2} opacity={0.22}
      />
      <polygon
        points="465,510 600,438 735,510 735,642 600,714 465,642"
        fill="none" stroke={hexStroke} strokeWidth={2} opacity={0.22}
      />

      {/* Hex bas-droite (plus petit) */}
      <polygon
        points="750,1110 855,1050 960,1110 960,1230 855,1290 750,1230"
        fill="none" stroke={hexStroke} strokeWidth={1.5} opacity={0.18}
      />
      <polygon
        points="790,1135 855,1095 920,1135 920,1215 855,1255 790,1215"
        fill="none" stroke={hexStroke} strokeWidth={1.5} opacity={0.18}
      />

      {/* COUCHE 3 : Cercles concentriques (plein + pointille) x3 */}

      {/* Haut-droite */}
      <circle cx={930} cy={180} r={135} fill="none" stroke={lineStroke} strokeWidth={1.5} opacity={0.15} />
      <circle cx={930} cy={180} r={210} fill="none" stroke={lineStroke} strokeWidth={1} strokeDasharray="15 12" opacity={0.15} />

      {/* Gauche-mid */}
      <circle cx={150} cy={720} r={105} fill="none" stroke={lineStroke} strokeWidth={1.5} opacity={0.12} />
      <circle cx={150} cy={720} r={165} fill="none" stroke={lineStroke} strokeWidth={1} strokeDasharray="12 12" opacity={0.12} />

      {/* Bas-droite (pointille uniquement) */}
      <circle cx={990} cy={1240} r={120} fill="none" stroke={lineStroke} strokeWidth={1} strokeDasharray="18 12" opacity={0.12} />
    </svg>
  );
}

// Backdrop v3 : fond #050810 (theme B) + gradient radial bleu v10 (Hook validation) +
// GeometricConstellation en overlay (couche suppletive, z-index DOM intermediaire).
// D-06: positions fixes, gradient radial restaure (valide par Anis en v10).
export function Backdrop({
  variant,
}: { variant: "hookCta" | "step" }): React.ReactElement {
  if (variant === "hookCta") {
    // Fond bg #050810 + radial-gradient azurDark + cobalt (v10 restaure) + constellation overlay.
    return (
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: COLORS.bg,
          backgroundImage:
            "radial-gradient(circle at 80% 18%, rgba(59,130,246,0.55) 0%, rgba(59,130,246,0.12) 32%, rgba(5,8,16,0) 60%), " +
            "radial-gradient(circle at 22% 60%, rgba(46,107,184,0.45) 0%, rgba(46,107,184,0.08) 30%, rgba(5,8,16,0) 55%)",
        }}
      >
        <GeometricConstellation />
      </div>
    );
  }
  // variant === "step" : fond bg #050810, constellation discrete en overlay.
  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.bg,
      }}
    >
      <GeometricConstellation />
    </div>
  );
}

export function Eyebrow({
  text,
  color = COLORS.azur,
  withRule = true,
}: { text: string; color?: string; withRule?: boolean }): React.ReactElement {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <span style={{
        fontFamily: "Geist Mono",
        fontWeight: 500,
        fontSize: TYPE.eyebrow.size,
        letterSpacing: TYPE.eyebrow.tracking,
        color,
        textTransform: "uppercase",
      }}>{text}</span>
      {withRule ? (
        <div style={{ display: "flex", width: 56, height: 2, backgroundColor: color, marginTop: 16 }} />
      ) : null}
    </div>
  );
}
