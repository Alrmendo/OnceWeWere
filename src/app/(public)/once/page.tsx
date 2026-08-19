import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getPublishedPostsByCategory } from "@/lib/posts";
import { CategoryIndex } from "@/components/public/CategoryIndex";

export const metadata: Metadata = { title: "Once" };

export default async function OncePage() {
  const supabase = await createClient();
  const posts = await getPublishedPostsByCategory(supabase, "once");
  return <CategoryIndex category="once" posts={posts} />;
}
