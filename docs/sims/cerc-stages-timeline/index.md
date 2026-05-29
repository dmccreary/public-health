---
title: CERC Five Stages Timeline
description: CERC Five Stages Timeline
status: scaffold
library: p5.js
bloom_level: TBD
---

# CERC Five Stages Timeline



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 12: "Public Health Communication"](../../chapters/12-public-health-communication/index.md).

```text
Type: microsim
**sim-id:** cerc-stages-timeline<br/>
**Library:** p5.js<br/>
**Status:** Specified

Draw a horizontal timeline divided into five labeled stage segments: Pre-Crisis, Initial Event, Maintenance, Resolution, Evaluation. Each stage occupies proportional space with a distinctive background color (blue, orange, red, yellow, green). Above the timeline, each stage has a clickable header button. Below the timeline, there is a panel that displays when a stage is clicked: (1) stage name as heading, (2) typical duration, (3) 3-4 key communication tasks as a bullet list, (4) a COVID-19 example for each stage. Small event marker icons appear above the timeline to show where real-world events (e.g., "First press briefing", "WHO declaration", "Vaccine approval") can appear. Clicking an event marker shows a tooltip. A "Reset" button clears the selection. Responsive to container width.
```

## Related Resources

- [Chapter 12: "Public Health Communication"](../../chapters/12-public-health-communication/index.md)
