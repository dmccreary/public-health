---
title: DAG Variable Structures Explorer
description: Differentiate (L4) the three causal structures in a DAG — confounder, mediator, and collider — and explain the consequences of adjusting (or not adjusting) for each.
status: scaffold
library: vis-network
bloom_level: TBD
---

# DAG Variable Structures Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 2: "Epidemiology: Disease Measurement"](../../chapters/02-epidemiology-disease-measurement/index.md).

```text
Type: diagram
**sim-id:** dag-variable-structures<br/>
**Library:** vis-network<br/>
**Status:** Specified

Learning objective: Differentiate (L4) the three causal structures in a DAG — confounder, mediator, and collider — and explain the consequences of adjusting (or not adjusting) for each.

Canvas layout:
- Main vis-network graph (60% width): shows three separate DAG structures arranged vertically
- Right panel (40%): explains the currently selected structure

Three structures displayed simultaneously with labeled groups:
Group 1 — Confounder: C → E, C → O, E → O. Nodes: E (Exposure, blue circle), O (Outcome, orange circle), C (Confounder, red circle).
Group 2 — Mediator: E → M → O. Nodes: E (blue), M (Mediator, green), O (orange).
Group 3 — Collider: E → L ← O. Nodes: E (blue), L (Collider, purple), O (orange).

Interactive behavior:
- Click any node: right panel shows the variable type (confounder/mediator/collider), its definition, whether to adjust for it, and the consequence of wrong choice.
- Click any edge: shows what the arrow represents (direct causal effect from source to target).
- Hover node: node highlights, tooltip shows variable label and type.
- Checkbox in right panel: "Show adjusted version" — when checked, adjusted variables are shown with a box (conditioning symbol) and the path status (open/closed) updates.

Node styling: Circles, radius 30px; E = #2196F3 (blue), O = #FF9800 (orange), C = #F44336 (red), M = #4CAF50 (green), L = #9C27B0 (purple). Edges: black arrows, width 2.
Layout: Static positions (not physics-based) to keep three groups legible.

Responsive: vis-network container fills 60% of the parent width; panel updates dynamically.
```

## Related Resources

- [Chapter 2: "Epidemiology: Disease Measurement"](../../chapters/02-epidemiology-disease-measurement/index.md)
