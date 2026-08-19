"use client";

import { useActionState } from "react";
import type { ActionState } from "@/app/admin/actions";
import { CATEGORY_META } from "@/lib/categories";
import { CATEGORIES, type PostCategory } from "@/lib/posts";

export function PostForm({
  action,
  submitLabel,
  defaultValues,
}: {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  submitLabel: string;
  defaultValues?: {
    category?: PostCategory;
    date?: string;
    body?: string;
  };
}) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    action,
    null
  );

  return (
    <form action={formAction} className="flex flex-col gap-lg">
      <div className="flex gap-md">
        <div className="w-[160px]">
          <label htmlFor="category" className="admin-label">
            Mục
          </label>
          <select
            id="category"
            name="category"
            defaultValue={defaultValues?.category ?? "once"}
            className="admin-select"
            disabled={pending}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_META[c].label}
              </option>
            ))}
          </select>
        </div>

        <div className="w-[180px]">
          <label htmlFor="date" className="admin-label">
            Ngày
          </label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={defaultValues?.date}
            required
            className="admin-input"
            disabled={pending}
          />
        </div>
      </div>

      <div>
        <label htmlFor="body" className="admin-label">
          Nội dung
        </label>
        <textarea
          id="body"
          name="body"
          rows={24}
          defaultValue={defaultValues?.body}
          placeholder="Viết ở đây. Xuống dòng sẽ được giữ nguyên như khi đăng."
          required
          className="admin-textarea"
          disabled={pending}
        />
      </div>

      {state?.error ? <p className="admin-error">{state.error}</p> : null}

      <div>
        <button
          type="submit"
          className="admin-btn admin-btn--primary"
          disabled={pending}
        >
          {pending ? "Đang lưu…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
