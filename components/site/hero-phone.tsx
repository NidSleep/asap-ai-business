"use client";

import { CalendarCheck, CalendarDays, Target, Timer } from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { BookedRow, ChatHeader, CustomerLine, WaveLine, WaveTyping } from "@/components/site/chat";
import { Phone } from "@/components/site/phone";
import { heroChat } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

// How long each step holds before the next. Wave AI's lines arrive one short
// message at a time, like the client's script asks. The last entry is the
// pause before the loop starts again.
const STEP_MS = [600, 700, 1000, 1100, 1300, 1100, 1200, 1100, 1200, 1300, 1000, 4500];
const LAST = STEP_MS.length - 1;

function useLoop() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStep(LAST);
      return;
    }
    if (!inView) return;
    const id = window.setTimeout(() => setStep((s) => (s >= LAST ? 0 : s + 1)), STEP_MS[step]);
    return () => window.clearTimeout(id);
  }, [inView, reduce, step]);

  return { ref, step };
}

function Callout({ show, icon, children, className }: { show: boolean; icon: ReactNode; children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={false}
      animate={show ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className={cn(
        "absolute z-30 hidden items-center gap-2.5 rounded-2xl border border-border bg-white px-4 py-3 text-[14px] font-semibold text-navy shadow-[0_20px_40px_-18px_rgb(11_27_63/0.35)] lg:flex",
        className,
      )}
    >
      <span className="grid size-8 place-items-center rounded-xl bg-green/15 text-green-ink">{icon}</span>
      {children}
    </motion.div>
  );
}

function PickTime() {
  const { t } = useLang();
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[12px] font-semibold text-[#111113]">
        <CalendarDays className="size-3.5" />
        {t(heroChat.pick)}
      </span>
    </motion.div>
  );
}

export function HeroPhone() {
  const { t } = useLang();
  const { ref, step } = useLoop();
  const s = (n: number) => step >= n;
  const c = heroChat;

  return (
    <div ref={ref} className="relative mx-auto w-fit">
      <Callout show={s(3)} icon={<Timer className="size-4" />} className="-left-44 top-[200px]">
        {t(c.replied)}
      </Callout>
      <Callout show={s(4)} icon={<Target className="size-4" />} className="-left-40 top-[330px]">
        {t(c.diagnosed)}
      </Callout>
      <Callout show={s(10)} icon={<CalendarCheck className="size-4" />} className="-left-48 bottom-16">
        {t(c.noScheduling)}
      </Callout>

      <Phone time="21:04">
        <ChatHeader compact business={c.business} channel={c.channel} />
        <div className="flex min-h-0 flex-1 flex-col justify-end gap-2 overflow-hidden px-3 pb-6 pt-3">
          <AnimatePresence initial={false} mode="popLayout">
            {s(1) ? <CustomerLine key="hello" line={c.hello} /> : null}
            {s(2) && !s(3) ? <WaveTyping key="t1" /> : null}
            {s(3) ? <WaveLine key="greet" line={c.greet} /> : null}
            {s(4) ? <WaveLine key="diagnose" line={c.diagnose} /> : null}
            {s(5) ? <CustomerLine key="pain" line={c.pain} /> : null}
            {s(6) ? <WaveLine key="solve" line={c.solve} /> : null}
            {s(7) ? <CustomerLine key="objection" line={c.objection} /> : null}
            {s(8) ? <WaveLine key="reassure" line={c.reassure} /> : null}
            {s(9) ? <WaveLine key="book" line={c.book} /> : null}
            {s(9) ? <PickTime key="pick" /> : null}
            {s(10) ? <BookedRow key="booked" text={c.booked} /> : null}
          </AnimatePresence>
        </div>
      </Phone>
    </div>
  );
}
