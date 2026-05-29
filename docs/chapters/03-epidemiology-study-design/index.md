---
title: "Epidemiology: Study Design and Causal Inference"
description: Threats to validity including bias and confounding, surveillance system design, outbreak investigation methods, epidemic dynamics including R₀ and herd immunity, and screening test performance metrics.
generated_by: claude skill chapter-content-generator
date: 2026-05-28 14:30:00
version: 0.08
---

# Epidemiology: Study Design and Causal Inference

!!! mascot-welcome "From Measurement to Inference"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Sage waves welcome">
    Measuring disease accurately is necessary — but it is not sufficient. This chapter asks the harder questions: When does an observed association reflect a true relationship? How do surveillance systems detect outbreaks before they become disasters? What does it actually mean for a pathogen to be "contained"? Let's look at the data together.

## Summary

This chapter extends epidemiological foundations into the critical evaluation of evidence and applied outbreak science. Students learn the three major categories of error that can corrupt an epidemiological study (confounding, selection bias, information bias), how public health surveillance systems are designed and operated, how outbreak investigations are structured from case definition to source identification, and the mathematical principles governing epidemic spread including the reproduction number and herd immunity threshold. Screening test metrics (sensitivity, specificity, predictive values) complete the chapter.

This chapter builds on concepts from:

- [Chapter 1: Public Health Foundations](../01-foundations/index.md)
- [Chapter 2: Epidemiology: Disease Measurement](../02-epidemiology-disease-measurement/index.md)

## Concepts Covered

This chapter covers the following 24 concepts from the learning graph:

1. Confounding Variable
2. Selection Bias
3. Information Bias
4. Effect Modification
5. Surveillance System Design
6. Passive Surveillance
7. Active Surveillance
8. Sentinel Surveillance
9. Syndromic Surveillance
10. Reportable Conditions
11. Outbreak Investigation
12. Case Definition
13. Epidemic Curve
14. Index Case Identification
15. Source Hypothesis Testing
16. R0 Basic Reproduction Number
17. Effective Reproduction Rt
18. Serial Interval
19. Generation Time
20. Herd Immunity Threshold
21. Screening Sensitivity
22. Screening Specificity
23. Positive Predictive Value
24. Negative Predictive Value

---

## Threats to Validity: Bias, Confounding, and Effect Modification

An epidemiological study can produce a precise, statistically significant result that is nonetheless completely wrong. Understanding how this happens — and how to prevent it — is the core of critical appraisal. Three categories of error threaten the validity of observational studies: confounding, selection bias, and information bias. A fourth concept, effect modification, is not a form of bias but a real feature of nature that must be reported rather than removed.

### Confounding Variable

A **confounding variable** (or confounder) is a variable that is associated with both the exposure and the outcome, is not an intermediate step on the causal pathway between them, and thereby distorts the apparent exposure-outcome relationship. The three criteria matter: if the third variable is caused by the exposure (making it a mediator or collider), adjusting for it is inappropriate and will induce bias.

The classic example is the apparent association between coffee drinking and lung cancer in early studies. Coffee drinkers were more likely to smoke, and smoking causes lung cancer. Smoking was a confounder — associated with the exposure (coffee drinking) and independently causing the outcome (lung cancer). Once smoking was adjusted for, the coffee-cancer association disappeared.

Confounding can be controlled in the design phase (randomization, restriction, matching) or in the analysis phase (stratification, multivariable regression, propensity score methods). The key principle: you must know about a confounder to control for it. Unknown and unmeasured confounders remain a permanent limitation of observational epidemiology.

### Selection Bias

**Selection bias** arises when the study participants are not representative of the target population in a way that distorts the exposure-outcome relationship. It occurs when the probability of being included in the study depends on both exposure and outcome status simultaneously. Two subtypes are especially common in public health:

- **Healthy worker effect**: Occupational cohort studies that use the general population as a comparison group often find that workers appear healthier than expected. Workers are, by definition, healthy enough to be employed — excluding the sickest members of the general population. This biases occupational risk estimates toward the null.

- **Loss to follow-up bias**: In cohort studies, if participants who drop out differ from those who remain in their exposure and outcome status, the sample at follow-up no longer represents the original cohort. If sicker smokers drop out preferentially, the RR for smoking will be underestimated.

