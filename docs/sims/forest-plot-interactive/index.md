---
title: Interactive Forest Plot
description: Students can read a forest plot, identify each study's contribution (effect size, CI, weight), recognize the pooled estimate diamond, and interpret heterogeneity statistics.
status: scaffold
library: p5.js
bloom_level: Analyze (L4)
---

# Interactive Forest Plot



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 5: "Biostatistics: Regression and Advanced Methods"](../../chapters/05-biostatistics-regression/index.md).

```text
Type: microsim
**sim-id:** forest-plot-interactive<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Analyze (L4)
Bloom Verb: interpret
Learning Objective: Students can read a forest plot, identify each study's contribution (effect size, CI, weight), recognize the pooled estimate diamond, and interpret heterogeneity statistics.

Purpose: Teach forest plot literacy — the ability to extract information from the most common summary graphic in systematic review literature — through direct interaction with each component.

Layout: Classic forest plot layout. Left column (30%): study names and year (8–12 simulated studies). Center area (50%): horizontal lines with squares. Right column (20%): numerical summary (OR, 95% CI, weight %). Bottom row: diamond for pooled estimate, heterogeneity statistics (I², τ², Cochran's Q, p for heterogeneity).

Simulated studies: 10 hypothetical studies with plausible ORs ranging from ~0.5 to ~2.5, varying sample sizes (n = 50 to 2000), and corresponding CIs. Weights vary with precision. True pooled OR approximately 1.25.

Interactive features:
- Hovering any study row: that row highlights (background turns light yellow), and an info panel on the right side of the canvas shows: study name, year, n, OR, 95% CI, weight, and a one-sentence description of the simulated study design.
- Hovering the diamond: info panel shows pooled OR, 95% CI, Z-statistic, and p-value in plain language: "The pooled odds ratio of X.XX (95% CI Y–Z) suggests a moderate positive association. The result is statistically significant (p = 0.01)."
- Toggle button "Fixed Effects / Random Effects": switches between fixed-effects and random-effects pooling. The diamond position and width change; weights update. A note appears: "Random-effects model used because I² > 50%."
- Heterogeneity panel: shows I² (the percentage of total variation attributable to between-study differences, rather than chance), τ², and Cochran's Q p-value, with traffic-light color coding: I² < 25% = green (low heterogeneity), 25–75% = yellow (moderate), > 75% = red (high).

Visual style: Classic forest plot aesthetic. Black squares (size proportional to weight), horizontal CI lines, vertical null line (OR = 1.0 in red), diamond in teal. Column headers at top: Study, OR (95% CI), Weight.

Canvas: Responsive full container width, 520px height.

Instructional Rationale: Forest plots are the single most important graphic in evidence synthesis, and students cannot learn to read them from a static textbook image. Hovering each study row to see its details connects the visual element to its meaning, while the fixed/random toggle demonstrates why heterogeneity changes the pooled estimate.
```

## Related Resources

- [Chapter 5: "Biostatistics: Regression and Advanced Methods"](../../chapters/05-biostatistics-regression/index.md)
