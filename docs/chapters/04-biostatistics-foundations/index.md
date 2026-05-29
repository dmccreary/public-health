---
title: "Biostatistics: Statistical Foundations"
description: Descriptive statistics, probability theory including Bayes' theorem, sampling methods, hypothesis testing framework, confidence intervals, and common inferential tests from chi-square to ANOVA applied to public health data.
generated_by: claude skill chapter-content-generator
date: 2026-05-28 14:30:00
version: 0.08
---

# Biostatistics: Statistical Foundations

## Summary

Biostatistics provides the quantitative language through which public health evidence is generated, evaluated, and communicated. This chapter covers the full arc from describing data to testing hypotheses: measures of central tendency and dispersion, the major probability distributions used in count data modeling, sampling design, the null hypothesis testing framework with its error types, confidence intervals, and the suite of inferential tests used to compare groups in observational and experimental studies.

This chapter assumes only the prerequisites listed in the [course description](../../course-description.md).

## Concepts Covered

This chapter covers the following 24 concepts from the learning graph:

1. Descriptive Statistics
2. Measures of Central Tendency
3. Measures of Dispersion
4. Normal Distribution
5. Binomial Distribution
6. Poisson Distribution
7. Negative Binomial Distribution
8. Probability Fundamentals
9. Conditional Probability
10. Bayes' Theorem
11. Sampling Methods
12. Sample Size Estimation
13. Statistical Power
14. Null Hypothesis Testing
15. Type I Error Alpha
16. Type II Error Beta
17. P-Value Interpretation
18. Confidence Interval
19. Chi-Square Test
20. Fisher's Exact Test
21. Student T-Test
22. Mann-Whitney U Test
23. Analysis of Variance ANOVA
24. Kruskal-Wallis Test

---

!!! mascot-welcome "The Language of Evidence"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Sage waves welcome">
    Welcome to the chapter where we learn the language that all public health evidence speaks. Every rate you encountered in Chapters 2 and 3, every relative risk, every confidence interval attached to an odds ratio — all of it rests on the foundations you are about to build. Biostatistics is not a detour from public health practice; it is the instrument the field uses to turn raw data into defensible claims. *What does the evidence show?* This chapter teaches you how to answer that question rigorously.

---

## Describing Data: Central Tendency and Dispersion

Before testing hypotheses, public health analysts describe their data. **Descriptive statistics** are numerical summaries that characterize the distribution, central value, and spread of a dataset without generalizing beyond the observations at hand. When the CDC reports that the median household income in counties with high opioid mortality is lower than in counties with low opioid mortality, that is a descriptive finding. It does not yet establish causation, but it establishes the pattern that demands explanation.

### Measures of Central Tendency

**Measures of central tendency** capture the typical or middle value of a distribution. Three measures are used routinely:

- **Mean** — the arithmetic average: \( \bar{x} = \frac{\sum x_i}{n} \). The mean uses all values in the dataset and is sensitive to extreme observations (outliers). For symmetric, bell-shaped distributions, the mean is the best single summary.
- **Median** — the middle value when data are sorted in order. Half the observations fall above and half below. The median is robust to outliers and is preferred for skewed distributions such as income, hospital length of stay, or drug prices.
- **Mode** — the most frequently occurring value. Used most often for categorical data (for example, the most common cause of death in a county) or to describe multimodal distributions where the mean and median would miss a second peak.

In public health, the choice of central tendency measure is not cosmetic. Reporting mean household income rather than median income in a high-inequality area overstates typical economic conditions because a small number of very high incomes inflate the mean. The **mean–median gap** is itself a measure of distributional skewness and inequality.

### Measures of Dispersion

Knowing the center of a distribution is only half the picture. **Measures of dispersion** quantify how spread out values are around that center. Wide dispersion in a health outcome often signals underlying inequality or heterogeneity in risk exposure.

The four key dispersion measures are:

- **Range** — maximum minus minimum. Simple but highly sensitive to outliers; tells you the full span but not typical spread.
- **Interquartile range (IQR)** — the distance between the 25th percentile (Q1) and the 75th percentile (Q3). Captures the middle 50% of data and is resistant to outliers; paired with the median as a robust summary.
- **Variance** — the average squared deviation from the mean: \( s^2 = \frac{\sum (x_i - \bar{x})^2}{n-1} \). Squaring the deviations makes variance sensitive to outliers and expressed in squared units.
- **Standard deviation (SD)** — the square root of variance: \( s = \sqrt{s^2} \). Expressed in the same units as the original data; the most commonly reported measure of spread for approximately symmetric distributions.

The **coefficient of variation (CV)** — SD divided by mean, often expressed as a percentage — allows comparison of spread across variables measured on different scales. A CV of 40% on one lab measure versus 10% on another tells you the first has much more relative variability.

