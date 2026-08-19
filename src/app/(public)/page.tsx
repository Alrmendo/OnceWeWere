import Link from "next/link";

const SECTIONS = [
  {
    href: "/once",
    label: "Once",
    dataCategory: "once" as const,
    description: "Những thứ đã từng tồn tại — hoài niệm, quá khứ.",
  },
  {
    href: "/we",
    label: "We",
    dataCategory: "we" as const,
    description: "Những thứ xảy ra giữa con người với nhau.",
  },
  {
    href: "/were",
    label: "Were",
    dataCategory: "were" as const,
    description: "Phần sâu nhất. Chiêm nghiệm.",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-[640px] px-lg py-3xl">
      <section>
        <p className="prose-body">
          {`Đây là nơi mình chép lại những suy nghĩ không có chỗ nào khác để đi.\n\nKhông có tiêu đề, không sắp xếp cho đẹp — chỉ có ngày tháng, và những gì mình nghĩ vào ngày hôm đó.\n\nBa mục dưới đây là ba cách mình chia nhỏ những suy nghĩ ấy.`}
        </p>
      </section>

      <section className="mt-2xl" aria-label="Chuyên mục">
        <ul className="entry-list">
          {SECTIONS.map((s) => (
            <li key={s.href} className="entry-list__item" data-category={s.dataCategory}>
              <Link href={s.href} className="entry-list__link">
                <span className="entry-list__date font-display">{s.label}</span>
                <span className="entry-list__preview">{s.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
