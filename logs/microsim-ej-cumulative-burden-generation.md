# MicroSim Generation Log: ej-cumulative-burden

## Summary

- **sim_id**: ej-cumulative-burden
- **library**: p5.js
- **CANVAS_HEIGHT**: 530
- **iframe height**: 532px
- **layout verdict**: PASS (after 1 fix cycle)
- **status**: implemented

## Source

- Chapter: `docs/chapters/06-environmental-health/index.md`
- Spec heading: "Map: Environmental Justice Hotspots — Cumulative Burden Explorer"
- Bloom level: Understand (L2), verb: describe
- Learning objective: Students can describe how cumulative exposure burden combines environmental hazards with demographic vulnerability and explain how the choice of percentile threshold shapes which communities qualify for intervention.

## Files Generated

- `/Users/dan/Documents/ws/public-health/docs/sims/ej-cumulative-burden/main.html` (replaced stub)
- `/Users/dan/Documents/ws/public-health/docs/sims/ej-cumulative-burden/ej-cumulative-burden.js`
- `/Users/dan/Documents/ws/public-health/docs/sims/ej-cumulative-burden/index.md`
- `/Users/dan/Documents/ws/public-health/docs/sims/ej-cumulative-burden/metadata.json`
- `/Users/dan/Documents/ws/public-health/docs/sims/ej-cumulative-burden/ej-cumulative-burden.png` (screenshot, ~75KB)

## Design Decisions

- **Library**: Followed spec's `**Library:** p5.js` directive.
- **Pattern**: Concept-map / clickable-hotspots. Six archetypal U.S. EJ communities encoded as objects with hazards, vulnerabilities, illustrative EJScreen percentile (81-95), and a one-paragraph exposure history.
- **Controls**:
  - Threshold slider (0-100): only hotspots with `percentile >= threshold` are highlighted red; others fade gray. Demonstrates the policy tradeoff in choosing a burden cutoff.
  - Reset button: clears selected hotspot and resets threshold to 0.
- **Layout**:
  - drawHeight = 480, controlHeight = 50, canvasHeight = 530
  - Map region on the left ~60%, side info panel on the right ~38%
  - Legend below the map; two-row legend layout when the map column is narrow.
- **Stylized U.S. outline**: 25-point polygon, normalized fractions, scaled to map region. Decorative state-division strokes. Explicit "illustrative, not to scale" footer label.

## Layout Review Cycles

### Cycle 1 (initial)
- **FAIL**: Legend in single row used `min(360, w*0.55)` for the blue-dot x position, but the red item's label text "Environmental indicator (PM2.5, ozone, Superfund, etc.)" was long enough to collide with the blue dot, producing visible overlap of the text "Demographic vulnerability factor" with the red label.
- **Fix**: Shortened both legend labels to "Environmental indicator (red)" and "Demographic vulnerability (blue)". Switched to two-row legend when map width < 520px; one-row split at midpoint otherwise.

### Cycle 2 (verification)
- **PASS**: Legend now reads cleanly in two rows. All six hotspots labeled without overlap. Side panel default-state explanation renders cleanly. Slider label fully visible. Reset button positioned at right edge of control area. No clipping at iframe boundary.

## Instructional Design Check

- Bloom Level: Understand (L2)
- Bloom Verb: describe
- Recommended Pattern: Concrete-data exploration with progressive disclosure (hover -> click -> detail panel)
- Specification Alignment: Aligned. Spec explicitly calls for "click a hotspot opens a pop-up panel listing..." which matches L2 / describe well (concrete data made visible, no continuous animation).
- Rationale: The threshold slider lets students manipulate one parameter (cutoff) and immediately see how the count of "burdened" communities changes — supporting the "explain how the choice of percentile threshold shapes which communities qualify" portion of the objective.

## Constraints Verified

- [x] `<main></main>` has no `id` attribute
- [x] `canvas.parent(document.querySelector('main'))`
- [x] `updateCanvasSize()` is first call in `setup()`
- [x] `// CANVAS_HEIGHT: 530` within first 10 lines of .js
- [x] iframe height in index.md = 532 (CANVAS_HEIGHT + 2)
- [x] iframe src is relative (`main.html`)
- [x] No reuse of LEFT/RIGHT/CENTER/TOP/BOTTOM as identifiers
- [x] noStroke() before text() calls
- [x] Used named colors (aliceblue, white, silver, crimson, etc.); hex only for the muted map background (#eef3e8) and divider (#c7d2bc) — acceptable for subtle map tones
- [x] schema meta tag in main.html
- [x] No chapter file edits

## Notes

- All EJScreen percentiles and demographic figures are plausible illustrative values, NOT live EPA data. This is explicitly documented in metadata.json `assumptions` and `limitations` fields, and in the "Stylized U.S. outline — illustrative, not to scale" label on the canvas itself.
- The six archetypal communities map to real EJ-literature exemplars (Cancer Alley, Appalachian coalfields, LA ports, Chicago South Side, Navajo uranium, MS Delta agriculture).
