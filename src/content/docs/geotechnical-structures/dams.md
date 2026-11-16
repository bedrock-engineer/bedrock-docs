---
title: Dams
description: Embankment dams, the foundations of concrete dams, and tailings dams. What to check, how, and with which software.
type: structure
analysis_types: [stability, deformation, groundwater-flow, dynamics]
sidebar:
  order: 12
---

**Where this fits:** [Docs Atlas](../index.md) › [Geotechnical structures](index.md) › Dams

Embankment dams (earthfill and rockfill) and the foundations and seepage of concrete gravity and arch dams. EC7 Part 3 has no dam clause; large dams follow ICOLD bulletins and national dam safety rules. Tailings dams are under [Mining](#mining). Dikes and levees are under [slopes, cuttings and embankments](slopes-cuttings-and-embankments.md).

![Three dams in one cross-section, with what to check on each](../../../assets/structures/dams.svg)

## What to verify

| Check | Limit state | Analysis type | Usual methods |
| --- | --- | --- | --- |
| Slope stability at end of construction, steady seepage and rapid drawdown | ULS (GEO) | Stability | limit equilibrium, FEM |
| Internal erosion, piping and filter compatibility | ULS (HYD) | Groundwater flow | formulas (filter rules), FEM seepage |
| Seepage through the dam and foundation, uplift under concrete dams | ULS (UPL) | Groundwater flow | FEM seepage |
| Sliding of concrete dams on their foundation | ULS (GEO) | Stability | limit equilibrium, FEM, DEM (rock joints) |
| Settlement, cracking and deformation of the dam body | SLS | Deformation | FEM, FDM |
| Seismic deformation and liquefaction | ULS (GEO) | Dynamics | formulas (CPT triggering), FEM, FDM |

## Mining

Tailings dams store mine waste behind dams that are often raised in stages with the tailings themselves. They follow the Global Industry Standard on Tailings Management (GISTM, 2020). Static and seismic liquefaction of loose, saturated tailings is the check that sets them apart from water dams.

## Software

- **Limit equilibrium:** GeoStudio SLOPE-W, Slide2, Slide3, XSLOPE, cSlope, OGR Slip2D
- **Seepage:** GeoStudio SEEP-W, Slide2, OGR Slip2D
- **FEM and FDM:** GeoStudio SIGMA-W, PLAXIS 2D, PLAXIS 3D, RS2, FLAC, FLAC3D
- **Dynamics and liquefaction:** GeoStudio QUAKE-W, OpenSees, CLiq, liquepy
- **Rock foundations (DEM):** UDEC, 3DEC

---

Checked 2026-11-13 from general knowledge; no standard was read for this page.
