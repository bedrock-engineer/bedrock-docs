---
title: Glossary
description: Every term these docs use, with one meaning each. Pages link here, and hovering or tapping a link shows the definition.
type: reference
sidebar:
  order: 1
---

Every term on this page keeps one meaning across the docs. Where a page links a term, hovering, focusing or tapping the link shows the first paragraph under its heading. On a phone, tap it again to come here.

## Ground

### Effective stress

The part of the total stress that the soil grains carry: total stress minus pore water pressure. The strength and stiffness of soil depend on effective stress, not on total stress.

### Friction angle

The angle φ′ that describes how a soil's shear strength grows with effective stress, like friction on a slope. Sands typically have 28° to 40°.

### Soil behavior type (SBT)

A soil class read from CPT measurements instead of from samples, such as Robertson's SBTn zones. It says how the soil behaves under the cone, which mostly, but not always, matches its grain size.

### Undrained shear strength

The shear strength cu of a saturated clay loaded faster than its pore water can drain away. It governs short-term stability, such as right after construction.

## Investigation and models

### Cone penetration test (CPT)

A test in which a cone is pushed into the ground at a constant rate while it measures cone resistance (qc), sleeve friction (fs) and often pore pressure. It gives a near-continuous profile in minutes.

Source: [@en-1997-2_ec7-gi-testing_2007, 4.3].

### Engineering geological model (EGM)

The understanding of what the ground is like under and around a site: which soil and rock units are where, how they formed, how they behave, and where the groundwater is. It is built from ground investigation data, before any design values are chosen.

The EGM describes the ground only; the structure comes in with the geotechnical design model. A project has one EGM, which ground modeling refines whenever new ground investigation data comes in. BS 5930 calls it the ground model.

Source: [@bs-5930_ground-investigations_2015, 3.7].

### GeoTOP

TNO's 3D voxel model of the shallow subsurface of the Netherlands. Each 100 m by 100 m by 0.5 m cell holds the most likely stratigraphic unit and lithology class.

### Geotechnical design model (GDM)

The engineering geological model schematized for one structure and one check: the structure's geometry and construction stages, the actions and water levels for the design situation, and design values per layer. A project has one EGM and usually several GDMs.

Geotechnical analysis produces the GDM and verifies the check with it. EN 1997-1:2004 has no name for the model as a whole, but defines what goes into it: characteristic and design values of the geotechnical parameters, and the geometrical data.

Source: [@en-1997-1_ec7-general-rules_2004, 2.4.4 to 2.4.6].

### Geotechnical parameter

A number that quantifies a property of soil or rock for a design calculation, such as unit weight, friction angle, undrained shear strength or stiffness. Each analysis method needs its own set.

A parameter comes from test results, directly or through correlation, theory or experience; EN 1997 calls a value obtained that way a derived value. From the derived values, the designer selects a characteristic value for each parameter.

Sources: [@en-1997-1_ec7-general-rules_2004, 1.5.2.5, 2.4.3 and 2.4.5.2] and [@en-1997-2_ec7-gi-testing_2007, 1.5.3.1 and 1.6].

### Ground investigation (GI)

Everything done to find out what the ground and groundwater are like at and around a site: a desk study of existing data, a site walkover, fieldwork such as boreholes, CPTs and geophysics, and lab tests on samples. It is the first step of every geotechnical job.

The UK used to call it site investigation.

Sources: [@bs-5930_ground-investigations_2015, 3.6] and [@en-1997-2_ec7-gi-testing_2007].

## Geostatistics

### Conditional simulation

A geostatistical method that generates many equally likely versions of the ground, called realizations, that all honor the measured data. The spread between realizations shows how uncertain the ground is between data points.

### Variogram

A function that says how different two measurements are, on average, as the distance between them grows. It sets how geostatistics interpolates and simulates between boreholes or CPTs.

## Design

### Action

The Eurocode word for anything that loads or deforms a structure. Direct actions are forces, such as self-weight, traffic and water pressure; indirect actions are imposed deformations or accelerations, such as settlement, temperature and an earthquake.

EN 1990 sorts actions by how long they last: permanent, variable, accidental and seismic. Actions that the ground, fill, standing water or groundwater transmit to a structure, such as earth pressure and water pressure, are geotechnical actions in EN 1997. NEN-EN 1990 translates action as *belasting*.

Source: [@en-1997-1_ec7-general-rules_2004, 1.5.2.1, 2.4.1 and 2.4.2]. EN 1997-1 takes the general definition from EN 1990:2002, 1.5.

### Analysis method

The calculation model that answers a check: analytical, such as a bearing capacity formula; semi-empirical, such as a CPT-based pile method; or numerical, such as a finite element model. The project phase and the ground investigation available decide which method fits, and the method decides which parameters you need.

EN 1997-1 calls it a calculation model. It has to describe how the ground behaves for the limit state being checked, and be accurate or err on the safe side.

