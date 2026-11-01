"use client";

import { CalendarDays, MessageCircleHeart, Pause, Play, Target, Timer } from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { BookedRow, ChatHeader, CustomerLine, WaveLine, WaveTyping } from "@/components/site/chat";
import { Phone } from "@/components/site/phone";
import { heroChat } from "@/lib/content";
import { useLang } from "@/lib/i18n";


// How long each step holds before the next. The AI's lines arrive one short
// message at a time, like the client's script asks. The last entry is the
// pause before the loop starts again.
const STEP_MS = [600, 700, 1000, 1100, 1300, 1100, 1200, 1100, 1200, 1300, 1000, 4500];
const LAST = STEP_MS.length - 1;
const noop = () => () => {};

function useLoop() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  // The loop runs for more than five seconds, so visitors must be able to stop
  // it (WCAG 2.2.2). Paused, it holds whatever message is on screen.
  const [paused, setPaused] = useState(false);
  // The server cannot know the visitor's motion setting, so the pause control
  // is decided after hydration; deciding it during render mismatches the HTML.
  const mounted = useSyncExternalStore(noop, () => true, () => false);

  useEffect(() => {
    if (reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStep(LAST);
      return;
    }
    if (!inView || paused) return;
    const id = window.setTimeout(() => setStep((s) => (s >= LAST ? 0 : s + 1)), STEP_MS[step]);
    return () => window.clearTimeout(id);
  }, [inView, reduce, paused, step]);

  return { ref, step, paused, setPaused, animated: !(mounted && reduce) };
}

const loopCopy = {
  pause: { en: "Pause animation", zh: "暂停动画" },
  play: { en: "Play animation", zh: "播放动画" },
};

/**
 * A small label under the message it describes ("Replied in 28 s"). It lives
 * inside the chat, so it scrolls with that message and shows on phones too,
 * instead of floating beside the phone at a fixed spot.
 */
function MessageTag({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.p
      initial={reduce ? false : { opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="-mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-brand-light/20 px-2 py-0.5 text-[11.5px] font-medium text-brand-light"
    >
      {icon}
      {children}
    </motion.p>
  );
}

function PickTime() {
  const { t } = useLang();
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[12px] font-semibold text-ink">
        <CalendarDays className="size-3.5" />
        {t(heroChat.pick)}
      </span>
    </motion.div>
  );
}

export function HeroPhone() {
  const { t } = useLang();
  const { ref, step, paused, setPaused, animated } = useLoop();
  const s = (n: number) => step >= n;
  const c = heroChat;

  return (
    <div ref={ref} className="relative mx-auto w-fit">
      <Phone time={c.time}>
        <ChatHeader compact business={c.business} channel={c.channel} />
        <div className="flex min-h-0 flex-1 flex-col justify-end gap-2 overflow-hidden px-3 pb-6 pt-3">
          <AnimatePresence initial={false} mode="popLayout">
            {s(1) ? <CustomerLine key="hello" line={c.hello} /> : null}
            {s(2) && !s(3) ? <WaveTyping key="t1" /> : null}
            {s(3) ? <WaveLine key="greet" line={c.greet} /> : null}
            {s(3) ? (
              <MessageTag key="tag-replied" icon={<Timer className="size-3" />}>
                {t(c.replied)}
              </MessageTag>
            ) : null}
            {s(4) ? <WaveLine key="diagnose" line={c.diagnose} /> : null}
            {s(4) ? (
              <MessageTag key="tag-need" icon={<Target className="size-3" />}>
                {t(c.diagnosed)}
              </MessageTag>
            ) : null}
            {s(5) ? <CustomerLine key="pain" line={c.pain} /> : null}
            {s(6) ? <WaveLine key="solve" line={c.solve} /> : null}
            {s(7) ? <CustomerLine key="objection" line={c.objection} /> : null}
            {s(8) ? <WaveLine key="reassure" line={c.reassure} /> : null}
            {s(8) ? (
              <MessageTag key="tag-objection" icon={<MessageCircleHeart className="size-3" />}>
                {t(c.objectionHandled)}
              </MessageTag>
            ) : null}
            {s(9) ? <WaveLine key="book" line={c.book} /> : null}
            {s(9) ? <PickTime key="pick" /> : null}
            {s(10) ? <BookedRow key="booked" text={c.booked} /> : null}
          </AnimatePresence>
        </div>
      </Phone>
      {animated ? (
        <div className="mt-3 flex justify-center">
          <button
            type="button"
            onClick={() => setPaused(!paused)}
            aria-pressed={paused}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-ink"
          >
            {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
            {t(paused ? loopCopy.play : loopCopy.pause)}
          </button>
        </div>
      ) : null}
    </div>
  );
}
