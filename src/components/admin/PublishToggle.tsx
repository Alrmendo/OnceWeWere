"use client";

import { useTransition } from "react";
import { setPublished } from "@/app/admin/actions";

export function PublishToggle({
  id,
  published,
}: {
  id: string;
  published: boolean;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      className={
        published ? "admin-btn admin-btn--danger" : "admin-btn admin-btn--primary"
      }
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await setPublished(id, !published);
        })
      }
    >
      {pending ? "Đang lưu…" : published ? "Gỡ xuất bản" : "Xuất bản"}
    </button>
  );
}
