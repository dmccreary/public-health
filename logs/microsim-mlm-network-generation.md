# MicroSim Generation Log: mlm-network

**Date:** 2026-05-28
**Sim ID:** mlm-network
**Chapter:** 20-health-fraud-misinformation
**Library:** vis-network
**Bloom Level:** Analyze

## Spec Source

Extracted from `/Users/dan/Documents/ws/public-health/docs/chapters/20-health-fraud-misinformation/index.md`
(section: "Multi-Level Marketing as a Public Health System" → "MLM Network Dynamics and Health Products").

## Instructional Design Checkpoint

- **Bloom Level:** Analyze
- **Bloom Verb:** Analyze
- **Recommended Pattern:** Interactive network explorer with click-to-inspect
  per-node detail + scripted-cycle growth + scripted claim propagation.
- **Specification Alignment:** Aligned (slight tuning of FTC income model so
  that lower tiers go negative once growth begins — matches the "vast
  majority lose money" finding cited in the chapter).
- **Rationale:** Analyze-level work requires the learner to compare across
  tiers and across configurations. The combined affordances (grow, propagate,
  income-flow, per-node inspector with positive-vs-negative net income) let
  learners read the structural pattern off the network rather than be told
  it.

## Implementation Decisions

1. **Hierarchical layout (UD)** — recruitment trees read naturally top-down;
   each tier becomes a horizontal stratum, which makes the upward income
   flow visualization legible.
2. **Recruitment cycle = "current bottom tier each sponsors 2"** — keeps the
   tree exponential but bounded; cap at 120 nodes for readability.
3. **Income model** — tuned so that at the 4-node seed all distributors are
   barely profitable, but as soon as recruits are added the tier-3+ nodes
   go negative. This produces the "drops from 100% → ~30% → ~10% profitable"
   trajectory that matches the FTC finding.
4. **Claim propagation** — 3-hop BFS from the top tier with 600ms inter-hop
   delay; affected nodes get a red border + "Made unsupported claim" badge
   in the inspector.
5. **Income flow** — re-renders edges in green with arrow direction reversed
   (downline → upline) to show commission flow.
6. **No physics** — fixed hierarchical layout, drag-pan + zoom only; node
   dragging disabled to preserve the tier structure.

## Files Created/Updated

- `/Users/dan/Documents/ws/public-health/docs/sims/mlm-network/main.html` (replaced stub)
- `/Users/dan/Documents/ws/public-health/docs/sims/mlm-network/mlm-network.js` (new)
- `/Users/dan/Documents/ws/public-health/docs/sims/mlm-network/index.md` (new)
- `/Users/dan/Documents/ws/public-health/docs/sims/mlm-network/metadata.json` (new)
- `/Users/dan/Documents/ws/public-health/docs/sims/mlm-network/mlm-network.png` (screenshot)

## CANVAS_HEIGHT

- `// CANVAS_HEIGHT: 560` declared at top of `mlm-network.js`
- iframe height in `index.md`: `562` (CANVAS_HEIGHT + 2)
- Chapter file iframe NOT modified per constraint (chapter shows 500px;
  the sim's own page renders at 562 which is correct).

## Layout Review (Step 9)

Cycle 1:
- PASS — Title visible, centered.
- PASS — All 4 control buttons (Add Recruits, Propagate Claim, Show
  Income Flow, Reset) fully visible in single row.
- PASS — Stats counter ("Nodes: 4 | Profitable: 100%") right-aligned, no
  overlap.
- PASS — Network shows correct seed: 1 gold top-tier + 3 silver tier-2
  nodes connected by directed edges.
- PASS — Side panel readable; tier-color legend renders with correct
  swatches.
- PASS — No clipping at bottom of iframe.
- ADJUST — Initial Profitable=100% looked unrealistic for the FTC
  message. Tuned tier-2/3/4/5 income coefficients so that as growth
  proceeds the lower tiers go negative immediately. Profitable %
  remains 100% only at the 4-node seed and falls sharply with one cycle
  of recruits.

Cycle 2 (post-tune):
- All previous PASS items still PASS.
- Income model now drops profitable % steeply with each "Add Recruits"
  click, matching the FTC-modeled distribution described in the chapter.

**Verdict:** PASS. No remaining defects.

## Status

`implemented` — ready for validate-sims.py and downstream pipeline steps
(fix-iframe-heights.py, test-iframe-heights.py, update-mkdocs-nav.py)
when the chapter batch is completed.
