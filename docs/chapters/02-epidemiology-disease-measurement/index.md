---
title: "Epidemiology: Disease Measurement"
description: Quantitative measures of disease frequency and association, foundational study designs from cross-sectional to randomized controlled trials, and causal inference frameworks including Bradford Hill criteria and directed acyclic graphs.
generated_by: claude skill chapter-content-generator
date: 2026-05-28 14:13:49
version: 0.08
---

# Epidemiology: Disease Measurement

!!! mascot-welcome "Welcome, Investigators"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Sage waves welcome">
    This chapter is where public health thinking becomes quantitative. Numbers are how we tell the story of disease across populations — and how we compare that story across time, place, and person. Let's look at the data together.

## Summary

Epidemiology is the core science of public health — the systematic study of how disease is distributed across populations and what determines that distribution. This chapter introduces the full toolkit of disease measurement: how to quantify how common a disease is, how strongly a risk factor predicts it, and how to choose a study design that answers a causal question. The Bradford Hill criteria and directed acyclic graphs provide the formal framework for moving from observed association to causal inference.

This chapter builds on concepts from:

- [Chapter 1: Public Health Foundations](../01-foundations/index.md)

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

1. Incidence Rate
2. Prevalence Proportion
3. Cumulative Incidence
4. Mortality Rate
5. Case Fatality Ratio
6. Infection Fatality Ratio
7. Morbidity Rate
8. Attack Rate
9. Secondary Attack Rate
10. Age-Standardized Rates
11. Relative Risk
12. Odds Ratio
13. Hazard Ratio
14. Attributable Risk
15. Population Attrib Fraction
16. Number Needed to Treat
17. Cross-Sectional Study Design
18. Case-Control Study Design
19. Cohort Study Design
20. Randomized Controlled Trial
21. Ecological Study Design
22. Natural Experiment Design
23. Bradford Hill Criteria
24. Directed Acyclic Graph
25. Counterfactual Model

---

## The Language of Disease Frequency

Public health workers share a precise vocabulary for describing how common disease is in a population. Imprecision in this vocabulary leads to confusion in policy and practice — a mistake that recurred visibly during the COVID-19 pandemic, when journalists, politicians, and even some public health officials used "case fatality ratio" and "infection fatality ratio" interchangeably despite their meaning very different things. Mastering these terms is not academic pedantry; it is operational precision.

All measures of disease frequency share a common structural skeleton: a numerator (cases or events), a denominator (the population at risk or under observation), and a time dimension (how long was observation occurring?). The differences between measures lie in exactly how each component is defined.

### Incidence Rate, Cumulative Incidence, and Prevalence

The most fundamental distinction in disease frequency is between **incidence** (new cases occurring during a period) and **prevalence** (existing cases present at a moment in time). Before we examine these formally, two definitions matter:

- **Population at risk**: the people who do not already have the disease and could potentially develop it. People who are immune or already infected are excluded from this denominator.
- **Person-time**: a unit that combines people and time. If 100 people are followed for one year, that is 100 person-years of observation.

The **incidence rate** (also called incidence density) measures the rate at which new cases occur in a population at risk:

\[ \text{Incidence Rate} = \frac{\text{New cases during period}}{\text{Person-time at risk during period}} \]

The result is expressed as cases per 1,000 (or 100,000) person-years. A rate of 50 per 100,000 person-years means that in a population of 100,000 people observed for one year, you would expect 50 new cases. The incidence rate is appropriate when follow-up time varies across individuals — as in prospective cohort studies where some participants drop out early.

**Cumulative incidence** (also called incidence proportion or attack rate in outbreak contexts) takes a simpler form:

\[ \text{Cumulative Incidence} = \frac{\text{New cases during period}}{\text{Population at risk at start of period}} \]

This is interpreted as a probability — the probability that a disease-free individual will develop the disease over the specified time period. Cumulative incidence is dimensionless (a proportion between 0 and 1, often expressed as a percentage) and is appropriate only when the observation period is fixed and follow-up is complete.

