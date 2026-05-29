---
title: Kaplan-Meier Survival Curve Explorer
description: Students can interpret a Kaplan-Meier survival curve, identify median survival for each group, recognize the effect of censoring, and interpret the log-rank test result comparing two groups.
status: scaffold
library: Chart.js
bloom_level: Analyze (L4)
---

# Kaplan-Meier Survival Curve Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 5: "Biostatistics: Regression and Advanced Methods"](../../chapters/05-biostatistics-regression/index.md).

```text
Type: microsim
**sim-id:** kaplan-meier-explorer<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Bloom Level: Analyze (L4)
Bloom Verb: compare
Learning Objective: Students can interpret a Kaplan-Meier survival curve, identify median survival for each group, recognize the effect of censoring, and interpret the log-rank test result comparing two groups.

Purpose: Provide an interactive survival curve visualization that makes key interpretation concepts (step function, censoring tick marks, group comparison, log-rank test) explicit and manipulable.

Layout: Main canvas area (top 70%): Chart.js line chart showing two KM step-function curves — Group A (teal) and Group B (orange), with 95% confidence band shading. Tick marks indicate censored observations. Dashed horizontal line at survival = 0.5 with vertical drop lines to the x-axis marking median survival for each group. Bottom 30%: controls and output panel.

Controls:
- Group A median survival slider: range 6 to 60 months, step 1, default 24 months. Changes the simulated event distribution for Group A.
- Group B median survival slider: range 6 to 60 months, step 1, default 36 months.
- Censoring rate slider: range 0% to 50%, step 5%, default 20%. Adds censored observations (tick marks) to both curves.
- Sample size per group: 20, 50, 100, 200 (dropdown). Larger n narrows the confidence bands.
- "Draw New Simulation" button: redraws curves with fresh random samples using current parameters.

Output panel (updates live):
- Group A median survival (months) with 95% CI
- Group B median survival (months) with 95% CI
- Log-rank test statistic and p-value
- Plain-language interpretation: "Group A has significantly longer survival than Group B (p = 0.02)." or "No significant difference in survival between groups (p = 0.31)."

Interactive behavior:
- Hovering a point on either curve: shows tooltip with time, estimated survival probability, number at risk, and number of events to that point.
- Checkbox: "Show confidence bands" — toggles shaded 95% CI around each curve.
- Checkbox: "Show number at risk table" — shows a small table below the x-axis with n at risk at 0, 6, 12, 24, 36 months for each group.

Visual style: Clean Chart.js style; teal = Group A, orange = Group B; confidence bands semi-transparent; step-function curves; tick marks for censored observations.

Canvas: Responsive full container width, 500px height.

Instructional Rationale: Adjusting median survival and censoring rate in real time builds direct intuition for how censoring affects curve shape and how the log-rank test responds to the magnitude of group differences and sample size.
```

## Related Resources

- [Chapter 5: "Biostatistics: Regression and Advanced Methods"](../../chapters/05-biostatistics-regression/index.md)
