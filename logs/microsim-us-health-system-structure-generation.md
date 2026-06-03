# Session Log — us-health-system-structure

**Date:** 2026-05-28
**Library:** vis-network
**Status:** Implemented + layout-reviewed (PASS first cycle)

## Topic

Layered network diagram of the US health system showing federal
agencies, state and local health departments, private insurance,
safety-net hospitals, and Federally Qualified Health Centers.

## Design

- **Tiered layout** with static positions:
  - Federal: HHS at top, CDC / CMS / NIH / FDA below
  - State: State Health Dept, State Medicaid
  - Local: Local Health Dept
  - Private: Private Insurance plans
  - Safety net: Safety-Net Hospitals, FQHCs
- **Color coding** by tier: federal dark blue, state teal, local green,
  private purple, safety net orange, FQHC amber (with dark text for
  contrast).
- **Edge types:**
  - Solid edges represent funding flows (CMS → Medicaid "federal match",
    Medicaid → Hospitals "DSH", HHS → FQHC "HRSA 330", State HD →
    Local HD "pass-through", Medicaid → Private "MCO contracts").
  - Dashed edges represent regulatory authority / guidance (FDA → Plans,
    CDC → State HD, State HD → Local HD regulatory).
- **Filter dropdown** lets the learner isolate Governmental, Insurance,
  or Safety Net tiers (hides non-matching nodes and any edges with a
  hidden endpoint).
- **Legend** with colored swatches plus a "— funding / ┄ regulatory"
  line-type key is rendered below the canvas.

## Interaction

Clicking any node opens the right panel with three fields:
- **Mandate** — what the agency does
- **Funding** — where its money comes from
- **Example** — a concrete program (NNDSS, DSH, HRSA Section 330, etc.)

## Layout Review

**Cycle 1:** PASS. All nodes legible, hierarchy readable, edge labels
visible, legend complete. The HHS → FQHC ("HRSA 330") edge passes near
the NIH node but its label still reads cleanly.

## CANVAS_HEIGHT

`// CANVAS_HEIGHT: 580`

## Files

- `docs/sims/us-health-system-structure/main.html`
- `docs/sims/us-health-system-structure/us-health-system-structure.js`
- `docs/sims/us-health-system-structure/us-health-system-structure.png`
