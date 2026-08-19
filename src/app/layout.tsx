import type { Metadata } from "next";
import { Fraunces, Newsreader } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/lib/site";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-body",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "onceweweré",
    template: "%s · onceweweré",
  },
  description: "Nhật ký cá nhân — once, we, were.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${fraunces.variable} ${newsreader.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
