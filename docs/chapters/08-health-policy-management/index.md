---
title: "Health Policy and Management"
description: US health system structure, policy development cycle using Kingdon's streams model, healthcare financing from Medicaid to ACA, public health law and quarantine authority, program planning models, health economics, and quality improvement frameworks.
generated_by: claude skill chapter-content-generator
date: 2026-05-28 14:30:00
version: 0.08
---

# Health Policy and Management

## Summary

Public health operates through institutions, laws, and financing arrangements that determine what interventions get funded, who receives services, and how governmental authority can be used to protect population health. This chapter maps the structural landscape: federal, state, and local public health agencies; the full policy development cycle from agenda-setting to evaluation; the major US insurance mechanisms; the legal authorities underpinning mandatory reporting, quarantine, and emergency declarations; and the planning and quality improvement frameworks (logic models, PRECEDE-PROCEED, MAPP, PDSA) used to design and monitor public health programs. Cost-effectiveness and return-on-investment concepts are introduced to support evidence-based resource allocation.

This chapter builds on concepts from:

- [Chapter 1: Public Health Foundations](../01-foundations/index.md)
- [Chapter 2: Epidemiology: Disease Measurement](../02-epidemiology-disease-measurement/index.md)
- [Chapter 7: Social and Behavioral Health](../07-social-behavioral-health/index.md)

## Concepts Covered

This chapter covers the following 30 concepts from the learning graph:

1. US Health System Structure
2. Federal Health Agencies
3. State Health Departments
4. Local Health Departments
5. Safety Net Providers
6. Federally Qualified Centers
7. Kingdon's Streams Model
8. Policy Development Cycle
9. Health Policy Agenda Setting
10. Employer-Sponsored Insurance
11. Medicaid Program
12. Medicare Program
13. ACA Coverage Provisions
14. Uninsurance and Underinsurance
15. Public Health Law
16. Police Powers in Public Health
17. Quarantine Authority
18. Mandatory Reporting Laws
19. Emergency Use Authorization
20. PHAB Accreditation
21. Logic Model Development
22. PRECEDE-PROCEED Model
23. MAPP Framework
24. Cost-Effectiveness Analysis
25. Cost-Benefit Analysis
26. QALY Concept
27. Return on Investment Prevention
28. PDSA Quality Cycle
29. Lean in Public Health
30. Performance Management

---

!!! mascot-welcome "The Systems Behind the Science"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Sage waves welcome">
    What does the evidence show? Often, whether an evidence-based intervention actually reaches people depends less on the science and more on the policy environment surrounding it — who pays, who has authority, and whether anyone planned the program well enough to measure it.

## The US Health System: Structure and Players

The **US health system structure** is not a single unified system but a fragmented assemblage of public programs, private insurers, non-profit providers, and governmental agencies operating at federal, state, and local levels simultaneously. Understanding this structure is a prerequisite for any public health practitioner seeking to design, fund, or evaluate an intervention, because authority and money flow through channels that are often invisible from the outside.

At the federal level, **federal health agencies** include a constellation of agencies housed primarily within the Department of Health and Human Services (HHS). The Centers for Disease Control and Prevention (CDC) leads national surveillance and disease control. The Centers for Medicare and Medicaid Services (CMS) administers the two largest public health insurance programs. The Food and Drug Administration (FDA) regulates drugs, devices, and food safety. The Health Resources and Services Administration (HRSA) funds safety-net providers. The National Institutes of Health (NIH) conducts and funds biomedical and public health research. Each agency operates under specific statutory authority granted by Congress, meaning their mandates are legally bounded — CDC cannot require clinical practices that fall under FDA jurisdiction, for example.

**State health departments** hold the primary constitutional authority for public health in the United States. Under the Tenth Amendment, powers not explicitly granted to the federal government are reserved to states, and courts have consistently interpreted public health powers — including quarantine, mandatory vaccination, and licensure of health facilities — as state police powers. State health departments typically oversee communicable disease reporting, vital statistics, environmental health programs, maternal and child health, and the licensing of health care professionals. Their budgets blend state general fund appropriations with federal grants, principally from CDC and HRSA. This dual-funding structure creates both opportunity (federal expertise and resources) and constraint (federal reporting requirements that may not align with state priorities).

