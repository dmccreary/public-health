---
title: Study Design Evidence Hierarchy
description: Identify (L1) and compare (L4) epidemiological study designs by their position in the evidence hierarchy, their key strengths, and their primary limitations.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Study Design Evidence Hierarchy



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 2: "Epidemiology: Disease Measurement"](../../chapters/02-epidemiology-disease-measurement/index.md).

```text
Type: diagram
**sim-id:** study-design-hierarchy<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Identify (L1) and compare (L4) epidemiological study designs by their position in the evidence hierarchy, their key strengths, and their primary limitations.

Canvas layout:
- Main drawing area showing a triangular pyramid divided into 6 horizontal layers
- Right side panel (250px): infobox that updates when a layer is clicked or hovered

Pyramid layers (bottom to top, increasing evidence strength):
1. Ecological Studies (bottom, widest) — gray
2. Cross-Sectional Studies — light blue
3. Case-Control Studies — blue
4. Cohort Studies (Prospective & Retrospective) — teal
5. RCTs and Quasi-Experimental (Natural Experiments) — green
6. Systematic Reviews & Meta-Analyses (top, narrowest) — gold

Each layer is a clickable trapezoid labeled with the design name.

On hover: layer brightens, cursor becomes pointer
On click: infobox updates with:
- Design name and definition
- Can calculate RR directly? (Yes/No)
- Randomized? (Yes/No)
- Primary bias vulnerability
- Classic public health example (e.g., "Snow's cholera maps" for ecological)
- Typical use case

Labels on pyramid left side: "↑ Internal Validity", "↑ Evidence Strength"
Labels on pyramid right side: "↑ Cost & Time", "↓ Feasibility"

Responsive design: Canvas resizes on window resize; pyramid scales to container width.
```

## Related Resources

- [Chapter 2: "Epidemiology: Disease Measurement"](../../chapters/02-epidemiology-disease-measurement/index.md)
