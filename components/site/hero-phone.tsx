"use client";

import { CalendarCheck, Repeat, Timer } from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { BookedRow, ChatHeader, CustomerLine, WaveLine, WaveTyping } from "@/components/site/chat";
import { Phone } from "@/components/site/phone";
import { heroChat } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

// How long each step holds before the next. The last entry is the pause
// before the loop starts again.
const STEP_MS = [600, 700, 1100, 1500, 900, 900, 1300, 900, 4500];
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

export function HeroPhone() {
  const { t } = useLang();
  const { ref, step } = useLoop();
  const s = (n: number) => step >= n;
  const c = heroChat;

  return (
    <div ref={ref} className="relative mx-auto w-fit">
      <Callout show={s(3)} icon={<Timer className="size-4" />} className="-left-44 top-36">
        {t(c.replied)}
      </Callout>
      <Callout show={s(6)} icon={<Repeat className="size-4" />} className="-left-40 top-[300px]">
        {t({ en: "Auto follow-up", zh: "自动跟进" })}
      </Callout>
      <Callout show={s(8)} icon={<CalendarCheck className="size-4" />} className="-left-48 bottom-16">
        {t({ en: "Booked, no staff needed", zh: "无需人手，已预约" })}
      </Callout>

      <Phone time="11:04">
        <ChatHeader compact business={c.business} channel={c.channel} />
        <div className="flex min-h-0 flex-1 flex-col justify-end gap-2.5 overflow-hidden px-3 pb-6 pt-3">
          <AnimatePresence initial={false} mode="popLayout">
            {s(1) ? <CustomerLine key="a" line={c.ask} /> : null}
            {s(2) && !s(3) ? <WaveTyping key="t" /> : null}
            {s(3) ? <WaveLine key="b" line={c.answer} source={c.source} /> : null}
            {s(4) ? <CustomerLine key="c" line={c.later} /> : null}
            {s(5) ? (
              <motion.p
                key="d"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-1 text-center text-[11px] font-medium text-muted-foreground"
              >
                {t(c.nextDay)}
              </motion.p>
            ) : null}
            {s(6) ? <WaveLine key="e" line={c.followUp} /> : null}
            {s(7) ? <CustomerLine key="f" line={c.yes} /> : null}
            {s(8) ? <BookedRow key="g" text={c.booked} /> : null}
          </AnimatePresence>
        </div>
      </Phone>
    </div>
  );
}
