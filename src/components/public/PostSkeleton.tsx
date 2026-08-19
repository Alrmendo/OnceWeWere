import { CATEGORY_META } from "@/lib/categories";
import type { PostCategory } from "@/lib/posts";

export function PostSkeleton({ category }: { category: PostCategory }) {
  const meta = CATEGORY_META[category];

  return (
    <div
      className="mx-auto max-w-[640px] px-lg py-3xl"
      data-category={category}
    >
      <header className="mb-xl">
        <p className="dateline">{meta.label}</p>
        <span
          className="skeleton mt-2xs"
          style={{ display: "block", width: "8rem", height: "2.25rem" }}
        />
      </header>

      <div className="flex flex-col gap-sm" aria-hidden="true">
        <span className="skeleton" style={{ width: "100%", height: "1rem" }} />
        <span className="skeleton" style={{ width: "92%", height: "1rem" }} />
        <span className="skeleton" style={{ width: "96%", height: "1rem" }} />
        <span className="skeleton" style={{ width: "60%", height: "1rem" }} />
      </div>
    </div>
  );
}
