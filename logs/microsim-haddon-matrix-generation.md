# MicroSim Generation Log — haddon-matrix

**Status:** PASS
**Date:** 2026-05-28
**Library:** p5.js
**Canvas height:** 720

## Summary

Built a 3 row x 4 column Haddon Matrix Builder. Rows = Pre-event, Event, Post-event. Columns = Host, Agent/Vehicle, Physical Environment, Social Environment. Cells are color-coded by evidence strength (green/yellow/gray). Clicking a cell reveals two example interventions for the phase x factor combination. A summary panel shows illustrative investment by phase as a bar chart.

Five scenarios available via dropdown:
- Motor Vehicle Crash
- Drowning
- Fall in Elderly
- Firearm Injury
- Opioid Overdose

## Files

- `docs/sims/haddon-matrix/main.html`
- `docs/sims/haddon-matrix/haddon-matrix.js`
- `docs/sims/haddon-matrix/haddon-matrix.png`

## Layout review

Cycle 1 — PASS. Title, matrix, detail panel, investment bars, dropdown, and legend all visible. No clipping or overlapping.
