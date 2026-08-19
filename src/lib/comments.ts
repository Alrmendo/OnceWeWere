import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "./supabase/types";

export type Comment = Tables<"comments">;
export type CommentWithPost = Comment & {
  posts: Pick<Tables<"posts">, "id" | "category" | "date" | "slug"> | null;
};

export async function getCommentsForPost(
  supabase: SupabaseClient<Database>,
  postId: string
): Promise<Comment[]> {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}

export async function getAllCommentsWithPosts(
  supabase: SupabaseClient<Database>
): Promise<CommentWithPost[]> {
  const { data, error } = await supabase
    .from("comments")
    .select("*, posts(id, category, date, slug)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
