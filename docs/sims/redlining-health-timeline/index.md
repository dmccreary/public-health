---
title: Redlining and Health Timeline
description: Interactive timeline from 1933 to the present. Housing policy events sit above the line and the health research that documents their consequences sits below it.
image: /sims/redlining-health-timeline/redlining-health-timeline.png
og:image: /sims/redlining-health-timeline/redlining-health-timeline.png
twitter:image: /sims/redlining-health-timeline/redlining-health-timeline.png
social:
   cards: false
hide:
  - toc
status: implemented
library: p5.js
bloom_level: Understand
quality_score: 100
---

# Redlining and Health Timeline

<iframe src="main.html" height="582px" width="100%" scrolling="no"></iframe>

[Run the Redlining and Health Timeline MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

Redlining was the practice of denying mortgages and mortgage insurance to whole
neighborhoods, mostly on the basis of race. This timeline places two kinds of
events on one axis that runs from 1930 to 2025:

- **Above the line:** housing policy and events, from the creation of the Home Owners' Loan Corporation in 1933 to the repeal of a federal fair housing rule in 2020.
- **Below the line:** health research that documented the consequences, from the 1985 Heckler Report to 2020 studies that link 1930s map grades to present-day asthma and heat.

Color shows the type of event. Red is a discriminatory policy or a setback,
green is a reform, and orange is a health research finding.

Selecting an event opens a panel with a three-sentence summary, one key fact,
and, where a specific study or report is cited, its source.

## How to Use

1. Press **Next →** to open the first event, then keep pressing it to step through all 14 events in date order.
2. Or click any year marker to jump to that event. Hover over a marker to see its name.
3. Press **← Previous** to step back.
4. Press **Reset** to return to the opening panel.

## Events on the Timeline

| Year | Event | Lane | Type |
|------|-------|------|------|
| 1933 | Home Owners' Loan Corporation (HOLC) created | Policy | Discriminatory policy |
| 1934 | Federal Housing Administration (FHA) created | Policy | Discriminatory policy |
| 1944 | GI Bill home loans | Policy | Discriminatory policy |
| 1968 | Fair Housing Act | Policy | Reform |
| 1977 | Community Reinvestment Act | Policy | Reform |
| 1980s | Deregulation opens the door to subprime lending | Policy | Setback |
| 2008 | Foreclosure crisis | Policy | Setback |
| 2020 | Federal fair housing rule repealed | Policy | Setback |
| 1985 | Heckler Report on Black and minority health | Research | Health research |
| 1992 | Weathering hypothesis (Geronimus) | Research | Health research |
| 2001 | Segregation named a fundamental cause (Williams and Collins) | Research | Health research |
| 2016 | HOLC maps put online (Mapping Inequality) | Research | Health research |
| 2020 | Redlining and asthma (Nardone et al.) | Research | Health research |
| 2020 | Redlining and urban heat (Hoffman et al.) | Research | Health research |

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/public-health/sims/redlining-health-timeline/main.html"
        height="582px"
        width="100%"
        scrolling="no"></iframe>
```

## Learning Objective

Students will be able to explain how federal housing policy from the 1930s
onward produced health consequences that researchers can still measure today,
by stepping through the policy events and the research findings in date order.

## Specification

The full specification below is extracted from
[Chapter 10: Health Equity and Social Determinants of Health](../../chapters/10-health-equity-sdoh/index.md).

```text
Type: microsim
sim-id: redlining-health-timeline
Library: p5.js
Status: Specified

Horizontal scrollable timeline from 1933 to 2025. Key events are represented
as clickable nodes above the timeline axis (policy events) or below (health
outcome documentation). Above-axis nodes include: 1933 HOLC established; 1934
FHA redlining maps begin; 1944 GI Bill housing loans (racially restricted);
1968 Fair Housing Act; 1977 Community Reinvestment Act; 1980s subprime lending
targeting minority neighborhoods; 2008 foreclosure crisis; 2020 HUD equity
rule suspended. Below-axis nodes include: 1975 first studies on residential
segregation and health; 2003 Geronimus weathering hypothesis; 2020 Nelson et
al. HOLC-asthma mapping study; 2023 heat island analysis. Clicking any node
opens a text panel with a 3-sentence summary and a relevant statistic. Color
coding: red for discriminatory policy, green for reform, orange for health
research finding.
```

### Implementation Notes

Historical dates and attributions were checked against the published sources
listed under References. Several items in the specification were changed so
that every event on the timeline is one that can be sourced.

- **1934 FHA.** The color-coded maps were drawn by the HOLC between 1935 and 1940, not by the FHA in 1934. The 1934 event is the creation of the FHA, whose underwriting rules put redlining into practice.
- **1980s subprime lending.** Subprime lending grew mainly in the 1990s and 2000s. The 1980s event is the deregulation (laws of 1980 and 1982) that made it possible.
- **2020 HUD rule.** The 2015 Affirmatively Furthering Fair Housing rule was suspended in 2018 and repealed in 2020. The event is labeled as a repeal.
- **1975 "first studies on residential segregation and health."** No specific 1975 study could be identified with confidence, so this event was left out. Two well-documented events take its place: the 1985 Heckler Report and the 2001 Williams and Collins paper.
- **2003 weathering hypothesis.** Arline Geronimus published the weathering hypothesis in 1992. The event is placed at 1992 and cites her 2006 allostatic load study as the key fact.
- **2020 "Nelson et al." asthma study.** The redlining and asthma study was written by Nardone and colleagues. Robert K. Nelson leads Mapping Inequality, the project that digitized the HOLC maps, which is shown as its own event at 2016.
- **2023 heat island analysis.** No specific 2023 analysis could be identified with confidence. The event shown is the 2020 study of 108 urban areas by Hoffman, Shandas, and Pendleton.
- **Key facts.** The specification asks for a statistic for every event. Where no statistic could be stated with confidence (1933, 1968, 1977, 1980s, 2020 rule, 2001), the panel gives a key fact in words.
- **Scrolling.** The whole timeline is fitted to the width of the page, so no horizontal scrolling is needed. Markers for nearby years stack vertically.

## Lesson Plan

### Audience

Undergraduate and graduate students in a first public health course.

### Duration

15-20 minutes

### Prerequisites

- Social determinants of health
- The definition of health equity and health disparity

### Activities

1. **First look** (2 min): Before clicking anything, students describe the pattern of colors. Where do the red markers cluster? When does the first orange marker appear?
2. **Step through** (8 min): Students press Next to read all 14 events. For each policy event they note one mechanism that could affect health, such as lost home equity, concentrated poverty, or fewer trees and parks.
3. **Connect** (5 min): Students choose one research finding below the line and trace it back to at least two policy events above the line. They write the chain as three or four linked statements.
4. **Discuss** (5 min): The Fair Housing Act made redlining illegal in 1968. Why do studies from 2020 still find differences between neighborhoods that were graded A and D in the 1930s?

### Assessment

- The student places five shuffled events in the correct order and labels each as discriminatory policy, reform, or research.
- The student explains, with one example from the timeline, how a housing policy can become a health outcome decades later.
- The student explains why ending a discriminatory policy does not by itself end its health effects.

## References

1. [Redlining](https://en.wikipedia.org/wiki/Redlining) - Wikipedia - Overview of the HOLC maps, FHA underwriting, and later fair housing and lending laws.
2. [Mapping Inequality: Redlining in New Deal America](https://dsl.richmond.edu/panorama/redlining/) - University of Richmond Digital Scholarship Lab - The digitized HOLC maps and neighborhood descriptions.
3. Nardone, A., Casey, J. A., Morello-Frosch, R., Mujahid, M., Balmes, J. R., & Thakur, N. (2020). Associations between historical residential redlining and current age-adjusted rates of emergency department visits due to asthma across eight cities in California: an ecological study. *The Lancet Planetary Health*, 4(1). Source of the asthma finding.
4. Hoffman, J. S., Shandas, V., & Pendleton, N. (2020). The effects of historical housing policies on resident exposure to intra-urban heat: A study of 108 US urban areas. *Climate*, 8(1), 12. Source of the urban heat finding.
5. Williams, D. R., & Collins, C. (2001). Racial residential segregation: A fundamental cause of racial disparities in health. *Public Health Reports*, 116(5), 404-416.
6. Geronimus, A. T., Hicken, M., Keene, D., & Bound, J. (2006). "Weathering" and age patterns of allostatic load scores among Blacks and Whites in the United States. *American Journal of Public Health*, 96(5), 826-833.
7. [Heckler Report](https://en.wikipedia.org/wiki/Heckler_Report) - Wikipedia - Summary of the 1985 Report of the Secretary's Task Force on Black and Minority Health.
8. [Wealth Gaps Rise to Record Highs Between Whites, Blacks, Hispanics](https://www.pewresearch.org/social-trends/2011/07/26/wealth-gaps-rise-to-record-highs-between-whites-blacks-hispanics/) - 2011 - Pew Research Center - Source of the 2005 to 2009 household wealth figures.
9. Katznelson, I. (2005). *When Affirmative Action Was White: An Untold History of Racial Inequality in Twentieth-Century America*. W. W. Norton. Source of the 1947 Mississippi GI Bill loan count.

## Related Resources

- [Chapter 10: Health Equity and Social Determinants of Health](../../chapters/10-health-equity-sdoh/index.md)
- [Upstream vs. Downstream Intervention Visualizer](../upstream-downstream-river/index.md)
- [Dahlgren-Whitehead Rainbow Model](../dahlgren-whitehead-rainbow/index.md)
