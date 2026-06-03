# Quiz: Epidemiology — Disease Measurement

Test your understanding of disease frequency measures, measures of association, and causal inference with these review questions.

---

#### 1. A study finds that among 5,000 people followed for one year, 50 developed the disease of interest. The incidence proportion (cumulative incidence) is:

<div class="upper-alpha" markdown>
1. 50 cases per 100,000 person-years
2. 1% over one year
3. 0.01 per person-year
4. 50 per 1,000 person-months
</div>
??? question "Show Answer"
    The correct answer is **B**. Cumulative incidence (incidence proportion) = new cases / population at risk = 50 / 5,000 = 0.01 = 1% over the one-year period. This is a dimensionless proportion, not a rate. The incidence rate (density) would require person-time in the denominator; because follow-up is one year for all 5,000, the incidence rate would be approximately 1 per 100 person-years.

    **Concept Tested:** Cumulative Incidence

---

#### 2. The relative risk (risk ratio) in a cohort study is calculated as:

<div class="upper-alpha" markdown>
1. Odds of exposure in cases divided by odds of exposure in controls
2. Incidence in the exposed group divided by incidence in the unexposed group
3. Prevalence in cases minus prevalence in controls
4. Number of exposed cases divided by total number of exposed persons
</div>
??? question "Show Answer"
    The correct answer is **B**. The relative risk (RR) compares the incidence of disease in the exposed group to the incidence in the unexposed group: RR = I_exposed / I_unexposed. An RR > 1 suggests a positive association; RR < 1 suggests a protective association; RR = 1 indicates no difference. The odds ratio (option A) is used in case-control studies.

    **Concept Tested:** Relative Risk / Risk Ratio

---

#### 3. Attributable risk percent (AR%) is most useful for answering which question?

<div class="upper-alpha" markdown>
1. How many times more likely are exposed individuals to develop the disease?
2. What fraction of disease in the exposed group is due to the exposure?
3. What is the probability that a randomly selected case was exposed?
4. How strong is the statistical association between exposure and outcome?
</div>
??? question "Show Answer"
    The correct answer is **B**. The attributable risk percent (also called attributable fraction in the exposed) = (RR − 1) / RR × 100%. It estimates the proportion of disease in exposed individuals that can be attributed to the exposure — and therefore the maximum proportion that could theoretically be prevented by eliminating the exposure. It answers a causal rather than a purely statistical question.

    **Concept Tested:** Attributable Risk Percent

---

#### 4. In a case-control study, the measure of association calculated is the:

<div class="upper-alpha" markdown>
1. Relative risk, because it directly compares incidence rates
2. Attributable risk, because cases and controls have equal follow-up time
3. Odds ratio, which approximates the relative risk when the disease is rare
4. Prevalence ratio, because case-control studies measure point prevalence
</div>
??? question "Show Answer"
    The correct answer is **C**. Case-control studies select participants on outcome status (cases vs. controls) and look backward at exposure, so incidence in exposed/unexposed groups cannot be directly calculated. Instead, the odds ratio (OR) compares the odds of exposure among cases to the odds of exposure among controls. When disease incidence is low (the rare disease assumption), OR ≈ RR.

    **Concept Tested:** Odds Ratio in Case-Control Studies

---

#### 5. Confounding in an epidemiological study occurs when:

<div class="upper-alpha" markdown>
1. The outcome misclassification rate differs between exposed and unexposed groups
2. A third variable is associated with both the exposure and the outcome, distorting the apparent association
3. Participants who develop the outcome are more likely to drop out of a cohort
4. The study sample is not representative of the target population
</div>
??? question "Show Answer"
    The correct answer is **B**. A confounder is a variable that is associated with both the exposure and the outcome, is not on the causal pathway between them, and creates a spurious or distorted estimate of the true exposure-outcome relationship. For example, alcohol confounds the association between smoking and lung cancer if smokers drink more than non-smokers and alcohol is also associated with lung cancer. Option C is selection bias; option D is an external validity issue.

    **Concept Tested:** Confounding

