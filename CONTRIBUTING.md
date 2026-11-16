# Contributing

How these docs are organized, which kind of page to write, and the conventions every page follows. This file is for people and coding agents alike: there is no separate agent manual. An agent starts from `AGENTS.md`, which points here.

The pages are in `src/content/docs/`. Folders below are relative to it.

## How the docs fit together

The docs are a graph, not a book. The [Docs Atlas](src/content/docs/reference/glossary.md#docs-atlas) shows geotechnical work as a cycle: planning back from the project to the ground investigation it needs, and doing forward from the ground investigation to the design. The sections follow the planning order:

1. **Geotechnical structures:** one [structure page](src/content/docs/reference/glossary.md#structure-page) per structure, with the checks on the structure and around it.
2. **Geotechnical analyses:** the [method pages](src/content/docs/reference/glossary.md#method-page) that answer the checks and turn the EGM into a GDM.
3. **Ground modeling:** from ground investigation data to the EGM.
4. **Ground investigation:** existing data first, then fieldwork and lab tests.
5. **Fundamentals:** [concepts](src/content/docs/reference/glossary.md#fundamental) that recur across the other sections.
6. **Worked examples:** [problems worked through end to end](src/content/docs/reference/glossary.md#worked-example).
7. **Tools** and **Reference**.

Each section starts with an [overview page](src/content/docs/reference/glossary.md#overview-page). Ground investigation and ground models attach to the analysis, not to the structure: the analysis method decides which parameters you need, and those decide the ground model and the investigation. So a structure page links to method pages, and a method page links to the ground modeling and ground investigation it needs. Every page links its terms to the [glossary](src/content/docs/reference/glossary.md).

A reader goes only as deep as they need:

1. hover a glossary link for the term's gist;
2. open a [Learn more fold](src/content/docs/reference/glossary.md#learn-more-fold) for the next level of detail;
3. follow a link to the method page or fundamental;
4. run the notebook.

## Which kind of page

| You want the reader to | Write a | Folder | `type` |
| --- | --- | --- | --- |
| see what a section covers | overview page | the section's `index.md` | `overview` |
| see what to check for a structure, and where to go next | structure page | `geotechnical-structures/` | `structure` |
| understand an analysis method and when it holds | method page | `geotechnical-analyses/` | `method` |
| understand a concept that recurs everywhere | fundamental | `fundamentals/` | `fundamental` |
| get one task done | how-to | the section it belongs to, such as `ground-investigation/` | `how-to` |
| see a problem worked through end to end | worked example | `worked-examples/<name>/` | `worked-example` |
| learn a tool by doing, in order | tutorial | the tool's folder | `tutorial` |
| look something up | reference page | `reference/` | `reference` |
| know what a tool is for | tool page | `tools/<tool>/index.md` | `tool` |

Every tool folder has the same shape: `index.md` (the tool page, written here), then `getting-started`, `guides/`, `examples/` and `reference/`. For our own packages, everything but `index.md` comes from the package's repository as a [source](#sources).

## Front matter

```yaml
---
title: Spread foundations             # required
description: Pad and strip footings…  # one sentence, shown in search and link previews
type: structure                       # the kind of page, from the table above
eurocode: EN 1997-3:2025 Clause 5     # structure pages: the clause
analysis_types: [stability, deformation]
stage: [ground-investigation]         # worked examples: the doing steps they cover
tutorial: Learn marimo                # a tutorial page: the name of its ## parts list
---
```

`src/content.config.ts` lists every key a page can carry.

## Conventions

- **Links are relative links to files**, such as `[Bearing capacity](../geotechnical-analyses/bearing-capacity.mdx)` or `[Dataflow](getting-started/dataflow.py)` for a notebook. The build turns them into page links. They also work on GitHub and in Obsidian, and they survive moving the docs to another site.
- **Links to other pages of the site** that aren't files, such as `/tools/`, are written from the site root without its base path (`/bedrock-docs/`); the build adds it.
- **A glossary link** is a link to `glossary.md#<term>`. It gets a dotted underline, a hover card with the term's first paragraph, and a line under "Key terms" at the end of the page.
- **A glossary term** is a `###` heading under one of the glossary's `##` groups. Its first paragraph is the hover text, so make it stand on its own. A term keeps one meaning everywhere. Name the term in full and put its abbreviations in parentheses at the end of the heading, as in `### Cone penetration test (CPT)`: a link may then use any of them, `glossary.md#cpt` or `glossary.md#cone-penetration-test`. Separate several with commas. These short links work on the site, not on GitHub or in Obsidian.
- **A citation** is pandoc syntax: `[@citekey]`, or `[@citekey, 2.4.1]` with a clause or page. A standard shows as (EN 1997-1:2004, 2.4.1), anything else as (Author 2016); hovering shows the full reference, and the page ends with the References it cites. The citekeys are those of the Bedrock.engineer Library, and [`bibliography.json`](bibliography.json) holds the cited entries as CSL-JSON, exported from that Library. Add an entry there, never invent a key. In a glossary entry, put citations in a paragraph after the first, so they stay out of the hover text. The format is set in [`src/plugins/citation-style.csl`](src/plugins/citation-style.csl).
- **A Learn more fold** is an Obsidian callout: `> [!note]- Learn more: <title>`. The `-` keeps it closed.
- **Math** is LaTeX between `$…$` or `$$…$$`.
- **Marimo cells** go in an `.mdx` page as ```` ```python marimo ```` fences, with the page's packages in a ```` ```marimo-config ```` fence. They run at build time and in the reader's browser. Use them only where moving a value teaches something. See [Notebook pages](#notebook-pages).
- **Pages import nothing.** The marimo runtime is added to every page with marimo cells, so a page works wherever it is copied.
- **End with what you checked**, such as "Checked 2026-11-13 against EN 1997-1:2004 Section 6".

## What never goes in

- Client data, or anything from a job, unless the client agreed to publish it.
- Large files. Notebook exports, data and images over a few hundred kB go to object storage and are linked.

## Notebook pages

A marimo notebook (`x.py`) anywhere under `src/content/docs/` becomes a page beside it: `just pages` writes `x.mdx` or `x.md`. Both files are committed. The generated page says so in its front matter; edit the notebook, never the page, and run `just pages` again. CI fails when a page is out of date.

Link a notebook by its file, `[Dataflow](dataflow.py)`; the build points the link at its page.

### Page modes

Each notebook's [page mode](src/content/docs/reference/glossary.md#page-mode) is set in [`sources.yaml`](sources.yaml). A notebook in no entry is in islands mode.

| Mode | The page | Runs | Use it for |
| --- | --- | --- | --- |
| `islands` | `x.mdx`, with a marimo island per cell; cells that show their code in marimo get an editable code cell | at build time, then in the reader's browser through [Pyodide](src/content/docs/reference/glossary.md#pyodide) | notebooks whose packages Pyodide has, and that need no private data |
| `static` | `x.md`, with the notebook's text and its code as code blocks; cells that hide their code in marimo become closed folds | nothing | notebooks that need data or packages a reader doesn't have |

### Saved outputs on static pages

A static page can show what each cell output in one run, with every control at its default value. [`scripts/docs/notebook_outputs.py`](scripts/docs/notebook_outputs.py) makes that run, where the data is:

```sh
just outputs worked-examples/soft-soil-egm ../../Repos/iaeg2026-soft-soil-egm.worktrees/<checkout>
just pages
```

The checkout must be at the entry's `rev`. For each notebook, marimo Studio prepares a view with its Prepared (zero-python) runtime: the outputs, rendered later by marimo's own frontend in the reader's browser, with no Python. Two files come out of it:

- `public/notebook-outputs/`: Studio's runtime and one view per notebook. Not committed yet: about 20 MB of runtime plus each notebook's outputs, rewritten by every run. A build without it shows the static pages without outputs.
- `<folder>/notebook-outputs.json`: per notebook, its view and the host of each cell with an output, by the SHA-256 of the cell's code. Committed; `just pages` puts each host under its cell.

Controls on these pages show their default and do nothing. A cell whose output calls Python, such as an `mo.ui.table`, can't be prepared: the script leaves it out and lists it under `dropped`.

### Tutorials

A [tutorial](src/content/docs/reference/glossary.md#tutorial) is a page with `tutorial: <name>` in its front matter and a `## <name>` heading that lists the parts in order:

```md
---
title: Learn marimo
tutorial: Learn marimo
---

## Learn marimo

1. [Welcome to marimo](intro.py): reactive execution, UI elements…
2. [How marimo notebooks run](dataflow.py): the dataflow graph…
```

Each part's page gets the link text as its title, a "Part n of N in Learn marimo" line, and its place in the sidebar. A part is usually a notebook. Give the tutorial page `sidebar: { order: 0 }` so it comes first.

## Sources

A [source](src/content/docs/reference/glossary.md#source) is a set of files from another repository, such as marimo's tutorials or a package's docs folder, copied into these docs at a pinned tag or commit. [`sources.yaml`](sources.yaml) lists them; `just sources` copies them in. The copies are committed, so a build needs no network for them, and a review shows exactly what changed.

A copied file is fixed upstream, never here: `just sources` overwrites local edits. A copied page's "Edit page" link goes to its upstream file.

### An entry

```yaml
- to: tools/symeval            # folder under src/content/docs/
  repo: bedrock-engineer/symeval
  rev: 0.5.3                   # a tag, or a commit for repositories without releases
  from: examples               # folder in that repository
  files:                       # leave out to copy the whole folder
    - getting_started.py: getting-started.py   # upstream name: name here
  mode: islands                # notebooks only: islands or static
```

An entry without `files` copies the whole folder, and the folder then belongs to the source: a file that disappears upstream is deleted here too. An entry without `repo` only sets the page mode of notebooks that live in this repository.

### Update a source

1. Change `rev` to the new tag.
2. Run `just sources` and `just pages`.
3. Review the diff and commit it.

### What a docs folder must do to be copied in

A package's docs folder can be copied in whole, for example to `tools/<package>/`, if its pages:

- link each other with relative links to files (`[Reference](reference/cpt-viewer.md)`), not with URLs of the site they were first written for;
- import nothing; the marimo runtime is added to pages with marimo cells;
- follow the tool folder's shape: `getting-started`, `guides/`, `examples/`, `reference/`.

## Commands

```sh
just install   # pnpm install
just dev       # the site at http://localhost:4321/bedrock-docs/, reloading as you edit
just sources   # copy the files sources.yaml lists from other repositories
just pages     # turn the notebooks into pages
just build     # build the site, check every link
just check     # what CI runs: sources and pages are current, and the site builds
```
