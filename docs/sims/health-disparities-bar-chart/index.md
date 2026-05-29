---
title: Life Expectancy and Infant Mortality by Race and Income
description: Life Expectancy and Infant Mortality by Race and Income
status: scaffold
library: Chart.js
bloom_level: TBD
---

# Life Expectancy and Infant Mortality by Race and Income



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 10: "Health Equity and Social Determinants of Health"](../../chapters/10-health-equity-sdoh/index.md).

```text
Type: microsim
**sim-id:** health-disparities-bar-chart<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Grouped bar chart with two panels side-by-side. Panel 1 (Life Expectancy): grouped bars showing life expectancy at birth for white, Black, Hispanic, and Asian Americans for years 2010, 2015, 2019, and 2021, with COVID dip visible. Panel 2 (Infant Mortality): grouped bars for white and Black Americans 2000–2021, showing the persistent 2:1 ratio. Both panels have a dropdown to switch between "By Race" and "By Income Quartile" views. Tooltip shows exact values on hover. Color palette is accessible (colorblind-safe). Data sourced from CDC WONDER and NCHS. Chart title, axis labels, source attribution all rendered. Legend displayed below each chart.
```

## Related Resources

- [Chapter 10: "Health Equity and Social Determinants of Health"](../../chapters/10-health-equity-sdoh/index.md)
