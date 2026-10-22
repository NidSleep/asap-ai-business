"use client";

import {
  ArrowDown,
  ArrowUpRight,
  Check,
  CircleHelp,
  Clock,
  Code,
  FileText,
  MessageCircle,
  Phone as PhoneIcon,
  Send,
  ShieldCheck,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, type ReactNode } from "react";
import { BouncyAccordion } from "@/components/motion/bouncy-accordion";
import { ButtonLink } from "@/components/motion/button";
import { SwipeableList } from "@/components/motion/swipeable-list";
import { Tabs, TabsList, TabsTrigger } from "@/components/motion/tabs";
import {
  BookedRow,
  ChatHeader,
  Chips,
  CustomerLine,
  HandoffRow,
  Stamp,
  WaveLine,
} from "@/components/site/chat";
import { Brand } from "@/components/site/header";
import { HeroPhones } from "@/components/site/hero-phones";
import { WaveMark } from "@/components/site/mark";
import {
  AGENT_URL,
  brief,
  chatUi,
  diagnostic,
  difference,
  faq,
  finale,
  hero,
  how,
  safety,
  stories,
  type DiagnosticKey,
} from "@/lib/content";
import { useLang, type Copy } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function Shell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-[1280px] px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

function H2({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        "font-display text-[clamp(30px,4.2vw,52px)] font-bold leading-[1.04] tracking-[-0.035em] text-balance text-white",
        className,
      )}
    >
      {children}
    </h2>
  );
}

function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0c0c0e]", className)}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ hero */

export function Hero() {
  const { t } = useLang();
  return (
    <section id="top" className="relative overflow-hidden pb-10 pt-16 sm:pt-24">
      <div aria-hidden="true" className="ridge pointer-events-none absolute inset-x-0 top-[38%] h-[900px]" />
      <Shell className="relative">
        <div className="mx-auto flex max-w-[900px] flex-col items-center text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1 pl-3.5 pr-3.5 sm:pl-1 text-[13px] text-muted-foreground">
            <span className="hidden whitespace-nowrap rounded-full bg-wave px-2 py-0.5 text-[11px] font-semibold text-white sm:inline">
              WhatsApp · Telegram · Web
            </span>
            {t(hero.badge)}
          </p>
          <h1 className="mt-6 font-display text-[clamp(40px,6.4vw,82px)] font-bold leading-[0.98] tracking-[-0.045em] text-balance text-white">
            {t(hero.title)}
          </h1>
          <p className="mt-6 max-w-[640px] text-[17px] leading-[1.6] text-muted-foreground sm:text-[19px]">
            {t(hero.lede)}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href={AGENT_URL} target="_blank" rel="noopener" size="lg" className="text-[15px]">
              {t(hero.cta)}
              <ArrowUpRight className="size-4" />
            </ButtonLink>
            <ButtonLink href="#how" variant="ghost" size="lg" className="text-[15px]">
              {t(hero.secondary)}
              <ArrowDown className="size-4" />
            </ButtonLink>
          </div>
        </div>
        <div className="mt-16 sm:mt-20">
          <HeroPhones />
        </div>
        <p className="mt-2 text-center text-[12px] text-muted-foreground/70">{t(hero.note)}</p>
      </Shell>
    </section>
  );
}

/* ---------------------------------------------------------- how it works */

const property = stories.find((s) => s.key === "property")!;

function Note({ copy }: { copy: Copy }) {
  const { t } = useLang();
  return (
    <p className="flex items-start gap-2 py-1 text-[12.5px] font-medium leading-snug text-wave">
      <WaveMark className="mt-[1px] h-3 w-4" />
      {t(copy)}
    </p>
  );
}

