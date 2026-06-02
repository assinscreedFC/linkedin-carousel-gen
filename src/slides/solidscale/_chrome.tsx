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
      {/* PageDots retiré (AJUST 1 — Anis 2026-06-02 : "les points qui se deplacent quand on slide") */}
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

// Constellation geometrique multi-couches (Phase 12.1-04 v3).
// Remplace IsoHexPrism sur les slides Hook/CTA.
// Reference visuelle : hero "A propos" solidscale.tech.
// D-06 v3: 5 variantes deterministes, selection par (slideNumber - 1) % 5.
// Effet "flipbook" quand l'utilisateur swipe les slides du carrousel.
// Regles visuelles : meme palette, meme densite, lisibilite texte preservee sur toutes variantes.

type ConstellationVariant = {
  // Diagonales : [x1, y1, x2, y2][]
  diagonals: [number, number, number, number][];
  // Hex doubles : [outer points, inner points][] — chaque hex = pointsString flat-top
  hexPairs: [string, string][];
  // Cercles : [cx, cy, r, dashed?][]
  circles: { cx: number; cy: number; r: number; dashed?: boolean; r2?: number }[];
};

const VARIANTS: ConstellationVariant[] = [
  // Variant 0 : configuration v3 reference (originale validee Anis)
  {
    diagonals: [
      [0, 1180, 1080, 180],
      [0, 180, 1080, 1180],
    ],
    hexPairs: [
      // Hex haut-gauche
      ["120,120 195,78 270,120 270,204 195,246 120,204", "165,150 210,126 255,150 255,192 210,216 165,192"],
      // Hex central focal
      ["420,480 600,384 780,480 780,672 600,768 420,672", "465,510 600,438 735,510 735,642 600,714 465,642"],
      // Hex bas-droite
      ["750,1110 855,1050 960,1110 960,1230 855,1290 750,1230", "790,1135 855,1095 920,1135 920,1215 855,1255 790,1215"],
    ],
    circles: [
      { cx: 930, cy: 180, r: 135, r2: 210 },
      { cx: 150, cy: 720, r: 105, r2: 165 },
      { cx: 990, cy: 1240, r: 120, dashed: true },
    ],
  },

  // Variant 1 : miroir horizontal (hex deplacees vers la droite / gauche inversees)
  {
    diagonals: [
      [0, 180, 1080, 1180],
      [0, 675, 1080, 675],
    ],
    hexPairs: [
      // Hex haut-droite
      ["810,120 885,78 960,120 960,204 885,246 810,204", "855,150 900,126 945,150 945,192 900,216 855,192"],
      // Hex central focal (meme position, ca reste le focal)
      ["420,480 600,384 780,480 780,672 600,768 420,672", "465,510 600,438 735,510 735,642 600,714 465,642"],
      // Hex bas-gauche
      ["120,1110 225,1050 330,1110 330,1230 225,1290 120,1230", "160,1135 225,1095 290,1135 290,1215 225,1255 160,1215"],
    ],
    circles: [
      { cx: 150, cy: 180, r: 135, r2: 210 },
      { cx: 930, cy: 720, r: 105, r2: 165 },
      { cx: 90, cy: 1240, r: 120, dashed: true },
    ],
  },

  // Variant 2 : miroir vertical (haut <-> bas)
  {
    diagonals: [
      [0, 1180, 1080, 180],
      [540, 0, 540, 1350],
    ],
    hexPairs: [
      // Hex bas-gauche
      ["120,1104 195,1062 270,1104 270,1188 195,1230 120,1188", "165,1134 210,1110 255,1134 255,1176 210,1200 165,1176"],
      // Hex central focal
      ["420,480 600,384 780,480 780,672 600,768 420,672", "465,510 600,438 735,510 735,642 600,714 465,642"],
      // Hex haut-droite (plus petit)
      ["750,120 855,60 960,120 960,240 855,300 750,240", "790,145 855,105 920,145 920,225 855,265 790,225"],
    ],
    circles: [
      { cx: 930, cy: 1170, r: 135, r2: 210 },
      { cx: 150, cy: 630, r: 105, r2: 165 },
      { cx: 90, cy: 110, r: 120, dashed: true },
    ],
  },

  // Variant 3 : rotation 180deg (miroir H + V combines)
  {
    diagonals: [
      [0, 180, 1080, 1180],
      [0, 1180, 1080, 180],
    ],
    hexPairs: [
      // Hex bas-droite
      ["810,1104 885,1062 960,1104 960,1188 885,1230 810,1188", "855,1134 900,1110 945,1134 945,1176 900,1200 855,1176"],
      // Hex central focal (decale vers le bas pour la var)
      ["300,580 480,484 660,580 660,772 480,868 300,772", "345,610 480,538 615,610 615,742 480,814 345,742"],
      // Hex haut-gauche (petit)
      ["120,120 225,60 330,120 330,240 225,300 120,240", "160,145 225,105 290,145 290,225 225,265 160,225"],
    ],
    circles: [
      { cx: 150, cy: 1170, r: 135, r2: 210 },
      { cx: 930, cy: 630, r: 105, r2: 165 },
      { cx: 990, cy: 110, r: 120, dashed: true },
    ],
  },

  // Variant 4 : densite haute (formes concentrees zone haute, diagonale unique oblique)
  {
    diagonals: [
      [0, 900, 1080, 0],
      [0, 0, 1080, 900],
    ],
    hexPairs: [
      // Hex haut-gauche (grand)
      ["60,60 195,0 330,60 330,240 195,300 60,240", "100,85 195,38 290,85 290,215 195,262 100,215"],
      // Hex haut-droite (medium)
      ["750,120 855,60 960,120 960,240 855,300 750,240", "790,145 855,105 920,145 920,225 855,265 790,225"],
      // Hex bas-centre (petit, ancrage bas)
      ["450,1080 540,1032 630,1080 630,1176 540,1224 450,1176", "480,1100 540,1072 600,1100 600,1156 540,1184 480,1156"],
    ],
    circles: [
      { cx: 540, cy: 220, r: 150, r2: 240 },
      { cx: 150, cy: 540, r: 90, r2: 145 },
      { cx: 930, cy: 1100, r: 110, dashed: true },
    ],
  },
];

