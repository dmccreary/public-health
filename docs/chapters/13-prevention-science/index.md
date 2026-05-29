---
title: "Prevention Science"
description: IOM prevention spectrum, evidence hierarchies, vaccine science and hesitancy, chronic disease and injury prevention, harm reduction, implementation science, and screening program design.
generated_by: claude skill chapter-content-generator
date: 2026-05-28 14:30:00
version: 0.08
---

# Prevention Science

## Summary

Prevention science provides the frameworks, evidence standards, and implementation strategies for reducing disease before it occurs. This chapter covers the IOM prevention spectrum (universal, selective, indicated), the evidence hierarchies used to evaluate interventions from RCTs to The Community Guide, vaccine science including herd immunity calculations and hesitancy dynamics, chronic disease and injury prevention frameworks including the Haddon Matrix, harm reduction philosophy and opioid interventions, and implementation science frameworks including EPIS, fidelity vs. adaptation, and de-implementation of ineffective practices.

This chapter builds on concepts from:

- [Chapter 1: Public Health Foundations](../01-foundations/index.md)
- [Chapter 2: Epidemiology: Disease Measurement](../02-epidemiology-disease-measurement/index.md)
- [Chapter 3: Epidemiology: Study Design and Causal Inference](../03-epidemiology-study-design/index.md)
- [Chapter 4: Biostatistics: Statistical Foundations](../04-biostatistics-foundations/index.md)
- [Chapter 7: Social and Behavioral Health](../07-social-behavioral-health/index.md)

## Concepts Covered

This chapter covers the following 31 concepts from the learning graph:

1. IOM Prevention Spectrum
2. Universal Prevention
3. Selective Prevention
4. Indicated Prevention
5. Evidence-Based Practice
6. Hierarchy of Evidence
7. Community Guide Evidence Base
8. USPSTF Evidence Grading
9. GRADE Framework
10. Herd Immunity Calculation
11. Immunization Schedule
12. Vaccine Breakthrough Infection
13. Cold Chain Requirements
14. Vaccine Hesitancy Measurement
15. Tobacco Cessation Interventions
16. Physical Inactivity Interventions
17. Dietary Intervention Evidence
18. Alcohol Use Interventions
19. Obesity Prevention Strategies
20. Haddon Matrix
21. Injury Prevention Frameworks
22. Violence Prevention PH
23. Harm Reduction Philosophy
24. Naloxone Distribution
25. Syringe Service Programs
26. Implementation Science EPIS
27. De-Implementation
28. Scale-Up Strategies
29. Brief Motivational Interviewing
30. Screening Program Design
31. Systematic Review Protocol

---

!!! mascot-welcome "What Does the Evidence Show?"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Sage waves welcome">
    Prevention is public health's most powerful — and most contested — tool. We can show that seat belts save lives, that vaccines prevent outbreaks, and that naloxone reverses overdoses. But translating that evidence into programs that work in real communities is a distinct science all its own. Let's look at the evidence together.

## The Prevention Spectrum: Primordial Through Tertiary and the IOM Framework

The oldest classification of prevention divides interventions into three tiers based on when they act relative to disease onset. **Primary prevention** stops disease before it begins — vaccination, tobacco taxes, and lead paint removal all operate here. **Secondary prevention** detects disease early, before symptoms appear, enabling treatment that changes the course of illness — mammography, Pap smears, and blood pressure screening are classic examples. **Tertiary prevention** minimizes disability and improves quality of life once disease is established — cardiac rehabilitation, diabetes self-management education, and physical therapy following stroke all fall into this category. Some texts add a fourth tier: **primordial prevention**, which addresses the social and environmental conditions that allow risk factors to emerge in the first place — policies that prevent sedentary urban design or that eliminate food deserts operate at this upstream level.

The **IOM Prevention Spectrum**, introduced in the 1994 Institute of Medicine report *Reducing Risks for Mental Disorders* and now widely applied across public health, adds a complementary classification based on the target population rather than the timing of intervention. This framework is particularly useful for mental health, substance use, and behavioral health programs where disease onset is gradual and population stratification matters greatly.

