# Session Log — public-health-history-timeline

**Date:** 2026-05-28
**Library:** vis-timeline
**Bloom Level:** Remember (L1)
**Verb:** identify
**Status:** Implemented + layout-reviewed (PASS first cycle)

## Learning Objective

Students identify at least six pivotal events in public health history
and explain the conceptual shift or institutional development each
one represented.

## Design

16 milestones from 1796 (Jenner) to 2003 (SARS), color-coded by era:

| Era | Years | CSS class | Color |
|---|---|---|---|
| Sanitation | 1750–1870 | `era-san` | Tan #d7c4a3 |
| Germ theory | 1870–1930 | `era-germ` | Light blue #bbdefb |
| Institutional | 1930–1980 | `era-inst` | Teal #80cbc4 |
| Evidence-based | 1980– | `era-evid` | Green #a5d6a7 |

Items are stacked (`stack: true`) so dense periods (1880s–1900s) layer
vertically without overlap.

## Interaction

- **Filter pills** (All / Epidemiology / Sanitation / Institutions /
  Vaccines / Policy) — non-matching items fade to ~18 % opacity rather
  than being removed, so the learner can see *where* the missing
  categories sit in time.
- **Click any milestone** to open the right panel with a 2–3 sentence
  description and the category tag.
- Zoom and pan are enabled (5-year minimum, 300-year maximum) so
  dense regions can be explored.

## Layout Review

**Cycle 1:** PASS. All 16 items visible in the default fit; era-color
coding obvious; filter buttons accessible; right panel ready for click.

Minor cosmetic note: the era-legend strip at the bottom is wide enough
that its right end sits under the side panel column. Acceptable —
the era colors are also visible inline on the timeline items
themselves, so the legend is supplementary.

## CANVAS_HEIGHT

`// CANVAS_HEIGHT: 460`

## Files

- `docs/sims/public-health-history-timeline/main.html`
- `docs/sims/public-health-history-timeline/public-health-history-timeline.js`
- `docs/sims/public-health-history-timeline/public-health-history-timeline.png`
