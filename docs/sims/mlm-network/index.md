---
title: MLM Recruitment Network Dynamics
description: Interactive network visualization of multi-level marketing distributor recruitment, claim propagation, and upward income flow.
status: implemented
library: vis-network
bloom_level: Analyze
---

# MLM Recruitment Network Dynamics

<iframe src="main.html" width="100%" height="562" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Learning Objective

Analyze how the structural dynamics of multi-level marketing networks — exponential
recruitment, tier-stratified income distribution, and trusted-channel transmission —
produce predictable patterns of widespread unsupported health claims and
near-universal financial loss among lower-tier distributors.

## How to Use

- **Add Recruits** — advances the network one recruitment cycle; each active
  distributor at the current bottom tier sponsors two new distributors.
- **Propagate Claim** — animates an unsupported health claim spreading from the
  top tier outward in three hops, turning affected node borders red.
- **Show Income Flow** — reverses arrows to green to visualize commissions
  flowing upward toward the top tier.
- **Click any node** — opens a side panel with that distributor's tier, recruits
  sponsored, estimated annual gross income (FTC-modeled), required product
  purchases, and resulting net income (positive or negative).
- **Reset** — returns to the seed network (1 top-tier + 3 tier-2 nodes).

The header counter shows total nodes and the percentage of nodes with positive
net income after the $1,200/yr stylized product-purchase requirement is
subtracted — typically around 25% at the seed, and falling steeply as the
network grows.

## Specification

The full specification below is extracted from
[Chapter 20: "Health Fraud and Misinformation"](../../chapters/20-health-fraud-misinformation/index.md).

```text
Type: microsim
sim-id: mlm-network
Library: vis-network
Status: Specified

Interactive network visualization of MLM distributor recruitment dynamics.
Nodes represent distributors, colored by recruitment tier (top: gold, tier 2:
silver, tier 3-4: blue, tier 5+: gray). Edges represent recruitment
relationships (upline to downline). At simulation start: 1 gold node, 3 silver
nodes. Buttons: "Add Recruits" — each click grows the network one recruitment
cycle, with each active distributor recruiting 2 new distributors (stylized).
"Propagate Claim" — animates an unsupported health claim spreading through the
network from a top-tier node, showing how it reaches leaf nodes within 3 hops.
"Show Income Flow" — animates commission flows upward (green arrows), showing
that most income accumulates at upper tiers. Clicking any node shows: tier
level, total recruits sponsored, estimated annual gross income from FTC-model
distribution, and a simulated "health claim made" badge if the claim
propagation was activated. Counter in upper right shows: total nodes,
percentage of nodes with positive income (after product purchase
requirements). Canvas supports pan and zoom.
```

## Related Resources

- [Chapter 20: "Health Fraud and Misinformation"](../../chapters/20-health-fraud-misinformation/index.md)
