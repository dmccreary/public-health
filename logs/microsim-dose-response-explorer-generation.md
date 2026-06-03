# MicroSim Generation Log: dose-response-explorer

**Date:** 2026-05-28
**Sim ID:** `dose-response-explorer`
**Title:** Dose-Response Curve Explorer
**Library:** p5.js
**Bloom Level:** Analyze (L4)
**Chapter:** 06-environmental-health

## Learning Objective

Students can analyze how the slope (Hill coefficient) and EC50 position of a
dose-response curve determine the locations of the NOAEL, LOAEL, EC50/LD50, and
derived Reference Dose - and explain why the linear-no-threshold (LNT) model
used for carcinogens has no analogous "safe" landmark.

## Design Decisions

- **Math model.** Threshold model uses the standard Hill equation:
  `effect = D^n / (D^n + EC50^n)`, plotted against `log10(dose)` so the curve
  appears as the familiar sigmoid. Slope slider is the Hill coefficient `n`.
- **Landmark derivations.** NOAEL anchored at the 5% effect point and LOAEL at
  the 10% point - tighter than textbook caricatures but consistent with how
  these are read off the curve. Reference Dose = NOAEL / 100 (a standard
  10x10 uncertainty factor product: animal->human + human variability).
- **LNT mode** intentionally hides NOAEL, LOAEL, and RfD markers - the
  pedagogical point is that those landmarks do not exist under linear
  no-threshold. The plot is washed in faint red to reinforce "no safe dose."
- **Zone shading** uses traffic-light coloring (green/yellow/red) only in
  threshold mode. This makes the regulatory tradeoff visible at a glance.
- **Hover tooltips** carry the actual regulatory definition - the marker is
  not just decorative, it teaches a vocabulary term on demand.

## Layout

- Canvas: 800x600 (responsive width)
  - `drawHeight = 460` (plot + legend area)
  - `controlHeight = 140` (sliders, dropdown, reset, caption)
- `CANVAS_HEIGHT: 600`
- iframe height in index.md: `602px` (= CANVAS_HEIGHT + 2)
- Right-side legend panel placed at `plotX1 + 10` with width 180px

## Layout Review

**Cycle 1 (initial):** All major elements rendered correctly. Caption text on
the right of the control row partially clipped at the right edge of the
canvas and the first two lines partially hidden behind the dropdown widget.

**Fix applied:** Moved caption from the right column to below the dropdown
row (capX=360, capY=drawHeight+76) and reflowed into 3 lines with smaller
text. Both clipping and overlap resolved.

**Cycle 2 (verification):** Clean layout. All controls visible, no overlaps.
NOAEL/LOAEL triangles, EC50 red circle, RfD dashed blue line, three zone
shadings all render correctly. Legend complete on the right. Axis labels,
title, "% Population Affected" rotated label all readable. Verdict: PASS.

## Files Generated

- `/Users/dan/Documents/ws/public-health/docs/sims/dose-response-explorer/main.html`
- `/Users/dan/Documents/ws/public-health/docs/sims/dose-response-explorer/dose-response-explorer.js`
- `/Users/dan/Documents/ws/public-health/docs/sims/dose-response-explorer/index.md`
- `/Users/dan/Documents/ws/public-health/docs/sims/dose-response-explorer/metadata.json`
- `/Users/dan/Documents/ws/public-health/docs/sims/dose-response-explorer/dose-response-explorer.png`
