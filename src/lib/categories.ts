import type { PostCategory } from "./posts";

export const CATEGORY_META: Record<
  PostCategory,
  { label: string; description: string }
> = {
  once: {
    label: "Once",
    description: "Những thứ đã từng tồn tại — hoài niệm, quá khứ.",
  },
  we: {
    label: "We",
    description: "Những thứ xảy ra giữa con người với nhau.",
  },
  were: {
    label: "Were",
    description: "Phần sâu nhất. Chiêm nghiệm.",
  },
};
