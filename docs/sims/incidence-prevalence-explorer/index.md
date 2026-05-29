---
title: Incidence vs. Prevalence Explorer
description: Apply (L3) the relationship between incidence rate, disease duration, and prevalence proportion by adjusting simulation parameters and observing how the prevalence pool fills and drains.
status: scaffold
library: p5.js
bloom_level: Apply — learners manipulate incidence rate and duration sliders and predict how prevalence changes, then verify their prediction against the simulation output.
---

# Incidence vs. Prevalence Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 2: "Epidemiology: Disease Measurement"](../../chapters/02-epidemiology-disease-measurement/index.md).

```text
Type: microsim
**sim-id:** incidence-prevalence-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Apply (L3) the relationship between incidence rate, disease duration, and prevalence proportion by adjusting simulation parameters and observing how the prevalence pool fills and drains.

Bloom level: Apply — learners manipulate incidence rate and duration sliders and predict how prevalence changes, then verify their prediction against the simulation output.

Canvas layout:
- Left panel (60%): animated "prevalence pool" — new cases flow in from the top (incidence), cases leave from the bottom (recovery/death). Active cases are circles in the pool, colored by time since diagnosis.
- Right panel (40%): numeric display showing current Incidence Rate, Duration, and calculated Prevalence; formula display updating in real time.

Interactive controls (p5.js createSlider):
- Slider: Incidence Rate (1–100 new cases per 1,000 per year)
- Slider: Average Disease Duration (0.1–10 years)
- Button: Reset
- Checkbox: Show formula calculation

Default parameters:
- Incidence Rate: 10 per 1,000/year
- Duration: 5 years
- Population: 10,000

Data Visibility Requirements:
Stage 1: Show current incidence rate (cases/1,000/yr)
Stage 2: Show duration setting
Stage 3: Show calculated prevalence using Prevalence ≈ IR × Duration
Stage 4: Show animated pool adjusting to equilibrium

Behavior:
- When sliders change, cases enter and leave pool at new rates
- Prevalence display updates every second
- Formula panel always shows the current calculation with actual numbers

Instructional Rationale: Sliders with real-time feedback are appropriate for an Apply/L3 objective because learners must manipulate parameters and observe consequences — passive animation would prevent the prediction-and-verify cycle that cements the relationship.

Responsive design: Canvas resizes on window resize. updateCanvasSize() called in setup().
```

## Related Resources

- [Chapter 2: "Epidemiology: Disease Measurement"](../../chapters/02-epidemiology-disease-measurement/index.md)
