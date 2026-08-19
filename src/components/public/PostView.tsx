import { CATEGORY_META } from "@/lib/categories";
import type { Post, PostCategory } from "@/lib/posts";
import type { Comment } from "@/lib/comments";
import { formatPostDate } from "@/lib/format";
import { ReactionButton } from "./ReactionButton";
import { ShareButton } from "./ShareButton";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";

export function PostView({
  category,
  post,
  comments,
}: {
  category: PostCategory;
  post: Post;
  comments: Comment[];
}) {
  const meta = CATEGORY_META[category];
  const path = `/${category}/${post.slug}`;

  return (
    <article
      className="mx-auto max-w-[640px] px-lg py-3xl"
      data-category={category}
    >
      <header className="mb-xl">
        <p className="dateline">{meta.label}</p>
        <h1 className="post-title">{formatPostDate(post.date)}</h1>
      </header>

      <div className="prose-body">{post.body}</div>

      <div className="post-actions">
        <ReactionButton postId={post.id} initialCount={post.reaction_count} />
        <ShareButton title={`onceweweré · ${meta.label} · ${formatPostDate(post.date)}`} />
      </div>

      <section className="comments" aria-labelledby="comments-heading">
        <h2 id="comments-heading" className="comments__heading">
          Bình luận
        </h2>
        <CommentList comments={comments} />
        <CommentForm postId={post.id} path={path} />
      </section>
    </article>
  );
}
