"use client";

import { ArrowRight, RotateCcw } from "lucide-react";
import { AnimatePresence, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  DynamicIsland,
  DynamicIslandView,
} from "@/components/motion/dynamic-island";
import { NotificationStack } from "@/components/motion/notification-stack";
import { Tabs, TabsList, TabsTrigger } from "@/components/motion/tabs";
import {
  BookedRow,
  ChatHeader,
  Chips,
  CustomerLine,
  HandoffRow,
  WaveLine,
  WaveTyping,
} from "@/components/site/chat";
import { WaveMark } from "@/components/site/mark";
import { Phone } from "@/components/site/phone";
import { chatUi, hero, phones, stories, type Story } from "@/lib/content";
import { useLang, type Copy } from "@/lib/i18n";
import { cn } from "@/lib/utils";

// One story told left to right across the four phones. Each entry is how long
// to hold that step before moving on.
const STEP_MS = [500, 700, 1300, 900, 700, 1400, 1000, 700, 900, 800, 1000, 1000, 1200];
const LAST = STEP_MS.length;

function useStory() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStep(LAST);
      return;
    }
    if (!inView || step >= LAST) return;
    const id = window.setTimeout(() => setStep((s) => s + 1), STEP_MS[step]);
    return () => window.clearTimeout(id);
  }, [inView, reduce, step, run]);

  const replay = () => {
    setStep(0);
    setRun((r) => r + 1);
  };

  return { ref, step, done: step >= LAST, replay };
}

function Island({ active, detail }: { active: boolean; detail: Copy }) {
  const { t } = useLang();
  return (
    <DynamicIsland
      view={active ? "enquiry" : null}
      className="bg-black text-white shadow-none"
      compact={<span className="block h-[22px] w-[86px]" />}
    >
      <DynamicIslandView id="enquiry" className="px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <span className="grid size-7 place-items-center rounded-full bg-wave">
            <WaveMark className="h-2.5 w-3.5" />
          </span>
          <div className="whitespace-nowrap text-left leading-tight">
            <p className="text-[12px] font-semibold">{t(chatUi.newEnquiry)}</p>
            <p className="text-[11px] text-white/60">{t(detail)}</p>
          </div>
        </div>
      </DynamicIslandView>
    </DynamicIsland>
  );
}

function ChatScreen({ story, children }: { story: Story; children: ReactNode }) {
  return (
    <>
      <ChatHeader compact business={story.business} channel={story.channel} />
      <div className="flex flex-1 flex-col justify-end gap-2.5 px-3 pb-6 pt-3">
        <AnimatePresence initial={false} mode="popLayout">
          {children}
        </AnimatePresence>
      </div>
    </>
  );
}

function OwnerScreen({ story, shown }: { story: Story; shown: boolean }) {
  const { t } = useLang();
  const items = story.morning.map((row) => ({
    id: row.id,
    title: t(row.title),
    description: t(row.description),
    trailing: row.meta,
  }));
  return (
    <div className="flex flex-1 flex-col px-3">
      <div className="pt-2 text-center text-white">
        <p className="text-[13px] font-medium text-white/60">{t(chatUi.overnight)}</p>
        <p className="font-display text-[64px] font-semibold leading-none tracking-tight tabular-nums">
          8:00
        </p>
      </div>
      <div
        className={cn(
          "mt-auto pb-4 transition-[opacity,transform] duration-700",
          shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        )}
      >
        <NotificationStack
          items={items}
          defaultExpanded
          collapsedLabel="Wave AI"
          expandedLabel="Wave AI"
          classNames={{
            card: "bg-white/[0.07] backdrop-blur-xl border-white/10",
            title: "text-[12.5px] text-white",
            description: "text-[11.5px]",
            trailing: "text-[10.5px]",
            count: "bg-wave dark:bg-wave text-white",
          }}
        />
      </div>
    </div>
  );
}

