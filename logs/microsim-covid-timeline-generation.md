# Session Log — covid-timeline

**Date:** 2026-05-28
**Library:** p5.js
**Chapter:** 19 — COVID-19 as a Public Health Master Case Study
**Status:** Implemented + layout-reviewed

## Learning Objective

Students locate the major COVID-19 events of 2019-2023 on a calendar
timeline and explain the public-health significance of each via a
click-to-reveal detail panel.

## Instructional Design Decision

- Implemented as native p5.js (not vis-timeline) per spec — gives full
  control over color-coded categories and label placement.
- Eight-lane label-stacking algorithm: lanes alternate above and below
  the track, with a left-to-right sweep placing each event in the
  first lane whose previously placed label box ends before the
  current event's label box starts. This prevents the Jan-Feb-Mar
  2020 cluster from overlapping.
- Category palette uses CB-safe primaries (blue/orange/green/purple/teal).

## Implementation Notes

- Time axis uses "months since Dec 2019" as an integer-friendly
  scalar; `monthLabel(t)` converts back to "Mon YYYY".
- Zoom slider sets the visible window length; the view re-centers on
  the selected event (or the midpoint if no selection).
- Reset button restores the full 0..MAX_T window and clears selection.

## CANVAS_HEIGHT

`// CANVAS_HEIGHT: 640` — title 40 px + timeline + labels 240 px +
detail panel 200 px + controls 80 px + margins.

## Layout Review

| Check | Result |
|---|---|
| Title visible | PASS |
| All 15 event labels readable without overlap | PASS |
| Dates shown under each label | PASS |
| Year tick marks (2020-2024) along axis | PASS |
| Color legend in top-right not overlapping labels | PASS |
| Zoom slider and Reset button visible | PASS |

### Patch cycle

- **Cycle 1 issue:** with `drawHeight=520`, early-2020 events stacked
  on top of each other; labels clipped under the legend.
- **Fix:** increased `drawHeight` to 560, moved track-y from 130 down
  to 200 to give 8 stagger lanes; implemented lane-packing instead of
  binary alternation.

## Files Written

- `docs/sims/covid-timeline/main.html` (replaced scaffold)
- `docs/sims/covid-timeline/covid-timeline.js` (new)
- `docs/sims/covid-timeline/covid-timeline.png` (new)
