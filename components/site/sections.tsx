"use client";

import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  Clock3,
  Hourglass,
  Layers,
  Lightbulb,
  MessageSquareReply,
  Repeat,
  UserMinus,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type KeyboardEvent, type ReactNode } from "react";
import { BouncyAccordion } from "@/components/motion/bouncy-accordion";
import { ButtonLink } from "@/components/motion/button";
import { DemoHint, DemoLink } from "@/components/site/demo-link";
import { Brand, LangSwitch } from "@/components/site/header";
import { HeroPhone } from "@/components/site/hero-phone";
import { WaveMark } from "@/components/site/mark";
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
  return <div className={cn("mx-auto w-full max-w-[1200px] px-5 sm:px-8", className)}>{children}</div>;
}

function H2({ children, className }: { children: ReactNode; className?: string }) {
  const { lang } = useLang();
  return (
    <h2
      className={cn(
        lang === "zh" && "break-keep [overflow-wrap:anywhere]",
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
          <p className="inline-flex items-center gap-2 text-[14px] font-medium text-green-ink">
            <span className="size-2 rounded-full bg-green" />
            {t(hero.eyebrow)}
          </p>
          {/* Chinese breaks only at the phrase marks in the copy, never mid-word. */}
          <h1 className={cn("mt-5 font-display text-[clamp(34px,4.5vw,56px)] font-bold leading-[1.08] tracking-[-0.04em] text-navy", lang === "zh" && "break-keep [overflow-wrap:anywhere]")}>
            <span className="block text-balance">{t(hero.title)}</span>
            <span className="mt-1 block text-balance text-navy/45">{t(hero.titleAccent)}</span>
          </h1>
          {/* Two roles, one line each, so the split between them is obvious. */}
          <ul className="mt-6 grid max-w-[560px] gap-2.5 text-[17px] leading-[1.6] text-muted-foreground sm:text-[18px]">
            {hero.roles.map((role) => (
              <li key={role.name.en}>
                <strong className="font-semibold text-navy">{t(role.name)}</strong>
                {lang === "zh" ? "：" : ": "}
                {t(role.does)}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <DemoButton className="text-[15px]" />
            <ButtonLink href="#how" variant="ghost" size="lg" className="text-[15px] text-navy hover:text-navy">
              {t(hero.secondary)}
              <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
          <DemoHint className="mt-3" />
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

function Bubble({ from, children, muted = false }: { from: "customer" | "bot"; children: ReactNode; muted?: boolean }) {
  return (
    <p
      className={cn(
        "max-w-[82%] rounded-2xl px-4 py-2.5 text-[15px]",
        from === "customer" ? "ml-auto rounded-br-md bg-white text-navy" : "rounded-bl-md bg-white/10",
        muted && "text-white/60",
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
              <X className="mt-1 size-4 shrink-0 text-red-400" />
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
          <p className="mt-2 text-center text-[13px] italic text-white/45">{t(how.l2.end)}</p>
        </div>
      </MockFrame>
    );
  }
  if (level === "l3") {
    const last = how.l3.steps.length - 1;
    return (
      <MockFrame>
        <ol className="mt-4 grid gap-0">
          {how.l3.steps.map((st, i) => (
            <li key={st.day.en} className="relative flex gap-4 pb-5 last:pb-0">
              {i < last ? <span className="absolute left-[11px] top-7 h-[calc(100%-20px)] w-px bg-white/15" /> : null}
              <span className={cn("grid size-6 shrink-0 place-items-center rounded-full", i === last ? "bg-green text-navy" : "bg-white/15")}>
                {i === last ? <Check className="size-3.5" strokeWidth={3} /> : <span className="size-1.5 rounded-full bg-white" />}
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
      <p className="mt-4 text-[13px] text-white/55">{t(how.l4.reportTitle)}</p>
      <ul className="mt-4 grid gap-4">
        {how.l4.reasons.map((r) => (
          <li key={r.label.en}>
            <p className="flex justify-between text-[14px]">
              <span>{t(r.label)}</span>
              <span className="tabular-nums text-white/60">{Math.round(r.share * 100)}%</span>
            </p>
            <span className="mt-1.5 block h-2 rounded-full bg-white/10">
              <span className="block h-full rounded-full bg-green" style={{ width: `${r.share * 100}%` }} />
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-6 flex items-center gap-2 rounded-xl bg-white/[0.07] px-3 py-2.5 text-[14px] text-green">
        <Lightbulb className="size-4 shrink-0" />
        {t(how.l4.action)}
      </p>
    </MockFrame>
  );
}

/**
 * Levels 1–2 sit in a grey box ("typical chatbots") and 3–4 in a navy box
 * ("Wave AI"), so the reader sees at a glance which half is the product.
 * One indicator glides across both boxes; arrow keys move between all four.
 */
function LevelPicker({ value, onChange }: { value: string; onChange: (key: string) => void }) {
  const { t } = useLang();
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
        <div key={String(g.ours)} className={cn("rounded-3xl p-2", g.ours ? "bg-navy" : "bg-secondary")}>
          <p className={cn("flex items-center justify-center gap-2 px-3 pb-2 pt-1.5 text-[13px] font-semibold", g.ours ? "text-white" : "text-muted-foreground")}>
            {g.ours ? (
              <span className="grid size-5 place-items-center rounded-md bg-green text-navy">
                <WaveMark className="h-2 w-3" />
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
                  aria-selected={selected}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => onChange(l.key)}
                  className="relative rounded-2xl px-2 py-3 text-center outline-none focus-visible:ring-2 focus-visible:ring-green"
                >
                  {selected ? (
                    <motion.span
                      layoutId="level-indicator"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                      className={cn("absolute inset-0 rounded-2xl", g.ours ? "bg-green" : "bg-white shadow-sm")}
                    />
                  ) : null}
                  <span className="relative flex flex-col items-center gap-0.5">
                    <span
                      className={cn(
                        "text-[11px] font-semibold uppercase tracking-wide",
                        g.ours ? (selected ? "text-navy/70" : "text-green") : "text-muted-foreground",
                      )}
                    >
                      Level {n}
                    </span>
                    <span
                      className={cn(
                        "text-[14px] font-semibold leading-tight sm:text-[15px]",
                        g.ours ? (selected ? "text-navy" : "text-white") : "text-navy",
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

  return (
    <section id="how" className="py-24 sm:py-32">
      <Shell>
        <div className="max-w-[720px]">
          <H2>{t(how.title)}</H2>
          <p className="mt-5 text-[17px] leading-relaxed text-muted-foreground">{t(how.lede)}</p>
          <p className="mt-5 border-l-2 border-green pl-4 text-[16px] font-medium text-navy">{t(how.difference)}</p>
        </div>

        <div className="mt-14">
          <LevelPicker value={level} onChange={setLevel} />

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
        <H2>{t(proof.title)}</H2>
        <p className="mt-4 max-w-[560px] text-[15px] leading-relaxed text-muted-foreground">{t(proof.note)}</p>
        {/* Targets, not results: static figures at a modest size, no counting animation. */}
        <dl className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-3">
          {proof.stats.map((stat) => (
            <div key={stat.label.en} className="border-t border-border pt-5">
              <dt className="sr-only">{t(stat.label)}</dt>
              <dd className="flex items-baseline gap-3">
                <span className="font-display text-[32px] font-bold leading-none tracking-tight text-navy">{stat.value}</span>
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
                  {tier.price && tier.period ? (
                    <>
                      <span className={cn("font-display text-[40px] font-bold tracking-tight", featured ? "text-white" : "text-navy")}>{tier.price}</span>
                      <span className={featured ? "text-white/60" : "text-muted-foreground"}>{t(tier.period)}</span>
                    </>
                  ) : (
                    <span className="font-display text-[34px] font-bold leading-[1.4] tracking-tight text-navy">{t(pricing.quote)}</span>
                  )}
                </p>
                {tier.equivalent ? (
                  <p className={cn("mt-1 text-[14px] font-medium", featured ? "text-green" : "text-green-ink")}>{t(tier.equivalent)}</p>
                ) : null}
                <p className={cn("mt-4 text-[14.5px] leading-relaxed", featured ? "text-white/70" : "text-muted-foreground")}>{t(tier.fit)}</p>
                <ul className="mt-7 grid gap-3">
                  {tier.items.map((item) => (
                    <li key={item.en} className="flex items-start gap-3 text-[15px]">
                      <Check className={cn("mt-0.5 size-4 shrink-0", featured ? "text-green" : "text-green-ink")} strokeWidth={3} />
                      {t(item)}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-9">
                  <DemoLink
                    size="lg"
                    variant={featured ? "primary" : "outline"}
                    className={cn("w-full font-semibold", !featured && "border-navy/15 text-navy")}
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
          classNames={{ title: "whitespace-normal overflow-visible py-3 leading-snug" }}
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
          <div className="relative overflow-hidden rounded-[36px] bg-navy px-6 py-20 text-center sm:px-16">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_80%_at_50%_120%,rgb(31_209_106/0.35),transparent_70%)]" />
            <div className="relative flex flex-col items-center">
              <span className="grid size-14 place-items-center rounded-2xl bg-green text-navy">
                <WaveMark className="h-5 w-7" />
              </span>
              <h2 className="mt-8 max-w-[720px] break-keep [overflow-wrap:anywhere] font-display text-[clamp(30px,4.4vw,54px)] font-bold leading-[1.06] tracking-[-0.03em] text-balance text-white">
                {t(finale.title)}
              </h2>
              <p className="mt-5 max-w-[480px] text-[17px] text-white/70">{t(finale.sub)}</p>
              <DemoButton className="mt-10 text-[15px]" />
              <DemoHint className="mt-3 text-white/70" />
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
                    className="underline-offset-4 hover:text-navy hover:underline"
                    href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`}
                  >
                    WhatsApp {CONTACT.whatsapp}
                  </a>
                ) : null}
                {CONTACT.email ? (
                  <a className="underline-offset-4 hover:text-navy hover:underline" href={`mailto:${CONTACT.email}`}>
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
