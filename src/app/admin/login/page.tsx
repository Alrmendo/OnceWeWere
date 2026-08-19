import { LoginForm } from "@/components/admin/LoginForm";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="flex min-h-dvh items-center justify-center px-lg">
      <div className="w-full max-w-[360px]">
        <h1 className="mb-lg text-center text-[1.25rem] font-semibold text-admin-text">
          oncewewere · admin
        </h1>
        <LoginForm next={next ?? "/admin"} />
      </div>
    </div>
  );
}