Two datasets can share identical means and standard deviations while having very different shapes. Always pair numerical summaries with visual displays — histograms, box plots, or density curves — before applying inferential tests.

## Probability Foundations

### Probability Fundamentals

**Probability** is the mathematical framework for quantifying uncertainty. Formally, the probability of event A, written \( P(A) \), is a number between 0 and 1 representing the long-run relative frequency of the event in a large number of identical trials. Three foundational rules govern all probability calculations:

- **Complement rule:** \( P(\text{not } A) = 1 - P(A) \). If the probability of testing positive is 0.15, the probability of testing negative is 0.85.
- **Addition rule (mutually exclusive events):** \( P(A \text{ or } B) = P(A) + P(B) \) when A and B cannot both occur simultaneously.
- **Multiplication rule (independent events):** \( P(A \text{ and } B) = P(A) \times P(B) \) when the occurrence of A does not affect the probability of B.

These simple rules underlie the more complex calculations used throughout public health, from calculating the probability that a screening test correctly identifies disease to estimating the likelihood that an observed outbreak cluster arose by chance.

### Conditional Probability

**Conditional probability** is the probability that event A occurs *given that* event B has already occurred, written \( P(A | B) \). It is defined as:

\[
P(A | B) = \frac{P(A \text{ and } B)}{P(B)}
\]

Conditional probability is central to clinical and population-level decision-making. The probability that a patient has tuberculosis, given that they tested positive on a skin test, depends not only on the test's characteristics but on the prevalence of TB in the population — a fact that many clinicians (and students) find counterintuitive until they work through the arithmetic.

The **2×2 contingency table** — disease positive/negative crossed with test positive/negative — is the operational structure for conditional probability in diagnostic testing. It gives rise to sensitivity \( P(\text{test}^+ | \text{disease}^+) \), specificity \( P(\text{test}^- | \text{disease}^-) \), positive predictive value \( P(\text{disease}^+ | \text{test}^+) \), and negative predictive value \( P(\text{disease}^- | \text{test}^-) \), all of which were introduced in Chapter 3.

### Bayes' Theorem

**Bayes' theorem** formalizes the logic of updating beliefs in light of new evidence. Starting from a prior probability — our belief about the probability of an event before new data arrive — we update it using the likelihood of the observed data under that hypothesis to produce a posterior probability. The formal statement is:

\[
P(D | T^+) = \frac{P(T^+ | D) \cdot P(D)}{P(T^+ | D) \cdot P(D) + P(T^+ | \bar{D}) \cdot P(\bar{D})}
\]

Where \( D \) = disease present, \( T^+ \) = test positive, \( P(D) \) = prior probability of disease (prevalence), \( P(T^+ | D) \) = sensitivity, and \( P(T^+ | \bar{D}) \) = false positive rate (1 − specificity).

The practical lesson from Bayes' theorem is profound: **a positive test result is more meaningful in a high-prevalence population.** Consider a test with sensitivity 90% and specificity 95%. In a population with 1% disease prevalence, the positive predictive value is only about 15% — meaning 85% of positives are false alarms. In a population with 20% prevalence, the PPV rises to roughly 82%. This is why mass screening programs targeting low-prevalence populations require highly specific tests, and why Bayes' reasoning must inform every screening policy decision.

!!! mascot-thinking "Why does prevalence change what a test result means?"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Sage looks thoughtful with clipboard">
    Think about it this way: if almost no one in the population has the disease, the handful who test positive are mostly false positives just by the mathematics of large numbers. Even a test that is 95% specific will produce many false positives when the true cases are rare. This is sometimes called the **base rate fallacy** — the tendency to ignore prevalence when interpreting test results. Bayes' theorem is the corrective. The next time you see a news headline about a new diagnostic test with "95% accuracy," ask: accuracy in which population, at what prevalence? That is the question that determines whether the test is clinically useful.

## Distributions for Count and Event Data

**Probability distributions** are mathematical functions that describe the likelihood of different values for a random variable. Choosing the right distribution for your data is a foundational modeling decision; using the wrong distribution produces misleading estimates.

### The Normal Distribution

The **normal distribution** (also called the Gaussian distribution) is a continuous, symmetric, bell-shaped distribution fully characterized by two parameters: the mean \( \mu \) and the standard deviation \( \sigma \). Its probability density function is:

\[
f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}
\]

The normal distribution has two empirical rules that are widely used:

- Approximately 68% of values fall within 1 SD of the mean
- Approximately 95% of values fall within 1.96 SD of the mean
- Approximately 99.7% of values fall within 3 SD of the mean

