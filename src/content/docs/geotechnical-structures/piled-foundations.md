---
title: Piled foundations
description: Driven, bored and screw piles, pile groups and piled rafts. What Eurocode 7 makes you check, how, and with which software.
type: structure
eurocode: EN 1997-3:2025 Clause 6
analysis_types: [stability, deformation, dynamics]
sidebar:
  order: 3
---

**Where this fits:** [Docs Atlas](../index.md) › [Geotechnical structures](index.md) › Piled foundations (EN 1997-3 Clause 6)

Driven, bored, CFA, screw and micropiles, pile groups and piled rafts, barrettes and caissons, tension piles and energy piles, and existing (wooden) pile foundations with their underpinning. Offshore subtypes are under [Offshore](#offshore).

![Five piled foundations in one ground cross-section, with what to check on each](../../../assets/structures/piled-foundations.svg)

## What to verify

| Check | Limit state | Analysis type | Usual methods |
| --- | --- | --- | --- |
| Axial compression and tension resistance | ULS (GEO) | Stability | formulas (CPT methods), load tests |
| Negative skin friction (downdrag) | ULS, SLS | Deformation | formulas |
| Lateral resistance | ULS (GEO) | Stability | Winkler springs (p-y), FEM |
| Structural failure of the pile in compression, tension, bending or buckling | ULS (STR) | Deformation | Winkler springs, formulas |
| Settlement of single piles and groups | SLS | Deformation | formulas, Winkler springs (t-z), FEM |
| Excessive lateral movement | SLS | Deformation | Winkler springs, FEM |
| Overall stability | ULS (GEO) | Stability | limit equilibrium, FEM |
| Cyclic and seismic loading | ULS, SLS | Dynamics | Winkler springs, FEM |
| Installation: drivability and vibrations | not a limit state | Dynamics | 1D wave propagation, FEM, MPM |

## Offshore

Monopiles for wind turbines and jacket piles. They follow ISO 19901-4, API RP 2GEO and DNV rather than EC7. Large-diameter monopiles under cyclic lateral load drove the PISA method: Winkler springs calibrated on 3D FEM, which PLAXIS MoDeTo and OpenPile implement.

## Software

- **Formulas:** D-Foundations, APILE, Oasys Pile, GEO5 Pile, GEO5 Pile CPT, groundhog, cecode
- **Winkler springs:** LPILE, GROUP, Oasys Alp, RSPile, GEO5 Pile Group, OpenPile, PLAXIS MoDeTo, OpenSees
- **FEM and FDM:** PLAXIS 3D, RS3, MIDAS GTS NX, ZSoil, DIANA, FLAC3D, numgeo, Optum G3
- **MPM (installation):** Anura3D

Execution standards: EN 1536 (bored piles), EN 12699 (displacement piles), EN 14199 (micropiles).

---

Checked 2026-11-13 against EN 1997-1:2004 Section 7 and the EN 1997-3:2025 clause list from secondary sources, not against the EN 1997-3 text.
