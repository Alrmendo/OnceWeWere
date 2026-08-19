import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getPostById } from "@/lib/posts";
import { PostForm } from "@/components/admin/PostForm";
import { PublishToggle } from "@/components/admin/PublishToggle";
import { updatePost } from "@/app/admin/actions";
import { formatPostDate } from "@/lib/format";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const post = await getPostById(supabase, id);
  if (!post) notFound();

  const action = updatePost.bind(null, post.id);

  return (
    <div>
      <div className="mb-lg flex items-center justify-between">
        <div>
          <h1 className="text-[1.375rem] font-semibold text-admin-text">
            Sửa bài · {formatPostDate(post.date)}
          </h1>
          <span
            className={
              post.published
                ? "admin-badge admin-badge--published mt-2xs inline-flex"
                : "admin-badge admin-badge--draft mt-2xs inline-flex"
            }
          >
            {post.published ? "Đã đăng" : "Nháp"}
          </span>
        </div>
        <PublishToggle id={post.id} published={post.published} />
      </div>

      <PostForm
        action={action}
        submitLabel="Lưu thay đổi"
        defaultValues={{
          category: post.category,
          date: post.date,
          body: post.body,
        }}
      />
    </div>
  );
}
