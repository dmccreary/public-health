# MicroSim Generation Log: icu-surge-capacity

**Date:** 2026-05-28
**Sim ID:** icu-surge-capacity
**Source chapter:** docs/chapters/18-simulation-design/index.md
**Library:** p5.js
**Bloom Level:** Analyze
**CANVAS_HEIGHT:** 760
**Iframe height:** 762px (CANVAS_HEIGHT + 2)

## Learning Objective

Analyze how admission rate, mean length of stay, and surge capacity decisions
interact to determine whether an ICU breaches capacity during a respiratory
pandemic, and identify the threshold at which the system tips from manageable
to overwhelmed.

## Instructional Design Check

- **Bloom Level:** Analyze
- **Bloom Verb:** analyze
- **Recommended Pattern:** Real-time parameter sliders + animated stock-and-flow
  + time-series chart with summary statistics
- **Specification Alignment:** Aligned with chapter spec verbatim
- **Rationale:** Analyze-level tasks benefit from a runnable model where students
  can vary parameters, predict the outcome, observe the result, and compare
  scenarios. The 90-day capped run + end-of-run summary statistics (peak %, days
  above capacity, total admitted) directly support the analytical task of
  identifying tipping points.

## Files Created

| File | Purpose |
|------|---------|
| `main.html` | HTML wrapper with schema meta tag, `<main></main>` (no id), CDN p5.js |
| `icu-surge-capacity.js` | p5.js implementation (~290 lines) |
| `index.md` | Frontmatter, iframe embed, learning objective, full spec |
| `metadata.json` | Dublin Core + educational metadata |
| `icu-surge-capacity.png` | 800x762 screenshot for sim index |

## Implementation Notes

- **Stock-and-flow visual:** Tank-style rectangle with animated fill level
  colored by occupancy zone (green <85%, orange 85-100%, red >100%). Dashed
  red line at 100% capacity, dashed orange line at 85% Crisis Standard of Care.
- **Inflow/outflow arrows:** Green inflow arrow on left labeled "Admissions"
  with current rate; red outflow arrow on right labeled "Discharges + Deaths"
  with computed discharge rate (occupancy / mean_los).
- **Controls layout:** Three columns at y=274 — sliders (left), surge checkboxes
  (middle), Pause/Reset buttons (right). All p5.js built-in controls.
- **Time-series chart:** Y-axis 0-150% of total capacity (which includes any
  enabled surge options), banded green/yellow/red. X-axis 0-90 days with 15-day
  ticks. Capacity dashed line at 100%. Current-day vertical marker.
- **Crisis banner:** "CRISIS STANDARDS ACTIVATED" flashes at the top of the
  diagram whenever occupancy exceeds capacity, with a sine-wave alpha pulse.
- **Summary overlay:** When day 90 is reached, simulation halts and an overlay
  shows peak occupancy, days above capacity, total patients admitted, and
  total surge capacity.
- **Animation pacing:** 6 frames per simulated day at ~60fps gives a full
  90-day run in ~9 seconds, fast enough to explore many scenarios in a class
  session.
- **Initial state:** Occupancy starts at 40% of baseline beds so students see
  meaningful starting context before stepping the model.

## Layout Review

Walked the visual checklist against the captured PNG:

- Title visible at top center: **PASS**
- Stock-and-flow tank fits within top section: **PASS**
- Inflow/outflow arrows labeled and pointing correctly: **PASS**
- Threshold labels (CAPACITY BREACHED, Crisis Standard of Care) readable: **PASS**
- Day/Peak/Days-over-capacity readouts in top-left corner: **PASS**
- Controls section has clear "Controls" header, three columns aligned: **PASS**
- Sliders have label above, value to the right: **PASS**
- Surge checkboxes readable, not overlapping: **PASS**
- Pause and Reset buttons distinct, right-aligned: **PASS**
- Time-series chart has axis labels, banded background, capacity line, legend: **PASS**
- No clipping at iframe edges at 762px height: **PASS**
- No overlap between sections: **PASS**

**Verdict:** Layout passes on first review cycle. No patches needed.

## Constraints Verified

- [x] Iframe src in index.md = `main.html` (relative)
- [x] Chapter file NOT edited
- [x] `<main></main>` has no `id` attribute
- [x] `canvas.parent(document.querySelector('main'));` used in setup()
- [x] `updateCanvasSize();` is the first call in setup()
- [x] All controls use p5.js built-in factories (createSlider, createCheckbox,
      createButton)
- [x] No reuse of LEFT/RIGHT/CENTER/TOP/BOTTOM as identifiers
- [x] `// CANVAS_HEIGHT: 760` comment on line 2 (within first 10 lines)
- [x] Iframe height = 760 + 2 = 762px
- [x] Schema meta tag present in main.html

## Final Status

implemented
