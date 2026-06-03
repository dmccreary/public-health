# Session Log — health-disparities-bar-chart

**Date:** 2026-05-28
**Library:** Chart.js (two grouped bar charts, side-by-side panels)
**Status:** Implemented + layout-reviewed

## Topic

Side-by-side grouped bar charts comparing Life Expectancy at Birth and
Infant Mortality Rate by race/ethnicity (or income quartile via the View
dropdown), 2000–2021 US data.

## Data

Approximate published NCHS / CDC WONDER values, two views each:

**Life Expectancy (years), by race** — White / Black / Hispanic / Asian
for 2010, 2015, 2019, 2021. Shows the visible 2021 COVID dip for all
groups, with widest losses for Hispanic and Black populations.

**Infant Mortality (per 1,000), by race** — White and Black for
2000, 2010, 2015, 2021. The persistent ~2:1 Black:White ratio is
visible at every time point.

Income quartile equivalents (Q1 lowest → Q4 highest) for both metrics.

## Implementation Notes

- **Palette:** Okabe–Ito colorblind-safe (#0072B2 blue, #E69F00 orange,
  #009E73 green, #CC79A7 pink, #56B4E9 sky).
- **Two `<canvas>` elements** side-by-side via flexbox; each is its own
  Chart.js bar chart with `responsive: true, maintainAspectRatio: false`
  so they each fill their flex column.
- **Y-axis on the Life Expectancy chart starts at 65** (`min: 65`) to
  make differences across groups and the 2021 COVID dip visually clear
  — a chart that starts at 0 would compress all bars into the same
  visual band. The Infant Mortality chart still starts at 0 because
  the bottom of the scale is the public-health goal.
- **Legends** placed at the `position: 'bottom'` with small box and
  font so they don't crowd the chart area.

## Layout Review

| Check | Result |
|---|---|
| Title visible, both panel titles visible | PASS |
| Two charts side-by-side fit width | PASS |
| Y-axis labels visible on both | PASS |
| Year labels not clipped | PASS |
| Legends visible below each chart | PASS |
| 2021 COVID dip visible in Life Expectancy | PASS (intentional truncated Y) |
| Source citation visible | PASS |

No patches needed.

## CANVAS_HEIGHT

`// CANVAS_HEIGHT: 460`

## Files

- `docs/sims/health-disparities-bar-chart/main.html`
- `docs/sims/health-disparities-bar-chart/health-disparities-bar-chart.js`
- `docs/sims/health-disparities-bar-chart/health-disparities-bar-chart.png`
