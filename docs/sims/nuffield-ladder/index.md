---
title: Nuffield Council Ladder of Interventions
description: Nuffield Council Ladder of Interventions
status: scaffold
library: p5.js
bloom_level: TBD
---

# Nuffield Council Ladder of Interventions



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 11: "Public Health Ethics"](../../chapters/11-public-health-ethics/index.md).

```text
Type: microsim
**sim-id:** nuffield-ladder<br/>
**Library:** p5.js<br/>
**Status:** Specified

Draw a vertical ladder with 8 rungs, labeled from bottom (rung 1: Do Nothing) to top (rung 8: Eliminate Choice). Each rung is a colored horizontal bar — color transitions from green (bottom, low coercion) to red (top, high coercion). Rungs are clickable. On click, a side panel displays: (1) rung name and number, (2) a brief definition, (3) a concrete public health example, (4) the level of liberty restriction (low/medium/high), and (5) a justification threshold note. A "Reset" button clears the panel. A coercion-o-meter gauge on the right side animates to show increasing restriction as higher rungs are selected. Ladder labels align left of the rungs. Side panel is right of the ladder. Responsive to container width.
```

## Related Resources

- [Chapter 11: "Public Health Ethics"](../../chapters/11-public-health-ethics/index.md)
