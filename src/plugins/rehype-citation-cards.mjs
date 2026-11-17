// Citation cards, after rehype-citation has turned [@citekey] into links.
// - rehype-citation puts each entry's full reference in the link's data-citation
//   attribute (its tooltipAttribute option). This moves it onto a wrapping pop-up
//   link (popup-link.mjs), so citations get the same card and the same dotted
//   underline as glossary terms.
// - rehype-citation appends the cited entries as <div id="refs"> without a heading;
//   this puts a "References" heading above it, as Quarto does.
import { visit } from "unist-util-visit";
import { popupLinkProperties, popupLinkTag } from "./popup-link.mjs";

export function rehypeCitationCards() {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      const reference = node.properties?.dataCitation;
      if (node.tagName !== "a" || !reference || !parent) {
        return;
      }
      delete node.properties.dataCitation;
      parent.children[index] = {
        type: "element",
        tagName: popupLinkTag,
        properties: popupLinkProperties({ definition: reference }),
        children: [node],
      };
    });
    visit(tree, "element", (node, index, parent) => {
      if (node.properties?.id !== "refs" || !parent) {
        return;
      }
      parent.children.splice(index, 0, {
        type: "element",
        tagName: "h2",
        properties: {},
        children: [{ type: "text", value: "References" }],
      });
      return index + 2;
    });
  };
}
