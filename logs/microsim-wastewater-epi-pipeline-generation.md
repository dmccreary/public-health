# Session Log — wastewater-epi-pipeline

**Date:** 2026-05-28
**Library:** p5.js
**Bloom Level:** Understand / Apply
**Status:** Implemented + layout-reviewed (1 patch: title clipping under badge)

## Learning Objective

Trace the seven-stage wastewater-based epidemiology (WBE) pipeline from
human shedding through public-health action, including methods, quality
controls, limitations, and notable COVID-19 examples at each step.

## Implementation Notes

- **Seven horizontal stage boxes:** Community Shedding (gray) → Sewage
  Collection (blue) → Lab Processing (orange) → Normalization (orange)
  → Trend Modeling (green) → Lead Indicator Comparison (green) →
  Public Health Action (red).
- **Animated flow arrows:** dashed lines drawn with `setLineDash` and
  `lineDashOffset = −flowOffset` to create a moving-dash effect that
  conveys "flow." Sample-flow arrows (stages 1–4) are blue; data-flow
  arrows (stages 4–7) are green.
- **Iconography:** each box has a tiny custom icon — neighborhood
  rooftops, manhole oval, sample tube, formula text, sparkline,
  lead-vs-clinical dual sparkline, mini dashboard rectangle.
- **Each box shows:** number badge, title, icon, short text. Click any
  box to populate the detail panel below.
- **Detail panel:** four sections — Methods, QC / Quality control,
  Limits & uncertainty, COVID-19 example.
- **Pathogen panel toggle:** a checkbox in the control strip swaps the
  detail panel for a list of 6 other pathogens monitored via WBE
  (influenza, polio, mpox, RSV, opioids, AMR genes).

## Layout Review

**Cycle 1:** several stage titles had their first character clipped by
the top-left number badge.

**Patch:** shifted title center by +8 px and narrowed the wrap width
to `boxW − 28` so the title text no longer overlaps the badge.

**Cycle 2:** PASS — all seven titles visible, icons readable, dashed
flow arrows animating between boxes, detail panel populated with the
four-section breakdown.

## Files

- `/Users/dan/Documents/ws/public-health/docs/sims/wastewater-epi-pipeline/main.html`
- `/Users/dan/Documents/ws/public-health/docs/sims/wastewater-epi-pipeline/wastewater-epi-pipeline.js`
- `/Users/dan/Documents/ws/public-health/docs/sims/wastewater-epi-pipeline/wastewater-epi-pipeline.png`
