"use client";

import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/motion/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/motion/tabs";
import { WaveMark } from "@/components/site/mark";
import { DEMO_URL, demo, nav } from "@/lib/content";
import { useLang, type Lang } from "@/lib/i18n";

export function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <Tabs value={lang} onValueChange={(v) => setLang(v as Lang)} variant="segment">
      <TabsList aria-label={lang === "zh" ? "语言" : "Language"} className="rounded-full bg-secondary p-1">
        <TabsTrigger value="en" className="rounded-full px-3 text-xs" indicatorClassName="rounded-full bg-green">
          EN
        </TabsTrigger>
        <TabsTrigger value="zh" className="rounded-full px-3 text-xs" indicatorClassName="rounded-full bg-green">
          中文
        </TabsTrigger>
      </TabsList>
    </Tabs>
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
        <div className="ml-auto flex items-center gap-3">
          <LangSwitch />
          <ButtonLink href={DEMO_URL} target="_blank" rel="noopener" size="sm" className="hidden h-9 px-4 text-[13px] font-semibold sm:inline-flex">
            {t(demo)}
            <ArrowUpRight className="size-3.5" />
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
