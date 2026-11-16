---
title: Groundwater control
description: Dewatering, cutoff walls, recharge, relief wells and impermeable floors. What Eurocode 7 makes you check, how, and with which software.
type: structure
eurocode: EN 1997-3:2025 Clause 13
analysis_types: [deformation, groundwater-flow]
sidebar:
  order: 10
---

**Where this fits:** [Docs Atlas](../index.md) › [Geotechnical structures](index.md) › Groundwater control (EN 1997-3 Clause 13)

Dewatering with wellpoints and deep wells, cutoff walls (slurry walls, sheet piles, grout curtains), infiltration and recharge, relief wells and drainage, and impermeable barriers such as underwater concrete floors with tension piles. In Dutch cities, lowering the groundwater can rot the heads of wooden pile foundations, so the effect on the surroundings is often the governing check.

![Five ways to control groundwater in one ground cross-section, with what to check on each](../../../assets/structures/groundwater-control.svg)

## What to verify

| Check | Limit state | Analysis type | Usual methods |
| --- | --- | --- | --- |
| Hydraulic heave and piping of the excavation base | ULS (HYD) | Groundwater flow | formulas, FEM seepage |
| Uplift of floors, slabs and structures | ULS (UPL) | Groundwater flow | formulas |
| Inflow and pumping capacity | not a limit state | Groundwater flow | formulas, FEM, FDM |
| Settlement of the surroundings from drawdown | SLS | Deformation | formulas, FEM |
| Effects on wells, vegetation and wooden pile foundations nearby | SLS | Groundwater flow | FDM regional models |
| Leakage through cutoffs | SLS | Groundwater flow | FEM seepage |

## Software

- **Regional groundwater (FDM):** MODFLOW 6, FloPy, iMOD Python
- **Seepage (FEM):** GeoStudio SEEP-W, GEO5 FEM Water Flow, D-Geo Flow, FEFLOW, Slide2, OpenGeoSys
- **Coupled flow and deformation:** PLAXIS 2D, PLAXIS 3D, RS2, RS3, Kratos GeoMechanicsApplication

---

Checked 2026-11-13 against the EN 1997-3:2025 clause list from secondary sources, not against the EN 1997-3 text.
