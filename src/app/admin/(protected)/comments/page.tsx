import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getAllCommentsWithPosts } from "@/lib/comments";
import { CATEGORY_META } from "@/lib/categories";
import { formatPostDate } from "@/lib/format";
import { DeleteCommentButton } from "@/components/admin/DeleteCommentButton";

export default async function AdminCommentsPage() {
  const supabase = await createClient();
  const comments = await getAllCommentsWithPosts(supabase);

  return (
    <div>
      <h1 className="text-[1.375rem] font-semibold text-admin-text mb-lg">
        Bình luận
      </h1>

      {comments.length === 0 ? (
        <div className="admin-empty">Chưa có bình luận nào.</div>
      ) : (
        <div>
          {comments.map((comment) => (
            <div key={comment.id} className="admin-row">
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="flex items-center gap-2xs">
                  <span className="font-medium">{comment.author_name}</span>
                  {comment.posts && (
                    <Link
                      href={`/${comment.posts.category}/${comment.posts.slug}`}
                      target="_blank"
                      className="text-[0.8rem] text-admin-muted underline"
                    >
                      {CATEGORY_META[comment.posts.category].label} ·{" "}
                      {formatPostDate(comment.posts.date)}
                    </Link>
                  )}
                </div>
                <p className="mt-2xs text-[0.9rem] text-admin-text whitespace-pre-wrap">
                  {comment.body}
                </p>
              </div>
              <DeleteCommentButton id={comment.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
