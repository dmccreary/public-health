# Session Log — kaplan-meier-explorer

**Date:** 2026-05-28
**Library:** Chart.js (stepped line + custom plugins for median lines)
**Bloom Level:** Analyze (L4)
**Verb:** compare
**Status:** Implemented + layout-reviewed (1 patch: median-CI ordering bug)

## Learning Objective

Students can interpret a Kaplan-Meier survival curve, identify median
survival for each group, recognize the effect of censoring, and
interpret the log-rank test result comparing two groups.

## Implementation Notes

- **Survival simulation:** event times sampled from an exponential
  distribution with rate `ln(2) / median`. Independent random censoring
  with probability set by the censoring-rate slider; remaining
  observations censored at the `MAX_T = 72`-month follow-up.
- **KM estimator** computed with Greenwood's variance for 95% CI bands:
  `Var[S(t)] = S(t)² · Σ dᵢ / (rᵢ (rᵢ − dᵢ))`.
- **Log-rank test** computed group-by-group across unique event times:
  `Σ (dA − eA)² / V`, distributed χ²(1). p-value computed from a 5-coefficient
  Abramowitz normal-CDF approximation, since `χ²(1) = Z²`.
- **CI bands** rendered as two extra hidden datasets per group with
  `fill: '+1'` and a translucent fill color, drawn behind the step lines
  using Chart.js `order`. The CI-band datasets are filtered out of the
  legend and tooltip so the visible UI only mentions Group A / Group B.
- **Censored ticks** drawn as `pointStyle: 'crossRot'` (× marks) at the
  survival probability at each censored observation's time.
- **Median dashed-line plugin** draws S = 0.5 horizontal reference plus
  colored vertical drop lines from each group's median to the x-axis.

## Layout Review

**Cycle 1:** Layout PASS — everything visible, axes labeled, controls
fit. **Bug found:** the median-CI display showed `[40.0–19.2]` for one
group — bounds were reversed.

**Diagnosis:** In `medianCIFromKM`, I assigned the *late* time (when
upper CI crosses 0.5) to `lo` and the *early* time (when lower CI
crosses 0.5) to `hi`. The variable names were inverted relative to
their meaning.

Footgun-shape: variable name doesn't match value. Silent — the printed
output was syntactically valid, just numerically reversed; no warning,
no error. Easy to ship without noticing.

**Fix:** swapped the two conditions so `lo` ← `km.lo[k] ≤ 0.5`
(early — lower CI bound) and `hi` ← `km.hi[k] ≤ 0.5` (late — upper CI
bound).

**Cycle 2:** PASS — display now reads `[23.9–43.7]` (lo–hi).

## CANVAS_HEIGHT

`// CANVAS_HEIGHT: 590` — chart 360 + title + control row + output row.

## Files

- `docs/sims/kaplan-meier-explorer/main.html`
- `docs/sims/kaplan-meier-explorer/kaplan-meier-explorer.js`
- `docs/sims/kaplan-meier-explorer/kaplan-meier-explorer.png`
