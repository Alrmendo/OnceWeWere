"use client";

import { useActionState } from "react";
import { login, type ActionState } from "@/app/admin/actions";

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    login,
    null
  );

  return (
    <form action={formAction} className="flex flex-col gap-md">
      <input type="hidden" name="next" value={next} />

      <div>
        <label htmlFor="email" className="admin-label">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className="admin-input"
          disabled={pending}
        />
      </div>

      <div>
        <label htmlFor="password" className="admin-label">
          Mật khẩu
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="admin-input"
          disabled={pending}
        />
      </div>

      {state?.error ? <p className="admin-error">{state.error}</p> : null}

      <button
        type="submit"
        className="admin-btn admin-btn--primary mt-xs"
        disabled={pending}
      >
        {pending ? "Đang đăng nhập…" : "Đăng nhập"}
      </button>
    </form>
  );
}
