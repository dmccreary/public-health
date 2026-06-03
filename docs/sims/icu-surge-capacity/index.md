---
title: ICU Surge Capacity Model
description: Stock-and-flow simulation of ICU bed occupancy under varying admission rates, length of stay, baseline beds, and surge capacity options.
image: /sims/icu-surge-capacity/icu-surge-capacity.png
og:image: /sims/icu-surge-capacity/icu-surge-capacity.png
status: implemented
library: p5.js
bloom_level: Analyze
hide:
  - toc
---

# ICU Surge Capacity Model

<iframe src="main.html" width="100%" height="762px" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Learning Objective

Analyze how admission rate, mean length of stay, and surge capacity decisions interact to determine whether an intensive care unit breaches capacity during a respiratory pandemic, and identify the threshold at which the system tips from manageable to overwhelmed.

## Specification

The full specification below is extracted from
[Chapter 18: Simulation Design](../../chapters/18-simulation-design/index.md).

```text
Type: microsim
sim-id: icu-surge-capacity
Library: p5.js
Status: Implemented

Display a stock-and-flow simulation of ICU bed occupancy with the following layout:

Top section — Stock-and-Flow Diagram (visual):
- A large blue rectangle labeled "ICU Bed Occupancy" with a fill level that animates up and down
- Red line at 100% capacity with label "CAPACITY BREACHED"
- Orange line at 85% with label "Crisis Standard of Care Threshold"
- Left arrow (green) labeled "Admissions/day" flowing in
- Right arrow (red) labeled "Discharges + Deaths/day" flowing out

Middle section — Controls (p5.js built-in controls):
- Slider: Admission Rate (0–50 patients/day, default 10)
- Slider: Mean ICU Length of Stay (3–21 days, default 10)
- Slider: Baseline ICU Beds (50–500, default 200)
- Checkbox row: Surge Options (each adds beds when checked):
  - "Convert step-down units (+40 beds)"
  - "Regional overflow site (+60 beds)"
  - "Field hospital (+100 beds)"
- Button: "Reset / Restart Simulation"
- Button: "Pause / Resume"

Bottom section — Time-Series Chart:
- Line chart of ICU occupancy over 90 days
- Y-axis: 0 to 150% of baseline capacity
- Horizontal bands: green (<85%), yellow (85-100%), red (>100%)
- Current day marker (vertical dashed line)

Simulation logic: each "day" (one animation frame at reduced speed), new patients =
admission_rate; discharged patients = current_occupancy / mean_los. Stock updates:
new_occupancy = current + admitted - discharged. When the red band is entered, a
banner "CRISIS STANDARDS ACTIVATED" flashes. When the simulation ends (day 90),
display summary statistics: peak occupancy %, days above capacity, total patients
admitted.
```

## How to Use

1. Adjust the **Admission Rate** slider and watch the tank fill or drain.
2. Lower **Mean ICU Length of Stay** to see how faster discharges reduce occupancy.
3. Check the **Surge Capacity Options** boxes to add beds during a crisis.
4. Click **Reset / Restart** to begin a new 90-day run.
5. Find the **threshold** where the system tips from green to red. This is the lesson Little's Law teaches: occupancy ~ admission rate x mean length of stay.

## Related Resources

- [Chapter 18: Simulation Design](../../chapters/18-simulation-design/index.md)
- [Chapter 14: Systems Thinking Foundations](../../chapters/14-systems-thinking-foundations/index.md)
- [Chapter 15: Systems Thinking — Modeling and Policy](../../chapters/15-systems-thinking-modeling/index.md)
