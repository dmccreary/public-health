# Session Log — uhc-coverage-cube

**Date:** 2026-05-28
**Library:** p5.js
**Bloom Level:** (unspecified in spec)
**Status:** Implemented + layout-reviewed

## Topic
WHO Universal Health Coverage Cube — a three-dimensional model of coverage along three axes: population (who is covered), services (what is included), and financial protection (how much is paid out of pocket). The MicroSim renders the outer cube as an isometric wireframe and the current coverage profile as a smaller solid volume nested in the corner. Three sliders set each axis, three preset buttons jump to Low / Middle / High income country profiles, and clicking any visible face of the solid volume opens an annotation panel.

## Design / Implementation Notes
- True isometric-style projection using three 2D basis vectors at -30°, -150°, and straight up. All eight outer-cube corners are computed once per frame from a single helper `pt(a, b, c)`.
- Inner coverage volume is the cube scaled to `(svcCov, popCov, finCov)` — only the three visible faces (top, front-right, front-left) are drawn as filled quads, and they exactly equal the three sliders' values.
- Face hit-testing uses a standard ray-cast point-in-polygon on each of the three visible quads. Order matters: services (right) tested before top (population) before financial (front-left) to handle overlap at small volumes.
- Side panel doubles as a live legend: shows the current preset name (or "Custom" once any slider deviates from a preset by more than 2 percentage points) and a 3-row coverage table with colored swatches matching the cube faces.
- Initialization calls `applyPreset('mid')` at the end of setup so the cube and panel are consistent with the "Middle-income" preset on first render.
- Axis labels are placed at the highest screen-projected outer corner for the population axis (`o111`, the back-top corner) so they sit above the cube, not behind it. Services and Costs labels are anchored to their respective base corners with horizontal-alignment hints.

## Layout Review
- Cycle 1: outer wireframe extended past the top of the canvas (overlapped the title); axis labels "(How much?)" and "Services (What?)" clipped at the canvas edges; profile showed "Custom" on first render because slider defaults didn't match any preset.
- Cycle 2: shifted cube anchor to `cy = y + h - 60` and tightened `size = min(w*0.32, h*0.55)` so the wireframe fits; broke each axis label into two lines (e.g. "Costs" / "(How much?)"); added `applyPreset('mid')` at the end of setup.
- Cycle 3: moved the Population label from `o010` (top-front of outer cube — overlapped wireframe edges) to `o111` (top-back, highest screen point), eliminating overlap with the cube top edges.
- All checklist items now PASS: title visible, cube fully inside draw region, all axis labels readable, sliders/preset buttons/Reset visible in control strip, panel legend correct.

## CANVAS_HEIGHT
`// CANVAS_HEIGHT: 640`

## Files
- docs/sims/uhc-coverage-cube/main.html
- docs/sims/uhc-coverage-cube/uhc-coverage-cube.js
- docs/sims/uhc-coverage-cube/uhc-coverage-cube.png