**Local health departments** form the operational front line of governmental public health. Approximately 2,500 local health departments operate in the United States, ranging from large metropolitan agencies in cities such as New York or Los Angeles with thousands of employees to rural single-county departments with fewer than ten staff. Local health departments conduct restaurant inspections, administer immunization clinics, investigate disease clusters, and implement health education programs. The relationship between state and local health departments varies considerably: in some states, local health departments are directly subordinate to the state agency; in others, they are independent county or municipal entities that receive state funds but maintain separate governance.

**Safety net providers** are health care organizations that deliver care regardless of patients' ability to pay — a category that includes public hospitals, community health centers, free clinics, and school-based health centers. The most formally defined category is the **Federally Qualified Health Center (FQHC)**, a designation established under Section 330 of the Public Health Service Act. FQHCs must be located in federally designated medically underserved areas or serve medically underserved populations, offer services on a sliding-fee scale based on income, provide comprehensive primary care, and have a governing board with a majority of patients. In exchange, FQHCs receive enhanced Medicare and Medicaid reimbursement rates and access to HRSA grants. As of 2024, more than 1,400 FQHC organizations operate approximately 15,000 service delivery sites serving roughly 30 million patients annually.

#### Diagram: US Health System Structure

<iframe src="../../sims/us-health-system-structure/main.html" width="100%" height="520px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive US Health System Structure Diagram — Specification</summary>
Type: microsim
**sim-id:** us-health-system-structure<br/>
**Library:** vis-network<br/>
**Status:** Specified

Interactive layered network diagram of the US health system. Nodes are color-coded by tier: federal agencies (deep blue), state health departments (teal), local health departments (green), private insurance sector (purple), safety net providers (orange), FQHCs (amber). Clicking any node opens an info panel describing the agency's mandate, funding source, and example program. Edges show funding flows (solid lines) and regulatory authority (dashed lines). A legend panel at the bottom explains node colors and edge types. Default view shows all tiers; a dropdown filter allows the user to isolate "Governmental," "Insurance," or "Safety Net" layers.
</details>

The interaction among these levels is best understood not as a hierarchy but as an overlapping web of authorities, funding streams, and accountabilities. A community health worker employed by a local health department may be funded through a CDC cooperative agreement, serving patients whose care is reimbursed by Medicaid (administered jointly by the state and CMS), and working in a building owned by a non-profit hospital system. Public health professionals must be fluent in navigating these relationships to do their work effectively.

## How Policy Gets Made: Kingdon's Streams and the Policy Cycle

Political scientists have long observed that good ideas in public health do not automatically become policy. Decades of research on tobacco, seat belts, and opioid prescribing show that scientific evidence is necessary but far from sufficient. **Health policy agenda setting** — the process by which certain problems attract governmental attention while others do not — is a political and social process as much as a technical one.

John Kingdon's **Kingdon's Streams Model**, developed through his 1984 interviews with federal officials, remains the most influential framework for understanding why policy change happens when it does rather than when it is rationally warranted. Kingdon identified three largely independent streams that flow through the political system:

The **problem stream** consists of conditions that policymakers come to define as problems requiring action. Not all bad conditions become policy problems; conditions become problems when they are attached to compelling data (a measurable trend), a focusing event (an outbreak, a disaster, a prominent death), or a symbolic case that resonates with the public. The opioid epidemic became a policy problem when overdose deaths in predominantly white suburban communities received media coverage that generated political pressure — not simply because mortality data had been rising for years.

The **policy stream** consists of proposals developed by specialists in policy communities — researchers, advocates, congressional staff, think tanks — who generate and refine potential solutions more or less independently of whether a particular problem is currently on the agenda. Solutions in the policy stream are evaluated for technical feasibility, cost, and value acceptability before being considered ready for adoption.

