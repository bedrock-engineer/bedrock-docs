---
title: Rock bolts and rock surface support
description: Rock bolts, mesh and shotcrete on rock slopes and in tunnels, and rockfall drapes. What Eurocode 7 makes you check, how, and with which software.
type: structure
eurocode: EN 1997-3:2025 Clause 11
analysis_types: [stability, deformation, dynamics]
sidebar:
  order: 8
---

**Where this fits:** [Docs Atlas](../index.md) › [Geotechnical structures](index.md) › Rock bolts and rock surface support (EN 1997-3 Clause 11)

Rock bolts, mesh and shotcrete on rock slopes and in underground openings, and rockfall drapes and nets. Rock anchors with a free length are [anchors](anchors.md). Empirical support design from RMR or the Q-system often comes first, followed by block and continuum checks.

![Four kinds of rock support in one cross-section, with what to check on each](../../../assets/structures/rock-bolts-and-rock-surface-support.svg)

## What to verify

| Check | Limit state | Analysis type | Usual methods |
| --- | --- | --- | --- |
| Block and wedge stability with bolting | ULS (GEO) | Stability | kinematic analysis, limit equilibrium of blocks |
| Bolt pull-out, rupture and shear | ULS (GEO, STR) | Stability | formulas |
| Shotcrete and mesh capacity | ULS (STR) | none (structural) | formulas, FEM |
| Ground-support interaction in tunnels | ULS, SLS | Deformation | formulas (convergence-confinement), FEM, FDM, DEM |
| Rockfall reach past drapes and nets | consequence | Dynamics | trajectory simulation |

## Software

- **Blocks and wedges:** UnWedge, RocTunnel3, SWedge, RocPlane, RocSlope2, RocSlope3
- **Kinematic analysis:** Dips
- **Convergence-confinement:** RocSupport
- **Continuum and discontinuum:** RS2, RS3, FLAC, FLAC3D, UDEC, 3DEC
- **Rockfall:** RocFall2, RocFall3, Rockyfor3D

---

Checked 2026-11-13 against the EN 1997-3:2025 clause list from secondary sources, not against the EN 1997-3 text.
