// A paragraph holding only an image of a local .svg becomes that SVG, inline.
// Inline, its token classes (fill-doc-line, stroke-doc-accent, …) follow the
// light and dark theme, which an <img> can't. The page keeps a plain image
// link, so it imports nothing and still shows the figure on GitHub and in
// Obsidian.
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { visit } from "unist-util-visit";

const classNames = { figure: "my-6" };

export function remarkInlineSvg() {
  return (tree, file) => {
    if (!file.path) {
      return;
    }
    visit(tree, "paragraph", (node, index, parent) => {
      const [image, ...rest] = node.children;
      if (rest.length > 0 || image?.type !== "image" || !/^\.{1,2}\/.*\.svg$/.test(image.url)) {
        return;
      }
      const svg = readFileSync(resolve(dirname(file.path), image.url), "utf8").replace(/^<\?xml[^>]*>\s*/, "");
      parent.children[index] = { type: "html", value: `<figure class="${classNames.figure}">${svg.trim()}</figure>` };
    });
  };
}
