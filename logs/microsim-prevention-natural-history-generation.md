# Session Log — prevention-natural-history

**Date:** 2026-05-28
**Library:** p5.js
**Bloom Level:** Understand (L2)
**Status:** Implemented + layout-reviewed (1 cycle, PASS with minor wrap)

## Learning Objective

Students can explain how the four prevention levels map onto the stages
of natural history of disease and, for a given disease example, identify
which prevention strategy is appropriate at each stage.

## Implementation Notes

- **Five-stage timeline:** No Risk Factors → Risk Factors Present →
  Subclinical Disease → Clinical Disease → Outcome. Each stage colored
  on a green-yellow-orange-red-gray gradient. Per-disease stage widths
  (proportions) are encoded in `diseases[disease].stageFrac` and sum to 1.
- **Animated patient dot:** moves left → right along the timeline; click
  on a bracket pauses the animation and highlights it gold.
- **Four prevention brackets:** Primordial (over Stage 1), Primary
  (Stage 2), Secondary (Stage 3), Tertiary (Stages 4–5). Each draws as a
  colored bracket with a labeled cap. The selected bracket pops a yellow
  highlight box.
- **Disease presets:** Influenza, Type 2 Diabetes, Lead Poisoning —
  each changes both the stage widths AND the example intervention list
  in the info panel.
- **Right info panel:** when a bracket is clicked, shows level title,
  when-it-acts, goal, and 2–3 disease-specific intervention examples.
- **Stage tooltips:** hovering a stage box pops a small floating panel
  with the "Disease risk: …" text required by the L2 spec.

## Layout Review

**Cycle 1:** PASS — five color-coded stage cells, four brackets all
visible, animated dot moves smoothly, info panel readable, controls fit
in the 120-px strip. **Minor note:** in narrow stage cells the
two-word stage labels ("Subclinical Disease") wrap inside the cell.
Acceptable; preserves readability.

## Files

- `/Users/dan/Documents/ws/public-health/docs/sims/prevention-natural-history/main.html`
- `/Users/dan/Documents/ws/public-health/docs/sims/prevention-natural-history/prevention-natural-history.js`
- `/Users/dan/Documents/ws/public-health/docs/sims/prevention-natural-history/prevention-natural-history.png`