export function GeometricConstellation({ variant = 0 }: { variant?: number }): React.ReactElement {
  // Couleur azurDark #3B82F6 — meme token que le kicker Hook.tsx (Anis 2026-06-02 : coherence visuelle texte / decor).
  // Historique : cobaltTw #2563EB (test "essaye du cobalte"), electricBlue #60A5FA (version precedente).
  // Hierarchie par opacite uniquement (0.18-0.35), strokeWidth inchange.
  const stroke = COLORS.azurDark;
  const v = VARIANTS[Math.abs(variant) % VARIANTS.length];

  return (
    <svg
      width={1080}
      height={1350}
      viewBox="0 0 1080 1350"
      style={{ display: "flex", position: "absolute", top: 0, left: 0 }}
    >
      {/* COUCHE 1 : Lignes diagonales — opacite 0.10 → 0.18 */}
      {v.diagonals.map(([x1, y1, x2, y2], i) => (
        <line key={`d${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={2.5} opacity={0.18} />
      ))}

      {/* COUCHE 2 : Hexagones imbriques x3 — opacites 0.18→0.30 (periph) / 0.22→0.35 (focal i===1) */}
      {v.hexPairs.map(([outer, inner], i) => {
        const sw = i === 1 ? 3.5 : 3;
        const op = i === 1 ? 0.35 : 0.30;
        return (
          <g key={`h${i}`}>
            <polygon points={outer} fill="none" stroke={stroke} strokeWidth={sw} opacity={op} />
            <polygon points={inner} fill="none" stroke={stroke} strokeWidth={sw} opacity={op} />
          </g>
        );
      })}

      {/* COUCHE 3 : Cercles concentriques — opacites 0.15→0.25 (pleins) / 0.15→0.22 (dashed outer) / 0.12→0.18 (dashed seul) */}
      {v.circles.map((c, i) => (
        <g key={`c${i}`}>
          {!c.dashed && (
            <circle cx={c.cx} cy={c.cy} r={c.r} fill="none" stroke={stroke} strokeWidth={3} opacity={0.25} />
          )}
          {c.r2 && (
            <circle cx={c.cx} cy={c.cy} r={c.r2} fill="none" stroke={stroke} strokeWidth={2.5} strokeDasharray="15 12" opacity={0.22} />
          )}
          {c.dashed && !c.r2 && (
            <circle cx={c.cx} cy={c.cy} r={c.r} fill="none" stroke={stroke} strokeWidth={2.5} strokeDasharray="18 12" opacity={0.18} />
          )}
        </g>
      ))}
    </svg>
  );
}

// Backdrop v3 : fond #050810 (theme B) + gradient radial bleu v10 (Hook validation) +
// GeometricConstellation en overlay (couche suppletive, z-index DOM intermediaire).
// D-06 v3: constellationVariant derive de slideIndex pour effet flipbook au swipe.
export function Backdrop({
  variant,
  slideIndex = 0,
}: { variant: "hookCta" | "step"; slideIndex?: number }): React.ReactElement {
  const constellationVariant = slideIndex % VARIANTS.length;

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
        <GeometricConstellation variant={constellationVariant} />
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
      <GeometricConstellation variant={constellationVariant} />
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
