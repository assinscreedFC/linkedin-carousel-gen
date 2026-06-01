// src/slides/solidscale/index.ts
// Barrel + template dispatcher for SolidScale-branded slides.
// Consumed by Plan 04 render pipeline (renderSlide → satori → SVG → PNG → PDF).

import React from "react";
import type { Slide } from "../../spec/schema";
import { Hook } from "./Hook";
import { Stat } from "./Stat";
import { FrameworkStep } from "./FrameworkStep";
import { CTA } from "./CTA";

export { Hook, Stat, FrameworkStep, CTA };

export function renderSlide(slide: Slide): React.ReactElement {
  switch (slide.template) {
    case "Hook": return Hook({ slide });
    case "Stat": return Stat({ slide });
    case "FrameworkStep": return FrameworkStep({ slide });
    case "CTA": return CTA({ slide });
  }
}
