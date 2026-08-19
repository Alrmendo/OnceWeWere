import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getPublishedPostBySlug } from "@/lib/posts";
import { getCommentsForPost } from "@/lib/comments";
import { PostView } from "@/components/public/PostView";
import { buildPostMetadata } from "@/lib/metadata";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const post = await getPublishedPostBySlug(supabase, "we", slug);
  if (!post) return {};
  return buildPostMetadata("we", post);
}

export default async function WePostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const post = await getPublishedPostBySlug(supabase, "we", slug);
  if (!post) notFound();
  const comments = await getCommentsForPost(supabase, post.id);
  return <PostView category="we" post={post} comments={comments} />;
}
