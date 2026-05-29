---
title: R₀ and Herd Immunity Explorer
description: Apply (L3) the relationship between R₀ and the herd immunity threshold by adjusting R₀ values for different pathogens and calculating the required vaccination coverage.
status: scaffold
library: p5.js
bloom_level: TBD
---

# R₀ and Herd Immunity Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: "Epidemiology: Study Design and Causal Inference"](../../chapters/03-epidemiology-study-design/index.md).

```text
Type: microsim
**sim-id:** r0-herd-immunity-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Apply (L3) the relationship between R₀ and the herd immunity threshold by adjusting R₀ values for different pathogens and calculating the required vaccination coverage.

Canvas layout:
- Left (60%): main drawing area with branching tree showing transmission chains from one index case
- Right (40%): control panel and numeric displays

Drawing area:
- Show 3 generations of transmission from one index case (index case to R₀ secondaries to R₀-squared tertiaries)
- Circle nodes: susceptible (white), infected (red), immune (gray, with X mark)
- When immunity proportion slider moves, randomly gray out that proportion of nodes across all generations
- Highlight Rₜ = R₀ × (1 - immunity proportion) in real time

Interactive controls:
- Slider: R₀ (1.0 to 18.0, step 0.1). Preset buttons for: Seasonal Flu (1.3), COVID-19 original (3.0), COVID-19 Omicron (12.0), Measles (15.0)
- Slider: Current immune proportion (0% to 100%)
- Display: R₀ value, HIT = 1 - 1/R₀, Current Rₜ, Status (Growing / Declining)

Status display:
- When Rₜ > 1.0: status bar shown in red, text "Epidemic growing"
- When Rₜ = 1.0: yellow, "Endemic equilibrium"
- When Rₜ < 1.0: green, "Epidemic declining"

Formula panel: shows HIT formula and Rₜ = R₀ × S with current numbers substituted.

Responsive: updateCanvasSize() called in setup(). Canvas scales to container width.

Instructional rationale: Parameter exploration is appropriate for this Apply/L3 objective — learners must manipulate R₀ and vaccination coverage to find the HIT, reinforcing the mathematical relationship through discovery rather than observation.
```

## Related Resources

- [Chapter 3: "Epidemiology: Study Design and Causal Inference"](../../chapters/03-epidemiology-study-design/index.md)
