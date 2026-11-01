"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Lightbulb,
  Lock,
  UserX,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode, type Ref } from "react";
import { BouncyAccordion } from "@/components/motion/bouncy-accordion";
import { ButtonLink } from "@/components/motion/button";
import { DemoHint, DemoLink } from "@/components/site/demo-link";
import { Brand, LangSwitch } from "@/components/site/header";
import { HeroPhone } from "@/components/site/hero-phone";
import { WaveMark } from "@/components/site/mark";
import { Beat, EASE, usePlayback } from "@/components/site/playback";
import {
  CONTACT,
  demo,
  faq,
  features,
  finale,
  hero,
  how,
  pain,
  pricing,
  proof,
} from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function Shell({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("px-safe mx-auto w-full max-w-[1200px]", className)}>{children}</div>;
}

function H2({ children, className }: { children: ReactNode; className?: string }) {
  const { lang } = useLang();
  return (
    <h2
      className={cn(
        lang === "zh" && "break-keep [overflow-wrap:anywhere]",
        "font-display text-[clamp(30px,4vw,48px)] font-bold leading-[1.08] tracking-[-0.03em] text-balance text-ink",
        className,
      )}
    >
      {children}
    </h2>
  );
}

function DemoButton({ size = "lg", className }: { size?: "md" | "lg"; className?: string }) {
  const { t } = useLang();
  return (
    <DemoLink size={size} className={cn("font-semibold", className)}>
      {t(demo)}
      <ArrowUpRight className="size-4" />
    </DemoLink>
  );
}

/* ------------------------------------------------------------------ hero */

