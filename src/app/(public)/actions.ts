"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function addReaction(postId: string): Promise<{ count: number } | { error: string }> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("increment_reaction", {
    p_post_id: postId,
  });

  if (error) return { error: "Không thể ghi nhận reaction." };
  return { count: data ?? 0 };
}

export type CommentActionState = { error: string } | { ok: true } | null;

export async function submitComment(
  postId: string,
  path: string,
  _prevState: CommentActionState,
  formData: FormData
): Promise<CommentActionState> {
  const honeypot = String(formData.get("website") ?? "");
  if (honeypot.trim().length > 0) {
    return { ok: true };
  }

  const authorName = String(formData.get("author_name") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (!authorName) return { error: "Nhập tên của bạn." };
  if (authorName.length > 80) return { error: "Tên quá dài." };
  if (!body) return { error: "Nội dung bình luận không được để trống." };
  if (body.length > 2000) return { error: "Bình luận quá dài." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("comments")
    .insert({ post_id: postId, author_name: authorName, body });

  if (error) return { error: "Không thể gửi bình luận. " + error.message };

  revalidatePath(path);
  return { ok: true };
}
