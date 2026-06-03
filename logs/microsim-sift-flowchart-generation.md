# Session Log — sift-flowchart

**Date:** 2026-05-28
**Library:** p5.js
**Status:** Implemented + layout-reviewed (PASS cycle 3)

## Topic

Interactive flowchart of Mike Caulfield's SIFT method (Stop,
Investigate the Source, Find Better Coverage, Trace Claims) for
evaluating health information online.

## Design

Two-column layout:

- Left: vertical flowchart with four colored step boxes
  - S (red) Stop
  - I (orange) Investigate the Source
  - F (yellow) Find Better Coverage
  - T (green) Trace Claims, Quotes, Media
- Right: detail panel — header strip in the step color, then
  Definition, How-to (3 bullets), and a worked COVID-19 example.

A top "You encounter a health claim online →" input strip frames the
flowchart entry. Between each step is a labeled connector showing the
decision question that prompts moving to the next step (e.g. "Is the
source familiar and trusted?").

## Interaction

- Click any S/I/F/T box → right panel updates with that step's
  definition, how-to bullets, and COVID-19 example.
- Start Over resets to step S.
- Default-selected: S (so the panel is never blank).

## Layout Review

**Cycle 1:** FAIL. Diamond connectors were too narrow — the longer
connector labels ("Where did this claim…") overflowed and got clipped.

**Cycle 2:** Tried larger diamonds — text still wrapped awkwardly
because diamond geometry constrains usable text width.

**Cycle 3:** Replaced diamonds with rounded label pills on a vertical
arrow. Connector questions now read cleanly across the full width.
Reduced overall canvas height (the original 720 left empty space
below the flowchart). PASS.

## CANVAS_HEIGHT

`// CANVAS_HEIGHT: 580`

## Files

- `docs/sims/sift-flowchart/main.html`
- `docs/sims/sift-flowchart/sift-flowchart.js`
- `docs/sims/sift-flowchart/sift-flowchart.png`