**Prevalence proportion** counts existing cases, not new ones:

\[ \text{Prevalence} = \frac{\text{Existing cases at a point in time}}{\text{Total population at that time}} \]

The relationship between incidence and prevalence is summarized by the **prevalence pot formula**: Prevalence ≈ Incidence Rate × Average Disease Duration. A disease can have high prevalence because it is common (high incidence) or because it lasts a long time (high duration), or both. HIV before antiretroviral therapy had high incidence and long duration; influenza has high incidence but short duration. This relationship is why effective HIV treatment paradoxically increased HIV prevalence — treated patients lived longer, filling the prevalence pot even as incidence fell.

#### Diagram: Incidence vs. Prevalence Explorer

<iframe src="../../sims/incidence-prevalence-explorer/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>Incidence vs. Prevalence Explorer MicroSim</summary>
Type: microsim
**sim-id:** incidence-prevalence-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Apply (L3) the relationship between incidence rate, disease duration, and prevalence proportion by adjusting simulation parameters and observing how the prevalence pool fills and drains.

Bloom level: Apply — learners manipulate incidence rate and duration sliders and predict how prevalence changes, then verify their prediction against the simulation output.

Canvas layout:
- Left panel (60%): animated "prevalence pool" — new cases flow in from the top (incidence), cases leave from the bottom (recovery/death). Active cases are circles in the pool, colored by time since diagnosis.
- Right panel (40%): numeric display showing current Incidence Rate, Duration, and calculated Prevalence; formula display updating in real time.

Interactive controls (p5.js createSlider):
- Slider: Incidence Rate (1–100 new cases per 1,000 per year)
- Slider: Average Disease Duration (0.1–10 years)
- Button: Reset
- Checkbox: Show formula calculation

Default parameters:
- Incidence Rate: 10 per 1,000/year
- Duration: 5 years
- Population: 10,000

Data Visibility Requirements:
Stage 1: Show current incidence rate (cases/1,000/yr)
Stage 2: Show duration setting
Stage 3: Show calculated prevalence using Prevalence ≈ IR × Duration
Stage 4: Show animated pool adjusting to equilibrium

Behavior:
- When sliders change, cases enter and leave pool at new rates
- Prevalence display updates every second
- Formula panel always shows the current calculation with actual numbers

Instructional Rationale: Sliders with real-time feedback are appropriate for an Apply/L3 objective because learners must manipulate parameters and observe consequences — passive animation would prevent the prediction-and-verify cycle that cements the relationship.

Responsive design: Canvas resizes on window resize. updateCanvasSize() called in setup().
</details>

### Mortality Rate, Morbidity Rate, and Fatality Ratios

The **mortality rate** is an incidence rate specifically counting deaths as the outcome. Like all rates, it requires a denominator of person-time at risk and a specified time period. Mortality rates are routinely age-standardized (see below) to allow fair comparisons across populations with different age structures.

**Morbidity rate** is a broader term for any measure of the frequency of disease in a population, encompassing both incidence and prevalence. In practice, "morbidity" often contrasts with "mortality" to signal that we are discussing illness burden, not death.

Two ratios describe the severity of disease once acquired. Before examining them, note that both are called "ratios" rather than "rates" — they have a defined numerator and denominator but lack a time dimension in the denominator, which distinguishes them from true rates.

- **Case Fatality Ratio (CFR)**: Deaths / Confirmed cases. The CFR answers: "Of the people we know had this disease, what fraction died?" Its critical limitation is that it depends on how many cases are detected. When testing is limited, many mild cases are missed, the denominator shrinks, and the CFR climbs artificially. During the early COVID-19 pandemic, CFRs varied from 0.1% to over 10% across countries largely because testing capacity differed, not because the virus behaved differently.

- **Infection Fatality Ratio (IFR)**: Deaths / All infected people (confirmed + estimated undetected). The IFR corrects for undertesting by using seroprevalence studies or other methods to estimate the true number infected. Because its denominator is larger, the IFR is always ≤ the CFR. For COVID-19, the IFR for the ancestral strain was estimated at approximately 0.5–1.0% — an order of magnitude below many early CFR estimates.

