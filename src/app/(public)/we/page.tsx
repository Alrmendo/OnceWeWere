import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getPublishedPostsByCategory } from "@/lib/posts";
import { CategoryIndex } from "@/components/public/CategoryIndex";
import { buildCategoryMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildCategoryMetadata("we");

export default async function WePage() {
  const supabase = await createClient();
  const posts = await getPublishedPostsByCategory(supabase, "we");
  return <CategoryIndex category="we" posts={posts} />;
}
