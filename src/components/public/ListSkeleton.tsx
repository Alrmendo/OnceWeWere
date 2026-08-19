import { CATEGORY_META } from "@/lib/categories";
import type { PostCategory } from "@/lib/posts";

export function ListSkeleton({ category }: { category: PostCategory }) {
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

      <ul className="entry-list" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <li key={i} className="entry-list__item">
            <div className="entry-list__link">
              <span className="skeleton skeleton--date" />
              <span className="skeleton skeleton--preview" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
