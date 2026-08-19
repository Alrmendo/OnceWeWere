import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "./supabase/types";

export type Post = Tables<"posts">;
export type PostCategory = Post["category"];

export const CATEGORIES: PostCategory[] = ["once", "we", "were"];

export async function getPublishedPostsByCategory(
  supabase: SupabaseClient<Database>,
  category: PostCategory
): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("category", category)
    .eq("published", true)
    .order("date", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getPublishedPostBySlug(
  supabase: SupabaseClient<Database>,
  category: PostCategory,
  slug: string
): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("category", category)
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getAllPosts(
  supabase: SupabaseClient<Database>
): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getPostById(
  supabase: SupabaseClient<Database>,
  id: string
): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
}
