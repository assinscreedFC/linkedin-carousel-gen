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

// Isometric wireframe hexagonal prism : 3D-feel polyhedron in line art.
// Mood tech architecture, hexagon as 3D structure not flat shape.
// D-08: strokeWidth fixed at 2 (not 4), opacity 0.6-0.8, size parametric (D-07).
// D-06: position (cx, cy) fixed per Backdrop variant — never varied arbitrarily.
function IsoHexPrism({
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
  // Top hex (pointy-top) + bottom hex offset for depth + connecting lines.
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

// Atmospheric backdrop per D-05/D-06/D-07/D-08/D-09.
// ONE visual language: iso hex prism wireframe only. No constellation, dots, mesh, grid.
// Position is FIXED per variant (D-06). Size is hierarchized (D-07):
//   hookCta : grand (size=520, cx=820, cy=280) — slides bookend, focal signature
//   step     : petit (size=100, cx=970, cy=1230) — slides milieu, accent discret
// Gradient rgba values are derived from COLORS.azurDark (#3B82F6) and COLORS.cobalt (#2E6BB8).
// Added to tokens.ts as GRADIENT_RGBA_ACCENT / GRADIENT_RGBA_COBALT to satisfy D-10a allowlist.
export function Backdrop({
  variant,
}: { variant: "hookCta" | "step" }): React.ReactElement {
  if (variant === "hookCta") {
    // D-07: grand prism haut-droit (bookend Hook/CTA). Gradient accent radial light.
    return (
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage:
            "radial-gradient(circle at 80% 18%, rgba(59,130,246,0.55) 0%, rgba(59,130,246,0.12) 32%, rgba(5,8,16,0) 60%), " +
            "radial-gradient(circle at 22% 60%, rgba(46,107,184,0.45) 0%, rgba(46,107,184,0.08) 30%, rgba(5,8,16,0) 55%)",
        }}
      >
        {/* Grand prism haut-droit : size=520, cx=820, cy=280 (D-07 bookend) */}
        <IsoHexPrism cx={820} cy={280} size={520} opacity={0.7} strokeWidth={2} />
      </div>
    );
  }
  // variant === "step" : fond uni COLORS.bg, petit prism bas-droit discret (D-07 milieu)
  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      {/* Petit prism bas-droit : size=100, cx=970, cy=1230 (D-07 milieu) */}
      <IsoHexPrism cx={970} cy={1230} size={100} opacity={0.65} strokeWidth={2} />
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
