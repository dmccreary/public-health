# Session Log — dag-variable-structures

**Date:** 2026-05-28
**Library:** vis-network
**Bloom Level:** Differentiate (L4)
**Status:** Implemented + layout-reviewed (2 patches)

## Learning Objective

Differentiate the three causal structures in a DAG — confounder,
mediator, collider — and explain the consequences of adjusting (or not
adjusting) for each.

## Design

Three small DAGs are shown simultaneously, stacked vertically:

| Group | Nodes | Edges |
|---|---|---|
| Confounder | E (blue), O (orange), C (red) | C→E, C→O, E→O |
| Mediator | E (blue), M (green), O (orange) | E→M, M→O |
| Collider | E (blue), L (purple), O (orange) | E→L, O→L |

Each group has a `shape: 'text'` heading node above it for context.

Clicking any node shows that structure's interpretation in the right
panel: what the variable type is, whether to adjust for it, and what
goes wrong when the wrong choice is made. Clicking an edge shows the
direct causal effect it represents.

A "Show adjusted version" checkbox switches the intermediate node
(C / M / L) to a `box` shape with a black 4px border — the
conventional DAG notation for "conditioned on."

## Layout Review (2 cycles)

**Cycle 1:** Node labels were clipped — vis-network's `dot` shape
renders the label *below* the dot, so multi-line labels like
`"C\n(Confounder)"` were cut off by the chart border.

**Fix 1:** switched to `shape: 'circle'` (label inside the circle),
shortened labels to single letters, moved the descriptive text into
`title:` tooltips and into `shape: 'text'` heading nodes above each
group.

**Cycle 2:** the global `widthConstraint: { minimum: 50, maximum: 50 }`
I'd set for circle sizing was also being applied to the text headings,
wrapping "Confounder structure" into "Confound" + "er structure".

**Fix 2a:** removed the global width constraint (circles size from font
size, which is fine). Added `widthConstraint: false` on each text
heading.

**Cycle 2 (continued):** stray duplicate "causes" label appeared
floating to the right of the mediator row. This is the documented
vis-network horizontal-edge-label rendering bug — when E, M, O all
share `y: 20`, the label position calculation goes off the rails.

**Fix 2b:** nudged the middle node (M, L) by 3 px in y — exactly the
fix called out in CLAUDE.md ("the slight y-offset from 480 to 490
gives the edge enough angle for the label to render correctly").

**Cycle 3:** PASS — three structures clean, all labels in place, no
stray text.

## Files

- `docs/sims/dag-variable-structures/main.html`
- `docs/sims/dag-variable-structures/dag-variable-structures.js`
- `docs/sims/dag-variable-structures/dag-variable-structures.png`

## CANVAS_HEIGHT

`// CANVAS_HEIGHT: 530`
