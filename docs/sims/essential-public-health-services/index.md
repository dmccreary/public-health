---
title: The 10 Essential Public Health Services
description: Students can identify all 10 Essential Public Health Services, assign each to its correct core function, and explain the equity mandate added in the 2020 revision.
status: scaffold
library: p5.js
bloom_level: Remember (L1)
---

# The 10 Essential Public Health Services



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 1: Public Health Foundations](../../chapters/01-foundations/index.md).

```text
Type: infographic
**sim-id:** essential-public-health-services<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Remember (L1)
Bloom Verb: identify
Learning Objective: Students can identify all 10 Essential Public Health Services, assign each to its correct core function, and explain the equity mandate added in the 2020 revision.

Purpose: Provide an interactive version of the CDC's Essential Public Health Services wheel, enabling students to explore the relationship between each service and the three core functions.

Layout: Circular wheel diagram centered on the left 60% of the canvas. Center circle = "Equity" (cross-cutting theme, always visible). Inner ring = three core function arcs (Assessment, Policy Development, Assurance), each approximately 120 degrees. Outer ring = 10 service segments radiating from the relevant core function arc. Right 40% = info panel that updates on click.

Core function colors:
- Assessment (services 1–2): light blue
- Policy Development (services 3–5): teal
- Assurance (services 6–10): green

Service-to-function mapping:
- Assessment: Monitor (1), Diagnose (2)
- Policy Development: Inform (3), Mobilize (4), Develop Policies (5)
- Assurance: Enforce (6), Link (7), Assure Workforce (8), Evaluate (9), Research (10)

Each outer segment labeled with a short 2–4 word name. Clicking any segment:
- That segment brightens and gets a gold border
- Info panel shows: full service name, core function, 2-sentence description of what this service means in practice, and one concrete real-world example

Clicking a core function arc: highlights all segments in that function; info panel shows overview text for that function.

Hovering the center "Equity" circle: shows — "The 2020 revision made equity an explicit thread through all 10 services. Every service must be performed equitably, with particular attention to historically underserved communities."

Canvas: Responsive full width, minimum 450px height. Wheel on left 60%, info panel on right 40%.

Visual style: Modern flat design, white segment borders, clean sans-serif labels.

Instructional Rationale: A clickable wheel mirrors the CDC's official visual representation, ensuring students actively engage with each service description rather than passively scanning a list.
```

## Related Resources

- [Chapter 1: Public Health Foundations](../../chapters/01-foundations/index.md)