**Universal prevention** interventions are delivered to an entire eligible population regardless of individual risk level. School-based social-emotional learning programs, fluoridation of municipal water supplies, and mass-media anti-tobacco campaigns are universal interventions. Their per-person cost is typically low, but the benefit to any individual may also be small — the population impact is achieved by shifting the entire distribution of risk.

**Selective prevention** targets subgroups whose risk is significantly above average based on biological, psychological, social, or environmental factors. Smoking cessation programs offered to pregnant women, fall prevention programs for adults over 65, and HIV pre-exposure prophylaxis (PrEP) outreach to people with multiple recent partners are selective interventions. The benefit-risk calculation shifts: the intervention may carry greater cost or inconvenience, but the higher baseline risk in the target group justifies it.

**Indicated prevention** identifies and intervenes with individuals who already show early signs or symptoms — subclinical indicators that have not yet met diagnostic criteria. Brief alcohol intervention with a college student whose AUDIT-C screen is elevated, or cognitive behavioral therapy offered to an adolescent with elevated PHQ-A depression scores, represents indicated prevention. The distinction from treatment is subtle: indicated prevention targets people who are symptomatic but not yet diagnosed, aiming to prevent the full disorder from developing.

#### Diagram: IOM Prevention Spectrum

<iframe src="../../sims/prevention-spectrum/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive Prevention Spectrum Diagram Details</summary>
Type: microsim
**sim-id:** prevention-spectrum<br/>
**Library:** p5.js<br/>
**Status:** Specified

Interactive nested diagram showing the IOM prevention spectrum (universal, selective, indicated) embedded within the classical prevention tiers (primordial, primary, secondary, tertiary). Clicking each level reveals a definition, target population, public health example, and cost-effectiveness profile. Color coding distinguishes IOM levels (blue gradient from universal to indicated) from traditional tiers (green gradient from primordial to tertiary). A toggle button allows switching between the two classification systems so students see how they relate.
</details>

The two frameworks are complementary rather than competing. A universal intervention may operate at the primary prevention level (water fluoridation preventing dental caries) or at the secondary level (universal newborn hearing screening). Similarly, indicated prevention may be primary (preventing first onset of major depression) or secondary (identifying prediabetes before type 2 diabetes develops). Using both frameworks together provides a richer map of where in the disease timeline an intervention operates, and for whom.

## Evidence Standards: Hierarchy, Community Guide, USPSTF, and GRADE

**Evidence-based practice** in public health means selecting and implementing interventions whose effectiveness has been demonstrated through rigorous research, and adapting them to local conditions without abandoning the core components that drive their effectiveness. The concept, imported from evidence-based medicine in the 1990s, demands explicit systematic methods for reviewing and grading evidence rather than relying on expert opinion or tradition.

The **hierarchy of evidence** ranks study designs by their susceptibility to bias and their ability to establish causal relationships. At the apex sit systematic reviews and meta-analyses of well-conducted randomized controlled trials (RCTs), which pool multiple experiments to provide the most precise estimate of an effect. Single RCTs occupy the next tier, followed by well-designed prospective cohort studies, case-control studies, cross-sectional surveys, case series, and expert opinion at the base. The hierarchy is a useful heuristic, but not an absolute rule: a single large, well-conducted RCT with narrow confidence intervals may provide stronger evidence than a meta-analysis of six small, heterogeneous trials.

#### Table: Evidence Hierarchy Levels

| Level | Study Design | Strength | Prevention Example | GRADE Rating |
|-------|-------------|----------|-------------------|--------------|
| I | Systematic review / meta-analysis of RCTs | Highest | Cochrane review of nicotine replacement therapy | High |
| II | Well-conducted RCT | High | MRFIT trial of multiple risk factor intervention | High |
| III | Prospective cohort study | Moderate | Nurses' Health Study on dietary fat and CVD | Moderate |
| IV | Case-control study | Moderate | Case-control of HPV vaccine and cervical lesions | Moderate |
| V | Cross-sectional survey | Low | BRFSS data on physical inactivity prevalence | Low |
| VI | Case series / expert opinion | Lowest | Clinician consensus on vaccine scheduling | Very Low |

