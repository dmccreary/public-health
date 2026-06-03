# Session Log — risk-assessment-framework

**Date:** 2026-05-28
**Library:** vis-network
**Status:** Implemented + layout-reviewed (PASS first cycle)

## Topic

The 1983 NRC "Red Book" four-step environmental risk assessment
framework: Hazard Identification → Dose-Response Assessment →
Exposure Assessment → Risk Characterization.

## Design

- Four nodes laid out left-to-right at the same y, color-coded with a
  light-to-dark blue gradient by step number (lightest = step 1,
  darkest = step 4).
- Hazard Identification's box gets dark text because the background
  (#bbdefb) is too pale for white.
- Hover highlights the outgoing edge in orange via
  `edges.color.highlight / hover`.

## Interaction

Clicking any step expands the right panel with:
- One-sentence definition of what the step does
- The **key question** the step answers (e.g., "How much exposure
  produces how much effect?")
- The **output metric(s)** the step produces (IARC group, RfD/CSF,
  CDI, HQ / ELCR — exactly as the spec asks)

Reset button collapses the panel back to the default view.

## Layout Review

**Cycle 1:** PASS. All four boxes legible, arrows clearly directional,
right panel shows the prompt + reset button. The canvas has some
vertical whitespace around the row, which is acceptable for a
left-to-right flow.

## CANVAS_HEIGHT

`// CANVAS_HEIGHT: 510`

## Files

- `docs/sims/risk-assessment-framework/main.html`
- `docs/sims/risk-assessment-framework/risk-assessment-framework.js`
- `docs/sims/risk-assessment-framework/risk-assessment-framework.png`
