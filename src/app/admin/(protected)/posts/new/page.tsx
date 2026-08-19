import { PostForm } from "@/components/admin/PostForm";
import { createPost } from "@/app/admin/actions";

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function NewPostPage() {
  return (
    <div>
      <h1 className="mb-lg text-[1.375rem] font-semibold text-admin-text">
        Viết bài mới
      </h1>
      <PostForm
        action={createPost}
        submitLabel="Lưu nháp"
        defaultValues={{ date: todayISO() }}
      />
    </div>
  );
}