The **Community Guide Evidence Base**, produced by the Community Preventive Services Task Force (CPSTF), synthesizes evidence on community-level interventions across behavioral, environmental, and policy domains. Unlike USPSTF, which focuses on clinical preventive services, the Community Guide evaluates interventions delivered in schools, worksites, communities, and healthcare systems. Systematic reviews are conducted using a standardized protocol; interventions receive one of four recommendations: strongly recommended, recommended, insufficient evidence, or recommended against. As of 2025, the Community Guide contains over 300 systematic reviews covering tobacco, physical activity, cancer screening, violence, and many other topics.

The **USPSTF Evidence Grading** system assigns letter grades (A through D, plus I for insufficient evidence) to clinical preventive services — screening tests, counseling interventions, and preventive medications delivered in primary care settings. Grade A means the USPSTF recommends the service with high certainty of substantial net benefit. Grade B indicates moderate certainty of moderate-to-substantial benefit. Grade C services offer a small net benefit in selected patients; D services have no net benefit or net harm; I means evidence is insufficient to determine balance of benefits and harms. USPSTF grades have regulatory and reimbursement implications: the Affordable Care Act requires private insurers to cover A and B services without cost-sharing.

The **GRADE Framework** (Grading of Recommendations Assessment, Development, and Evaluation) provides a more granular approach to evidence quality and recommendation strength, widely used in clinical guideline development and increasingly in public health. GRADE separates evidence quality (high, moderate, low, very low) from recommendation strength (strong vs. conditional). A strong recommendation means the desirable effects clearly outweigh undesirable effects for most people and contexts; a conditional recommendation signals that the balance may vary based on values, costs, or local context. GRADE also allows for upgrading observational evidence when effect sizes are large, dose-response gradients are strong, or confounding would bias results toward the null.

!!! mascot-thinking "The Difference Between Efficacy and Effectiveness"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Sage thinks carefully">
    A common source of confusion: **efficacy** is whether an intervention works under ideal, controlled conditions (in a trial). **Effectiveness** is whether it works in the real world. An intervention can be highly efficacious but poorly effective if it's hard to deliver at scale, if community uptake is low, or if the setting differs from the trial. Always ask both questions: "Does this work?" and "Does this work here, for this population?"

The **Systematic Review Protocol** is the procedural backbone of evidence synthesis. A properly registered protocol — ideally pre-registered in PROSPERO before any data are extracted — specifies the PICO question (Population, Intervention, Comparator, Outcome), the databases to be searched, the date range, the inclusion and exclusion criteria, the risk-of-bias assessment tool (e.g., Cochrane RoB 2.0 for RCTs, ROBINS-I for observational studies), and the statistical approach to meta-analysis if applicable. Protocol registration prevents selective reporting and outcome switching, two major sources of bias in systematic reviews. The PRISMA (Preferred Reporting Items for Systematic Reviews and Meta-Analyses) checklist guides transparent reporting of completed reviews.

## Vaccines: Science, Schedule, Herd Immunity, and Hesitancy

Vaccines represent one of public health's most effective interventions, responsible for the global eradication of smallpox, the near-eradication of polio, and dramatic reductions in measles, diphtheria, tetanus, and dozens of other diseases. Understanding vaccine science at a population level — beyond the individual immunological response — requires mastery of herd immunity mathematics, schedule design, cold chain logistics, and the social dynamics of hesitancy.

**Herd immunity** (or community immunity) occurs when a sufficient proportion of the population has become immune — through vaccination or prior infection — that the pathogen can no longer sustain chains of transmission. The threshold for herd immunity depends on the pathogen's basic reproduction number (R₀): the higher the R₀, the larger the fraction of the population that must be immune to interrupt transmission.

The **herd immunity threshold** (HIT) is calculated as:

\[ \text{HIT} = 1 - \frac{1}{R_0} \]

For measles, with an R₀ of approximately 12–18, the HIT is approximately 92–95%. For seasonal influenza (R₀ ≈ 1.2–1.4), the HIT is only 17–28% — far more easily achieved. For COVID-19's original Wuhan strain (R₀ ≈ 2.5–3), the HIT was approximately 60–70%, though this rose substantially with the Delta (R₀ ≈ 5–8) and Omicron (R₀ ≈ 8–15) variants.

