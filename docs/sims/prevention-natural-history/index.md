---
title: Prevention Levels Mapped to Natural History of Disease
description: Students can explain how the four prevention levels map onto the stages of natural history of disease and, for a given disease example, identify which prevention strategy is appropriate at each stage.
status: scaffold
library: p5.js
bloom_level: Understand (L2)
---

# Prevention Levels Mapped to Natural History of Disease



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 1: Public Health Foundations](../../chapters/01-foundations/index.md).

```text
Type: microsim
**sim-id:** prevention-natural-history<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: explain
Learning Objective: Students can explain how the four prevention levels map onto the stages of natural history of disease and, for a given disease example, identify which prevention strategy is appropriate at each stage.

Purpose: Make the conceptual alignment between natural history stages and prevention tiers concrete. Students step through disease progression and identify the prevention lever active at each stage.

Layout: Horizontal timeline progression across the top 65% of the canvas showing disease progression from left (pre-exposure, healthy) to right (outcome). Prevention level labels appear as labeled brackets below the timeline. Right side (35% width): info panel updates on click. Bottom row: controls.

Visual elements:
- Main horizontal timeline bar divided into five labeled stages with color coding:
  - Stage 1 "No Risk Factors" (white/pale green)
  - Stage 2 "Risk Factors Present" (pale yellow)
  - Stage 3 "Subclinical Disease" (orange)
  - Stage 4 "Clinical Disease" (red)
  - Stage 5 "Outcome" (gray)
- Four labeled horizontal brackets below the timeline, each spanning its relevant stages:
  - "Primordial" bracket: over Stage 1
  - "Primary" bracket: over Stage 2
  - "Secondary" bracket: over Stage 3
  - "Tertiary" bracket: over Stages 4–5
- An animated dot (representing a patient) moves left to right along the timeline. Pause/play button controls movement.

Interactive controls:
- Three disease-select buttons: "Influenza", "Type 2 Diabetes", "Lead Poisoning" — selecting one updates stage duration proportions and infobox examples for that disease
- Clicking any prevention bracket: highlights it gold, pauses animation, opens info panel with — prevention level name, when it acts, goal, and 2–3 specific intervention examples for the selected disease
- Hovering any stage rectangle: shows tooltip with stage name and one-sentence definition

Data Visibility Requirements (Understand-level objective):
- Stage 1: Disease probability text = "Disease risk: baseline population level"
- Stage 2: Disease probability text = "Disease risk: elevated — intervention here prevents disease onset"
- Stage 3: "Pathological process underway — undetected without screening"
- Stage 4: "Symptoms present — clinical care required"
- Stage 5: "Outcome: recovery / disability / death depending on treatment and disease"

Instructional Rationale: Step-through simulation with concrete disease examples allows students to trace the prevention-natural history relationship with real-world specificity, building transferable understanding across disease types. Selecting different diseases reinforces that the framework applies generally.
```

## Related Resources

- [Chapter 1: Public Health Foundations](../../chapters/01-foundations/index.md)