The **politics stream** consists of the national mood, electoral dynamics, interest group pressures, and changes in government that create political receptivity or resistance to change. A new administration, a midterm election result, or a shift in public opinion following a focusing event can open or close political opportunities for reform.

**Policy windows** — Kingdon's central insight — open when all three streams converge. A compelling problem, a ready solution, and a favorable political moment align briefly, and policy entrepreneurs who are positioned to couple the streams can achieve major change. The passage of the Affordable Care Act in 2010 exemplifies this convergence: decades of proposals in the policy stream, rising uninsurance rates as the problem, and a politically aligned government with a presidential mandate for change.

The **policy development cycle** moves sequentially through stages even when the political dynamics are messy. The formal stages are: (1) agenda setting — a problem reaches governmental attention; (2) policy formulation — proposals are developed and refined; (3) policy adoption — a legislature, executive agency, or court makes a binding decision; (4) policy implementation — agencies translate the decision into programs, regulations, and spending; (5) policy evaluation — evidence on effectiveness and cost is gathered; and (6) policy modification or termination — the cycle begins again based on evaluation findings. Public health practitioners engage most frequently at the implementation and evaluation stages, but effective advocates understand the full cycle.

#### Diagram: Kingdon's Three Streams Model

<iframe src="../../sims/kingdons-three-streams/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Kingdon's Three Streams Interactive Model — Specification</summary>
Type: microsim
**sim-id:** kingdons-three-streams<br/>
**Library:** p5.js<br/>
**Status:** Specified

Animated visualization of Kingdon's three streams model. Three horizontal rivers flow left to right across the canvas, labeled "Problem Stream," "Policy Stream," and "Politics Stream." Each stream carries small labeled particles (problem = red circles labeled with example problems like "opioid deaths"; policy = blue squares labeled with example policies like "prescription monitoring"; politics = green triangles labeled with political events like "new administration"). A vertical "Policy Window" gateway appears periodically when streams are manually aligned by the user. Users can drag the three streams toward or away from the gateway to experiment with coupling. When all three streams converge at the window, an animation fires: the gateway lights up gold and a banner displays "Policy Change!" with an example (e.g., "ACA passage 2010"). Controls: Reset button, Speed slider (slow/fast particle flow), and a text overlay explaining each stream on hover.
</details>

**PHAB Accreditation** — the Public Health Accreditation Board's voluntary national accreditation program for state and local health departments — provides a concrete mechanism for quality improvement within the policy cycle. PHAB assesses health departments against twelve domains of practice, from community health assessment to workforce development. Accreditation signals to funders, elected officials, and the public that a health department meets national standards — a credential that increasingly influences state appropriations and federal grant eligibility.

## Healthcare Financing: Insurance, Medicaid, Medicare, and the ACA

The structure of health care financing directly determines who receives care, at what cost, and with what consequence for the broader population's health. The United States finances health care through a fragmented mix of private and public mechanisms that no other high-income country replicates.

**Employer-sponsored insurance (ESI)** covers approximately 155 million Americans and remains the dominant financing mechanism for working-age adults. Under ESI, employers purchase group health insurance plans from commercial insurers, typically sharing premium costs with employees. ESI is tax-advantaged: employer premium contributions are excluded from employees' taxable income and from payroll taxes, a subsidy estimated at over $300 billion annually by the Congressional Budget Office. This tax preference favors higher-income workers (who have higher marginal rates) and creates a structural tie between employment and health coverage that has no analogue in other wealthy nations.

**Medicaid** is a joint federal-state program created in 1965 to cover low-income individuals and families. States design and administer their own Medicaid programs within broad federal guidelines set by CMS; the federal government then matches state spending at a rate ranging from 50% to over 75%, depending on state per-capita income (the Federal Medical Assistance Percentage, or FMAP). Medicaid covers acute care, long-term care, and a broad array of behavioral health services — and is the single largest payer for nursing home care and for mental health and substance use disorder treatment in the US. As of 2024, Medicaid covers approximately 85 million Americans.

