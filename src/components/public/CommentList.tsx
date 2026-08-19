import type { Comment } from "@/lib/comments";

function formatCommentDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}

export function CommentList({ comments }: { comments: Comment[] }) {
  if (comments.length === 0) {
    return <p className="comment-list__empty">Chưa có bình luận nào.</p>;
  }

  return (
    <ul className="comment-list">
      {comments.map((comment) => (
        <li key={comment.id} className="comment-list__item">
          <div className="comment-list__meta">
            <span className="comment-list__author">{comment.author_name}</span>
            <span className="comment-list__date">
              {formatCommentDate(comment.created_at)}
            </span>
          </div>
          <p className="comment-list__body">{comment.body}</p>
        </li>
      ))}
    </ul>
  );
}
