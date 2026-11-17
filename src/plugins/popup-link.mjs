// The markup src/components/popup-link.js shows a card for: a link wrapped in
//   <popup-link data-term="Title" data-definition="The gist."><a href="...">...</a></popup-link>
// with data-term optional. Glossary terms (remark-glossary.mjs) and citations
// (rehype-citation-cards.mjs) both use it, so they look and behave alike.
// The classes give the link inside a dotted underline and a help cursor.
export const popupLinkTag = "popup-link";

const classNames = [
  "*:underline",
  "*:decoration-dotted",
  "*:decoration-2",
  "*:underline-offset-3",
  "*:cursor-help",
];

// The element's properties, as hast properties or mdast hProperties. A missing term is left out.
export const popupLinkProperties = ({ term, definition }) => ({
  className: [...classNames],
  dataTerm: term,
  dataDefinition: definition,
});
