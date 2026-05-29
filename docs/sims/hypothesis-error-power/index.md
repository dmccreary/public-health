---
title: Type I/II Error and Power Visualizer
description: Students can explain the trade-off between Type I and Type II errors and describe how changing alpha, effect size, and sample size affect statistical power.
status: scaffold
library: p5.js
bloom_level: Understand (L2)
---

# Type I/II Error and Power Visualizer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 4: "Biostatistics: Statistical Foundations"](../../chapters/04-biostatistics-foundations/index.md).

```text
Type: microsim
**sim-id:** hypothesis-error-power<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: explain
Learning Objective: Students can explain the trade-off between Type I and Type II errors and describe how changing alpha, effect size, and sample size affect statistical power.

Purpose: Visualize the two overlapping sampling distributions (null and alternative) and the areas corresponding to α (Type I), β (Type II), and 1−β (power), making the conceptual relationships concrete and manipulable.

Layout: Canvas divided into:
- Top 65%: main visualization showing two overlapping normal curves — the null distribution (blue) centered at 0 and the alternative distribution (orange) centered at the effect size δ. The critical value is shown as a vertical dashed line. Four colored shaded areas: blue area to the right of critical value under null curve = α (Type I error); orange area to the left of critical value under alternative curve = β (Type II error); orange area to the right of critical value = power (1−β). Labels for each shaded region with percentages.
- Bottom 35%: three sliders and a numeric summary panel.

Controls:
- Alpha (α) slider: range 0.01 to 0.20, step 0.01, default 0.05. Moving it shifts the critical value.
- Effect size (δ in SD units) slider: range 0.1 to 2.0, step 0.05, default 0.5. Moving it shifts the alternative distribution curve.
- Sample size slider: range 10 to 500, step 10, default 80. Changing n changes the SE of both distributions (narrowing them), which changes overlap.

Numeric summary panel (updates live): shows α, β, Power (1−β), and effect size in SD units.

Visual style: Null distribution in light blue, alternative distribution in light orange, shaded regions semi-transparent, critical value as dashed black vertical line, labels in bold matching their region color.

Interactive behavior:
- All three sliders update the visualization in real time.
- Hover over any shaded area: tooltip shows its name, probability value, and one-sentence plain-language description (e.g., "Type I Error: The probability of detecting an effect that does not exist. Set by choosing alpha before the study.")

Reset button returns all sliders to default.

Canvas: Responsive full container width, 520px height.

Instructional Rationale: The abstract relationship between α, β, and power becomes intuitive when students can drag a slider and watch the regions change size. This is the central insight students need to evaluate study design and interpret published p-values.
```

## Related Resources

- [Chapter 4: "Biostatistics: Statistical Foundations"](../../chapters/04-biostatistics-foundations/index.md)
