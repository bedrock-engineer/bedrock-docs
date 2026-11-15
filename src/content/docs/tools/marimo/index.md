---
title: marimo
description: The reactive Python notebook behind every notebook and explorable on this site.
type: tool
sidebar:
  label: About marimo
  order: 0
---

**Where this fits:** [Atlas](../../index.md) › [Tools](../index.md) › marimo

marimo is a [reactive notebook](../../reference/glossary.md#reactive-notebook) for Python. Change a value and every cell that depends on it runs again, so what you see always matches the code. We use it for job calculations, for R&D, and for every [explorable explanation](../../reference/glossary.md#explorable-explanation) on this site.

## Why we use it

- **No hidden state.** A notebook gives the same result however you got there, so a checker who reruns it sees what you saw.
- **Plain Python files.** A notebook is a `.py` file. It diffs in git, a reviewer can read it, and other code can import its functions.
- **Runs in the browser.** Through [Pyodide](../../reference/glossary.md#pyodide), a notebook runs inside a web page without a server. That's how the sliders on [Bearing capacity](../../fundamentals/bearing-capacity.mdx) work.
- **Apps and scripts too.** The same file runs as an app with the code hidden, or as a script that regenerates a report.

## Getting started

[Learn marimo](getting-started/index.md) is a ten-part tutorial made of marimo's own tutorials, running in your browser.

## Reference

marimo isn't our package, so its API reference stays on [docs.marimo.io](https://docs.marimo.io/api/).

## Where you'll meet it here

- [Bearing capacity](../../fundamentals/bearing-capacity.mdx): an explorable with sliders for the friction angle and the footing's width and depth.
- [IAEG 2026](../../case-studies/iaeg-2026/index.md): six notebooks that go from CPTs and GeoTOP to a probabilistic soil model.
- [Getting started with SymEval](../symeval/getting-started.py): calculations with units, step by step.

---

Sources: [marimo documentation](https://docs.marimo.io). Checked 2026-11-13.
