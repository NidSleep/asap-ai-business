"use client";

import { ArrowUpRight, Languages } from "lucide-react";
import { WaveMark } from "@/components/site/mark";
import { DemoLink } from "@/components/site/demo-link";
import { demo, nav } from "@/lib/content";
import { useLang, type Lang } from "@/lib/i18n";

const LANGS: { code: Lang; label: string; html: string }[] = [
  { code: "en", label: "English", html: "en" },
  { code: "zh", label: "中文", html: "zh-Hans" },
];

/**
 * Footer language picker, the way Stripe, Notion and Intercom do it: small,
 * at the bottom, out of the way of "Book a demo". Most visitors never need it
 * because the page already follows their browser language.
 */
export function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div role="group" aria-label="Language / 语言" className="inline-flex items-center gap-1.5 text-[14px]">
      <Languages className="size-4 text-muted-foreground" aria-hidden="true" />
      {LANGS.map((l, i) => (
        <span key={l.code} className="inline-flex items-center gap-1.5">
          {i > 0 ? <span className="text-muted-foreground/50" aria-hidden="true">·</span> : null}
          <button
            type="button"
            lang={l.html}
            onClick={() => setLang(l.code)}
            aria-pressed={lang === l.code}
            className={
              lang === l.code
                ? "font-semibold text-navy"
                : "text-muted-foreground underline-offset-4 transition-colors hover:text-navy hover:underline"
            }
          >
            {l.label}
          </button>
        </span>
      ))}
    </div>
  );
}

export function Brand({ inverted = false }: { inverted?: boolean }) {
  return (
    <a
      href="#top"
      aria-label="Wave AI"
      className={`inline-flex items-center gap-2.5 font-display text-[20px] font-extrabold tracking-tight ${inverted ? "text-white" : "text-navy"}`}
    >
      <span className={`grid size-8 place-items-center rounded-[10px] ${inverted ? "bg-white text-navy" : "bg-navy text-white"}`}>
        <WaveMark className="h-3.5 w-[18px]" />
      </span>
      Wave AI
    </a>
  );
}

export function Header() {
  const { t } = useLang();
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-8 px-5 sm:px-8">
        <Brand />
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-[15px] text-muted-foreground transition-colors hover:text-navy">
              {t(item.label)}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center">
          {/* The one action that matters, on every screen size. */}
          <DemoLink size="sm" className="h-9 px-3.5 text-[13px] font-semibold sm:px-4">
            {t(demo)}
            <ArrowUpRight className="size-3.5" />
          </DemoLink>
        </div>
      </div>
    </header>
  );
}
