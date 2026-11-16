// Glossary hover cards. The build (src/plugins/remark-glossary.mjs)
// wraps every link to a glossary term in <span data-term data-definition>.
// This script shows one shared card while such a link is hovered or focused,
// and makes the card the link's accessible description.
(() => {
  const classNames = {
    card: "fixed z-1000 w-max max-w-card rounded-lg border border-doc-border bg-doc-surface px-3 py-2.5 text-sm leading-normal text-doc-muted shadow-md",
    title: "mb-0.5 block font-semibold text-doc-text",
  };

  const card = document.createElement("div");
  card.className = classNames.card;
  card.id = "glossary-card";
  card.setAttribute("role", "tooltip");
  card.hidden = true;
  const title = document.createElement("strong");
  title.className = classNames.title;
  const body = document.createElement("span");
  card.append(title, body);

  let timer;
  let current;
  const margin = 12;
  const gap = 6;

  const place = () => {
    const link = current?.querySelector("a")?.getClientRects()[0];
    if (!link) {
      return;
    }
    const size = card.getBoundingClientRect();
    const above = link.top - gap - size.height;
    const left = Math.min(link.left, window.innerWidth - margin - size.width);
    card.style.left = `${Math.max(margin, left)}px`;
    card.style.top = `${above < 72 ? link.bottom + gap : above}px`;
  };

  const show = (term) => {
    clearTimeout(timer);
    if (current === term && !card.hidden) {
      return;
    }
    current = term;
    // Citations (src/plugins/rehype-citation-cards.mjs) have no term, only the reference.
    title.textContent = term.dataset.term ?? "";
    title.hidden = !term.dataset.term;
    body.textContent = term.dataset.definition;
    card.hidden = false;
    place();
  };

  const hide = () => {
    clearTimeout(timer);
    card.hidden = true;
    current = undefined;
  };

  const later = (next, delay) => {
    clearTimeout(timer);
    timer = setTimeout(next, delay);
  };

  const init = () => {
    document.body.append(card);
    for (const term of document.querySelectorAll("span[data-definition]")) {
      term.querySelector("a")?.setAttribute("aria-describedby", card.id);
      term.addEventListener("mouseenter", () => later(() => show(term), 200));
      term.addEventListener("mouseleave", () => later(hide, 150));
      term.addEventListener("focusin", () => show(term));
      term.addEventListener("focusout", hide);
    }
    card.addEventListener("mouseenter", () => clearTimeout(timer));
    card.addEventListener("mouseleave", () => later(hide, 150));
    window.addEventListener("keydown", (event) => event.key === "Escape" && hide());
    window.addEventListener("scroll", () => current && place(), { passive: true, capture: true });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
