import Link from "next/link";

const NAV_ITEMS = [
  { href: "/once", label: "Once" },
  { href: "/we", label: "We" },
  { href: "/were", label: "Were" },
];

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <header className="masthead">
        <Link href="/" className="masthead__wordmark">
          once<span>we</span>were
        </Link>
        <nav className="masthead__nav" aria-label="Chuyên mục">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="site-main">{children}</main>

      <footer className="letter-close">
        <div className="letter-close__inner">
          <p className="letter-close__line">Cảm ơn vì đã ghé qua.</p>
          <p className="letter-close__meta">
            Nghi · <Link href="/">onceweweré</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
