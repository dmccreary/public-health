---
title: Confidence Interval Coverage from Repeated Sampling
description: Students can explain what "95% confidence" means by observing that approximately 5% of 95% CIs from repeated random samples fail to contain the true population mean.
status: scaffold
library: Chart.js
bloom_level: Understand (L2)
---

# Confidence Interval Coverage from Repeated Sampling



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 4: "Biostatistics: Statistical Foundations"](../../chapters/04-biostatistics-foundations/index.md).

```text
Type: microsim
**sim-id:** confidence-interval-coverage<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: explain
Learning Objective: Students can explain what "95% confidence" means by observing that approximately 5% of 95% CIs from repeated random samples fail to contain the true population mean.

Purpose: Correct the common misconception that "a 95% CI has a 95% chance of containing the true value." The CI is either correct or it isn't; the 95% is a property of the *procedure* across many samples, not a probability statement about any single interval.

Layout: Chart.js horizontal bar chart. The y-axis lists sample numbers 1 through 50 (one bar row per sample). Each bar represents a CI as a horizontal line segment with endpoint markers; bars that contain the true population mean are teal; bars that miss it are red. A vertical dashed line marks the true population mean. Controls below the chart.

Controls:
- "Draw New Samples" button: redraws 50 CIs from fresh random samples.
- Confidence level dropdown: "90%", "95%", "99%". Changing it recalculates critical value and redraws all CIs; the coverage count updates.
- Sample size slider: n = 10, 20, 30, 50, 100. Changes the width of the CIs (larger n → narrower CIs).
- Coverage counter display: "X of 50 CIs contain the true mean (Y%)".

True population mean: fixed at 100 (displayed as a vertical dashed line). Population σ = 15. Samples drawn from N(100, 15).

Interactive features:
- Hovering a bar: shows tooltip with sample number, sample mean, lower and upper CI bounds, and whether it contains the true mean.
- Animation: CIs are drawn sequentially (one per 30ms) when "Draw New Samples" is clicked, making the sequential-sampling interpretation visible.

Visual style: Clean Chart.js horizontal bar chart style; teal = contains true mean; red = misses true mean; bold vertical dashed line for true mean.

Instructional Rationale: Animated sequential sampling makes the frequentist definition of confidence intervals visceral in a way that no static explanation can match. Students see ~5% of bars turn red in real time.
```

## Related Resources

- [Chapter 4: "Biostatistics: Statistical Foundations"](../../chapters/04-biostatistics-foundations/index.md)
