# Session Log — prevention-spectrum

**Date:** 2026-05-28
**Library:** p5.js
**Bloom Level:** (unspecified in spec)
**Status:** Implemented + layout-reviewed

## Topic
Side-by-side visualization of the IOM prevention spectrum (universal → selective → indicated) and the classical prevention tiers (primordial → primary → secondary → tertiary). Both rows run along the same left-to-right disease timeline so students can see how the two classifications map to each other. Each cell is clickable and opens a side panel with definition, target population, public-health example, and a cost-effectiveness profile. A dropdown switches between "Both systems," "Classic only," and "IOM only" so students can isolate either taxonomy.

## Design / Implementation Notes
- 58/42 split: bands on the left, info panel on the right. Bottom strip: mode dropdown, Reset, and a two-line helper.
- Two parallel rows of pill-shaped cells. Classic row uses a green gradient from dark forest green (Primordial) to yellow-green (Tertiary). IOM row uses a blue gradient from dark blue (Universal) to pale blue (Indicated). Color choices follow the spec ("blue gradient ... green gradient").
- Each cell carries a short sub-caption ("Before risk", "Reduce risk", etc.) below the level name to make the timeline ordering legible without requiring a click.
- Selection state is keyed as `system:index` (e.g. `iom:1`) so a single `selectedLevel` variable cleanly tracks which cell is open across both rows.
- A bottom legend in "Both systems" mode summarizes the relationship in one sentence: classical tracks disease stage, IOM tracks population risk — answering the recurring student question of "what's different?"
- Layout reserves `captionH` only when needed so single-row modes use the full vertical area for taller cells.

## Layout Review
- Cycle 1: bottom comparison legend was clipped at the canvas bottom and overlapped the IOM row.
- Cycle 2: reserved 36 px at the bottom of the bands area for the legend and re-anchored it at `y + h - 34`; shortened the legend wording to a single line that fits the available width. All cells now render fully, legend reads cleanly.
- All checklist items PASS: title visible, both rows of cells visible with all names and sub-captions, info panel and Reset/dropdown visible, color gradients match spec, legend readable.

## CANVAS_HEIGHT
`// CANVAS_HEIGHT: 620`

## Files
- docs/sims/prevention-spectrum/main.html
- docs/sims/prevention-spectrum/prevention-spectrum.js
- docs/sims/prevention-spectrum/prevention-spectrum.png