The **immunization schedule**, maintained in the United States by the Advisory Committee on Immunization Practices (ACIP), specifies the recommended timing, dosing intervals, and catch-up schedules for all licensed vaccines across the lifespan. Schedule design balances four competing considerations: (1) optimal immunological response, which varies by age and developmental stage; (2) minimizing the number of healthcare visits required; (3) protection at the age of highest vulnerability; and (4) practical healthcare system constraints. The childhood schedule is evaluated annually and updated based on new vaccine approvals, post-marketing safety data, and immunogenicity studies.

**Vaccine breakthrough infections** occur when a vaccinated individual becomes infected despite prior vaccination. Breakthroughs are not evidence that the vaccine "doesn't work" — virtually all vaccines reduce severity and mortality even when they do not completely prevent infection. Breakthrough rates must be interpreted relative to the unvaccinated infection rate: if 5% of vaccinated and 30% of unvaccinated individuals are infected during an outbreak, the vaccine prevents roughly 83% of infections. High-profile attention to breakthroughs, without denominator context, is a persistent source of vaccine misinformation.

The **cold chain** is the temperature-controlled supply chain that maintains vaccine efficacy from manufacture through administration. Most vaccines require refrigeration at 2–8°C; mRNA vaccines (Moderna, Pfizer-BioNTech) initially required ultra-cold storage at -70°C, creating major logistical challenges during the COVID-19 rollout. Cold chain failures — power outages, improper storage, equipment malfunction — can render entire vaccine shipments ineffective without any visible indicator of damage. Passive temperature monitors (vaccine vial monitors, or VVMs) and active data loggers are critical cold-chain quality assurance tools.

**Vaccine hesitancy** is defined by the WHO SAGE Working Group as a "delay in acceptance or refusal of vaccination despite availability of vaccination services." Hesitancy is not a binary attribute but a continuum, and the Working Group's 3C model identifies three primary drivers: Complacency (low perceived risk of vaccine-preventable disease), Confidence (distrust in vaccine safety, effectiveness, or the system delivering them), and Convenience (access barriers including cost, distance, working hours, and language). The **Vaccine Hesitancy Scale** (VHS) and the **Vaccine Confidence Index** are validated instruments for measuring hesitancy at the individual and population levels. Effective responses to hesitancy are tailored to the dominant driver: complacency requires risk communication; confidence requires trust-building and transparent safety data; convenience requires structural interventions that reduce barriers.

## Chronic Disease Prevention: Tobacco, Physical Activity, Diet, Alcohol, Obesity

Chronic diseases — cardiovascular disease, type 2 diabetes, cancer, chronic obstructive pulmonary disease — account for approximately 74% of all deaths globally. The major modifiable risk factors driving this burden are well established: tobacco use, physical inactivity, unhealthy diet, harmful alcohol use, and obesity. Prevention science has developed a rich evidence base for each.

**Tobacco cessation interventions** span a spectrum from individual behavioral support to population-level policy. The **5 A's** framework (Ask, Advise, Assess, Assist, Arrange) is the evidence-based brief counseling protocol recommended for primary care settings. Pharmacological cessation aids — nicotine replacement therapy (NRT, all forms), varenicline (Chantix), and bupropion — have strong RCT evidence and are recommended as first-line treatments by USPSTF. Combination NRT (patch plus short-acting form) is more effective than mono-therapy. Population-level tobacco control — comprehensive smoke-free laws, high cigarette taxes, plain packaging, and graphic warning labels — has evidence from natural experiments in dozens of countries showing 10–30% reductions in smoking prevalence.

**Physical inactivity interventions** must address the gap between knowledge and behavior. Approximately 80% of U.S. adults do not meet federal guidelines for aerobic activity (150 minutes/week of moderate-intensity, or 75 minutes/week of vigorous). The Community Guide strongly recommends several approaches: point-of-decision prompts (signs at elevators encouraging stair use), community-wide campaigns, individually adapted health behavior change programs, and creation or enhancement of access to places for physical activity with informational outreach. Worksite programs, school-based physical education, and urban planning interventions (walkability improvements, bike infrastructure) have moderate to strong evidence.

