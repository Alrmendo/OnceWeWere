"use client";

import { useEffect } from "react";

export function ListErrorState({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-[640px] px-lg py-3xl text-center">
      <p className="font-display text-[1.75rem] font-medium text-ink">
        Không tải được danh sách bài.
      </p>
      <p className="mt-xs font-body text-[0.95rem] text-muted">
        Có thể do lỗi tạm thời. Thử lại xem sao.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-lg font-body text-[0.9rem] text-accent underline underline-offset-4"
      >
        Thử lại
      </button>
    </div>
  );
}
