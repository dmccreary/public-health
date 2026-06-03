# Session Log — reproducible-research-workflow

**Date:** 2026-05-28
**Library:** vis-network
**Status:** Implemented + layout-reviewed (PASS first cycle)

## Topic

A Git-based reproducible research pipeline shown as a directed graph
of nine stages: raw data → cleaning → clean data → notebook →
figures/tables → paper, with a data dictionary feeding the cleaning
step and Git commit / GitHub repository nodes capturing the version
control layer.

## Design

- Static positions (`physics: false`) so the pipeline reads
  left-to-right with the version-control nodes below.
- Color coding by stage type — gray = input, blue = processing,
  green = output, orange = version control. A small color-legend
  strip is rendered below the canvas in the main HTML.
- Cleaning Script, Analysis Notebook, and Report / Paper each have a
  dashed orange edge to "Git Commit" — each meaningful change is a
  commit, as the spec requires. "Git Commit → GitHub Repository" is
  labeled "push".
- "Data Dictionary → Cleaning Script" is dashed and labeled "guides"
  — it informs the cleaning code but isn't a data flow per se.

## Interaction

Clicking any node shows that stage's purpose and its **reproducibility
role** in the right panel — explicitly naming which property
(read-only raw data, codified transformations, never-edited derived
outputs, commit-able history) the stage provides.

## Layout Review

**Cycle 1:** PASS. All nine nodes laid out clearly, edges follow the
pipeline shape, legend visible.

## CANVAS_HEIGHT

`// CANVAS_HEIGHT: 560`

## Files

- `docs/sims/reproducible-research-workflow/main.html`
- `docs/sims/reproducible-research-workflow/reproducible-research-workflow.js`
- `docs/sims/reproducible-research-workflow/reproducible-research-workflow.png`