function TrainView() {
  const { t } = useLang();
  return (
    <Panel className="p-5 sm:p-7">
      <ul className="grid gap-2">
        {how.train.sources.map((source) => (
          <li key={source.en} className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-wave-soft text-wave">
              <FileText className="size-4" />
            </span>
            <span className="flex-1 text-[15px] text-white">{t(source)}</span>
            <span className="inline-flex items-center gap-1 text-[12px] text-emerald-300">
              <Check className="size-3.5" strokeWidth={3} />
              {t(how.train.ready)}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-col gap-2.5 rounded-2xl bg-white/[0.02] p-4">
        <CustomerLine line={property.ask} animate={false} />
        <WaveLine line={property.answer} source={property.source} animate={false} />
        <p className="mt-1 flex items-center gap-2 text-[12.5px] text-muted-foreground">
          <CircleHelp className="size-4 text-wave" />
          {t(how.train.missing)}
        </p>
      </div>
    </Panel>
  );
}

function ConnectView() {
  const { t } = useLang();
  const icons = [MessageCircle, Send, Code];
  return (
    <Panel className="p-5 sm:p-7">
      <ul className="grid gap-2">
        {how.connect.channels.map((channel, i) => {
          const Icon = icons[i];
          return (
            <li key={channel.name} className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-[#111113]">
                <Icon className="size-5" />
              </span>
              <div className="flex-1 leading-tight">
                <p className="text-[16px] font-semibold text-white">{channel.name}</p>
                <p className="mt-1 text-[13px] text-muted-foreground">{t(channel.detail)}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[12px] font-medium text-emerald-300">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                {t(how.connect.connected)}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 text-[13px] leading-relaxed text-muted-foreground">{t(how.connect.crm)}</p>
    </Panel>
  );
}

function AnswerView() {
  const { t } = useLang();
  const notes = how.answer.notes;
  return (
    <Panel>
      <ChatHeader business={property.business} channel={property.channel} />
      <div className="flex flex-col gap-3 px-4 py-5 sm:px-6">
        <Stamp>11:04 pm</Stamp>
        <Note copy={notes.language} />
        <CustomerLine line={property.ask} animate={false} />
        <Note copy={notes.source} />
        <WaveLine line={property.answer} source={property.source} animate={false} />
        <CustomerLine line={property.follow} animate={false} />
        <Note copy={notes.noPromise} />
        <WaveLine line={property.reply} animate={false} />
        <WaveLine line={property.offer} animate={false} />
        <Chips options={property.slots} picked={property.slots[property.slotPick]} />
        <Note copy={notes.confirm} />
        <WaveLine line={property.confirmQ} animate={false} />
        <Chips options={property.confirm} picked={property.confirm[0]} />
        <Note copy={notes.book} />
        <BookedRow text={property.booked} />
        <HandoffRow text={property.handoff} />
      </div>
      <a
        href={`${AGENT_URL}?start=booking`}
        target="_blank"
        rel="noopener"
        className="m-3 flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-5 pr-1.5 text-[14px] text-muted-foreground transition-colors hover:text-foreground"
      >
        <span className="flex-1">{t(how.tryIt)}</span>
        <span className="grid size-9 place-items-center rounded-full bg-white text-[#111113]">
          <Send className="size-4" />
        </span>
      </a>
    </Panel>
  );
}

function HandoffView() {
  const { t } = useLang();
  const items = property.morning.map((row) => ({
    id: row.id,
    title: t(row.title),
    description: t(row.description),
    meta: row.meta,
    leading: <WaveMark className="h-3 w-4 text-wave" />,
    leftActions: [
      { id: "call", label: t(chatUi.call), icon: <PhoneIcon className="size-4" />, tone: "primary" as const },
    ],
    rightActions: [
      { id: "later", label: t(chatUi.later), icon: <Clock className="size-4" />, tone: "warning" as const },
      { id: "done", label: t(chatUi.done), icon: <Check className="size-4" />, tone: "success" as const },
    ],
  }));

  return (
    <div className="flex flex-col gap-4">
      <Panel>
        <div className="flex items-center gap-2.5 border-b border-white/[0.06] px-5 py-4">
          <span className="grid size-8 place-items-center rounded-full bg-wave text-white">
            <WaveMark className="h-3 w-4" />
          </span>
          <p className="text-[13px] font-semibold text-white">{t(brief.from)}</p>
          <span className="ml-auto text-[12px] tabular-nums text-muted-foreground">8:00 am</span>
        </div>
        <div className="px-5 py-5">
          <h3 className="font-display text-[22px] font-bold tracking-tight text-white">{t(brief.title)}</h3>
          <dl className="mt-4 divide-y divide-white/[0.06]">
            {brief.rows.map((row) => (
              <div key={row.k.en} className="grid grid-cols-[110px_1fr] gap-4 py-2.5 text-[14px]">
                <dt className="text-muted-foreground">{t(row.k)}</dt>
                <dd className="text-white">{t(row.v)}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 rounded-2xl bg-wave-soft px-4 py-3">
            <p className="text-[12px] font-medium text-wave">{t(brief.nextLabel)}</p>
            <p className="mt-0.5 text-[15px] font-semibold text-white">{t(brief.next)}</p>
          </div>
          <p className="mt-4 flex items-center gap-2 text-[13px] text-emerald-300">
            <ShieldCheck className="size-4" />
            {t(brief.status)}
          </p>
        </div>
      </Panel>
      <Panel className="p-3">
        <p className="px-2 pb-2 pt-1 text-[12px] text-muted-foreground">
          {t(chatUi.overnight)} · {t(chatUi.swipe)}
        </p>
        <SwipeableList items={items} />
      </Panel>
    </div>
  );
}

export function How() {
  const { t } = useLang();
  const [step, setStep] = useState("train");
  const reduce = useReducedMotion();
  const index = how.steps.findIndex((s) => s.key === step);
  const copy = { train: how.train, connect: how.connect, answer: how.answer, handoff: how.handoff }[step]!;
  const views: Record<string, ReactNode> = {
    train: <TrainView />,
    connect: <ConnectView />,
    answer: <AnswerView />,
    handoff: <HandoffView />,
  };

  return (
    <section id="how" className="border-t border-white/[0.06] py-24 sm:py-32">
      <Shell className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <H2>{t(how.title)}</H2>
          <p className="mt-5 max-w-[460px] text-[17px] leading-relaxed text-muted-foreground">{t(how.lede)}</p>
          <Tabs value={step} onValueChange={setStep} variant="pill" className="mt-8">
            <TabsList wrapperClassName="no-scrollbar max-w-full overflow-x-auto" className="bg-white/[0.06]">
              {how.steps.map((s, i) => (
                <TabsTrigger key={s.key} value={s.key} className="gap-1.5 whitespace-nowrap">
                  <span className="tabular-nums opacity-50">{i + 1}</span>
                  {t(s.label)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="mt-8 max-w-[460px]"
            >
              <p className="text-[13px] font-medium tabular-nums text-wave">
                {index + 1} / {how.steps.length}
              </p>
              <h3 className="mt-2 font-display text-[24px] font-bold leading-tight tracking-tight text-white">
                {t(copy.title)}
              </h3>
              <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground">{t(copy.body)}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.28 }}
          >
            {views[step]}
          </motion.div>
        </AnimatePresence>
      </Shell>
    </section>
  );
}

/* ------------------------------------------------------------ difference */

export function Difference() {
  const { t } = useLang();
  return (
    <section id="difference" className="border-t border-white/[0.06] py-24 sm:py-32">
      <Shell>
        <div className="max-w-[780px]">
          <H2>{t(difference.title)}</H2>
          <p className="mt-5 max-w-[580px] text-[17px] leading-relaxed text-muted-foreground">{t(difference.lede)}</p>
        </div>
        <div className="mt-14 overflow-hidden rounded-[28px] border border-white/[0.08]">
          <div className="grid grid-cols-2 bg-white/[0.03] text-[13px] font-semibold">
            <p className="px-5 py-4 text-muted-foreground sm:px-8">{t(difference.typical)}</p>
            <p className="flex items-center gap-2 bg-wave-soft px-5 py-4 text-white sm:px-8">
              <WaveMark className="h-3 w-4 text-wave" />
              Wave AI
            </p>
          </div>
          {difference.rows.map((row) => (
            <div key={row.us.en} className="grid grid-cols-2 border-t border-white/[0.06] text-[15px] sm:text-[17px]">
              <p className="flex items-start gap-3 px-5 py-5 text-muted-foreground sm:px-8">
                <X className="mt-1 size-4 shrink-0 opacity-50" />
                {t(row.them)}
              </p>
              <p className="flex items-start gap-3 bg-wave-soft/50 px-5 py-5 font-medium text-white sm:px-8">
                <Check className="mt-1 size-4 shrink-0 text-wave" strokeWidth={3} />
                {t(row.us)}
              </p>
            </div>
          ))}
        </div>
      </Shell>
    </section>
  );
}

/* ------------------------------------------------------------ diagnostic */

export function Diagnostic() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [key, setKey] = useState<DiagnosticKey>("slow_reply");
  const current = diagnostic.options.find((o) => o.key === key)!;
  const steps = [
    { label: diagnostic.today, body: current.before, tone: "idle" },
    { label: diagnostic.agent, body: current.action, tone: "wave" },
    { label: diagnostic.team, body: current.outcome, tone: "done" },
  ];

  return (
    <section id="diagnostic" aria-labelledby="diagnostic-title" className="border-t border-white/[0.06] py-24 sm:py-32">
      <Shell>
        <p className="text-[14px] font-medium text-wave">{t(diagnostic.eyebrow)}</p>
        <H2 className="mt-3">
          <span id="diagnostic-title">{t(diagnostic.title)}</span>
        </H2>
        <Tabs value={key} onValueChange={(v) => setKey(v as DiagnosticKey)} variant="pill" className="mt-10">
          <TabsList
            aria-labelledby="diagnostic-title"
            wrapperClassName="no-scrollbar -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0"
            className="bg-white/[0.06]"
          >
            {diagnostic.options.map((option) => (
              <TabsTrigger key={option.key} value={option.key} className="whitespace-nowrap">
                {t(option.label)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div aria-live="polite" className="mt-8 rounded-[28px] border border-white/[0.08] bg-[#0c0c0e] p-6 sm:p-10">
          <p className="text-[13px] text-muted-foreground">{t(diagnostic.resultLabel)}</p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={key}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, filter: "blur(4px)" }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="mt-2 font-display text-[clamp(24px,3vw,36px)] font-bold tracking-tight text-white">
                {t(current.title)}
              </h3>
              <ol className="mt-8 grid gap-3 md:grid-cols-3">
                {steps.map((step, i) => (
                  <li
                    key={step.tone}
                    className={cn(
                      "relative rounded-2xl border p-5",
                      step.tone === "wave" ? "border-wave/40 bg-wave-soft" : "border-white/[0.08] bg-white/[0.03]",
                    )}
                  >
                    <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">
                      <span
                        className={cn(
                          "grid size-5 place-items-center rounded-full text-[11px] tabular-nums",
                          step.tone === "wave" ? "bg-wave text-white" : step.tone === "done" ? "bg-emerald-400 text-[#0c0c0e]" : "bg-white/10 text-white",
                        )}
                      >
                        {i + 1}
                      </span>
                      {t(step.label)}
                    </p>
                    <p className="mt-3 text-[16px] leading-snug text-white">{t(step.body)}</p>
                  </li>
                ))}
              </ol>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ButtonLink href={`${AGENT_URL}?start=${key}`} target="_blank" rel="noopener" size="lg" className="text-[15px]">
              {t(diagnostic.cta)}
              <ArrowUpRight className="size-4" />
            </ButtonLink>
            <p className="text-[13px] text-muted-foreground">{t(diagnostic.privacy)}</p>
          </div>
        </div>
      </Shell>
    </section>
  );
}

/* ---------------------------------------------------------- safety + faq */

export function SafetyAndFaq() {
  const { t } = useLang();
  return (
    <section id="faq" className="border-t border-white/[0.06] py-24 sm:py-32">
      <Shell className="grid gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <H2>{t(safety.title)}</H2>
          <ul className="mt-10 grid gap-3">
            {safety.items.map((item) => (
              <li key={item.en} className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-[16px] text-white">
                <ShieldCheck className="size-5 shrink-0 text-emerald-300" />
                {t(item)}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <H2>{t(faq.title)}</H2>
          <BouncyAccordion
            className="mt-10"
            defaultValue="train"
            items={faq.items.map((item) => ({ id: item.id, title: t(item.q), description: t(item.a) }))}
          />
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
      <section className="relative overflow-hidden border-t border-white/[0.06] py-28 sm:py-36">
        <div aria-hidden="true" className="ridge pointer-events-none absolute inset-0" />
        <Shell className="relative flex flex-col items-center text-center">
          <span className="grid size-14 place-items-center rounded-2xl bg-wave text-white shadow-[0_20px_60px_-10px_var(--wave)]">
            <WaveMark className="h-5 w-7" />
          </span>
          <H2 className="mt-8 max-w-[780px]">{t(finale.title)}</H2>
          <ButtonLink href={AGENT_URL} target="_blank" rel="noopener" size="lg" className="mt-10 text-[15px]">
            {t(hero.cta)}
            <ArrowUpRight className="size-4" />
          </ButtonLink>
        </Shell>
      </section>
      <footer className="border-t border-white/[0.06]">
        <Shell className="flex flex-col gap-4 py-10 text-[14px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <Brand />
          <p>{t(finale.footer)}</p>
          <p>© {new Date().getFullYear()} Wave AI</p>
        </Shell>
      </footer>
    </>
  );
}
