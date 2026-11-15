# bedrock-docs

A prototype of the Bedrock.engineer docs: how geotechnical engineering fits together,
from ground investigation to the design of each structure, with notebooks that run in
your browser. Built with [Astro Starlight](https://starlight.astro.build) and
[marimo](https://marimo.io). The pages will move into
[bedrock-web](https://github.com/bedrock-engineer/bedrock-web) once the structure settles.

```
src/content/docs/       the pages (Starlight reads only this folder)
├── index.md            the atlas
├── structures/  fundamentals/  case-studies/
├── tools/<tool>/       tool page, getting started, guides, examples, reference
├── reference/          glossary and other look-up pages
└── contributing/       how to write a page: for people and agents alike
src/components/ plugins/ scripts/ styles/   glossary hovers, Learn more folds, marimo runtime
sources.yaml            files copied from other repositories, pinned, and notebook page modes
scripts/docs/           Python, run with uv: copy sources, turn notebooks into pages
```

## Run it

You need [pnpm](https://pnpm.io), [uv](https://docs.astral.sh/uv/) and
[just](https://just.systems).

```sh
just install
just dev
```

Pages with marimo cells compile them with uv on first build, which takes a minute;
later builds reuse the result. In the browser the cells run in Pyodide, loaded from
cdn.jsdelivr.net, so the first page with cells takes a while to open.

See [Writing a page](src/content/docs/contributing/index.md) for everything else.
