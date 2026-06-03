---
title: Moran's I Spatial Autocorrelation Visualizer
description: Students can interpret Moran's I values and explain how clustering, dispersion, and spatial outliers each shift the statistic.
status: implemented
library: p5.js
bloom_level: Analyze (L4)
---

# Moran's I Spatial Autocorrelation Visualizer

<iframe src="main.html" width="100%" height="602px" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Learning Objective

Students can interpret values of Moran's I by manipulating clustering strength,
spatial dispersion, and outlier injection on a 10x10 grid of simulated county
disease rates and observing how each manipulation changes the global Moran's I
statistic and the shape of the Moran's scatter plot.

## Specification

The full specification below is extracted from
[Chapter 17: "Data Science: Advanced Methods"](../../chapters/17-data-science-advanced/index.md).

```text
Type: microsim
sim-id: morans-i-visualizer
Library: p5.js
Status: Specified

Display a 10x10 grid of counties, each colored by a simulated disease rate
(five-color sequential scale, light yellow to dark red). Three sliders control
the simulation:

1. Clustering Strength (0 to 1): At 0, rates are random (Moran's I near 0).
   At 1, a spatial smoothing algorithm creates strong regional clusters.
2. Spatial Dispersion (-1 to 0): Creates a checkerboard-like alternating
   pattern (negative spatial autocorrelation).
3. Outlier Injection (0 to 5): Introduces N high-rate cells surrounded by
   low-rate neighbors (spatial outliers).

A real-time Moran's I value (computed from the queen-contiguity spatial weights
matrix) updates in a large display panel to the right of the grid as sliders
change. Below the Moran's I value, display:
- Interpretation text (clustered / random / dispersed)
- A small Moran's I scatter plot (spatial lag on y-axis, value on x-axis, with
  the four quadrant labels: HH, HL, LL, LH)

Clicking any cell highlights it and its queen-contiguous neighbors with orange
borders, displaying the local contribution to Moran's I in the side panel.
```

## Related Resources

- [Chapter 17: "Data Science: Advanced Methods"](../../chapters/17-data-science-advanced/index.md)
