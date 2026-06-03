# Session Log — hypothesis-error-power

**Date:** 2026-05-28
**Library:** p5.js
**Bloom Level:** Understand (L2)
**Verb:** explain
**Status:** Implemented + layout-reviewed

## Learning Objective

Students explain the trade-off between Type I and Type II errors and how
α, effect size, and sample size affect statistical power.

## Implementation Notes

- **Two sampling distributions** in standardized units: H0 at 0,
  H1 at δ (effect-size in SD). SE = 1/√n shrinks both as n grows.
- **Critical value** from inverse normal CDF (Beasley-Springer-Moro) at
  the 1−α quantile, one-sided upper tail.
- **β** computed as normalCDF(xCrit, μ_H1, SE); **Power** = 1 − β.
- **Shaded regions:** α (blue, under H0 right of crit), β (light orange,
  under H1 left of crit), Power (dark orange, under H1 right of crit).
- **Hover tooltip** on the shaded strip below the curves gives the
  region name and a plain-language definition.

## Controls

α slider (0.01…0.20), δ slider (0.1…2.0 SD), n slider (10…500), Reset.

## CANVAS_HEIGHT

`// CANVAS_HEIGHT: 620` (plot 420 + controls 200).

## Layout Review

| Check | Result |
|---|---|
| Title visible | PASS |
| H0, H1 curves clearly labeled | PASS |
| Critical line + label visible | PASS |
| α, β, Power regions shaded and labeled | PASS |
| Live summary panel readable | PASS |
| All 3 sliders + Reset visible | PASS |

No patches needed.
