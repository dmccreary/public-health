---
title: SIFT Applied to a Supplement Claim
description: SIFT Applied to a Supplement Claim
status: scaffold
library: p5.js
bloom_level: TBD
---

# SIFT Applied to a Supplement Claim



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 20: "Health Fraud, Nutritional Misinformation, and the Supplement Industry"](../../chapters/20-health-fraud-misinformation/index.md).

```text
Type: microsim
**sim-id:** sift-supplement<br/>
**Library:** p5.js<br/>
**Status:** Specified

Interactive four-step SIFT workflow diagram for evaluating supplement health claims. The worked example is: "Tumeric [sic] CURES inflammation and reverses arthritis — 1,200 patients CURED, study shows." Layout: four large clickable buttons arranged horizontally, labeled S (Stop), I (Investigate Source), F (Find Coverage), T (Trace Origins). Each button is color-coded: S=red, I=orange, F=blue, T=green. Clicking S: popup explains the emotional hook in the example claim ("CURES," "1,200 patients CURED"), and shows a "pause indicator" animation. Clicking I: popup shows a simulated website header from "NaturalHealthToday.com" with no author name, no date, and an affiliate link to purchase turmeric — accompanied by red flag checklist (no author, no institutional affiliation, commercial interest). Clicking F: popup shows a simulated search result for "turmeric arthritis" showing (1) a Cochrane review concluding "insufficient evidence"; (2) a PubMed result for a 23-patient trial; (3) the Arthritis Foundation page saying "promising but not conclusive." Clicking T: popup shows the original citation was a conference abstract from a company-sponsored symposium, not a peer-reviewed RCT, and the "1,200 patients" figure was cumulative enrollment across eight different studies with different designs. Bottom of canvas: "Verdict" button generates a summary card combining all four assessments. Canvas: 800×480px.
```

## Related Resources

- [Chapter 20: "Health Fraud, Nutritional Misinformation, and the Supplement Industry"](../../chapters/20-health-fraud-misinformation/index.md)
