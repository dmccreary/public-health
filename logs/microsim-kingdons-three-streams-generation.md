# MicroSim Generation Log — kingdons-three-streams

**Status:** PASS
**Date:** 2026-05-28
**Library:** p5.js
**Canvas height:** 660

## Summary

Built an animated visualization of John Kingdon's three streams policy model. Three horizontal rivers flow left to right:
- Problem stream (red circles): example items like opioid deaths, maternal mortality, youth vaping
- Policy stream (blue squares): proposed solutions like PDMP, Medicaid expansion, naloxone law
- Politics stream (green triangles): new administration, public pressure, budget cycle

A vertical "Policy Window" gateway sits at 70% of canvas width. Clicking "Align streams" animates the three streams toward a common y-value at the window; when alignment exceeds 85%, the gateway flashes gold and a banner shows "Policy Change! (e.g., SUPPORT Act for opioid response, 2018)." Reset restores independent stream positions.

Clicking any stream highlights it and shows its description + a real-world example in the detail panel.

Controls: Speed slider, Align/Release toggle, Reset.

## Files

- `docs/sims/kingdons-three-streams/main.html`
- `docs/sims/kingdons-three-streams/kingdons-three-streams.js`
- `docs/sims/kingdons-three-streams/kingdons-three-streams.png`

## Layout review

Cycle 1 — PASS. Three streams with labeled particles, vertical policy window with rotated label, detail panel, and controls all visible.
