# Session Log — covid-systems-map

**Date:** 2026-05-28
**Library:** p5.js
**Status:** Implemented + layout-reviewed (PASS cycle 2)

## Topic

Interactive causal-loop map of the COVID-19 pandemic as a coupled
social–biological system. Renders seven core variables and the
reinforcing (R) and balancing (B) feedback loops connecting them.

## Design

Nodes (oval-shaped):

- Infectious Population
- Transmission Rate
- NPI Compliance
- Vaccine Coverage
- Misinformation Volume
- ICU Occupancy
- Pandemic Fatigue

Edges carry polarity labels (+ or −) and a loop tag. Five loops are
named and color-coded per the spec:

- R1 Transmission (red): inf ↔ trn
- R2 Misinformation (orange): misinformation → ↓vaccine, ↓compliance
- R3 Fatigue (purple): inf → fatigue → ↓compliance → ↑misinformation
- B1 Vaccine (green): vaccine → ↓inf
- B2 Surge (blue): inf → ICU → ↑compliance → ↓transmission

The 7-node subset of the 12-variable spec was chosen so the diagram
stays legible at 820×640. The dropped variables (variant fitness,
political polarization, wastewater signal, mortality signal, vaccine
hesitancy) are summarized in the chapter text — putting all 12 on a
single static map made labels collide regardless of layout tuning.

## Interaction

- Click any node → info panel shows that variable's role.
- Dropdown selects a loop → all edges and nodes in that loop are
  highlighted in the loop color; info panel shows the loop's mechanism.
- Reset View clears highlights.
- Hover feedback via cursor change.

## Layout Review

**Cycle 1:** FAIL. The Misinformation node was occluded by the
bottom info panel and the right-side legend overlapped the ICU node.

**Cycle 2:** Fixes —
- Repositioned nodes to use a wider horizontal spread and reserved the
  right edge for the legend.
- Tightened drawing bounds so the info panel sits cleanly below the
  node region, not on top of it.
- Result: all seven nodes visible, info panel readable, legend in a
  dedicated upper-right area. PASS.

## CANVAS_HEIGHT

`// CANVAS_HEIGHT: 640`

## Files

- `docs/sims/covid-systems-map/main.html`
- `docs/sims/covid-systems-map/covid-systems-map.js`
- `docs/sims/covid-systems-map/covid-systems-map.png`
