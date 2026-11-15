---
title: Atlas
description: How geotechnical engineering fits together, from ground investigation to the design of each structure.
type: atlas
---

Every geotechnical job runs along one chain: investigate the ground, model its geology, turn that model into design values, and design the structure. Start from the box closest to your question.

<figure class="atlas">
<svg viewBox="0 0 760 330" role="img" aria-label="The chain from ground investigation to design per structure">
  <defs><marker id="atlas-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="atlas-ink"/></marker></defs>
  <g class="atlas-edges">
    <path d="M184 66H208" marker-end="url(#atlas-arrow)"/>
    <path d="M368 66H392" marker-end="url(#atlas-arrow)"/>
    <path d="M552 66H576" marker-end="url(#atlas-arrow)"/>
    <path d="M656 112V144" marker-end="url(#atlas-arrow)"/>
    <path d="M192 208H216" marker-end="url(#atlas-arrow)"/>
    <path d="M368 208H392" marker-end="url(#atlas-arrow)"/>
    <path d="M544 208H568" marker-end="url(#atlas-arrow)"/>
  </g>
  <a href="reference/glossary.md#ground-investigation"><g class="atlas-box"><rect x="24" y="20" width="160" height="92" rx="8"/><text x="104" y="48" class="atlas-name">Ground</text><text x="104" y="66" class="atlas-name">investigation</text><text x="104" y="88" class="atlas-body">CPTs, boreholes, lab</text></g></a>
  <a href="reference/glossary.md#engineering-geological-model"><g class="atlas-box"><rect x="208" y="20" width="160" height="92" rx="8"/><text x="288" y="48" class="atlas-name">Engineering</text><text x="288" y="66" class="atlas-name">geological model</text><text x="288" y="88" class="atlas-body">Units and geology</text></g></a>
  <a href="reference/glossary.md#geotechnical-design-model"><g class="atlas-box"><rect x="392" y="20" width="160" height="92" rx="8"/><text x="472" y="48" class="atlas-name">Geotechnical</text><text x="472" y="66" class="atlas-name">design model</text><text x="472" y="88" class="atlas-body">Design values</text></g></a>
  <a href="#structures"><g class="atlas-box atlas-accent"><rect x="576" y="20" width="160" height="92" rx="8"/><text x="656" y="48" class="atlas-name">Design per</text><text x="656" y="66" class="atlas-name">structure</text><text x="656" y="88" class="atlas-body">14 structure hubs</text></g></a>
  <rect x="24" y="144" width="712" height="104" rx="8" class="atlas-hub"/>
  <text x="40" y="166" class="atlas-hub-name">Inside each structure hub</text>
  <g class="atlas-box"><rect x="40" y="180" width="152" height="56" rx="8"/><text x="116" y="213" class="atlas-name">Checks</text></g>
  <g class="atlas-box"><rect x="216" y="180" width="152" height="56" rx="8"/><text x="292" y="213" class="atlas-name">Analysis types</text></g>
  <g class="atlas-box"><rect x="392" y="180" width="152" height="56" rx="8"/><text x="468" y="213" class="atlas-name">Methods</text></g>
  <g class="atlas-box"><rect x="568" y="180" width="152" height="56" rx="8"/><text x="644" y="213" class="atlas-name">Software</text></g>
  <rect x="24" y="264" width="712" height="48" rx="8" class="atlas-band"/>
  <text x="380" y="293" class="atlas-body atlas-band-text">Fundamentals, how-tos, case studies and glossary terms attach to any box above</text>
</svg>
</figure>

## Structures

The structures follow the clauses of EN 1997-3:2025, plus four that other codes cover. The numbers count the checks each structure page lists per analysis type; on the finished site each number would open those checks.

| Structure | Stability | Deformation | Groundwater flow | Dynamics |
| --- | --- | --- | --- | --- |
| Slopes, cuttings and embankments | 3 | 2 | 2 | 2 |
| [Spread foundations](structures/spread-foundations.md) | 4 | 2 | 1 | 1 |
| Piled foundations | 3 | 4 |  | 2 |
| Retaining structures | 4 | 2 | 2 |  |
| Anchors | 3 | 1 |  |  |
| Reinforced fill structures | 3 | 2 |  |  |
| Soil nailed structures | 2 | 1 | 1 |  |
| Rock bolts and rock surface support | 2 | 1 |  | 1 |
| Ground improvement | 1 | 3 |  | 1 |
| Groundwater control |  | 1 | 5 |  |
| Underground structures | 2 | 3 | 1 | 1 |
| Dams | 2 | 1 | 2 | 1 |
| Pavements and subgrades | 1 | 3 | 1 | 1 |
| Pipelines and buried structures | 4 | 2 | 1 | 1 |

## Case studies

- [Probabilistic soft-soil ground model (IAEG 2026)](case-studies/iaeg-2026/index.md): GeoTOP and CPTs to a probabilistic soil model under a building

## Fundamentals

- [Bearing capacity](fundamentals/bearing-capacity.mdx), with an explorable

## Tutorials

- [Learn marimo](tools/marimo/getting-started/index.md): ten parts, from your first cell to SQL and layouts, running in your browser
- [Getting started with SymEval](tools/symeval/getting-started.py): calculations with units, shown step by step

## Tools

- [marimo](tools/marimo/index.md): the notebooks behind every explorable
- [SymEval](tools/symeval/index.md): calculations with units for a [calculation report](reference/glossary.md#calculation-report)
- [cpt-anywidget](tools/cpt-anywidget/index.md): notebook viewers for CPTs and borehole logs

## Reference

- [Glossary](reference/glossary.md): every term these docs use, with one meaning each
