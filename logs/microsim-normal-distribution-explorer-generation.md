# Session Log — normal-distribution-explorer

**Date:** 2026-05-28
**Library:** p5.js
**Bloom Level:** Understand (L2)
**Verb:** explain
**Status:** Implemented + layout-reviewed

## Learning Objective

Students explain how changing the mean and standard deviation of a normal
distribution affects shape, center, and probability intervals, and identify
the fraction of values within ±1σ, ±1.96σ, and ±3σ.

## Implementation Notes

- **PDF:** standard Gaussian formula. **CDF:** Abramowitz & Stegun 7.1.26
  approximation of erf().
- **Auto-ranging:** x-axis spans μ ± 4σ; y-axis scales so the curve peak
  uses ~75 % of plot height. Eliminates the "curve disappears" problem
  when sliders change σ dramatically.
- **Shading:** dropdown picks ±1σ / ±1.96σ / ±3σ / Custom. Custom range
  reveals two extra sliders; live CDF integral shown.
- **Hover tooltip:** x, z-score, density at cursor position.

## Controls

Mean slider (−50…50), SD slider (1…30, step 0.5), shading dropdown,
Reset, lower- and upper-bound sliders (visible only in Custom mode).

## CANVAS_HEIGHT

`// CANVAS_HEIGHT: 640` (plot 470 px + controls 170 px).

## Layout Review

| Check | Result |
|---|---|
| Title visible | PASS |
| Bell curve + axes visible | PASS |
| Shading rendered (95 % default) | PASS |
| Readout panel readable | PASS |
| Sliders, dropdown, button all visible | PASS |
| Mean dashed line + label visible | PASS |

No patches needed.