### Attack Rate and Secondary Attack Rate

**Attack rate** is the cumulative incidence in a defined population during a defined outbreak or exposure event. In a foodborne illness investigation, the attack rate among people who ate the suspect food versus those who did not drives the identification of the vehicle:

\[ \text{Attack Rate} = \frac{\text{Ill among those exposed}}{\text{Total exposed}} \times 100\% \]

**Secondary attack rate (SAR)** measures how readily a pathogen spreads within households or close-contact settings after an index case is introduced:

\[ \text{SAR} = \frac{\text{New cases among contacts}}{\text{Susceptible contacts}} \times 100\% \]

The SAR is one of several proxies for transmissibility. For COVID-19 in unvaccinated households, SARs ranged from approximately 15–25% for the original strain and climbed above 40% for Omicron, reflecting the variant's enhanced transmissibility.

### Age-Standardized Rates

A population with a higher proportion of elderly residents will appear to have a higher mortality rate than a younger population, even if age-specific risks are identical. **Age standardization** removes this confounding by applying a population's observed age-specific rates to a reference (standard) population's age distribution.

Two methods exist: **direct standardization** applies the observed age-specific rates to a standard population; **indirect standardization** (producing the Standardized Mortality Ratio, or SMR) applies a reference population's age-specific rates to the study population's age structure. Age-standardized rates are the currency of international and temporal mortality comparisons — the Global Burden of Disease study uses them to enable valid comparisons of death rates across 195 countries.

The following table summarizes the major measures of disease frequency:

| Measure | Numerator | Denominator | Time Dimension | Interpretation |
|---------|-----------|-------------|----------------|----------------|
| Incidence Rate | New cases | Person-time at risk | Embedded in denominator | Rate per person-time |
| Cumulative Incidence | New cases | Population at risk (start) | Fixed period | Probability of disease |
| Prevalence | Existing cases | Total population | Point in time | Proportion currently ill |
| Mortality Rate | Deaths | Person-time at risk | Embedded | Rate of death |
| CFR | Deaths | Confirmed cases | None | Proportion of confirmed cases dying |
| IFR | Deaths | All infected | None | Proportion of all infected dying |
| Attack Rate | Ill (exposed) | Total exposed | Outbreak period | Probability of illness if exposed |
| SAR | New cases in contacts | Susceptible contacts | Contact period | Probability of spread within groups |

!!! mascot-thinking "What does the evidence show?"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Sage thinking">
    When a headline says a disease has a "10% death rate," pause and ask: death rate measured how? Is this the case fatality ratio from confirmed cases only — which inflates the denominator problem — or an age-standardized mortality rate from a population-based cohort? The word "rate" is used loosely in public discourse; investigators use it precisely.

---

## Measures of Association

Knowing how common a disease is tells you about burden. Knowing how strongly a risk factor is associated with that disease tells you about causes and potential interventions. Measures of association compare disease frequency between exposed and unexposed groups.

The foundation for calculating measures of association is the **2×2 contingency table**, which cross-classifies individuals by exposure status (exposed vs. unexposed) and disease outcome (diseased vs. disease-free):

|  | **Disease +** | **Disease −** | **Total** |
|--|--------------|--------------|-----------|
| **Exposed** | a | b | a+b |
| **Unexposed** | c | d | c+d |
| **Total** | a+c | b+d | N |

With this table in hand, three primary ratio measures emerge.

### Relative Risk, Odds Ratio, and Hazard Ratio

The **relative risk (RR)**, also called risk ratio, is the ratio of cumulative incidence in the exposed group to cumulative incidence in the unexposed group:

\[ RR = \frac{a/(a+b)}{c/(c+d)} \]

An RR of 1.0 means no association. An RR of 3.0 means the exposed group develops the disease three times as often as the unexposed group. The RR is the most interpretable measure of association and is used whenever cumulative incidence can be calculated directly — that is, in cohort studies and RCTs.

