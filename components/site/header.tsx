"use client";

import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/motion/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/motion/tabs";
import { WaveMark } from "@/components/site/mark";
import { AGENT_URL, hero, nav } from "@/lib/content";
import { useLang, type Lang } from "@/lib/i18n";

export function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <Tabs value={lang} onValueChange={(v) => setLang(v as Lang)} variant="segment">
      <TabsList
        aria-label={lang === "zh" ? "语言" : "Language"}
        className="rounded-full bg-white/[0.06] p-1"
      >
        <TabsTrigger value="en" className="rounded-full px-3 text-xs" indicatorClassName="rounded-full">
          EN
        </TabsTrigger>
        <TabsTrigger value="zh" className="rounded-full px-3 text-xs" indicatorClassName="rounded-full">
          中文
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export function Brand() {
  return (
    <a
      href="#top"
      aria-label="Wave AI"
      className="inline-flex items-center gap-2.5 font-display text-[20px] font-extrabold tracking-tight text-white"
    >
      <span className="grid size-8 place-items-center rounded-[10px] bg-white text-[#111113]">
        <WaveMark className="h-3.5 w-[18px]" />
      </span>
      Wave AI
    </a>
  );
}

export function Header() {
  const { t } = useLang();
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-8 px-5 sm:px-8">
        <Brand />
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[15px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(item.label)}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <LangSwitch />
          <ButtonLink
            href={AGENT_URL}
            target="_blank"
            rel="noopener"
            size="sm"
            className="hidden h-9 px-4 text-[13px] sm:inline-flex"
          >
            {t(hero.cta)}
            <ArrowUpRight className="size-3.5" />
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