**Medicare** is a federally administered insurance program covering Americans 65 and older, plus people with end-stage renal disease and certain disabilities. Unlike Medicaid, Medicare is uniform across states and financed primarily through payroll taxes (Part A, hospital insurance) and general revenues combined with premiums (Part B, outpatient services; Part D, prescription drugs). Medicare is the largest single payer in the US health system and its payment policies — particularly its prospective payment rates for hospitals and physicians — effectively set the floor for reimbursement across the health care market.

The **Affordable Care Act (ACA)**, enacted in March 2010, made the most significant changes to US health coverage since Medicare and Medicaid were created. The ACA's **coverage provisions** include: (1) Medicaid expansion to adults earning up to 138% of the federal poverty level in states that chose to participate (38 states plus DC as of 2024); (2) insurance marketplaces where individuals and small businesses purchase subsidized coverage; (3) premium tax credits for households between 100% and 400% of FPL (expanded temporarily and then extended through 2025 under subsequent legislation); (4) prohibition on denial of coverage for pre-existing conditions; (5) requirement that plans cover ten essential health benefits including preventive services at no cost sharing; and (6) the dependent coverage provision allowing children to remain on parents' plans through age 26.

**Uninsurance and underinsurance** remain substantial despite ACA gains. The uninsured rate fell from approximately 18% in 2010 to below 8% by 2023, but roughly 25 million Americans remained uninsured, disproportionately concentrated among low-income adults in states that declined Medicaid expansion, undocumented immigrants who are categorically excluded from ACA programs, and workers in part-time or gig economy jobs lacking ESI. Underinsurance — the condition of having technically qualifying insurance but with cost-sharing so high that it impedes access to needed care — affects an estimated 25–30% of insured adults, as measured by deductibles exceeding 5% of household income or out-of-pocket costs exceeding 10%.

The following table summarizes the primary healthcare financing mechanisms, all of which students should be able to distinguish by coverage population, governance structure, and relationship to the ACA.

| Financing Mechanism | Who It Covers | Federal Role | State Role | Key ACA Change |
|---|---|---|---|---|
| Employer-Sponsored Insurance | ~155M working-age adults and dependents | Tax exclusion subsidy; minimum benefit standards via ACA | Insurance market regulation | Essential health benefits; dependent coverage to age 26 |
| Medicaid | ~85M low-income individuals | Sets eligibility/benefit floor; matches state spending (FMAP) | Designs & administers program | Optional expansion to 138% FPL; enhanced FMAP for expansion |
| Medicare | ~65M elderly and disabled | Fully administers; payroll tax + premium financed | No role in administration | No major structural change; added preventive benefits |
| ACA Marketplace | ~21M individuals/small businesses | Operates federal exchange; provides premium tax credits | May run state exchange | Created the marketplace mechanism |
| CHIP | ~7M low-income children | Matches state spending at enhanced FMAP | Administers program | Maintained and extended under CHIP Reauthorization Act |
| Uninsured (no coverage) | ~25M Americans | Funds safety-net hospitals via DSH payments | Funds some indigent care programs | Medicaid expansion was primary mechanism to reach this group |

## Public Health Law: Authority, Limits, and Emergency Powers

**Public health law** encompasses the statutory, regulatory, and constitutional foundations that authorize governmental action to protect population health. Understanding this legal framework is essential not only for public health attorneys but for any practitioner who must navigate the boundaries of what agencies can require, permit, or prohibit.

The foundational legal doctrine is the state's **police powers in public health** — the inherent governmental authority to enact and enforce laws that protect the public's health, safety, and welfare. The US Supreme Court's 1905 decision in *Jacobson v. Massachusetts* established that states can compel vaccination to protect the community from communicable disease, even against individual objection, provided the mandate is not arbitrary, oppressive, or unreasonable. This precedent has been cited in virtually every major public health legal dispute since, including challenges to COVID-19 vaccine mandates.

