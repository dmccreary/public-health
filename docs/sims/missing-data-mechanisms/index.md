---
title: Missing Data Mechanisms Visualizer
description: Distinguish MCAR, MAR, and MNAR missingness mechanisms by inspecting where missing cells fall in a 10x20 dataset grid.
status: implemented
library: p5.js
bloom_level: Analyze
---

# Missing Data Mechanisms Visualizer

<iframe src="main.html" width="100%" height="532" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Learning Objective

Analyze (L4) the three canonical missing-data mechanisms — MCAR (Missing
Completely At Random), MAR (Missing At Random), and MNAR (Missing Not At
Random) — by clicking individual missing cells and seeing which observed
or unobserved variable is driving the missingness pattern, then identify
when complete-case analysis is unbiased, biased-but-recoverable, or
biased-and-unrecoverable.

## How to Use

1. Switch among the **MCAR**, **MAR**, and **MNAR** buttons to see how the
   spatial pattern of missing cells changes.
2. Click any **gray (missing) cell** to open an explanation in the right
   panel. The explanation tells you which mechanism is active, why the
   cell is missing, and the recommended handling strategy.
3. Under **MAR**, the orange-highlighted "Age" column header is the
   observed variable that drives missingness in Income — older
   respondents are more likely to omit their income.
4. Under **MNAR**, missingness concentrates in the heaviest-consumption
   rows of the Alcohol column — the missingness depends on the value you
   cannot see.
5. Click **New Dataset** to draw a fresh random sample and confirm that
   the pattern persists across draws.

## Specification

The full specification below is extracted from
[Chapter 16: "Data Science Foundations"](../../chapters/16-data-science-foundations/index.md).

```text
Type: microsim
**sim-id:** missing-data-mechanisms
**Library:** p5.js
**Status:** Specified

Display a grid of cells representing a dataset (10 columns x 20 rows).
Each row is an observation; each column is a variable. Cells are colored:
light blue = observed value, dark gray = missing value. Three buttons at
the top switch between MCAR, MAR, and MNAR patterns:

- MCAR: Missing cells scattered uniformly at random (no pattern visible)
- MAR: Missing cells concentrated in certain rows where another column
  (highlighted in orange) has a specific value — e.g., missingness in
  "income" column depends on "age" column being >65
- MNAR: Missing cells concentrated in the highest-value rows of the same
  variable — e.g., missing "alcohol" values are the heaviest drinkers

Clicking any gray cell opens a tooltip panel on the right explaining:
- Which mechanism is active
- Why this cell is missing under this mechanism
- Whether complete-case analysis is biased
- The recommended handling strategy

A legend at the bottom maps colors to meaning.
```

## Related Resources

- [Chapter 16: "Data Science Foundations"](../../chapters/16-data-science-foundations/index.md)