Selection bias is primarily a design problem and is difficult to correct in analysis. It is best prevented by careful sampling, high response rates, and retention strategies in longitudinal studies.

### Information Bias

**Information bias** (also called measurement bias or misclassification bias) arises from inaccurate measurement of exposure, outcome, or confounders. It has two subtypes:

- **Differential misclassification**: The misclassification is not random — it occurs at different rates in cases versus controls (or in exposed versus unexposed groups). The most common form is **recall bias** in case-control studies: cases who have experienced a serious illness may recall and report past exposures more thoroughly than controls, especially if they have been thinking about why they got sick. Differential misclassification can bias results in either direction.

- **Non-differential misclassification**: The misclassification is random and occurs equally in all groups (e.g., a poorly calibrated measurement instrument used the same way for everyone). Non-differential misclassification typically biases results toward the null — it dilutes associations and makes true effects harder to detect.

The following table summarizes all three bias types along with effect modification:

| Error Type | Definition | Primary Design Prevention | Consequence if Unaddressed |
|-----------|------------|--------------------------|---------------------------|
| Confounding | Third variable causes both exposure and outcome | Randomization; adjustment | Association may be spurious or masked |
| Selection Bias | Inclusion probability depends on E and O jointly | Representative sampling; retention | External or internal validity threatened |
| Information Bias (differential) | Misclassification rates differ by group | Blinding; validated instruments | Bias in any direction |
| Information Bias (non-differential) | Random misclassification across groups | Reliable measurement | Bias toward null |
| Effect Modification | True heterogeneity of effect by subgroup | Report stratified estimates | Pooled estimate masks important subgroup differences |

### Effect Modification

**Effect modification** (also called statistical interaction) occurs when the association between an exposure and an outcome differs across levels of a third variable. This third variable is called an **effect modifier**. Unlike confounding, effect modification is not a bias — it reflects a real feature of biology, society, or context that should be reported, not removed.

For example, the association between aspirin use and cardiovascular disease risk is modified by sex: aspirin's protective effect on stroke differs between men and women. In the COVID-19 context, age is a powerful effect modifier of the relationship between infection and mortality — the same pathogen produces very different case fatality ratios in people under 40 versus those over 80.

Effect modification is assessed by calculating the measure of association separately within strata defined by the potential modifier, then testing whether the stratum-specific estimates differ meaningfully. Reporting effect modification requires reporting stratified estimates, not a single pooled estimate.

!!! mascot-thinking "What does the evidence show?"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Sage thinking">
    Confounding and effect modification are often confused because both involve a "third variable." The key distinction: a confounder is something you want to eliminate from the analysis (it distorts the exposure-outcome relationship); an effect modifier is something you want to report within the analysis (it reveals how the relationship changes across groups). Adjusting for an effect modifier hides scientifically important information.

---

## Disease Surveillance Systems

**Surveillance** is defined by the CDC as the ongoing, systematic collection, analysis, interpretation, and dissemination of data about a health-related event for use in public health action. The word "ongoing" is critical — surveillance is not a one-time study but a continuous monitoring function that provides the early warning infrastructure for public health response.

The design of a surveillance system involves explicit choices about five dimensions: (1) what health events to monitor, (2) who reports (clinicians, laboratories, patients), (3) when reports are required (immediately, weekly, annually), (4) how data flow (paper, electronic, passive, active), and (5) how data are analyzed and disseminated. These choices determine a system's sensitivity, timeliness, simplicity, and cost.

### Passive and Active Surveillance

**Passive surveillance** relies on health providers and laboratories to voluntarily report cases of specified conditions to health authorities. The reporting burden is on the reporter, not the surveillance system. Most notifiable disease surveillance in the United States is passive — providers submit reports through standard workflows, and state and local health departments aggregate and forward data to the CDC.

Passive surveillance is inexpensive and scalable to a national level, but systematically undercounts disease burden. Providers may not recognize reportable conditions, may be too busy to report, or may have no easy mechanism to do so. Ascertainment rates for passive surveillance of reportable conditions often fall below 50% of true cases.

