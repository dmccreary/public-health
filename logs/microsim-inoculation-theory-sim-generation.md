# MicroSim Generation Log — inoculation-theory-sim

- **Date:** 2026-05-28
- **Sim ID:** inoculation-theory-sim
- **Chapter:** 12-public-health-communication
- **Library:** p5.js
- **Bloom Level:** Analyze
- **CANVAS_HEIGHT:** 570
- **Iframe height:** 572

## Spec Extracted

Side-by-side simulation comparing two populations: "No Prebunk" (left panel)
and "Prebunked" (right panel). Each population is a 10x10 grid of 100 people
icons. Slider controls misinformation spread rate (1-5). "Release
Misinformation" button triggers the spread. In the Prebunked panel, ~65%
of icons have a shield overlay. Shielded icons resist (turn blue);
unshielded turn red. Counters show Exposed, Believed, Resisted, Correction
Reached. Debunk Mode toggle changes the simulation to deploy corrections
after misinformation spreads, showing limited correction reach. Reset
restores both panels.

## Instructional Design Decision

- **Bloom Verb:** Compare / Analyze
- **Pattern:** Side-by-side simulation with parameter slider and discrete trigger buttons (action-driven cellular-automaton style spread). Each "Release" produces a complete spread run the learner can observe. Debunk Mode toggle enables a meaningful comparative observation: prebunking-only vs prebunking-with-debunking-after.
- **Rationale:** Analyze-level objective is best served by visible mechanism (spreading red icons) combined with a controllable condition (shield density fixed at 65%) and a comparable counterfactual (debunk-after vs prebunk-only).

## Implementation Notes

- p5.js native controls: 3 buttons + 1 slider + 1 checkbox (within recommended 1–5 control budget)
- Two 10x10 grids drawn inside framed sub-panels with colored header bars (red = No Prebunk, green = Prebunked)
- Person icons are head + rounded body; shielded icons get a blue arc above the head
- Spread model: probabilistic 4-neighbor propagation per simulation step, gated to run every 6 frames so the animation is readable. Shielded individuals flip to "resisted" rather than "believed" when reached.
- Correction model: per-step probabilistic flip from "believed" to "corrected" — lower probability in Debunk Mode to model the well-documented limited reach of post-hoc corrections.
- Counters update live and a red bar visualizes "Believed" share against the population total.

## Files Created

- `/Users/dan/Documents/ws/public-health/docs/sims/inoculation-theory-sim/main.html`
- `/Users/dan/Documents/ws/public-health/docs/sims/inoculation-theory-sim/inoculation-theory-sim.js`
- `/Users/dan/Documents/ws/public-health/docs/sims/inoculation-theory-sim/index.md`
- `/Users/dan/Documents/ws/public-health/docs/sims/inoculation-theory-sim/metadata.json`
- `/Users/dan/Documents/ws/public-health/docs/sims/inoculation-theory-sim/inoculation-theory-sim.png`

## Layout Review Cycles

### Cycle 1
- **FAIL:** "Spread rate: N" label overlapped the Reset button (label drawn at x ≈ 270, Reset button extended to x ≈ 370).
- **Fix:** Bumped `sliderLeftMargin` from 240 → 400, then 400 → 500, and placed the label at `sliderLeftMargin - 100` so it sits cleanly to the right of all buttons and just left of the slider.

### Cycle 2 — PASS
- Title clean and centered, no overlap.
- Both population panels render with headers and 10x10 grids; right-panel shielded icons clearly distinct via arc overlay.
- Counters readable inside their inset frames.
- All controls visible within 570px iframe; Spread rate label and slider cleanly aligned.
- Legend visible in row 2 right.

## Verdict

PASS after one fix cycle.
