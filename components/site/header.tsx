"use client";

import { ArrowUpRight, Languages, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { DemoLink } from "@/components/site/demo-link";
import { WaveMark } from "@/components/site/mark";
import { demo, nav } from "@/lib/content";
import { useLang, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const LANGS: { code: Lang; label: string; html: string }[] = [
  { code: "en", label: "English", html: "en" },
  { code: "zh", label: "中文", html: "zh-Hans" },
];

/**
 * Language picker, the way Stripe, Notion and Intercom do it: small text,
 * out of the way of "Book a demo". It lives in the footer, and on phones also
 * in the menu so it is reachable without scrolling the whole page. Each
 * option has a 44px tap area even though it reads as small text.
 */
export function LangSwitch({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div role="group" aria-label="Language / 语言" className={cn("inline-flex items-center gap-1 text-[14px]", className)}>
      <Languages className="size-4 text-muted-foreground" aria-hidden="true" />
      {LANGS.map((l, i) => (
        <span key={l.code} className="inline-flex items-center gap-1">
          {i > 0 ? <span className="text-muted-foreground/50" aria-hidden="true">·</span> : null}
          <button
            type="button"
            lang={l.html}
            onClick={() => setLang(l.code)}
            aria-pressed={lang === l.code}
            className={cn(
              "inline-flex min-h-11 min-w-11 items-center justify-center px-1.5",
              lang === l.code
                ? "font-semibold text-navy"
                : "text-muted-foreground underline-offset-4 transition-colors hover:text-navy hover:underline",
            )}
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
      className={cn(
        "inline-flex min-h-11 shrink-0 items-center gap-2.5 font-display text-[20px] font-extrabold tracking-tight",
        inverted ? "text-white" : "text-navy",
      )}
    >
      <span className={cn("grid size-8 place-items-center rounded-[10px]", inverted ? "bg-white text-navy" : "bg-navy text-white")}>
        <WaveMark className="h-3.5 w-[18px]" />
      </span>
      Wave AI
    </a>
  );
}

const menuCopy = {
  open: { en: "Open menu", zh: "打开菜单" },
  close: { en: "Close menu", zh: "关闭菜单" },
};

/** Phones and small tablets: the section links and language, one tap away. */
function MobileMenu() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={t(open ? menuCopy.close : menuCopy.open)}
        className="grid size-11 place-items-center rounded-full text-navy transition-colors hover:bg-secondary"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            id="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="px-safe absolute inset-x-0 top-full border-b border-border bg-white pb-4 pt-2 shadow-[0_18px_30px_-20px_rgb(11_27_63/0.35)]"
          >
            <nav aria-label="Sections">
              <ul>
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-12 items-center border-b border-border/70 text-[17px] font-medium text-navy"
                    >
                      {t(item.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <LangSwitch className="mt-2" />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const { t } = useLang();
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-white/80 backdrop-blur-xl">
      <a
        href="#main"
        className="absolute left-4 top-2 z-[60] -translate-y-20 rounded-full bg-navy px-4 py-2.5 text-[14px] font-semibold text-white focus-visible:translate-y-0"
      >
        {t({ en: "Skip to main content", zh: "跳到主要内容" })}
      </a>
      <div className="relative mx-auto flex h-16 max-w-[1200px] items-center gap-3 px-safe md:gap-8">
        <Brand />
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex lg:gap-3">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="inline-flex min-h-11 min-w-11 items-center justify-center px-2.5 text-[15px] text-muted-foreground transition-colors hover:text-navy">
              {t(item.label)}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          {/* The one action that matters, on every screen size. 44px for touch, compact for a mouse. */}
          <DemoLink size="sm" className="h-11 whitespace-nowrap px-3.5 text-[13px] font-semibold pointer-fine:h-9 sm:px-4">
            {t(demo)}
            <ArrowUpRight className="size-3.5 max-[359px]:hidden" />
          </DemoLink>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