**Active surveillance** has the surveillance system proactively searching for cases, rather than waiting for reports. This may involve regular telephone calls to healthcare providers, systematic review of hospital records, or active case-finding in communities. Active surveillance is more resource-intensive but substantially more complete. It is used when complete case ascertainment is critical — during outbreak investigations, for rare but serious conditions, and for evaluation of vaccination programs.

### Sentinel, Syndromic, and Reportable Condition Surveillance

**Sentinel surveillance** uses a sample of strategically selected reporting sites (hospitals, clinics, laboratories) that provide detailed, high-quality data on a subset of cases, rather than trying to capture every case. The CDC's FluView system relies on a sentinel network of clinicians who report influenza-like illness (ILI) rates each week during flu season. Sentinel data sacrifice completeness for quality and speed.

**Syndromic surveillance** monitors pre-diagnosis clinical data — emergency department chief complaints, over-the-counter medication sales, nurse hotline calls, school absenteeism, or search engine query trends — to detect unusual health events before confirmed diagnoses are available. The BioSense Platform is the CDC's national syndromic surveillance system. Syndromic systems can detect unusual clustering of symptoms days before laboratory-confirmed cases appear, enabling faster outbreak response. Their primary challenge is low specificity: most unusual surges in "flu-like illness" are ordinary seasonal disease variation, not novel threats.

**Reportable conditions** (also called notifiable diseases) are a legally defined list of conditions that healthcare providers, hospitals, and laboratories are required to report to health authorities within specified timeframes. Timeframes range from immediate notification (for conditions like botulism, hemorrhagic fever, novel influenza A, plague) to weekly or monthly reporting (for conditions like gonorrhea, HIV, tuberculosis). In the United States, reportable condition lists are set by each state; the CDC requests voluntary data sharing from states through the National Notifiable Diseases Surveillance System (NNDSS).

The following table compares the four surveillance types:

| Type | Who Reports | Case Completeness | Speed | Primary Use |
|------|------------|-------------------|-------|-------------|
| Passive | Providers (voluntary) | Low (< 50%) | Variable (days to weeks) | Population-level trend monitoring |
| Active | Surveillance staff (proactive) | High (> 80%) | Fast | Outbreak investigation, program evaluation |
| Sentinel | Selected sentinel sites | Sample only | Fast | Severity estimation, trend detection |
| Syndromic | Automated data streams | Pre-diagnostic | Very fast (hours) | Early warning, anomaly detection |

---

## Outbreak Investigation

An outbreak is defined as a greater-than-expected number of cases of a disease in a given time and place. An **epidemic** is the same concept at a larger geographic scale; in common usage the terms are often interchangeable. The investigation of an outbreak follows a structured sequence that serves both the scientific goal of identifying cause and the operational goal of stopping transmission.

### Case Definition

Before counting cases, investigators must agree on what a case is. A **case definition** specifies the clinical, laboratory, epidemiological, and temporal criteria that must be met for an individual to be counted as a case. Case definitions have two dimensions:

- **Specificity/sensitivity tradeoff**: A narrow case definition (requiring laboratory confirmation plus specific symptoms) is highly specific but may miss many true cases and delay identification of the outbreak source. A broad case definition (requiring only one or two symptoms in the affected time-place window) is sensitive but will include false positives.

- **Classification levels**: Many outbreak investigations use tiered case definitions — **confirmed** cases (meet laboratory and clinical criteria), **probable** cases (clinical and epidemiological criteria without laboratory confirmation), and **suspected** cases (some compatible features but insufficient for confirmation).

Case definitions are not fixed — they may be deliberately broadened early in an investigation to ensure no cases are missed, then narrowed as the outbreak source becomes clearer.

### Index Case Identification and Epidemic Curves

The **index case** is the first identified case of the disease in the outbreak. The index case is not necessarily the first person infected (that is the **primary case**) — it is simply the first case brought to public health attention. Identifying the index case and reconstructing the exposure history around that individual is often the entry point for outbreak investigation.

An **epidemic curve** (epi curve) is a histogram that plots the number of cases by date (or time) of illness onset. The shape of an epidemic curve is one of the most diagnostic tools in outbreak investigation. Two primary shapes emerge from two transmission patterns:

