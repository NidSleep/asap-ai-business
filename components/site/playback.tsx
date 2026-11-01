"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Replays a small chat scene once, beat by beat, so the visitor feels the
 * time pass (a reply that comes too late, a follow-up that never comes).
 *
 * The finished scene is the default render: without JavaScript, with
 * reduced motion, or when the scene is already on screen at load, it simply
 * shows the end state. Only a scene still below the fold (or, with
 * `onMount`, one the visitor just opened) is reset and played.
 *
 * `beats[i]` is the wait in ms before beat i appears.
 */
export function usePlayback(beats: number[], { onMount = false }: { onMount?: boolean } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [step, setStep] = useState(beats.length);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (reduce || !el) return;
    if (!onMount && el.getBoundingClientRect().top < window.innerHeight) return;
    setStep(0);
    setArmed(true);
    // Arm once, on mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!armed || !inView || step >= beats.length) return;
    const id = window.setTimeout(() => setStep((s) => s + 1), beats[step]);
    return () => window.clearTimeout(id);
  }, [armed, inView, step, beats]);

  return { ref, at: (n: number) => step > n };
}

/** One beat of a playback: rises into place when its turn comes. */
export function Beat({ on, children, className }: { on: boolean; children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={false}
      animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export { EASE };
