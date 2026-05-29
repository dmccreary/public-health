---
title: US Health System Structure
description: US Health System Structure
status: scaffold
library: vis-network
bloom_level: TBD
---

# US Health System Structure



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 8: "Health Policy and Management"](../../chapters/08-health-policy-management/index.md).

```text
Type: microsim
**sim-id:** us-health-system-structure<br/>
**Library:** vis-network<br/>
**Status:** Specified

Interactive layered network diagram of the US health system. Nodes are color-coded by tier: federal agencies (deep blue), state health departments (teal), local health departments (green), private insurance sector (purple), safety net providers (orange), FQHCs (amber). Clicking any node opens an info panel describing the agency's mandate, funding source, and example program. Edges show funding flows (solid lines) and regulatory authority (dashed lines). A legend panel at the bottom explains node colors and edge types. Default view shows all tiers; a dropdown filter allows the user to isolate "Governmental," "Insurance," or "Safety Net" layers.
```

## Related Resources

- [Chapter 8: "Health Policy and Management"](../../chapters/08-health-policy-management/index.md)
