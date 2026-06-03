# Session Log — dshea-regulatory-gap

**Date:** 2026-05-28
**Library:** p5.js
**Status:** Implemented + layout-reviewed (PASS cycle 1)

## Topic

Side-by-side comparison of the U.S. pharmaceutical drug pre-market
pathway vs. the dietary supplement pathway under the 1994 Dietary
Supplement Health and Education Act (DSHEA), making the regulatory
gap visually unmistakable.

## Design

Two columns:

- Left (blue): Pharmaceutical Drug — 7 sequential steps from
  Preclinical Research through Post-Market Surveillance, each
  annotated with typical duration and cost.
- Right (amber): Dietary Supplement — 5 steps from Formulate Product
  through Post-Market Complaints.

The "Self-Certify Safety" block on the supplement side is drawn as a
tall dashed amber block that vertically spans the same y-range as
**three** drug steps (Phase I, II, III). This makes the literal
regulatory gap visible: where drug makers run three trials, supplement
makers self-attest. The block is labeled "NOT REQUIRED for supplements"
in red.

Headers show summary timeline: drugs ~12 years and ~$1–2B vs.
supplements weeks-to-months and low cost.

## Interaction

- Click any step on either side → bottom info panel shows 2–3
  sentences describing what that step involves (or what gap exists).
- Reset clears selection and shows the default "DSHEA Gap" summary.
- Hover feedback via cursor change.

## Layout Review

**Cycle 1:** PASS. Both columns fit cleanly with 24px gutters, the
spanning self-cert block is visibly larger than other steps and
correctly aligned with the drug Phase I-III rows, info panel sits
below without overlap, all step text readable.

## CANVAS_HEIGHT

`// CANVAS_HEIGHT: 720`

## Files

- `docs/sims/dshea-regulatory-gap/main.html`
- `docs/sims/dshea-regulatory-gap/dshea-regulatory-gap.js`
- `docs/sims/dshea-regulatory-gap/dshea-regulatory-gap.png`
