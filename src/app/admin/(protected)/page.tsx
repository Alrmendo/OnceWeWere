import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getAllPosts } from "@/lib/posts";
import { CATEGORY_META } from "@/lib/categories";
import { formatPostDate } from "@/lib/format";
import { buildPostPreview } from "@/lib/preview";
import { PublishToggle } from "@/components/admin/PublishToggle";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const posts = await getAllPosts(supabase);

  return (
    <div>
      <div className="mb-lg flex items-center justify-between">
        <h1 className="text-[1.375rem] font-semibold text-admin-text">
          Bài viết
        </h1>
        <Link href="/admin/posts/new" className="admin-btn admin-btn--primary">
          Viết bài mới
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="admin-empty">Chưa có bài viết nào. Bắt đầu viết bài đầu tiên.</p>
      ) : (
        <div>
          {posts.map((post) => {
            const preview = buildPostPreview(post.body);
            const previewText = preview.isEmpty
              ? "Chưa có nội dung"
              : [preview.heading, preview.snippet].filter(Boolean).join(" — ");

            return (
              <div key={post.id} className="admin-row">
                <span
                  className={
                    post.published
                      ? "admin-badge admin-badge--published"
                      : "admin-badge admin-badge--draft"
                  }
                >
                  {post.published ? "Đã đăng" : "Nháp"}
                </span>

                <span className="w-[52px] shrink-0 text-[0.8125rem] font-medium text-admin-muted">
                  {CATEGORY_META[post.category].label}
                </span>

                <span className="w-[64px] shrink-0 text-[0.875rem] text-admin-text">
                  {formatPostDate(post.date)}
                </span>

                <span className="min-w-0 flex-1 truncate text-[0.875rem] text-admin-muted">
                  {previewText}
                </span>

                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="admin-btn admin-btn--secondary"
                >
                  Sửa
                </Link>
                <PublishToggle id={post.id} published={post.published} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
