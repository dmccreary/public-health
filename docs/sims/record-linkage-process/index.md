---
title: Record Linkage Process
description: Record Linkage Process
status: scaffold
library: p5.js
bloom_level: TBD
---

# Record Linkage Process



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 16: "Data Science Foundations for Public Health"](../../chapters/16-data-science-foundations/index.md).

```text
Type: microsim
**sim-id:** record-linkage-process<br/>
**Library:** p5.js<br/>
**Status:** Specified

Draw an interactive flowchart with two parallel swim lanes (Dataset A on the left, Dataset B on the right) flowing down into a central matching engine. Stages (clickable boxes):

Left lane: Dataset A (birth certificates) → Standardization (name, address, date normalization)
Right lane: Dataset B (death certificates) → Standardization

Both standardized flows → Blocking (reduce candidate pairs by restricting to same state + birth year) → Comparison Vector Generation (per-field agreement scores) → Branch: Deterministic Path (exact SSN match → Accept) | Probabilistic Path (Fellegi-Sunter weight → Accept / Clerical Review / Reject) → Linked Dataset

Clicking each stage opens a sidebar panel with:
- Stage name and description
- Example field transformations (for standardization)
- Example match weight calculation (for probabilistic stage)
- Python code snippet (2-4 lines showing the recordlinkage call)
- Key parameter to tune

Color code: blue = data, orange = transformation, green = decision/output. Animate flow lines to show data moving through the pipeline.
```

## Related Resources

- [Chapter 16: "Data Science Foundations for Public Health"](../../chapters/16-data-science-foundations/index.md)