**Dietary intervention evidence** is complicated by the difficulty of conducting controlled trials on diet — people cannot be randomized to a lifetime of Mediterranean eating in the way they can be randomized to a drug. The strongest evidence comes from large RCTs like PREDIMED (Mediterranean diet and cardiovascular events), DASH (dietary patterns and blood pressure), and DPP (dietary and lifestyle intervention delaying type 2 diabetes). The DPP trial is particularly instructive: a modest intervention producing 5–7% weight loss through dietary modification and 150 minutes/week of physical activity reduced progression from prediabetes to type 2 diabetes by 58% — more than metformin alone. Dietary interventions delivered by trained counselors in clinical settings have consistently stronger effect sizes than those delivered through media campaigns alone.

**Alcohol use interventions** range from brief motivational interventions in clinical settings to population-level pricing and availability policies. **Brief Motivational Interviewing (BMI)**, a condensed application of motivational interviewing principles, consists of 5–15 minutes of non-judgmental feedback on alcohol use, exploration of ambivalence about change, and collaborative goal-setting. Multiple RCTs in emergency department, primary care, and college health settings show BMI reduces drinking quantity, frequency, and alcohol-related consequences. At the policy level, minimum legal drinking age, alcohol excise taxes, restricting outlet density, and limiting hours of sale all have evidence from natural experiments. USPSTF gives alcohol screening and brief counseling a Grade B recommendation for adults aged 18 and older in primary care.

**Obesity prevention strategies** must distinguish between preventing weight gain (primary prevention of obesity) and supporting weight management in people with overweight or obesity (secondary and tertiary). The evidence for individual-level dietary and physical activity counseling producing sustained weight loss is modest: most RCTs show 3–5 kg loss at 12 months that is not maintained at 24 months without ongoing support. Structured programs like the Diabetes Prevention Program lifestyle intervention, Intensive Behavioral Therapy (IBT), and Weight Watchers (WW) have better long-term data. Emerging pharmacotherapy (GLP-1 agonists such as semaglutide and tirzepatide) shows substantially larger and more sustained weight reduction than behavioral interventions alone, raising important questions about cost, equity, and the medicalization of weight. Population-level strategies — sugar-sweetened beverage taxes, school nutrition standards, front-of-package labeling, and reduced food-marketing exposure for children — address the environmental drivers of excess caloric intake.

#### Table: Chronic Disease Prevention Interventions

| Condition | Modifiable Risk Factor | Intervention Type | Evidence Strength | Example Program |
|-----------|----------------------|-------------------|-------------------|-----------------|
| Cardiovascular disease | Tobacco use | 5 A's + NRT | Strong (USPSTF A) | Treating Tobacco Use guideline |
| Type 2 diabetes | Physical inactivity / diet | Lifestyle intervention | Strong (USPSTF B) | National DPP |
| Colorectal cancer | Low fiber, red meat | Dietary counseling | Moderate | DASH-related trials |
| COPD | Tobacco use | Cessation pharmacotherapy | Strong (USPSTF A) | EAGLES trial |
| Hypertension | Alcohol use | Brief MI | Strong (USPSTF B) | FRAMES protocol |
| Obesity | Multiple dietary factors | IBT + pharmacotherapy | Moderate–Strong | WW, semaglutide RCTs |

## Injury and Violence Prevention: The Haddon Matrix

Injuries are the leading cause of death for Americans aged 1–44 and a major source of disability across the lifespan. The prevention science of injuries draws on a fundamentally different intellectual tradition than infectious disease prevention — one rooted in engineering, energy physics, and product design as much as in epidemiology.

**Injury prevention frameworks** conceptualize injury as the result of energy transfer (mechanical, thermal, chemical, radiation, or electrical) exceeding the body's tolerance threshold in a specific environmental context. This energy-transfer model, developed by William Haddon Jr. in the 1960s, fundamentally shifted injury prevention from a focus on "accident proneness" (a victim-blaming construct) to systematic analysis of the host, agent, and environment.

