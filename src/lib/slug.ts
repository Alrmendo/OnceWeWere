import type { Enums } from "./supabase/types";

export function generateSlug(
  category: Enums<"post_category">,
  dateStr: string
): string {
  const compact = dateStr.replaceAll("-", "");
  const suffix = crypto.randomUUID().replace(/-/g, "").slice(0, 4);
  return `${category}-${compact}-${suffix}`;
}
