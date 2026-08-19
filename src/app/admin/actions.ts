"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { generateSlug } from "@/lib/slug";
import type { PostCategory } from "@/lib/posts";
import { CATEGORIES } from "@/lib/posts";

export type ActionState = { error: string } | null;

export async function login(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!email || !password) {
    return { error: "Nhập email và mật khẩu." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "Email hoặc mật khẩu không đúng." };
  }

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

function readCategory(formData: FormData): PostCategory {
  const raw = String(formData.get("category") ?? "");
  if (!CATEGORIES.includes(raw as PostCategory)) {
    throw new Error("Mục không hợp lệ.");
  }
  return raw as PostCategory;
}

export async function createPost(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const category = readCategory(formData);
  const date = String(formData.get("date") ?? "");
  const body = String(formData.get("body") ?? "");

  if (!date) return { error: "Chọn ngày cho bài viết." };
  if (!body.trim()) return { error: "Nội dung không được để trống." };

  const supabase = await createClient();
  const slug = generateSlug(category, date);

  const { data, error } = await supabase
    .from("posts")
    .insert({ category, date, body, slug })
    .select("id")
    .single();

  if (error) return { error: "Không thể tạo bài viết. " + error.message };

  revalidatePath("/admin");
  redirect(`/admin/posts/${data.id}/edit`);
}

export async function updatePost(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const category = readCategory(formData);
  const date = String(formData.get("date") ?? "");
  const body = String(formData.get("body") ?? "");

  if (!date) return { error: "Chọn ngày cho bài viết." };
  if (!body.trim()) return { error: "Nội dung không được để trống." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("posts")
    .update({ category, date, body })
    .eq("id", id);

  if (error) return { error: "Không thể lưu bài viết. " + error.message };

  revalidatePath("/admin");
  revalidatePath(`/admin/posts/${id}/edit`);
  redirect("/admin");
}

export async function setPublished(id: string, published: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("posts")
    .update({ published })
    .eq("id", id);

  if (error) throw error;
  revalidatePath("/admin");
}

export async function deleteComment(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("comments").delete().eq("id", id);

  if (error) throw error;
  revalidatePath("/admin/comments");
}
