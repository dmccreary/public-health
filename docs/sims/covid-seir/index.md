---
title: COVID-19 SEIR Wave Simulator
description: Interactive SEIR compartmental model for COVID-19 with variant R0, vaccination coverage, and waning immunity controls.
image: ./covid-seir.png
og:image: ./covid-seir.png
hide:
  - toc
status: implemented
library: p5.js
bloom_level: Analyze
---

# COVID-19 SEIR Wave Simulator

<iframe src="main.html" width="100%" height="602px" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Learning Objective

Analyze how transmission rate, vaccination coverage, variant R₀, and waning immunity interact to shape COVID-19 wave dynamics, and explain why early single-scenario projections systematically diverged from observed multi-wave outcomes.

## Specification

The full specification below is extracted from
[Chapter 19: COVID-19 Case Study](../../chapters/19-covid-case-study/index.md).

```text
Type: microsim
sim-id: covid-seir
Library: p5.js
Status: Specified

Interactive SEIR model for COVID-19 wave visualization. Four panels:
(1) top panel shows time-series curves for S, E, I, R compartments in
four colors; (2) bottom-left shows current parameter values; (3)
bottom-right shows derived metrics: R₀, herd immunity threshold, peak
infected fraction, total infected. Controls: slider for β (transmission
rate, 0.1–1.2), slider for vaccination coverage (0–90%), slider for
variant R₀ (1.5–15, simulates wild-type through Omicron), slider for
waning immunity rate (0–0.02/day). "Run Wave" button starts simulation;
"Reset" clears; "Compare Variants" button overlays Delta vs Omicron
curves for same vaccination coverage. On-canvas annotations mark herd
immunity threshold and peak infection date. Canvas size: 800×520px.
Uses Euler integration with daily time steps over 730-day simulation
window. Population = 330,000,000 (stylized US). Initial infectious = 100.
```

## How to Use

1. Pick a variant preset (Wild, Delta, Omicron) or set Variant R₀ directly. The β slider auto-syncs to keep R₀ = β / γ consistent.
2. Adjust **Vaccine coverage** to set the starting fraction of the population that is already immune.
3. Optionally raise **Waning immunity** to model recovered individuals losing protection over time — this is what drives recurrent waves.
4. Press **Run Wave** to integrate 730 days (≈2 years) of the model. The plot shows S, E, I, R curves as fractions of the population.
5. Press **Compare Variants** to overlay Delta and Omicron infectious curves at the *same* vaccine coverage — a quick way to see why Omicron's higher R₀ overwhelmed the same level of pre-existing immunity.

## Reading the Plot

- **Dashed green horizontal line:** the herd-immunity threshold for the current R₀ (1 − 1/R₀).
- **Dashed red vertical line:** the day of peak infectious prevalence.
- **Right-hand panel:** R₀, HIT, peak infected fraction, peak day, and the total ever-infected fraction.

## Related Resources

- [Chapter 19: COVID-19 Case Study](../../chapters/19-covid-case-study/index.md)
- [SIR Model Compartment Flow](../sir-compartments/index.md)
- [R₀ and Herd Immunity Explorer](../r0-herd-immunity-explorer/index.md)
