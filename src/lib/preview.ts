import { JSDOM } from "jsdom";

const SNIPPET_MAX = 140;

export interface PostPreview {
  imageSrc: string | null;
  heading: string | null;
  snippet: string;
  isEmpty: boolean;
}

function truncateAtWordBoundary(text: string, max: number): { text: string; truncated: boolean } {
  if (text.length <= max) return { text, truncated: false };
  const slice = text.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > 0 ? slice.slice(0, lastSpace) : slice;
  return { text: cut.trimEnd(), truncated: true };
}

const BLOCK_TAGS = new Set(["P", "LI", "H2", "UL", "OL", "DIV"]);

/**
 * Plain `.textContent` glues adjacent blocks/lines together with no
 * separator (`<br>` and block boundaries carry no text of their own), e.g.
 * two `<li>`s would flatten into "item oneitem two". Walk the tree and
 * insert a space at every <br> and block-element boundary instead.
 */
function collectText(node: Element): string {
  let out = "";
  for (const child of Array.from(node.childNodes)) {
    if (child.nodeType === 3) {
      out += child.textContent ?? "";
    } else if (child.nodeType === 1) {
      const el = child as Element;
      if (el.tagName === "BR") {
        out += " ";
      } else if (BLOCK_TAGS.has(el.tagName)) {
        out += collectText(el) + " ";
      } else {
        out += collectText(el);
      }
    }
  }
  return out;
}

/**
 * Builds a listing-page preview from sanitized post HTML, per CLAUDE.md
 * mục 11's priority-ordered rules — never just slices the raw HTML string
 * (that leaked tags like `<img src=...` straight into the UI).
 */
export function buildPostPreview(bodyHtml: string): PostPreview {
  if (!bodyHtml.trim()) {
    return { imageSrc: null, heading: null, snippet: "", isEmpty: true };
  }

  const dom = new JSDOM(`<div id="root">${bodyHtml}</div>`);
  const root = dom.window.document.getElementById("root")!;

  // Rule 1: first image found anywhere in the post.
  const img = root.querySelector("img");
  const imageSrc = img?.getAttribute("src") ?? null;

  // Rule 2 vs 7: only a *leading* heading gets special lead-in treatment;
  // a leading list just flows into the snippet like normal text.
  const firstBlock = root.querySelector("h2, ul, ol, p");
  let heading: string | null = null;
  if (firstBlock?.tagName === "H2") {
    const headingText = (firstBlock.textContent ?? "").replace(/\s+/g, " ").trim();
    if (headingText) heading = headingText;
  }

  // Rule 3 / 7: flatten all text (lists included) into one continuous
  // block — entities are already decoded by the DOM, no manual work needed.
  let fullText = collectText(root).replace(/\s+/g, " ").trim();
  if (heading && fullText.startsWith(heading)) {
    fullText = fullText.slice(heading.length).trim();
  }

  // Rule 5: image-only post — no placeholder/ellipsis noise.
  if (imageSrc && !heading && fullText.length === 0) {
    return { imageSrc, heading: null, snippet: "", isEmpty: false };
  }

  // Rule 6: nothing at all.
  if (!imageSrc && !heading && fullText.length === 0) {
    return { imageSrc: null, heading: null, snippet: "", isEmpty: true };
  }

  // Rule 3 + 4: cut at a word boundary, only add "…" when actually truncated.
  const { text: snippetText, truncated } = truncateAtWordBoundary(fullText, SNIPPET_MAX);
  const snippet = truncated ? `${snippetText}…` : snippetText;

  return { imageSrc, heading, snippet, isEmpty: false };
}
