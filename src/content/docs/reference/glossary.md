---
title: Glossary
description: Every term these docs use, with one meaning each. Pages link here, and hovering a link shows the definition.
type: reference
sidebar:
  order: 1
---

Every term on this page keeps one meaning across the docs. Where a page links a term, hovering or focusing the link shows the first paragraph under its heading.

## Ground

### Effective stress

The part of the total stress that the soil grains carry: total stress minus pore water pressure. The strength and stiffness of soil depend on effective stress, not on total stress.

### Friction angle

The angle φ′ that describes how a soil's shear strength grows with effective stress, like friction on a slope. Sands typically have 28° to 40°.

### Soil behavior type

A soil class read from CPT measurements instead of from samples, such as Robertson's SBTn zones. It says how the soil behaves under the cone, which mostly, but not always, matches its grain size.

### Undrained shear strength

The shear strength cu of a saturated clay loaded faster than its pore water can drain away. It governs short-term stability, such as right after construction.

## Investigation and models

### CPT

A cone penetration test: a cone pushed into the ground at a constant rate while it measures cone resistance (qc), sleeve friction (fs) and often pore pressure. It gives a near-continuous profile in minutes.

### Engineering geological model

A model of the ground's geology: which units are where, how they formed, and how they behave. It is built from ground investigation data, before any design values are chosen.

### GeoTOP

TNO's 3D voxel model of the shallow subsurface of the Netherlands. Each 100 m by 100 m by 0.5 m cell holds the most likely stratigraphic unit and lithology class.

### Geotechnical design model

The engineering geological model turned into design values for one structure: units with parameters, groundwater levels and loads, set up for the checks that structure needs.

### Ground investigation

The fieldwork and lab testing that tell you what the ground is: boreholes, CPTs, geophysics, samples and lab tests. It is the first step of every geotechnical job.

## Geostatistics

### Conditional simulation

A geostatistical method that generates many equally likely versions of the ground, called realizations, that all honor the measured data. The spread between realizations shows how uncertain the ground is between data points.

### Variogram

A function that says how different two measurements are, on average, as the distance between them grows. It sets how geostatistics interpolates and simulates between boreholes or CPTs.

## Design

### Bearing resistance

The pressure under a footing at which the ground fails in shear and the footing punches in. EC7 calls it bearing resistance; textbooks call it bearing capacity.

See [Bearing capacity](../fundamentals/bearing-capacity.mdx) for what controls it.

### Calculation report

A document that shows how a design value was reached: each formula, the input values with their units and sources, and the result, so a checker can follow and repeat every step.

See [SymEval](../tools/symeval/index.md) for writing one in Python.

### Limit state

A condition beyond which a structure no longer meets its requirements. Ultimate limit states (ULS) are about failure and safety; serviceability limit states (SLS) are about use, such as settlement.

### Physical quantity

A number with a unit, such as 18 kN/m³. Unit-aware code, like the Pint package in Python, carries the unit through every step and converts it for you.

### Settlement

The downward movement of a foundation as the ground beneath it compresses, partly at once and partly over months or years as pore water drains away.

### Spread foundation

A foundation that spreads a load onto the ground close to the surface through a pad, strip or raft, without piles.

## Notebooks and software

### Explorable explanation

A text in which you change the inputs and see the consequences at once, a term from Bret Victor (2011). On this site they are marimo cells that run in your browser.

See [Bearing capacity](../fundamentals/bearing-capacity.mdx) for one.

### Pyodide

Python compiled to WebAssembly, so Python runs inside a web page without a server. It runs the notebooks on this site; the first one you open takes a while to load.

### Reactive notebook

A notebook in which changing a cell reruns every cell that depends on it, so the code and its outputs always agree. marimo is one; Jupyter is not.

See [marimo](../tools/marimo/index.md) and the [Learn marimo](../tools/marimo/getting-started/index.md) tutorial.

## These docs

The words these docs use for their own parts. [Contributing](../contributing/index.md) says how to write each one.

### Atlas

The home page: one picture of how geotechnical work fits together, from ground investigation to the design of each structure, with a way into every hub.

### Case study

A page about a real job or project: what was done, what was learned, and its notebooks where they can be shared. Diátaxis would call it a worked example.

### Fundamental

A page that explains one idea, such as bearing capacity, so you understand why a check works and when it doesn't. Diátaxis calls this explanation.

### How-to

A page that gets one task done, such as downloading the CPTs around a site, for a reader who already knows what they want.

### Hub

A page that gathers everything about one structure or one ground stage: what to check, how, with which software, and the pages that go deeper.

### Learn more fold

A closed box under a paragraph that holds the next level of detail, for the readers who want it. Pages write it as an Obsidian callout: `> [!note]- Learn more: <title>`.

### Page mode

How a notebook becomes a page. In islands mode its cells run in your browser through Pyodide, so you can change them; in static mode the page shows its text and code, and nothing runs.

Each notebook's mode is set in `sources.yaml`; see [Notebook pages](../contributing/notebooks.md).

### Reference page

A page you look things up in rather than read through, such as this glossary or a tool page. Diátaxis uses the same word.

### Source

Files these docs copy from another repository, pinned to a tag or commit, as listed in `sources.yaml`. They are fixed upstream, never here.

See [Sources](../contributing/sources.md).

### Tutorial

An ordered set of parts that teaches by doing, such as Learn marimo. Each part says "Part n of N" and has its place in the sidebar.