Source: [@en-1997-1_ec7-general-rules_2004, 2.4.1].

### Bearing resistance

The pressure under a footing at which the ground fails in shear and the footing punches in. EC7 calls it bearing resistance; textbooks call it bearing capacity.

See [Bearing capacity](../geotechnical-analyses/bearing-capacity.mdx) for what controls it.

Source: [@en-1997-1_ec7-general-rules_2004, 1.5.2.7 and 6.5.2].

### Calculation report

A document that shows how a design value was reached: each formula, the input values with their units and sources, and the result, so a checker can follow and repeat every step.

See [SymEval](../tools/symeval/index.md) for writing one in Python.

### Check

A verification that the structure, or something around it, stays within one limit state for one way it can fail. The project gives the candidate checks; the ground conditions, actions and project requirements decide which ones apply.

EN 1997-1 calls this verifying a limit state.

Source: [@en-1997-1_ec7-general-rules_2004, 2.4.7 and 2.4.8].

### Geotechnical structure

A structure whose design depends on the ground it is built in or on, such as a foundation, a slope, a retaining wall, a dike or a tunnel. Fill placed while it is built counts as part of the structure, not of the ground. EN 1997-3 has a clause for most kinds.

Source: [@en-1997-1_ec7-general-rules_2004, 1.5.2.3 and 1.5.2.4].

### Limit state

A condition beyond which a structure no longer meets its requirements. Ultimate limit states (ULS) are about failure and safety; serviceability limit states (SLS) are about use, such as settlement.

Source: [@en-1997-1_ec7-general-rules_2004, 2.4.7 and 2.4.8]. EN 1997-1 takes the definition from EN 1990:2002, 1.5.

### Physical quantity

A number with a unit, such as 18 kN/m³. Unit-aware code, like the Pint package in Python, carries the unit through every step and converts it for you.

### Settlement

The downward movement of a foundation as the ground beneath it compresses, partly at once and partly over months or years as pore water drains away.

Source: [@en-1997-1_ec7-general-rules_2004, 6.6.2].

### Spread foundation

A foundation that spreads a load onto the ground close to the surface through a pad, strip or raft, without piles.

Source: [@en-1997-1_ec7-general-rules_2004, Section 6].

## Notebooks and software

### Explorable explanation

A text in which you change the inputs and see the consequences at once, a term from Bret Victor (2011). On this site they are marimo cells that run in your browser.

See [Bearing capacity](../geotechnical-analyses/bearing-capacity.mdx) for one.

### Pyodide

Python compiled to WebAssembly, so Python runs inside a web page without a server. It runs the notebooks on this site; the first one you open takes a while to load.

### Reactive notebook

A notebook in which changing a cell reruns every cell that depends on it, so the code and its outputs always agree. marimo is one; Jupyter is not.

See [marimo](../tools/marimo/index.md) and the [Learn marimo](../tools/marimo/getting-started/index.md) tutorial.

## These docs

The words these docs use for their own parts.

### Docs Atlas

The home page: one picture of how geotechnical work fits together, as a cycle of planning back from the project and doing forward from the ground investigation, with a way into every section.

### Fundamental

A page that explains one concept that recurs across structures, analyses and data, such as effective stress or a coordinate reference system. Diátaxis calls this explanation. Until the geomechanics and geospatial pages are written, these concepts live in this glossary.

### Geotechnical structure page (structure page)

A page that gathers everything about one geotechnical structure: what to check on the structure and around it, which analysis types and software answer each check, and the method pages that go deeper. Checks on the surroundings, such as settlement of nearby buildings, belong here too.

### How-to

A page that gets one task done, such as downloading the CPTs around a site, for a reader who already knows what they want.

### Learn more fold

A closed box under a paragraph that holds the next level of detail, for the readers who want it. Pages write it as an Obsidian callout: `> [!note]- Learn more: <title>`.

### Method page

A page that explains one analysis method, such as bearing capacity: the idea, the formulas, and where it holds, often with an explorable explanation. It sits under Geotechnical analyses and links back to the checks it answers.

### Overview page

The first page of a section: what the section covers, where it sits in the cycle on the Docs Atlas, and what is in it so far.

### Page mode

How a notebook becomes a page. In islands mode its cells run in your browser through Pyodide, so you can change them; in static mode the page shows its text and code, and nothing runs.

### Reference page

A page you look things up in rather than read through, such as this glossary or a tool page. Diátaxis uses the same word.

### Source

Files these docs copy from another repository, pinned to a tag or commit, as listed in `sources.yaml`. They are fixed upstream, never here.

### Tutorial

An ordered set of parts that teaches one tool by doing, such as Learn marimo. Each part says "Part n of N" and has its place in the sidebar. Tutorials live in their tool's folder.

### Worked example

A problem worked through end to end, often from a real job or project: what was done, what was learned, and its notebooks where they can be shared.