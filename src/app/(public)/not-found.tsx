import Link from "next/link";

export default function PublicNotFound() {
  return (
    <div className="mx-auto max-w-[640px] px-lg py-3xl text-center">
      <p className="font-display text-[1.75rem] font-medium text-ink">
        Không tìm thấy trang này.
      </p>
      <p className="mt-xs font-body text-[0.95rem] text-muted">
        Có thể bài viết đã bị gỡ, hoặc đường dẫn không đúng.
      </p>
      <Link
        href="/"
        className="mt-lg inline-block font-body text-[0.9rem] text-accent underline underline-offset-4"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
