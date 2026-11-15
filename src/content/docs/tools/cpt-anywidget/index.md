---
title: cpt-anywidget
description: Our notebook widgets for CPTs and borehole logs, and where they show up in these docs.
type: tool
sidebar:
  label: About cpt-anywidget
  order: 0
---

**Where this fits:** [Docs Atlas](../../index.md) › [Tools](../index.md) › cpt-anywidget

cpt-anywidget is Bedrock.engineer's set of notebook viewers for [CPTs](../../reference/glossary.md#cpt) and geotechnical borehole logs, for [marimo](../marimo/index.md) and Jupyter. It plots any CPT data you can load into Python, lets you draw and edit soil layers on it, and lines CPTs up along a profile.

## Why it fits geotechnical work

- **Any data source.** The viewers take plain columns, so a CPT from the BRO, a GEF file or a spreadsheet all work. The Dutch standards are only defaults.
- **Interpretation next to the measurements.** Robertson's [soil behavior types](../../reference/glossary.md#soil-behavior-type) and other interpretations sit in columns beside qc and fs, on the same depth axis.
- **Layers you can hand over.** The layers you draw come back to Python, ready for an [engineering geological model](../../reference/glossary.md#engineering-geological-model).

## Getting started

[Getting started](getting-started.md) installs it and shows a CPT in a notebook. [Edit soil layers](edit-layers.md) turns the viewer into a layer editor. The examples run in your browser, on CPTs fetched live from the BRO.

## Reference

The [reference pages](reference/cpt-viewer.md) describe each viewer's options and data contract.

All pages but this one come from the package's repository, at its release v0.3.0 (see [Sources](../../contributing/sources.md)).

## Where it fits on these pages

- [IAEG 2026](../../case-studies/iaeg-2026/index.md): the CPT classification notebook classifies the CPTs that cpt-anywidget can show.