In public health, the normal distribution approximates the sampling distribution of means for large samples (Central Limit Theorem), making it the mathematical foundation of most classical inferential tests even when individual data are not normally distributed. Continuous outcomes such as blood pressure, serum cholesterol, and height in healthy populations are approximately normally distributed.

The **standard normal distribution** (Z distribution) has \( \mu = 0 \) and \( \sigma = 1 \). Any normally distributed variable can be converted to a Z score: \( Z = \frac{x - \mu}{\sigma} \). Z scores express how many standard deviations an observation lies from the mean, enabling comparisons across different scales.

The interactive explorer below lets you manipulate the mean and standard deviation of a normal distribution and observe how the curve shape and probability intervals change.

#### Diagram: Normal Distribution Explorer

<iframe src="../../sims/normal-distribution-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Normal Distribution Explorer — Interactive MicroSim</summary>
Type: microsim
**sim-id:** normal-distribution-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: explain
Learning Objective: Students can explain how changing the mean and standard deviation of a normal distribution affects its shape, center, and probability intervals, and identify what fraction of values fall within 1, 2, and 3 standard deviations.

Purpose: Build intuition about normal distribution shape and parameterization before using the normal as the foundation for hypothesis testing and confidence intervals.

Layout: Full-width canvas. Left 65%: smooth bell curve drawn on axes labeled with values. Right 35%: numeric readout panel showing current μ, σ, and the percent of area under the curve within ±1σ, ±1.96σ, ±3σ. Bottom: slider controls.

Controls:
- Mean slider: range −50 to 50, step 1, default 0. Slides the entire curve left/right.
- SD slider: range 1 to 30, step 0.5, default 10. Widens/narrows the curve.
- Shading selector (dropdown): "None", "±1σ (68%)", "±1.96σ (95%)", "±3σ (99.7%)", "Custom range". When a shading option is selected, the area under the curve in that range fills with a semi-transparent teal color, and the percentage is shown in a bold label on the canvas.
- Reset button: returns to μ=0, σ=10.

Interactive features:
- Hovering the curve at any x position shows a tooltip: x value, z-score = (x−μ)/σ, and the probability density at that point.
- When "Custom range" is selected in the shading dropdown, two additional sliders appear: lower bound and upper bound. The shaded area and exact probability are computed and displayed.

Axis behavior:
- x-axis always spans μ ± 4σ to keep the curve visible regardless of slider settings.
- y-axis scales automatically so the peak of the curve uses about 75% of the canvas height.

Visual style: White background, teal curve line (3px), teal fill for shaded areas, clean axis labels.

Canvas: Responsive full container width, height 500px.

Instructional Rationale: Direct manipulation of μ and σ with live area shading teaches the empirical rule more effectively than static figures, and builds the intuition needed to understand confidence intervals and p-values.
</details>

### The Binomial Distribution

The **binomial distribution** models the number of "successes" in a fixed number of independent trials when each trial has the same probability of success. It applies to public health outcomes that are binary (yes/no): disease or no disease, vaccinated or unvaccinated, positive or negative test result.

If \( n \) is the number of trials and \( p \) is the probability of success on each trial, the probability of exactly \( k \) successes is:

\[
P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}
\]

The mean of a binomial distribution is \( \mu = np \) and the variance is \( \sigma^2 = np(1-p) \). Public health examples: the number of individuals in a household of five who contract influenza when household attack rate is 30%; the number of positive rapid tests among 20 contacts screened during a contact investigation.

### The Poisson Distribution

The **Poisson distribution** models the number of events occurring in a fixed time period or area when events occur independently at a constant average rate \( \lambda \) (lambda). Its probability mass function is:

\[
P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!}
\]

A distinctive property of the Poisson distribution is that its mean equals its variance: \( E[X] = Var[X] = \lambda \). This becomes important when fitting count data: if the observed variance substantially exceeds the mean, the Poisson assumption is violated — a condition known as **overdispersion**.

Public health applications include: counts of new disease cases per week in a surveillance region, emergency department visits per day in a hospital, and deaths per year attributable to a specific cause in a county. The Poisson model is the foundation for Poisson regression, introduced in Chapter 5.

### The Negative Binomial Distribution

The **negative binomial distribution** is a generalization of the Poisson that accommodates overdispersed count data — datasets where the variance exceeds the mean. In infectious disease modeling, overdispersion reflects real-world heterogeneity in transmission: most infected individuals transmit to few or no others, while a small number of "superspreaders" drive a disproportionate share of onward infections. The negative binomial is parameterized by the mean \( \mu \) and a dispersion parameter \( k \) (or \( r \)) that controls how much variance exceeds the mean. As \( k \to \infty \), the negative binomial converges to the Poisson.

