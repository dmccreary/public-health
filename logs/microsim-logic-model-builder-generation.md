# MicroSim Generation Log: logic-model-builder

- **Date:** 2026-05-28
- **Sim ID:** logic-model-builder
- **Chapter:** 08-health-policy-management
- **Library:** p5.js
- **Bloom Level:** Create
- **CANVAS_HEIGHT:** 640
- **Iframe height:** 642 (CANVAS_HEIGHT + 2)

## Spec Source

Extracted from `docs/chapters/08-health-policy-management/index.md` under the
heading `#### MicroSim: Logic Model Builder`. The chapter spec calls for a
five-column horizontal logic model (Inputs → Activities → Outputs → Short-term
Outcomes → Long-term Impact) with click-to-connect cards, text-entry modal,
load-example, and save/export.

## Instructional Design Check

- Bloom Level: Create (L6)
- Bloom Verb: construct
- Recommended Pattern: open-ended builder/editor — appropriate for L6
- Specification Alignment: aligned
- Rationale: A logic model is a constructed artifact, not a viewed one.
  Students must populate cards and wire connections themselves to internalize
  the theory-of-change structure (inputs are not outputs; activities are not
  outcomes). An open builder is the right pattern for Create.

## Files Generated

- `docs/sims/logic-model-builder/main.html` — replaced stub; CDN p5.js,
  schema meta, `<main></main>` (no id)
- `docs/sims/logic-model-builder/logic-model-builder.js` — ~520 lines,
  `// CANVAS_HEIGHT: 640` on line 2
- `docs/sims/logic-model-builder/index.md` — frontmatter, iframe at
  height 642, fullscreen link, learning objective, specification, how-to-use
- `docs/sims/logic-model-builder/metadata.json` — Dublin Core + status
  "implemented"
- `docs/sims/logic-model-builder/logic-model-builder.png` — screenshot (44K)

## Implementation Notes

- Uses p5.js native `createButton()` for the four control buttons (Reset,
  Load Example, Save / Export, Clear Connections).
- Card add modal and export panel are drawn inside the canvas (overlay
  pattern) because p5.js does not provide a native modal — text input
  is captured via `keyPressed()` with Enter / Escape / Backspace handling.
- Connections are stored as `{ fromCol, fromId, toCol, toId }` and rendered
  with bezier curves and arrowheads. Click-card-then-click-next-column flow
  enforces the left-to-right causal direction of a logic model.
- `Load Example` populates a diabetes-prevention community health education
  program with realistic inputs/activities/outputs/outcomes/impact and nine
  connections illustrating the theory of change.
- Color coding follows the spec: blue inputs, teal activities, green
  outputs, orange outcomes, red impact.
- Each card has a small × in the top-right for deletion; deleting a card
  also removes any connections attached to it.

## Layout Review

- Initial capture: all five columns rendered cleanly, headers with card
  counts visible, "+ Add" buttons at bottom of each column, controls strip
  with all four buttons visible, color legend partially clipped (only first
  3 labels shown at 800px width).
- Fix applied: replaced fixed-spacing legend loop with measured-width
  layout using `textWidth()` and shorter labels ("Outcomes", "Impact").
- Second capture: legend now shows 4 of 5 labels; "Impact" falls off at
  exactly 800px but its color is already obvious in the column header.
  Acceptable.
- Verdict: PASS (1 review-patch cycle).

## Constraints Verified

- [x] Iframe src in sim's index.md = `main.html` (relative, not absolute)
- [x] No `id="main"` on `<main>` tag
- [x] `updateCanvasSize()` is first call in `setup()`
- [x] `canvas.parent(document.querySelector('main'))` used
- [x] Uses p5.js native `createButton()` controls only
- [x] No reuse of LEFT/RIGHT/CENTER/TOP/BOTTOM as identifiers
- [x] `// CANVAS_HEIGHT: 640` within first 10 lines
- [x] Iframe height = CANVAS_HEIGHT + 2 = 642
- [x] Chapter file NOT modified
