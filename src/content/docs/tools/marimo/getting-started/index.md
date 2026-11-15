---
title: Learn marimo
description: marimo's own ten tutorials, running in your browser, from your first reactive cell to SQL, layouts and the file format.
type: tutorial
tutorial: Learn marimo
sidebar:
  label: About this tutorial
  order: 0
---

**Where this fits:** [Atlas](../../../index.md) › [Tools](../../index.md) › [marimo](../index.md) › Learn marimo

[marimo](../index.md) is the [reactive notebook](../../../reference/glossary.md#reactive-notebook) behind every notebook and explorable on this site. These are marimo's own tutorials, unchanged. Each part runs in your browser, so you can change the code and see what happens.

## Learn marimo

Take them in order, or jump to the one you need.

1. [Welcome to marimo](intro.py): reactive execution, UI elements, and running a notebook as an app.
2. [How marimo notebooks run](dataflow.py): the dataflow graph, and the few rules it puts on your variables.
3. [UI elements](ui.py): sliders, dropdowns and forms, and how an interaction reruns cells.
4. [Markdown](markdown.py): text and LaTeX, with Python values, plots and UI elements inside the text.
5. [Plotting](plots.py): matplotlib, interactive plots and reactive selections.
6. [SQL](sql.py): SQL cells that query dataframes and files with DuckDB, and hand the result back to Python.
7. [Layout](layout.py): rows and columns, accordions, tabs, trees and callouts.
8. [The file format](fileformat.py): what a notebook looks like as a `.py` file, and how to import functions from it.
9. [External dependencies](external_dependencies.py): declaring packages inside the notebook, so it runs anywhere with uv.
10. [marimo for Jupyter users](for_jupyter_users.py): what works differently from Jupyter, and why.

Coming from Jupyter? Read the last one first. To open a tutorial in marimo's own editor, run `uvx marimo tutorial intro`, or `dataflow`, `ui` and so on.

> [!note]- Learn more: how these pages are made
> Each part is the `.py` file that marimo 0.25.2 ships, copied in unchanged as a [source](../../../reference/glossary.md#source). Its page is in [islands](../../../reference/glossary.md#page-mode) mode: when the site is built, its cells run once in Python so the page opens with their output, and in your browser [Pyodide](../../../reference/glossary.md#pyodide) then takes over, so the sliders and buttons work. A few cells show things a web page can't do, such as reading files from your disk; those work in marimo itself.

---

Sources: the marimo 0.25.2 tutorials (Apache-2.0). Checked 2026-11-13.
