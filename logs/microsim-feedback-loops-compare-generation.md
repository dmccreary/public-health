# MicroSim Generation Log — feedback-loops-compare

**Status:** PASS
**Date:** 2026-05-28
**Library:** p5.js
**Canvas height:** 720

## Summary

Built a side-by-side comparison of a reinforcing loop (epidemic spread: Infected Individuals -> Transmission Events -> New Cases) and a balancing loop (population immunity: Susceptible Population -> Vaccination Rate -> Immune Population -> Transmission Rate). Each arrow carries a +/- polarity badge that the student clicks for a plain-English explanation of that link. A live SIR-style simulation chart below the loops plots Infected (red, R-loop) vs. Immune (green, B-loop) over time. Controls: Run/Pause, Reset, Speed slider.

## Files

- `docs/sims/feedback-loops-compare/main.html`
- `docs/sims/feedback-loops-compare/feedback-loops-compare.js`
- `docs/sims/feedback-loops-compare/feedback-loops-compare.png`

## Layout review

Cycle 1 — Chart title and several other text lines appeared severely shifted left, with the start of long strings off-canvas. Loops, controls, and buttons rendered fine.

Cycle 2 — Tried push/pop and explicit textAlign(LEFT, TOP); no change.

Cycle 3 — Diagnosed as a **p5.js constant-shadowing footgun**. The script had declared `const LEFT = {cx,cy,r}` and `const RIGHT = {cx,cy,r}` for the two loop centers, which silently shadowed p5's `LEFT` and `RIGHT` alignment constants. `textAlign(LEFT, TOP)` was then being called with an object instead of the alignment integer, and p5 silently fell back to its default CENTER alignment, causing every long left-aligned string to render centered on its x position (left half off-canvas). Renamed the globals to `L_LOOP` and `R_LOOP`. PASS.

## Footgun noted

Naming a global `LEFT`, `RIGHT`, `CENTER`, `TOP`, or `BOTTOM` shadows p5.js's alignment constants in global mode. (1) Silent — no warning, no error. (2) Easy to trigger — these are tempting names for layout regions. (3) Delayed/invisible damage — symptoms look like a generic layout bug. Structural fix: never reuse bare uppercase p5 constants as identifiers.
