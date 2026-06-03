# Session Log — its-analysis-workflow

**Date:** 2026-05-28
**Library:** p5.js
**Bloom Level:** Apply (L3)
**Verb:** apply
**Status:** Implemented + layout-reviewed

## Learning Objective

Describe each step of an interrupted time-series analysis, identify the
four regression coefficients (β₀ intercept, β₁ pre-slope, β₂ level
change, β₃ slope change), and recognize threats to validity such as
autocorrelation.

## Implementation Notes

- **Vertical 6-step flowchart** on the left 40 %; click any node to
  switch the right-side visualization.
- **Simulated dataset:** 36 monthly points generated from
  `y = 50 + 0.6 t − 8·post − 1.0·(t − 18)·post + N(0, 2.5²)`. Pre rises
  gently; post drops in level and reverses slope.
- **Step-specific views:**
  1. raw scatter + intervention line
  2. + pre-trend OLS line
  3. + dashed counterfactual extrapolation
  4. + post-trend line, with arrow labels for β₀–β₃
  5. ACF stem plot of segmented-regression residuals with ±1.96/√n
     bands + Durbin–Watson statistic
  6. estimated-coefficient table + two-sentence plain-language
     interpretation
- **Coefficient estimates** derived from two separate OLS fits (pre and
  post), with β₂ computed as the gap between the post-line and the
  extended pre-line at the intervention boundary, and β₃ as the
  difference in slopes.

## Controls

Click-to-navigate step nodes; Reset-to-Step-1 button.

## CANVAS_HEIGHT

`// CANVAS_HEIGHT: 600` (drawing 540 + controls 60).

## Layout Review

| Check | Result |
|---|---|
| Title visible | PASS |
| All 6 step nodes visible with arrows | PASS |
| Plot region with axes + intervention line | PASS |
| Step 1 scatter (pre blue / post orange) renders | PASS |
| Reset button + instructions visible | PASS |

No patches needed.