The **Haddon Matrix** organizes this analysis across two dimensions: the three phases of an injury event (pre-event, event, post-event) and the three elements of the injury triad (host/person, agent/vehicle/energy, environment — both physical and social/regulatory). The resulting 3×3 matrix generates nine cells, each representing a category of potential intervention. For motor vehicle crashes, the pre-event / agent cell might contain interventions like anti-lock brakes and stability control; the event / host cell contains seatbelts and airbags; the post-event / environment (social) cell contains trauma system quality and EMS response time standards.

#### Diagram: Haddon Matrix Builder

<iframe src="../../sims/haddon-matrix/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive Haddon Matrix Builder Details</summary>
Type: microsim
**sim-id:** haddon-matrix<br/>
**Library:** p5.js<br/>
**Status:** Specified

Interactive 3×3 Haddon Matrix grid. A dropdown lets users select an injury scenario (motor vehicle crash, drowning, fall in elderly, firearm injury, opioid overdose). Clicking each cell of the matrix reveals two example interventions appropriate for that phase/factor combination. A color gradient highlights which cells have strong evidence (green), moderate evidence (yellow), or emerging/limited evidence (gray). A summary panel below the grid shows the total intervention count by phase, illustrating that most injury prevention investment historically went to the event phase (passive protection) while pre-event and post-event cells are often underutilized.
</details>

The Haddon Matrix is a generative tool — it reveals where intervention opportunities have been overlooked. The classic insight from its application is that passive protections (automatic seatbelt tensioners, helmets that attach automatically, airbags) reliably outperform active behavioral requirements (persuading people to buckle up voluntarily) because they do not depend on sustained human behavior. This principle — **passive protection preference** — is one of the most durable findings in injury prevention.

**Violence prevention as a public health issue** reframes violence using the same epidemiological tools applied to other preventable conditions. The CDC Violence Prevention program applies surveillance (NVDRS, WISQARS), risk factor identification, intervention development, and dissemination to interpersonal violence, sexual violence, youth violence, elder abuse, and suicide. Evidence-based violence prevention programs include Nurse-Family Partnership (home visiting reducing child maltreatment), Cognitive Behavioral Intervention for Trauma in Schools (CBITS), and Cure Violence (community violence interruption). The social-ecological model places individual risk and protective factors within relationship, community, and societal contexts, recognizing that interventions at multiple levels are needed.

## Harm Reduction: Philosophy, Naloxone, and Syringe Services

**Harm reduction** is a pragmatic, evidence-based philosophy and set of practices that accept that some individuals will use substances regardless of legal status or moral framing, and prioritize minimizing the health, social, and economic harms associated with use rather than requiring abstinence as a prerequisite for services. The intellectual origins of harm reduction are in the UK and Netherlands in the 1980s, when the emerging HIV epidemic among people who inject drugs (PWID) created urgent pressure to address overdose and disease transmission without waiting for sobriety.

The harm reduction continuum ranges from interventions that reduce risk without requiring any behavior change (clean syringe provision, overdose reversal medication availability) through interventions that reduce use (brief motivational interviewing, medication-assisted treatment with methadone or buprenorphine) to recovery-oriented services for those who choose abstinence. Critically, harm reduction does not oppose abstinence — it holds that a person's own goals and readiness for change are the appropriate starting point, rather than externally imposed recovery requirements.

**Naloxone distribution** is one of the most evidence-supported harm reduction interventions available. Naloxone (brand names Narcan, Kloxxado) is an opioid antagonist that rapidly reverses opioid overdose by displacing opioids from mu-opioid receptors. When administered intranasally or intramuscularly, naloxone can prevent death within 2–3 minutes. Community-based naloxone distribution programs — which provide take-home naloxone kits and overdose response training to people who use drugs and their social networks — are associated with substantial reductions in opioid overdose mortality in natural experiments across multiple countries. The 2023 FDA approval of naloxone 4mg nasal spray (Narcan) for over-the-counter sale eliminated the prescription barrier in the United States, a significant access improvement.

**Syringe service programs (SSPs)** — also called needle exchange programs or harm reduction programs — provide sterile injection equipment to people who inject drugs, dramatically reducing transmission of HIV and hepatitis C virus (HCV). A 1995 CDC/NIH Consensus Panel review found SSPs effective in reducing HIV transmission without increasing drug use; subsequent systematic reviews have consistently confirmed this finding. SSPs also serve as a health services access point: high-quality SSPs offer HIV and HCV testing, linkage to treatment, wound care, contraception, naloxone distribution, and substance use treatment referrals. The first federal funding ban on SSPs (1988–2016) was partially lifted in 2016 with the allowance of federal funds for SSP services but not equipment purchase; full federal funding authorization was granted in 2021.