---

#### 6. The Bradford Hill criterion of "biological gradient" refers to:

<div class="upper-alpha" markdown>
1. The ability to replicate findings in multiple populations
2. A dose-response relationship where higher exposure is associated with greater risk
3. The existence of a plausible mechanism by which the exposure causes the outcome
4. Consistency of the association across different study designs
</div>
??? question "Show Answer"
    The correct answer is **B**. The biological gradient criterion states that if an exposure causes an outcome, increasing levels of exposure should produce increasing risk of the outcome — a dose-response relationship. This is one of Austin Bradford Hill's nine criteria for evaluating causal evidence. It is particularly persuasive when observed (e.g., smoking pack-years and lung cancer risk increase together) and weakens a causal claim when absent.

    **Concept Tested:** Bradford Hill Criteria — Biological Gradient

---

#### 7. A prospective cohort study has which of the following advantages over a case-control study?

<div class="upper-alpha" markdown>
1. It is less expensive and requires fewer participants
2. It is better suited to studying rare diseases
3. It can directly calculate incidence rates and relative risks
4. It eliminates the possibility of selection bias
</div>
??? question "Show Answer"
    The correct answer is **C**. Because a cohort study follows an at-risk population forward in time and ascertains who develops the outcome, it can directly calculate incidence rates in exposed and unexposed groups, and therefore the relative risk. Case-control studies cannot directly calculate incidence because participants are selected on outcome status. Cohort studies are generally more expensive (option A), not better for rare outcomes (option B), and are not immune to selection bias (option D).

    **Concept Tested:** Cohort Study Design

---

#### 8. A directed acyclic graph (DAG) is used in epidemiology primarily to:

<div class="upper-alpha" markdown>
1. Calculate the exact magnitude of confounding bias
2. Represent causal assumptions and identify the minimal sufficient adjustment set
3. Display the temporal sequence of outcome events in a cohort
4. Show the network structure of disease transmission in an outbreak
</div>
??? question "Show Answer"
    The correct answer is **B**. Directed acyclic graphs (DAGs) are causal diagrams that encode the researcher's assumptions about relationships among variables. They allow identification of confounders, mediators, and colliders, and can be used to determine which variables must be controlled (the minimal adjustment set) to obtain an unbiased estimate of the exposure-outcome effect. Controlling for colliders can introduce rather than remove bias — a subtlety that DAGs make visible.

    **Concept Tested:** Directed Acyclic Graphs (DAGs)

---

#### 9. Sensitivity of a screening test is defined as:

<div class="upper-alpha" markdown>
1. The proportion of people without the disease who test negative
2. The proportion of people with the disease who test positive
3. The proportion of positive tests that are true positives
4. The probability that a person with a positive test has the disease
</div>
??? question "Show Answer"
    The correct answer is **B**. Sensitivity = true positives / (true positives + false negatives) — it measures the test's ability to correctly identify those who have the disease. A highly sensitive test misses few cases (low false-negative rate). Specificity (option A) measures the ability to correctly identify those without disease. Positive predictive value (options C and D) depends on both test characteristics and disease prevalence.

    **Concept Tested:** Sensitivity of a Screening Test

---

#### 10. Number needed to treat (NNT) is best interpreted as:

<div class="upper-alpha" markdown>
1. The number of patients who must be exposed to a risk factor to cause one additional case
2. The number of study participants needed to achieve adequate statistical power
3. The number of patients who must receive an intervention to prevent one additional adverse outcome
4. The number of standard deviations separating the treatment and control group means
</div>
??? question "Show Answer"
    The correct answer is **C**. NNT = 1 / absolute risk reduction. It represents, on average, how many patients must receive the treatment to prevent one additional adverse outcome compared to the control condition. Smaller NNT values indicate more effective interventions. NNT is a clinically intuitive measure because it directly communicates how many people must be treated for one person to benefit.

    **Concept Tested:** Number Needed to Treat

---