SARS-CoV-2 transmission modeling showed that the overdispersion parameter \( k \) for COVID-19 was approximately 0.1–0.3 (low), meaning that transmission was highly overdispersed: roughly 10–20% of infected individuals were responsible for 80% of transmission events. This insight directly informed contact-tracing strategy — identifying and quarantining individuals linked to superspreading events was more efficient than symmetric contact tracing of all cases.

The table below compares all four distributions covered in this chapter, summarizing their parameters, the type of data they model, and their primary public health applications. Each distribution has been defined in the preceding text; this table serves as a reference summary.

| Distribution | Parameters | Type of Data | Key Property | Public Health Example |
|---|---|---|---|---|
| **Normal** | μ (mean), σ (SD) | Continuous, symmetric | 68-95-99.7 rule | Systolic blood pressure in adults |
| **Binomial** | n (trials), p (probability) | Count of binary outcomes | Mean = np, Var = np(1−p) | Cases among n contacts with attack rate p |
| **Poisson** | λ (rate) | Event counts in time/space | Mean = Variance = λ | Weekly disease reports; rare adverse events |
| **Negative Binomial** | μ (mean), k (dispersion) | Overdispersed counts | Variance > Mean | COVID-19 superspreading events |

## Sampling Methods and Sample Size

### Sampling Methods

A **sample** is a subset of a population selected for measurement, with the goal of making inferences about the full population. The design of the sampling process determines whether those inferences are valid. **Sampling methods** fall into two major categories: probability sampling (every unit has a known, non-zero probability of selection) and non-probability sampling (selection is not governed by chance).

The major probability sampling designs are:

- **Simple random sampling** — every unit in the population has an equal probability of being selected. The simplest design; requires a complete sampling frame (list of all population members). Assigning random numbers to a registry and selecting the top n is a straightforward implementation.
- **Systematic sampling** — every k-th unit is selected after a random start. Used when a sampling frame is ordered (for example, medical records sorted by date of visit). Efficient but vulnerable to periodicity bias if the ordering has a cycle that aligns with k.
- **Stratified sampling** — the population is divided into non-overlapping subgroups (strata) such as age groups, geographic regions, or racial/ethnic groups, and random samples are drawn independently from each stratum. Stratification guarantees adequate representation of smaller subgroups and can improve precision by reducing within-stratum variance.
- **Cluster sampling** — naturally occurring groups (clusters) such as households, schools, or census tracts are randomly selected, and all or a random subset of members within selected clusters are enumerated. Used when a complete individual-level sampling frame is unavailable or when field logistics favor group enumeration. Cluster samples require special analysis to account for the correlation within clusters (design effect).
- **Multistage sampling** — sequential application of sampling designs at successive levels (for example, randomly selecting counties, then census tracts within counties, then households within tracts). The design behind most large national surveys including the National Health and Nutrition Examination Survey (NHANES) and the Behavioral Risk Factor Surveillance System (BRFSS).

!!! mascot-tip "Survey weights are not optional extras."
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Sage offers a practical tip">
    When you analyze data from stratified or cluster surveys — NHANES, BRFSS, the American Community Survey — you must apply the survey weights provided in the dataset. These weights correct for unequal probabilities of selection and post-stratification adjustments. Ignoring survey weights produces biased prevalence estimates and incorrect standard errors. Every major statistical package (R's survey package, Stata's svy prefix, SAS PROC SURVEYFREQ) has dedicated survey analysis procedures. Using standard regression procedures on survey data without weights is a footgun: the code runs without errors, the output looks normal, and the estimates are silently wrong.

### Sample Size Estimation

A study must be large enough to detect an effect if one truly exists — but not so large that it wastes resources or exposes unnecessary participants to interventions or risks. **Sample size estimation** is the prospective calculation of how many participants are required to achieve adequate statistical power.

The inputs to a sample size calculation are:

1. **Effect size** — the minimum clinically or programmatically meaningful difference the study is designed to detect. Smaller effects require larger samples.
2. **Significance level (α)** — the acceptable Type I error rate (typically 0.05). Lower α requires larger samples.
3. **Power (1 − β)** — the desired probability of detecting the effect if it truly exists (typically 0.80 or 0.90). Higher power requires larger samples.
4. **Variability (σ)** — for continuous outcomes, the standard deviation in the outcome variable; for proportions, the baseline prevalence. Greater variability requires larger samples.

For comparing two means with equal group sizes, the required sample size per group is approximately:

\[
n = \frac{2\sigma^2 (Z_{\alpha/2} + Z_\beta)^2}{\delta^2}
\]

Where \( \delta \) is the minimum detectable difference, \( Z_{\alpha/2} \) is the critical value for the chosen α (1.96 for α = 0.05 two-tailed), and \( Z_\beta \) is the critical value for desired power (0.84 for 80% power).

### Statistical Power