- **Common source, point exposure**: A sharp, narrow peak followed by rapid decline, with a width approximately equal to the incubation period of the disease. Classic example: a single meal at a wedding where the potato salad was contaminated. All cases develop within one incubation period of the exposure event.

- **Propagated (person-to-person)**: A series of successive peaks, each spaced approximately one serial interval apart, with cases increasing over multiple generations of transmission. Classic example: measles spreading through an unvaccinated school population.

Mixed patterns occur when an initial common source exposure seeds ongoing person-to-person transmission.

#### Diagram: Epidemic Curve Shape Explorer

<iframe src="../../sims/epidemic-curve-explorer/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>Epidemic Curve Shape Explorer MicroSim</summary>
Type: microsim
**sim-id:** epidemic-curve-explorer<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: Identify (L1) and interpret (L2) epidemic curve shapes to distinguish common-source point exposure outbreaks from propagated person-to-person outbreaks.

Canvas layout:
- Top: radio button selector for outbreak type (Point Source / Propagated / Mixed)
- Main chart: bar chart showing cases by day of onset (x-axis: days, y-axis: number of cases)
- Bottom panel: infobox explaining the selected curve type, its diagnostic characteristics, and a real-world example

Three dataset modes:
1. Point Source: Gaussian-shaped peak centered at day 7, width approximately 3 days (incubation period 2-3 days), total 60 cases. Represents a foodborne outbreak.
2. Propagated: Three successive peaks at days 5, 19, and 33 (serial interval approximately 14 days), each larger than the last. Represents measles in a school.
3. Mixed: Point-source peak at day 7 followed by smaller propagated peaks at days 14 and 21.

Interactive behavior:
- Selecting a radio button updates the bar chart with animation (Chart.js transition)
- Hovering a bar shows: day, case count, "Day of onset: X, Cases: Y"
- Clicking a bar highlights the bar and updates the infobox with the specific context for that day

Annotations on chart:
- Point source mode: annotation marking "Exposure event (Day 0)" and bracket showing incubation period width
- Propagated mode: annotations marking "Generation 1", "Generation 2", "Generation 3"
- Serial interval annotation: double-headed arrow between peaks labeled "Serial Interval (~14 days)"

Colors: Point source bars = #2196F3 (blue); Propagated bars = #FF9800 (orange); Mixed = #9C27B0 (purple)

Responsive: chart fills 100% of container width; height 350px. Resizes on window resize.
</details>

### Source Hypothesis Testing

After the epidemic curve and descriptive epidemiology identify potential vehicles of transmission, **source hypothesis testing** generates and tests a specific hypothesis about what caused the outbreak. In a foodborne outbreak, investigators compare the attack rate among people who ate each specific food item to the attack rate among those who did not eat that item:

\[ \text{Relative Risk of food X} = \frac{\text{Attack rate among those who ate food X}}{\text{Attack rate among those who did not eat food X}} \]

The food item with the highest relative risk, the highest attributable fraction, and a statistically significant association is the candidate vehicle. An analytic study (usually a cohort study if all exposed people can be identified, or a case-control study if only cases are identifiable) is then conducted to test the hypothesis with formal statistical methods.

The ten-step outbreak investigation framework, as used by the CDC, integrates all the steps above:

1. Prepare for fieldwork
2. Establish existence of an outbreak
3. Verify the diagnosis
4. Define and identify cases
5. Describe the outbreak by person, place, and time
6. Develop hypotheses
7. Evaluate hypotheses (analytic epidemiology)
8. Refine hypotheses and carry out additional studies
9. Implement control and prevention measures
10. Communicate findings

---

## Epidemic Dynamics: R₀, Rₜ, and Herd Immunity

Understanding how infectious disease spreads through a population requires a mathematical framework. The four parameters covered in this section form the core vocabulary of infectious disease epidemiology and were used daily during the COVID-19 pandemic — often incorrectly in public discourse.

### R₀: The Basic Reproduction Number

The **basic reproduction number (R₀)**, pronounced "R-naught," is defined as the average number of secondary infections produced by a single infectious individual in a completely susceptible population. Two conditions are critical to this definition: (1) "basic" means no immunity exists — the population is fully susceptible; (2) no interventions are in place.

