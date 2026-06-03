---
title: Dose-Response Curve Explorer
description: Students can analyze how slope (Hill coefficient), EC50 position, and model choice (threshold vs. linear-no-threshold) determine landmark regulatory doses (NOAEL, LOAEL, Reference Dose) on a dose-response curve.
image: ./dose-response-explorer.png
og:image: ./dose-response-explorer.png
hide:
  - toc
---

# Dose-Response Curve Explorer

<iframe src="main.html" width="100%" height="602px" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Learning Objective

Students can analyze how the slope (Hill coefficient) and EC50 position of a
dose-response curve determine the locations of the NOAEL, LOAEL, EC50/LD50, and
derived Reference Dose - and explain why the linear-no-threshold (LNT) model
used for carcinogens has no analogous "safe" landmark.

**Bloom Level:** Analyze (L4)

## Specification

The full specification below is extracted from
[Chapter 6: Environmental Health, Toxicology, and Climate](../../chapters/06-environmental-health/index.md).

```text
Type: microsim
sim-id: dose-response-explorer
Library: p5.js
Status: Implemented

Interactive dose-response curve visualization. The canvas shows a sigmoid
dose-response curve on a log-dose x-axis. Three controls govern the curve:
(1) slope steepness (Hill coefficient), (2) EC50 / LD50 horizontal position
on the log-dose axis, and (3) a model selector switching between the
classical Threshold S-curve and a Linear-No-Threshold (LNT) line used for
carcinogens.

Labeled markers appear on the curve for:
  - NOAEL (No Observed Adverse Effect Level)   - green triangle
  - LOAEL (Lowest Observed Adverse Effect Level) - orange triangle
  - EC50 / LD50                                  - red circle
  - Reference Dose (NOAEL / 100)                 - blue dashed vertical line

Hovering over any marker shows a tooltip with the definition and typical
regulatory use. A legend on the right explains every marker and the three
shaded background zones - No Effect (light green), Uncertain (light yellow),
Effect (light red) - which only appear in the Threshold model. The LNT model
shades the whole plot with a faint red wash to remind students that under
LNT there is no safe dose.
```

## How to Use

1. **Drag the Hill slope slider** to see how potency (steepness) shifts the
   NOAEL and LOAEL closer to or further from the EC50.
2. **Drag the Log EC50 slider** to translate the entire curve along the
   log-dose axis - this is how more or less potent toxicants compare.
3. **Hover any marker** to read its regulatory definition.
4. **Switch the model dropdown** to Linear No-Threshold and notice the
   landmark markers (NOAEL, LOAEL, RfD) disappear - because for carcinogens
   modeled under LNT, those concepts do not apply.

## Related Resources

- [Chapter 6: Environmental Health, Toxicology, and Climate](../../chapters/06-environmental-health/index.md)
- EPA Integrated Risk Information System (IRIS): https://www.epa.gov/iris
- WHO Guidance on Chemical Risk Assessment: https://www.who.int/health-topics/chemical-safety