**Statistical power** is the probability that a study will correctly reject the null hypothesis when it is false — the probability of detecting a real effect. Power \( = 1 - \beta \), where \( \beta \) is the probability of a Type II error (missing a real effect). A study with 80% power has a 20% chance of missing a real effect of the specified size.

Power is a function of four quantities: sample size, effect size, variability, and α. Manipulating any one of them changes power. The most common actionable lever is sample size — larger samples provide higher power. Post-hoc power calculations on completed studies are widely discouraged because power is a prospective property; after the study is done, the p-value already tells you whether the effect was detected.

## The Hypothesis Testing Framework

### Null Hypothesis Testing

**Null hypothesis testing** is the formal framework by which public health researchers decide whether observed data are compatible with a hypothesis of no effect. The procedure has five steps:

1. State the **null hypothesis (H₀)**: typically, no difference, no association, or no effect. Example: "The mean systolic blood pressure is equal in the intervention and control groups."
2. State the **alternative hypothesis (H₁)**: the condition that would be concluded if H₀ is rejected. Two-tailed: "The means differ." One-tailed: "The mean is higher in the intervention group."
3. Choose a **significance level (α)**: the threshold probability below which results are considered too unlikely to be chance alone. The conventional choice is α = 0.05, but this is a convention, not a law of nature.
4. **Compute a test statistic** from the data; compare it to the distribution expected under H₀.
5. **Make a decision**: if the p-value ≤ α, reject H₀; if p-value > α, fail to reject H₀.

The procedure does not prove H₀ true when we fail to reject it. Absence of evidence is not evidence of absence. "Failing to reject" means the data are insufficient to conclude there is an effect, not that no effect exists.

### Type I and Type II Errors

Every hypothesis test can produce one of four outcomes. Two are correct decisions; two are errors.

- **Type I error (false positive)**: Rejecting H₀ when H₀ is actually true. The probability of a Type I error is α. In a regulatory context, this means approving an ineffective drug; in a surveillance context, investigating a non-existent cluster. α is set in advance by the analyst.
- **Type II error (false negative)**: Failing to reject H₀ when H₀ is false (the effect is real). The probability of a Type II error is β. This means missing a real drug effect or failing to detect a real outbreak signal. β is determined by sample size, effect size, and variability — it is not directly set by the analyst but is controlled through study design.

The relationship between α and β involves an unavoidable trade-off: for a fixed sample size, decreasing α (becoming more conservative about false positives) increases β (missing more real effects). The only way to reduce both simultaneously is to increase the sample size or the effect size.

The interactive simulation below allows you to adjust α, effect size, and sample size to observe how these choices affect the distributions of the null and alternative hypotheses, the critical value, and the resulting Type I error, Type II error, and statistical power.

#### Diagram: Type I/II Error and Power Visualizer

<iframe src="../../sims/hypothesis-error-power/main.html" width="100%" height="520px" scrolling="no"></iframe>

<details markdown="1">
<summary>Type I/II Error and Power Visualizer — Interactive MicroSim</summary>
Type: microsim
**sim-id:** hypothesis-error-power<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: explain
Learning Objective: Students can explain the trade-off between Type I and Type II errors and describe how changing alpha, effect size, and sample size affect statistical power.

Purpose: Visualize the two overlapping sampling distributions (null and alternative) and the areas corresponding to α (Type I), β (Type II), and 1−β (power), making the conceptual relationships concrete and manipulable.

Layout: Canvas divided into:
- Top 65%: main visualization showing two overlapping normal curves — the null distribution (blue) centered at 0 and the alternative distribution (orange) centered at the effect size δ. The critical value is shown as a vertical dashed line. Four colored shaded areas: blue area to the right of critical value under null curve = α (Type I error); orange area to the left of critical value under alternative curve = β (Type II error); orange area to the right of critical value = power (1−β). Labels for each shaded region with percentages.
- Bottom 35%: three sliders and a numeric summary panel.

Controls:
- Alpha (α) slider: range 0.01 to 0.20, step 0.01, default 0.05. Moving it shifts the critical value.
- Effect size (δ in SD units) slider: range 0.1 to 2.0, step 0.05, default 0.5. Moving it shifts the alternative distribution curve.
- Sample size slider: range 10 to 500, step 10, default 80. Changing n changes the SE of both distributions (narrowing them), which changes overlap.

Numeric summary panel (updates live): shows α, β, Power (1−β), and effect size in SD units.

Visual style: Null distribution in light blue, alternative distribution in light orange, shaded regions semi-transparent, critical value as dashed black vertical line, labels in bold matching their region color.

Interactive behavior:
- All three sliders update the visualization in real time.
- Hover over any shaded area: tooltip shows its name, probability value, and one-sentence plain-language description (e.g., "Type I Error: The probability of detecting an effect that does not exist. Set by choosing alpha before the study.")

