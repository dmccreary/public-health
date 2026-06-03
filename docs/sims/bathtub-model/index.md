---
title: Stock-and-Flow Bathtub Model
description: Interactive bathtub analogy illustrating stock-and-flow dynamics with an epidemic context — adjust inflow (new infections) and outflow (recoveries) rates and watch the stock of infected individuals accumulate over time.
image: ./bathtub-model.png
og:image: ./bathtub-model.png
hide:
  - toc
---

# Stock-and-Flow Bathtub Model

<iframe src="main.html" width="100%" height="622px" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Learning Objective

**Bloom Level:** Understand

Students will be able to **explain** the integral relationship between flows
(inflow and outflow rates) and a stock (accumulated quantity) by manipulating
the β (infection) and γ (recovery) rate sliders and observing how the level
of infected individuals in the "bathtub" rises, falls, or stabilizes over a
100-day simulation. Students will also be able to **identify** how a reporting
delay between true infections and observed inflow causes the stock to continue
rising even after the true epidemic has peaked — a foundational insight for
understanding why public health surveillance lags create policy mistiming.

## How to Use This Simulation

1. **Watch the bathtub fill.** Water (red) flowing in from the faucet
   represents new infections; water draining out represents recoveries.
2. **Adjust β (inflow rate).** Higher β means more new infections per day.
3. **Adjust γ (outflow rate).** Higher γ means a larger fraction of the
   infected stock recovers each day. Note that outflow = γ · Stock, so the
   drain runs faster when the tub is fuller.
4. **Change the initial infected** to see how starting conditions affect the
   trajectory.
5. **Toggle the 5-day reporting delay** to observe how the inflow signal
   reaching the stock is shifted in time — the stock continues rising even
   after the true inflow has peaked. This is the structural reason
   surveillance-based policy responses are always behind the real epidemic.
6. **Press Reset** to restart at day 0.

## Specification

The full specification below is extracted from
[Chapter 14: Systems Thinking Foundations](../../chapters/14-systems-thinking-foundations/index.md).

```text
Type: microsim
sim-id: bathtub-model
Library: p5.js
Status: Implemented

Interactive bathtub analogy model illustrating stock-and-flow dynamics with
an epidemic context. The simulation shows a rectangular bathtub (the stock
of "Infected Individuals") with two flow arrows: an inflow faucet ("New
Infections") controlled by a β slider (0.1–0.5) and an outflow drain
("Recoveries") controlled by a γ slider (0.05–0.3). A third panel shows a
time-series graph of the stock level over 100 days. Controls include: a
"Reset" button to return to initial conditions; an "Add Delay" toggle that
inserts a 5-day reporting delay into the inflow signal, showing how the
stock continues rising even after the true inflow has peaked; and a slider
for initial infected population. The model clearly labels Level (stock),
Rate (flow), and shows the integral relationship as the graph draws in
real time. A displayed equation box shows the stock equation updating with
current parameter values.
```

## Related Resources

- [Chapter 14: Systems Thinking Foundations](../../chapters/14-systems-thinking-foundations/index.md)
- [SIR Model Compartment Flow](../sir-compartments/index.md) — the same
  stock-and-flow logic extended to multiple connected compartments