R₀ is a property of the pathogen-host-environment combination, not of the pathogen alone. The same pathogen can have very different R₀ values in different settings — in dense urban populations versus rural communities, in winter versus summer, in populations with prior immunity from related strains versus fully naive populations.

R₀ determines the epidemic potential of a pathogen:

- If R₀ < 1: on average, each case produces less than one new case; the outbreak dies out.
- If R₀ = 1: endemic equilibrium — the pathogen persists but does not grow.
- If R₀ > 1: each case produces more than one new case; the outbreak will grow exponentially unless interventions reduce transmission.

Representative R₀ values include: seasonal influenza (1.2–1.4), COVID-19 ancestral strain (2.5–3.5), COVID-19 Omicron (8–15), measles (12–18).

### Rₜ: The Effective Reproduction Number

The **effective reproduction number (Rₜ)** measures the same quantity as R₀ but in a real population at time t — accounting for the proportion of the population that is immune (through natural infection or vaccination), behavioral interventions, and other changes. The relationship is:

\[ R_t = R_0 \times S_t \]

where \( S_t \) is the proportion of the population still susceptible at time t. As an epidemic progresses and immunity accumulates, \( S_t \) falls and Rₜ declines. When Rₜ falls below 1.0, the epidemic begins to recede.

Rₜ estimation in real time became a critical tool during COVID-19. The Rt.live platform and similar tools estimated Rₜ daily from case count data for each US state. When Rₜ rose above 1.0, it signaled accelerating transmission; when it fell below 1.0, it signaled that interventions were working. The challenge: because case counts reflect infections that occurred 7–14 days earlier (due to incubation period and testing delays), Rₜ estimates always lag the true transmission situation by one to two weeks.

### Serial Interval and Generation Time

Two related time-based parameters describe the pace of transmission:

**Serial interval**: The time between the onset of symptoms in a primary case and the onset of symptoms in a secondary case they infected. Serial interval is observable from linked case pairs in outbreak investigations. For COVID-19 (original strain), the serial interval was approximately 4–7 days.

**Generation time** (or generation interval): The time between infection of a primary case and infection of a secondary case they produce. Unlike serial interval, generation time is measured from infection to infection, not from symptom onset to symptom onset. Because the exact moment of infection is difficult to observe directly, generation time is harder to measure than serial interval.

The distinction matters when pre-symptomatic transmission is common. If an infectious person transmits before they develop symptoms — as occurred frequently with COVID-19 — then the serial interval can be shorter than the generation time, and cases may appear to have been infected before their infector became symptomatic (negative serial intervals). This feature was an early signal that COVID-19 would be particularly difficult to control with symptom-based interventions alone.

### Herd Immunity Threshold

The **herd immunity threshold (HIT)** is the proportion of a population that must be immune (through vaccination or prior infection) to cause Rₜ to fall below 1.0 and bring an epidemic to natural decline. It is derived directly from R₀:

\[ \text{HIT} = 1 - \frac{1}{R_0} \]

For measles (R₀ ≈ 15), the HIT is approximately 93%. For COVID-19 (R₀ ≈ 3), it is approximately 67%. For COVID-19 Omicron (R₀ ≈ 12), it exceeds 90%.

!!! mascot-warning "Herd immunity is not a fixed finish line"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Sage warning">
    The herd immunity threshold assumes a homogeneous, well-mixed population — a simplification that does not hold in reality. Geographic clustering of unvaccinated individuals (vaccine-hesitant communities) means that local herd immunity may fail even when national vaccination coverage exceeds the HIT. Measles outbreaks regularly occur in the US despite overall vaccination coverage above 90% because of concentrated pockets of unvaccinated children. The HIT is a population average; local clustering can sustain transmission far above that threshold.

#### Diagram: R₀ and Herd Immunity Explorer

<iframe src="../../sims/r0-herd-immunity-explorer/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>R₀ and Herd Immunity Threshold Interactive Explorer</summary>
Type: microsim
**sim-id:** r0-herd-immunity-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Apply (L3) the relationship between R₀ and the herd immunity threshold by adjusting R₀ values for different pathogens and calculating the required vaccination coverage.

