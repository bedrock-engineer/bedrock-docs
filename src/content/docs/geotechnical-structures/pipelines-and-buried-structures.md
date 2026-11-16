---
title: Pipelines and buried structures
description: Buried pipes, culverts and cables, and trenchless crossings. What to check, how, and with which software.
type: structure
analysis_types: [stability, deformation, groundwater-flow, dynamics]
sidebar:
  order: 14
---

**Where this fits:** [Docs Atlas](../index.md) › [Geotechnical structures](index.md) › Pipelines and buried structures

Buried pipes, culverts and cables, and trenchless crossings by HDD, microtunneling and pipe jacking. In the Netherlands, NEN 3650 sets the requirements for pipelines and NEN 3651 adds those for crossings with dikes and major waterways. Offshore subtypes are under [Offshore](#offshore).

## What to verify

| Check | Limit state | Analysis type | Usual methods |
| --- | --- | --- | --- |
| Soil loads and pipe stresses | ULS (STR) | Deformation | formulas, Winkler springs, FEM |
| Differential settlement along the pipe | SLS | Deformation | formulas, Winkler springs |
| Upheaval buckling and flotation | ULS (UPL) | Stability | formulas |
| Blowout of drilling fluid during HDD | ULS (GEO) | Stability | formulas (cavity expansion) |
| Jacking forces and face stability in microtunneling | ULS (GEO) | Stability | formulas |
| Effect on the dike or levee being crossed | ULS (GEO, HYD) | Stability, groundwater flow | limit equilibrium, FEM seepage |
| Seismic loading and fault crossings | ULS | Dynamics | Winkler springs, FEM |

## Offshore

Export and inter-array cables for wind farms and subsea pipelines. The checks become burial depth and trenchability, on-bottom stability under waves and currents, and upheaval buckling of hot pipelines. DNV rules govern them rather than EC7.

## Software

- **FEM:** PLAXIS 2D, PLAXIS 3D
- **Pipe-soil springs:** OpenSees
- **Dike crossings:** D-Stability, D-Geo Flow

Deltares D-Geo Pipeline (HDD design to NEN 3650 and 3651) isn't listed yet.

---

Checked 2026-11-13 from general knowledge; no standard was read for this page.
