---
title: Interactive SIR/SEIR Epidemic Simulator
description: Solve the SIR, SEIR, SEIRD, and SEIRV compartmental models over 365 days. Adjust transmission, recovery, progression, mortality, and vaccination rates and watch R0, the herd immunity threshold, the epidemic peak, and the overshoot respond.
image: /sims/sir-seir-simulator/sir-seir-simulator.png
og:image: /sims/sir-seir-simulator/sir-seir-simulator.png
twitter:image: /sims/sir-seir-simulator/sir-seir-simulator.png
social:
   cards: false
hide:
  - toc
status: implemented
library: p5.js
bloom_level: Apply
quality_score: 100
---

# Interactive SIR/SEIR Epidemic Simulator

<iframe src="main.html" height="627px" width="100%" scrolling="no"></iframe>

[Run the SIR/SEIR Epidemic Simulator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This simulator solves four compartmental epidemic models from Chapter 15 and
redraws the result every time a control changes.

| Model | Compartments | What it adds |
|-------|--------------|--------------|
| **SIR** | Susceptible, Infectious, Recovered | The basic model |
| **SEIR** | adds Exposed | A latent period before a person becomes infectious |
| **SEIRD** | adds Dead | Disease-induced death at rate μ |
| **SEIRV** | adds vaccination | Susceptible people move straight to the immune compartment at rate ν |

The upper chart shows the number of people in each compartment over 365 days.
The dashed horizontal line is the **herd immunity threshold**. It is drawn at
S = N/R₀, the point where the share of the population that is immune reaches
1 − 1/R₀ and each case produces, on average, one new case. The bracket labeled
**overshoot** shows how far the susceptible curve keeps falling after it
crosses that line.

The lower chart shows cumulative cases and, for SEIRD, cumulative deaths. The
panel on the right reports R₀, the herd immunity threshold, the peak, the
total infected, and the overshoot.

## The Equations

The simulator uses the same equations as the chapter. N is the starting
population, and the number of new infections per day is β·S·I/N.

**SIR**

\[ \frac{dS}{dt} = -\beta \frac{S \cdot I}{N} \qquad \frac{dI}{dt} = \beta \frac{S \cdot I}{N} - \gamma I \qquad \frac{dR}{dt} = \gamma I \]

**SEIR** adds the exposed compartment:

\[ \frac{dE}{dt} = \beta \frac{S \cdot I}{N} - \sigma E \qquad \frac{dI}{dt} = \sigma E - \gamma I \]

**SEIRD** adds death at rate μ:

\[ \frac{dI}{dt} = \sigma E - (\gamma + \mu) I \qquad \frac{dR}{dt} = \gamma I \qquad \frac{dD}{dt} = \mu I \]

**SEIRV** adds vaccination at rate ν:

\[ \frac{dS}{dt} = -\beta \frac{S \cdot I}{N} - \nu S \qquad \frac{dR}{dt} = \gamma I + \nu S \]

The summary numbers are:

\[ R_0 = \frac{\beta}{\gamma} \qquad \text{herd immunity threshold} = 1 - \frac{1}{R_0} \]

For SEIRD, people leave the infectious compartment by recovery or by death, so
the simulator uses R₀ = β / (γ + μ), and the case fatality rate is μ / (γ + μ).

## How to Use

1. Start with the defaults (SIR, β = 0.25, γ = 0.10). R₀ is 2.5 and the herd immunity threshold is 60%. Read the total infected in the side panel. It is about 89%, which is the overshoot example from the chapter.
2. Move the **Transmission β** slider down. The peak gets lower and later, and the total infected falls. Raise **Recovery γ** above β and R₀ drops under 1, so the outbreak fades out.
3. Press **Save Run to Compare**, then change a slider. The saved run stays on the charts as dashed lines.
4. Switch the **Model** menu to SEIR and change **Progression σ**. The latent period delays and lowers the peak but does not change R₀ or the total infected.
5. Switch to SEIRD and raise **Mortality μ** to see deaths accumulate in the lower chart.
6. Switch to SEIRV and raise **Vaccination ν** to see how vaccination during the epidemic lowers the peak and the total infected.
7. Move the mouse over either chart to read the values for any day.

Sliders for parameters that the selected model does not use are disabled.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/public-health/sims/sir-seir-simulator/main.html"
        height="627px"
        width="100%"
        scrolling="no"></iframe>
```

## Learning Objective

Students will be able to apply the SIR and SEIR family of models by changing
their parameters to predict how R₀, the epidemic peak, the total number
infected, and the overshoot past the herd immunity threshold respond.

## Specification

The full specification below is extracted from
[Chapter 15: Systems Thinking: Modeling and Policy](../../chapters/15-systems-thinking-modeling/index.md).

```text
Type: microsim
sim-id: sir-seir-simulator
Library: p5.js
Status: Specified

Full interactive epidemic simulator with model selection dropdown (SIR, SEIR,
SEIRD, SEIRV). Parameter sliders include: β (transmission rate, 0.1–1.0), γ
(recovery rate, 0.05–0.5), σ (progression rate for SEIR, 0.1–0.5), μ
(mortality rate for SEIRD, 0–0.05), ν (vaccination rate for SEIRV, 0–0.1), and
initial population size (1,000–100,000). Real-time epidemic curve shows S, E,
I, R, D compartments in color-coded lines over a 365-day simulation. A
prominent R₀ display updates as β/γ changes. A second panel shows cumulative
cases and deaths. A "herd immunity threshold" horizontal dashed line marks
1−1/R₀ on the susceptible trajectory. A "Compare" button allows overlaying two
model runs with different parameter sets. The simulation re-runs automatically
as sliders change, allowing students to discover epidemic overshoot by
reducing β mid-epidemic.
```

### Implementation Notes

- **β is constant within a run.** The specification mentions reducing β mid-epidemic. In this simulator each run uses one value of β for all 365 days. To see what a lower β does, save a run with the Compare button and then lower β. The dashed and solid curves show the difference in peak and in total infected.
- **Overshoot is shown directly.** A bracket on the upper chart and a line in the side panel show the overshoot, so students do not have to infer it.
- **Numerical method.** The equations are solved with the fourth-order Runge-Kutta method and a time step of 0.1 day. One person in a thousand is infectious on day 0.
- **Checked against known results.** With R₀ = 2.5 the SIR model ends with 89.3% infected, which matches the final-size equation and the figure quoted in the chapter.
- **N is the starting population.** In SEIRD the infection term keeps dividing by the starting population, as written in the chapter.

## Lesson Plan

### Audience

Undergraduate and graduate students in a first public health course.

### Duration

20 minutes

### Prerequisites

- The meaning of R₀ and of the herd immunity threshold (Chapter 13)
- The SIR and SEIR equations (earlier in Chapter 15)

### Activities

1. **Predict** (3 min): With R₀ = 2.5, the herd immunity threshold is 60%. Students predict the share of the population that will be infected by the end of the epidemic, then check the side panel.
2. **Find the threshold** (4 min): Students set γ to 0.20, then lower β until the outbreak fades out, and record the value of β where this happens. They compare it with γ and explain the result with R₀ = β/γ.
3. **Flatten the curve** (5 min): Students save the default run, then lower β to 0.15. They record the change in peak size, peak day, and total infected, and explain why slowing transmission lowers the total as well as the peak.
4. **Add a latent period** (4 min): Students switch to SEIR and compare σ = 0.5 with σ = 0.1. Which outputs change and which stay the same?
5. **Vaccinate** (4 min): Students switch to SEIRV and find the smallest vaccination rate ν that keeps the total infected under 10%.

### Assessment

- Given β and γ, the student computes R₀ and the herd immunity threshold and predicts whether an outbreak will grow.
- The student explains epidemic overshoot using the upper chart.
- The student explains why the SEIR and SIR models with the same β and γ end with the same total infected.

## References

1. [Compartmental models in epidemiology](https://en.wikipedia.org/wiki/Compartmental_models_in_epidemiology) - Wikipedia - The SIR, SEIR, and related models and their equations.
2. [Basic reproduction number](https://en.wikipedia.org/wiki/Basic_reproduction_number) - Wikipedia - Definition and interpretation of R₀.
3. [Herd immunity](https://en.wikipedia.org/wiki/Herd_immunity) - Wikipedia - The threshold 1 − 1/R₀ and overshoot.
4. Kermack, W. O., & McKendrick, A. G. (1927). A contribution to the mathematical theory of epidemics. *Proceedings of the Royal Society of London, Series A*, 115(772), 700-721. The original SIR model.
5. [p5.js Reference](https://p5js.org/reference/) - Documentation for the JavaScript library used to build this MicroSim.

## Related Resources

- [Chapter 15: Systems Thinking: Modeling and Policy](../../chapters/15-systems-thinking-modeling/index.md)
- [SIR Model Compartment Flow](../sir-compartments/index.md)
- [R₀ and Herd Immunity Explorer](../r0-herd-immunity-explorer/index.md)
- [COVID-19 SEIR Wave Simulator](../covid-seir/index.md)
