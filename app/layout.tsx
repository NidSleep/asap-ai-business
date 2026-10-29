import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans, Noto_Sans_SC } from "next/font/google";
import { LangProvider } from "@/lib/i18n";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const text = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
});

// Chinese glyphs, so 中文 matches the brand type on every device instead of
// falling back to YaHei / PingFang. Google slices it by unicode-range, so a
// visitor only downloads the characters on the page; nothing is preloaded.
const chinese = Noto_Sans_SC({
  variable: "--font-noto-sc",
  weight: ["400", "500", "700", "800"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Wave AI — Your 24/7 AI Sales Team",
  description:
    "Stop losing customers to slow replies. Wave AI replies within 30 seconds on WhatsApp, Messenger and Instagram, follows up on days 1, 3, 5 and 7, and reports why leads were lost.",
  openGraph: {
    title: "Wave AI — Stop losing customers to slow replies",
    description:
      "Your 24/7 AI sales team: 30-second replies, automatic follow-up, every channel in one inbox, and daily reports.",
    siteName: "Wave AI",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${text.variable} ${chinese.variable} antialiased`}
    >
      <body className="min-h-dvh">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
