---
title: Probabilistic soft-soil ground model (IAEG 2026)
description: GeoTOP voxels and BRO CPTs turned into a probabilistic soil model under a building, next to its BIM model. Open source, made for the IAEG 2026 conference.
type: case-study
stage: [ground-investigation, engineering-geological-model]
methods: [geostatistics]
date: 2026-10-30
tutorial: IAEG 2026 notebooks
sidebar:
  label: About the case study
  order: 0
---

**Where this fits:** [Atlas](../../index.md) › Engineering geological model

For the IAEG 2026 conference we built an open-source workflow that turns [GeoTOP](../../reference/glossary.md#geotop) voxels and BRO [CPTs](../../reference/glossary.md#cpt) into a probabilistic soil model under a building in soft Dutch ground, and shows it next to the building's BIM model.

[Repository](https://github.com/bedrock-engineer/iaeg2026-soft-soil-egm) · [Project page with the model on a map](https://bedrock-engineer.github.io/iaeg2026-soft-soil-egm/) · [Slides](https://bedrock-engineer.github.io/iaeg2026-soft-soil-egm/slides/)

## IAEG 2026 notebooks

Six [marimo](../../tools/marimo/index.md) notebooks, run in order:

1. [Get the data](01_get_data.py): select the GeoTOP columns and the CPTs around the building's footprint from the BRO.
2. [Simulation domains](02_simulation_domains.py): group GeoTOP units into domains whose CPTs behave alike, so geostatistics runs on comparable soil.
3. [Variograms](03_variograms.py): fit a [variogram](../../reference/glossary.md#variogram) per domain to the normal scores of log qc and log fs, vertically along the CPTs and horizontally between them.
4. [Simulation](04_simulation.py): run [conditional simulation](../../reference/glossary.md#conditional-simulation) of qc and fs on a grid finer than GeoTOP's, honoring the CPTs, with P10, P50 and P90 per cell.
5. [CPT classification](05_cpt_classification.py): classify every realization into Robertson [soil behavior types](../../reference/glossary.md#soil-behavior-type) and give each cell the probability of each zone.
6. [BimDataFrames](06_bimdataframes.py): merge cells of the same most likely zone into volumes and show them with the building's foundations in a 3D viewer and on Speckle.

The notebooks need the project's data and packages that don't run in a browser, so their pages are [static](../../reference/glossary.md#page-mode): they show each notebook's text and code, without outputs. To see the model, open the [project page](https://bedrock-engineer.github.io/iaeg2026-soft-soil-egm/). To run the notebooks yourself, clone the [repository](https://github.com/bedrock-engineer/iaeg2026-soft-soil-egm) and follow its README.

## What we learned

- fs has to be co-simulated with qc. Simulated independently, each realization loses the relation between them, and the soil behavior classification falls apart.
- The friction ratio is not simulated; it follows from each realization's qc and fs.
- A variogram only holds at the sample height it was fitted on (10, 25 or 50 cm), so samples and variograms are saved per height.
- GSTools' conditioned fields are conditional Gaussian simulation, not sequential Gaussian simulation, which differs from the abstract's wording.

> [!note]- Learn more: why not just krige?
> Kriging gives the single smoothest estimate between CPTs. It hides how uncertain the ground is and makes thin weak layers disappear. [Conditional simulation](../../reference/glossary.md#conditional-simulation) gives many realizations that each look like real ground and all pass through the CPTs; the spread between them is the uncertainty a designer needs.

## Pages this fed

- Glossary: [GeoTOP](../../reference/glossary.md#geotop), [CPT](../../reference/glossary.md#cpt), [variogram](../../reference/glossary.md#variogram), [conditional simulation](../../reference/glossary.md#conditional-simulation), [soil behavior type](../../reference/glossary.md#soil-behavior-type)
- Planned fundamentals: the variogram, kriging versus conditional simulation, CPT soil behavior type
- Planned how-to: get BRO CPTs and GeoTOP voxels around a site
