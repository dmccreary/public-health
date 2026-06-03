# MicroSim Generation Log: bathtub-model

**Date:** 2026-05-28
**Sim ID:** bathtub-model
**Title:** Stock-and-Flow Bathtub Model
**Chapter:** 14 — Systems Thinking Foundations
**Library Chosen:** p5.js
**Bloom Level:** Understand
**Bloom Verb:** explain
**Status (final):** implemented

## Learning Objective

Students will be able to **explain** the integral relationship between
flows (β-driven new infections, γ-driven recoveries) and the stock of
infected individuals by manipulating the β and γ rate sliders and
observing how the level of infected individuals in the "bathtub" rises,
falls, or stabilizes over a 100-day simulation. Students will also be
able to **identify** how a 5-day reporting delay causes the stock to
continue rising even after the true inflow has peaked.

## Design Decisions

- **Library:** p5.js — the spec calls for a custom dynamic visualization
  (bathtub with animated water, faucet, drain, drip animation, time-series
  panel, equation box). No standard chart library fits.
- **Layout:** Three vertical lanes inside drawHeight=360:
  - Left: bathtub (tubX=30..390, tubY=110..290) with faucet above and drain
    below.
  - Right: equation panel (containerWidth-380..containerWidth-20).
  - Below: time-series graph (graphHeight=160), then controls (controlHeight=100).
  - Total CANVAS_HEIGHT = 360 + 160 + 100 = 620.
- **Animation:** Pedagogically justified for Understand-level despite the
  Step-4.4 rule of thumb against animation: the integral nature of stock
  accumulation is *inherently* dynamic, and watching water visibly fill
  faster than it drains makes the dStock/dt = inflow − outflow relation
  concrete in a way no static diagram can. Time-series + numeric stock
  panel provide the "concrete data visibility" Step 3.3 demands.
- **Inflow model:** β · 100 · (1 − exp(−t/15)) · exp(−t/60) — a smooth,
  saturating-then-decaying inflow that produces a recognizable epidemic
  shape and makes the delay-toggle effect dramatic.
- **Outflow model:** γ · stock — the classic linear-rate-proportional-to-
  stock that turns the system into a balancing loop.
- **Delay implementation:** circular buffer of inflow samples, length =
  DELAY_DAYS / DT = 20 samples. Toggle clears the buffer via Reset to
  avoid mid-run discontinuity.
- **Controls:** all p5 built-ins (createSlider, createCheckbox,
  createButton) per CLAUDE.md p5 rules.

## CANVAS_HEIGHT

`// CANVAS_HEIGHT: 620` (declared on line 2 of bathtub-model.js)
Iframe height in index.md = 622px (CANVAS_HEIGHT + 2).

## Layout Review (microsim-layout-reviewer checklist)

### Cycle 1 (initial)

**FAIL — Inflow label clipped at top edge**
Evidence: "Inflow: New Infections" label rendered at y ≈ 0, top
characters cut off; faucet body slightly clipped above canvas.

**FAIL — Inflow rate text overlapped by faucet spout**
Evidence: "rate = 0.25 (β)" rendered behind the faucet glyph at the
same y-coordinate.

**FAIL — Drain labels missing / colliding with time-series panel**
Evidence: drain text positioned at y ≈ 370 in original layout but the
time-series panel starts at y = 368, so labels were drawn over the
chart border with no readable space.

**Fix applied:**
- Moved tub down (tubY 90 → 110), reduced tubH (220 → 180), giving
  60px of clear top space for the faucet + 2 labels.
- Moved inflow labels above the faucet at fixed y = 38, 54 so they
  can't be clipped.
- Tried a right-side drain (cycle 1b) but the spout collided with the
  equation panel — discarded.

### Cycle 2 (after fix)

**PASS — Title** centered, fully visible.
**PASS — Inflow label + faucet** label "Inflow: New Infections" and
"β = 0.25 · saturating(t)" both fully readable above the faucet glyph.
**PASS — Bathtub stock** "STOCK: Infected Individuals" header + numeric
value "46" both visible; water level (red) clearly drawn.
**PASS — Drain + outflow label** drain on bottom-right of tub with
"Outflow: Recoveries" and "rate = γ · Stock = 4.6" labels to the LEFT
of the drain stem, no collision with time-series panel below.
**PASS — Equation panel** all 4 sections (equation, current flow values,
current state values, net change) rendered with no clipping.
**PASS — Time-series chart** axes, grid lines, y-axis labels (0/500/1000),
x-axis ticks every 20 days, legend, and current-point marker all visible.
**PASS — Controls strip** β slider, γ slider, initial-infected slider,
delay checkbox, Pause and Reset buttons all visible at bottom and aligned
within the controlHeight=100 band.
**PASS — No overlap** between bathtub, equation panel, time series,
controls.

Minor cosmetic touch-up applied in cycle 2: shortened the inflow rate
caption from "rate = X (β-driven)" to "β = X · saturating(t)" to fully
clear the faucet body.

**Final verdict: PASS** — no remaining FAILs after 2 review cycles.

## Files Generated

- `/Users/dan/Documents/ws/public-health/docs/sims/bathtub-model/main.html`
  (replaced the stub)
- `/Users/dan/Documents/ws/public-health/docs/sims/bathtub-model/bathtub-model.js`
  (new — 235 lines, CANVAS_HEIGHT comment on line 2)
- `/Users/dan/Documents/ws/public-health/docs/sims/bathtub-model/index.md`
  (new — frontmatter, iframe at 622px, fullscreen button, learning
  objective, how-to-use, full specification)
- `/Users/dan/Documents/ws/public-health/docs/sims/bathtub-model/metadata.json`
  (new — Dublin Core + sim_id, bloom_level, learning_objective, status)
- `/Users/dan/Documents/ws/public-health/docs/sims/bathtub-model/bathtub-model.png`
  (final screenshot, ~55K)

## Chapter Iframe

Chapter `14-systems-thinking-foundations/index.md` already contains the
correct iframe at line 191:
`<iframe src="../../sims/bathtub-model/main.html" width="100%" height="480px" scrolling="no"></iframe>`

The chapter iframe height (480px) is lower than the sim's final
CANVAS_HEIGHT + 2 (622px). Per task constraints I did NOT edit the
chapter file. Recommend a follow-up run of
`fix-iframe-heights.py --sim bathtub-model` to sync the chapter iframe
to 622px.