The **odds ratio (OR)** is the ratio of the odds of exposure among cases to the odds of exposure among controls:

\[ OR = \frac{a/b}{c/d} = \frac{ad}{bc} \]

The OR is the required measure in case-control studies, where the investigator has sampled on outcome (cases and controls), making it impossible to calculate true cumulative incidence from the study data. When disease is rare (prevalence < 10%), the OR approximates the RR — but when disease is common, the OR diverges from the RR, often substantially. Misinterpreting ORs as RRs is one of the most common errors in reading epidemiological literature.

The **hazard ratio (HR)** is the measure of association from survival analysis. It represents the ratio of instantaneous event rates (hazards) between two groups over the follow-up period. HRs appear in Cox proportional hazards models and Kaplan-Meier comparisons. Like the RR, an HR > 1 signals elevated risk in the exposed group; an HR < 1 signals protection. Unlike the RR, the HR accounts for censoring — participants who leave the study before experiencing the outcome are not simply discarded.

### Attributable Risk and Population Attributable Fraction

Ratio measures (RR, OR, HR) describe how much more likely exposed individuals are to develop disease. **Absolute** measures of association describe how many cases in a population are attributable to the exposure. Two absolute measures matter for policy:

**Attributable risk (AR)**, also called risk difference, is the excess incidence in the exposed group:

\[ AR = CI_{exposed} - CI_{unexposed} \]

If smokers have a 20% ten-year risk of lung cancer and non-smokers have a 1% risk, the AR is 19 percentage points — that is the excess risk attributable to smoking in an individual who smokes.

**Population attributable fraction (PAF)** extends this to the entire population, estimating the proportion of all cases that would disappear if the exposure were eliminated:

\[ PAF = \frac{CI_{population} - CI_{unexposed}}{CI_{population}} \]

The PAF depends on both the strength of the association (the RR) and the prevalence of the exposure. Tobacco is the classic example: its RR for lung cancer is enormous, but because smoking prevalence has declined, the PAF has also declined over decades. Conversely, physical inactivity has a more modest RR for cardiovascular disease but an enormous PAF because it is so prevalent.

### Number Needed to Treat

The **number needed to treat (NNT)** is the reciprocal of the absolute risk reduction (ARR) in a clinical trial or intervention study:

\[ NNT = \frac{1}{ARR} = \frac{1}{CI_{control} - CI_{intervention}} \]

An NNT of 20 means that 20 people must receive the intervention for one person to benefit beyond what would occur with the control condition. NNT is widely used in evidence-based medicine and cost-effectiveness analysis. Its complement, the **number needed to harm (NNH)**, applies the same logic to adverse events.

!!! mascot-tip "Tip: NNT and absolute vs. relative risk"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Sage offering a tip">
    Pharmaceutical advertising almost always presents relative risk reductions rather than NNTs. A drug that cuts the risk of a rare outcome from 0.2% to 0.1% has an impressive-sounding 50% relative reduction — but an NNT of 1,000. Always ask: "What is the absolute risk reduction?" That is the number that tells you how useful the intervention actually is.

---

## Epidemiological Study Designs

Choosing the right study design is among the most consequential decisions an epidemiologist makes. Each design answers certain questions well and handles certain biases poorly. Before we examine the hierarchy, three definitions are essential:

- **Internal validity**: how well a study measures the true relationship between exposure and outcome within the study population, free from bias and confounding.
- **External validity (generalizability)**: how well the study's findings apply to populations beyond the study sample.
- **Confounding**: a distortion of the exposure-outcome relationship caused by a third variable that is associated with both the exposure and the outcome, but is not on the causal pathway between them.

These concepts are always in tension: designs with the best internal validity (RCTs) are often the hardest to generalize; designs with broad external validity (ecological studies) are most vulnerable to confounding.

The following table organizes the six study designs covered in this chapter:

