---
title: Upstream vs. Downstream Intervention Visualizer
description: An animated version of the public health river metaphor. Turn on upstream, midstream, and downstream levers and compare how many people become ill, are treated, and are left untreated.
image: /sims/upstream-downstream-river/upstream-downstream-river.png
og:image: /sims/upstream-downstream-river/upstream-downstream-river.png
twitter:image: /sims/upstream-downstream-river/upstream-downstream-river.png
social:
   cards: false
hide:
  - toc
status: implemented
library: p5.js
bloom_level: Analyze
quality_score: 100
---

# Upstream vs. Downstream Intervention Visualizer

<iframe src="main.html" height="527px" width="100%" scrolling="no"></iframe>

[Run the Upstream vs. Downstream MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

Public health uses a river to describe where an intervention acts. Rescuers
pull drowning people out of a river one after another. Someone finally walks
upstream to find out why people are falling in. The story is usually credited
to John McKinlay's 1979 essay "A Case for Refocusing Upstream."

In this MicroSim, 60 people walk along a riverbank during each run. At an
upstream hazard (unsafe housing) some of them fall into the water, which means
they become ill. Three levers act at three different points:

| Lever | Where it acts | What it does in the model |
|-------|---------------|---------------------------|
| **Housing Policy** (U) | Upstream, on the root cause | Fewer people fall into the river at all |
| **Smoking Cessation** (M) | Midstream, on a risk factor | Some people already in the water are pulled back to shore |
| **Hospital** (D) | Downstream, on disease | Treats people in the water one at a time. Expanding it shortens the time per patient |

The sidebar counts **people ill**, **people treated**, and the **burden
remaining** (people who became ill and were never treated). Each finished run
is added to the *Completed runs* table so that lever combinations can be compared.

!!! warning "This is an illustrative model, not real data"
    The rates in this MicroSim are teaching parameters chosen to show the logic
    of the metaphor. Half of the people fall in with no upstream action and one
    in five with the housing policy. The midstream lever rescues 40% of people
    in the water. These are not estimates of the real effect of any housing or
    smoking program.

## How to Use

1. Press **Start** with no levers on. Watch the hospital fall behind. People it cannot reach leave the river untreated.
2. When the run ends, read the first row of the *Completed runs* table.
3. Turn on one lever. Click its box beside the river or use its checkbox. Press **New Run**.
4. Repeat for each lever alone, then for combinations.
5. Compare the rows. Which lever reduces the number of people who become ill? Which levers only change what happens after they are ill?
6. Press **Reset** to clear the table and turn all levers off.

Runs are repeatable. The same lever settings always give the same result, so
any difference between two rows comes from the levers.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/public-health/sims/upstream-downstream-river/main.html"
        height="527px"
        width="100%"
        scrolling="no"></iframe>
```

## Learning Objective

Students will be able to compare upstream, midstream, and downstream
interventions by running each lever combination and analyzing how each one
changes the number of people who become ill, are treated, and are left
untreated.

## Specification

The full specification below is extracted from
[Chapter 10: Health Equity and Social Determinants of Health](../../chapters/10-health-equity-sdoh/index.md).

```text
Type: microsim
sim-id: upstream-downstream-river
Library: p5.js
Status: Specified

Animated river flowing from top-left to bottom-right. People (small circles)
flow downstream and some fall into the water ("become ill"). Three clickable
intervention levers are positioned along the river: (1) Upstream: "Housing
Policy" lever — when activated, reduces the number of people entering the
water; (2) Midstream: "Smoking Cessation" lever — when activated, some people
in the water are redirected to shore; (3) Downstream: "Hospital" icon — shows a
counter of people being treated. A running counter in the upper right shows:
People ill, People treated, Health burden remaining. A sidebar shows cost per
QALY for each lever type (upstream lowest, downstream highest) based on
published estimates. Reset button restores default state. Instruction text:
"Click levers to activate interventions. Compare effectiveness and cost."
```

### Implementation Notes

- **Cost per QALY is not shown.** The specification asks for a sidebar of cost per QALY "based on published estimates." Published cost-effectiveness figures for housing policy, smoking cessation, and hospital care vary widely by program and setting. No single set of figures could be stated with confidence, so none are shown. The sidebar space holds the *Completed runs* comparison table instead. The instruction text was changed to match.
- **The simulation starts paused.** A Start/Pause button was added so that the animation does not run while a student is reading the chapter.
- **The hospital is a third lever.** The hospital always treats people. Its lever expands capacity so that downstream action can be compared with the other two.
- **Levers have checkboxes too.** The lever boxes beside the river are clickable, and each lever also has a standard checkbox in the control area.

## Lesson Plan

### Audience

Undergraduate and graduate students in a first public health course.

### Duration

15 minutes

### Prerequisites

- Social determinants of health
- The difference between treating disease and preventing it

### Activities

1. **Predict** (2 min): Before running anything, students rank the three levers by how much they expect each one to reduce the burden remaining.
2. **Baseline** (2 min): Run with no levers. Record people ill, treated, and burden remaining.
3. **One lever at a time** (5 min): Run each lever alone. Students fill in a table with the three results and compare them with their predictions.
4. **Analyze** (4 min): Discuss two questions. Which lever is the only one that lowers the *People ill* count, and why? Why does the hospital treat a larger share of ill people when the housing policy is on, even though the hospital did not change?
5. **Critique the model** (2 min): Students name one thing the model leaves out, such as cost, the time an upstream policy takes to work, or who pays for it.

### Assessment

- The student classifies a new intervention (for example, a lead paint removal program, a blood pressure screening, or a dialysis unit) as upstream, midstream, or downstream and justifies the choice.
- The student explains why an upstream lever lowers the load on downstream services.
- The student states one limitation of the river metaphor.

## References

1. McKinlay, J. B. (1979). A case for refocusing upstream: The political economy of illness. In E. G. Jaco (Ed.), *Patients, Physicians, and Illness* (3rd ed.). Free Press. The essay usually credited with the upstream and downstream river metaphor.
2. [Social determinants of health](https://en.wikipedia.org/wiki/Social_determinants_of_health) - Wikipedia - Background on the non-medical conditions that upstream interventions target.
3. [Health in All Policies](https://en.wikipedia.org/wiki/Health_in_All_Policies) - Wikipedia - The governance approach that brings health into housing, transport, and other upstream sectors.
4. [p5.js Reference](https://p5js.org/reference/) - Documentation for the JavaScript library used to build this MicroSim.

## Related Resources

- [Chapter 10: Health Equity and Social Determinants of Health](../../chapters/10-health-equity-sdoh/index.md)
- [Dahlgren-Whitehead Rainbow Model](../dahlgren-whitehead-rainbow/index.md)
- [Prevention Levels and Natural History](../prevention-natural-history/index.md)
