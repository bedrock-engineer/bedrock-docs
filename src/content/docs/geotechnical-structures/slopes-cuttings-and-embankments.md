---
title: Slopes, cuttings and embankments
description: Natural slopes, rock slopes, cuttings, embankments and dikes. What Eurocode 7 makes you check, how, and with which software.
type: structure
eurocode: EN 1997-3:2025 Clause 4
analysis_types: [stability, deformation, groundwater-flow, dynamics]
sidebar:
  order: 1
---

**Where this fits:** [Docs Atlas](../index.md) › [Geotechnical structures](index.md) › Slopes, cuttings and embankments (EN 1997-3 Clause 4)

Natural slopes and landslides, rock slopes, cuttings, embankments, dikes and levees, engineered fills and land reclamation, stockpiles and landfills, and the revetments and scour protection on them. Mining subtypes are under [Mining](#mining). EC7 lists slopes separately from cuttings, so a slope nobody built still counts. The first generation of EC7 split this over Section 11 (overall stability) and Section 12 (embankments).

## What to verify

| Check | Limit state | Analysis type | Usual methods |
| --- | --- | --- | --- |
| Overall stability of the slope or embankment and its base | ULS (GEO) | Stability | limit equilibrium, FEM strength reduction, limit analysis |
| Planar, wedge and toppling failure along rock discontinuities | ULS (GEO) | Stability | kinematic analysis, limit equilibrium of blocks, DEM |
| Uplift, heave and piping at the toe or under a dike | ULS (UPL, HYD) | Groundwater flow | formulas (Sellmeijer), FEM seepage |
| Internal and surface erosion | ULS (HYD) | Groundwater flow | formulas, FEM seepage |
| Settlement and creep of the embankment and its base | SLS | Deformation | formulas (1D consolidation), FEM |
| Movements that damage adjacent structures | SLS | Deformation | FEM |
| Earthquake-induced failure, liquefaction of the fill or base | ULS (GEO) | Dynamics | pseudo-static limit equilibrium, FEM, FDM |
| Runout after failure | consequence | Stability | MPM |
| Rockfall reach and impact energy | consequence | Dynamics | trajectory simulation |

## Mining

Open pit slopes and waste dumps (spoil heaps). Pit slopes are rock slopes at a much larger scale, designed at bench, inter-ramp and overall scale; the Rocscience rock tools and Itasca's DEM codes come from this market. Tailings dams are under [Dams](dams.md#mining).

## Software

- **Limit equilibrium:** D-Stability, Slide2, Slide3, GeoStudio SLOPE-W, PLAXIS LE, Oasys Slope, GEO5 Slope Stability, XSLOPE, cSlope, OGR Slip2D, pySlope, pybimstab, Scoops3D
- **Limit analysis:** Optum G2, Optum G3, LimitState-GEO, dolfinx_optim (3D slope demo)
- **FEM and FDM:** PLAXIS 2D, PLAXIS 3D, RS2, RS3, Oasys Gofer, GEO5 FEM, MIDAS GTS NX, ZSoil, DIANA, FLAC, FLAC3D, Kratos GeoMechanicsApplication
- **Settlement:** D-Settlement, Settle3, GEO5 Settlement
- **Seepage and piping:** D-Geo Flow, GeoStudio SEEP-W, GEO5 FEM Water Flow
- **Dynamics:** GeoStudio QUAKE-W, OpenSees
- **Runout (MPM):** Anura3D, CB-Geo MPM, GeoTaichi
- **Rock slopes:** Dips, Stereonet, OpenStereo, mplstereonet (kinematic); RocPlane, SWedge, RocTopple, RocSlope2, RocSlope3, GEO5 Rock Stability (blocks); UDEC, 3DEC (DEM)
- **Rockfall:** RocFall2, RocFall3, Rockyfor3D
- **Cut and fill:** Civil 3D, OpenSite Designer
- **Reliability around any of the above:** Probabilistic Toolkit (often with D-Stability for dikes), OpenTURNS, pystra

Execution standard: EN 16907 (earthworks).

---

Checked 2026-11-13 against EN 1997-1:2004 Sections 10 to 12 and the EN 1997-3:2025 clause list from secondary sources, not against the EN 1997-3 text.
