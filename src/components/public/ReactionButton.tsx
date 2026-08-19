"use client";

import { useState, useSyncExternalStore, useTransition } from "react";
import { addReaction } from "@/app/(public)/actions";

function subscribeNoop() {
  return () => {};
}

function useAlreadyReacted(postId: string): boolean {
  return useSyncExternalStore(
    subscribeNoop,
    () => localStorage.getItem(`oww:reacted:${postId}`) === "1",
    () => false
  );
}

export function ReactionButton({
  postId,
  initialCount,
}: {
  postId: string;
  initialCount: number;
}) {
  const [count, setCount] = useState(initialCount);
  const [justReacted, setJustReacted] = useState(false);
  const [pending, startTransition] = useTransition();
  const reacted = useAlreadyReacted(postId) || justReacted;

  function handleClick() {
    if (reacted || pending) return;
    setJustReacted(true);
    localStorage.setItem(`oww:reacted:${postId}`, "1");
    setCount((c) => c + 1);

    startTransition(async () => {
      const result = await addReaction(postId);
      if ("count" in result) setCount(result.count);
    });
  }

  return (
    <button
      type="button"
      className={reacted ? "reaction-btn reaction-btn--active" : "reaction-btn"}
      onClick={handleClick}
      disabled={reacted}
      aria-pressed={reacted}
    >
      <span aria-hidden="true">{reacted ? "♥" : "♡"}</span>
      <span>{reacted ? "Đã thích" : "Thích"}</span>
      {count > 0 && <span className="reaction-btn__count">{count}</span>}
    </button>
  );
}
