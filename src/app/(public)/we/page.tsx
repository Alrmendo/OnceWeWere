import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getPublishedPostsByCategory } from "@/lib/posts";
import { CategoryIndex } from "@/components/public/CategoryIndex";

export const metadata: Metadata = { title: "We" };

export default async function WePage() {
  const supabase = await createClient();
  const posts = await getPublishedPostsByCategory(supabase, "we");
  return <CategoryIndex category="we" posts={posts} />;
}