| Design | Direction | Can Calculate RR? | Randomized? | Confounding Control | Typical Use Case |
|--------|-----------|-------------------|-------------|---------------------|-----------------|
| Cross-Sectional | Simultaneous | No (prevalence ratio only) | No | Adjustment only | Prevalence, needs assessments |
| Case-Control | Retrospective | No (OR only) | No | Matching, adjustment | Rare diseases, outbreak investigation |
| Cohort (prospective) | Forward | Yes | No | Adjustment, restriction | Long-term exposure effects |
| Cohort (retrospective) | Forward (historical) | Yes | No | Adjustment, restriction | Occupational exposures |
| RCT | Forward | Yes | Yes | Randomization | Efficacy of interventions |
| Ecological | Aggregate | Ecological RR only | No | None (ecological fallacy risk) | Hypothesis generation |
| Natural Experiment | Varies | Sometimes | No (quasi-random) | As-if randomization | Policy evaluation |

### Cross-Sectional Study Design

A **cross-sectional study** takes a snapshot of a population at a single point in time (or over a short period), measuring both exposure and outcome simultaneously. Because exposure and disease are measured at the same moment, temporal sequence — and therefore causality — cannot be established. Did the exposure precede the disease, or did the disease change the exposure?

Cross-sectional studies are the workhorses of public health surveillance and needs assessment. The Behavioral Risk Factor Surveillance System (BRFSS) and the National Health and Nutrition Examination Survey (NHANES) are both cross-sectional in design. They generate prevalence proportions, prevalence ratios, and proportion differences — not incidence rates or relative risks.

### Case-Control Study Design

A **case-control study** identifies people with the disease of interest (cases) and comparable people without the disease (controls), then looks backward to compare their exposure histories. Because the investigator selects participants based on their outcome status, the calculation of absolute risks from within the study is impossible — the proportion of cases to controls reflects the investigator's sampling decision, not the true disease frequency. The OR is therefore the appropriate measure of association.

Case-control designs excel when the outcome is rare and the induction period (time from exposure to disease) is long. Case-control studies were used to first link thalidomide to birth defects, to establish the smoking-lung cancer link (before prospective cohorts were feasible), and to identify the source of most foodborne illness outbreaks within days rather than years. Their primary vulnerability is **recall bias** — cases may remember and report past exposures differently than controls, especially if they have been thinking about why they got sick.

### Cohort Study Design

A **cohort study** identifies a group of people who are initially free of the outcome of interest, classifies them by exposure status, and follows them forward in time to observe who develops the outcome. Because participants are followed from exposure to outcome, cumulative incidence and incidence rates can be calculated directly, and the RR is the natural measure of association.

**Prospective cohorts** enroll and follow participants in real time, enabling collection of carefully measured exposure data but requiring years or decades and substantial funding. The Nurses' Health Study, the Framingham Heart Study, and the UK Biobank are landmark prospective cohorts. **Retrospective cohorts** identify a defined group in the past (e.g., workers in a chemical plant) and use historical records to reconstruct their exposure and outcome experience — much faster and cheaper, but dependent on the quality of historical records.

Cohort studies are vulnerable to **loss to follow-up** bias: if participants who drop out differ systematically from those who remain, the results will be distorted. They also cannot efficiently study rare outcomes — a cohort study of pancreatic cancer would need to enroll millions of participants to observe enough cases.

### Randomized Controlled Trial

A **randomized controlled trial (RCT)** randomly assigns participants to intervention and control conditions, then follows them forward to compare outcomes. Randomization distributes both measured and unmeasured confounders equally between groups (in expectation), making the RCT the only study design that can establish causality rather than merely association. Regulatory agencies require RCT evidence for drug approvals.

The limitations of RCTs are practical and ethical rather than logical. You cannot randomize people to smoke or to live in poverty. RCTs of public health interventions face particular challenges: community-level interventions cannot be double-blinded, outcomes of interest (cardiovascular disease, cancer, death) require decades of follow-up, and participants recruited into trials may differ meaningfully from the broader population.

