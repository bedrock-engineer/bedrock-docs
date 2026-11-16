---
title: Ground improvement
description: Compaction, preloading with drains, grouting, deep mixing, stone columns and rigid inclusions. What Eurocode 7 makes you check, how, and with which software.
type: structure
eurocode: EN 1997-3:2025 Clause 12
analysis_types: [stability, deformation, dynamics]
sidebar:
  order: 9
---

**Where this fits:** [Docs Atlas](../index.md) › [Geotechnical structures](index.md) › Ground improvement (EN 1997-3 Clause 12)

Compaction (surface, dynamic, rapid impact, vibrocompaction), preloading with vertical drains and vacuum consolidation, grouting (permeation, compaction, jet grouting), deep soil mixing, stone columns, rigid inclusions, lightweight fill (EPS, foam concrete), soil replacement, lime or cement stabilization, and ground freezing. The improved ground is verified as part of the structure it carries; this page covers the improvement itself.

![Six ground improvement methods in one ground cross-section, with what to check on each](../../../assets/structures/ground-improvement.svg)

## What to verify

| Check | Limit state | Analysis type | Usual methods |
| --- | --- | --- | --- |
| Bearing and stability of the structure on improved ground | ULS (GEO) | Stability | formulas, limit equilibrium, FEM |
| Settlement, and consolidation rate with drains | SLS | Deformation | formulas (Barron, Hansbo), FEM |
| Structural capacity of columns and inclusions | ULS (STR) | none (structural) | formulas |
| Load transfer platform over rigid inclusions | ULS, SLS | Deformation | formulas, FEM |
| Liquefaction mitigation | ULS (GEO) | Dynamics | formulas (CPT-based), FEM |
| Heave from grouting or freezing | SLS | Deformation | formulas, THM FEM |
| Improvement reached | not a limit state | none | CPTs before and after, lab tests |

## Software

- **Vertical drains and preloading:** D-Settlement, Settle3, geotecha
- **FEM:** PLAXIS 2D, PLAXIS 3D, ZSoil
- **Liquefaction before and after:** CLiq, liquepy
- **Ground freezing (THM):** CODE_BRIGHT, OpenGeoSys

Execution standards: EN 12715 (grouting), EN 12716 (jet grouting), EN 14679 (deep mixing), EN 14731 (deep vibration), EN 15237 (vertical drainage).

---

Checked 2026-11-13 against the EN 1997-3:2025 clause list from secondary sources, not against the EN 1997-3 text.
