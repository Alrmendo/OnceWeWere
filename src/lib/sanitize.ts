import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = ["p", "br", "strong", "em", "ul", "ol", "li", "img"];
const ALLOWED_ATTR = ["src", "alt"];

export function sanitizePostBody(html: string): string {
  return DOMPurify.sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR });
}

/**
 * An "empty" Tiptap doc still serializes to markup like "<p></p>", so a
 * plain string-emptiness check on the HTML source doesn't work. A post
 * containing only an image (no text) is valid, non-empty content.
 */
export function isPostBodyEmpty(html: string): boolean {
  if (/<img[\s>]/i.test(html)) return false;
  const text = html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .trim();
  return text.length === 0;
}