Reset button returns all sliders to default.

Canvas: Responsive full container width, 520px height.

Instructional Rationale: The abstract relationship between α, β, and power becomes intuitive when students can drag a slider and watch the regions change size. This is the central insight students need to evaluate study design and interpret published p-values.
</details>

### P-Value Interpretation

The **p-value** is the probability of observing a test statistic as extreme as or more extreme than the one computed from the data, assuming the null hypothesis is true. It is *not*:

- The probability that H₀ is true
- The probability that the result was due to chance
- The probability that the finding will replicate
- A measure of effect size or practical importance

A p-value of 0.03 means: "If H₀ were true, we would observe a test statistic this extreme or more extreme 3% of the time." It does not mean there is a 3% chance the null is true.

The misinterpretation of p-values is one of the most pervasive errors in the published public health literature. A large study with a small but clinically trivial effect can produce p = 0.001; a small study that is underpowered to detect a large, clinically important effect may produce p = 0.20. The p-value should always be interpreted alongside the effect size and its confidence interval, not as a standalone verdict.

!!! mascot-warning "Statistical significance ≠ practical importance."
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Sage holds up a cautionary claw">
    With a large enough sample, even trivially small differences become statistically significant. An intervention that reduces mean systolic blood pressure by 0.5 mmHg may produce p < 0.001 in a trial of 50,000 participants — a highly significant result that is clinically meaningless, since a 0.5 mmHg reduction has no detectable effect on cardiovascular outcomes. The question "Is it significant?" must always be paired with "Is the effect large enough to matter?" Reporting effect sizes with confidence intervals, rather than p-values alone, is the standard recommendation of the American Statistical Association's 2016 and 2019 statements on p-values.

### Confidence Intervals

A **confidence interval (CI)** provides a range of values that, under repeated sampling, would contain the true population parameter in a specified percentage of samples. A 95% CI means that if we drew 100 independent random samples and computed a 95% CI from each one, approximately 95 of those intervals would contain the true population value.

The 95% CI for a mean is:

\[
\bar{x} \pm 1.96 \cdot \frac{s}{\sqrt{n}}
\]

The width of the confidence interval is determined by the standard error (related to sample size) and the critical value (related to confidence level). Wider intervals reflect more uncertainty; narrower intervals reflect more precision. A 99% CI is wider than a 95% CI because higher confidence requires covering more of the sampling distribution.

Critically, a confidence interval that does not cross the null value (0 for a difference, 1 for a ratio) corresponds to a statistically significant result at the matching α level. If a 95% CI for the difference in means between two groups is (2.1, 8.7 mmHg), it does not cross 0 — we would reject H₀ at α = 0.05. If it were (−0.3, 8.7), it crosses 0 — we would fail to reject H₀. The CI conveys not just significance but the plausible range of the effect, which p-values alone do not.

The diagram below demonstrates confidence interval behavior by simulating repeated sampling. Each horizontal bar represents a 95% CI from one sample; the vertical line is the true population mean. Observe how approximately 5% of intervals miss the true value — this is the 95% coverage property in action.

#### Diagram: Confidence Interval Coverage from Repeated Sampling

<iframe src="../../sims/confidence-interval-coverage/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>Confidence Interval Coverage — Interactive Chart.js Simulation</summary>
Type: microsim
**sim-id:** confidence-interval-coverage<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: explain
Learning Objective: Students can explain what "95% confidence" means by observing that approximately 5% of 95% CIs from repeated random samples fail to contain the true population mean.

Purpose: Correct the common misconception that "a 95% CI has a 95% chance of containing the true value." The CI is either correct or it isn't; the 95% is a property of the *procedure* across many samples, not a probability statement about any single interval.

Layout: Chart.js horizontal bar chart. The y-axis lists sample numbers 1 through 50 (one bar row per sample). Each bar represents a CI as a horizontal line segment with endpoint markers; bars that contain the true population mean are teal; bars that miss it are red. A vertical dashed line marks the true population mean. Controls below the chart.

Controls:
- "Draw New Samples" button: redraws 50 CIs from fresh random samples.
- Confidence level dropdown: "90%", "95%", "99%". Changing it recalculates critical value and redraws all CIs; the coverage count updates.
- Sample size slider: n = 10, 20, 30, 50, 100. Changes the width of the CIs (larger n → narrower CIs).
- Coverage counter display: "X of 50 CIs contain the true mean (Y%)".

True population mean: fixed at 100 (displayed as a vertical dashed line). Population σ = 15. Samples drawn from N(100, 15).

