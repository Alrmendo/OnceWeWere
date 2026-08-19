"use client";

import { useTransition } from "react";
import { deleteComment } from "@/app/admin/actions";

export function DeleteCommentButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      className="admin-btn admin-btn--danger"
      disabled={pending}
      onClick={() => {
        if (!confirm("Xoá bình luận này?")) return;
        startTransition(async () => {
          await deleteComment(id);
        });
      }}
    >
      {pending ? "Đang xoá…" : "Xoá"}
    </button>
  );
}
