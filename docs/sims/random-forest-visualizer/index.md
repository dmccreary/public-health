---
title: Random Forest Decision Tree Visualizer
description: Set a hypothetical patient profile and see how one decision tree classifies it, how 20 different trees vote, and how the forest's majority vote becomes the prediction.
image: /sims/random-forest-visualizer/random-forest-visualizer.png
og:image: /sims/random-forest-visualizer/random-forest-visualizer.png
twitter:image: /sims/random-forest-visualizer/random-forest-visualizer.png
social:
   cards: false
hide:
  - toc
status: implemented
library: p5.js
bloom_level: Understand
quality_score: 100
---

# Random Forest Decision Tree Visualizer

<iframe src="main.html" height="602px" width="100%" scrolling="no"></iframe>

[Run the Random Forest Visualizer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

A random forest is a collection of decision trees that vote. This MicroSim
shows both levels at once.

- **Left panel, one tree.** A decision tree asks two yes or no questions about a patient and ends in a leaf. The leaf gives the share of training patients in that leaf who had the disease. The gold path is the route the current patient takes.
- **Right panel, the forest.** Twenty trees each classify the same patient. A tree is red with an **H** if it votes high risk and green with an **L** if it votes low risk. The bar under the grid tallies the votes, and the majority is the forest's prediction.
- **ROC curve.** The small chart shows how well the forest separates people with and without the disease in a separate set of synthetic test patients, and gives the area under the curve (AUC).

!!! warning "Synthetic data only"
    The forest is trained in your browser, each time the page loads, on 600
    made-up patients. The relationship between the risk factors and the disease
    was invented for teaching. This is not a clinical risk model and must not
    be used to assess anyone's health.

## How to Use

1. Read the left panel. Follow the gold path from the top question to a leaf.
2. Change the patient with the controls: **Age**, **BMI**, **Smoking**, **Hypertension**, and **Physically active**. The path and the votes update at once.
3. Press **Show Another Tree**, or click any tree in the forest, to see a different tree. Notice that the trees ask different questions and can disagree about the same patient.
4. Watch the tally bar. The black line marks 50%. The forest calls the patient high risk when at least 10 of the 20 trees vote high risk.
5. Look at the ROC curve. The black dot is the majority rule. The orange ring is the strictest voting rule that would still flag the current patient.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/public-health/sims/random-forest-visualizer/main.html"
        height="602px"
        width="100%"
        scrolling="no"></iframe>
```

## Learning Objective

Students will be able to explain how a random forest turns the votes of many
different decision trees into one prediction, and why the forest's answer is
more stable than the answer of any single tree, by changing a patient profile
and comparing individual trees with the forest vote.

## How the Forest Is Built

| Step | What the MicroSim does |
|------|------------------------|
| Data | Generates 600 synthetic training patients with age, BMI, smoking status, hypertension, and activity level |
| Bootstrap | Each tree is trained on a different random sample of those patients, drawn with replacement |
| Random features | At each split a tree may choose from only 2 of the 5 features |
| Split rule | The tree picks the question that gives the lowest Gini impurity |
| Depth | Each tree has two levels of questions and four leaves |
| Vote | A tree votes high risk when its leaf probability is 50% or more |
| Forest | The patient is called high risk when at least 10 of 20 trees vote high risk |
| ROC curve | Computed on 1,500 new synthetic patients, using the number of high-risk votes as the score |

The random number generator uses a fixed seed, so every reader sees the same
20 trees. On the synthetic test patients the forest has an AUC of about 0.76.

## Specification

The full specification below is extracted from
[Chapter 17: Data Science Advanced: Spatial Analysis and Machine Learning](../../chapters/17-data-science-advanced/index.md).

```text
Type: microsim
sim-id: random-forest-visualizer
Library: p5.js
Status: Specified

Display a panel with two sections side by side:

Left section — Individual Tree View: Show a single decision tree for disease
risk prediction (3 levels deep, branching binary at each node). Node labels
show the split condition (e.g., "Age ≥ 65?", "Smoker?", "BMI ≥ 30?"). Leaf
nodes show predicted probability (red = high risk, green = low risk) and class
label.

Right section — Forest Vote Display: Show a 5×4 grid of 20 miniature tree
icons. Each tree icon is colored by its prediction for the current patient
profile (red = high risk, green = low risk). A vote tally bar at the bottom
shows "14 trees say HIGH RISK / 6 trees say LOW RISK → Forest prediction: HIGH
RISK (70%)".

Controls at the top (sliders/dropdowns for a hypothetical patient profile):
- Age (30–80)
- Smoking status (never / former / current)
- BMI (18–45)
- Hypertension (yes/no)
- Physical activity (active/sedentary)

As the user adjusts controls, the individual tree traversal animates
(highlight the active branch at each split), the leaf node lights up with a
probability, and the forest vote grid updates all 20 tree icons. The AUC-ROC
curve (pre-computed for the synthetic model) updates to show where this
threshold sits on the curve.

A "Show Another Tree" button cycles through different tree structures to
illustrate how individual trees vary while the forest average is stable.
```

### Implementation Notes

- **No timed animation.** The learning objective is at the Understand level. The active path is highlighted the moment a control changes, so a student can compare two patients without waiting for an animation to finish.
- **Controls are below the drawing.** The specification puts the controls at the top. They are in the standard control area at the bottom, like the other MicroSims in this book.
- **Three levels means root, one more question, and a leaf.** Each tree has a root question, a second question on each branch, and four leaves. This matches the three example conditions in the specification.
- **The forest is trained, not drawn by hand.** The trees are produced by a real bootstrap and random-feature procedure on synthetic data, so the leaf probabilities, the votes, and the ROC curve are consistent with one another.
- **ROC marker.** The specification says the curve "updates to show where this threshold sits." The curve itself is fixed. The orange ring moves with the patient and marks the strictest vote threshold that would still classify this patient as high risk.
- **Ties.** With 20 trees a 10 to 10 tie is possible. A tie is counted as high risk and is labeled as a tie.

## Lesson Plan

### Audience

Undergraduate and graduate students in a first public health course who have met classification and sensitivity and specificity.

### Duration

15 minutes

### Prerequisites

- What a classifier is, and what sensitivity and specificity mean
- The idea of a decision tree as a sequence of yes or no questions

### Activities

1. **Read one tree** (3 min): Students trace the gold path for the default patient and state in one sentence why this tree gave its answer.
2. **Find disagreement** (4 min): Students click through several trees for the same patient and find one that votes the other way. They explain why two trees trained on the same kind of data can disagree.
3. **Find the tipping point** (4 min): Starting from a young, active, non-smoking patient, students raise age one step at a time. They record the age at which the first tree flips and the age at which the forest flips, and compare the two.
4. **Discuss** (4 min): Why is the forest's answer more stable than a single tree's answer? What would change if the health department wanted to miss fewer true cases? Students relate their answer to the black dot and the orange ring on the ROC curve.

### Assessment

- The student explains bootstrap sampling and random feature selection in one sentence each.
- The student explains why averaging many different trees reduces the effect of any one tree's errors.
- Given a vote count such as 12 of 20, the student states the forest's prediction under the majority rule and under a stricter rule of at least 15 votes.

## References

1. Breiman, L. (2001). Random forests. *Machine Learning*, 45(1), 5-32. The paper that introduced the random forest method.
2. [Random forest](https://en.wikipedia.org/wiki/Random_forest) - Wikipedia - Bagging, random feature selection, and voting.
3. [Decision tree learning](https://en.wikipedia.org/wiki/Decision_tree_learning) - Wikipedia - How a tree chooses its splits, including Gini impurity.
4. [Receiver operating characteristic](https://en.wikipedia.org/wiki/Receiver_operating_characteristic) - Wikipedia - ROC curves and the area under the curve.
5. [p5.js Reference](https://p5js.org/reference/) - Documentation for the JavaScript library used to build this MicroSim.

## Related Resources

- [Chapter 17: Data Science Advanced: Spatial Analysis and Machine Learning](../../chapters/17-data-science-advanced/index.md)
- [Screening Test Performance Calculator](../screening-test-calculator/index.md)
