---
title: Research Ethics Timeline
description: Interactive timeline of research abuses and the codes and regulations written in response, from the Tuskegee study (1932) to the revised Common Rule (2018).
image: /sims/research-ethics-timeline/research-ethics-timeline.png
og:image: /sims/research-ethics-timeline/research-ethics-timeline.png
twitter:image: /sims/research-ethics-timeline/research-ethics-timeline.png
social:
   cards: false
hide:
  - toc
status: implemented
library: p5.js
bloom_level: Understand
quality_score: 100
---

# Research Ethics Timeline

<iframe src="main.html" height="592px" width="100%" scrolling="no"></iframe>

[Run the Research Ethics Timeline MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The rules that govern research with human subjects were written in response to
specific abuses. This timeline shows both on one axis that runs from 1930 to 2025:

- **Above the line:** codes and regulations. Green markers are international standards and blue markers are US regulations.
- **Below the line:** research abuses and scandals, shown in red.

Selecting an event opens a panel with four parts: the event name and year, a
three-sentence description, the ethical principle involved, and the regulatory
response. For a code or regulation, the last part says what prompted it.

## How to Use

1. Press **Next →** to open the first event, then keep pressing it to step through all 12 events in date order.
2. Or click any year marker to jump to that event. Hover over a marker to see its name.
3. Press **← Previous** to step back.
4. Press **Reset** to return to the opening panel.

## Events on the Timeline

| Year | Event | Lane | Type |
|------|-------|------|------|
| 1932 | Tuskegee syphilis study begins | Abuses | Research scandal |
| 1947 | Nuremberg Code | Rules | International standard |
| 1956 | Willowbrook hepatitis studies | Abuses | Research scandal |
| 1963 | Jewish Chronic Disease Hospital | Abuses | Research scandal |
| 1964 | Declaration of Helsinki | Rules | International standard |
| 1972 | Tuskegee study exposed | Abuses | Research scandal |
| 1974 | National Research Act | Rules | US regulation |
| 1979 | Belmont Report | Rules | US regulation |
| 1991 | Common Rule (45 CFR 46) | Rules | US regulation |
| 1999 | Death of Jesse Gelsinger | Abuses | Research scandal |
| 2006 | SFBC International drug-testing site | Abuses | Research scandal |
| 2018 | Revised Common Rule | Rules | US regulation |

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/public-health/sims/research-ethics-timeline/main.html"
        height="592px"
        width="100%"
        scrolling="no"></iframe>
```

## Learning Objective

Students will be able to explain how specific research abuses led to the codes
and regulations that protect human subjects today, and identify which Belmont
principle each abuse violated, by stepping through the events in date order.

## Specification

The full specification below is extracted from
[Chapter 11: Public Health Ethics](../../chapters/11-public-health-ethics/index.md).

```text
Type: microsim
sim-id: research-ethics-timeline
Library: p5.js
Status: Specified

Horizontal scrollable timeline from 1930 to 2025. Events are placed as
clickable nodes above and below the timeline axis. Above-axis nodes
(policy/regulatory): 1932 Tuskegee Study begins; 1947 Nuremberg Code; 1964
Declaration of Helsinki; 1972 Tuskegee exposed by media; 1974 National
Research Act; 1979 Belmont Report published; 1991 Common Rule (45 CFR 46);
2018 Revised Common Rule. Below-axis nodes (research scandals and reforms):
1956 Willowbrook hepatitis study; 1963 Jewish Chronic Disease Hospital tumor
injections; 2000 Jesse Gelsinger gene therapy death; 2006 SFBC International
FDA investigation. Clicking any node opens a side panel with: (1) event name
and year, (2) a 3-sentence description, (3) an ethical principle implicated,
and (4) the regulatory response it prompted. Color-coded: red for scandal,
blue for regulation, green for international standard. Reset button clears
panel.
```

### Implementation Notes

Dates and facts were checked against the sources listed under References. The
implementation differs from the specification in these ways.

- **The two Tuskegee events are below the line.** The specification lists them with the policy events. They are research scandals, so they sit in the abuses lane with the other red markers. Every marker above the line is now a code or a regulation.
- **Jesse Gelsinger is placed at 1999, not 2000.** He died on September 17, 1999. The federal response came in 2000 and is described in the panel.
- **SFBC International.** The reporting that exposed the site was published in 2005. The FDA inspection, the demolition order, and the closure came in 2006, which is the year shown.
- **Revised Common Rule.** The rule is known as the 2018 Requirements and is shown at 2018. It was published in January 2017, and the general compliance date was January 21, 2019.
- **"Prompted by" for rules.** The fourth panel item is "Regulatory response" for a scandal. For a code or regulation it reads "Prompted by", because a rule is itself the response.
- **Panel position.** The detail panel is below the timeline instead of beside it, so that the axis can use the full width of the page.
- **Scrolling.** The whole timeline is fitted to the width of the page, so no horizontal scrolling is needed. Markers for nearby years stack vertically.

## Lesson Plan

### Audience

Undergraduate and graduate students in a first public health course.

### Duration

15-20 minutes

### Prerequisites

- The three Belmont principles: respect for persons, beneficence, and justice
- The purpose of an Institutional Review Board (IRB)

### Activities

1. **First look** (2 min): Before clicking, students compare the two lanes. Do the red markers tend to come before or after the blue and green markers near them?
2. **Step through** (8 min): Students press Next to read all 12 events. For each scandal they record the principle violated and the response.
3. **Pair up** (5 min): Students match each rule above the line with the abuse or abuses that prompted it. Example: Tuskegee exposed (1972) and the National Research Act (1974).
4. **Discuss** (5 min): The Gelsinger and SFBC cases happened after the Common Rule was in force. What does that say about the limits of regulation? What else is needed?

### Assessment

- Given a short description of a study, the student names the Belmont principle that it violates and explains why.
- The student explains the path from the 1972 exposure of the Tuskegee study to the Belmont Report in three or four sentences.
- The student gives one reason why research abuses can still happen under current rules.

## References

1. [The Belmont Report](https://www.hhs.gov/ohrp/regulations-and-policy/belmont-report/index.html) - 1979 - US Department of Health and Human Services, Office for Human Research Protections - Full text of the report.
2. [Tuskegee Syphilis Study](https://en.wikipedia.org/wiki/Tuskegee_Syphilis_Study) - Wikipedia - History of the study, its exposure in 1972, and its aftermath.
3. [Nuremberg Code](https://en.wikipedia.org/wiki/Nuremberg_Code) - Wikipedia - The ten principles from the 1947 Doctors' Trial verdict.
4. [Declaration of Helsinki](https://en.wikipedia.org/wiki/Declaration_of_Helsinki) - Wikipedia - The World Medical Association's code and its revisions.
5. [Common Rule](https://en.wikipedia.org/wiki/Common_Rule) - Wikipedia - The 1991 federal policy and its 2017 revision.
6. Beecher, H. K. (1966). Ethics and clinical research. *New England Journal of Medicine*, 274(24), 1354-1360. The article that listed 22 examples of unethical research, including Willowbrook and the Jewish Chronic Disease Hospital.
7. [Willowbrook State School](https://en.wikipedia.org/wiki/Willowbrook_State_School) - Wikipedia - Includes the hepatitis studies.
8. [Chester M. Southam](https://en.wikipedia.org/wiki/Chester_M._Southam) - Wikipedia - Includes the Jewish Chronic Disease Hospital case.
9. [Jesse Gelsinger](https://en.wikipedia.org/wiki/Jesse_Gelsinger) - Wikipedia - The 1999 gene therapy death and the investigations that followed.

## Related Resources

- [Chapter 11: Public Health Ethics](../../chapters/11-public-health-ethics/index.md)
- [Nuffield Council Ladder of Interventions](../nuffield-ladder/index.md)
