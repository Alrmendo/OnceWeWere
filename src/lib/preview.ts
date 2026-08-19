const SNIPPET_MAX = 140;

export interface PostPreview {
  imageSrc: string | null;
  heading: string | null;
  snippet: string;
  isEmpty: boolean;
}

const EMPTY_PREVIEW: PostPreview = {
  imageSrc: null,
  heading: null,
  snippet: "",
  isEmpty: true,
};

// posts.body only ever contains the fixed tag set produced by the editor
// and enforced by sanitizePostBody's allowlist (p, br, strong, em, h2, ul,
// ol, li, img) — small and fully under our control, so a lightweight
// regex pass is enough here and avoids pulling in a full DOM.
function decodeEntities(text: string): string {
  return text
    .replace(/&nbsp;/gi, " ")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&amp;/gi, "&");
}

// <br> and block-closing tags carry no text of their own, so stripping tags
// naively glues adjacent lines/list items together ("item oneitem two").
// Turn those into spaces before stripping the rest.
function stripTagsToText(html: string): string {
  const withBreaks = html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/(p|li|h2|div)>/gi, " ");
  const stripped = withBreaks.replace(/<[^>]*>/g, "");
  return decodeEntities(stripped).replace(/\s+/g, " ").trim();
}

function extractFirstImageSrc(html: string): string | null {
  const imgTag = html.match(/<img\b[^>]*>/i)?.[0];
  if (!imgTag) return null;
  const src = imgTag.match(/\bsrc\s*=\s*["']([^"']*)["']/i)?.[1]?.trim();
  return src || null;
}

// Rule 2 vs 7: only a *leading* heading gets special lead-in treatment; a
// leading list just flows into the snippet like normal text. A leading
// <img> (inserted before any text) doesn't disqualify a heading right
// after it.
function extractLeadingHeading(html: string): { heading: string | null; rest: string } {
  const match = html.match(/^\s*(?:<img\b[^>]*>\s*)*<h2\b[^>]*>([\s\S]*?)<\/h2>/i);
  if (!match) return { heading: null, rest: html };

  const heading = stripTagsToText(match[1]);
  if (!heading) return { heading: null, rest: html };

  return { heading, rest: html.slice(match.index! + match[0].length) };
}

function truncateAtWordBoundary(text: string, max: number): { text: string; truncated: boolean } {
  if (text.length <= max) return { text, truncated: false };
  const slice = text.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > 0 ? slice.slice(0, lastSpace) : slice;
  return { text: cut.trimEnd(), truncated: true };
}

/**
 * Builds a listing-page preview from sanitized post HTML, per CLAUDE.md
 * mục 11's priority-ordered rules — never just slices the raw HTML string
 * (that leaked tags like `<img src=...` straight into the UI).
 *
 * Must never throw: one post's unexpected body should degrade to an
 * empty-looking preview for that card, not take down the whole listing
 * page render.
 */
export function buildPostPreview(bodyHtml: string): PostPreview {
  if (typeof bodyHtml !== "string" || !bodyHtml.trim()) {
    return EMPTY_PREVIEW;
  }

  try {
    // Rule 1: first image found anywhere in the post.
    const imageSrc = extractFirstImageSrc(bodyHtml);

    // Rule 3 / 7: flatten everything after a leading heading (if any) into
    // one continuous block — entities decoded, tags stripped.
    const { heading, rest } = extractLeadingHeading(bodyHtml);
    const fullText = stripTagsToText(rest);

    // Rule 5: image-only post — no placeholder/ellipsis noise.
    if (imageSrc && !heading && fullText.length === 0) {
      return { imageSrc, heading: null, snippet: "", isEmpty: false };
    }

    // Rule 6: nothing at all.
    if (!imageSrc && !heading && fullText.length === 0) {
      return EMPTY_PREVIEW;
    }

    // Rule 3 + 4: cut at a word boundary, only add "…" when actually truncated.
    const { text: snippetText, truncated } = truncateAtWordBoundary(fullText, SNIPPET_MAX);
    const snippet = truncated ? `${snippetText}…` : snippetText;

    return { imageSrc, heading, snippet, isEmpty: false };
  } catch {
    return EMPTY_PREVIEW;
  }
}
