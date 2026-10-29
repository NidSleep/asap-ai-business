"use client";

import { ArrowUpRight, Languages } from "lucide-react";
import { ButtonLink } from "@/components/motion/button";
import { WaveMark } from "@/components/site/mark";
import { DEMO_URL, demo, nav } from "@/lib/content";
import { useLang } from "@/lib/i18n";

/**
 * A quiet text button that names the language you'd switch to. Language is a
 * one-time preference, so it stays out of the way of "Book a demo".
 */
export function LangSwitch() {
  const { lang, setLang } = useLang();
  const next = lang === "zh" ? "en" : "zh";
  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      aria-label={lang === "zh" ? "Switch to English" : "切换到中文"}
      className="inline-flex h-9 items-center gap-1.5 rounded-full px-2.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-navy"
    >
      <Languages className="size-4" />
      <span lang={next === "zh" ? "zh-Hans" : "en"}>{next === "zh" ? "中文" : "EN"}</span>
    </button>
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
        <div className="ml-auto flex items-center gap-1.5 sm:gap-3">
          <LangSwitch />
          {/* The one action that matters, on every screen size. */}
          <ButtonLink href={DEMO_URL} target="_blank" rel="noopener" size="sm" className="h-9 px-3.5 text-[13px] font-semibold sm:px-4">
            {t(demo)}
            <ArrowUpRight className="size-3.5" />
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
