// @ts-check
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { rehypeHeadingIds, unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import starlight from "@astrojs/starlight";
import { remarkMarimo } from "@marimo-team/mdx-marimo/remark";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import starlightLinksValidator from "starlight-links-validator";
import starlightLlmsTxt from "starlight-llms-txt";
import { remarkGlossary } from "./src/plugins/remark-glossary.mjs";
import { remarkObsidianCallouts } from "./src/plugins/remark-obsidian-callouts.mjs";

const contentDir = fileURLToPath(new URL("./src/content/docs/", import.meta.url));
const glossary = [remarkGlossary, { contentDir, glossaryFile: contentDir + "reference/glossary.md" }];
// marimo cells only in .mdx: marimo turns ```python marimo fences into MDX islands.
const mdxOnly = (plugin) => (options) => {
  const transform = plugin(options);
  return (tree, file) => (file.path?.endsWith(".mdx") ? transform(tree, file) : undefined);
};
const remarkPlugins = [remarkMath, remarkObsidianCallouts, glossary, mdxOnly(remarkMarimo)];
const rehypePlugins = [rehypeHeadingIds, rehypeKatex];
const glossaryScript = readFileSync(new URL("./src/scripts/glossary.js", import.meta.url), "utf8");

// mdx-marimo runs uv to compile the marimo cells. Without this it picks the uv of the
// @manzt/uv npm package, whose install script pnpm skips; on Windows it would also spawn
// node_modules/.bin/uv.cmd without a shell, which Node refuses (spawn EINVAL).
process.env.MDX_MARIMO_UV ??= "uv";

// https://astro.build/config
export default defineConfig({
  // Not deployed yet: the address is a placeholder until the deploy target is chosen.
  site: "https://bedrock-docs.pages.dev",
  integrations: [
    starlight({
      title: "Bedrock.engineer docs",
      description: "How geotechnical engineering fits together, with notebooks you can run in your browser.",
      plugins: [
        starlightLinksValidator(),
        // /llms.txt, /llms-full.txt and /llms-small.txt: the same pages, for agents.
        starlightLlmsTxt({
          projectName: "Bedrock.engineer docs",
          details: [
            "The docs are a graph: the atlas links to one hub per structure or ground stage, hubs link to",
            "fundamentals, how-tos, case studies and tools, and every term links to the one glossary,",
            "where each term keeps one meaning. Start from the set that fits your question.",
          ].join(" "),
          customSets: [
            { label: "Glossary", paths: ["reference/glossary"], description: "every term, with one meaning each" },
            {
              label: "Contributing",
              paths: ["contributing/**"],
              description: "how to write and change these docs: page types, front matter, notebooks, sources",
            },
          ],
        }),
      ],
      components: {
        // Adds the marimo runtime to pages with marimo cells, so pages need no imports.
        MarkdownContent: "./src/components/MarkdownContent.astro",
      },
      customCss: ["./src/styles/docs.css", "katex/dist/katex.min.css", "@marimo-team/mdx-marimo/styles.css"],
      head: [{ tag: "script", content: glossaryScript }],
      lastUpdated: true,
      editLink: { baseUrl: "https://github.com/bedrock-engineer/bedrock-docs/edit/main/" },
      social: [{ icon: "github", label: "GitHub", href: "https://github.com/bedrock-engineer/bedrock-docs" }],
      sidebar: [
        { label: "Atlas", link: "/" },
        { label: "Structures", items: [{ autogenerate: { directory: "structures" } }] },
        { label: "Fundamentals", items: [{ autogenerate: { directory: "fundamentals" } }] },
        {
          label: "Case studies",
          items: [{ label: "IAEG 2026 soft-soil model", items: [{ autogenerate: { directory: "case-studies/iaeg-2026" } }] }],
        },
        {
          label: "Tutorials",
          items: [
            { label: "Learn marimo", link: "/tools/marimo/getting-started/" },
            { label: "Getting started with SymEval", link: "/tools/symeval/getting-started/" },
          ],
        },
        {
          label: "Tools",
          items: [
            { label: "Overview", link: "/tools/" },
            {
              label: "marimo",
              collapsed: true,
              items: [
                { label: "About marimo", link: "/tools/marimo/" },
                { label: "Learn marimo", items: [{ autogenerate: { directory: "tools/marimo/getting-started" } }] },
              ],
            },
            { label: "SymEval", collapsed: true, items: [{ autogenerate: { directory: "tools/symeval" } }] },
            {
              label: "cpt-anywidget",
              collapsed: true,
              items: [
                { label: "About cpt-anywidget", link: "/tools/cpt-anywidget/" },
                { label: "Getting started", link: "/tools/cpt-anywidget/getting-started/" },
                { label: "Edit layers", link: "/tools/cpt-anywidget/edit-layers/" },
                { label: "Examples", items: [{ autogenerate: { directory: "tools/cpt-anywidget/examples" } }] },
                { label: "Reference", items: [{ autogenerate: { directory: "tools/cpt-anywidget/reference" } }] },
              ],
            },
          ],
        },
        { label: "Reference", items: [{ autogenerate: { directory: "reference" } }] },
        { label: "Contributing", collapsed: true, items: [{ autogenerate: { directory: "contributing" } }] },
      ],
    }),
    // .mdx shares the Markdown processor, so Starlight's asides and the link check run
    // on both. In .mdx, ```python marimo fences become islands that run at build time
    // and again in the reader's browser.
    mdx(),
  ],
  markdown: { processor: unified({ remarkPlugins, rehypePlugins }) },
});
