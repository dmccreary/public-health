# Session Log — health-belief-model

**Date:** 2026-05-28
**Library:** vis-network
**Status:** Implemented + layout-reviewed (PASS first cycle)

## Topic

Interactive concept map of the Health Belief Model, used in social
and behavioral health to predict whether someone will adopt a
health-protective behavior.

## Design

- Central node "Health-Protective Behavior" (teal ellipse) anchored at
  right.
- Six perceptual constructs feed into it with labeled edges:
  - Perceived Susceptibility → **increases**
  - Perceived Severity → **increases**
  - Perceived Benefits → **increases**
  - Perceived Barriers → **reduces** (red edge)
  - Self-Efficacy → **increases**
  - Cue to Action → **triggers**
- Modifying Factors (gray) connects via dashed edges to the four
  perceptual nodes (Susceptibility, Severity, Benefits, Barriers),
  consistent with the standard HBM diagram (modifying factors shape
  perceptions, not behavior directly).
- Color coding follows the spec: threat perceptions = blue, benefits =
  green, barriers = orange, self-efficacy = purple, cue = yellow,
  outcome = dark teal, modifying = gray.

## Interaction

Clicking any node opens the right panel with:
1. One-sentence definition
2. COVID-19 vaccine uptake example
3. Physical activity behavior example

Reset View button restores the default panel and re-fits the network.

## Layout Review

**Cycle 1:** PASS. All nodes legible at the default fit, all edge
labels readable, the "reduces" edge is visibly red so the negative
relationship is obvious, modifying-factors dashed edges differ
clearly from the solid arrows to the outcome.

No patches needed.

## CANVAS_HEIGHT

`// CANVAS_HEIGHT: 530`

## Files

- `docs/sims/health-belief-model/main.html`
- `docs/sims/health-belief-model/health-belief-model.js`
- `docs/sims/health-belief-model/health-belief-model.png`