Interactive features:
- Hovering a bar: shows tooltip with sample number, sample mean, lower and upper CI bounds, and whether it contains the true mean.
- Animation: CIs are drawn sequentially (one per 30ms) when "Draw New Samples" is clicked, making the sequential-sampling interpretation visible.

Visual style: Clean Chart.js horizontal bar chart style; teal = contains true mean; red = misses true mean; bold vertical dashed line for true mean.

Instructional Rationale: Animated sequential sampling makes the frequentist definition of confidence intervals visceral in a way that no static explanation can match. Students see ~5% of bars turn red in real time.
</details>

## Choosing and Applying Inferential Tests

Having built the statistical and probability foundation, we are now equipped to select and apply the inferential tests that appear throughout the public health literature. The goal of **inferential statistics** is to draw conclusions about a population based on a sample. Different test statistics are appropriate for different data types, numbers of groups, and whether the data meet parametric assumptions.

The key branching decisions are: (1) What is the outcome data type — continuous or categorical? (2) How many groups are being compared? (3) Are the samples independent or paired? (4) Do the data meet the assumptions of parametric tests (approximate normality, homogeneous variance)?

### Tests for Categorical Data

The **chi-square test** (\( \chi^2 \)) is the most widely used test for comparing the distribution of a categorical outcome across two or more independent groups. It compares observed cell counts in a contingency table to the counts expected under the null hypothesis of no association between the row and column variables.

\[
\chi^2 = \sum \frac{(O - E)^2}{E}
\]

Where O is the observed count and E is the expected count for each cell. The test statistic follows a chi-square distribution with degrees of freedom equal to (rows − 1)(columns − 1). The chi-square test requires that expected cell counts be ≥ 5 in at least 80% of cells; when this is not met (often in small studies), **Fisher's exact test** is preferred.

**Fisher's exact test** calculates the exact probability of observing a contingency table as extreme as or more extreme than the observed table, given the marginal totals are fixed. It is exact rather than asymptotic, making it appropriate for 2×2 tables with small sample sizes or rare events. In a study investigating an outbreak among 12 restaurant patrons, with only 4 who ate the suspected food and 2 who became ill, the cell counts are too small for the chi-square approximation and Fisher's exact test is the correct tool.

### Tests for Continuous Outcomes Between Two Groups

The **Student's t-test** compares the means of a continuous outcome between two groups. It assumes the outcome is approximately normally distributed within each group, or that the sample is large enough for the Central Limit Theorem to apply. The test statistic is:

\[
t = \frac{\bar{x}_1 - \bar{x}_2}{SE_{\bar{x}_1 - \bar{x}_2}}
\]

The independent-samples t-test applies when the two groups consist of different individuals (for example, treatment vs. control in an RCT). The paired t-test applies when the same individuals are measured twice (pre-post intervention), using the within-person differences as the unit of analysis.

The **Mann-Whitney U test** (also called the Wilcoxon rank-sum test) is the non-parametric alternative to the independent-samples t-test. Instead of comparing means, it compares the *rank distributions* of two independent groups, testing whether one group tends to have higher ranks than the other. It is appropriate when:

- The continuous outcome is severely skewed (for example, hospital length of stay, emergency response times)
- The sample size is too small to invoke the Central Limit Theorem
- The outcome is measured on an ordinal scale

### Tests for Continuous Outcomes Across Three or More Groups

**Analysis of Variance (ANOVA)** extends the t-test logic to three or more groups by partitioning the total variance in the outcome into variance between groups (explained by group membership) and variance within groups (unexplained residual). The F-statistic is the ratio of between-group to within-group mean squares:

\[
F = \frac{\text{Mean Square Between Groups}}{\text{Mean Square Within Groups}}
\]