**Quarantine authority** operates at both federal and state levels with distinct jurisdictions. The CDC has federal authority to quarantine persons arriving from foreign countries or traveling between states if they carry specified communicable diseases. State health departments have broader authority to quarantine or isolate individuals within their borders — authority grounded in state police powers and implemented through state public health statutes. During COVID-19, state quarantine orders, isolation requirements, and travel restrictions became some of the most contested uses of public health legal authority in a century.

**Mandatory reporting laws** require physicians, laboratories, hospitals, and other health care providers to report specified diseases and conditions to the health department. All fifty states have mandatory reporting statutes, though the lists of reportable conditions vary. The CDC coordinates the National Notifiable Disease Surveillance System (NNDSS), through which states voluntarily report conditions to the federal level. Mandatory reporting laws represent an important intersection of clinical medicine and public health: they impose legal obligations on clinicians while generating the surveillance data that public health agencies depend on for outbreak detection and program planning.

**Emergency Use Authorization (EUA)** is an FDA mechanism that allows unapproved medical products — or unapproved uses of approved products — to be used during declared public health emergencies when no adequate alternatives exist. EUAs require that the Secretary of HHS declare a public health emergency, that available evidence reasonably suggests the product may be effective, and that the known and potential benefits outweigh known and potential risks. The COVID-19 pandemic saw EUAs granted for diagnostics, therapeutics including remdesivir, and eventually the mRNA vaccines — representing the largest and fastest deployment of EUA authority in FDA history. EUAs are legally distinct from full approval, and the distinction matters for compliance requirements, liability protections, and public trust.

!!! mascot-warning "Police Powers Have Limits"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Sage holds up a cautionary wing">
    Public health authority is powerful but bounded. Courts have struck down public health orders that were arbitrary, applied unequally across groups, exceeded statutory authority, or failed proportionality tests. Every major emergency order should ask: Is this the least restrictive means to achieve a compelling public health objective? When the answer is no, legal challenges succeed — and the practice of public health loses public trust in the process.

## Program Planning: Logic Models, PRECEDE-PROCEED, and MAPP

Designing a public health program without a planning framework is analogous to building a bridge without engineering specifications — the structure may stand briefly, but it will not be reliable or replicable. Several widely used planning frameworks provide discipline for the design, implementation, and evaluation of public health programs.

A **logic model** is a visual representation of the program's theory of change: the assumptions about how a set of inputs and activities will produce outputs and, ultimately, outcomes and impact. The standard logic model reads left to right: Inputs (resources invested) → Activities (what the program does) → Outputs (direct products of activities, typically counts) → Short-term Outcomes (changes in knowledge, attitudes, skills) → Medium-term Outcomes (changes in behavior) → Long-term Outcomes/Impact (changes in health status or equity). Logic models serve multiple functions: they clarify planning assumptions, communicate program logic to funders and stakeholders, and specify what will be measured in evaluation.

#### MicroSim: Logic Model Builder

<iframe src="../../sims/logic-model-builder/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>Logic Model Builder Interactive MicroSim — Specification</summary>
Type: microsim
**sim-id:** logic-model-builder<br/>
**Library:** p5.js<br/>
**Status:** Specified

Interactive logic model building tool. Five columns labeled Inputs, Activities, Outputs, Short-term Outcomes, and Long-term Impact are displayed horizontally. Each column has a clickable "+ Add" button that opens a text-entry modal. Users type in entries (e.g., "Inputs: funding, staff, facilities") and the entry appears as a card in that column. Cards in adjacent columns can be connected by clicking the card and then clicking a card in the next column — a directed arrow is drawn between them. The canvas auto-scales if many cards are added. A "Save / Export" button generates a text summary of all entries. A "Load Example" button populates a pre-built logic model for a community health education program, demonstrating how the tool works. Color coding: inputs = blue, activities = teal, outputs = green, outcomes = orange, impact = red. Controls: Reset button, Zoom in/out slider.
</details>

