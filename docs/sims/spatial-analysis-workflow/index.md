---
title: Spatial Analysis Workflow
description: Spatial Analysis Workflow
status: scaffold
library: p5.js
bloom_level: TBD
---

# Spatial Analysis Workflow



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 17: "Data Science Advanced: Spatial Analysis and Machine Learning"](../../chapters/17-data-science-advanced/index.md).

```text
Type: microsim
**sim-id:** spatial-analysis-workflow<br/>
**Library:** p5.js<br/>
**Status:** Specified

Draw a horizontal pipeline diagram with five clickable stages arranged left to right, connected by arrows:

1. **Data Acquisition** (blue) — Point data (cases, addresses) + Boundary files (shapefiles, GeoJSON) + Rate denominators (Census ACS)
2. **Preprocessing** (blue) — Geocoding addresses → coordinates; Spatial join cases to census tracts; Compute age-standardized rates
3. **Exploratory Mapping** (green) — Choropleth map (choropleth); KDE surface (heat map); Dot density map
4. **Cluster Detection** (orange) — Moran's I (global autocorrelation); LISA map (local clusters); SaTScan (space-time scan)
5. **Communication** (red) — Static map (publication); Leaflet/Folium web map (interactive); Shiny/Dash dashboard (stakeholder)

Each stage box is clickable and expands a panel below the pipeline showing:
- The key tools used at that stage (Python: geopandas, pysal, folium; R: sf, spdep, leaflet)
- A 3-4 sentence description of what happens at this stage
- A "common mistake" warning (e.g., at Preprocessing: "Forgetting to reproject to a common CRS before spatial join produces silently wrong results" — a classic footgun)

Color scheme: blue = data operations, green = visualization, orange = statistics, red = output.
```

## Related Resources

- [Chapter 17: "Data Science Advanced: Spatial Analysis and Machine Learning"](../../chapters/17-data-science-advanced/index.md)
