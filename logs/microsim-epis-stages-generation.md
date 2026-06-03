# Session Log — epis-stages

**Date:** 2026-05-28
**Library:** p5.js
**Chapter:** 13 — Prevention Science
**Status:** Implemented + layout-reviewed

## Learning Objective

Students identify the four EPIS stages (Exploration, Preparation,
Implementation, Sustainment), recognize how outer and inner context
influence each stage, and explain why Sustainment is the most commonly
neglected phase.

## Instructional Design Decision

- Four colored stage boxes connected by right-pointing arrows.
- Outer-context bar (light blue) above stages and inner-context bar
  (light green) below, with context-toggle dropdown to highlight one
  or both. Stem-bar indicators inside each stage box show the
  intensity of outer/inner influence at that stage (E and S have
  strongest outer; I has strongest inner).
- Progress-indicator triangle (pink) above the stages is driven by a
  slider — defaults to ~2.3 (Implementation phase), illustrating that
  by the time a program reaches Sustainment many demo projects have
  already faded.
- Three-column detail panel (activities / barriers / strategies) plus
  one wide row for the public-health example.

## CANVAS_HEIGHT

`// CANVAS_HEIGHT: 680` — title + subtitle 50 px + context strip 30 px
+ stages 100 px + context strip 30 px + panel 280 px + controls 80 px
+ margins.

## Layout Review

| Check | Result |
|---|---|
| Title and subtitle visible | PASS |
| Four stage boxes with arrows between them | PASS |
| Stage letters (E, P, I, S) visible in badges | PASS |
| Outer/Inner context bars visible | PASS |
| Influence indicators (tick marks) above/below each box | PASS |
| Progress triangle visible with label | PASS |
| Detail panel with 3-column layout | PASS |
| Reset, dropdown, slider, and instructional text visible | PASS |

No patches needed after the first capture.

## Files Written

- `docs/sims/epis-stages/main.html` (replaced scaffold)
- `docs/sims/epis-stages/epis-stages.js` (new)
- `docs/sims/epis-stages/epis-stages.png` (new)
