# Quiz: Epidemiology — Study Design and Causal Inference

Test your understanding of study designs, validity threats, surveillance systems, and outbreak investigation with these review questions.

---

#### 1. Internal validity in an epidemiological study refers to:

<div class="upper-alpha" markdown>
1. The degree to which study results apply to populations beyond the study sample
2. The accuracy with which the study measures what it claims to measure within the study population
3. The consistency of the association across different geographic settings
4. The statistical power of the study to detect a true association
</div>
??? question "Show Answer"
    The correct answer is **B**. Internal validity is the degree to which the study correctly estimates the exposure-outcome relationship in the study population — free from systematic bias (selection bias, information bias, confounding). External validity (generalizability) addresses whether findings apply beyond the study sample. A study can have high internal validity but low external validity if the sample is unrepresentative.

    **Concept Tested:** Internal vs. External Validity

---

#### 2. Information bias in a case-control study is most likely when:

<div class="upper-alpha" markdown>
1. Cases and controls are recruited from different clinical settings
2. Cases recall past exposures more thoroughly than controls because they are motivated to find a cause
3. The exposure of interest is rare in the study population
4. Loss to follow-up is higher in the unexposed group
</div>
??? question "Show Answer"
    The correct answer is **B**. Recall bias is a form of information bias that occurs in case-control studies when cases, motivated by their illness, recall past exposures more completely or differently than controls. This differential misclassification of exposure can bias the odds ratio away from the null. Options A and D describe selection bias mechanisms; option C affects statistical power but is not itself an information bias.

    **Concept Tested:** Recall Bias / Information Bias

---

#### 3. In an active surveillance system, cases are identified by:

<div class="upper-alpha" markdown>
1. Waiting for healthcare providers to report conditions voluntarily
2. Requiring mandatory reporting from laboratories and hospitals
3. Public health staff who proactively contact providers to collect case reports
4. Self-report through community health surveys
</div>
??? question "Show Answer"
    The correct answer is **C**. Active surveillance involves public health staff actively soliciting case reports from healthcare facilities, laboratories, or other sources — rather than waiting for reports to arrive. This produces more complete and timely case ascertainment but is more resource-intensive. Passive surveillance (option A) depends on providers voluntarily submitting reports and typically undercounts cases but is scalable.

    **Concept Tested:** Active vs. Passive Surveillance

---

#### 4. The basic reproduction number R₀ represents:

<div class="upper-alpha" markdown>
1. The current average number of new cases generated per case given current immunity levels and interventions
2. The average number of secondary infections produced by one case in a fully susceptible population with no interventions
3. The proportion of the population that must be vaccinated to achieve herd immunity
4. The rate at which infectious individuals recover and become immune
</div>
??? question "Show Answer"
    The correct answer is **B**. R₀ is defined under the idealized condition of a fully susceptible population with no interventions — it is a property of the pathogen and the population's contact structure. R_effective (R_eff or R_t) is the current average number of secondary cases accounting for immunity and interventions (option A). The herd immunity threshold is derived from R₀ as 1 − 1/R₀ (option C).

    **Concept Tested:** Basic Reproduction Number R₀

---

#### 5. During an outbreak investigation, an epidemic curve with a sharp single peak consistent with a point-source exposure suggests:

<div class="upper-alpha" markdown>
1. Person-to-person transmission with a long generation time
2. A continuous common-source exposure sustained over weeks
3. A single shared exposure event within approximately one incubation period
4. Multiple introduction events from an animal reservoir
</div>
??? question "Show Answer"
    The correct answer is **C**. A point-source epidemic curve shows a rapid rise and fall in cases concentrated within roughly one incubation period, suggesting a single shared exposure event at one point in time (e.g., a contaminated food item at a single meal). Person-to-person transmission (option A) produces a propagated curve with successive waves. Continuous source exposure (option B) produces a plateau or extended curve.

    **Concept Tested:** Epidemic Curve Interpretation

---

#### 6. The positive predictive value (PPV) of a screening test is most strongly influenced by:

<div class="upper-alpha" markdown>
1. The sensitivity of the test in isolation
2. The specificity of the test in isolation
3. The prevalence of the condition in the population being screened
4. The reproducibility of the test across different laboratories
</div>
??? question "Show Answer"
    The correct answer is **C**. Positive predictive value — the probability that a person with a positive test actually has the disease — depends on both test performance characteristics and disease prevalence. In low-prevalence populations, even a highly specific test will generate many false positives relative to true positives, lowering PPV. This is why screening programs applied to low-risk populations must account for the false-positive burden.

    **Concept Tested:** Positive Predictive Value and Prevalence

---

#### 7. The herd immunity threshold (HIT) for a disease with R₀ = 4 is:

<div class="upper-alpha" markdown>
1. 25%
2. 40%
3. 75%
4. 80%
</div>
??? question "Show Answer"
    The correct answer is **C**. The herd immunity threshold = 1 − 1/R₀ = 1 − 1/4 = 1 − 0.25 = 0.75 = 75%. When 75% of the population is immune, each infectious case produces on average fewer than one secondary case, and the outbreak declines. For comparison, measles (R₀ ≈ 15) requires approximately 93% immunity; COVID-19 wild-type (R₀ ≈ 2.5) required approximately 60%.

    **Concept Tested:** Herd Immunity Threshold

---

#### 8. Selection bias in a case-control study is introduced when:

<div class="upper-alpha" markdown>
1. Exposure classification errors are equally distributed between cases and controls
2. Cases and controls are selected in a way that distorts the exposure-disease relationship
3. A confounder is measured with error in the study
4. The case definition changes during the course of data collection
</div>
??? question "Show Answer"
    The correct answer is **B**. Selection bias arises when the probability of being selected into the study differs by both exposure and disease status, causing the study sample to be unrepresentative of the base population in ways that bias the odds ratio. Classic examples include Berkson's bias (hospital controls over-represent certain exposures) and the healthy worker effect in occupational studies.

    **Concept Tested:** Selection Bias

---

#### 9. A randomized controlled trial (RCT) is considered the "gold standard" for causal inference primarily because:

<div class="upper-alpha" markdown>
1. It follows participants for a longer period than observational studies
2. Random allocation to exposure/control groups eliminates confounding by measured and unmeasured variables
3. Double blinding prevents information bias in all studies
4. It generates larger sample sizes than any other design
</div>
??? question "Show Answer"
    The correct answer is **B**. The defining strength of the RCT is random allocation, which distributes both measured and unmeasured confounders equally between treatment and control groups in expectation. This breaks the association between treatment assignment and all pre-existing characteristics, allowing causal attribution of outcome differences to the treatment. Observational designs must attempt to control confounding through analytic methods, which can only address measured confounders.

    **Concept Tested:** RCT and Causal Inference

---

#### 10. The first step in investigating a potential foodborne disease outbreak is to:

<div class="upper-alpha" markdown>
1. Implement an immediate environmental intervention to prevent further exposure
2. Verify the diagnosis and confirm that a true excess of cases exists
3. Identify the vehicle of transmission through a case-control study
4. Issue a public press release to alert potentially exposed individuals
</div>
??? question "Show Answer"
    The correct answer is **B**. The outbreak investigation process begins with confirming that a true excess of cases exists — verifying that the clinical presentations are consistent, that laboratory confirmation is obtained for representative cases, and that the number of cases exceeds what would be expected by chance. This step prevents resources from being spent on investigating a statistical artifact or a cluster of unrelated cases before a real outbreak is confirmed.

    **Concept Tested:** Steps in Outbreak Investigation

---
