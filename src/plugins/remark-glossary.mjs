// Glossary links and relative page links.
// - A link to glossary.md#<term> is wrapped in a <span data-term data-definition>
//   carrying the term's first paragraph, which src/scripts/glossary.js shows on hover.
//   The span's classes give the link inside a dotted underline and a help cursor.
//   A term is a ### heading in the glossary; its first paragraph is the hover text.
//   Aliases in parentheses at the end of the heading are link targets too.
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

// Also used by rehype-citation-cards.mjs, so citations look like glossary links.
export const classNames = [
  "*:underline",
  "*:decoration-dotted",
  "*:decoration-2",
  "*:underline-offset-3",
  "*:cursor-help",
];

const glossaryTerm = ({ title, definition }) => ({
  hName: "span",
  hProperties: { className: [...classNames], dataTerm: title, dataDefinition: definition },
});

// A term heading may end in its aliases: "Cone penetration test (CPT)", or
// "Serviceability limit state (SLS, serviceability)". The term can then be linked
// as #cpt or #cone-penetration-test as well as by the heading's own slug.
function aliasSlugs(heading) {
  const match = heading.match(/^(.*\S)\s*\(([^)]+)\)$/);
  if (!match) {
    return [];
  }
  const [, name, aliases] = match;
  return [name, ...aliases.split(",")].map((alias) => slugify(alias.trim()));
}

function readGlossary(file) {
  const tree = unified().use(remarkParse).parse(readFileSync(file, "utf8"));
  const slugger = new GithubSlugger();
  const terms = {};
  tree.children.forEach((node, index) => {
    if (node.type !== "heading") {
      return;
    }
    const heading = toString(node);
    const id = slugger.slug(heading);
    const next = tree.children[index + 1];
    if (node.depth !== 3 || next?.type !== "paragraph") {
      return;
    }
    const term = { title: heading, definition: toString(next) };
    for (const slug of [id, ...aliasSlugs(heading)]) {
      if (terms[slug] && terms[slug] !== term) {
        throw new Error(`Glossary: "${slug}" names both "${terms[slug].title}" and "${heading}".`);
      }
      terms[slug] = term;
    }
  });
  return terms;
}

// On the glossary page each alias needs an element with its id, so #cpt jumps to
// "Cone penetration test (CPT)" and the link validator finds the anchor.
const aliasAnchorClassNames = ["block", "scroll-mt-24"];

function addAliasAnchors(tree) {
  visit(tree, "heading", (node, index, parent) => {
    const anchors = aliasSlugs(toString(node)).map((id) => ({
      type: "glossaryAlias",
      data: { hName: "span", hProperties: { id, className: aliasAnchorClassNames } },
      children: [],
    }));
    if (node.depth !== 3 || anchors.length === 0) {
      return;
    }
    parent.children.splice(index, 0, ...anchors);
    return index + anchors.length + 1;
  });
}

export function remarkGlossary({ base = "", contentDir, glossaryFile }) {
  const terms = readGlossary(glossaryFile);
  const prefix = base.replace(/\/$/, "");
  const route = (from, href) => {
    const [target, hash] = href.split("#");
    if (/^[a-z]+:|^\/\//i.test(target)) {
      return undefined;
    }
    if (target.startsWith("/")) {
      return target.startsWith(prefix + "/") ? undefined : prefix + href;
    }
    if (!/\.(mdx?|py)$/.test(target)) {
      return undefined;
    }
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
      if (url) {
        node.url = url;
      }
      if (!term || !terms[term] || parent.type === "glossaryTerm") {
        return;
      }
      if (!used.has(term)) {
        used.set(term, node.url);
      }
      parent.children[index] = {
        type: "glossaryTerm",
        data: glossaryTerm(terms[term]),
        children: [node],
      };
    });
    visit(tree, "html", (node) => {
      node.value = node.value.replace(/href="([^"#][^"]*)"/g, (all, href) => {
        const url = route(from, href);
        return url ? `href="${url}"` : all;
      });
    });
    if (isGlossary) {
      addAliasAnchors(tree);
      return;
    }
    if (used.size === 0) {
      return;
    }
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
              data: glossaryTerm(terms[term]),
              children: [{ type: "link", url, children: [{ type: "text", value: terms[term].title }] }],
            }],
          }],
        })),
      },
    );
  };
}
