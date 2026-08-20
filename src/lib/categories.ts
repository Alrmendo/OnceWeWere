import type { PostCategory } from "./posts";

export const CATEGORY_META: Record<
  PostCategory,
  { label: string; description: string }
> = {
  once: {
    label: "Once",
    description: "",
  },
  we: {
    label: "We",
    description: "",
  },
  were: {
    label: "Were",
    description: "",
  },
};
