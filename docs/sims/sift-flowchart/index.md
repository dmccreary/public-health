---
title: SIFT Method Decision Flowchart
description: SIFT Method Decision Flowchart
status: scaffold
library: p5.js
bloom_level: TBD
---

# SIFT Method Decision Flowchart



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 12: "Public Health Communication"](../../chapters/12-public-health-communication/index.md).

```text
Type: microsim
**sim-id:** sift-flowchart<br/>
**Library:** p5.js<br/>
**Status:** Specified

Draw a vertical flowchart with four colored step boxes: S (Stop – red), I (Investigate the Source – orange), F (Find Better Coverage – yellow), T (Trace Claims – green). Each box is clickable. On click, a right-side panel shows: (1) step name and acronym, (2) a definition (2 sentences), (3) how-to guidance (3 bullet points), and (4) a worked COVID-19 misinformation example for that step. Between steps, brief connector arrows labeled with decision questions ("Is the source familiar and trusted?", etc.) guide users through the logic. A top input box labeled "You encounter a health claim online" triggers the flowchart. A "Start Over" button resets. Color coding consistent throughout.
```

## Related Resources

- [Chapter 12: "Public Health Communication"](../../chapters/12-public-health-communication/index.md)