### Ecological Study Design and the Ecological Fallacy

An **ecological study** uses aggregate data — data measured at the group level rather than the individual level — to examine relationships between exposures and outcomes across groups (countries, counties, time periods). John Snow's original cholera maps were ecological. Ecological studies are fast, cheap, and excellent for generating hypotheses.

Their fundamental limitation is the **ecological fallacy**: the correlation observed at the group level may not hold at the individual level. A country with high per-capita fat intake and high heart disease rates does not tell us that the individuals with high fat intake are the ones getting heart disease. Ecological correlations reflect group averages, not individual relationships, and unmeasured confounders at the group level are essentially impossible to control.

### Natural Experiment Design

A **natural experiment** exploits a real-world event that assigns exposure in a way that is quasi-random or as-if random — not because the investigator designed it, but because external forces (policy changes, geographic boundaries, lotteries) created exposure variation that was not driven by individuals' own choices or health status. The Oregon Medicaid lottery (which randomly assigned Medicaid eligibility by lottery) is a classic public health natural experiment. Differences-in-differences analyses and regression discontinuity designs are the primary analytical approaches.

Natural experiments fill a critical gap: they enable causal inference about policy-level exposures that could never be randomized by a researcher. Their weakness is that the "as-if random" assumption may not fully hold — the policy or event may have anticipated individual behavior changes that confound the analysis.

#### Diagram: Study Design Evidence Hierarchy

<iframe src="../../sims/study-design-hierarchy/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>Evidence Pyramid Interactive Diagram</summary>
Type: diagram
**sim-id:** study-design-hierarchy<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Identify (L1) and compare (L4) epidemiological study designs by their position in the evidence hierarchy, their key strengths, and their primary limitations.

Canvas layout:
- Main drawing area showing a triangular pyramid divided into 6 horizontal layers
- Right side panel (250px): infobox that updates when a layer is clicked or hovered

Pyramid layers (bottom to top, increasing evidence strength):
1. Ecological Studies (bottom, widest) — gray
2. Cross-Sectional Studies — light blue
3. Case-Control Studies — blue
4. Cohort Studies (Prospective & Retrospective) — teal
5. RCTs and Quasi-Experimental (Natural Experiments) — green
6. Systematic Reviews & Meta-Analyses (top, narrowest) — gold

Each layer is a clickable trapezoid labeled with the design name.

On hover: layer brightens, cursor becomes pointer
On click: infobox updates with:
- Design name and definition
- Can calculate RR directly? (Yes/No)
- Randomized? (Yes/No)
- Primary bias vulnerability
- Classic public health example (e.g., "Snow's cholera maps" for ecological)
- Typical use case

Labels on pyramid left side: "↑ Internal Validity", "↑ Evidence Strength"
Labels on pyramid right side: "↑ Cost & Time", "↓ Feasibility"

Responsive design: Canvas resizes on window resize; pyramid scales to container width.
</details>

!!! mascot-warning "Common mistake: confusing study design with evidence quality"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Sage with a gentle warning">
    A well-conducted cohort study can provide stronger evidence than a poorly designed RCT. The evidence hierarchy describes the *potential* for each design to establish causality, not the quality of any specific study. When reading literature, look at both design type and methodological quality — reporting guidelines (STROBE for observational studies, CONSORT for RCTs) help you assess both.

---

## From Association to Causation: Causal Inference Frameworks

Finding a statistically significant association between an exposure and an outcome is the beginning of causal inquiry, not the end. An association can arise from:

1. **Chance** (random error, especially in small samples)
2. **Bias** (systematic error in study design, data collection, or analysis)
3. **Confounding** (a third variable explaining the apparent association)
4. **True causation** (the exposure actually causes the outcome)

Three formal frameworks help epidemiologists navigate this reasoning.

### Bradford Hill Criteria

