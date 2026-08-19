"use client";

import { ListErrorState } from "@/components/public/ListErrorState";

export default function WereError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ListErrorState error={error} reset={reset} />;
}
