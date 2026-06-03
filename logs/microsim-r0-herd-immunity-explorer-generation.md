# Session Log — r0-herd-immunity-explorer

**Date:** 2026-05-28
**Library:** p5.js
**Bloom Level:** Apply (L3)
**Status:** Implemented + layout-reviewed (1 patch: slider/button overlap)

## Learning Objective

Apply (L3) the relationship between R₀ and the herd immunity threshold
by adjusting R₀ values for different pathogens and calculating the
required vaccination coverage.

## Implementation Notes

- **Transmission tree:** three generations from one index case. Gen-1
  fan-out capped at 10 nodes (for visual clarity even when R₀ = 18);
  gen-2 fan-out per gen-1 capped at 4. The real numeric R₀ is what drives
  HIT and Rₜ calculations — the cap only affects the diagram.
- **Immunity randomization:** each non-index node is independently
  marked immune with probability = slider %. Immune nodes are gray with
  an X overlay; infected nodes are red.
- **Preset buttons:** Flu (1.3), COVID OG (3.0), Omicron (12.0),
  Measles (15.0). Plus a "Re-randomize immunity" button so students can
  see the stochastic variation at a fixed immunity %.
- **Right panel:** key values — R₀, HIT = 1 − 1/R₀ in green, the
  step-by-step Rₜ calculation, an HIT coverage bar (green fill = current
  immunity %, red marker = HIT threshold), and a colored status bar
  (red "Epidemic growing", yellow "Endemic equilibrium", green "Epidemic
  declining").

## Layout Review

**Cycle 1:** sliders too narrow; preset buttons overlapped the
slider thumbs because the R₀ / Immune slider labels were left of the
sliders and the preset buttons were close behind.

**Patch:** widened sliders to 200 px, shortened labels to "R₀" / "Immune %",
shifted preset buttons rightward (360 / 470 / 590 px), moved the live
readout (R₀ = 3.0, Immune = 0%, Rₜ = 3.00) onto a third bottom row to
avoid the slider thumbs.

**Cycle 2:** PASS — all controls visible, no overlap, key values panel
fully populated, transmission tree visible across all three generations.

## Files

- `/Users/dan/Documents/ws/public-health/docs/sims/r0-herd-immunity-explorer/main.html`
- `/Users/dan/Documents/ws/public-health/docs/sims/r0-herd-immunity-explorer/r0-herd-immunity-explorer.js`
- `/Users/dan/Documents/ws/public-health/docs/sims/r0-herd-immunity-explorer/r0-herd-immunity-explorer.png`
