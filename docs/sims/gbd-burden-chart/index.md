---
title: Global Burden of Disease by Cause and Income Group
description: Interactive stacked bar chart of DALY burden by cause category across World Bank income groups and WHO regions, with absolute and age-standardized views.
image: /sims/gbd-burden-chart/gbd-burden-chart.png
og:image: /sims/gbd-burden-chart/gbd-burden-chart.png
hide:
  - toc
---

# Global Burden of Disease by Cause and Income Group

<iframe src="main.html" width="100%" height="507" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Learning Objective

Analyze how the composition of disease burden shifts across the epidemiological transition by comparing DALY shares for communicable, non-communicable, and injury causes across income groups and WHO regions.

## Specification

The full specification is extracted from
[Chapter 9: Global Health](../../chapters/09-global-health/index.md).

```text
Type: microsim
sim-id: gbd-burden-chart
Library: Chart.js
Status: Implemented

Grouped horizontal bar chart showing DALY burden (in millions) by cause category
(communicable diseases, non-communicable diseases, injuries) and World Bank income
group (low income, lower-middle income, upper-middle income, high income). Data
sourced from GBD 2021 estimates. Hovering over any bar segment shows: cause
category name, income group, total DALYs, percentage of total burden, and a
one-sentence interpretation. A dropdown allows toggling between absolute DALYs
and age-standardized DALYs per 100,000 population. A radio button switches the
Y-axis from income group to WHO region. Color scheme: communicable = orange,
NCD = blue, injuries = green. A horizontal reference line shows the global
average for each metric when toggled on. Legend and axis labels clearly explain
the data source and year.
```

## Related Resources

- [Chapter 9: Global Health](../../chapters/09-global-health/index.md)
- [IHME Global Burden of Disease Study](https://www.healthdata.org/research-analysis/gbd)
