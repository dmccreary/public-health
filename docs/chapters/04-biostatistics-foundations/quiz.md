# Quiz: Biostatistics Foundations

Test your understanding of descriptive statistics, probability, hypothesis testing, and inferential methods with these review questions.

---

#### 1. Which measure of central tendency is most resistant to the influence of extreme outliers?

<div class="upper-alpha" markdown>
1. Mean
2. Mode
3. Median
4. Variance
</div>
??? question "Show Answer"
    The correct answer is **C**. The median — the middle value of an ordered dataset — is resistant to extreme values because it is determined by rank order rather than magnitude. For example, household income distributions are typically right-skewed, and the median is preferred over the mean because a small number of very high-income earners would inflate the mean, misrepresenting typical income. The mean is sensitive to outliers; variance measures spread, not center.

    **Concept Tested:** Measures of Central Tendency

---

#### 2. A 95% confidence interval for an odds ratio of 2.3 is (1.1, 4.8). How should this be interpreted?

<div class="upper-alpha" markdown>
1. There is a 95% probability that the true odds ratio lies between 1.1 and 4.8
2. 95% of sample odds ratios in repeated studies would lie between 1.1 and 4.8
3. Under repeated sampling, 95% of confidence intervals constructed this way would contain the true parameter
4. The odds ratio is statistically significant only at the 5% level, not the 1% level
</div>
??? question "Show Answer"
    The correct answer is **C**. The frequentist interpretation of a 95% confidence interval is: if the study were repeated many times under identical conditions, 95% of the intervals constructed would contain the true population parameter. The true odds ratio is fixed (not random), so it is incorrect to say there is a 95% "probability" it lies in this interval (option A). Importantly, because the interval excludes 1.0, the result is statistically significant at α = 0.05.

    **Concept Tested:** Confidence Interval Interpretation

---

#### 3. In hypothesis testing, a Type II error (β error) occurs when:

<div class="upper-alpha" markdown>
1. The null hypothesis is rejected when it is actually true
2. The null hypothesis is retained when it is actually false
3. The p-value is set at a lower threshold than planned
4. A statistically significant result is not clinically meaningful
</div>
??? question "Show Answer"
    The correct answer is **B**. A Type II error (false negative) occurs when the study fails to reject a null hypothesis that is in fact false — failing to detect a true effect. The probability of a Type II error is β; statistical power = 1 − β is the probability of correctly detecting a true effect. Type I error (option A) is a false positive — rejecting a true null hypothesis. Underpowered studies have elevated Type II error rates.

    **Concept Tested:** Type I and Type II Errors

---

#### 4. The central limit theorem states that, as sample size increases:

<div class="upper-alpha" markdown>
1. The population distribution becomes approximately normal
2. The sampling distribution of the sample mean approaches normality regardless of the population distribution
3. The standard deviation of the sample approaches the population standard deviation
4. All test statistics become equivalent to the z-statistic
</div>
??? question "Show Answer"
    The correct answer is **B**. The central limit theorem states that the sampling distribution of the sample mean approaches a normal distribution as sample size increases, regardless of the shape of the underlying population distribution. This is foundational because it allows normal-distribution-based inferential methods (t-tests, z-tests) to be applied even when the population data are not normally distributed, provided the sample is large enough.

    **Concept Tested:** Central Limit Theorem

---

#### 5. A chi-square test of independence is the appropriate test when:

<div class="upper-alpha" markdown>
1. Comparing the means of two independent continuous groups
2. Examining the association between two categorical variables in a contingency table
3. Testing whether a single continuous variable follows a normal distribution
4. Comparing survival curves between two groups over time
</div>
??? question "Show Answer"
    The correct answer is **B**. The chi-square test of independence tests whether two categorical variables are statistically independent in a contingency table by comparing observed cell counts to expected counts under the null of independence. For example, it could test whether disease status (case/control) is independent of exposure status (exposed/unexposed) in a 2×2 table. Option A calls for a t-test; option C for a Kolmogorov-Smirnov or Shapiro-Wilk test; option D for a log-rank test.

    **Concept Tested:** Chi-Square Test

---

#### 6. Statistical power in a study design is increased by:

<div class="upper-alpha" markdown>
1. Reducing the sample size to decrease cost
2. Increasing the significance threshold from α = 0.05 to α = 0.01
3. Increasing sample size, using a larger expected effect size, or reducing outcome variability
4. Replacing a two-tailed test with a more conservative three-tailed test
</div>
??? question "Show Answer"
    The correct answer is **C**. Statistical power (1 − β) is influenced by four factors: sample size (larger = more power), effect size (larger true effect = more power), significance threshold (α) (higher α = more power, but increases Type I error), and outcome variability (lower variance = more power). Reducing sample size (option A) decreases power; increasing stringency from 0.05 to 0.01 (option B) decreases power. There is no "three-tailed test."

    **Concept Tested:** Statistical Power

---

#### 7. When a distribution is right-skewed (positively skewed), which of the following orderings is typically true?

<div class="upper-alpha" markdown>
1. Mean < Median < Mode
2. Mode < Mean < Median
3. Mode < Median < Mean
4. Mean = Median = Mode
</div>
??? question "Show Answer"
    The correct answer is **C**. In a right-skewed distribution, the long tail extends to the right (toward higher values). The mode is the most frequently occurring value (at the peak, on the left); the median is pulled slightly right; and the mean is most influenced by the extreme high values in the tail, pulling it furthest right. Income, hospital costs, and waiting times commonly display right-skewed distributions.

    **Concept Tested:** Skewness and Measures of Center

---

#### 8. A p-value of 0.03 means:

<div class="upper-alpha" markdown>
1. There is a 3% chance the null hypothesis is true
2. There is a 97% probability that the exposure causes the outcome
3. If the null hypothesis were true, there is a 3% probability of observing a result as extreme as or more extreme than the one obtained
4. The study has a 97% probability of replicating in future research
</div>
??? question "Show Answer"
    The correct answer is **C**. The p-value is the probability of obtaining the observed data (or more extreme results) if the null hypothesis were true. It does not measure the probability that the null hypothesis is true (option A), the probability the exposure causes the disease (option B), or replication probability (option D). Misinterpreting the p-value as the "probability the null is true" is one of the most common errors in applied statistics.

    **Concept Tested:** P-value Interpretation

---

#### 9. A probability sample is preferable to a convenience sample because it:

<div class="upper-alpha" markdown>
1. Is always less expensive to conduct
2. Allows statistical inference to the target population with known uncertainty
3. Guarantees a larger sample size for the same budget
4. Eliminates all forms of measurement error
</div>
??? question "Show Answer"
    The correct answer is **B**. Probability sampling — in which every member of the target population has a known, non-zero probability of being selected — allows results to be generalized to the target population and provides a valid framework for calculating sampling error and confidence intervals. Convenience sampling produces a sample of unknown representativeness, preventing valid statistical inference to any broader population.

    **Concept Tested:** Probability Sampling

---

#### 10. The normal distribution is characterized by which two parameters?

<div class="upper-alpha" markdown>
1. Median and interquartile range
2. Mode and range
3. Mean and standard deviation
4. Proportion and sample size
</div>
??? question "Show Answer"
    The correct answer is **C**. The normal (Gaussian) distribution is fully specified by two parameters: the mean (μ), which determines the location of the center, and the standard deviation (σ), which determines the spread. A normal distribution with μ = 0 and σ = 1 is the standard normal distribution. The binomial distribution uses proportion and sample size (option D); median and IQR are descriptive statistics appropriate for skewed distributions.

    **Concept Tested:** Normal Distribution Parameters

---
