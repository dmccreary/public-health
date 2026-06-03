# Session Log — nuffield-ladder

**Date:** 2026-05-28
**Library:** p5.js
**Bloom Level:** (unspecified in spec)
**Status:** Implemented + layout-reviewed

## Topic
Nuffield Council on Bioethics ladder of public-health interventions, from rung 1 ("Do nothing") at the bottom to rung 8 ("Eliminate choice") at the top. Each rung is a clickable colored bar showing increasing intrusiveness from green to red. Clicking a rung opens an info panel with definition, public-health example, liberty-restriction level, and the justification threshold needed at that rung. A vertical coercion-o-meter gauge on the right animates to reflect the rung level.

## Design / Implementation Notes
- Three-pane horizontal layout: ladder ~48%, info panel ~35%, gauge ~16%. Sits inside a 580 px draw area with an 80 px control strip below.
- Rendered the ladder as a pair of vertical "rails" with rung-shaped colored bars between them; rungs computed bottom-up so rung 1 sits at the bottom (matches the ladder metaphor — and the spec).
- Color gradient computed as a linear lerp from RGB (70,160,80) at rung 1 to (200,60,60) at rung 8, with a +30 brightness bump on hover/selected.
- Coercion-o-meter is a thermometer-style vertical fill with tick marks. The fill height eases toward the selection using a tiny exponential decay (`animatedSel += (target - animatedSel) * 0.12`) — visually communicates the "climbing the ladder" motion without distracting the reader.
- Used p5 builtin `createButton` for Reset; no manually drawn buttons.

## Layout Review
- Cycle 1: passed on first capture. Title visible, all 8 rungs visible with full names, color gradient reads correctly green→red, rung numbers visible on the left, info-panel placeholder text visible, gauge tube and tick marks render correctly, Reset button visible.
- No patches required.

## CANVAS_HEIGHT
`// CANVAS_HEIGHT: 660`

## Files
- docs/sims/nuffield-ladder/main.html
- docs/sims/nuffield-ladder/nuffield-ladder.js
- docs/sims/nuffield-ladder/nuffield-ladder.png
