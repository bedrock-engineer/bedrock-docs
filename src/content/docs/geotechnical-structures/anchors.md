---
title: Anchors
description: Grouted ground anchors, rock anchors, screw and deadman anchors. What Eurocode 7 makes you check, how, and with which software.
type: structure
eurocode: EN 1997-3:2025 Clause 8
analysis_types: [stability, deformation]
sidebar:
  order: 5
---

**Where this fits:** [Docs Atlas](../index.md) › [Geotechnical structures](index.md) › Anchors (EN 1997-3 Clause 8)

Grouted ground anchors (temporary and permanent), rock anchors with a free length, screw anchors and deadman anchors. They tie back [retaining structures](retaining-structures.md) and slopes, and hold structures down against uplift. Tension piles are [piled foundations](piled-foundations.md); soil nails are [soil nailed structures](soil-nailed-structures.md).

EC7 leans on testing for anchors more than for any other structure: investigation, suitability and acceptance tests to EN ISO 22477-5.

## What to verify

| Check | Limit state | Analysis type | Usual methods |
| --- | --- | --- | --- |
| Pull-out at the grout-ground interface | ULS (GEO) | Stability | formulas, anchor tests |
| Tendon, bond or anchor head failure | ULS (STR) | none (structural) | formulas |
| Loss of anchor force from creep and relaxation | SLS | Deformation | anchor tests |
| Deep slip of the anchored block (Kranz) | ULS (GEO) | Stability | limit equilibrium, FEM |
| Interaction within an anchor group | ULS (GEO) | Stability | FEM |

## Software

- **Anchored walls:** D-Sheet Piling, GEO5 Sheeting Check, WALLAP
- **FEM:** PLAXIS 2D, PLAXIS 3D, RS2, Optum G2

Execution standard: EN 1537 (ground anchors).

---

Checked 2026-11-13 against EN 1997-1:2004 Section 8 and the EN 1997-3:2025 clause list from secondary sources, not against the EN 1997-3 text.
