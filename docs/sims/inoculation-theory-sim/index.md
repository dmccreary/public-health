---
title: Inoculation Theory Visualizer
description: Side-by-side population simulation comparing misinformation spread in a population with no prebunking against a population where 65% have been prebunked (psychologically inoculated). Includes a Debunk Mode that demonstrates the limited reach of corrections deployed after misinformation has already spread.
image: /sims/inoculation-theory-sim/inoculation-theory-sim.png
og:image: /sims/inoculation-theory-sim/inoculation-theory-sim.png
twitter:image: /sims/inoculation-theory-sim/inoculation-theory-sim.png
status: implemented
library: p5.js
bloom_level: Analyze
social:
   cards: false
hide:
  - toc
---

# Inoculation Theory Visualizer

<iframe src="main.html" width="100%" height="572" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Learning Objective

Analyze how psychological inoculation ("prebunking") reduces the spread of misinformation across a population, and compare its effectiveness to debunking after misinformation has spread.

## How to Use

1. Click **Release Misinformation** to start the spread in both populations.
2. Watch how the right population, where about 65% have been prebunked (shown with shield outlines), resists infection at a much higher rate than the left.
3. Adjust the **Spread rate** slider (1–5) to model more or less aggressive misinformation.
4. Toggle **Debunk Mode** ON and click Release Misinformation again to see what happens when corrections are deployed only AFTER misinformation has spread — note that corrections reach only a small fraction of believers.
5. Click **Deploy Correction** at any time to manually attempt to flip believers to "Correction Reached".
6. Click **Reset** to randomize a new shielded population and clear all states.

## Specification

The full specification below is extracted from
[Chapter 12: Public Health Communication and Health Literacy](../../chapters/12-public-health-communication/index.md).

```text
Type: microsim
sim-id: inoculation-theory-sim
Library: p5.js
Status: Specified

Side-by-side simulation comparing two populations: "No Prebunk" (left panel)
and "Prebunked" (right panel). Each population is represented as a grid of
100 people icons. A slider labeled "Misinformation spread rate" (1-5) controls
how aggressively icons turn red (believed misinformation) over time. A
"Release Misinformation" button triggers the spread animation. In the
Prebunked panel, approximately 60-70% of icons have a "shield" overlay
(representing inoculation). When misinformation spreads, shielded icons
resist and remain green; unshielded icons turn red. A counter at the bottom
of each panel shows: Exposed, Believed, Resisted, Correction Reached. A
second mode toggle labeled "Debunk Mode" changes the simulation so that
correction messages deploy after misinformation spreads, showing the limited
reach of corrections. Reset button restores both panels.
```

## Related Resources

- [Chapter 12: Public Health Communication and Health Literacy](../../chapters/12-public-health-communication/index.md)
