# Session Log — p5-microsim-anatomy

**Date:** 2026-05-28
**Library:** p5.js
**Chapter:** 18 — Simulation Design for Public Health Education
**Status:** Implemented + layout-reviewed

## Learning Objective

Students name the four standard regions of a p5.js MicroSim (Full
Container, Canvas Region, Readout Region, Controls Region) and map
each region to the lines of `setup()` / `draw()` code that produce it.

## Instructional Design Decision

- Split-panel: left half shows a running mini SIR simulation inside
  three stacked colored dashed-border regions (canvas, readout,
  controls). Right half shows annotated pseudocode with per-line
  color stripes matching the regions.
- Bidirectional click highlighting: clicking a region label OR a code
  line highlights both the region (with a pulsing tint) and all
  matching code lines.
- Bottom strip ("Common Footguns") lists three classic p5.js
  pitfalls: missing `updateCanvasSize()`, drawing controls manually
  on canvas, and putting setup-style side effects inside draw().

## Implementation Notes

- The mini SIR sim is a 40-agent diffusion-and-infect model. Agents
  bounce in a 200x200 logical space scaled into whatever the canvas
  region resolves to.
- "Mini SIR sim running" checkbox pauses the agent loop (state still
  rendered, day counter frozen).
- Region frame uses `drawingContext.setLineDash([7,5])` for the
  dashed border as required by the spec.

## CANVAS_HEIGHT

`// CANVAS_HEIGHT: 700` — title 40 px + nested regions 470 px +
footgun strip 80 px + controls 80 px.

## Layout Review

| Check | Result |
|---|---|
| Title visible | PASS |
| Outer "Full Container" dashed frame visible | PASS |
| Canvas, Readout, Controls regions all visible with labels | PASS |
| Mini SIR agents (green/yellow/red) rendered inside Canvas | PASS |
| Day / S / I / R counters in Readout region | PASS |
| Mock slider + Reset button in Controls region | PASS |
| 16-line code skeleton with color stripes | PASS |
| Three-column Common Footguns panel | PASS |

No patches needed after the first capture.

## Files Written

- `docs/sims/p5-microsim-anatomy/main.html` (replaced scaffold)
- `docs/sims/p5-microsim-anatomy/p5-microsim-anatomy.js` (new)
- `docs/sims/p5-microsim-anatomy/p5-microsim-anatomy.png` (new)
