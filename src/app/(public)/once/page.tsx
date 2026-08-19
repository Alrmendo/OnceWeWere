import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getPublishedPostsByCategory } from "@/lib/posts";
import { CategoryIndex } from "@/components/public/CategoryIndex";
import { buildCategoryMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildCategoryMetadata("once");

export default async function OncePage() {
  const supabase = await createClient();
  const posts = await getPublishedPostsByCategory(supabase, "once");
  return <CategoryIndex category="once" posts={posts} />;
}
