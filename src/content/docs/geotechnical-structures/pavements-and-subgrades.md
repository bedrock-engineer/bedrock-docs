---
title: Pavements and subgrades
description: Road and railway subgrades, pavements, working platforms and crane pads. What to check, how, and with which software.
type: structure
analysis_types: [stability, deformation, groundwater-flow, dynamics]
sidebar:
  order: 13
---

**Where this fits:** [Docs Atlas](../index.md) › [Geotechnical structures](index.md) › Pavements and subgrades

Road and railway subgrades, pavement structures, and working platforms and crane pads. National pavement design guides govern pavements; in the UK, BRE BR 470 covers working platforms for tracked plant.

![Four pavements and platforms on one subgrade, with what to check on each](../../../assets/structures/pavements-and-subgrades.svg)

## What to verify

| Check | Limit state | Analysis type | Usual methods |
| --- | --- | --- | --- |
| Bearing capacity of the subgrade or the platform | ULS (GEO) | Stability | formulas (CBR, two-layer bearing), FEM |
| Rutting and permanent deformation under traffic | SLS | Deformation | formulas, FEM |
| Layer stiffness for pavement design | SLS | Deformation | formulas (layered elastic) |
| Frost heave and swelling | SLS | Deformation | formulas |
| Cyclic loading and vibrations from rail traffic | SLS | Dynamics | FEM |
| Drainage of the pavement and subgrade | SLS | Groundwater flow | formulas |

## Software

- **FEM:** PLAXIS 2D, PLAXIS 3D
- **Railway vibrations:** STEM
- **Grading and earthworks:** Civil 3D, OpenSite Designer

No layered elastic pavement programs are listed yet.

---

Checked 2026-11-13 from general knowledge; no standard was read for this page.
