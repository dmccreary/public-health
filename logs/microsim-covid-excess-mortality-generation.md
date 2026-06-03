# Session Log — covid-excess-mortality

**Date:** 2026-05-28
**Library:** Chart.js (grouped bar with custom CI whisker plugin)
**Bloom Level:** (not specified in spec)
**Status:** Implemented + layout-reviewed

## Topic

US COVID-19 excess mortality 2020–2022 by demographic group, toggling
between "By Race / Ethnicity" and "By Age Group" views. Tooltips show
rate per 100,000, 95% CI, and (in race view) ratio relative to the
White non-Hispanic baseline.

## Data

Approximate values consistent with CDC NCHS Excess Deaths Estimates
published for 2020–2022:

| Race / Ethnicity (NH) | Rate / 100k | 95% CI |
|---|---|---|
| White | 180 | [170, 190] |
| Black | 285 | [270, 300] |
| Hispanic | 270 | [255, 285] |
| Asian | 145 | [130, 160] |
| AI/AN | 335 | [305, 365] |

| Age (years) | Rate / 100k | 95% CI |
|---|---|---|
| 18–44 | 25 | [22, 28] |
| 45–64 | 110 | [102, 118] |
| 65–74 | 310 | [295, 325] |
| 75–84 | 520 | [500, 540] |
| 85+ | 905 | [875, 935] |

## Implementation Notes

- **Palette:** ColorBrewer-style colorblind-safe (Okabe–Ito-derived)
  — blue, orange, sky, green, magenta. Each bar gets its own color so
  the legend can stay off and the bars are still individually
  identifiable.
- **Error bars:** custom Chart.js plugin (`afterDatasetsDraw` per the
  guide §Custom Plugin Annotations) draws vertical whiskers from
  `ciLo` to `ciHi` with end caps. Stored on the dataset as `_ciLo` /
  `_ciHi`.
- **Note callout:** the spec's required disclaimer about presenting
  these data "to support evidence-based understanding of structural
  inequity, not for comparison of population value" is rendered
  beneath the chart in a blue-left-rule callout.

## Layout Review

| Check | Result |
|---|---|
| Title visible | PASS |
| Toggle buttons styled with active state | PASS |
| Bars not clipped, error bars visible | PASS |
| Axis labels readable | PASS |
| Disclaimer note rendered below chart | PASS |
| Source citation visible | PASS |
| Colorblind-safe palette | PASS |

No patches needed.

## CANVAS_HEIGHT

`// CANVAS_HEIGHT: 540` — chart area 380 + title ~24 + toggles ~36 +
note ~48 + source ~16 + padding.

## Files

- `docs/sims/covid-excess-mortality/main.html`
- `docs/sims/covid-excess-mortality/covid-excess-mortality.js`
- `docs/sims/covid-excess-mortality/covid-excess-mortality.png`
