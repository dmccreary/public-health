---
title: Wastewater Epidemiology Pipeline
description: Wastewater Epidemiology Pipeline
status: scaffold
library: p5.js
bloom_level: TBD
---

# Wastewater Epidemiology Pipeline



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 17: "Data Science Advanced: Spatial Analysis and Machine Learning"](../../chapters/17-data-science-advanced/index.md).

```text
Type: microsim
**sim-id:** wastewater-epi-pipeline<br/>
**Library:** p5.js<br/>
**Status:** Specified

Draw a vertical or horizontal pipeline showing the flow from sewage collection to disease trend reporting. Seven clickable stages, connected by animated flow lines (blue for liquid/sample flow, green for data flow):

1. **Community Shedding** (gray) — animated icons of a neighborhood; text: "People shed viral RNA in feces 1-7 days before symptoms"
2. **Sewage Collection** (blue) — illustration of a manhole and treatment plant influent pipe; text: "24-hour composite samples; upstream manholes for neighborhood resolution"
3. **Lab Processing** (orange) — centrifuge/filter icon; text: "Concentration, RNA extraction, RT-qPCR quantification (copies/liter)"
4. **Normalization** (orange) — formula display: "Normalized signal = (N gene copies/L) / (PMMoV copies/L)"; text: "Corrects for population variation and dilution"
5. **Trend Modeling** (green) — mini time-series chart icon; text: "7-day moving average; exponential smoothing; anomaly detection"
6. **Lead Indicator Comparison** (green) — split panel showing wastewater signal leading clinical cases by ~5 days
7. **Public Health Action** (red) — dashboard icon; text: "NWSS dashboard; surge preparation; outbreak investigation trigger"

Clicking each stage opens a detailed sidebar panel explaining:
- Technical methods used at that stage
- Key quality control considerations
- Limitations and sources of uncertainty
- Notable COVID-19 examples

Include a small interactive toggle at the bottom: "Show pathogen panel" lists 6 other pathogens (influenza, polio, mpox, RSV, opioids, AMR genes) with a one-sentence description of each WBE application.
```

## Related Resources

- [Chapter 17: "Data Science Advanced: Spatial Analysis and Machine Learning"](../../chapters/17-data-science-advanced/index.md)
