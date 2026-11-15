---
title: SymEval
description: Our open-source package that shows a calculation the way a checker wants to see it, from formula to values with units to result.
type: tool
sidebar:
  label: About SymEval
  order: 0
---

**Where this fits:** [Docs Atlas](../../index.md) › [Tools](../index.md) › SymEval

SymEval is Bedrock.engineer's Python package for [calculation reports](../../reference/glossary.md#calculation-report). You write a formula with SymPy and give the inputs as [physical quantities](../../reference/glossary.md#physical-quantity): values with units. SymEval then shows the three lines of a hand calculation. For the bearing capacity factor N_q with a friction angle of 30°, those lines are:

| Step | |
| --- | --- |
| Formula | $N_q = e^{\pi \tan\varphi'}\,\tan^2(45^\circ + \varphi'/2)$ |
| Values substituted | $N_q = e^{\pi \tan 30^\circ}\,\tan^2(45^\circ + 30^\circ/2)$ |
| Result | $N_q = 18.4$ |

## Why it fits geotechnical work

- **A checker can follow every step.** Each result comes with its formula and the numbers that went in, so nobody has to trust a spreadsheet cell.
- **Units can't go wrong quietly.** kPa, kN/m² and MPa convert by themselves, and adding a length to a stress fails with an error.
- **One formula, many rows.** `quantity_evalf()` runs a formula over a dataframe, for example every footing on a foundation plan, and shows the steps for the one you pick.
- **Live in marimo.** In a [marimo](../marimo/index.md) notebook, move a slider and every step updates, which turns a calculation into an [explorable explanation](../../reference/glossary.md#explorable-explanation).

## Getting started

The [Getting started](getting-started.py) tutorial builds up from one formula, the axial stress in a member, to a dataframe of members, a chain of formulas for the axial resistance of a steel column, and the ideal gas law with an animated piston. It runs in your browser.

Install it with `uv add symeval`.

## Reference

The API reference is still in the [SymEval documentation](https://bedrock-engineer.github.io/symeval/). See also [GitHub](https://github.com/bedrock-engineer/symeval) and [PyPI](https://pypi.org/project/symeval/).

## Where it fits on these pages

- [Bearing capacity](../../fundamentals/bearing-capacity.mdx): writing up N_q and the bearing resistance for a footing.
- [Spread foundations](../../structures/spread-foundations.md): the bearing and sliding checks in a calculation report.

---

Sources: SymEval 0.5.3 and its `examples/getting_started.py`. Checked 2026-11-13.
