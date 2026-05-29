---
title: Determinants of Health — Concentric Layers
description: Students can explain how determinants of health operate at multiple levels and describe how outer-ring factors constrain and shape inner-ring choices and outcomes.
status: scaffold
library: p5.js
bloom_level: Understand (L2)
---

# Determinants of Health — Concentric Layers



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 1: Public Health Foundations](../../chapters/01-foundations/index.md).

```text
Type: infographic
**sim-id:** determinants-of-health-layers<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: explain
Learning Objective: Students can explain how determinants of health operate at multiple levels and describe how outer-ring factors constrain and shape inner-ring choices and outcomes.

Purpose: Visualize the Dahlgren-Whitehead concentric-rings model of health determinants, showing that individual behaviors are embedded in and shaped by progressively broader social and structural forces.

Layout: Centered circular diagram with five concentric rings. Left side (60% of canvas): rings diagram. Right side (40%): info panel that updates on click/hover.

Rings (innermost to outermost):
1. Core (white or pale gray): "Biological and Genetic Factors" — age, sex, hereditary factors
2. Ring 1 (pale blue): "Individual Lifestyle Behaviors" — diet, physical activity, tobacco use, alcohol
3. Ring 2 (sky blue): "Social and Community Networks" — social support, community norms, peer influence
4. Ring 3 (teal): "Living and Working Conditions" — employment, education, housing, food access, healthcare services
5. Ring 4 (dark teal / navy): "Macro-Level Socioeconomic, Cultural, and Environmental Conditions" — economic policies, governance, cultural norms, environment

Interactive elements:
- Hovering or clicking any ring highlights that ring (brighter fill, thicker border) and populates the right-side info panel with: ring name, 2-3 example determinants, a one-sentence explanation of why this level matters, and a brief COVID-19 example for that level
- A "Walk Through an Example" button at the bottom steps through how Type 2 diabetes risk is shaped by each ring moving outward from the core, with each ring lighting up in sequence and the info panel updating

Visual style:
- Smooth color gradient from outer rings (darker teal) to inner rings (lighter blue/white)
- Ring labels as arc text within each ring, white font
- Selected ring: bold gold outline, slight brightness increase
- Right-side info panel: white background, bold heading, body text

Canvas: Responsive — full container width, minimum 400px height.

Instructional Rationale: An interactive concentric-rings diagram directly mirrors the mental model students need to build. Clicking through each ring and seeing concrete examples teaches the key lesson that outer-ring factors constrain inner-ring choices — a lesson that is difficult to convey with prose alone.
```

## Related Resources

- [Chapter 1: Public Health Foundations](../../chapters/01-foundations/index.md)
