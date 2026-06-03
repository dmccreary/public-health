# Session Log — sir-compartments

**Date:** 2026-05-28
**Library:** p5.js
**Bloom Level:** Apply (L3)
**Status:** Implemented + layout-reviewed (1 cycle, PASS)

## Learning Objective

Manipulate β and γ in an SIR (or SEIR) compartmental model and observe
how stock levels and the resulting R₀ shift the epidemic trajectory.

## Implementation Notes

- **Compartments:** S, I, R boxes (or S, E, I, R when the SEIR mode is
  selected from the dropdown). Boxes colored blue / orange / red / green.
- **Differential equations:** Euler integration with `DT = 0.25` and
  `stepsPerFrame = 4`. SIR: `dS = −βSI/N, dI = βSI/N − γI, dR = γI`.
  SEIR adds an `E` compartment with progression rate σ.
- **Population:** N = 10,000; initial S = 9,990, I = 10.
- **Arrows:** carry the rate equation as a label
  (β·S·I/N, σ·E, γ·I). Both compartments and arrows are clickable; the
  right-hand info panel shows the level equation (or flow equation) with
  current parameter values substituted.
- **Time-series plot:** built into the canvas — S/I/R/E trajectories
  rendered as line graphs, auto-scaling to N on the y-axis.
- **R0 readout:** `β/γ` always shown in the controls strip and in the
  default info panel.

## Controls

- β slider (0.05 – 1.0)
- γ slider (0.02 – 0.5)
- σ slider (0.05 – 1.0, used only in SEIR)
- Model dropdown: SIR / SEIR
- Pause / Play, Reset buttons

## Layout Review

**Cycle 1:** PASS — title centered, three compartments visible with
animated stock counts, infection-rate label between S and I, recovery-rate
label between I and R, time-series plot rendering all curves, info panel
on the right with default R0 readout, all four sliders + dropdown + two
buttons visible in the 140-pixel control strip.

## Files

- `/Users/dan/Documents/ws/public-health/docs/sims/sir-compartments/main.html`
- `/Users/dan/Documents/ws/public-health/docs/sims/sir-compartments/sir-compartments.js`
- `/Users/dan/Documents/ws/public-health/docs/sims/sir-compartments/sir-compartments.png`
