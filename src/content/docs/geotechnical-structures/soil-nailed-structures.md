---
title: Soil nailed structures
description: Nailed walls and slopes with a shotcrete or mesh facing. What Eurocode 7 makes you check, how, and with which software.
type: structure
eurocode: EN 1997-3:2025 Clause 10
analysis_types: [stability, deformation, groundwater-flow]
sidebar:
  order: 7
---

**Where this fits:** [Docs Atlas](../index.md) › [Geotechnical structures](index.md) › Soil nailed structures (EN 1997-3 Clause 10)

Nailed walls and slopes, including temporary nailed excavation faces, with a shotcrete or mesh facing. FHWA GEC 7 was the usual design reference before the second generation of EC7. Anchors with a free length are [anchors](anchors.md).

![Three soil nailed structures in one ground cross-section, with what to check on each](../../../assets/structures/soil-nailed-structures.svg)

## What to verify

| Check | Limit state | Analysis type | Usual methods |
| --- | --- | --- | --- |
| External stability: sliding, bearing, overall | ULS (GEO) | Stability | limit equilibrium |
| Nail pull-out and tensile failure | ULS (GEO, STR) | Stability | limit equilibrium, formulas |
| Facing failure (punching, bending) | ULS (STR) | none (structural) | formulas |
| Face deformation | SLS | Deformation | FEM, empirical |
| Water pressure behind the facing | ULS, SLS | Groundwater flow | formulas |

## Software

- **Limit equilibrium with nails:** Slide2, Slide3, GeoStudio SLOPE-W, GEO5 Slope Stability
- **FEM:** PLAXIS 2D, PLAXIS 3D, RS2

Execution standard: EN 14490 (soil nailing).

---

Checked 2026-11-13 against the EN 1997-3:2025 clause list from secondary sources, not against the EN 1997-3 text.
