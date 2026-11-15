// Obsidian callouts to <details>. "> [!note]- Title" becomes a closed fold
// with that title as its summary; "+" opens it; no sign keeps it open.
import { visit } from "unist-util-visit";

const MARKER = /^\[!(\w+)\]([-+]?)[ \t]*([^\n]*)\n?/;

export function remarkObsidianCallouts() {
  return (tree) => {
    visit(tree, "blockquote", (node) => {
      const para = node.children[0];
      const first = para?.type === "paragraph" ? para.children[0] : undefined;
      const match = first?.type === "text" ? first.value.match(MARKER) : null;
      if (!match) return;
      const [whole, kind, fold, title] = match;
      first.value = first.value.slice(whole.length);
      if (!first.value) para.children.shift();
      if (para.children.length === 0) node.children.shift();
      node.children.unshift({
        type: "paragraph",
        data: { hName: "summary" },
        children: [{ type: "text", value: title || kind }],
      });
      node.data = {
        hName: "details",
        hProperties: { className: ["learn-more", `callout-${kind.toLowerCase()}`], open: fold !== "-" },
      };
    });
  };
}