A significant F-statistic tells you that at least one group mean differs from the others, but not *which* groups differ. Post-hoc tests (Tukey's HSD, Bonferroni correction, Sidak correction) are used after a significant ANOVA to identify specific pairwise differences while controlling the family-wise error rate.

ANOVA assumes: (1) observations within each group are normally distributed; (2) variances are approximately equal across groups (homoscedasticity); (3) observations are independent. When these assumptions are violated — as often happens with count data, survival outcomes, or small non-normal samples — the non-parametric alternative is appropriate.

The **Kruskal-Wallis test** is the non-parametric equivalent of one-way ANOVA. Like the Mann-Whitney U, it operates on ranks rather than raw values, testing whether the rank distributions of three or more independent groups are equal. It does not assume normality but does assume the group distributions have similar shapes. When a significant Kruskal-Wallis result is found, pairwise Dunn tests with appropriate corrections identify which specific groups differ.

!!! mascot-encourage "There are a lot of tests here — how will I know which to choose?"
    <img src="../../img/mascot/encouraging.png" class="mascot-admonition-img" alt="Sage extends a wing encouragingly">
    It is a fair concern. The good news is that the decision tree is navigable with three questions: What type is my outcome variable (categorical, continuous, ordinal)? How many groups am I comparing (two, or three+)? Are my data approximately normal or do they violate parametric assumptions? The table below summarizes the answer to all combinations. Keep it as a reference — over time you will develop intuition about which test you need before you even look at the table.

The table below summarizes all six inferential tests covered in this section, organized by the decision criteria that drive test selection. All six tests have been fully described above; the table is a cross-reference tool.

| Outcome Type | Groups | Parametric Assumption Met? | Recommended Test |
|---|---|---|---|
| Categorical | 2+ (independent) | n/a | Chi-Square Test |
| Categorical | 2 (small n or sparse cells) | n/a | Fisher's Exact Test |
| Continuous | 2 (independent) | Yes (or large n) | Student's T-Test |
| Continuous | 2 (independent) | No (skewed, small n) | Mann-Whitney U Test |
| Continuous | 3+ (independent) | Yes | Analysis of Variance (ANOVA) |
| Continuous | 3+ (independent) | No | Kruskal-Wallis Test |

## Key Takeaways

Biostatistics is the analytical backbone of public health evidence. This chapter has built the quantitative foundations you will apply in every subsequent chapter:

- **Descriptive statistics** — means, medians, standard deviations, IQR — characterize data before any inference; always pair numerical summaries with visual inspection.
- **Probability fundamentals** provide the logical foundation for all statistical inference; conditional probability and Bayes' theorem explain why prevalence determines what a positive test result actually means.
- **Probability distributions** — normal, binomial, Poisson, and negative binomial — each model a different data-generating process. Matching the right distribution to your data is a foundational modeling choice.
- **Sampling design** determines the validity of population inferences; probability sampling with appropriate weights is required for valid survey estimates.
- **Sample size estimation** and **statistical power** must be determined prospectively; underpowered studies waste resources and produce misleading negative findings.
- **Null hypothesis testing** uses the p-value to assess compatibility of data with the null — a p-value is not the probability the null is true. Type I errors (false positives) are controlled by α; Type II errors (false negatives) are controlled by study design and power.
- **Confidence intervals** convey both significance and the plausible range of the true effect; they are more informative than p-values alone.
- **Test selection** follows from data type (categorical vs. continuous), number of groups, and whether parametric assumptions are met. Chi-square and Fisher's for categorical outcomes; t-test and Mann-Whitney for two groups; ANOVA and Kruskal-Wallis for three or more groups.

??? question "Self-Check: Can you match the concept to the situation? — Click to check your answers"
    **Scenario 1:** You have a continuous outcome (blood pressure), two independent groups, and n = 8 per group with non-normal data. → Mann-Whitney U test.

    **Scenario 2:** You want to test whether smoking status (yes/no) differs between three age groups. → Chi-square test (or Fisher's exact if any expected cell < 5).

    **Scenario 3:** A screening test for TB has sensitivity 85% and specificity 97%. The population prevalence is 0.5%. What is the positive predictive value? → Use Bayes' theorem: PPV ≈ 12%. Most positives in a low-prevalence population are false positives.

    **Scenario 4:** A researcher says "our p-value was 0.04, so there is a 96% chance the drug works." → Incorrect. The p-value is the probability of seeing the data under the null, not the probability the drug works.

    **Scenario 5:** You increase α from 0.05 to 0.10 in a study of fixed size. → Type I error probability increases; Type II error (β) decreases; power increases.

!!! mascot-celebration "Chapter 4 complete — you now speak the language of evidence."
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Sage raises a wing in celebration">
    You have built the quantitative foundation that every other chapter in this textbook relies on. Probability, distributions, sampling, hypothesis testing, confidence intervals, and the suite of inferential tests — these are the tools with which public health investigators turn data into defensible claims. Chapter 5 extends this foundation into the regression and advanced methods that dominate the published research literature. Well done — *Let's look at the data together.*

---

## Further Reading

- Rosner, B. (2016). *Fundamentals of Biostatistics* (8th ed.). Cengage Learning.
- Gerstman, B. B. (2015). *Basic Biostatistics: Statistics for Public Health Practice* (2nd ed.). Jones & Bartlett.
- Greenhalgh, T. (2019). How to read a paper: Statistics for the non-statistician. *BMJ*, 315, 422–425.
- Wasserstein, R. L., & Lazar, N. A. (2016). The ASA's statement on p-values: Context, process, and purpose. *The American Statistician*, 70(2), 129–133.
- Centers for Disease Control and Prevention. (2012). *Principles of Epidemiology in Public Health Practice* (3rd ed.), Module 2: Summarizing Data. CDC Public Health 101 Series.
