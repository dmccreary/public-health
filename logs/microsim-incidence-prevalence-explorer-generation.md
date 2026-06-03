# Session Log — incidence-prevalence-explorer

**Date:** 2026-05-28
**Library:** p5.js
**Bloom Level:** Apply (L3)
**Status:** Implemented + layout-reviewed

## Learning Objective

Apply the relationship P ≈ I × D by adjusting incidence rate and disease
duration sliders and observing how the prevalence pool fills and drains.

## Implementation Notes

- **Animated pool** of circles in a grid; each circle = an active case.
- **Time compression:** 1 real second = 0.25 simulated year, with a
  per-frame dt clamp at 0.05 s to prevent tab-switch ageing of the whole
  pool. (Initial draft compressed at 1 sec = 1 yr, which caused the
  seed-equilibrium population to drain to ~80 cases during the 5-sec
  screenshot capture; clamp + slower compression fixed it.)
- **Seed equilibrium:** at start, pre-populate `I × D × N` cases with
  ages uniformly drawn within each case's own duration so none die in
  the first frame.
- **Color by age fraction:** lerp teal (new) to brown (old) so the
  inflow / outflow dynamic is visible at a glance.
- **Formula panel** (checkbox-toggleable) shows
  `P ≈ I × D = <values> = <result> per 1,000`.

## Controls

Incidence slider (1…100 /1,000/yr), Duration slider (0.1…10 yr), Reset,
formula-visibility checkbox.

## CANVAS_HEIGHT

`// CANVAS_HEIGHT: 600` (pool 440 + controls 160).

## Layout Review

| Check | Result |
|---|---|
| Title visible | PASS |
| Pool visualizes equilibrium (observed ≈ expected) | PASS after dt-clamp fix |
| Inflow / outflow arrows visible | PASS |
| Readout panel readable | PASS |
| Formula panel shows live calculation | PASS |
| Sliders, button, checkbox all visible | PASS |

## Patches

1. Slowed time compression to 0.25 yr/sec and clamped dt to 0.05 s so
   the pool actually shows equilibrium at the moment the screenshot
   captures.
2. Fixed seed loop so initial cases never have `age > duration`.
