# MicroSim Generation Log: ihr-pheic-timeline

- **Sim ID:** ihr-pheic-timeline
- **Chapter:** 09-global-health
- **Library:** p5.js
- **CANVAS_HEIGHT:** 418 (iframe height in chapter = 420)
- **Status:** implemented
- **Date:** 2026-05-28

## Spec source

Extracted from `docs/chapters/09-global-health/index.md` under
"#### Timeline: IHR Evolution and PHEIC Declarations". Spec called for a
horizontal scrollable two-swim-lane timeline (IHR Milestones / PHEIC
Declarations), zoomable 2019–2024 cluster, color-coded markers (blue
diamond = IHR legal milestone, red circle = SARS pre-2005 outbreak,
orange + green ring = PHEIC ended, pulsing orange = PHEIC ongoing), a
click-for-details panel, and a "Compare Response" overlay comparing
H1N1 / Ebola 2014 / COVID-19.

## Files written

- `docs/sims/ihr-pheic-timeline/main.html` — replaced stub. p5.js CDN
  link, schema meta tag, plain `<main></main>` (no id), refs sim JS.
- `docs/sims/ihr-pheic-timeline/ihr-pheic-timeline.js` — full impl with
  `// CANVAS_HEIGHT: 418` on line 2; 11 events including 1969 IHR, 2003
  SARS, 2005 IHR-revised, and every PHEIC declaration (H1N1, Polio
  ongoing, Ebola West Africa, Zika, Ebola DRC, COVID-19, Mpox 2022, Mpox
  2024 ongoing); piecewise yearToX function that expands the 2019–2024
  region under slider control; compare overlay with three-column
  side-by-side response-timing table; close button on overlay.
- `docs/sims/ihr-pheic-timeline/index.md` — frontmatter with title,
  description, image, og:image, hide -toc; H1, iframe at height 420,
  fullscreen button, learning objective, Specification block.
- `docs/sims/ihr-pheic-timeline/metadata.json` — Dublin Core +
  bloomLevel "Understand (L2)", bloomVerb "explain",
  completion_status "implemented", chapter_number 9.
- `docs/sims/ihr-pheic-timeline/ihr-pheic-timeline.png` — captured
  screenshot for og:image.

## Layout review cycles

### Cycle 1
Issues found:
- Lane labels ("IHR Milestones" / "PHEIC Declarations") collided with
  the leftmost 1969 marker.
- Bottom-lane PHEIC labels overlapped each other in the dense 2014–2024
  cluster (Polio / Zika / Ebola / Mpox stacked on top of each other).
- The 1969 year label sat on top of its diamond marker.
- Legend on the controls strip was partly behind the Reset button; the
  "Legend" header was clipped.

Fixes:
- Carved out a `leftLabelW=110px` left gutter for swim-lane labels and
  reduced plot `marginX` and `usableW` to match (in both `draw` and the
  hit-test in `mousePressed`).
- Switched bottom-lane labels to a 3-level vertical stagger with a
  connector tick from marker to label.
- Tightened `shortLabel()` to drop parentheticals and cap length at 12
  chars so labels fit in the stagger lanes.
- Repositioned legend to start at `max(containerWidth - 210, 585)` and
  switched it to a compact 2×2 chip grid without a "Legend" header so
  the four items always render.

### Cycle 2
Verified screenshot at 800×418:
- Title, year axis (1969–2024), both swim lanes, all 11 markers, all
  bottom-lane labels, details-panel placeholder text, zoom slider,
  Compare Response button, Reset button, and the four legend chips are
  all fully visible with no clipping or overlap.
- Verdict: PASS.

## Summary

- sim_id: ihr-pheic-timeline
- library: p5.js
- CANVAS_HEIGHT: 418
- layout verdict: PASS (after 2 cycles)
- log path: logs/microsim-ihr-pheic-timeline-generation.md