export function HeroPhones() {
  const { t } = useLang();
  const { ref, step, done, replay } = useStory();
  const [key, setKey] = useState(stories[0].key);
  const story = stories.find((s) => s.key === key)!;
  const s = (n: number) => step >= n;

  const pick = (next: string) => {
    if (next === key) return;
    setKey(next);
    replay();
  };

  const screens = [
    <ChatScreen key="p1" story={story}>
      {s(1) ? <CustomerLine key={`${key}-a`} line={story.ask} /> : null}
      {s(2) && !s(3) ? <WaveTyping key="t" /> : null}
      {s(3) ? <WaveLine key={`${key}-b`} line={story.answer} source={story.source} /> : null}
    </ChatScreen>,
    <ChatScreen key="p2" story={story}>
      {s(4) ? <CustomerLine key={`${key}-a`} line={story.follow} /> : null}
      {s(5) && !s(6) ? <WaveTyping key="t" /> : null}
      {s(6) ? <WaveLine key={`${key}-b`} line={story.reply} /> : null}
    </ChatScreen>,
    <ChatScreen key="p3" story={story}>
      {s(8) ? <WaveLine key={`${key}-b`} line={story.offer} /> : null}
      {s(8) ? (
        <Chips key={`${key}-c`} options={story.slots} picked={s(9) ? story.slots[story.slotPick] : undefined} />
      ) : null}
      {s(10) ? <WaveLine key={`${key}-d`} line={story.confirmQ} /> : null}
      {s(10) ? (
        <Chips key={`${key}-e`} options={story.confirm} picked={s(11) ? story.confirm[0] : undefined} />
      ) : null}
      {s(11) ? <BookedRow key={`${key}-f`} text={story.booked} /> : null}
      {s(11) ? <HandoffRow key={`${key}-g`} text={story.handoff} /> : null}
    </ChatScreen>,
    <OwnerScreen key="p4" story={story} shown={s(12)} />,
  ];

  // Phones sit on a gentle arc, the middle pair highest.
  const lift = ["lg:translate-y-16", "lg:translate-y-0", "lg:translate-y-6", "lg:translate-y-20"];

  return (
    <div ref={ref} className="relative">
      <div className="mb-10 flex flex-col items-center gap-3 sm:mb-14">
        <p className="text-[13px] text-muted-foreground">{t(hero.pick)}</p>
        <Tabs value={key} onValueChange={pick} variant="pill">
          <TabsList
            aria-label={t(hero.pick)}
            wrapperClassName="no-scrollbar max-w-[calc(100vw-40px)] overflow-x-auto"
            className="bg-white/[0.06]"
          >
            {stories.map((st) => (
              <TabsTrigger key={st.key} value={st.key} className="whitespace-nowrap">
                {t(st.tab)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <div className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 lg:mx-0 lg:justify-center lg:overflow-visible lg:px-0">
        {phones.map((phone, i) => (
          <figure
            key={phone.time}
            className={cn("flex snap-center flex-col items-center gap-4", lift[i])}
          >
            <figcaption className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-1.5 text-[13px] font-semibold text-white backdrop-blur">
              <span className="tabular-nums text-muted-foreground">{phone.time}</span>
              {t(phone.label)}
              <ArrowRight className="size-3.5 text-muted-foreground" />
            </figcaption>
            <Phone
              time={phone.time}
              island={i === 0 ? <Island active={s(2) && !s(4)} detail={story.enquiry} /> : undefined}
            >
              {screens[i]}
            </Phone>
          </figure>
        ))}
      </div>
      <div className="mt-6 flex justify-center lg:mt-24">
        <button
          type="button"
          onClick={replay}
          disabled={!done}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] text-muted-foreground transition-opacity hover:text-foreground disabled:opacity-0"
        >
          <RotateCcw className="size-3.5" />
          {t({ en: "Replay", zh: "重播" })}
        </button>
      </div>
    </div>
  );
}
