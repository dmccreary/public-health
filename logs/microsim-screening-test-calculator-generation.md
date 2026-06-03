# Session Log — screening-test-calculator

**Date:** 2026-05-28
**Library:** p5.js
**Bloom Level:** Apply (L3)
**Status:** Implemented + layout-reviewed

## Learning Objective

Apply sensitivity / specificity / PPV / NPV calculations by adjusting
sliders and observing how each metric responds — especially how PPV
collapses in low-prevalence populations.

## Implementation Notes

- **2x2 treemap:** column widths proportional to test-positive vs.
  test-negative totals; row heights proportional to diseased vs.
  non-diseased totals. The result is a rectangular layout where each
  cell's *area* equals its share of the population — so TP at 5 %
  prevalence is correctly visualized as a tiny green sliver.
- **Color code** uses standard TP green / FP orange / FN red / TN blue.
- **Metric panel** shows each formula with the actual TP / TN / FP / FN
  values substituted, then a plain-language interpretation:
  *"1 in X positive tests is a true case."* Low-prevalence pitfall
  warning appears when prevalence < 2 %.

## Controls

Sensitivity (0.50…0.99), Specificity (0.50…0.99), Prevalence
(0.1 %…50 %), Population N (1k…100k), Reset.

## CANVAS_HEIGHT

`// CANVAS_HEIGHT: 620` (plot 440 + controls 180).

## Layout Review

| Check | Result |
|---|---|
| Title visible | PASS |
| 2x2 table renders all four colored cells | PASS |
| Row / column headers visible | PASS after patch |
| Metric formulas + values readable | PASS |
| Interpretation line + pitfall warning visible | PASS |
| All 4 sliders + Reset visible | PASS |

## Patches

1. Initial draft clipped the "Disease +" / "Disease −" labels at
   x = 30 (too tight against canvas left edge). Moved table to x = 80
   and shrank table width to leave room for row headers.
