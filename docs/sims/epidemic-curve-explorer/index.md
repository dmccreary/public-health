---
title: Epidemic Curve Shape Explorer
description: Identify (L1) and interpret (L2) epidemic curve shapes to distinguish common-source point exposure outbreaks from propagated person-to-person outbreaks.
status: scaffold
library: Chart.js
bloom_level: TBD
---

# Epidemic Curve Shape Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: "Epidemiology: Study Design and Causal Inference"](../../chapters/03-epidemiology-study-design/index.md).

```text
Type: microsim
**sim-id:** epidemic-curve-explorer<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: Identify (L1) and interpret (L2) epidemic curve shapes to distinguish common-source point exposure outbreaks from propagated person-to-person outbreaks.

Canvas layout:
- Top: radio button selector for outbreak type (Point Source / Propagated / Mixed)
- Main chart: bar chart showing cases by day of onset (x-axis: days, y-axis: number of cases)
- Bottom panel: infobox explaining the selected curve type, its diagnostic characteristics, and a real-world example

Three dataset modes:
1. Point Source: Gaussian-shaped peak centered at day 7, width approximately 3 days (incubation period 2-3 days), total 60 cases. Represents a foodborne outbreak.
2. Propagated: Three successive peaks at days 5, 19, and 33 (serial interval approximately 14 days), each larger than the last. Represents measles in a school.
3. Mixed: Point-source peak at day 7 followed by smaller propagated peaks at days 14 and 21.

Interactive behavior:
- Selecting a radio button updates the bar chart with animation (Chart.js transition)
- Hovering a bar shows: day, case count, "Day of onset: X, Cases: Y"
- Clicking a bar highlights the bar and updates the infobox with the specific context for that day

Annotations on chart:
- Point source mode: annotation marking "Exposure event (Day 0)" and bracket showing incubation period width
- Propagated mode: annotations marking "Generation 1", "Generation 2", "Generation 3"
- Serial interval annotation: double-headed arrow between peaks labeled "Serial Interval (~14 days)"

Colors: Point source bars = #2196F3 (blue); Propagated bars = #FF9800 (orange); Mixed = #9C27B0 (purple)

Responsive: chart fills 100% of container width; height 350px. Resizes on window resize.
```

## Related Resources

- [Chapter 3: "Epidemiology: Study Design and Causal Inference"](../../chapters/03-epidemiology-study-design/index.md)
