---
title: Health Belief Model — Interactive Concept Map
description: Health Belief Model — Interactive Concept Map
status: scaffold
library: vis-network
bloom_level: TBD
---

# Health Belief Model — Interactive Concept Map



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 7: "Social and Behavioral Health"](../../chapters/07-social-behavioral-health/index.md).

```text
Type: microsim
**sim-id:** health-belief-model<br/>
**Library:** vis-network<br/>
**Status:** Specified

A vis-network directed graph showing the Health Belief Model. Central node: "Health Protective Behavior" (large, dark teal). Nodes feeding into it: "Perceived Susceptibility" (blue), "Perceived Severity" (blue), "Perceived Benefits" (green), "Perceived Barriers" (orange, with a minus-sign edge indicating it reduces likelihood), "Self-Efficacy" (purple), "Cue to Action" (yellow). A "Modifying Factors" node (gray) connects via dashed edges to the four perceptual nodes. Clicking any node opens a side panel with: (1) the construct's one-sentence definition, (2) an example from COVID-19 vaccine uptake, (3) an example from physical activity behavior. Edges are labeled with their relationship type ("increases", "reduces", "triggers"). Layout is force-directed with the central node anchored. A reset-view button restores default layout.
```

## Related Resources

- [Chapter 7: "Social and Behavioral Health"](../../chapters/07-social-behavioral-health/index.md)
