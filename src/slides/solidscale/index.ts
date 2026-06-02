// src/slides/solidscale/index.ts
// Barrel + template dispatcher for SolidScale-branded slides.
// index and total threaded through for page indicator chrome.

import React from "react";
import type { Slide } from "../../spec/schema";
import { Hook } from "./Hook";
import { Stat } from "./Stat";
import { FrameworkStep } from "./FrameworkStep";
import { CTA } from "./CTA";

export { Hook, Stat, FrameworkStep, CTA };

export function renderSlide(slide: Slide, index = 0, total = 1): React.ReactElement {
  switch (slide.template) {
    case "Hook": return Hook({ slide, index, total });
    case "Stat": return Stat({ slide, index, total });
    case "FrameworkStep": return FrameworkStep({ slide, index, total });
    case "CTA": return CTA({ slide, index, total });
  }
}
