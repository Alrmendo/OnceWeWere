export function formatPostDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const yy = String(year % 100).padStart(2, "0");
  return `${day}/${month}/${yy}`;
}

export function formatPostDateLong(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return `${String(day).padStart(2, "0")} tháng ${month}, ${year}`;
}

export function firstLine(body: string, maxLength = 90): string {
  const line = body.split("\n").find((l) => l.trim().length > 0) ?? "";
  const trimmed = line.trim();
  return trimmed.length > maxLength
    ? trimmed.slice(0, maxLength).trimEnd() + "…"
    : trimmed;
}
