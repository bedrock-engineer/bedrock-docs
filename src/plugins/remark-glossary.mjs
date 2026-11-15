// Glossary links and relative page links.
// - A link to glossary.md#<term> is wrapped in <span class="glossary-term">
//   carrying the term's first paragraph, which src/scripts/glossary.js shows on hover.
//   A term is a ### heading in the glossary; its first paragraph is the hover text.
// - Any relative .md or .mdx link, or .py link to a marimo notebook, is rewritten to
//   its Starlight route, so the source stays a plain link that works on GitHub and in
//   Obsidian, and that survives moving the whole folder to another site.
// - A root-relative link (/tools/...) gets the site's base path, so pages never write it.
// - The glossary terms a page links are listed under "Key terms" at its end.
import { readFileSync } from "node:fs";
import path from "node:path";
import GithubSlugger, { slug as slugify } from "github-slugger";
import { toString } from "mdast-util-to-string";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { visit } from "unist-util-visit";

function readGlossary(file) {
  const tree = unified().use(remarkParse).parse(readFileSync(file, "utf8"));
  const slugger = new GithubSlugger();
  const terms = {};
  tree.children.forEach((node, index) => {
    if (node.type !== "heading") return;
    const id = slugger.slug(toString(node));
    const next = tree.children[index + 1];
    if (node.depth === 3 && next?.type === "paragraph") {
      terms[id] = { title: toString(node), definition: toString(next) };
    }
  });
  return terms;
}

export function remarkGlossary({ base = "", contentDir, glossaryFile }) {
  const terms = readGlossary(glossaryFile);
  const prefix = base.replace(/\/$/, "");
  const route = (from, href) => {
    const [target, hash] = href.split("#");
    if (/^[a-z]+:|^\/\//i.test(target)) return undefined;
    if (target.startsWith("/")) return target.startsWith(prefix + "/") ? undefined : prefix + href;
    if (!/\.(mdx?|py)$/.test(target)) return undefined;
    const absolute = path.resolve(path.dirname(from), target);
    // Astro's content IDs: the path without its extension, each segment slugified.
    const slug = path.relative(contentDir, absolute).replace(/\.(mdx?|py)$/, "").split(path.sep)
      .map((segment) => slugify(segment)).join("/").replace(/(^|\/)index$/, "");
    return `${prefix}/${slug ? slug + "/" : ""}${hash ? "#" + hash : ""}`;
  };
  return (tree, file) => {
    const from = file.path;
    const isGlossary = path.resolve(from) === path.resolve(glossaryFile);
    const used = new Map();
    visit(tree, "link", (node, index, parent) => {
      const term = node.url.match(/glossary\.mdx?#([\w-]+)$/)?.[1];
      const url = route(from, node.url);
      if (url) node.url = url;
      if (!term || !terms[term] || parent.type === "glossaryTerm") return;
      if (!used.has(term)) used.set(term, node.url);
      parent.children[index] = {
        type: "glossaryTerm",
        data: {
          hName: "span",
          hProperties: { className: ["glossary-term"], dataTerm: terms[term].title, dataDefinition: terms[term].definition },
        },
        children: [node],
      };
    });
    visit(tree, "html", (node) => {
      node.value = node.value.replace(/href="([^"#][^"]*)"/g, (all, href) => {
        const url = route(from, href);
        return url ? `href="${url}"` : all;
      });
    });
    if (isGlossary || used.size === 0) return;
    tree.children.push(
      { type: "heading", depth: 2, children: [{ type: "text", value: "Key terms" }] },
      {
        type: "list",
        ordered: false,
        spread: false,
        children: [...used].map(([term, url]) => ({
          type: "listItem",
          spread: false,
          children: [{
            type: "paragraph",
            children: [{
              type: "glossaryTerm",
              data: { hName: "span", hProperties: { className: ["glossary-term"], dataTerm: terms[term].title, dataDefinition: terms[term].definition } },
              children: [{ type: "link", url, children: [{ type: "text", value: terms[term].title }] }],
            }],
          }],
        })),
      },
    );
  };
}
