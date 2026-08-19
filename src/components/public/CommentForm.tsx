"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitComment } from "@/app/(public)/actions";

export function CommentForm({ postId, path }: { postId: string; path: string }) {
  const action = submitComment.bind(null, postId, path);
  const [state, formAction, pending] = useActionState(action, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state && "ok" in state) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="comment-form">
      <div
        className="comment-form__honeypot"
        aria-hidden="true"
        tabIndex={-1}
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="comment-form__row">
        <label className="comment-form__label" htmlFor="author_name">
          Tên
        </label>
        <input
          id="author_name"
          name="author_name"
          type="text"
          className="comment-form__input"
          maxLength={80}
          required
        />
      </div>

      <div className="comment-form__row">
        <label className="comment-form__label" htmlFor="body">
          Bình luận
        </label>
        <textarea
          id="body"
          name="body"
          className="comment-form__textarea"
          rows={3}
          maxLength={2000}
          required
        />
      </div>

      {state && "error" in state && (
        <p className="comment-form__error">{state.error}</p>
      )}
      {state && "ok" in state && (
        <p className="comment-form__success">Đã gửi bình luận.</p>
      )}

      <button type="submit" className="comment-form__submit" disabled={pending}>
        {pending ? "Đang gửi…" : "Gửi bình luận"}
      </button>
    </form>
  );
}
