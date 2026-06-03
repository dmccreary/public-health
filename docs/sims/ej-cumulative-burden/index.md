---
title: Environmental Justice Cumulative Burden Explorer
description: An interactive concept map illustrating EJScreen-style cumulative burden across six archetypal U.S. communities, with clickable hotspots and a configurable burden threshold.
image: /sims/ej-cumulative-burden/ej-cumulative-burden.png
og:image: /sims/ej-cumulative-burden/ej-cumulative-burden.png
twitter:image: /sims/ej-cumulative-burden/ej-cumulative-burden.png
status: implemented
library: p5.js
bloom_level: Understand (L2)
hide:
   - toc
social:
   cards: false
---

# Environmental Justice Cumulative Burden Explorer

<iframe src="main.html" width="100%" height="532px" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Learning Objective

Students can describe how cumulative exposure burden combines environmental hazards with demographic vulnerability and explain how the choice of percentile threshold shapes which communities qualify for intervention.

## Specification

The full specification below is extracted from
[Chapter 6: "Environmental Health"](../../chapters/06-environmental-health/index.md).

```text
Type: microsim
**sim-id:** ej-cumulative-burden
**Library:** p5.js
**Status:** Specified

Interactive concept map of environmental justice cumulative burden. The canvas
displays a stylized U.S. map outline (simplified polygon shapes for states, not
detailed boundaries) with six clickable "hotspot" regions representing
archetypes: (1) Gulf Coast petrochemical corridor, (2) Appalachian coalfield
community, (3) Los Angeles basin (traffic + port pollution), (4) Chicago
industrial South Side, (5) Navajo Nation uranium legacy, (6) Mississippi Delta
agricultural runoff. Clicking a hotspot opens a pop-up panel listing: top three
environmental hazards, top two demographic vulnerability factors, illustrative
EJScreen percentile, and a one-sentence description of the community's
historical exposure history. A slider labeled "Cumulative Burden Threshold"
adjusts which hotspots are highlighted (showing that at higher thresholds fewer
communities qualify, illustrating the policy tradeoff). A legend distinguishes
"environmental indicators" (red icons) from "demographic vulnerability factors"
(blue icons). The purpose is conceptual illustration of EJScreen methodology,
not real data mapping.
```

## How to Use

1. Hover any dot to see its short label and illustrative EJScreen percentile.
2. Click a dot to load that community's detail panel — environmental hazards
   (red), demographic vulnerability factors (blue), illustrative percentile,
   and historical exposure context.
3. Drag the "Cumulative Burden Threshold" slider. Dots at or above the
   threshold are highlighted in red; the rest fade to gray. This shows how
   the choice of cutoff (say, 80th percentile vs. 90th percentile) changes
   which communities qualify as "burdened" under the EJScreen approach.
4. Use the **Reset** button to clear the selected community and return the
   threshold to 0.

## Related Resources

- [Chapter 6: "Environmental Health"](../../chapters/06-environmental-health/index.md)
- [EPA EJScreen](https://www.epa.gov/ejscreen)
