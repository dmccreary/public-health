---
title: Neglected Tropical Disease Geographic Distribution
description: An interactive world-map MicroSim showing endemic regions for neglected tropical diseases, with per-region burden estimates, top NTDs, and preventive-chemotherapy program status.
image: /sims/ntd-geographic-map/ntd-geographic-map.png
og:image: /sims/ntd-geographic-map/ntd-geographic-map.png
twitter:image: /sims/ntd-geographic-map/ntd-geographic-map.png
status: implemented
library: p5.js
bloom_level: Understand (L2)
hide:
   - toc
social:
   cards: false
---

# Neglected Tropical Disease Geographic Distribution

<iframe src="main.html" width="100%" height="562px" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Learning Objective

Students can identify the geographic regions where neglected tropical diseases concentrate and describe how specific NTDs (soil-transmitted helminths, schistosomiasis, lymphatic filariasis, trachoma, onchocerciasis) cluster in different parts of the tropical world.

## Specification

The full specification below is extracted from
[Chapter 9: "Global Health"](../../chapters/09-global-health/index.md).

```text
Type: microsim
**sim-id:** ntd-geographic-map
**Library:** p5.js
**Status:** Specified

Simplified world map rendered in p5.js using country polygon outlines. Countries
are shaded by NTD burden intensity (lighter = lower burden, darker = higher
burden) using GBD 2021 DALY estimates. Clicking any country opens a sidebar
panel showing: country name, top 3 NTDs by burden, total NTD DALYs, and whether
the country is currently receiving preventive chemotherapy program support. A
dropdown allows selecting a specific NTD (soil-transmitted helminths,
schistosomiasis, lymphatic filariasis, trachoma, onchocerciasis) to show its
specific geographic distribution. A toggle switches between "Total DALY burden"
and "DALYs per 100,000 population." Color scale and legend are clearly labeled.
A note explains data source (IHME GBD 2021) and year.
```

## How to Use

1. **Hover** any shaded region to see its short label and current metric value.
2. **Click** a region to load its detail panel — top three NTDs by burden,
   illustrative DALY count, and preventive-chemotherapy program status.
3. Use the **NTD dropdown** to filter the map to a single disease (for example,
   trachoma concentrates in East Africa and MENA; onchocerciasis in Central
   Africa). The color ramp rescales to the maximum of the selected NTD.
4. Use the **Metric dropdown** to switch between total DALY burden (thousands)
   and DALYs per 100,000 population. The per-capita view reveals where the
   burden is most concentrated relative to population size.
5. Click **Reset** to clear the selection and return both dropdowns to default.

## Related Resources

- [Chapter 9: "Global Health"](../../chapters/09-global-health/index.md)
- [WHO Neglected Tropical Diseases programme](https://www.who.int/teams/control-of-neglected-tropical-diseases)
- [IHME Global Burden of Disease (GBD)](https://www.healthdata.org/research-analysis/gbd)
