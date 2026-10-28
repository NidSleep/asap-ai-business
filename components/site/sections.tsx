"use client";

import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  Clock3,
  Layers,
  MessageSquareReply,
  PhoneCall,
  Repeat,
  ShieldCheck,
  Sparkles,
  UserMinus,
  Hourglass,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, type ReactNode } from "react";
import { ButtonLink } from "@/components/motion/button";
import { NumberTicker } from "@/components/motion/number-ticker";
import { Tabs, TabsList, TabsTrigger } from "@/components/motion/tabs";
import { Brand } from "@/components/site/header";
import { HeroPhone } from "@/components/site/hero-phone";
import { WaveMark } from "@/components/site/mark";
import {
  DEMO_URL,
  demo,
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
  return <div className={cn("mx-auto w-full max-w-[1200px] px-5 sm:px-8", className)}>{children}</div>;
}

function H2({ children, className }: { children: ReactNode; className?: string }) {
  const { lang } = useLang();
  return (
    <h2
      className={cn(
        lang === "zh" && "break-keep",
        "font-display text-[clamp(30px,4vw,48px)] font-bold leading-[1.08] tracking-[-0.03em] text-balance text-navy",
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
    <ButtonLink href={DEMO_URL} target="_blank" rel="noopener" size={size} className={cn("font-semibold", className)}>
      {t(demo)}
      <ArrowUpRight className="size-4" />
    </ButtonLink>
  );
}

/** Amber tag for anything the client still has to supply. */
function Pending({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-dashed border-amber-400 bg-amber-50 px-2.5 py-0.5 text-[11.5px] font-medium text-amber-700">
      {children}
    </span>
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
          <p className="inline-flex items-center gap-2 text-[14px] font-medium text-green-ink">
            <span className="size-2 rounded-full bg-green" />
            {t(hero.eyebrow)}
          </p>
          {/* Chinese breaks only at the phrase marks in the copy, never mid-word. */}
          <h1 className={cn("mt-5 font-display text-[clamp(34px,4.5vw,56px)] font-bold leading-[1.08] tracking-[-0.04em] text-navy", lang === "zh" && "break-keep")}>
            <span className="block text-balance">{t(hero.title)}</span>
            <span className="mt-1 block text-balance text-navy/45">{t(hero.titleAccent)}</span>
          </h1>
          <p className="mt-6 max-w-[540px] text-[17px] leading-[1.65] text-muted-foreground sm:text-[18px]">{t(hero.lede)}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <DemoButton className="text-[15px]" />
            <ButtonLink href="#how" variant="ghost" size="lg" className="text-[15px] text-navy hover:text-navy">
              {t(hero.secondary)}
              <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-muted-foreground">
            {hero.trust.map((item) => (
              <li key={item.en} className="flex items-center gap-2">
                <Check className="size-4 text-green-ink" strokeWidth={3} />
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

export function Pain() {
  const { t } = useLang();
  const icons = [Hourglass, Clock3, UserMinus];
  return (
    <section id="pain" className="bg-secondary/60 py-24 sm:py-28">
      <Shell>
        <H2 className="max-w-[640px]">{t(pain.title)}</H2>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {pain.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <article key={item.title.en} className="rounded-3xl bg-white p-7 ring-1 ring-border">
                <span className="grid size-11 place-items-center rounded-2xl bg-red-50 text-red-500">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-6 text-[20px] font-semibold text-navy">{t(item.title)}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-muted-foreground">{t(item.body)}</p>
              </article>
            );
          })}
        </div>
      </Shell>
    </section>
  );
}

/* ---------------------------------------------------------------- levels */

function MockFrame({ children }: { children: ReactNode }) {
  const { t } = useLang();
  return (
    <div className="relative rounded-3xl bg-navy p-6 text-white sm:p-8">
      <span className="absolute right-5 top-4 text-[11px] text-white/40">{t(how.mock)}</span>
      {children}
    </div>
  );
}

function LevelVisual({ level }: { level: string }) {
  const { t } = useLang();
  if (level === "l1") {
    return (
      <MockFrame>
        <div className="mt-4 flex flex-col gap-3">
          <p className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-white px-4 py-2.5 text-[15px] text-navy">{t(how.l1.q)}</p>
          <p className="max-w-[80%] rounded-2xl rounded-bl-md bg-white/10 px-4 py-2.5 text-[15px]">{t(how.l1.a)}</p>
          <p className="flex items-center gap-1.5 text-[12px] text-green">
            <Clock3 className="size-3.5" /> 0:28
          </p>
        </div>
      </MockFrame>
    );
  }
  if (level === "l2") {
    return (
      <MockFrame>
        <dl className="mt-4 divide-y divide-white/10">
          {how.l2.fields.map((f) => (
            <div key={f.k.en} className="flex justify-between gap-4 py-3 text-[15px]">
              <dt className="text-white/55">{t(f.k)}</dt>
              <dd className="text-right font-medium">{t(f.v)}</dd>
            </div>
          ))}
        </dl>
        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-green px-3 py-1 text-[13px] font-semibold text-navy">
          <Sparkles className="size-3.5" />
          {t(how.l2.intent)}
        </span>
      </MockFrame>
    );
  }
  if (level === "l3") {
    return (
      <MockFrame>
        <ol className="mt-4 grid gap-0">
          {how.l3.steps.map((st, i) => (
            <li key={st.day.en} className="relative flex gap-4 pb-6 last:pb-0">
              {i < how.l3.steps.length - 1 ? <span className="absolute left-[11px] top-7 h-[calc(100%-20px)] w-px bg-white/15" /> : null}
              <span className={cn("grid size-6 shrink-0 place-items-center rounded-full", i === 2 ? "bg-green text-navy" : "bg-white/15")}>
                {i === 2 ? <Check className="size-3.5" strokeWidth={3} /> : <span className="size-1.5 rounded-full bg-white" />}
              </span>
              <div>
                <p className="text-[12px] text-white/50">{t(st.day)}</p>
                <p className="text-[16px] font-medium">{t(st.text)}</p>
              </div>
            </li>
          ))}
        </ol>
      </MockFrame>
    );
  }
  return (
    <MockFrame>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {how.l4.columns.map((col) => (
          <div key={col.label.en} className="rounded-2xl bg-white/[0.07] p-3">
            <p className="text-[12px] text-white/55">{t(col.label)}</p>
            <p className="mt-1 font-display text-[28px] font-bold tabular-nums">{col.count}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-[12px] text-white/55">{t(how.l4.today)}</p>
      <ul className="mt-2 grid gap-2">
        {how.l4.leads.map((lead) => (
          <li key={lead.en} className="flex items-center gap-3 rounded-xl bg-white/[0.07] px-3 py-2.5 text-[14px]">
            <PhoneCall className="size-4 text-green" />
            {t(lead)}
          </li>
        ))}
      </ul>
      <p className="mt-5 flex items-center gap-2 text-[13px] text-green">
        <ShieldCheck className="size-4" />
        {t(how.l4.owned)}
      </p>
    </MockFrame>
  );
}

export function Levels() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [level, setLevel] = useState("l1");
  const index = how.levels.findIndex((l) => l.key === level);
  const current = how.levels[index];

  return (
    <section id="how" className="py-24 sm:py-32">
      <Shell>
        <div className="max-w-[720px]">
          <H2>{t(how.title)}</H2>
          <p className="mt-5 text-[17px] leading-relaxed text-muted-foreground">{t(how.lede)}</p>
          <p className="mt-5 border-l-2 border-green pl-4 text-[16px] font-medium text-navy">{t(how.difference)}</p>
        </div>

        <div className="mt-14">
          {/* Which levels count as customer service and which as sales manager. */}
          <div className="grid grid-cols-4 gap-2 text-[12px] font-semibold sm:text-[13px]">
            <p className="col-span-2 rounded-full bg-secondary px-4 py-2 text-center text-muted-foreground">
              {t(how.service)} · <span className="font-normal">{t(how.serviceSub)}</span>
            </p>
            <p className="col-span-2 rounded-full bg-navy px-4 py-2 text-center text-white">
              {t(how.manager)} · <span className="font-normal text-white/70">{t(how.managerSub)}</span>
            </p>
          </div>
          <Tabs value={level} onValueChange={setLevel} variant="segment" className="mt-3 w-full">
            <TabsList className="grid w-full grid-cols-4 rounded-2xl bg-secondary p-1" wrapperClassName="w-full">
              {how.levels.map((l, i) => (
                <TabsTrigger
                  key={l.key}
                  value={l.key}
                  className="h-auto w-full rounded-xl px-2 py-3 sm:px-4"
                  indicatorClassName="rounded-xl bg-white shadow-sm"
                >
                  <span className="flex flex-col items-center gap-0.5 text-center">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-green-ink">Level {i + 1}</span>
                    <span className="text-[13px] font-semibold text-navy sm:text-[15px]">{t(l.name)}</span>
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

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
                <p className="font-display text-[64px] font-bold leading-none text-navy/10">0{index + 1}</p>
                <h3 className="mt-2 font-display text-[30px] font-bold tracking-tight text-navy">{t(current.name)}</h3>
                <p className="mt-4 max-w-[460px] text-[17px] leading-relaxed text-muted-foreground">{t(current.body)}</p>
                <p className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-navy">
                  <span className={cn("size-2 rounded-full", index < 2 ? "bg-muted-foreground/40" : "bg-navy")} />
                  {index < 2 ? t(how.service) : t(how.manager)}
                </p>
                {/* Which plans unlock this level, so the ladder and the pricing tell one story. */}
                <div className="mt-4 flex flex-wrap items-center gap-2 text-[13px]">
                  <span className="text-muted-foreground">{t(how.includedIn)}</span>
                  {pricing.tiers
                    .filter((tier) => tier.levels > index)
                    .map((tier) => (
                      <a
                        key={tier.key}
                        href="#pricing"
                        className="rounded-full border border-border bg-white px-3 py-1 font-medium text-navy transition-colors hover:border-green"
                      >
                        {t(tier.name)}
                      </a>
                    ))}
                </div>
              </div>
              <LevelVisual level={level} />
            </motion.div>
          </AnimatePresence>
        </div>
      </Shell>
    </section>
  );
}

/* -------------------------------------------------------------- features */

export function Features() {
  const { t } = useLang();
  const icons: Record<string, typeof MessageSquareReply> = {
    reply: MessageSquareReply,
    follow: Repeat,
    channels: Layers,
    reports: BarChart3,
  };
  return (
    <section id="features" className="bg-secondary/60 py-24 sm:py-28">
      <Shell>
        <H2 className="max-w-[640px]">{t(features.title)}</H2>
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {features.items.map((item) => {
            const Icon = icons[item.key];
            return (
              <article key={item.key} className="flex gap-5 rounded-3xl bg-white p-7 ring-1 ring-border">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-green/15 text-green-ink">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-[20px] font-semibold text-navy">{t(item.title)}</h3>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-muted-foreground">{t(item.body)}</p>
                </div>
              </article>
            );
          })}
        </div>
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
        <div className="flex flex-wrap items-end justify-between gap-4">
          <H2>{t(proof.title)}</H2>
          <Pending>{t(proof.placeholder)}</Pending>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-border ring-1 ring-border sm:grid-cols-3">
          {proof.stats.map((stat) => (
            <div key={stat.label.en} className="bg-white p-8">
              <p className="font-display text-[56px] font-bold leading-none tracking-tight text-navy">
                <NumberTicker value={stat.value} startOnView suffix={t(stat.suffix)} />
              </p>
              <p className="mt-3 text-[16px] text-muted-foreground">{t(stat.label)}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-3xl border-2 border-dashed border-amber-300 bg-amber-50/50 p-7">
          <p className="text-[16px] font-semibold text-amber-800">{t(proof.caseSlot.title)}</p>
          <p className="mt-1.5 text-[15px] text-amber-700/90">{t(proof.caseSlot.body)}</p>
        </div>
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
          <Pending>{t(pricing.draft)}</Pending>
        </div>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {pricing.tiers.map((tier) => {
            const featured = tier.key === "guided";
            return (
              <article
                key={tier.key}
                className={cn(
                  "relative flex flex-col rounded-3xl p-8",
                  featured ? "bg-navy text-white shadow-[0_30px_60px_-25px_rgb(11_27_63/0.6)] lg:-my-4 lg:py-12" : "bg-white ring-1 ring-border",
                )}
              >
                {featured ? (
                  <span className="absolute right-6 top-6 rounded-full bg-green px-3 py-1 text-[12px] font-semibold text-navy">
                    {t(pricing.recommended)}
                  </span>
                ) : null}
                <h3 className={cn("text-[22px] font-bold", featured ? "text-white" : "text-navy")}>{t(tier.name)}</h3>
                <p className={cn("mt-1 text-[15px]", featured ? "text-white/70" : "text-muted-foreground")}>{t(tier.pitch)}</p>
                <p className="mt-7 flex min-h-12 items-baseline gap-1.5">
                  {tier.price ? (
                    <>
                      <span className={cn("font-display text-[40px] font-bold tracking-tight", featured ? "text-white" : "text-navy")}>{tier.price}</span>
                      <span className={featured ? "text-white/60" : "text-muted-foreground"}>{t(pricing.perMonth)}</span>
                    </>
                  ) : (
                    <span className="font-display text-[28px] font-bold leading-[1.4] tracking-tight text-navy">{t(pricing.quote)}</span>
                  )}
                </p>
                <div className="mt-6">
                  <p className={cn("flex justify-between text-[12.5px] font-medium", featured ? "text-white/70" : "text-muted-foreground")}>
                    <span>{t(pricing.levelsLabel)}</span>
                    <span className={featured ? "text-green" : "text-green-ink"}>Level 1–{tier.levels}</span>
                  </p>
                  <div className="mt-2 grid grid-cols-4 gap-1" aria-hidden="true">
                    {how.levels.map((l, i) => (
                      <span
                        key={l.key}
                        className={cn(
                          "h-1.5 rounded-full",
                          i < tier.levels ? "bg-green" : featured ? "bg-white/15" : "bg-border",
                        )}
                      />
                    ))}
                  </div>
                </div>
                <p className={cn("mt-5 text-[14.5px] leading-relaxed", featured ? "text-white/70" : "text-muted-foreground")}>{t(tier.fit)}</p>
                <ul className="mt-7 grid gap-3">
                  {tier.items.map((item) => (
                    <li key={item.en} className="flex items-start gap-3 text-[15px]">
                      <Check className={cn("mt-0.5 size-4 shrink-0", featured ? "text-green" : "text-green-ink")} strokeWidth={3} />
                      {t(item)}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-9">
                  <ButtonLink
                    href={DEMO_URL}
                    target="_blank"
                    rel="noopener"
                    size="lg"
                    variant={featured ? "primary" : "outline"}
                    className={cn("w-full font-semibold", !featured && "border-navy/15 text-navy")}
                  >
                    {t(demo)}
                  </ButtonLink>
                </div>
              </article>
            );
          })}
        </div>
      </Shell>
    </section>
  );
}

/* ---------------------------------------------------------------- finale */

export function Finale() {
  const { t } = useLang();
  return (
    <>
      <section className="py-24 sm:py-28">
        <Shell>
          <div className="relative overflow-hidden rounded-[36px] bg-navy px-6 py-20 text-center sm:px-16">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_80%_at_50%_120%,rgb(31_209_106/0.35),transparent_70%)]" />
            <div className="relative flex flex-col items-center">
              <span className="grid size-14 place-items-center rounded-2xl bg-green text-navy">
                <WaveMark className="h-5 w-7" />
              </span>
              <h2 className="mt-8 max-w-[720px] break-keep font-display text-[clamp(30px,4.4vw,54px)] font-bold leading-[1.06] tracking-[-0.03em] text-balance text-white">
                {t(finale.title)}
              </h2>
              <p className="mt-5 max-w-[480px] text-[17px] text-white/70">{t(finale.sub)}</p>
              <DemoButton className="mt-10 text-[15px]" />
            </div>
          </div>
        </Shell>
      </section>
      <footer className="border-t border-border">
        <Shell className="flex flex-col gap-4 py-10 text-[14px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <Brand />
          <p>{t(finale.footer)}</p>
          <p>© {new Date().getFullYear()} Wave AI</p>
        </Shell>
      </footer>
    </>
  );
}
