---
title: Kingdon's Three Streams Model
description: Kingdon's Three Streams Model
status: scaffold
library: p5.js
bloom_level: TBD
---

# Kingdon's Three Streams Model



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 8: "Health Policy and Management"](../../chapters/08-health-policy-management/index.md).

```text
Type: microsim
**sim-id:** kingdons-three-streams<br/>
**Library:** p5.js<br/>
**Status:** Specified

Animated visualization of Kingdon's three streams model. Three horizontal rivers flow left to right across the canvas, labeled "Problem Stream," "Policy Stream," and "Politics Stream." Each stream carries small labeled particles (problem = red circles labeled with example problems like "opioid deaths"; policy = blue squares labeled with example policies like "prescription monitoring"; politics = green triangles labeled with political events like "new administration"). A vertical "Policy Window" gateway appears periodically when streams are manually aligned by the user. Users can drag the three streams toward or away from the gateway to experiment with coupling. When all three streams converge at the window, an animation fires: the gateway lights up gold and a banner displays "Policy Change!" with an example (e.g., "ACA passage 2010"). Controls: Reset button, Speed slider (slow/fast particle flow), and a text overlay explaining each stream on hover.
```

## Related Resources

- [Chapter 8: "Health Policy and Management"](../../chapters/08-health-policy-management/index.md)
