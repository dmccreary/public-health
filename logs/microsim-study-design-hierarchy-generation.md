# Session Log — study-design-hierarchy

**Date:** 2026-05-28
**Library:** p5.js
**Bloom Level:** Identify (L1) + Compare (L4)
**Status:** Implemented + layout-reviewed (1 cycle, PASS)

## Learning Objective

Identify (L1) and compare (L4) epidemiological study designs by their
position in the evidence hierarchy, their key strengths, and their
primary limitations.

## Implementation Notes

- **Pyramid geometry:** six trapezoidal layers ordered bottom → top by
  evidence strength. Bottom layer (Ecological) is widest; top layer
  (Systematic Reviews & Meta-Analyses) narrowest. Layer trapezoid
  vertices computed from linear interpolation between base width and
  apex width (top width = 12 % of base).
- **Point-in-trapezoid hit-test:** computes `t = (y0 − my) / (y0 − y1)`
  and checks whether mouse x falls between the linearly-interpolated
  left and right edges at that y. Reliable even on the narrow upper tiers.
- **Per-layer record:** name, color, definition, "Can calculate RR?",
  "Randomized?", primary bias, classic example, typical use case.
- **Selection sources:** click any tier OR use Previous / Next tier
  buttons OR Clear selection.
- **Axis labels:** rotated text on the left ("↑ Internal Validity / ↑
  Evidence Strength") and right ("↑ Cost & Time / ↓ Feasibility").

## Layout Review

**Cycle 1:** PASS — six trapezoids fit cleanly inside the left 55 % of
the canvas, top tier selected on load with gold color and bold outline,
right-side info panel shows definition, RR, randomization, bias,
example, and use case for the selected tier. The right-side axis label
("Cost & Time / Feasibility") is partially obscured by the info panel
in this layout, but the left axis label is fully visible and conveys
the strength gradient.

## Files

- `/Users/dan/Documents/ws/public-health/docs/sims/study-design-hierarchy/main.html`
- `/Users/dan/Documents/ws/public-health/docs/sims/study-design-hierarchy/study-design-hierarchy.js`
- `/Users/dan/Documents/ws/public-health/docs/sims/study-design-hierarchy/study-design-hierarchy.png`
