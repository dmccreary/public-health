# Quiz: Biostatistics — Regression and Advanced Methods

Test your understanding of regression models, survival analysis, meta-analysis, and interrupted time series with these review questions.

---

#### 1. In a linear regression model, the coefficient β₁ for a continuous predictor variable is interpreted as:

<div class="upper-alpha" markdown>
1. The probability that the outcome occurs for each one-unit increase in the predictor
2. The expected change in the outcome for a one-unit increase in the predictor, holding other variables constant
3. The odds of the outcome for individuals with the predictor present versus absent
4. The correlation coefficient between the predictor and the outcome
</div>
??? question "Show Answer"
    The correct answer is **B**. In linear regression, β₁ is the expected change in the continuous outcome variable for a one-unit increase in the predictor, with all other covariates held constant. This "all else equal" interpretation is what makes multiple regression useful for isolating the effect of one variable while controlling for confounders. Option A describes a predicted probability from logistic regression; option C describes an odds ratio.

    **Concept Tested:** Linear Regression Coefficient Interpretation

---

#### 2. Logistic regression is preferred over linear regression when the outcome variable is:

<div class="upper-alpha" markdown>
1. A continuous measurement like blood pressure
2. A count of events per unit time
3. A binary outcome such as disease/no disease
4. A time-to-event variable with censoring
</div>
??? question "Show Answer"
    The correct answer is **C**. Logistic regression is designed for binary (dichotomous) outcomes. It models the log-odds of the outcome as a linear function of predictors, producing odds ratios as coefficients. Using linear regression for a binary outcome can produce predicted probabilities outside [0,1] and violates the assumption of normally distributed residuals. Poisson regression (option B) handles count data; Cox regression (option D) handles time-to-event data.

    **Concept Tested:** Logistic Regression Indications

---

#### 3. The odds ratio from logistic regression approximates the relative risk most closely when:

<div class="upper-alpha" markdown>
1. The sample size is very large
2. The outcome is rare in the study population
3. All predictors are dichotomous
4. The model is adjusted for all measured confounders
</div>
??? question "Show Answer"
    The correct answer is **B**. When disease incidence is low — typically less than 10% — the OR approximates the RR because the denominator of the odds (1 − p) approaches 1.0. As outcome frequency increases, OR diverges from RR. For common outcomes, log-binomial or Poisson regression with robust variance can directly estimate the prevalence or risk ratio.

    **Concept Tested:** OR Approximation of RR

---

#### 4. In survival analysis, censoring occurs when:

<div class="upper-alpha" markdown>
1. An outcome event is observed before the planned study end date
2. A participant's follow-up ends before an event occurs and before study end
3. Participants who experience the outcome early are excluded from analysis
4. The Kaplan-Meier curve reaches a cumulative survival probability of zero
</div>
??? question "Show Answer"
    The correct answer is **B**. Censoring occurs when a participant's exact event time is unknown because they were lost to follow-up, withdrew, or the study ended before they experienced the outcome. Censored observations contribute the time they were observed to the analysis. The Kaplan-Meier estimator and Cox proportional hazards model handle censored observations appropriately — simply excluding them would introduce bias.

    **Concept Tested:** Censoring in Survival Analysis

---

#### 5. A forest plot in a meta-analysis displays:

<div class="upper-alpha" markdown>
1. The geographic distribution of studies included in the review
2. The effect estimate and confidence interval from each individual study plus the pooled estimate
3. The risk of bias assessment for each included study
4. The dose-response relationship between exposure and outcome across studies
</div>
??? question "Show Answer"
    The correct answer is **B**. A forest plot graphically displays each study's effect estimate and its confidence interval as a horizontal line with a box (sized by study weight), with a diamond at the bottom representing the pooled meta-analytic estimate. Visual inspection shows whether study results are consistent or heterogeneous. Risk-of-bias assessment (option C) is typically displayed in a separate table.

    **Concept Tested:** Forest Plot in Meta-Analysis

---

#### 6. I² in a meta-analysis quantifies:

