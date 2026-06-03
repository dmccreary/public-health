# Session Log — sift-supplement

**Date:** 2026-05-28
**Library:** p5.js
**Status:** Implemented + layout-reviewed (PASS cycle 1)

## Topic

Companion to the SIFT flowchart that walks students through applying
the SIFT method to a specific supplement health claim — the misspelled
"Tumeric CURES inflammation and reverses arthritis — 1,200 patients
CURED, study shows."

## Design

Horizontal layout:

- Quoted claim box in soft amber across the top, using the original
  misspelling ("Tumeric") to model how to recognize sloppy primary
  marketing copy.
- Row of four large color-coded SIFT buttons (S red, I orange, F
  blue, T green). Each shows its acronym letter in a colored chip and
  the action verb.
- Large detail/verdict panel below.

Each click reveals the worked SIFT-on-this-claim payload from the
spec:

- S: emotional-hook check
- I: simulated NaturalHealthToday.com header with no author, no
  date, an affiliate link, and red-flag bullets
- F: simulated search results (Cochrane "insufficient evidence",
  PubMed 23-patient trial, Arthritis Foundation "promising but not
  conclusive")
- T: traces "1,200 patients" back to a company-sponsored conference
  abstract that bundled eight different studies

## Interaction

- Click S/I/F/T → detail panel populates with that step's findings.
- "Show Verdict" combines all four into a summary panel with each
  step's verdict line plus a final "Do not act on this claim"
  conclusion in red.
- Reset clears the selection and verdict.

## Layout Review

**Cycle 1:** PASS. Claim quote visible at top, four SIFT buttons in a
clean horizontal row, detail panel fills the middle without overlap,
Reset and Show Verdict buttons visible inside the control band.

## CANVAS_HEIGHT

`// CANVAS_HEIGHT: 660`

## Files

- `docs/sims/sift-supplement/main.html`
- `docs/sims/sift-supplement/sift-supplement.js`
- `docs/sims/sift-supplement/sift-supplement.png`