In 1965, Austin Bradford Hill proposed nine criteria for evaluating whether a statistical association is likely to reflect a causal relationship. These criteria are not a checklist — no single criterion is necessary or sufficient — but together they structure causal argument. Before we examine them, note that Hill himself was careful to say they assess the *plausibility* of a causal interpretation, not its proof.

The nine criteria are:

1. **Strength of association**: Larger effect sizes are less likely to be explained by unmeasured confounding. An RR of 10 (smoking and lung cancer) is harder to explain away than an RR of 1.2.
2. **Consistency**: Has the association been replicated by different investigators, in different places, at different times, using different methods?
3. **Specificity**: Does the exposure predict this outcome specifically, or does it predict many different outcomes? (Specificity is the weakest criterion — most major exposures have multiple effects.)
4. **Temporality**: Does the exposure precede the outcome in time? This is the only criterion that is strictly *necessary* for causation — an effect cannot precede its cause.
5. **Biological gradient**: Is there a dose-response relationship? More exposure producing more disease strengthens the causal argument.
6. **Plausibility**: Is there a plausible biological mechanism? Note that plausibility is theory-dependent — many causal relationships were established before the mechanism was known.
7. **Coherence**: Do the laboratory and epidemiological evidence tell the same story, without contradiction?
8. **Experiment**: Does removing the exposure (natural or quasi-experimental) reduce disease? When available, this is among the strongest evidence.
9. **Analogy**: Do similar exposures cause similar diseases? (Weakest criterion — an argument from analogy that should be used cautiously.)

### Directed Acyclic Graph (DAG)

A **directed acyclic graph (DAG)** is a formal diagram used to encode causal assumptions about the relationships among variables in an epidemiological analysis. A DAG consists of variables (nodes) and arrows (directed edges) that represent direct causal effects; the "acyclic" constraint means no variable can be its own cause (no cycles). DAGs were formalized for epidemiology by Miguel Hernán and colleagues and have become the standard method for identifying and addressing confounding.

In a DAG, three structural patterns produce different statistical relationships:

- **Confounder**: A variable (C) that causes both the exposure (E) and the outcome (O): E ← C → O. Failing to adjust for a confounder produces biased estimates.
- **Mediator**: A variable (M) that lies on the causal pathway from E to O: E → M → O. Adjusting for a mediator blocks the indirect effect and is usually not desired unless mediation analysis is the goal.
- **Collider**: A variable (L) that is caused by both E and O: E → L ← O. Adjusting for a collider (e.g., conditioning on a study entry criterion) *opens* a spurious association between E and O — called **collider bias** or **selection bias**.

The critical implication: you should not simply "adjust for everything" in a regression. Adjusting for a collider introduces bias that would not otherwise exist. DAGs make explicit which variables to adjust for, which to avoid, and why.

#### Diagram: DAG Variable Structures Explorer

<iframe src="../../sims/dag-variable-structures/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>DAG Variable Structures — Confounder, Mediator, Collider</summary>
Type: diagram
**sim-id:** dag-variable-structures<br/>
**Library:** vis-network<br/>
**Status:** Specified

Learning objective: Differentiate (L4) the three causal structures in a DAG — confounder, mediator, and collider — and explain the consequences of adjusting (or not adjusting) for each.

Canvas layout:
- Main vis-network graph (60% width): shows three separate DAG structures arranged vertically
- Right panel (40%): explains the currently selected structure

Three structures displayed simultaneously with labeled groups:
Group 1 — Confounder: C → E, C → O, E → O. Nodes: E (Exposure, blue circle), O (Outcome, orange circle), C (Confounder, red circle).
Group 2 — Mediator: E → M → O. Nodes: E (blue), M (Mediator, green), O (orange).
Group 3 — Collider: E → L ← O. Nodes: E (blue), L (Collider, purple), O (orange).

Interactive behavior:
- Click any node: right panel shows the variable type (confounder/mediator/collider), its definition, whether to adjust for it, and the consequence of wrong choice.
- Click any edge: shows what the arrow represents (direct causal effect from source to target).
- Hover node: node highlights, tooltip shows variable label and type.
- Checkbox in right panel: "Show adjusted version" — when checked, adjusted variables are shown with a box (conditioning symbol) and the path status (open/closed) updates.