The **PRECEDE-PROCEED model** (Green & Kreuter, 1991) is a comprehensive ecological planning and evaluation model that structures program development in two phases. The PRECEDE phase involves diagnosis: social diagnosis (quality of life concerns), epidemiological diagnosis (health problems and risk factors), behavioral and environmental diagnosis (specific behaviors and environmental factors contributing to health problems), educational and ecological diagnosis (predisposing, reinforcing, and enabling factors), and administrative and policy diagnosis (organizational and policy supports and barriers). The PROCEED phase involves implementation and evaluation: process evaluation (are activities being delivered as planned?), impact evaluation (are intermediate outcomes changing?), and outcome evaluation (is health status changing?). PRECEDE-PROCEED is particularly valuable for complex community-level programs because it forces practitioners to articulate the causal chain from determinants to outcomes before designing any intervention.

The **MAPP framework** (Mobilizing for Action through Planning and Partnerships) is a community-based strategic planning tool developed by the National Association of County and City Health Officials (NACCHO) for local health departments. MAPP consists of six phases: Organizing for Success (convening stakeholders), Visioning (developing a shared community health vision), four MAPP assessments (community health status, community themes and strengths, local public health system capacity, and forces of change), identifying strategic issues from the assessments, formulating goals and strategies, and action cycles. MAPP is distinguished from general strategic planning frameworks by its explicit attention to the local public health system — including non-governmental organizations, health care providers, and community organizations — rather than only the governmental health department.

## Health Economics: Cost-Effectiveness, Cost-Benefit, and QALYs

Public health agencies operate under persistent resource constraints, and health economists have developed rigorous tools for comparing the value of competing interventions. These tools are not purely academic exercises; they inform decisions about which programs get funded, which vaccines enter national immunization schedules, and which clinical preventive services receive "A" or "B" grades from the US Preventive Services Task Force (USPSTF).

**Cost-effectiveness analysis (CEA)** compares the costs and health outcomes of two or more alternatives, expressing results as a ratio: the incremental cost per unit of health outcome gained. The most common outcome measure in CEA is the life-year, or in more sophisticated analyses, the **quality-adjusted life year (QALY)** — a life-year weighted by a measure of health utility ranging from 0 (death) to 1 (perfect health). An intervention costing $50,000 per QALY gained is generally considered cost-effective by US standards; an intervention costing $150,000 per QALY is considered less favorable. The threshold is not universal — the UK's National Institute for Health and Care Excellence (NICE) uses a threshold near £20,000–30,000 per QALY — but the framework provides a common language for comparison. During COVID-19, CEA of vaccine deployment showed incremental cost-effectiveness ratios well below any reasonable threshold, providing economic justification for priority access programs.

**Cost-benefit analysis (CBA)** goes further by expressing both costs and outcomes in monetary terms, allowing computation of a net benefit (benefits minus costs) or a benefit-cost ratio. To convert health outcomes into dollars, CBA typically uses willingness-to-pay estimates, revealed preference from wage-risk studies, or the value of a statistical life (VSL) — a measure derived from labor market data reflecting how much workers implicitly demand for marginally riskier jobs. CBA is more powerful than CEA because it permits comparison across entirely different program types (health vs. education vs. transportation), but it is also more controversial because monetizing human lives and health raises ethical objections.

The concept of **return on investment in prevention** synthesizes CEA and CBA insights into a framework accessible to policymakers and administrators. ROI analyses compare the financial costs of a preventive program to the downstream healthcare cost savings and productivity gains it generates. Meta-analyses of community health worker programs, home visiting, and tobacco cessation programs consistently show ROIs greater than 1:1 — meaning every dollar invested returns more than a dollar in benefits. The CDC's Prevention Research Centers and the Trust for America's Health have published ROI analyses showing that a $10 per-person annual investment in evidence-based community prevention programs could save more than $16 billion in healthcare costs within five years.

Before the table below, note that each health economics tool has a specific use case — they are complementary, not interchangeable, and public health practitioners should be able to select the appropriate tool for a given decision context.