<div class="upper-alpha" markdown>
1. The number of studies with statistically significant findings
2. The proportion of total variability in effect estimates due to heterogeneity rather than chance
3. The weighted average effect size across all included studies
4. The probability that all studies share a common true effect size
</div>
??? question "Show Answer"
    The correct answer is **B**. I² ranges from 0% to 100% and estimates the proportion of observed variability in study estimates attributable to true heterogeneity (differences in populations, interventions, outcomes) rather than sampling error. By convention: I² < 25% is low heterogeneity, 25–75% is moderate, and > 75% is high. High heterogeneity suggests a single pooled estimate may be misleading without subgroup analysis.

    **Concept Tested:** Heterogeneity in Meta-Analysis (I²)

---

#### 7. Interrupted time series (ITS) analysis is best suited to evaluate:

<div class="upper-alpha" markdown>
1. Randomized trials where participants cross over between treatment arms
2. The impact of a policy or population-level intervention using pre- and post-intervention trend data
3. Time-to-event outcomes where follow-up duration varies across participants
4. Seasonal variation in infectious disease incidence using spectral decomposition
</div>
??? question "Show Answer"
    The correct answer is **B**. ITS analysis uses pre-intervention time series data to model the expected trend, then tests whether the intervention produced a change in level (immediate step change) and/or slope (change in trend) after implementation. It is particularly useful for evaluating population-level policy changes — such as a tobacco tax or a vaccination program — where randomization is impossible. The design requires sufficient pre-intervention data points to establish a reliable baseline trend.

    **Concept Tested:** Interrupted Time Series Design

---

#### 8. In a Cox proportional hazards model, the hazard ratio for a binary predictor represents:

<div class="upper-alpha" markdown>
1. The probability that a participant experiences the event by a specified time
2. The ratio of the instantaneous event rate in the exposed group to that in the unexposed group at any given time
3. The difference in median survival time between exposure groups
4. The odds that an event occurs in the exposed group relative to the unexposed group
</div>
??? question "Show Answer"
    The correct answer is **B**. The hazard ratio (HR) in a Cox model is the ratio of the instantaneous event rate (hazard) in the exposed versus unexposed group, assumed to be constant over time (the proportional hazards assumption). An HR of 1.5 means the exposed group has a 50% higher instantaneous rate of the event at any given time point. Unlike the odds ratio, the HR is not equivalent to the risk ratio except under specific conditions.

    **Concept Tested:** Cox Proportional Hazards Model

---

#### 9. Missing data handled with multiple imputation produces less biased estimates than complete-case analysis primarily because:

<div class="upper-alpha" markdown>
1. Multiple imputation eliminates all uncertainty introduced by missing values
2. Multiple imputation uses the observed data to preserve the distribution and relationships among variables
3. Complete-case analysis requires a larger sample size than multiple imputation
4. Multiple imputation assumes data are missing completely at random, which is always satisfied
</div>
??? question "Show Answer"
    The correct answer is **B**. Multiple imputation creates several complete datasets by replacing missing values with plausible values drawn from the conditional distribution of the missing variable given observed data, then pools results across imputed datasets. This preserves the variability and covariance structure of the data. Complete-case analysis is unbiased only when data are missing completely at random (MCAR) — a strong assumption rarely met. Multiple imputation is valid under the weaker missing-at-random (MAR) assumption.

    **Concept Tested:** Multiple Imputation vs. Complete-Case Analysis

---

#### 10. Excess mortality during a pandemic is estimated by comparing:

<div class="upper-alpha" markdown>
1. Hospital death records to nursing home death records in the same period
2. Observed total deaths to modeled expected deaths based on historical trends
3. COVID-19 certified deaths to all-cause mortality in the pre-pandemic period
4. Age-standardized mortality rates between high-income and low-income countries
</div>
??? question "Show Answer"
    The correct answer is **B**. Excess mortality = observed all-cause deaths minus expected deaths (modeled from historical trend data, seasonality, and population changes). It captures deaths directly from the disease plus indirect deaths from healthcare disruption, and does not depend on accurate death certification. During COVID-19, excess mortality consistently exceeded confirmed COVID-19 death counts, revealing the full pandemic toll including misattributed and indirect deaths.

    **Concept Tested:** Excess Mortality Estimation

---
