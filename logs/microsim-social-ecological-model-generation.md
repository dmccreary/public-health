# Session Log — social-ecological-model

**Date:** 2026-05-28
**Library:** p5.js
**Bloom Level:** (unspecified in spec)
**Status:** Implemented + layout-reviewed

## Topic
Interactive five-ring Social-Ecological Model: Individual → Interpersonal → Organizational → Community → Societal/Policy. Clicking a ring opens a side panel with that level's definition, a sample determinant, and a behavior-specific intervention. A behavior dropdown switches the intervention examples across "Physical activity," "Healthy eating," and "Safe sex." An "All levels" button highlights every ring at once with the message that effective behavior change requires action at every level.

## Design / Implementation Notes
- 58/42 split: rings left, panel right. Bottom strip: behavior dropdown, "All levels" button, Reset, plus a two-line helper.
- Same concentric-circles trick as the determinants sim — paint largest-first, smaller circles overwrite the interior.
- Glow effect on selected ring: 6 stacked translucent yellow circles fading outward, plus a 3-px gold stroke — gives a soft halo without using shadow filters.
- Behavior-aware intervention text: each level holds a `interventions` map keyed by behavior name. Switching the dropdown re-reads the map on every frame, so no extra state is needed.
- "All levels" mode replaces the per-level panel with a five-bullet list, one colored dot per level and the behavior-specific intervention text. Cleanly demonstrates the "multi-level" lesson.
- Colors per spec: dark teal core out through blue, green, yellow-orange, to red on the outermost societal ring. Yellow-orange band uses dark-brown text for contrast; all others use white.

## Layout Review
- Cycle 1: passed on first capture. Title visible, all five ring names readable inside their bands, all controls visible and aligned in the control strip, panel default-state message centered, no clipping.
- No patches required.

## CANVAS_HEIGHT
`// CANVAS_HEIGHT: 640`

## Files
- docs/sims/social-ecological-model/main.html
- docs/sims/social-ecological-model/social-ecological-model.js
- docs/sims/social-ecological-model/social-ecological-model.png
