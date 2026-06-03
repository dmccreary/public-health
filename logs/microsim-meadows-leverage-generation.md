# MicroSim Generation Log — meadows-leverage

**Status:** PASS
**Date:** 2026-05-28
**Library:** p5.js
**Canvas height:** 720

## Summary

Built a vertical ranked list of Donella Meadows's 12 leverage points, ordered most-powerful at the top (#1, transcend paradigms — deep orange) to least-powerful at the bottom (#12, parameters — pale blue). Each rung is clickable; the right panel shows the canonical name, plain-English description, a public-health example, and a "why this rank?" note. A checkbox swaps the labels from canonical names to short public-health policy examples (e.g., "Federal cigarette tax level" for #12).

## Files

- `docs/sims/meadows-leverage/main.html`
- `docs/sims/meadows-leverage/meadows-leverage.js`
- `docs/sims/meadows-leverage/meadows-leverage.png`

## Layout review

Cycle 1 — Three of the longer rung labels were clipped at the right edge of their bars.
Cycle 2 — Widened the list column from 360 to 460 px, shifted the detail panel right, reduced rung font from 12 to 11, and added truncation with ellipsis as a safety net. All 12 labels now display fully. PASS.
