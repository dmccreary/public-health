# Session Log — forest-plot-interactive

**Date:** 2026-05-28
**Library:** p5.js
**Bloom Level:** Analyze (L4)
**Verb:** interpret
**Status:** Implemented + layout-reviewed

## Learning Objective

Read a forest plot, identify each study's contribution (effect, CI,
weight), recognize the pooled diamond, and interpret heterogeneity
statistics (I², τ², Cochran's Q).

## Implementation Notes

- **10 simulated studies** with log-OR + SE; weights computed in log
  space (inverse-variance). Squares scale with √weight (Cochrane
  convention). Whiskered horizontal CI lines clamped to the plot
  range so off-scale CIs still draw something visible.
- **Fixed vs. random effects:** toggle button swaps the diamond. Fixed
  weights = 1/SE²; random weights = 1/(SE² + τ²) using DerSimonian-
  Laird τ² estimator. With the simulated data, τ² ≈ 0.034, I² ≈ 61 %
  (moderate heterogeneity) — drives the "random-effects is preferred"
  note.
- **Heterogeneity:** Cochran's Q is the sum of weighted squared
  deviations; p-value uses Wilson-Hilferty χ² upper-tail approximation;
  I² traffic-light colors at <25 / 25–75 / >75.
- **Hover:** study row highlights yellow; tooltip shows name, n, OR,
  CI, weight, and a one-sentence design description. Hover the
  diamond → pooled OR, CI, Z, p, and significance statement.

## CANVAS_HEIGHT

`// CANVAS_HEIGHT: 660` (plot 540 + controls 120).

## Layout Review

| Check | Result |
|---|---|
| Title visible | PASS |
| 10 study rows + headers visible | PASS |
| Null line (OR = 1) drawn in red | PASS |
| Squares sized by weight | PASS |
| Pooled diamond visible | PASS |
| Heterogeneity panel + I² color visible | PASS |
| Model-toggle and Reset buttons visible | PASS |

No patches needed.