!!! mascot-encourage "Harm Reduction and Contested Values"
    <img src="../../img/mascot/encouraging.png" class="mascot-admonition-img" alt="Sage offers encouragement">
    Harm reduction can feel philosophically uncomfortable at first, especially if you've been taught that enabling substance use is inherently harmful. The evidence consistently challenges that intuition — SSPs do not increase drug use, and naloxone availability does not increase opioid use. Public health practitioners are sometimes caught between what the evidence shows and what communities or funders will accept. Understanding both the science and the values debate is essential preparation for this work.

## Implementation Science: EPIS, Fidelity, Scale-Up, and De-Implementation

Evidence-based interventions routinely fail not because they don't work, but because they are poorly implemented. **Implementation science** is the study of methods to promote the systematic uptake of research findings and other evidence-based practices into routine use, and to improve the quality and effectiveness of health services. It examines the gap between what we know works and what is actually done in practice.

The **EPIS framework** (Exploration, Preparation, Implementation, Sustainment), developed by Aarons, Hurlburt, and Horwitz (2011), describes the stages through which an evidence-based practice is adopted by an organization or system. The framework distinguishes between the outer context (broader political, funding, and systemic environment) and the inner context (organizational culture, leadership, existing practices), and examines how these interact across the four phases.

- **Exploration** involves identifying needs and assessing potential interventions. Activities include conducting community needs assessments, reviewing evidence, and assessing organizational readiness.
- **Preparation** involves selecting and adapting the intervention for local context, training staff, and establishing implementation supports.
- **Implementation** is active delivery of the intervention. Monitoring implementation fidelity — adherence to core components — is critical at this stage.
- **Sustainment** addresses how to maintain the intervention after initial funding and attention diminish, requiring institutionalization into standard workflows and budget cycles.

#### Diagram: EPIS Implementation Stages

<iframe src="../../sims/epis-stages/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>EPIS Implementation Stages Interactive Diagram Details</summary>
Type: microsim
**sim-id:** epis-stages<br/>
**Library:** p5.js<br/>
**Status:** Specified

Interactive horizontal workflow diagram showing the four EPIS stages (Exploration, Preparation, Implementation, Sustainment) as connected stages with outer context above and inner context below. Clicking each stage expands a panel below the diagram showing: key activities, common barriers, implementation strategies, and a real-world public health example. An outer/inner context toggle highlights which contextual factors are most influential at each stage. A small progress indicator shows how far along a hypothetical opioid treatment program is through the EPIS stages, illustrating that sustainment is the most commonly neglected phase.
</details>

**Fidelity** refers to the degree to which an intervention is delivered as intended by its developers. High fidelity matters because the evidence base was established under specific conditions — deviating from core components can reduce effectiveness. However, rigid fidelity requirements can also prevent necessary adaptations to local culture, language, and context. Implementation science distinguishes between **core components** (the theoretically active ingredients that must be preserved) and **peripheral components** (surface features that can be adapted without undermining effectiveness). The science of **adaptation** — making intentional, evidence-informed modifications to an EBP for a new context — is an active research area.

**Scale-up strategies** address how to move from a successful pilot or trial to broad population reach. Common frameworks include the EPIS sustainment phase, the Active Implementation Frameworks, and the Replicating Effective Programs (REP) framework developed by CDC. Key determinants of successful scale-up include strong implementation support systems (coaching, technical assistance), fidelity monitoring with feedback loops, organizational leadership buy-in, sustainable funding streams, and workforce training infrastructure. The history of public health is littered with evidence-based programs that "worked in the trial" but faded out within two years of the demonstration period — usually because sustainment infrastructure was never built.

