---
title: Four-Step Risk Assessment Framework
description: Four-Step Risk Assessment Framework
status: scaffold
library: vis-network
bloom_level: TBD
---

# Four-Step Risk Assessment Framework



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 6: "Environmental Health"](../../chapters/06-environmental-health/index.md).

```text
Type: microsim
**sim-id:** risk-assessment-framework<br/>
**Library:** vis-network<br/>
**Status:** Specified

Interactive directed graph showing the four steps of environmental risk assessment as nodes connected by directional edges. Each node is clickable and expands a side panel with: (1) a brief definition of the step, (2) the key question the step answers, (3) an example output metric (e.g., IARC classification for Hazard Identification, RfD/CSF for Dose-Response, CDI for Exposure, HQ/excess cancer risk for Risk Characterization). Nodes are color-coded by step number (blue gradient from light to dark). A "Reset" button returns all panels to collapsed state. Hovering a node highlights its outgoing edge in orange. The layout is left-to-right, emphasizing the sequential flow.
```

## Related Resources

- [Chapter 6: "Environmental Health"](../../chapters/06-environmental-health/index.md)
