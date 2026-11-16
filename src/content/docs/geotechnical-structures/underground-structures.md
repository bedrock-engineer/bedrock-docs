---
title: Underground structures
description: Tunnels, shafts, caverns and repositories. What to check, how, and with which software, with EN 1997-1 and tunneling guidelines.
type: structure
analysis_types: [stability, deformation, groundwater-flow, dynamics]
sidebar:
  order: 11
---

**Where this fits:** [Docs Atlas](../index.md) › [Geotechnical structures](index.md) › Underground structures

Tunnels (cut-and-cover; mined by drill-and-blast or the sequential excavation method; bored with TBMs in rock and soft ground; jacked box; immersed), shafts, caverns, and underground storage and repositories. EC7 Part 3 has no clause for them. Designers apply EN 1997-1 for the general rules and follow ITA-AITES and national guidelines such as ÖGG and DAUB for the rest.

![Four underground structures in one ground cross-section, with what to check on each](../../../assets/structures/underground-structures.svg)

## What to verify

| Check | Limit state | Analysis type | Usual methods |
| --- | --- | --- | --- |
| Face stability | ULS (GEO) | Stability | formulas (wedge models), limit analysis, FEM |
| Block and wedge falls in rock | ULS (GEO) | Stability | kinematic analysis, limit equilibrium of blocks, DEM |
| Lining forces | ULS (STR) | Deformation | formulas, Winkler springs (bedded beam), FEM |
| Ground-support interaction and squeezing | ULS, SLS | Deformation | formulas (convergence-confinement), FEM, FDM |
| Surface settlement and building damage | SLS | Deformation | formulas (Gaussian trough), FEM |
| Groundwater inflow and uplift of the tunnel | ULS (UPL), SLS | Groundwater flow | formulas, FEM |
| Seismic loading and vibrations | ULS, SLS | Dynamics | FEM |
| Heat and pressure around repositories | ULS, SLS | Heat and transport | THM FEM |

## Software

- **FEM and FDM:** RS2, RS3, PLAXIS 2D, PLAXIS 3D, FLAC, FLAC3D, MIDAS GTS NX, ZSoil, DIANA, Kratos GeoMechanicsApplication, Code_Aster
- **DEM:** UDEC, 3DEC
- **BEM:** EX3
- **Blocks and wedges:** UnWedge, RocTunnel3
- **Convergence-confinement:** RocSupport
- **Limit analysis of the face:** Optum G2, Optum G3
- **Settlement trough and building damage:** Oasys Xdisp
- **THM for repositories:** CODE_BRIGHT, OpenGeoSys

---

Checked 2026-11-13 from general knowledge; no standard was read for this page.
