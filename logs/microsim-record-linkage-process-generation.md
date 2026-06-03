# Session Log — record-linkage-process

**Date:** 2026-05-28
**Library:** p5.js
**Chapter:** 16 — Data Science Foundations for Public Health
**Status:** Implemented + layout-reviewed

## Learning Objective

Students trace the end-to-end record-linkage pipeline (data prep ->
blocking -> comparison -> deterministic/probabilistic decision ->
linked output) and identify the key parameter to tune at each stage.

## Instructional Design Decision

- Two-lane swim-lane diagram (left = Dataset A, right = Dataset B)
  converging at Blocking. After Comparison Vector, the flow branches
  into Deterministic and Probabilistic paths, both feeding the final
  Linked Dataset.
- Animated flow dots (toggleable) travel along each edge in 16-frame
  cycles. Helps students see the pipeline as a sequence rather than a
  static diagram.
- Each clickable stage opens a right-side panel with title, prose
  description, a 1-3 line `recordlinkage` Python snippet in a
  monospaced code box, and a "Key parameter" callout.

## Implementation Notes

- Standardization stage panel calls out the asymmetric-transformation
  footgun — applying different normalization to A and B silently
  destroys recall.
- Blocking stage panel explicitly states the tight/loose tradeoff (a
  classic ROC-shape decision).

## CANVAS_HEIGHT

`// CANVAS_HEIGHT: 720` — title 40 px + flow region 520 px (boxes from
y=60 to y=470 with badges + labels) + legend 80 px + controls 80 px.

## Layout Review

| Check | Result |
|---|---|
| Title visible | PASS |
| Both lane labels and "Merged" label visible | PASS |
| All 9 boxes visible without overlap | PASS |
| Animated flow dots visible on edges | PASS |
| Arrowheads point downward into receiving boxes | PASS |
| Decision-branch labels visible | PASS |
| Legend and detail panel visible | PASS |
| Reset and Animate-flow controls visible | PASS |

No patches needed after the first capture.

## Files Written

- `docs/sims/record-linkage-process/main.html` (replaced scaffold)
- `docs/sims/record-linkage-process/record-linkage-process.js` (new)
- `docs/sims/record-linkage-process/record-linkage-process.png` (new)
