# MicroSim Generation Log: covid-seir

## Summary

- **Sim ID:** covid-seir
- **Title:** COVID-19 SEIR Wave Simulator
- **Library:** p5.js
- **Bloom Level:** Analyze
- **Source Chapter:** Chapter 19 — COVID-19 Case Study
- **Final CANVAS_HEIGHT:** 600 (drawHeight 400 + controlHeight 200)
- **Final iframe height:** 602px

## Learning Objective

Analyze how transmission rate, vaccination coverage, variant R0, and waning immunity interact to shape COVID-19 wave dynamics, and explain why early single-scenario projections systematically diverged from observed multi-wave outcomes.

## Design Decisions

**Routing.** A COVID-19 SEIR compartmental simulation with parameter sliders, live derived metrics, and a multi-year time-series plot routes to the p5.js generator (custom simulation + parameter sliders + on-canvas annotations). The chapter spec already pinned the library to p5.js.

**Numerics.** Forward-Euler integration with 1-day timesteps over a 730-day window. Standard COVID parameters:

- `SIGMA = 1/5.2` per day (5.2-day mean incubation, Lauer et al. 2020)
- `GAMMA = 1/8.0` per day (~8-day infectious period)
- `R0 = beta / gamma`, so the β slider and the Variant R₀ slider auto-sync via `syncBetaFromR0()`. This avoids the common SEIR slider-sim footgun where β and R₀ controls drift apart and the displayed R₀ no longer matches the simulated dynamics.

**Vaccination model.** Simplified perfect-take: vaccinated fraction is moved from S to R at t=0. This is a deliberate teaching simplification — it lets the comparison with HIT = 1 − 1/R₀ work directly without introducing per-dose efficacy parameters.

**Waning immunity.** Implemented as a first-order R → S flow at rate `wane * R`. Setting waning > 0 produces the recurrent-wave behavior that early single-wave COVID models missed; the slider lets students discover this empirically.

**Compare Variants button.** Runs Delta (R₀=5) and Omicron (R₀=10) at the **same** vaccination coverage and overlays the infectious curves. This is the pedagogically loaded comparison from the chapter — it shows why coverage that suppressed Delta did not suppress Omicron.

**Layout.**

- Top: plot area (left ~530px) + metrics panel (right ~240px)
- Bottom: control strip with 4 labeled sliders on the left, 5 buttons on the right (Run Wave, Reset, Compare Variants, plus 3 variant presets)
- On-canvas annotations: dashed green horizontal line at HIT, dashed red vertical line at peak infection day, peak-day label

**Footgun avoided.** The β/R₀ sync uses one-way coupling (R₀ slider drives β). If both sliders were independently editable without coupling, learners could set β and R₀ to inconsistent values and the displayed R₀ in the metrics panel would silently disagree with the dynamics — a textbook case of a silent, easy-to-trigger, delayed-damage footgun.

## Layout Review

**Cycle 1 findings:**

- PASS — title, plot grid, axis ticks, metrics panel, all sliders, all buttons visible and unclipped
- FAIL (minor) — "Population fraction" axis label rendered too high, abutting the title row
- Minor concern — vertical spacing tight on the bottom edge of the control strip

**Fix applied:** Moved the "Population fraction" label down (`py - 22` → `py - 14`) and shifted 10px of vertical budget from drawHeight to controlHeight (410/190 → 400/200) to give the footer info text and bottom slider more breathing room.

**Cycle 2:** All checklist items PASS. No further patches applied.

## Files Generated

- `/Users/dan/Documents/ws/public-health/docs/sims/covid-seir/main.html`
- `/Users/dan/Documents/ws/public-health/docs/sims/covid-seir/covid-seir.js`
- `/Users/dan/Documents/ws/public-health/docs/sims/covid-seir/index.md`
- `/Users/dan/Documents/ws/public-health/docs/sims/covid-seir/metadata.json`
- `/Users/dan/Documents/ws/public-health/docs/sims/covid-seir/covid-seir.png` (screenshot, 800×600)
