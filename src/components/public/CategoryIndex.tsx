import Link from "next/link";
import { CATEGORY_META } from "@/lib/categories";
import type { Post, PostCategory } from "@/lib/posts";
import { formatPostDate } from "@/lib/format";
import { buildPostPreview } from "@/lib/preview";

export function CategoryIndex({
  category,
  posts,
}: {
  category: PostCategory;
  posts: Post[];
}) {
  const meta = CATEGORY_META[category];

  return (
    <div
      className="mx-auto max-w-[640px] px-lg py-3xl"
      data-category={category}
    >
      <header className="mb-2xl">
        <h1 className="font-display text-[2rem] font-medium text-ink">
          {meta.label}
        </h1>
        <p className="mt-2xs font-body text-[0.95rem] text-muted">
          {meta.description}
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="font-body text-[0.95rem] text-neutral">
          Chưa có bài viết nào ở mục này.
        </p>
      ) : (
        <ul className="entry-list">
          {posts.map((post) => {
            const preview = buildPostPreview(post.body);
            const hasText = Boolean(preview.heading || preview.snippet);

            return (
              <li key={post.id} className="entry-list__item">
                <Link
                  href={`/${category}/${post.slug}`}
                  className="entry-list__link"
                >
                  <span className="entry-list__date">
                    {formatPostDate(post.date)}
                  </span>
                  {preview.imageSrc && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={preview.imageSrc}
                      alt=""
                      className="entry-list__thumb"
                    />
                  )}
                  {(hasText || preview.isEmpty) && (
                    <span className="entry-list__preview">
                      {preview.isEmpty ? (
                        <span className="entry-list__preview--empty">
                          Chưa có nội dung
                        </span>
                      ) : (
                        <>
                          {preview.heading && (
                            <strong className="entry-list__preview-heading">
                              {preview.heading}
                            </strong>
                          )}
                          {preview.heading && preview.snippet ? " — " : null}
                          {preview.snippet}
                        </>
                      )}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
