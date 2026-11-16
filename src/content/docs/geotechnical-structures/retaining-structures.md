---
title: Retaining structures
description: Embedded, gravity and cantilever walls, quay walls and braced excavations. What Eurocode 7 makes you check, how, and with which software.
type: structure
eurocode: EN 1997-3:2025 Clause 7
analysis_types: [stability, deformation, groundwater-flow]
sidebar:
  order: 4
---

**Where this fits:** [Docs Atlas](../index.md) › [Geotechnical structures](index.md) › Retaining structures (EN 1997-3 Clause 7)

Embedded walls (sheet pile, combi, diaphragm, secant and contiguous pile, soldier pile), gravity walls (mass concrete, gabion, crib), cantilever walls, abutments, quay walls, cofferdams, and braced or anchored excavations. In the Netherlands, CUR 166 sets the design steps for sheet pile walls. [Anchors](anchors.md) and [groundwater control](groundwater-control.md) have their own pages.

## What to verify

| Check | Limit state | Analysis type | Usual methods |
| --- | --- | --- | --- |
| Rotation or translation of the wall, insufficient embedment | ULS (GEO) | Stability | limit equilibrium (earth pressures), Winkler springs, FEM |
| Bearing, sliding and toppling of gravity walls | ULS (GEO) | Stability | formulas, limit equilibrium |
| Vertical equilibrium of the wall | ULS (GEO) | Stability | formulas |
| Overall stability | ULS (GEO) | Stability | limit equilibrium, FEM |
| Structural failure of wall, strut or anchor | ULS (STR) | Deformation | Winkler springs, FEM |
| Hydraulic heave, piping and uplift of the excavation base | ULS (HYD, UPL) | Groundwater flow | formulas, FEM seepage |
| Wall deflection and ground movement, damage to adjacent buildings | SLS | Deformation | Winkler springs, FEM, empirical (CIRIA C760) |
| Leakage through or below the wall | SLS | Groundwater flow | FEM seepage |

## Software

- **Limit equilibrium and formulas:** GEO5 Sheeting Design, GEO5 Cantilever Wall, GEO5 Gravity Wall, Oasys Greta, RSWall, WALLAP
- **Winkler springs:** D-Sheet Piling, GEO5 Sheeting Check, WALLAP, Oasys Frew
- **Limit analysis:** LimitState-GEO, Optum G2, Optum G3
- **FEM and FDM:** PLAXIS 2D, PLAXIS 3D, RS2, RS3, GEO5 FEM, Oasys Gofer, ZSoil, MIDAS GTS NX, FLAC, Kratos GeoMechanicsApplication
- **Ground movement and building damage:** Oasys Xdisp

Execution standards: EN 12063 (sheet pile walls), EN 1538 (diaphragm walls), EN 1536 (bored pile walls).

---

Checked 2026-11-13 against EN 1997-1:2004 Section 9 and the EN 1997-3:2025 clause list from secondary sources, not against the EN 1997-3 text.
