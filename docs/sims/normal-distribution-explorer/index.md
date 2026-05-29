---
title: Normal Distribution Explorer
description: Students can explain how changing the mean and standard deviation of a normal distribution affects its shape, center, and probability intervals, and identify what fraction of values fall within 1, 2, and 3 standard deviations.
status: scaffold
library: p5.js
bloom_level: Understand (L2)
---

# Normal Distribution Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 4: "Biostatistics: Statistical Foundations"](../../chapters/04-biostatistics-foundations/index.md).

```text
Type: microsim
**sim-id:** normal-distribution-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: explain
Learning Objective: Students can explain how changing the mean and standard deviation of a normal distribution affects its shape, center, and probability intervals, and identify what fraction of values fall within 1, 2, and 3 standard deviations.

Purpose: Build intuition about normal distribution shape and parameterization before using the normal as the foundation for hypothesis testing and confidence intervals.

Layout: Full-width canvas. Left 65%: smooth bell curve drawn on axes labeled with values. Right 35%: numeric readout panel showing current μ, σ, and the percent of area under the curve within ±1σ, ±1.96σ, ±3σ. Bottom: slider controls.

Controls:
- Mean slider: range −50 to 50, step 1, default 0. Slides the entire curve left/right.
- SD slider: range 1 to 30, step 0.5, default 10. Widens/narrows the curve.
- Shading selector (dropdown): "None", "±1σ (68%)", "±1.96σ (95%)", "±3σ (99.7%)", "Custom range". When a shading option is selected, the area under the curve in that range fills with a semi-transparent teal color, and the percentage is shown in a bold label on the canvas.
- Reset button: returns to μ=0, σ=10.

Interactive features:
- Hovering the curve at any x position shows a tooltip: x value, z-score = (x−μ)/σ, and the probability density at that point.
- When "Custom range" is selected in the shading dropdown, two additional sliders appear: lower bound and upper bound. The shaded area and exact probability are computed and displayed.

Axis behavior:
- x-axis always spans μ ± 4σ to keep the curve visible regardless of slider settings.
- y-axis scales automatically so the peak of the curve uses about 75% of the canvas height.

Visual style: White background, teal curve line (3px), teal fill for shaded areas, clean axis labels.

Canvas: Responsive full container width, height 500px.

Instructional Rationale: Direct manipulation of μ and σ with live area shading teaches the empirical rule more effectively than static figures, and builds the intuition needed to understand confidence intervals and p-values.
```

## Related Resources

- [Chapter 4: "Biostatistics: Statistical Foundations"](../../chapters/04-biostatistics-foundations/index.md)
