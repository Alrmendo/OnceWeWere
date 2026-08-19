import Link from "next/link";
import { logout } from "@/app/admin/actions";

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="admin-topbar">
        <Link href="/admin" className="admin-topbar__brand">
          oncewewere · admin
        </Link>
        <nav className="admin-topbar__nav">
          <Link href="/admin">Bài viết</Link>
          <Link href="/admin/posts/new">Viết mới</Link>
          <Link href="/admin/comments">Bình luận</Link>
          <form action={logout}>
            <button type="submit" className="admin-btn admin-btn--secondary">
              Đăng xuất
            </button>
          </form>
        </nav>
      </div>
      <main className="admin-main">{children}</main>
    </>
  );
}
