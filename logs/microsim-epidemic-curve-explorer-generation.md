# Session Log — epidemic-curve-explorer

**Date:** 2026-05-28
**Library:** Chart.js (bar with custom annotation plugin)
**Bloom Level:** Identify (L1) / Interpret (L2)
**Status:** Implemented + layout-reviewed (1 patch)

## Learning Objective

Identify and interpret epidemic curve shapes to distinguish common-source
point exposure outbreaks from propagated person-to-person outbreaks.

## Implementation Notes

- **Three datasets** generated from a `gaussianPeak(days, center, width, total)`
  helper:
  - **Point source:** one Gaussian centered at day 7 (σ ≈ 1.6), total 60 cases
    — foodborne / Salmonella shape.
  - **Propagated:** three Gaussian peaks at days 5, 19, 33 (≈14-day serial
    interval), growing — measles in a school.
  - **Mixed:** point peak at day 7 + smaller secondary peaks at days 14, 21.
- **Mode colors** match spec: Point=#2196F3, Propagated=#FF9800, Mixed=#9C27B0.
  Color is the dataset's `backgroundColor`, so all bars in a mode share one
  color (with an override to black when a single bar is click-highlighted).
- **Annotations** drawn by a custom `afterDatasetsDraw` plugin — generation
  labels for Propagated, exposure-event label for Point Source, etc.
- **Click-to-highlight + infobox update** — clicking any bar paints it black
  and writes "Day X: N cases. <mode-specific narrative>" into the bottom
  infobox.

## Layout Review

**Cycle 1:** PASS for layout overall. One issue: the "Exposure event (Day 0)"
annotation, drawn at the chart-area left edge with `textAlign: 'center'`,
was clipped at the left.

**Fix applied:** the plugin now switches `textAlign` to `'left'` when the
marker x is within 40 px of the chart's left edge, and to `'right'` within
40 px of the right edge.

**Cycle 2:** PASS — "Exposure event (Day 0)" now fully readable inside the
plot area.

## CANVAS_HEIGHT

`// CANVAS_HEIGHT: 540` — chart 340 + title + radios + infobox + padding.

## Files

- `docs/sims/epidemic-curve-explorer/main.html`
- `docs/sims/epidemic-curve-explorer/epidemic-curve-explorer.js`
- `docs/sims/epidemic-curve-explorer/epidemic-curve-explorer.png`
