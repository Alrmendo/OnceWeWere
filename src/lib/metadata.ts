import type { Metadata } from "next";
import { CATEGORY_META } from "./categories";
import { formatPostDate, firstLine } from "./format";
import { getSiteUrl } from "./site";
import type { Post, PostCategory } from "./posts";

export function buildPostMetadata(category: PostCategory, post: Post): Metadata {
  const meta = CATEGORY_META[category];
  const title = `${meta.label} · ${formatPostDate(post.date)}`;
  const description = firstLine(post.body, 160) || meta.description;
  const path = `/${category}/${post.slug}`;
  const url = `${getSiteUrl()}${path}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `onceweweré · ${title}`,
      description,
      url,
      siteName: "onceweweré",
      type: "article",
      locale: "vi_VN",
    },
    twitter: {
      card: "summary",
      title: `onceweweré · ${title}`,
      description,
    },
  };
}
