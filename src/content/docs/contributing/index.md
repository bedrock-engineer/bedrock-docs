---
title: Writing a page
description: How these docs are organized, which kind of page to write, and the front matter and conventions every page follows. For people and coding agents alike.
type: contributing
sidebar:
  order: 0
---

These pages are the docs for people and for coding agents alike: there is no separate agent manual. An agent starts from `AGENTS.md`, which points here, and follows links the way a person does.

## How the docs fit together

The docs are a graph, not a book. The [atlas](../reference/glossary.md#atlas) shows how geotechnical work fits together and links to the [hubs](../reference/glossary.md#hub), one per structure or ground stage. A hub links to the [fundamentals](../reference/glossary.md#fundamental), [how-tos](../reference/glossary.md#how-to), [case studies](../reference/glossary.md#case-study) and [tools](../tools/index.md) that go deeper. Every page links its terms to the [glossary](../reference/glossary.md).

A reader goes only as deep as they need:

1. hover a glossary link for the term's gist;
2. open a [Learn more fold](../reference/glossary.md#learn-more-fold) for the next level of detail;
3. follow a link to the fundamental;
4. run the notebook.

## Which kind of page

| You want the reader to | Write a | Folder | `type` |
| --- | --- | --- | --- |
| see what to check for a structure, and where to go next | hub | `structures/`, `ground/` | `structure`, `ground` |
| understand why something works | fundamental | `fundamentals/` | `fundamental` |
| get one task done | how-to | `how-to/` | `how-to` |
| learn from a real job | case study | `case-studies/<name>/` | `case-study` |
| learn by doing, in order | tutorial | the tool's or case study's folder | `tutorial` |
| look something up | reference page | `reference/` | `reference` |
| know what a tool is for | tool page | `tools/<tool>/index.md` | `tool` |

Every tool folder has the same shape: `index.md` (the tool page, written here), then `getting-started`, `guides/`, `examples/` and `reference/`. For our own packages, everything but `index.md` comes from the package's repository as a [source](sources.md).

## Front matter

```yaml
---
title: Spread foundations             # required
description: Pad and strip footings…  # one sentence, shown in search and link previews
type: structure                       # the kind of page, from the table above
eurocode: EN 1997-3:2025 Clause 5     # hubs: the clause
analysis_types: [stability, deformation]
stage: [ground-investigation]         # case studies: the ground stages they cover
tutorial: Learn marimo                # a tutorial page: the name of its ## parts list
---
```

`src/content.config.ts` lists every key a page can carry.

## Conventions

- **Links are relative links to files**, such as `[Bearing capacity](../fundamentals/bearing-capacity.mdx)` or `[Dataflow](getting-started/dataflow.py)` for a notebook. The build turns them into page links. They also work on GitHub and in Obsidian, and they survive moving the docs to another site.
- **Links to other pages of the site** that aren't files, such as `/tools/`, are written from the site root without its base path (`/bedrock-docs/`); the build adds it.
- **A glossary link** is a link to `glossary.md#<term>`. It gets a dotted underline, a hover card with the term's first paragraph, and a line under "Key terms" at the end of the page.
- **A glossary term** is a `###` heading under one of the glossary's `##` groups. Its first paragraph is the hover text, so make it stand on its own. A term keeps one meaning everywhere.
- **A Learn more fold** is an Obsidian callout: `> [!note]- Learn more: <title>`. The `-` keeps it closed.
- **Math** is LaTeX between `$…$` or `$$…$$`.
- **Marimo cells** go in an `.mdx` page as ```` ```python marimo ```` fences, with the page's packages in a ```` ```marimo-config ```` fence. They run at build time and in the reader's browser. Use them only where moving a value teaches something. See [Notebook pages](notebooks.md).
- **Pages import nothing.** The marimo runtime is added to every page with marimo cells, so a page works wherever it is copied.
- **End with what you checked**, such as "Checked 2026-11-13 against EN 1997-1:2004 Section 6".

## What never goes in

- Client data, or anything from a job, unless the client agreed to publish it.
- Large files. Notebook exports, data and images over a few hundred kB go to object storage and are linked.

## Commands

```sh
just install   # pnpm install
just dev       # the site at http://localhost:4321/bedrock-docs/, reloading as you edit
just sources   # copy the files sources.yaml lists from other repositories
just pages     # turn the notebooks into pages
just build     # build the site, check every link
just check     # what CI runs: sources and pages are current, and the site builds
```
