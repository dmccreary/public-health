---
title: Stages of Change Visualizer
description: Step five people through the Transtheoretical Model's Stages of Change and see the definition, motivational state, stage-matched intervention, and a smoking-cessation example for each stage.
image: /sims/stages-of-change/stages-of-change.png
og:image: /sims/stages-of-change/stages-of-change.png
twitter:image: /sims/stages-of-change/stages-of-change.png
social:
   cards: false
hide:
  - toc
status: implemented
library: p5.js
bloom_level: Understand
quality_score: 100
---

# Stages of Change Visualizer

<iframe src="main.html" height="562px" width="100%" scrolling="no"></iframe>

[Run the Stages of Change Visualizer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The Transtheoretical Model (Prochaska and DiClemente) treats behavior change as a
process that unfolds through five stages: **Precontemplation**, **Contemplation**,
**Preparation**, **Action**, and **Maintenance**. The model's practical message is
that people at different stages need different interventions.

This MicroSim shows the five stages as a row of boxes joined by forward arrows.
Two orange arrows curve back from Action and Maintenance to show **relapse**.
They are drawn as a normal part of the diagram, not as an error state, because
relapse is expected in behavior change and is not a sign of failure.

Five person icons stand under the stage they are currently in. The panel below
describes the stage of the selected person in four parts:

- **Definition** of the stage
- **Motivational state** of a person in that stage
- **Best intervention**, the stage-matched strategy a practitioner would use
- **Smoking example**, the strategy applied to smoking cessation

## How to Use

1. Click a person icon to select it. The selected person and its stage are outlined in gold.
2. Click **Forward →** to move that person to the next stage and read how the recommended intervention changes.
3. Click **← Back** to move the person back one stage.
4. When the selected person is in Action or Maintenance, the Back button changes to **← Relapse**. Clicking it sends the person along the orange arrow to Contemplation.
5. Select other people and place them in different stages to compare stages side by side.
6. Click **Reset** to return all five people to Precontemplation.

!!! note "Simplification"
    The relapse arrows in this MicroSim always return a person to Contemplation.
    Real people may return to any earlier stage. The fixed target keeps the
    diagram readable.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/public-health/sims/stages-of-change/main.html"
        height="562px"
        width="100%"
        scrolling="no"></iframe>
```

## Learning Objective

Students will be able to explain how the recommended intervention changes
across the five Stages of Change, and explain why relapse is treated as an
expected part of the change process, by stepping people through the stages.

## Specification

The full specification below is extracted from
[Chapter 7: Social and Behavioral Health](../../chapters/07-social-behavioral-health/index.md).

```text
Type: microsim
sim-id: stages-of-change
Library: p5.js
Status: Specified

Interactive visualization showing five labeled stage boxes arranged as a
horizontal progression (Precontemplation → Contemplation → Preparation →
Action → Maintenance) with curved arrows showing both forward movement and
relapse (backward arrows from Action and Maintenance). A row of five clickable
person icons below the stage boxes allows the user to "move" a person through
the stages by clicking forward (→) and backward (←) buttons. When a person icon
is positioned at a stage, the info panel to the right shows: (1) a one-sentence
stage definition, (2) the core emotional/motivational state, (3) the
recommended intervention type for this stage (e.g., "raise awareness" for
precontemplation, "resolve ambivalence" for contemplation, "plan for action"
for preparation, "skills and support" for action, "relapse prevention" for
maintenance), and (4) an example from a smoking-cessation context. The relapse
arrows are animated with a pulsing orange color to convey that relapse is
normal and expected, not failure. A reset button returns all icons to
Precontemplation.
```

### Implementation Notes

- The info panel sits **below** the stage row instead of to the right. Five stage names do not fit beside a text panel at the width of a textbook page.
- The relapse arrows pulse only while the mouse is over the MicroSim, so the page stays still while a student reads the chapter text.
- The optional sixth stage, Termination, is not shown. The specification asks for five stages.

## Lesson Plan

### Audience

Undergraduate and graduate students in a first public health course.

### Duration

10-15 minutes

### Prerequisites

- The idea that health behavior is shaped by beliefs, motivation, and environment
- The Health Belief Model, from earlier in Chapter 7

### Activities

1. **Predict** (3 min): Before touching the MicroSim, ask students what a clinician should say to a smoker who has no interest in quitting. Record two or three answers.
2. **Explore** (5 min): Students move Person 1 forward one stage at a time and write down the "Best intervention" for each stage. Compare the Precontemplation intervention with the answers recorded in step 1.
3. **Relapse** (3 min): Students move a person to Maintenance, then click **← Relapse**. Discuss why the model draws relapse as a normal path and how a practitioner's response to a relapse differs from a first conversation with a precontemplator.
4. **Apply** (4 min): Give students three short smoker profiles. They place Persons 1 to 3 in the matching stages and justify each placement with the stage definition.

### Assessment

- Given a one-sentence description of a person, the student names the stage and the matching intervention.
- The student explains in two or three sentences why an action-oriented program (for example, a quit-smoking class) is a poor match for a person in Precontemplation.
- The student explains why relapse is described as expected and not as failure.

## References

1. [Transtheoretical model](https://en.wikipedia.org/wiki/Transtheoretical_model) - Wikipedia - Overview of the stages of change, processes of change, and decisional balance.
2. Prochaska, J. O., & DiClemente, C. C. (1983). Stages and processes of self-change of smoking: Toward an integrative model of change. *Journal of Consulting and Clinical Psychology*, 51(3), 390-395. The smoking-cessation study in which the stages were first described.
3. Prochaska, J. O., DiClemente, C. C., & Norcross, J. C. (1992). In search of how people change: Applications to addictive behaviors. *American Psychologist*, 47(9), 1102-1114. Describes change as a spiral in which people who relapse recycle through earlier stages.
4. [p5.js Reference](https://p5js.org/reference/) - Documentation for the JavaScript library used to build this MicroSim.

## Related Resources

- [Chapter 7: Social and Behavioral Health](../../chapters/07-social-behavioral-health/index.md)
- [Health Belief Model](../health-belief-model/index.md)
- [Social-Ecological Model](../social-ecological-model/index.md)
