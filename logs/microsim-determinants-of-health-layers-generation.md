# Session Log — determinants-of-health-layers

**Date:** 2026-05-28
**Library:** p5.js
**Bloom Level:** Understand (L2) — verb "explain"
**Status:** Implemented + layout-reviewed

## Topic
Concentric-ring rendering of the Dahlgren-Whitehead determinants-of-health model. Five rings from biological/genetic core out through individual behaviors, social networks, living/working conditions, and macro socioeconomic/cultural conditions. Demonstrates that outer-ring factors constrain inner-ring choices. Each click reveals examples, a "why this level matters" note, and a COVID-19 example. A walkthrough button steps automatically through every ring using Type 2 diabetes risk as the running example.

## Design / Implementation Notes
- 60/40 split: rings left, info panel right. Bottom strip holds the walkthrough button and Reset button.
- Rendering trick: draw concentric solid circles largest-first; each smaller layer paints over the inside, removing the need for ring masking.
- Hit-testing is plain radial — `dist` from center into the appropriate band index.
- Walkthrough uses a millis-based timer (2.2 s per ring) so the example text in the panel and the gold selection ring advance together. Any manual click cancels the walkthrough.
- Two example tracks per ring: a default COVID-19 example (always shown) and a Type 2 diabetes example (shown only during the walkthrough). Keeps the panel uncluttered for clickers but rich for the structured walk.
- Color palette goes from pale near-white core out to a dark navy outer ring (per spec "smooth color gradient from outer rings (darker teal) to inner rings (lighter blue/white)"). Text color flips to white once contrast demands.

## Layout Review
- Cycle 1: outer-ring label was clipped above the canvas; inner labels were truncated with ellipses; right-side controls text overflowed the canvas.
- Cycle 2: rewrote label placement to wrap text using a generic `wrapText` helper, computed chord width at the label's y-position so wrapping has accurate room, dropped the outer-layer name to "Macro Socioeconomic & Cultural Conditions" (vs the longer spec text), and split the bottom hint text into two lines clipped to canvas width.
- Cycle 3: shifted labels from top-of-band down to mid-upper band where the chord is wider — eliminates the 4-line wrap on the outer label.
- All checklist items now PASS: title visible, all 5 rings labeled without truncation, controls visible, no overlap, contrast acceptable on all rings.

## CANVAS_HEIGHT
`// CANVAS_HEIGHT: 620`

## Files
- docs/sims/determinants-of-health-layers/main.html
- docs/sims/determinants-of-health-layers/determinants-of-health-layers.js
- docs/sims/determinants-of-health-layers/determinants-of-health-layers.png
