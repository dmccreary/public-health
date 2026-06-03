# MicroSim Generation Log — essential-public-health-services

**Status:** PASS
**Date:** 2026-05-28
**Library:** p5.js
**Canvas height:** 620

## Summary

Built an interactive CDC 10 Essential Public Health Services wheel matching the 2020 revision. Layout:
- Center: "Equity (2020 revision)" — clickable / hover for cross-cutting theme description
- Inner ring: three core function arcs colored by function (Assessment light blue, Policy Development teal, Assurance green) sized proportional to the number of services they contain (2, 3, 5)
- Outer ring: 10 numbered segments, each colored by its core function, with short 2-4 word labels (Monitor, Diagnose, Inform, Mobilize, Policies, Enforce, Link, Workforce, Evaluate, Research)

Right-side info panel updates on click. Clicking any numbered spoke shows full service name, core function, description, and a real-world example. Clicking an inner-ring arc shows the role of that core function. Hovering the center shows the 2020 equity mandate.

Bloom Level: Remember (L1). Learning objective: identify all 10 services, assign each to its correct core function, and explain the 2020 equity mandate.

## Files

- `docs/sims/essential-public-health-services/main.html`
- `docs/sims/essential-public-health-services/essential-public-health-services.js`
- `docs/sims/essential-public-health-services/essential-public-health-services.png`

## Layout review

Cycle 1 — Inner-ring "Assurance" label overlapped the equity center circle.
Cycle 2 — Pushed inner-ring labels outward (lr factor 0.7 -> 0.82). All three function labels now sit cleanly inside their arcs. PASS.