Canvas layout:
- Left (60%): main drawing area with branching tree showing transmission chains from one index case
- Right (40%): control panel and numeric displays

Drawing area:
- Show 3 generations of transmission from one index case (index case to R₀ secondaries to R₀-squared tertiaries)
- Circle nodes: susceptible (white), infected (red), immune (gray, with X mark)
- When immunity proportion slider moves, randomly gray out that proportion of nodes across all generations
- Highlight Rₜ = R₀ × (1 - immunity proportion) in real time

Interactive controls:
- Slider: R₀ (1.0 to 18.0, step 0.1). Preset buttons for: Seasonal Flu (1.3), COVID-19 original (3.0), COVID-19 Omicron (12.0), Measles (15.0)
- Slider: Current immune proportion (0% to 100%)
- Display: R₀ value, HIT = 1 - 1/R₀, Current Rₜ, Status (Growing / Declining)

Status display:
- When Rₜ > 1.0: status bar shown in red, text "Epidemic growing"
- When Rₜ = 1.0: yellow, "Endemic equilibrium"
- When Rₜ < 1.0: green, "Epidemic declining"

Formula panel: shows HIT formula and Rₜ = R₀ × S with current numbers substituted.

Responsive: updateCanvasSize() called in setup(). Canvas scales to container width.

Instructional rationale: Parameter exploration is appropriate for this Apply/L3 objective — learners must manipulate R₀ and vaccination coverage to find the HIT, reinforcing the mathematical relationship through discovery rather than observation.
</details>

---

## Screening Test Performance

Screening programs are designed to detect disease in asymptomatic individuals before clinical symptoms appear, allowing earlier treatment. The performance of any screening test is characterized by four metrics derived from comparing test results to the true disease status (established by a gold standard reference test). Two building blocks define the 2×2 structure:

- **True positive (TP)**: test positive, person truly has disease
- **False positive (FP)**: test positive, person does not have disease
- **True negative (TN)**: test negative, person truly does not have disease
- **False negative (FN)**: test negative, person actually has disease

From these four cells, four performance metrics are calculated. Before we examine the formulas, note which comparisons each metric makes: sensitivity and specificity are calculated down columns (within disease status); PPV and NPV are calculated across rows (within test result).

**Sensitivity** is the probability that the test correctly identifies a person who has the disease:

\[ \text{Sensitivity} = \frac{TP}{TP + FN} \]

A highly sensitive test misses few true cases (low false negative rate). Sensitivity is the appropriate priority when the cost of missing a case is high — for example, in early HIV screening or initial cancer screening.

**Specificity** is the probability that the test correctly identifies a person who does not have the disease:

\[ \text{Specificity} = \frac{TN}{TN + FP} \]

A highly specific test rarely labels healthy people as diseased (low false positive rate). Specificity is the priority when false positives are costly — when further testing is invasive, expensive, or psychologically burdensome.

**Positive predictive value (PPV)** is the probability that a person with a positive test result actually has the disease:

\[ PPV = \frac{TP}{TP + FP} \]

**Negative predictive value (NPV)** is the probability that a person with a negative test result truly does not have the disease:

\[ NPV = \frac{TN}{TN + FN} \]

Unlike sensitivity and specificity, which are properties of the test itself, PPV and NPV depend heavily on **disease prevalence** (pretest probability). When prevalence is low, even a highly specific test will generate many false positives in a large screened population, driving down PPV. This is why screening programs are targeted to high-prevalence subpopulations rather than applied universally.

#### Diagram: Screening Test Performance Calculator

<iframe src="../../sims/screening-test-calculator/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Screening Test Performance Calculator MicroSim</summary>
Type: microsim
**sim-id:** screening-test-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Apply (L3) sensitivity, specificity, PPV, and NPV calculations by adjusting sensitivity, specificity, and disease prevalence sliders and observing how each metric changes.

Canvas layout:
- Left (50%): 2x2 table visualization showing TP, FP, FN, TN counts as proportional colored boxes
- Right (50%): sliders on top, calculated metric display below

