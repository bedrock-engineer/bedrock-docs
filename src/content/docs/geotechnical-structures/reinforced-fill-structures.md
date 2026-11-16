---
title: Reinforced fill structures
description: Reinforced soil walls, steep reinforced slopes, basal reinforcement and piled embankments. What Eurocode 7 makes you check, how, and with which software.
type: structure
eurocode: EN 1997-3:2025 Clause 9
analysis_types: [stability, deformation]
sidebar:
  order: 6
---

**Where this fits:** [Docs Atlas](../index.md) › [Geotechnical structures](index.md) › Reinforced fill structures (EN 1997-3 Clause 9)

Reinforced soil walls and abutments (MSE), steep reinforced slopes, basal reinforcement of embankments on soft soil, and geosynthetic-reinforced piled embankments. Before the second generation of EC7, designers used BS 8006-1 and EBGEO; in the Netherlands, CUR 226 covers piled embankments.

## What to verify

| Check | Limit state | Analysis type | Usual methods |
| --- | --- | --- | --- |
| External stability: sliding, bearing, overturning | ULS (GEO) | Stability | formulas, limit equilibrium |
| Internal stability: reinforcement rupture and pull-out | ULS (GEO, STR) | Stability | limit equilibrium (tie-back wedge, coherent gravity) |
| Compound and overall stability | ULS (GEO) | Stability | limit equilibrium, FEM |
| Facing and connection failure | ULS (STR) | none (structural) | formulas |
| Deformation and creep of geosynthetics | SLS | Deformation | formulas, FEM |
| Arching and load transfer in piled embankments | ULS, SLS | Deformation | formulas (CUR 226), FEM |

## Software

- **Walls:** RSWall
- **Limit equilibrium with reinforcement:** Slide2, GeoStudio SLOPE-W, D-Stability, GEO5 Slope Stability, XSLOPE
- **FEM:** PLAXIS 2D, PLAXIS 3D, RS2

Execution standard: EN 14475 (reinforced fill).

---

Checked 2026-11-13 against the EN 1997-3:2025 clause list from secondary sources, not against the EN 1997-3 text.
