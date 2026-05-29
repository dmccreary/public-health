---
title: COVID-19 Excess Mortality by Demographic Group
description: COVID-19 Excess Mortality by Demographic Group
status: scaffold
library: Chart.js
bloom_level: TBD
---

# COVID-19 Excess Mortality by Demographic Group



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 19: "COVID-19 as a Public Health Master Case Study"](../../chapters/19-covid-case-study/index.md).

```text
Type: microsim
**sim-id:** covid-excess-mortality<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Interactive grouped bar chart showing COVID-19 excess mortality rates per 100,000 population, broken out by age group (18–44, 45–64, 65–74, 75–84, 85+) and by race/ethnicity (White non-Hispanic, Black non-Hispanic, Hispanic, Asian, American Indian/Alaska Native). Data period: 2020–2022 US CDC estimates. Hovering over any bar displays: (1) excess mortality rate per 100,000, (2) 95% confidence interval, (3) ratio compared to White non-Hispanic baseline in that age group. Toggle buttons at top allow switching between "By Age Group" and "By Race/Ethnicity" views. Color palette is accessibility-safe. Source citation shown below chart. Note in chart description states: "These data reflect documented disparities in mortality burden. They are presented to support evidence-based understanding of structural inequity, not for comparison of population value."
```

## Related Resources

- [Chapter 19: "COVID-19 as a Public Health Master Case Study"](../../chapters/19-covid-case-study/index.md)