export function Hero() {
  const { t, lang } = useLang();
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden="true" className="ridge pointer-events-none absolute inset-0" />
      <Shell className="relative grid items-center gap-14 pb-20 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-24 lg:pb-28">
        <div className="max-w-[740px]">
          {/* Chinese breaks only at the phrase marks in the copy, never mid-word. */}
          <h1 className={cn("font-display text-[clamp(34px,4.5vw,56px)] font-bold leading-[1.08] tracking-[-0.04em] text-ink", lang === "zh" && "break-keep [overflow-wrap:anywhere]")}>
            <span className="block text-balance">{t(hero.title)}</span>
            <span className="mt-1 block text-balance text-brand">{t(hero.titleAccent)}</span>
          </h1>
          {/* Two roles, one line each, so the split between them is obvious. */}
          <ul className="mt-6 grid max-w-[560px] gap-2.5 text-[17px] leading-[1.6] text-muted-foreground sm:text-[18px]">
            {hero.roles.map((role) => (
              <li key={role.name.en}>
                <strong className="font-semibold text-ink">{t(role.name)}</strong>
                {lang === "zh" ? "：" : ": "}
                {t(role.does)}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <DemoButton className="text-[15px]" />
            <ButtonLink href="#how" variant="ghost" size="lg" className="text-[15px] text-ink hover:text-ink">
              {t(hero.secondary)}
              <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
          <DemoHint className="mt-3" />
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-muted-foreground">
            {hero.trust.map((item) => (
              <li key={item.en} className="flex items-center gap-2">
                <Check className="size-4 text-brand" strokeWidth={3} />
                {t(item)}
              </li>
            ))}
          </ul>
        </div>
        <HeroPhone />
      </Shell>
    </section>
  );
}

/* ------------------------------------------------------------------ pain */

/** Small centred timestamp or divider inside a chat mock. */
function ChatMeta({ children, align = "center" }: { children: ReactNode; align?: "center" | "end" }) {
  return (
    <p className={cn("text-[12px] text-muted-foreground", align === "center" ? "text-center" : "text-right")}>{children}</p>
  );
}

/**
 * Each pain point as the chat it happens in, drawn with the same mock and
 * bubbles as the Level section, so the problem is seen before it is named.
 */
// Wait (ms) before each beat. The three scenes start a little apart so they
// read left to right; the long gaps are the point (a reply that comes too
// late, a follow-up that never comes).
const SLOW_BEATS = [150, 700, 1600, 900];
const FOLLOW_BEATS = [750, 800, 900, 1300];
const LEAVER_BEATS = [1350, 1500, 600];

function PainScene({ which }: { which: number }) {
  const { t } = useLang();
  const s = pain.scenes;
  const slow = usePlayback(SLOW_BEATS);
  const follow = usePlayback(FOLLOW_BEATS);
  const leaver = usePlayback(LEAVER_BEATS);
  const reduce = useReducedMotion();

  if (which === 0) {
    const { ref, at } = slow;
    return (
      <MockFrame frameRef={ref} className="flex min-h-[300px] flex-col justify-end gap-2.5">
        <Beat on={at(0)} className="flex flex-col gap-2.5">
          <ChatMeta>{s.slow.askTime}</ChatMeta>
          <Bubble from="customer">{t(s.slow.ask)}</Bubble>
        </Beat>
        <Beat on={at(1)}>
          <ChatMeta align="end">{t(s.slow.seen)}</ChatMeta>
        </Beat>
        <Beat on={at(2)} className="mt-2 flex flex-col gap-2.5">
          <ChatMeta>{s.slow.lateTime}</ChatMeta>
          <Bubble from="bot">{t(s.slow.late)}</Bubble>
        </Beat>
        <Beat on={at(3)}>
          <Bubble from="customer">{t(s.slow.lost)}</Bubble>
        </Beat>
      </MockFrame>
    );
  }

  if (which === 1) {
    const { ref, at } = follow;
    return (
      <MockFrame frameRef={ref} className="flex min-h-[300px] flex-col justify-end gap-2.5">
        <Beat on={at(0)} className="flex flex-col gap-2.5">
          <ChatMeta>{t(s.followUp.thinkTime)}</ChatMeta>
          <Bubble from="customer">{t(s.followUp.think)}</Bubble>
        </Beat>
        <Beat on={at(1)}>
          <Bubble from="bot">{t(s.followUp.ok)}</Bubble>
        </Beat>
        {/* The seven days stretch out across the chat. */}
        <div className="my-2 flex items-center gap-3 text-[12px] text-muted-foreground" role="separator">
          <motion.span
            className="h-px flex-1 origin-right bg-foreground/15"
            initial={false}
            animate={{ scaleX: at(2) ? 1 : 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          />
          <motion.span initial={false} animate={{ opacity: at(2) ? 1 : 0 }} transition={{ duration: 0.4 }}>
            {t(s.followUp.gap)}
          </motion.span>
          <motion.span
            className="h-px flex-1 origin-left bg-foreground/15"
            initial={false}
            animate={{ scaleX: at(2) ? 1 : 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          />
        </div>
        <Beat on={at(3)}>
          <p className="max-w-[82%] rounded-2xl rounded-bl-md border border-dashed border-foreground/30 px-4 py-2.5 text-[15px] italic text-muted-foreground">
            {t(s.followUp.silence)}
          </p>
        </Beat>
      </MockFrame>
    );
  }

  const { ref, at } = leaver;
  return (
    <MockFrame frameRef={ref} className="flex min-h-[300px] flex-col justify-end gap-2.5">
      <div className="mb-auto flex items-center gap-2.5 border-b border-foreground/10 pb-3 pt-4">
        <span className="grid size-8 place-items-center rounded-full bg-foreground/[0.08] text-muted-foreground">
          <UserX className="size-4" />
        </span>
        <span className="text-[14px] font-medium text-foreground/80">{t(s.leaver.who)}</span>
      </div>
      {/* The conversation is there, then goes out of reach with the salesperson:
          it blurs away. Hidden from screen readers; the line below says it. */}
      <motion.div
        aria-hidden="true"
        className="flex select-none flex-col gap-2.5"
        initial={false}
        animate={
          !at(0)
            ? { opacity: 0, y: 10, filter: "blur(0px)" }
            : at(1)
              ? { opacity: 0.6, y: 0, filter: "blur(3px)" }
              : { opacity: 1, y: 0, filter: "blur(0px)" }
        }
        transition={{ duration: at(1) && !reduce ? 1.1 : 0.45, ease: EASE }}
      >
        <Bubble from="customer">{t(s.leaver.blurred[0])}</Bubble>
        <Bubble from="bot">{t(s.leaver.blurred[1])}</Bubble>
      </motion.div>
      <Beat on={at(2)}>
        <p className="mt-1 flex items-center gap-2 text-[14px] text-foreground/80">
          <Lock className="size-4 shrink-0 text-brand dark:text-brand-light" />
          {t(s.leaver.locked)}
        </p>
      </Beat>
    </MockFrame>
  );
}

export function Pain() {
  const { t } = useLang();
  return (
    <section id="pain" className="bg-secondary/60 py-24 sm:py-28">
      <Shell>
        <H2 className="max-w-[640px]">{t(pain.title)}</H2>
        {/* On wide screens the three cards share row heights (subgrid), so scenes,
            titles and text line up whatever the copy length or language. */}
        <div className="mt-12 grid gap-x-6 gap-y-12 lg:grid-cols-3 lg:gap-y-0">
          {pain.items.map((item, i) => (
            <article
              key={item.title.en}
              className="mx-auto w-full max-w-[460px] lg:row-span-3 lg:grid lg:max-w-none lg:grid-rows-subgrid"
            >
              <PainScene which={i} />
              <h3 className="mt-6 text-[20px] font-semibold text-ink">{t(item.title)}</h3>
              <p className="mt-2.5 text-[16px] leading-relaxed text-muted-foreground">{t(item.body)}</p>
            </article>
          ))}
        </div>
      </Shell>
    </section>
  );
}

/* ---------------------------------------------------------------- levels */

/**
 * The chat mock-up. Dark is reserved for Wave AI at work (levels 3–4, the
 * hero phone); the problems and ordinary chatbots are drawn light. Contents
 * use theme tokens, so the `dark` class flips them.
 */
function MockFrame({
  children,
  className,
  tone = "light",
  frameRef,
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
  frameRef?: Ref<HTMLDivElement>;
}) {
  const { t } = useLang();
  return (
    <div
      ref={frameRef}
      className={cn(
        "relative rounded-3xl p-6 text-foreground sm:p-8",
        tone === "dark" ? "dark bg-ink" : "bg-card ring-1 ring-border",
        className,
      )}
    >
      <span className="absolute right-5 top-4 text-[12px] text-muted-foreground">{t(how.mock)}</span>
      {children}
    </div>
  );
}

function Bubble({ from, children, muted = false }: { from: "customer" | "bot"; children: ReactNode; muted?: boolean }) {
  return (
    <p
      className={cn(
        "max-w-[82%] rounded-2xl px-4 py-2.5 text-[15px]",
        from === "customer" ? "ml-auto rounded-br-md bg-foreground text-background" : "rounded-bl-md bg-foreground/[0.08]",
        muted && "text-muted-foreground",
      )}
    >
      {children}
    </p>
  );
}

function LevelVisual({ level }: { level: string }) {
  const { t } = useLang();
  if (level === "l1") {
    return (
      <MockFrame>
        <div className="mt-4 flex flex-col gap-3">
          <Bubble from="bot" muted>{t(how.l1.menu)}</Bubble>
          <Bubble from="customer">{t(how.l1.q)}</Bubble>
          <Bubble from="bot" muted>
            <span className="inline-flex items-start gap-2">
              <X className="mt-1 size-4 shrink-0 text-red-500 dark:text-red-400" />
              {t(how.l1.a)}
            </span>
          </Bubble>
        </div>
      </MockFrame>
    );
  }
  if (level === "l2") {
    return (
      <MockFrame>
        <div className="mt-4 flex flex-col gap-3">
          <Bubble from="customer">{t(how.l2.q)}</Bubble>
          <Bubble from="bot">{t(how.l2.a)}</Bubble>
          <p className="mt-2 text-center text-[13px] italic text-muted-foreground">{t(how.l2.end)}</p>
        </div>
      </MockFrame>
    );
  }
  return level === "l3" ? <FollowUpVisual /> : <ReportVisual />;
}

const FOLLOW_UP_BEATS = [250, 650, 650, 650];

/** Level 3: the follow-up days light up in turn, ending on the booking. */
function FollowUpVisual() {
  const { t } = useLang();
  const { ref, at } = usePlayback(FOLLOW_UP_BEATS, { onMount: true });
  const last = how.l3.steps.length - 1;
  return (
    <MockFrame frameRef={ref} tone="dark">
      <ol className="mt-4 grid gap-0">
        {how.l3.steps.map((st, i) => (
          <li key={st.day.en} className="relative flex gap-4 pb-5 last:pb-0">
            {i < last ? (
              <motion.span
                className="absolute left-[11px] top-7 h-[calc(100%-20px)] w-px origin-top bg-foreground/15"
                initial={false}
                animate={{ scaleY: at(i + 1) ? 1 : 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              />
            ) : null}
            <motion.span
              className={cn("grid size-6 shrink-0 place-items-center rounded-full", i === last ? "bg-brand text-white" : "bg-foreground/15")}
              initial={false}
              animate={at(i) ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0 }}
              transition={i === last ? { type: "spring", stiffness: 480, damping: 22 } : { duration: 0.3, ease: EASE }}
            >
              {i === last ? <Check className="size-3.5" strokeWidth={3} /> : <span className="size-1.5 rounded-full bg-foreground" />}
            </motion.span>
            <Beat on={at(i)}>
              <p className="text-[12px] text-muted-foreground">{t(st.day)}</p>
              <p className="text-[16px] font-medium">{t(st.text)}</p>
            </Beat>
          </li>
        ))}
      </ol>
    </MockFrame>
  );
}

const REPORT_BEATS = [250, 220, 220, 700];

/** Level 4: the manager's report fills in, reason by reason, then advises. */
function ReportVisual() {
  const { t } = useLang();
  const { ref, at } = usePlayback(REPORT_BEATS, { onMount: true });
  const n = how.l4.reasons.length;
  return (
    <MockFrame frameRef={ref} tone="dark">
      <p className="mt-4 text-[13px] text-muted-foreground">{t(how.l4.reportTitle)}</p>
      <ul className="mt-4 grid gap-4">
        {how.l4.reasons.map((r, i) => (
          <li key={r.label.en}>
            <p className="flex justify-between text-[14px]">
              <span>{t(r.label)}</span>
              <motion.span
                className="tabular-nums text-muted-foreground"
                initial={false}
                animate={{ opacity: at(i) ? 1 : 0 }}
                transition={{ duration: 0.3, delay: at(i) ? 0.5 : 0 }}
              >
                {Math.round(r.share * 100)}%
              </motion.span>
            </p>
            <span className="mt-1.5 block h-2 rounded-full bg-foreground/[0.08]">
              <motion.span
                className="block h-full origin-left rounded-full bg-brand"
                style={{ width: `${r.share * 100}%` }}
                initial={false}
                animate={{ scaleX: at(i) ? 1 : 0 }}
                transition={{ duration: 0.9, ease: EASE }}
              />
            </span>
          </li>
        ))}
      </ul>
      <Beat on={at(n)}>
        <p className="mt-6 flex items-center gap-2 rounded-xl bg-foreground/[0.07] px-3 py-2.5 text-[14px] text-brand-light">
          <Lightbulb className="size-4 shrink-0" />
          {t(how.l4.action)}
        </p>
      </Beat>
    </MockFrame>
  );
}

/**
 * Levels 1–2 sit in a grey box ("typical chatbots") and 3–4 in a ink box
 * ("Wave AI"), so the reader sees at a glance which half is the product.
 * One indicator glides across both boxes; arrow keys move between all four.
 */
function LevelPicker({ value, onChange }: { value: string; onChange: (key: string, tapped?: boolean) => void }) {
  const { t, lang } = useLang();
  const reduce = useReducedMotion();
  const keys = how.levels.map((l) => l.key);

  const onKeyDown = (e: KeyboardEvent) => {
    const i = keys.indexOf(value);
    const next = e.key === "ArrowRight" || e.key === "ArrowDown" ? i + 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? i - 1 : null;
    if (next === null || next < 0 || next >= keys.length) return;
    e.preventDefault();
    onChange(keys[next]);
    document.getElementById(`level-tab-${keys[next]}`)?.focus();
  };

  const groups = [
    { ours: false, title: how.service, sub: how.serviceSub, levels: how.levels.slice(0, 2), offset: 0 },
    { ours: true, title: how.manager, sub: how.managerSub, levels: how.levels.slice(2), offset: 2 },
  ];

  return (
    <div role="tablist" aria-label={t(how.title)} onKeyDown={onKeyDown} className="grid gap-3 md:grid-cols-2">
      {groups.map((g) => (
        <div key={String(g.ours)} className={cn("rounded-3xl p-2", g.ours ? "bg-ink" : "bg-secondary")}>
          <p className={cn("flex items-center justify-center gap-2 px-3 pb-2 pt-1.5 text-[13px] font-semibold", g.ours ? "text-white" : "text-muted-foreground")}>
            {g.ours ? (
              <span className="grid size-6 place-items-center rounded-full bg-white">
                <WaveMark className="h-[7px]" />
              </span>
            ) : null}
            {t(g.title)}
            <span className={cn("font-normal", g.ours ? "text-white/60" : "")}>· {t(g.sub)}</span>
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {g.levels.map((l, j) => {
              const n = g.offset + j + 1;
              const selected = value === l.key;
              return (
                <button
                  key={l.key}
                  id={`level-tab-${l.key}`}
                  type="button"
                  role="tab"
                  aria-controls="level-panel"
                  aria-selected={selected}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => onChange(l.key, true)}
                  className="relative rounded-2xl px-2 py-3 text-center"
                >
                  {selected ? (
                    <motion.span
                      layoutId="level-indicator"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                      className={cn("absolute inset-0 rounded-2xl", g.ours ? "bg-brand" : "bg-white shadow-sm")}
                    />
                  ) : null}
                  <span className="relative flex flex-col items-center gap-0.5">
                    <span
                      className={cn(
                        "text-[12px] font-semibold uppercase tracking-wide",
                        g.ours ? (selected ? "text-white/80" : "text-white/55") : "text-muted-foreground",
                      )}
                    >
                      {lang === "zh" ? `第 ${n} 层` : `Level ${n}`}
                    </span>
                    <span
                      className={cn(
                        "text-[14px] font-semibold leading-tight sm:text-[15px]",
                        g.ours ? "text-white" : "text-ink",
                      )}
                    >
                      {t(l.name)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Levels() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [level, setLevel] = useState("l1");
  const index = how.levels.findIndex((l) => l.key === level);
  const current = how.levels[index];
  const detailRef = useRef<HTMLDivElement>(null);

  // On a phone the stacked picker pushes the level's content far below the
  // tabs, so a tap would change something off screen. After a tap (not arrow
  // keys, which must keep focus on the tabs), bring the content into view.
  const pick = (key: string, tapped?: boolean) => {
    setLevel(key);
    if (!tapped || !window.matchMedia("(max-width: 1023px)").matches) return;
    window.setTimeout(() => {
      const el = detailRef.current;
      if (el && el.getBoundingClientRect().top > window.innerHeight * 0.55) {
        el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      }
    }, 280);
  };

  return (
    <section id="how" className="py-24 sm:py-32">
      <Shell>
        <div className="max-w-[720px]">
          <H2>{t(how.title)}</H2>
          <p className="mt-5 text-[17px] leading-relaxed text-muted-foreground">{t(how.lede)}</p>
          <p className="mt-5 text-[18px] font-semibold leading-snug text-ink">{t(how.difference)}</p>
        </div>

        <div className="mt-14">
          <LevelPicker value={level} onChange={pick} />

          <div
            ref={detailRef}
            id="level-panel"
            role="tabpanel"
            aria-labelledby={`level-tab-${level}`}
            tabIndex={0}
            className="scroll-mt-24 rounded-3xl"
          >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={level}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <div>
                <h3 className="font-display text-[30px] font-bold tracking-tight text-ink">{t(current.name)}</h3>
                <p className="mt-4 max-w-[460px] text-[17px] leading-relaxed text-muted-foreground">{t(current.body)}</p>
              </div>
              <LevelVisual level={level} />
            </motion.div>
          </AnimatePresence>
          </div>
        </div>
      </Shell>
    </section>
  );
}

/* -------------------------------------------------------------- features */

export function Features() {
  const { t } = useLang();
  // The client asked for this section by name; Levels already explains how
  // each feature works, so here each one says only what it does for the owner.
  return (
    <section id="features" className="bg-secondary/60 py-24 sm:py-28">
      <Shell>
        <H2 className="max-w-[640px]">{t(features.title)}</H2>
        <dl className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {features.items.map((item) => (
            <div key={item.key} className="border-t border-ink/15 pt-6">
              <dt className="text-[18px] font-semibold text-ink">{t(item.title)}</dt>
              <dd className="mt-2.5 text-[16px] leading-relaxed text-muted-foreground">{t(item.body)}</dd>
            </div>
          ))}
        </dl>
      </Shell>
    </section>
  );
}

/* ----------------------------------------------------------------- proof */

export function Proof() {
  const { t } = useLang();
  return (
    <section id="proof" className="py-24 sm:py-28">
      <Shell>
        <H2>{t(proof.title)}</H2>
        <p className="mt-4 max-w-[560px] text-[15px] leading-relaxed text-muted-foreground">{t(proof.note)}</p>
        {/* Targets, not results: static figures at a modest size, no counting animation. */}
        <dl className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-3">
          {proof.stats.map((stat) => (
            <div key={stat.label.en} className="border-t border-border pt-5">
              <dt className="sr-only">{t(stat.label)}</dt>
              <dd className="flex items-baseline gap-3">
                <span className="font-display text-[32px] font-bold leading-none tracking-tight text-ink">{stat.value}</span>
                <span className="text-[15px] leading-snug text-muted-foreground" aria-hidden="true">
                  {t(stat.label)}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Shell>
    </section>
  );
}

/* --------------------------------------------------------------- pricing */

export function Pricing() {
  const { t } = useLang();
  return (
    <section id="pricing" className="bg-secondary/60 py-24 sm:py-28">
      <Shell>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <H2>{t(pricing.title)}</H2>
          <p className="text-[14px] text-muted-foreground">{t(pricing.note)}</p>
        </div>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {pricing.tiers.map((tier) => {
            const featured = tier.key === "guided";
            return (
              <article
                key={tier.key}
                className={cn(
                  "relative flex flex-col rounded-3xl p-8",
                  featured ? "bg-ink text-white shadow-[0_30px_60px_-25px_rgb(22_19_31/0.6)] lg:-my-4 lg:py-12" : "bg-white ring-1 ring-border",
                )}
              >
                {featured ? (
                  <span className="absolute right-6 top-6 rounded-full bg-brand px-3 py-1 text-[12px] font-semibold text-white">
                    {t(pricing.recommended)}
                  </span>
                ) : null}
                <h3 className={cn("text-[22px] font-bold", featured ? "text-white" : "text-ink")}>{t(tier.name)}</h3>
                <p className={cn("mt-1 text-[15px]", featured ? "text-white/70" : "text-muted-foreground")}>{t(tier.pitch)}</p>
                <p className="mt-7 flex min-h-12 items-baseline gap-1.5">
                  {tier.price && tier.period ? (
                    <>
                      <span className={cn("font-display text-[40px] font-bold tracking-tight", featured ? "text-white" : "text-ink")}>{tier.price}</span>
                      <span className={featured ? "text-white/60" : "text-muted-foreground"}>{t(tier.period)}</span>
                    </>
                  ) : (
                    <span className="font-display text-[34px] font-bold leading-[1.4] tracking-tight text-ink">{t(pricing.quote)}</span>
                  )}
                </p>
                {tier.equivalent ? (
                  <p className={cn("mt-1 text-[14px] font-medium", featured ? "text-brand-light" : "text-brand-strong")}>{t(tier.equivalent)}</p>
                ) : null}
                <p className={cn("mt-4 text-[14.5px] leading-relaxed", featured ? "text-white/70" : "text-muted-foreground")}>{t(tier.fit)}</p>
                <ul className="mt-7 grid gap-3">
                  {tier.items.map((item) => (
                    <li key={item.en} className="flex items-start gap-3 text-[15px]">
                      <Check className={cn("mt-0.5 size-4 shrink-0", featured ? "text-brand-light" : "text-brand-strong")} strokeWidth={3} />
                      {t(item)}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-9">
                  <DemoLink
                    size="lg"
                    variant={featured ? "primary" : "outline"}
                    className={cn("w-full font-semibold", !featured && "border-ink/15 text-ink")}
                  >
                    {t(tier.cta)}
                  </DemoLink>
                </div>
              </article>
            );
          })}
        </div>
      </Shell>
    </section>
  );
}

/* ------------------------------------------------------------------- faq */

export function Faq() {
  const { t } = useLang();
  return (
    <section id="faq" className="py-24 sm:py-28">
      <Shell className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20">
        <H2>{t(faq.title)}</H2>
        <BouncyAccordion
          defaultValue={faq.items[0].id}
          // Long questions wrap instead of being cut off with an ellipsis on phones.
          classNames={{
            title: "whitespace-normal overflow-visible py-3 leading-snug",
            // The item card clips overflow, so the focus ring is drawn inside it.
            trigger: "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-[var(--focus-ring)] focus-visible:-outline-offset-4",
          }}
          items={faq.items.map((item) => ({ id: item.id, title: t(item.q), description: t(item.a) }))}
        />
      </Shell>
    </section>
  );
}

/**
 * The static export bakes the build year into the HTML. Render that first so
 * server and client agree, then switch to the visitor's year after load.
 */
const BUILD_YEAR = new Date().getFullYear();

function CurrentYear() {
  const [year, setYear] = useState(BUILD_YEAR);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setYear(new Date().getFullYear());
  }, []);
  return <>{year}</>;
}

/* ---------------------------------------------------------------- finale */

export function Finale() {
  const { t } = useLang();
  return (
    <>
      <section className="py-24 sm:py-28">
        <Shell>
          <div className="relative overflow-hidden rounded-[36px] bg-[linear-gradient(150deg,#8b2cff_0%,#5a1fe0_55%,#3f17cc_100%)] px-6 [--focus-ring:#fff] py-20 text-center sm:px-16">
            <div className="relative flex flex-col items-center">
              <h2 className="max-w-[720px] break-keep [overflow-wrap:anywhere] font-display text-[clamp(30px,4.4vw,54px)] font-bold leading-[1.06] tracking-[-0.03em] text-balance text-white">
                {t(finale.title)}
              </h2>
              <p className="mt-5 max-w-[480px] text-[17px] text-white/85">{t(finale.sub)}</p>
              <DemoButton className="mt-10 bg-white text-[15px] text-ink hover:bg-white/90" />
              <DemoHint className="mt-3 text-white/85" />
            </div>
          </div>
        </Shell>
      </section>
      <footer className="border-t border-border">
        <Shell className="flex flex-col gap-6 py-10 text-[14px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3">
            <Brand />
            <p>{t(finale.footer)}</p>
            {/* Shown only once the client supplies real details (lib/content.ts CONTACT). */}
            {CONTACT.whatsapp || CONTACT.email || CONTACT.company ? (
              <address className="flex flex-col gap-1 not-italic">
                {CONTACT.whatsapp ? (
                  <a
                    className="underline-offset-4 hover:text-ink hover:underline"
                    href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`}
                  >
                    WhatsApp {CONTACT.whatsapp}
                  </a>
                ) : null}
                {CONTACT.email ? (
                  <a className="underline-offset-4 hover:text-ink hover:underline" href={`mailto:${CONTACT.email}`}>
                    {CONTACT.email}
                  </a>
                ) : null}
                {CONTACT.company ? <span>{CONTACT.company}</span> : null}
              </address>
            ) : null}
          </div>
          <div className="flex flex-col gap-3 sm:items-end">
            <LangSwitch />
            <p>
              © <CurrentYear /> Wave AI
            </p>
          </div>
        </Shell>
      </footer>
    </>
  );
}