| Tool | What It Measures | Output Metric | When to Use | COVID-19 Example |
|---|---|---|---|---|
| Cost-Effectiveness Analysis | Cost per unit of health gained | Cost per QALY or cost per life-year saved | Comparing interventions within a health domain | mRNA vaccine vs. no vaccine: cost per QALY well below $50K threshold |
| Cost-Benefit Analysis | Net monetary value of health outcomes | Net benefit ($) or benefit-cost ratio | Comparing health programs to non-health investments | School closure as COVID control: costs (lost education) vs. lives saved |
| Return on Investment | Financial return on prevention spending | ROI ratio (e.g., $5.60 per $1 invested) | Justifying prevention budgets to elected officials | Community vaccination hubs: ROI from averted hospitalizations |
| Budget Impact Analysis | Affordability of adopting an intervention | Total program cost over N years | Health plan or government budget decisions | Estimated first-year cost of vaccine mandate programs |
| QALY | Health-utility-weighted life year | QALYs (dimensionless) | Input to CEA; standardized cross-condition comparison | Long COVID disability burden quantified in QALYs lost |

## Quality Improvement: PDSA, Lean, and Performance Management

Public health agencies are under increasing pressure to demonstrate not just that they deliver services but that they deliver them efficiently and effectively. Quality improvement (QI) frameworks imported from manufacturing and clinical medicine have been adapted for public health settings over the past two decades.

