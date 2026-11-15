// Obsidian callouts to <details>. "> [!note]- Title" becomes a closed fold
// with that title as its summary; "+" opens it; no sign keeps it open.
import { visit } from "unist-util-visit";

const MARKER = /^\[!(\w+)\]([-+]?)[ \t]*([^\n]*)\n?/;

const classNames = {
  details: "group rounded-md border border-l-4 border-doc-border border-l-doc-accent bg-doc-fold px-4 py-2",
  summary: "cursor-pointer font-semibold text-doc-text group-open:mb-2",
};

export function remarkObsidianCallouts() {
  return (tree) => {
    visit(tree, "blockquote", (node) => {
      const para = node.children[0];
      const first = para?.type === "paragraph" ? para.children[0] : undefined;
      const match = first?.type === "text" ? first.value.match(MARKER) : null;
      if (!match) {
        return;
      }
      const [whole, kind, fold, title] = match;
      first.value = first.value.slice(whole.length);
      if (!first.value) {
        para.children.shift();
      }
      if (para.children.length === 0) {
        node.children.shift();
      }
      node.children.unshift({
        type: "paragraph",
        data: { hName: "summary", hProperties: { className: classNames.summary.split(" ") } },
        children: [{ type: "text", value: title || kind }],
      });
      node.data = {
        hName: "details",
        hProperties: { className: classNames.details.split(" "), open: fold !== "-" },
      };
    });
  };
}
