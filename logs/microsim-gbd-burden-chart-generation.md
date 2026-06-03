# MicroSim Generation Log: gbd-burden-chart

**Date:** 2026-05-28
**Sim ID:** gbd-burden-chart
**Source chapter:** docs/chapters/09-global-health/index.md
**Sim directory:** docs/sims/gbd-burden-chart/

## Spec Summary

- **Title:** Global Burden of Disease by Cause and Income Group
- **Library:** Chart.js
- **Bloom Level:** Analyze (compare)
- **Learning Objective:** Analyze how the composition of disease burden shifts across the epidemiological transition by comparing DALY shares for communicable, non-communicable, and injury causes across income groups and WHO regions.

## Routing Decision

Spec describes a grouped/stacked bar chart of DALY burden by category and group, with metric/grouping toggles, tooltips, color coding, and reference lines. Triggers (`chart`, `bar`, `data`, `statistics`) routed cleanly to **chartjs-guide.md**. No ambiguity — Chart.js is the right fit and was named explicitly in the spec.

## Instructional Design Check

- **Bloom Level:** Analyze (L4)
- **Bloom Verb:** compare
- **Recommended Pattern:** Comparison tool with parameter toggles + concrete data visibility on hover
- **Specification Alignment:** aligned
- **Rationale:** Stacked bar chart enables direct visual comparison of cause-composition across groups. The metric toggle (absolute vs age-standardized) supports analytical reasoning about why high-income countries have higher absolute NCD DALYs but rates that converge once age-standardized. Hover-driven interpretation strings turn each cell into a micro-lesson.

## Implementation Notes

- Replaced stub `main.html` with a Chart.js host page including the `chartjs-plugin-annotation` plugin for the global-average reference line.
- `gbd-burden-chart.js` includes `// CANVAS_HEIGHT: 505` on line 2.
- Data structured as `DATA[grouping][metric][group] = [cmnn, ncd, injuries]` for clean indexing.
- Colorblind-safe palette aligned with spec: orange (`#E69F00`), blue (`#0072B2`), green (`#009E73`).
- Interpretation panel below chart updates on hover via Chart.js `onHover` callback, pulling from `INTERPRETATIONS[grouping][cause][group]` lookup table (24 unique sentences).
- Used Chart.js `indexAxis: 'y'` for horizontal bars and `stacked: true` so segments compose each group's total bar — this preserves the "share of burden" comparison the Analyze objective requires.
- Annotation plugin registered defensively (no-op if CDN load fails).

## Files Produced

- `main.html` — Chart.js + annotation plugin, schema meta tag, `<main>` (no id), controls bar, canvas, interpretation panel
- `gbd-burden-chart.js` — ~200 lines, full implementation
- `index.md` — frontmatter, iframe (height 507 = 505+2), fullscreen button, learning objective, spec block
- `metadata.json` — Dublin Core + educational metadata, `status: "implemented"`
- `gbd-burden-chart.png` — screenshot, 45 KB

## Layout Review

**Verdict:** PASS on first cycle. All checklist items passed:

- Title, controls, axis labels, legend, reference line, interpretation panel, and source attribution all fully visible at the declared height.
- No overlapping elements; tick labels render without clipping.
- Colors match spec (orange/blue/green).
- "Global avg" annotation label renders with red badge in expected position at x=250 (millions).
- Reading order is top-down: title → controls → chart → interpretation → source.

No patches required.

## CANVAS_HEIGHT

- Declared: 505
- Iframe height in index.md: 507 (505 + 2 border)
- Validated: screenshot at 800x505 shows all content without clipping
