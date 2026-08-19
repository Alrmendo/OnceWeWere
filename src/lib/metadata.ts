import type { Metadata } from "next";
import { CATEGORY_META } from "./categories";
import { formatPostDate, firstLine } from "./format";
import { getSiteUrl } from "./site";
import type { Post, PostCategory } from "./posts";

export const SITE_DESCRIPTION = "Nhật ký cá nhân — once, we, were.";

export function buildHomeMetadata(): Metadata {
  const url = getSiteUrl();

  return {
    description: SITE_DESCRIPTION,
    alternates: { canonical: "/" },
    openGraph: {
      title: "oncewewere",
      description: SITE_DESCRIPTION,
      url,
      siteName: "oncewewere",
      type: "website",
      locale: "vi_VN",
    },
    twitter: {
      card: "summary",
      title: "oncewewere",
      description: SITE_DESCRIPTION,
    },
  };
}

export function buildCategoryMetadata(category: PostCategory): Metadata {
  const meta = CATEGORY_META[category];
  const path = `/${category}`;
  const url = `${getSiteUrl()}${path}`;

  return {
    title: meta.label,
    description: meta.description,
    alternates: { canonical: path },
    openGraph: {
      title: `oncewewere · ${meta.label}`,
      description: meta.description,
      url,
      siteName: "oncewewere",
      type: "website",
      locale: "vi_VN",
    },
    twitter: {
      card: "summary",
      title: `oncewewere · ${meta.label}`,
      description: meta.description,
    },
  };
}

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
      title: `oncewewere · ${title}`,
      description,
      url,
      siteName: "oncewewere",
      type: "article",
      locale: "vi_VN",
    },
    twitter: {
      card: "summary",
      title: `oncewewere · ${title}`,
      description,
    },
  };
}