Sliders (p5.js createSlider):
- Sensitivity: 0.50 to 0.99 (default 0.90)
- Specificity: 0.50 to 0.99 (default 0.90)
- Disease Prevalence: 0.1% to 50% (default 5%)
- Population size: 1,000 to 100,000 (default 10,000, affects absolute numbers but not ratios)

2x2 table display (visual, not static text):
- Four quadrants colored by type: TP (green), FP (orange), FN (red), TN (blue)
- Each quadrant shows the calculated count given current slider values
- Quadrant area proportional to count (treemap-style layout within fixed box)

Metric display (right panel, updates in real time):
- Sensitivity (with formula and current values substituted)
- Specificity (with formula and current values substituted)
- PPV (with formula and current values substituted)
- NPV (with formula and current values substituted)
- Interpretation line: "At current prevalence: 1 in X positive tests is a true positive"

Key educational behavior: When prevalence slider drops below approximately 2%, PPV drops dramatically even as sensitivity and specificity stay high — this is the key lesson about screening in low-prevalence populations. The visual area change in the 2x2 table makes this concrete.

Instructional rationale: Parameter manipulation with concurrent formula display is appropriate for L3 Apply objectives. The simultaneous table and metric display enforces data visibility — learners see the calculation, not just the result.

Responsive: updateCanvasSize() in setup(). Canvas fills container width.
</details>

!!! mascot-encourage "This math is worth the effort"
    <img src="../../img/mascot/encouraging.png" class="mascot-admonition-img" alt="Sage encouraging">
    PPV and NPV are among the most misunderstood concepts in clinical and public health practice. Clinicians routinely over-interpret positive test results in low-prevalence settings, and public health officials regularly underestimate the false positive burden of mass screening programs. Investigators who can fluently calculate and communicate these metrics are genuinely rare — and genuinely valuable.

---

## Key Takeaways

**Validity and Bias:**

- Confounders distort exposure-outcome relationships and should be controlled; effect modifiers reveal true heterogeneity and should be reported.
- Selection bias and information bias are primarily design problems, not fixable in analysis.
- Non-differential misclassification biases toward the null; differential misclassification can bias in any direction.

**Surveillance:**

- Passive surveillance is scalable but undercounts; active surveillance is complete but resource-intensive.
- Syndromic surveillance provides early warning using pre-diagnostic data streams; its primary weakness is low specificity.
- Reportable conditions are legally mandated; timeliness requirements range from immediate (for priority pathogens) to monthly.

**Outbreak Investigation:**

- Case definitions balance sensitivity and specificity; tiered definitions (confirmed/probable/suspected) allow flexible investigation.
- Epidemic curve shape distinguishes point-source from propagated outbreaks.
- Source hypothesis testing compares attack rates by food or exposure item.

**Epidemic Dynamics:**

- R₀ describes theoretical epidemic potential; Rₜ describes real-time transmission accounting for immunity and interventions.
- HIT = 1 − 1/R₀; geographic clustering of susceptible individuals can sustain transmission even when national coverage exceeds the HIT.

**Screening:**

- Sensitivity and specificity are properties of the test; PPV and NPV depend on disease prevalence.
- In low-prevalence settings, even highly specific tests produce predominantly false positives.

??? question "Self-Check: PPV and prevalence"
    A test for a rare genetic condition has sensitivity = 99% and specificity = 99%. In a population where 1 in 1,000 people has the condition, what is the approximate PPV of a positive test result?

    **Answer:** In 100,000 people: 100 truly have the condition (1 in 1,000). Of these, 99% × 100 = 99 will test positive (true positives). Of the 99,900 who do not have the condition, 1% × 99,900 ≈ 999 will falsely test positive. PPV = 99 / (99 + 999) ≈ 99/1,098 ≈ **9%**. Only 1 in 11 positive tests is a true positive — despite excellent sensitivity and specificity. This is why screening programs target high-prevalence subgroups.

!!! mascot-celebration "Chapter 3 complete!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Sage celebrating">
    Bias, surveillance, outbreak investigation, and epidemic dynamics: this chapter gave you the critical lens that separates careful epidemiological reasoning from the loose talk that polluted public health discourse during COVID-19. The tools here — R₀, Rₜ, PPV, epidemic curves — will return in nearly every applied chapter that follows.
