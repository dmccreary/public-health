---
title: MicroSim Design Process
description: MicroSim Design Process
status: scaffold
library: p5.js
bloom_level: TBD
---

# MicroSim Design Process



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 18: "Simulation Design for Public Health Education"](../../chapters/18-simulation-design/index.md).

```text
Type: microsim
**sim-id:** microsim-design-process<br/>
**Library:** p5.js<br/>
**Status:** Specified

Draw a vertical flowchart with eight clickable stages, connected by downward arrows. Each stage is a rounded rectangle:

1. **Define Learning Objective** (blue) — "Complete the sentence: After using this sim, students can ___." Red gate: Does the objective require 'and'? → If yes, loop back with "Split into two sims"
2. **Choose Interaction Type** (blue) — Taxonomy: Parameter slider / Toggle scenario / Explore network / Observe animation — map to Bloom level (Remember → Create)
3. **Select Library** (orange) — Decision diamond: Agent-based? → p5.js. Standard chart? → Chart.js. Explorable data? → Plotly. Network/flow? → vis-network
4. **Sketch Canvas Layout** (orange) — Canvas region + control region + output/readout region. Mobile layout stack.
5. **Implement Controls First** (green) — Build sliders/buttons before the simulation logic — test that controls fire events correctly
6. **Implement Core Loop** (green) — setup() + draw() for p5.js; config object for Chart.js; data binding for Plotly/vis-network
7. **Apply Accessibility Checks** (red) — Color blindness test; mobile layout test; screen reader description; performance test (500-agent cap)
8. **Write Specification** (red) — Complete the details block: sim-id, library, status, full specification text

Clicking each stage expands a right-side panel with:
- 2-3 sentence description of the stage
- A "Common Mistake" callout (footgun) specific to that stage
- A checklist of 3-4 completion criteria

The stages that have a decision gate (1, 3) show a diamond branch node. Completed stages can be checked off by clicking a checkbox in the panel.
```

## Related Resources

- [Chapter 18: "Simulation Design for Public Health Education"](../../chapters/18-simulation-design/index.md)
