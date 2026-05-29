---
title: Interrupted Time-Series Analysis Workflow
description: Students can describe each step of an interrupted time-series analysis, identify the four regression coefficients and their interpretations, and recognize threats to validity such as co-interventions and autocorrelation.
status: scaffold
library: p5.js
bloom_level: Apply (L3)
---

# Interrupted Time-Series Analysis Workflow



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 5: "Biostatistics: Regression and Advanced Methods"](../../chapters/05-biostatistics-regression/index.md).

```text
Type: microsim
**sim-id:** its-analysis-workflow<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Apply (L3)
Bloom Verb: apply
Learning Objective: Students can describe each step of an interrupted time-series analysis, identify the four regression coefficients and their interpretations, and recognize threats to validity such as co-interventions and autocorrelation.

Purpose: Make the ITS analytical workflow concrete and navigable through a clickable step-by-step diagram with embedded visualizations at each step.

Layout: Vertical flowchart of 6 steps on the left 40% of canvas. Each step is a rounded rectangle node with a step number, short title, and brief description. On click, the right 60% updates with:
- Step 1 "Assemble time series data": a scatter plot showing monthly outcome data over 36 months, with the intervention point marked as a vertical red dashed line
- Step 2 "Fit pre-intervention trend": same scatter plot with a linear regression line for the pre-intervention period only
- Step 3 "Extend counterfactual": the pre-intervention trend line projected forward past the intervention as a dashed line (what would have happened without intervention)
- Step 4 "Fit ITS segmented regression": both segments fitted with solid lines; coefficients β0, β1, β2, β3 labeled with arrows and plain-language interpretations
- Step 5 "Check autocorrelation": autocorrelation function (ACF) plot of residuals; note about Durbin-Watson test
- Step 6 "Interpret and report": table showing β0–β3 estimates, SEs, p-values, and a two-sentence plain-language interpretation of the intervention's level and slope effects

Step nodes:
1. Assemble Time Series Data
2. Fit Pre-Intervention Trend
3. Extend the Counterfactual Trend
4. Fit Segmented Regression (Level + Slope Change)
5. Check Autocorrelation in Residuals
6. Interpret Level Change (β2) and Slope Change (β3)

Active node (most recently clicked): teal fill, white text. Inactive nodes: light gray fill, dark text. Arrows between nodes: dark gray.

Simulated dataset: 36 monthly observations; pre-intervention (months 1–18) with gentle upward trend; intervention at month 18; post-intervention period (months 19–36) with lower level and steeper downward slope. Outcome: "Monthly acute myocardial infarction admissions per 100,000."

Canvas: Responsive full container width, 500px height.

Instructional Rationale: ITS analysis is difficult to teach with equations alone because the visual logic of segmented regression — the gap at the intervention point and the slope change — is more intuitive than the algebra. Walking through the workflow step by step with the visualization updating at each step builds procedural understanding that transfers to evaluating published ITS studies.
```

## Related Resources

- [Chapter 5: "Biostatistics: Regression and Advanced Methods"](../../chapters/05-biostatistics-regression/index.md)
