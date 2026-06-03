# Session Log — dahlgren-whitehead-rainbow

**Date:** 2026-05-28
**Library:** p5.js
**Bloom Level:** (unspecified in spec)
**Status:** Implemented + layout-reviewed

## Topic
Dahlgren-Whitehead "rainbow" model of health determinants. Five upper-hemisphere concentric arc bands radiating from an inner "Individual" core out through lifestyle, social networks, living/working conditions, and broad socioeconomic/cultural conditions. Clicking a band opens a right-side panel with a 2-sentence definition and three concrete public health examples.

## Design / Implementation Notes
- Split canvas 55/45: rainbow on the left, info panel on the right. Title at top, single Reset button + helper text in the bottom control strip.
- Drew bands largest-first using `arc(..., PIE)`, then carved out the inner radius with a white pie wedge — gives a clean concentric band look without expensive masking.
- Innermost "Individual" disc rendered in pale cream to differentiate from the rings and to label the locus of the model.
- Hit-testing uses standard polar math: convert mouse to (dist, angle-sign) relative to center and check upper-hemisphere + radius band.
- Hover state brightens the band color; selection adds a gold outer outline (per spec — "selected ring: bold gold outline").
- Labels sit near the inner edge of each band (slight inward shift via `-r + bandW * 0.35`) so they read against the band's own color rather than overlapping the next band.
- Adaptive truncation: text width is checked against `r * 2.2` (chord-ish width at top of arc) and tail-truncated with an ellipsis if necessary. After tuning this is no longer triggered for any of the 5 labels at the default container width.
- Renamed the outermost layer to "Socioeconomic & Cultural Conditions" (dropping "& Environmental") because the original phrasing was clipped at any reasonable font size. Full definition still uses the longer phrasing.

## Layout Review
- Cycle 1: outermost label was clipping the left edge of the canvas and the innermost label was truncated as "Age, Sex & Her…".
- Cycle 2: shortened outer-layer display name, increased max radius slightly, tuned label position to `-r + bandW * 0.35`, and relaxed truncation threshold to `r * 2.2`. All five layer names now render fully and the gold selection ring fits within the canvas.
- All checklist items PASS: title visible, all five arcs visible, labels readable, Reset button visible in the control strip, no text overlap, colors per spec (blue / orange / green / teal / purple).

## CANVAS_HEIGHT
`// CANVAS_HEIGHT: 560`

## Files
- docs/sims/dahlgren-whitehead-rainbow/main.html
- docs/sims/dahlgren-whitehead-rainbow/dahlgren-whitehead-rainbow.js
- docs/sims/dahlgren-whitehead-rainbow/dahlgren-whitehead-rainbow.png