**De-implementation** — the discontinuation of practices that are ineffective, harmful, or wasteful — is an underappreciated dimension of implementation science. Healthcare systems are remarkably resistant to abandoning established practices even when evidence clearly shows they are ineffective or harmful. Common examples include routine episiotomy in obstetrics (no longer recommended), annual Pap smears for all women under 65 (now triennial per guidelines), and prophylactic antibiotics for uncomplicated viral respiratory infections. Barriers to de-implementation include provider habit, patient demand, liability concerns, and the absence of reimbursement incentives for doing less. Active de-implementation strategies include audit and feedback, academic detailing, and guideline-embedded decision support.

**Screening Program Design** applies several principles from both prevention science and implementation science. A well-designed screening program must satisfy the Wilson and Jungner criteria (1968), still the foundational framework: the condition must be an important health problem; there must be a recognizable latent or early symptomatic stage; there must be a suitable test; the test must be acceptable to the population; the natural history must be adequately understood; there must be an agreed policy on whom to treat; facilities for diagnosis and treatment must be available; the screening must be continuous; the cost must be economically balanced in relation to expenditure on medical care as a whole.

!!! mascot-tip "Screening Harms Are Real"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Sage offers a helpful tip">
    Screening is often presented as purely beneficial, but every screening program carries risks: false positives causing anxiety and unnecessary follow-up procedures, overdiagnosis of conditions that would never have caused symptoms, radiation exposure, and procedural complications. The USPSTF grades reflect a careful benefits-harms balance — a Grade C recommendation isn't "wishy-washy," it means benefits and harms are close enough that the individual decision matters.

## Summary and Synthesis

Prevention science provides the intellectual scaffolding for moving from "we know this is a problem" to "we are delivering an effective solution to the right people, in the right way, at the right time." The IOM Prevention Spectrum helps practitioners identify the most appropriate target population. Evidence hierarchies and grading frameworks — GRADE, USPSTF, the Community Guide — provide standardized methods for judging what works. Vaccine science demonstrates how population-level immunity thresholds can eliminate pathogen transmission. Chronic disease prevention shows that modest behavioral changes, delivered systematically, can dramatically reduce the burden of the leading killers. The Haddon Matrix redirects injury prevention from blame to engineering and environment. Harm reduction offers evidence-based tools for protecting people whose choices differ from public health ideals. And implementation science addresses the crucial but often overlooked gap between knowing what works and doing it reliably at scale.

The core insight linking these frameworks is this: the best prevention intervention is the one that is actually delivered, to the right people, with sufficient fidelity and reach to shift population-level outcomes. Evidence alone is not enough — implementation is the final frontier of prevention science.

!!! mascot-celebration "Prevention Science: Tools for a Healthier World"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Sage celebrates learning">
    You've now worked through the full toolkit of prevention science — from the IOM spectrum through implementation science and harm reduction. These are not abstract frameworks: they are the design principles behind every successful public health program of the past 50 years. Whether you're designing a community health program, evaluating an intervention, or advocating for policy change, you now have the conceptual vocabulary to do it rigorously. What does the evidence show? You're increasingly equipped to find out.

## Key Terms

| Term | Definition |
|------|-----------|
| IOM Prevention Spectrum | Three-tier classification of prevention (universal, selective, indicated) based on target population risk level |
| Herd Immunity Threshold | The proportion of a population that must be immune to prevent epidemic spread, equal to 1 − 1/R₀ |
| Haddon Matrix | A 3×3 analytical framework crossing injury phases (pre-event, event, post-event) with the injury triad (host, agent, environment) |
| EPIS Framework | An implementation science framework describing Exploration, Preparation, Implementation, and Sustainment stages |
| Harm Reduction | A philosophy and practice set that minimizes health harms from substance use without requiring abstinence |
| GRADE Framework | A systematic approach to rating evidence quality and recommendation strength used in guideline development |
| De-Implementation | The deliberate discontinuation of ineffective, harmful, or wasteful health practices |
| Vaccine Breakthrough | Infection occurring in a vaccinated individual; does not indicate vaccine failure if disease severity is reduced |
| Brief Motivational Interviewing | A condensed 5–15 minute clinical counseling approach using motivational interviewing principles to reduce harmful behaviors |
| Cold Chain | The temperature-controlled supply chain maintaining vaccine efficacy from manufacture through administration |
