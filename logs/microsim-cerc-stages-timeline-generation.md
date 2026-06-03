# Session Log — cerc-stages-timeline

**Date:** 2026-05-28
**Library:** p5.js
**Chapter:** 12 — Public Health Communication
**Status:** Implemented + layout-reviewed

## Learning Objective

Students identify the five stages of CDC's Crisis & Emergency Risk
Communication (CERC) framework and match each to its typical communication
tasks, illustrated with COVID-19 examples.

## Instructional Design Decision

- Horizontal five-band timeline with clickable stage headers AND the
  colored bands themselves — two ways to reach the same panel reduces
  the chance a student misses the affordance.
- Color sequence (blue -> orange -> red -> yellow -> green) mirrors a
  "calm -> alarm -> sustained -> recovery -> reflection" emotional arc.
- Event markers (`!` icons) seeded on the bands carry hover tooltips
  for concrete real-world anchors without crowding the layout.

## Implementation Notes

- Two-column detail panel (tasks left, COVID example right) avoids the
  vertical scrolling that a stacked layout would require at iframe
  height 640.
- Hover-and-click both supported on stage header buttons; the band
  itself is also clickable.
- Reset button clears `selectedStage` to -1.

## CANVAS_HEIGHT

`// CANVAS_HEIGHT: 640` — title 40 px + stage buttons 35 px + bands 65
px + panel 380 px + controls 80 px.

## Layout Review

| Check | Result |
|---|---|
| Title visible | PASS |
| Five stage buttons visible and clickable | PASS |
| Five colored timeline bands legible with number badges | PASS |
| Connector arrow under timeline visible | PASS |
| Event markers (!) visible above bands | PASS |
| Detail panel (empty state) properly centered | PASS |
| Reset button + instructions in controls strip | PASS |

One patch applied: empty-panel placeholder text was clipping at the
right edge — switched from `text(..., x+w/2, y+h/2, w-40)` to an
explicit `\n` newline so the wrap is predictable.

## Files Written

- `docs/sims/cerc-stages-timeline/main.html` (replaced scaffold)
- `docs/sims/cerc-stages-timeline/cerc-stages-timeline.js` (new)
- `docs/sims/cerc-stages-timeline/cerc-stages-timeline.png` (new)