Node styling: Circles, radius 30px; E = #2196F3 (blue), O = #FF9800 (orange), C = #F44336 (red), M = #4CAF50 (green), L = #9C27B0 (purple). Edges: black arrows, width 2.
Layout: Static positions (not physics-based) to keep three groups legible.

Responsive: vis-network container fills 60% of the parent width; panel updates dynamically.
</details>

### Counterfactual Model

The **counterfactual model** (also called the potential outcomes framework) provides the most formal definition of a causal effect. The causal effect of an exposure on an individual is the difference between two potential outcomes: what would have happened to that person *if they had been exposed* versus *if they had not been exposed*. Because any individual can only be observed in one state (exposed or unexposed), the counterfactual outcome is by definition unobservable — this is the **fundamental problem of causal inference**.

The solution in epidemiology is to construct a comparison group that approximates the counterfactual — that is, who are identical to the exposed group in all relevant ways except for the exposure itself. Randomization in an RCT creates this counterfactual condition in expectation. Observational study designs attempt to approximate it through matching, restriction, stratification, regression adjustment, propensity scores, instrumental variables, or natural experiments.

The counterfactual model makes explicit what most epidemiologists knew intuitively: the validity of a causal inference depends on the exchangeability of the exposed and unexposed groups — the assumption that, in the absence of exposure, they would have had the same outcome risk.

!!! mascot-encourage "Difficult concept ahead"
    <img src="../../img/mascot/encouraging.png" class="mascot-admonition-img" alt="Sage encouraging">
    The counterfactual model and DAGs can feel abstract on first encounter. The best way to build intuition is to pick a real exposure-outcome pair — say, air pollution and lung disease — and draw every variable you think might confound, mediate, or collide in that relationship. Drawing it badly on the first try is exactly the point. The process of correcting the graph is how you learn causal reasoning.

---

## Key Takeaways

This chapter introduced the quantitative vocabulary of epidemiology across three domains:

**Measures of Disease Frequency:**

- Incidence rate, cumulative incidence, and prevalence are related by Prevalence ≈ IR × Duration — they measure different things and cannot be substituted for each other.
- CFR and IFR differ by how many cases are in the denominator; CFR inflates with limited testing.
- Age standardization enables fair comparisons across populations with different age structures.

**Measures of Association:**

- RR is the most interpretable ratio measure but requires cohort data; OR is required in case-control studies.
- The OR approximates the RR only when disease is rare (< 10%).
- Attributable risk and PAF translate ratio measures into population impact, essential for priority-setting.
- NNT translates absolute risk reduction into a clinically intuitive form.

**Study Designs and Causal Inference:**

- No study design is inherently best; the right choice depends on the research question, feasibility, and the primary bias to minimize.
- Temporality — exposure before outcome — is the only necessary criterion in Bradford Hill's framework.
- DAGs make explicit which variables should and should not be adjusted for in analysis.
- The counterfactual framework defines causal effect as a comparison of potential outcomes — never directly observable, always the target.

??? question "Self-Check: Which measure of association fits the design?"
    A researcher conducts a case-control study of a rare cancer. She identifies 200 cases from a cancer registry and 400 matched controls from hospital records. Which measure of association should she calculate, and why?

    **Answer:** The **odds ratio**, because the study design samples on outcome status (cases and controls are selected based on whether they have the disease). Cumulative incidence cannot be calculated from case-control data — the proportion of cases in the study reflects the investigator's sampling decision, not the true disease frequency. The OR approximates the RR in this context because the cancer is rare.

!!! mascot-celebration "Chapter 2 complete!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Sage celebrating">
    You now have the measurement toolkit that underlies nearly every chapter that follows. Incidence, prevalence, RR, OR, and study design literacy will come up again and again — in systems modeling, in COVID-19 case studies, in health policy evaluation, and in data science applications. The language you learned here is the foundation.
