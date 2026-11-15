---
title: Sources
description: Files these docs take from other repositories, pinned to a release, and how to add or update one.
type: contributing
sidebar:
  order: 2
---

A [source](../reference/glossary.md#source) is a set of files from another repository, such as marimo's tutorials or a package's docs folder, copied into these docs at a pinned tag or commit. `sources.yaml` lists them; `just sources` copies them in. The copies are committed, so a build needs no network for them, and a review shows exactly what changed.

A copied file is fixed upstream, never here: `just sources` overwrites local edits. A copied page's "Edit page" link goes to its upstream file.

## An entry

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

## Update a source

1. Change `rev` to the new tag.
2. Run `just sources` and `just pages`.
3. Review the diff and commit it.

## What a docs folder must do to be copied in

A package's docs folder can be copied in whole, for example to `tools/<package>/`, if its pages:

- link each other with relative links to files (`[Reference](reference/cpt-viewer.md)`), not with URLs of the site they were first written for;
- import nothing; the marimo runtime is added to pages with marimo cells;
- follow the tool folder's shape: `getting-started`, `guides/`, `examples/`, `reference/`.
