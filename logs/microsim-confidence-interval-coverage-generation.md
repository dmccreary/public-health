# Session Log — confidence-interval-coverage

**Date:** 2026-05-28
**Library:** Chart.js (horizontal floating-bar chart)
**Bloom Level:** Understand (L2)
**Verb:** explain
**Status:** Implemented + layout-reviewed

## Learning Objective

Students explain what "95% confidence" means by observing that approximately
5% of 95% CIs from repeated random samples fail to contain the true population
mean — i.e., the 95% is a property of the *procedure*, not of a single
interval.

## Instructional Design Decision

- **Pattern:** Step-through animated reveal (one CI per 30 ms) on top of a
  static horizontal bar chart.
- **Why animation here is appropriate for an Understand-level objective:**
  the animation is not decorative — sequential bar reveal makes the
  frequentist "repeat the procedure many times" interpretation literally
  visible. Each red bar punctuates a procedure failure.
- Bars are color-coded *before* reveal so the learner can predict the
  coverage rate from the dashed reference line.

## Implementation Notes

- **Sampling:** Box-Muller transform for `randNormal(μ, σ)`; population
  `N(100, 15)`.
- **CI math:** half-width = z · σ / √n with z ∈ {1.6449, 1.9600, 2.5758}
  for the three confidence levels.
- **Drawing:** Chart.js `bar` with `indexAxis: 'y'`. Each row's `data` is
  `[lo, hi]` (Chart.js's floating-bar form) — gives true CI segments
  instead of bars-from-zero.
- **True mean line:** custom plugin (`afterDatasetsDraw` per Chart.js
  guide §Custom Plugin Annotations) so the dashed vertical line and
  "μ = 100" label render under tooltips, not over them.
- **Color:** teal `rgba(38,166,154,0.85)` for contains, red
  `rgba(229,57,53,0.9)` for misses. Distinguishable in grayscale.
- **Coverage counter:** updates immediately when chart is built, so the
  number is correct before the animation completes.

## Controls

- "Draw New Samples" button → fresh `randNormal` draws.
- Confidence-level dropdown (90 / 95 / 99 %) → updates `z`, redraws.
- Sample-size dropdown (n = 10, 20, 30, 50, 100) → changes CI width via
  the `σ/√n` standard error.

## CANVAS_HEIGHT

`// CANVAS_HEIGHT: 600` (chart area 480 px + title 24 px + controls
~56 px + padding ~40 px).

## Layout Review

Screenshot capture (`bk-capture-screenshot … 4 600`) and Claude Vision
checklist walk:

| Check | Result |
|---|---|
| Title visible | PASS |
| Bars not clipped | PASS |
| True-mean dashed line + label visible | PASS |
| Axis labels visible ("Sample mean (95% CI)", "Sample #") | PASS |
| All controls fully visible at viewport width 800 px | PASS |
| Coverage counter readable | PASS |
| Color contrast (teal vs. red on white) sufficient | PASS |

No patches needed.

## Files Written

- `docs/sims/confidence-interval-coverage/main.html` (replaced scaffold;
  added schema meta, `<main>` tag, Chart.js CDN, controls)
- `docs/sims/confidence-interval-coverage/confidence-interval-coverage.js`
  (new — implementation)
- `docs/sims/confidence-interval-coverage/confidence-interval-coverage.png`
  (new — screenshot)
