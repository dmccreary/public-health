# Learning Graph for Introduction to Public Health

[Open Learning Graph Viewer Fullscreen](../sims/graph-viewer/main.html){ .md-button .md-button--primary }

<iframe src="../sims/graph-viewer/main.html" width="100%" height="600px" frameborder="0"></iframe>

This section contains the learning graph for this textbook. A learning graph
is a network of concepts where each node represents a single concept and
directed edges indicate what prerequisite knowledge is needed before a concept
can be understood.

A learning graph is the foundational data structure for intelligent textbooks
that can recommend personalized learning paths. Think of it as a roadmap
that helps students navigate from foundational concepts to advanced mastery.

At the left of the learning graph sit foundational concepts — they have no
prerequisites. Moving right, concepts become increasingly advanced; mastering
them requires understanding all the concepts they point to.

This graph contains **500 concepts** across **16 topic areas**, including
epidemiology, biostatistics, systems thinking, causal loop diagrams, SEIR
simulation modeling, data science (R and Python), COVID-19 case studies,
and health fraud.

## Course Description

The [Course Description](../course-description.md) is the source document
used to enumerate concepts. It uses the 2001 Bloom Taxonomy to order
learning objectives across six cognitive levels.

## List of Concepts

[Concept List](./concept-list.md) — 500 concepts in Title Case, organized by
the 16 topic areas. Review this list before modifying the graph.

## Concept Dependency Graph

The DAG is provided in two formats:

- [CSV file](learning-graph.csv) — `ConceptID, ConceptLabel, Dependencies, TaxonomyID`
- [JSON file](learning-graph.json) — vis-network format with `metadata`, `groups`, `nodes`, and `edges`

## Analysis and Documentation

### Course Description Quality Assessment

[Course Description Assessment](course-description-assessment.md) — scored
100/100. Validates topic breadth, Bloom's Taxonomy depth, and concept
generation readiness across all 16 topic areas.

### Learning Graph Quality Validation

[Quality Metrics](quality-metrics.md) — graph structure validation report:

- Valid DAG: no cycles detected
- 6 foundational concepts (entry points)
- 500 nodes, 739 edges
- Maximum dependency chain length: 12
- 0 orphaned nodes

### Concept Taxonomy

[Concept Taxonomy](concept-taxonomy.md) — 16 categories with TaxonomyID
abbreviations. Systems Thinking (SYS, 65 concepts) and Epidemiology
(EPID, 49 concepts) are the largest categories. No category exceeds 13%.

### Taxonomy Distribution

[Taxonomy Distribution Report](taxonomy-distribution.md) — concept counts
and percentages per category. All 16 categories are within the healthy 3–15%
range.

### Concept Authorities

[Concept List Authorities](concept-list-authorities.md) — catalog of the
10+ organizations (CEPH, CDC, WHO, NIH, APHA, PHF, AHRQ, EPA, UN, SOPHE)
whose frameworks inform the concept set.
