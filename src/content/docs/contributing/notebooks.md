---
title: Notebook pages
description: How a marimo notebook becomes a page, the two page modes, and how notebooks form a tutorial.
type: contributing
sidebar:
  order: 1
---

A marimo notebook (`x.py`) anywhere under `src/content/docs/` becomes a page beside it: `just pages` writes `x.mdx` or `x.md`. Both files are committed. The generated page says so in its front matter; edit the notebook, never the page, and run `just pages` again. CI fails when a page is out of date.

Link a notebook by its file, `[Dataflow](dataflow.py)`; the build points the link at its page.

## Page modes

Each notebook's [page mode](../reference/glossary.md#page-mode) is set in [`sources.yaml`](sources.md). A notebook in no entry is in islands mode.

| Mode | The page | Runs | Use it for |
| --- | --- | --- | --- |
| `islands` | `x.mdx`, with a marimo island per cell; cells that show their code in marimo get an editable code cell | at build time, then in the reader's browser through [Pyodide](../reference/glossary.md#pyodide) | notebooks whose packages Pyodide has, and that need no private data |
| `static` | `x.md`, with the notebook's text and its code as code blocks; cells that hide their code in marimo become closed folds | nothing | notebooks that need data or packages a reader doesn't have |

A static page has no outputs yet. The next step is to save each run with `marimo export session` where the data is, and show those saved outputs on the page.

## Tutorials

A [tutorial](../reference/glossary.md#tutorial) is a page with `tutorial: <name>` in its front matter and a `## <name>` heading that lists the parts in order:

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
