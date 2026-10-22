import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Wave AI — AI Chatbot Platform for Businesses",
  description:
    "Wave AI is an AI chatbot platform for businesses. Train it on your own FAQs, price lists and documents; it answers customers on WhatsApp, Telegram or your website in English or Chinese, and hands over to your team when a person should step in.",
  openGraph: {
    title: "Wave AI — Customers message at 11pm. Your team wakes up to a ready lead.",
    description:
      "An AI chatbot platform that answers customers from your own material, in their language, and hands your team a clear brief.",
    siteName: "Wave AI",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#111113",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${display.variable} ${text.variable} antialiased`}
    >
      <body className="min-h-dvh">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