!!! mascot-thinking "What Makes Something 'Quality' in Public Health?"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Sage adjusts glasses thoughtfully">
    Quality in public health has multiple dimensions: effectiveness (does the intervention achieve its intended health outcomes?), equity (do outcomes differ systematically by race, income, or geography?), efficiency (are results achieved at reasonable cost?), and responsiveness (does the system meet the community's needs and preferences?). A QI framework that improves efficiency but widens equity gaps is not an improvement in any meaningful public health sense.

The **PDSA (Plan-Do-Study-Act) quality cycle** — also called the Plan-Do-Check-Act (PDCA) cycle — is a four-step iterative method for testing and implementing changes. In the Plan phase, practitioners identify a problem, develop a theory of improvement, and design a test on a small scale. In the Do phase, the test is implemented and data are collected. In the Study phase, data are analyzed to determine whether the change produced the intended improvement. In the Act phase, successful changes are scaled and institutionalized, or unsuccessful changes are abandoned and new theories are tested. PDSA cycles are intentionally rapid and small-scale — a health department might run a PDSA cycle on a vaccination clinic check-in process in a single afternoon — allowing for fast learning before committing resources to system-wide changes.

**Lean in public health** applies principles developed at Toyota (the Toyota Production System) to eliminate waste — defined as any activity that consumes resources without adding value for the client. Lean identifies eight categories of waste, including overproduction, waiting, unnecessary motion, and defects. Value stream mapping, a key Lean tool, visually depicts every step in a process from the client's first contact through service delivery, identifying steps that add no value. Lean has been applied in public health to reduce waiting times at WIC clinics, streamline laboratory specimen processing, and improve the speed of public records requests. A critical caution: Lean tools optimize existing processes and can inadvertently reduce equity if "efficiency" is defined without attention to which clients face the greatest barriers to service access.

**Performance management** is the systematic process by which organizations collect, analyze, and use data on key indicators to monitor progress toward goals and improve performance over time. In public health, performance management systems typically include a set of indicators aligned with the agency's strategic plan, regular reporting cycles (monthly, quarterly, annual), dashboards that make data visible to managers and staff, and formal review processes at which performance gaps are addressed. The Turning Point Performance Management National Excellence Collaborative framework describes performance management as a continuous cycle of setting performance goals, identifying performance measures, collecting data, reporting results, using results for improvement, and updating goals. Accreditation through PHAB requires health departments to demonstrate functioning performance management systems — making QI not only a professional norm but an accreditation requirement.

The relationship between performance management and the PDSA cycle is complementary: performance management provides ongoing monitoring data that surfaces problems warranting improvement cycles, while PDSA cycles generate evidence for changes that are then monitored through the performance management system. Together, these tools transform the planning frameworks described in the previous section into living management processes.

!!! mascot-celebration "Systems Thinking in Action"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Sage raises wings in celebration">
    You have now mapped the full terrain of health policy and management: from federal agencies to local health departments, from Kingdon's streams to the policy cycle, from Medicaid to the ACA, from quarantine authority to emergency use authorization, and from logic models to PDSA cycles. This chapter rewards re-reading — each framework becomes clearer once you can see how it connects to the others. The investigator who understands both the science of prevention and the systems that deliver it is the one who can actually change population health outcomes.

## Key Terms

**FQHC (Federally Qualified Health Center):** A community health center certified under Section 330 of the Public Health Service Act, located in an underserved area, operating on a sliding-fee scale, and receiving enhanced Medicare and Medicaid reimbursement.

**Kingdon's Streams Model:** A political science framework explaining policy change as the convergence of three independent streams — problem, policy, and politics — at a brief policy window.

**Medicaid:** A joint federal-state program providing health coverage to low-income individuals and families, financed through state spending matched by federal FMAP funds.

**QALY (Quality-Adjusted Life Year):** A unit of health outcome equal to one year of life in perfect health; used to compare the health gains from different interventions in cost-effectiveness analysis.

**PDSA Cycle:** A four-phase iterative quality improvement method (Plan, Do, Study, Act) for testing and implementing changes on a small scale before wider adoption.

**PRECEDE-PROCEED:** A two-phase ecological planning model that begins with social and epidemiological diagnosis (PRECEDE) and proceeds through implementation and multi-level evaluation (PROCEED).

**Police Powers:** The inherent state governmental authority to enact laws protecting public health, safety, and welfare, including authority for quarantine, mandatory vaccination, and health facility licensure.

**Emergency Use Authorization (EUA):** FDA authority to permit use of an unapproved medical product during a declared public health emergency when potential benefits outweigh potential risks.

## Review Questions

1. Explain the difference between state and federal authority in public health. Why do state health departments hold primary constitutional responsibility, and under what conditions does federal authority supersede state authority?

2. Using Kingdon's three streams model, analyze a recent public health policy change (e.g., naloxone access laws, flavored tobacco bans, sugar-sweetened beverage taxes). Which streams were aligned, and what was the policy window that allowed passage?

3. A county health department proposes a community health worker program to reduce emergency department visits among uninsured patients. Which health economics tools would you use to evaluate this proposal, and what data would you need to conduct each analysis?

4. Compare PRECEDE-PROCEED and the MAPP framework. For what types of programs is each most appropriate, and what are the key differences in their approaches to community assessment?

5. A PDSA cycle at a vaccination clinic reveals that 30% of clients wait more than 45 minutes. Describe the steps you would take through one complete PDSA cycle to address this problem.

## References

1. Kingdon, J. W. (1984/2011). *Agendas, Alternatives, and Public Policies* (2nd ed.). Longman.
2. Jacobson v. Massachusetts, 197 U.S. 11 (1905).
3. Centers for Medicare & Medicaid Services. (2024). *Medicaid and CHIP enrollment data*. CMS.gov.
4. Green, L. W., & Kreuter, M. W. (1991). *Health Promotion Planning: An Educational and Ecological Approach*. Mayfield.
5. National Association of County and City Health Officials. (2001). *MAPP: Mobilizing for Action through Planning and Partnerships*. NACCHO.
6. Centers for Disease Control and Prevention. (2021). *Program Performance and Evaluation Office: Logic Model resources*. CDC.gov.
7. Trust for America's Health. (2022). *The Case for Prevention: Return on Investment Analyses*. TFAH.org.
8. Public Health Accreditation Board. (2022). *PHAB Standards and Measures, Version 2022*. PHAB.
9. Deming, W. E. (1986). *Out of the Crisis*. MIT Press.
10. Gostin, L. O. (2016). *Public Health Law: Power, Duty, Restraint* (3rd ed.). University of California Press.
