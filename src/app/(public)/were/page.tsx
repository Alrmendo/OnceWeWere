import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getPublishedPostsByCategory } from "@/lib/posts";
import { CategoryIndex } from "@/components/public/CategoryIndex";

export const metadata: Metadata = { title: "Were" };

export default async function WerePage() {
  const supabase = await createClient();
  const posts = await getPublishedPostsByCategory(supabase, "were");
  return <CategoryIndex category="were" posts={posts} />;
}
