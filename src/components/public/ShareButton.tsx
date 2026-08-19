"use client";

import { useState } from "react";

export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled the share sheet — no-op
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — nothing we can do silently
    }
  }

  return (
    <button type="button" className="share-btn" onClick={handleClick}>
      {copied ? "Đã sao chép liên kết" : "Chia sẻ"}
    </button>
  );
}
