// src/slides/solidscale/Hook.tsx
// D-06 Hook template (cover slide). Flexbox-only (Satori Pitfall 2).
// All colors/fonts via tokens.ts allowlist (D-10a).

import React from "react";
import { COLORS, FONTS } from "../../tokens";
import type { Slide } from "../../spec/schema";

type HookSlide = Extract<Slide, { template: "Hook" }>;

export function Hook({ slide }: { slide: HookSlide }): React.ReactElement {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      padding: 80,
      backgroundColor: COLORS.bg,
      fontFamily: FONTS.sans,
    }}>
      {slide.eyebrow && (
        <div style={{
          display: "flex",
          fontFamily: FONTS.mono,
          fontSize: 22,
          fontWeight: 500,
          color: COLORS.cobalt,
          textTransform: "uppercase",
          letterSpacing: 4,
          marginBottom: 48,
        }}>
          {slide.eyebrow}
        </div>
      )}
      <div style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
      }}>
        <div style={{
          display: "flex",
          fontFamily: FONTS.display,
          fontSize: 110,
          fontWeight: 400,
          lineHeight: 1.05,
          letterSpacing: -2,
          color: COLORS.navy,
        }}>
          {slide.title}
        </div>
      </div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        fontFamily: FONTS.mono,
        fontSize: 18,
        color: COLORS.textMuted,
      }}>
        <span>solidscale.tech</span>
        <span style={{ color: COLORS.cobalt }}>→</span>
      </div>
    </div>
  );
}
