# MicroSim Generation Log: ntd-geographic-map

## Summary

- **Sim ID:** ntd-geographic-map
- **Title:** Neglected Tropical Disease Geographic Distribution
- **Source chapter:** docs/chapters/09-global-health/index.md
- **Library:** p5.js
- **Bloom level:** Understand (L2)
- **Verb:** identify
- **CANVAS_HEIGHT:** 560 (iframe height = 562px)
- **Status:** implemented

## Learning Objective

Students can identify the geographic regions where neglected tropical diseases
concentrate and describe how specific NTDs (soil-transmitted helminths,
schistosomiasis, lymphatic filariasis, trachoma, onchocerciasis) cluster in
different parts of the tropical world.

## Instructional Design Check

- Bloom Level: Understand (L2)
- Bloom Verb: identify
- Recommended Pattern: Step-through / state-revealing visualization with
  concrete data visibility — implemented as click-to-reveal per-region detail
  panels with two cross-cutting filters (per-disease, per-capita vs total).
- Specification Alignment: aligned (no scope changes from chapter spec)
- Rationale: For an "identify" objective, the learner needs to SEE where each
  NTD concentrates. Click-to-inspect + filter dropdowns give immediate
  concrete data (top NTDs, DALY count, PC program status) without continuous
  animation, which is appropriate for Understand-level cognition.

## Files Created / Modified

| File | Action |
|------|--------|
| `docs/sims/ntd-geographic-map/main.html` | Replaced stub with full p5.js HTML shell + schema meta tag |
| `docs/sims/ntd-geographic-map/ntd-geographic-map.js` | New (~430 lines) |
| `docs/sims/ntd-geographic-map/index.md` | New (frontmatter, iframe, learning obj, specification, how-to) |
| `docs/sims/ntd-geographic-map/metadata.json` | New (Dublin Core + educational metadata + controls + assumptions + limitations) |
| `docs/sims/ntd-geographic-map/ntd-geographic-map.png` | New (Chrome headless screenshot, 800x560, ~105K) |

## Implementation Notes

- **Stylized world map** drawn with hand-tuned normalized polygons for the
  Americas, Africa + Europe, Asia, and Oceania. Equator dashed line included
  as a teaching cue for the tropical belt.
- **9 endemic regions**: West Africa, Central Africa, East Africa, Southern
  Africa, MENA, South Asia, Southeast Asia, Amazon Basin, Central America.
  Each has illustrative GBD-style burden (thousands of DALYs), per-100k rate,
  PC program status, top 3 NTDs, and per-disease transmission multipliers.
- **Color ramp** is a single-hue cream → dark brick sequential scale
  (RAMP_LOW / RAMP_HIGH) that rescales when the user picks a single NTD.
  Regions where a selected NTD is not endemic render in the "Not endemic"
  swatch color.
- **Two dropdowns** (createSelect): NTD filter (all + 5 individual diseases)
  and Metric toggle (total DALYs vs per 100,000 population). One Reset
  button.
- **Click-to-inspect** uses ray-cast point-in-polygon hit testing in screen
  coordinates against each region polygon. Hover shows a tooltip with the
  region's current metric value; click loads the detail panel.
- **Data attribution** baked into the control area: "Illustrative data
  modeled on IHME GBD 2021. Not a substitute for official WHO/IHME
  estimates."

## Layout Review (Step 9)

**Cycle 1** — Screenshot captured at 800x560. Walked visual checklist:

- PASS: Title centered, no clipping
- PASS: Controls (2 selects + button) fully visible, no overlap with each
  other
- PASS: Side info panel renders within drawing region
- PASS: Color ramp legend rendered correctly with gradient swatches and end
  labels
- PASS: "Not endemic" swatch visible
- PASS: Equator dashed line and attribution rendered
- PASS: Data attribution footer line visible
- FAIL: Africa region polygons overlap each other (West Africa / Central
  Africa labels touching; MENA polygon overlaps East Africa)

**Fix applied** — Repositioned all five Africa polygons (wafrica, cafrica,
eafrica, safrica, mena) with separating margins between bounding boxes. Also
shortened "Central America" label to "C. America" to fit its small polygon.
Nudged South Asia and Southeast Asia outward from each other.

**Cycle 2** — Re-captured at 800x560.

- PASS: Africa polygons now visibly separated; centroid labels readable
- PASS: All other prior checks still pass
- ACCEPTABLE: Small residual visual overlap between West Africa label edge
  and Central Africa polygon edge — labels still readable, no information
  lost. Surfacing as residue rather than over-tweaking.

Stopped after 2 cycles per skill contract (max 3).

## Iframe Height Reconciliation

- `// CANVAS_HEIGHT: 560` in line 2 of `ntd-geographic-map.js`
- Computed: drawHeight (470) + controlHeight (90) = 560 ✓
- Iframe height in chapter (`docs/chapters/09-global-health/index.md` line
  202): currently `500px` — **the standalone sim index.md uses 562px (the
  correct value).** The chapter file iframe will be reconciled by the
  centralized `fix-iframe-heights.py` pass at end of batch (not run here per
  the single-sim contract; chapter file is not edited per task constraints).

## Verdict

Implemented and layout-verified. Ready for inclusion in the chapter 9
batch standardization sweep (fix-iframe-heights, update-mkdocs-nav,
validate-sims) when run.
