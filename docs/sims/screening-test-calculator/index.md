---
title: Screening Test Performance Calculator
description: Apply (L3) sensitivity, specificity, PPV, and NPV calculations by adjusting sensitivity, specificity, and disease prevalence sliders and observing how each metric changes.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Screening Test Performance Calculator



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: "Epidemiology: Study Design and Causal Inference"](../../chapters/03-epidemiology-study-design/index.md).

```text
Type: microsim
**sim-id:** screening-test-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Apply (L3) sensitivity, specificity, PPV, and NPV calculations by adjusting sensitivity, specificity, and disease prevalence sliders and observing how each metric changes.

Canvas layout:
- Left (50%): 2x2 table visualization showing TP, FP, FN, TN counts as proportional colored boxes
- Right (50%): sliders on top, calculated metric display below

Sliders (p5.js createSlider):
- Sensitivity: 0.50 to 0.99 (default 0.90)
- Specificity: 0.50 to 0.99 (default 0.90)
- Disease Prevalence: 0.1% to 50% (default 5%)
- Population size: 1,000 to 100,000 (default 10,000, affects absolute numbers but not ratios)

2x2 table display (visual, not static text):
- Four quadrants colored by type: TP (green), FP (orange), FN (red), TN (blue)
- Each quadrant shows the calculated count given current slider values
- Quadrant area proportional to count (treemap-style layout within fixed box)

Metric display (right panel, updates in real time):
- Sensitivity (with formula and current values substituted)
- Specificity (with formula and current values substituted)
- PPV (with formula and current values substituted)
- NPV (with formula and current values substituted)
- Interpretation line: "At current prevalence: 1 in X positive tests is a true positive"

Key educational behavior: When prevalence slider drops below approximately 2%, PPV drops dramatically even as sensitivity and specificity stay high — this is the key lesson about screening in low-prevalence populations. The visual area change in the 2x2 table makes this concrete.

Instructional rationale: Parameter manipulation with concurrent formula display is appropriate for L3 Apply objectives. The simultaneous table and metric display enforces data visibility — learners see the calculation, not just the result.

Responsive: updateCanvasSize() in setup(). Canvas fills container width.
```

## Related Resources

- [Chapter 3: "Epidemiology: Study Design and Causal Inference"](../../chapters/03-epidemiology-study-design/index.md)
