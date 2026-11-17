// <popup-link>: a link that shows a card with the gist of where it goes.
//
//   <popup-link data-term="Title" data-definition="The gist."><a href="...">...</a></popup-link>
//
// data-term is optional. Here src/plugins/popup-link.mjs writes this markup for
// glossary terms and citations; any site that writes it gets the same card. The
// element has no shadow root, so the page's own styles reach the link, and the
// card's classes are all in `classNames`, for another site to swap.
//
// One card serves the whole page and is each link's accessible description.
// - Mouse: hovering a link shows its card after 200 ms; a click navigates.
// - Keyboard: focus shows the card, Enter navigates, Escape closes it.
// - Touch or pen: the first tap shows the card instead of navigating; a second tap
//   on the same link, or the link in the card, navigates. A tap outside the link
//   and the card closes it. Each tap is judged by the pointer that made it, so a
//   mouse click on a touchscreen laptop still navigates at once.
(() => {
  if (customElements.get("popup-link")) {
    return;
  }
  const classNames = {
    card: "fixed z-1000 w-max max-w-card rounded-lg border border-doc-border bg-doc-surface px-3 py-2.5 text-sm leading-normal text-doc-muted shadow-md",
    title: "mb-0.5 block min-h-6 font-semibold text-doc-text underline decoration-1 underline-offset-3",
    reference: "mt-1 block min-h-6 font-medium text-doc-accent-text underline decoration-1 underline-offset-3",
  };
  const card = document.createElement("div");
  card.className = classNames.card;
  card.id = "popup-card";
  card.hidden = true;
  // A glossary term's card links its title; a citation's card, its reference.
  const title = document.createElement("a");
  title.className = classNames.title;
  const body = document.createElement("span");
  const reference = document.createElement("a");
  reference.className = classNames.reference;
  reference.textContent = "Go to reference";
  card.append(title, body, reference);

  let timer;
  let current; // the <popup-link> whose card is open
  let tapped; // its link, when a tap opened the card; only such a link has aria-expanded
  let pointer; // the link and pointer type of the last pointerdown on a link
  const margin = 12;
  const gap = 6;

  const place = () => {
    const link = current?.link?.getClientRects()[0];
    if (!link) {
      return;
    }
    const size = card.getBoundingClientRect();
    const above = link.top - gap - size.height;
    const left = Math.min(link.left, window.innerWidth - margin - size.width);
    card.style.left = `${Math.max(margin, left)}px`;
    card.style.top = `${above < 72 ? link.bottom + gap : above}px`;
  };
  const hide = () => {
    clearTimeout(timer);
    tapped?.setAttribute("aria-expanded", "false");
    tapped = undefined;
    current = undefined;
    card.hidden = true;
  };
  const show = (popup, { tap = false } = {}) => {
    clearTimeout(timer);
    if (current !== popup) {
      hide();
    }
    current = popup;
    const { term, definition } = popup.dataset;
    const href = popup.link.getAttribute("href");
    title.textContent = term ?? "";
    title.hidden = !term;
    title.href = href;
    body.textContent = definition ?? "";
    reference.hidden = Boolean(term);
    reference.href = href;
    if (tap) {
      tapped = popup.link;
      tapped.setAttribute("aria-controls", card.id);
      tapped.setAttribute("aria-expanded", "true");
    }
    card.hidden = false;
    place();
  };
  const later = (next, delay) => {
    clearTimeout(timer);
    timer = setTimeout(next, delay);
  };
  const isMouse = (event) => event.pointerType === "mouse";
  // The script runs in <head>: a parsed <popup-link> connects before its link
  // does, and before there is a <body> to hold the card.
  const whenParsed = (next) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", next, { once: true });
    } else {
      next();
    }
  };

  class PopupLink extends HTMLElement {
    constructor() {
      super();
      this.addEventListener("pointerenter", (event) => isMouse(event) && later(() => this.link && show(this), 200));
      this.addEventListener("pointerleave", (event) => isMouse(event) && !tapped && later(hide, 150));
      this.addEventListener("focusin", () => this.link && show(this));
      this.addEventListener("focusout", (event) => !card.contains(event.relatedTarget) && hide());
      // A click doesn't say which pointer made it everywhere, so its pointerdown does.
      this.addEventListener("pointerdown", (event) => {
        pointer = { link: event.target.closest("a"), type: event.pointerType };
      });
      this.addEventListener("pointercancel", () => {
        pointer = undefined;
      });
      this.addEventListener("click", (event) => {
        const link = event.target.closest("a");
        const tap = pointer?.link === link && (pointer.type === "touch" || pointer.type === "pen");
        pointer = undefined;
        if (!tap || link !== this.link) {
          return;
        }
        if (tapped === link) {
          hide();
          return;
        }
        event.preventDefault();
        show(this, { tap: true });
      });
    }

    connectedCallback() {
      whenParsed(() => this.link?.setAttribute("aria-describedby", card.id));
    }

    get link() {
      return this.querySelector("a");
    }
  }

  card.addEventListener("pointerenter", (event) => isMouse(event) && clearTimeout(timer));
  card.addEventListener("pointerleave", (event) => isMouse(event) && !tapped && later(hide, 150));
  card.addEventListener("focusout", (event) => {
    if (current && !card.contains(event.relatedTarget) && event.relatedTarget !== current.link) {
      hide();
    }
  });
  // Closes the card for a same-page anchor, such as a term on the glossary page.
  card.addEventListener("click", (event) => event.target.closest("a") && hide());
  // pointerdown, not click: iOS Safari fires no click on plain text.
  document.addEventListener(
    "pointerdown",
    (event) => current && !card.contains(event.target) && !current.contains(event.target) && hide(),
    { capture: true },
  );
  window.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !current) {
      return;
    }
    if (card.contains(document.activeElement)) {
      current.link.focus();
    }
    hide();
  });
  window.addEventListener("scroll", () => current && place(), { passive: true, capture: true });

  whenParsed(() => document.body.append(card));
  customElements.define("popup-link", PopupLink);
})();
