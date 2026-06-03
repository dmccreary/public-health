---
title: Logic Model Builder
description: Interactive five-column logic model builder for designing public health programs — add Inputs, Activities, Outputs, Outcomes, and Impact cards, draw connections to express the theory of change, and export a text summary.
image: /sims/logic-model-builder/logic-model-builder.png
og:image: /sims/logic-model-builder/logic-model-builder.png
hide:
  - toc
---

# Logic Model Builder

<iframe src="main.html" width="100%" height="642" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Learning Objective

Students will be able to **construct** a logic model for a public health program by populating the five standard columns (Inputs, Activities, Outputs, Short-term Outcomes, Long-term Impact) and drawing the causal connections that express the program's theory of change. (Bloom: Create)

## Specification

The full specification below is extracted from
[Chapter 8: Health Policy and Management](../../chapters/08-health-policy-management/index.md).

```text
Type: microsim
sim-id: logic-model-builder
Library: p5.js

Interactive logic model building tool. Five columns labeled Inputs, Activities,
Outputs, Short-term Outcomes, and Long-term Impact are displayed horizontally.
Each column has a clickable "+ Add" button that opens a text-entry modal. Users
type in entries (e.g., "Inputs: funding, staff, facilities") and the entry
appears as a card in that column. Cards in adjacent columns can be connected by
clicking the card and then clicking a card in the next column — a directed
arrow is drawn between them. A "Save / Export" button generates a text summary
of all entries. A "Load Example" button populates a pre-built logic model for a
community health education program, demonstrating how the tool works. Color
coding: inputs = blue, activities = teal, outputs = green, outcomes = orange,
impact = red. Controls: Reset button, Clear Connections button.
```

## How to Use

1. Click the **+ Add** button at the bottom of any column to open a text-entry modal.
2. Type a short entry (for example, "CDC funding ($250K)" in the Inputs column) and press **Enter** or click **Add**.
3. Click a card to select it, then click a card in the **next column** to draw a directed connection.
4. Click the small **×** in a card's top-right corner to delete it.
5. **Load Example** populates a diabetes-prevention community health education program for reference.
6. **Save / Export** generates a plain-text summary of the model.
7. **Reset** clears everything; **Clear Connections** removes only the arrows.

## Related Resources

- [Chapter 8: Health Policy and Management](../../chapters/08-health-policy-management/index.md)
- [W. K. Kellogg Foundation Logic Model Development Guide](https://wkkf.issuelab.org/resource/logic-model-development-guide.html)
