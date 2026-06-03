---
title: IHR Evolution and PHEIC Declarations Timeline
description: Interactive horizontal timeline of the International Health Regulations and every Public Health Emergency of International Concern declared by WHO from 1969 through 2024.
image: /sims/ihr-pheic-timeline/ihr-pheic-timeline.png
og:image: /sims/ihr-pheic-timeline/ihr-pheic-timeline.png
hide:
  - toc
---

# IHR Evolution and PHEIC Declarations Timeline

<iframe src="main.html" width="100%" height="420" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Learning Objective

Students can locate each WHO PHEIC declaration on a timeline alongside the IHR legal milestones (1969, 2005) and explain how SARS (2003) and COVID-19 (2020) each drove changes in international public health law and emergency response.

## Specification

The full specification below is extracted from
[Chapter 9: Global Health](../../chapters/09-global-health/index.md).

```text
Type: microsim
**sim-id:** ihr-pheic-timeline
**Library:** p5.js
**Status:** Implemented

Horizontal scrollable timeline from 1969 (original IHR) to 2024. Key milestone
events are represented as labeled nodes on the timeline: 1969 IHR enacted
(blue diamond), 2003 SARS (red circle), 2005 IHR revised (blue diamond), and
then each PHEIC declaration as orange circles with disease name labels.
Clicking any node opens a details panel showing: event name, date, brief
description, and outcome or status. The timeline is divided into two swim
lanes: "IHR Milestones" (top) and "PHEIC Declarations" (bottom). A zoom
slider allows the user to expand the 2019–2024 period to see COVID-19 and
mpox events in detail. Nodes are color-coded by category: IHR legal
milestone = blue, PHEIC declared = orange, PHEIC ended = green ring,
ongoing = pulsing orange animation. A "Compare Response" button opens an
overlay comparing WHO response timelines for H1N1, Ebola 2014, and COVID-19.
```

## Related Resources

- [Chapter 9: Global Health](../../chapters/09-global-health/index.md)
