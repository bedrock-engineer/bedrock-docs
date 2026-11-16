---
title: Spread foundations
description: Pad and strip footings, mats and rafts. What Eurocode 7 makes you check, how, and with which software.
type: structure
eurocode: EN 1997-3:2025 Clause 5
analysis_types: [stability, deformation, groundwater-flow, dynamics]
sidebar:
  order: 2
---

**Where this fits:** [Docs Atlas](../index.md) › [Geotechnical structures](index.md) › Spread foundations (EN 1997-3 Clause 5)

A [spread foundation](../reference/glossary.md#spread-foundation) carries a building's load onto the ground close to the surface, through a pad, a strip or a raft. Design checks that the ground can carry that load without failing, the ultimate [limit states](../reference/glossary.md#limit-state), and without the building [settling](../reference/glossary.md#settlement) too much, the serviceability limit states.

**You'll use:** [effective stress](../reference/glossary.md#effective-stress), [friction angle](../reference/glossary.md#friction-angle), [undrained shear strength](../reference/glossary.md#undrained-shear-strength) and [bearing capacity](../geotechnical-analyses/bearing-capacity.mdx). Hover a term for its gist; follow a link only if you need more.

## What to verify

| Check | Limit state | Analysis type | Usual methods |
| --- | --- | --- | --- |
| [Bearing resistance](../geotechnical-analyses/bearing-capacity.mdx) | ULS (GEO) | Stability | formulas, limit analysis, FEM |
| Sliding | ULS (GEO) | Stability | formulas |
| Load eccentricity and overturning | ULS (EQU, GEO) | Stability | formulas |
| Overall stability of a footing near a slope | ULS (GEO) | Stability | limit equilibrium, FEM |
| Uplift and buoyancy of rafts and basements | ULS (UPL) | Groundwater flow | formulas |
| Settlement, differential settlement and rotation | SLS | Deformation | formulas, FEM |
| Heave from swelling or frost | SLS | Deformation | formulas |
| Vibrations of machine foundations | SLS | Dynamics | formulas (mass-spring), FEM |

> [!note]- Learn more: why a footing on clay is checked twice
> A saturated clay can't push its pore water out quickly. Right after the building goes up, the load is carried partly by the water, so the clay behaves *undrained* and you check bearing with its [undrained shear strength](../reference/glossary.md#undrained-shear-strength).
>
> Over months the water drains, the grains take the load, and the clay behaves *drained*: you check again with its [friction angle](../reference/glossary.md#friction-angle) and [effective stress](../reference/glossary.md#effective-stress). For a footing on clay the short-term, undrained case usually governs. For sand, which drains almost at once, only the drained case counts.

## Offshore

Gravity-based foundations, mudmats and suction buckets follow ISO 19901-4 and DNV rather than Eurocode 7. Cyclic loading from waves and wind adds a check: degradation of strength and stiffness under many load cycles.

## Software

- **Formulas:** D-Foundations, GEO5 Spread Footing, Settle3, GEO5 Settlement, Oasys Pdisp, geofound, groundhog, cecode
- **Limit analysis:** GeoEQ Cap, Bearing Bounds, Optum G2, Optum G3, LimitState-GEO
- **FEM:** PLAXIS 2D, PLAXIS 3D, RS2, RS3, GEO5 FEM, Oasys Gofer, ZSoil, MIDAS GTS NX, numgeo, Kratos GeoMechanicsApplication
- **Calculation reports:** [SymEval](../tools/symeval/index.md), our own, for hand calculations a checker can follow

## Where we did this before

No [worked example](../worked-examples/index.md) yet. When a job designs a spread foundation, its worked example is listed here.

---

Checked 2026-11-13 against EN 1997-1:2004 Section 6 and the EN 1997-3:2025 clause list from secondary sources, not against the EN 1997-3 text.
