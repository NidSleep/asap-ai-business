"use client";

import { Check, FileText, UserRound } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import {
  Message,
  MessageContent,
  MessageTyping,
} from "@/components/agents/message";
import {
  MessageBubble,
  MessageBubbleContent,
} from "@/components/agents/message-bubble";
import { WaveMark } from "@/components/site/mark";
import { chatUi, type Line } from "@/lib/content";
import { useLang, type Copy } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Business name row at the top of a chat screen. */
export function ChatHeader({
  business,
  channel,
  compact = false,
}: {
  business: Copy;
  channel: string;
  compact?: boolean;
}) {
  const { t } = useLang();
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 border-b border-white/[0.06]",
        compact ? "px-4 pb-3 pt-1" : "px-5 py-4",
      )}
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-wave text-white">
        <WaveMark className="h-3 w-4" />
      </span>
      <div className="min-w-0 leading-tight">
        <p className="truncate text-[13px] font-semibold text-white">
          {t(business)}
        </p>
        <p className="truncate text-[11px] text-muted-foreground">
          {channel} · {t(chatUi.answeredBy)}
        </p>
      </div>
    </div>
  );
}

/** The customer's words, with a gloss in the page language when it differs. */
function Said({ line }: { line: Line }) {
  const { lang } = useLang();
  return (
    <>
      <span lang={line.lang === "zh" ? "zh-Hans" : "en"} className="block">
        {line.text}
      </span>
      {lang !== line.lang ? (
        <span className="mt-0.5 block text-[11.5px] leading-[1.45] opacity-60">
          {line.gloss}
        </span>
      ) : null}
    </>
  );
}

const bubbleText = "max-w-[86%] px-3 py-2 text-[13px] leading-[1.5]";

/** The customer's own message: their phone, so it sits on the right. */
export function CustomerLine({ line, animate = true }: { line: Line; animate?: boolean }) {
  return (
    <Message from="user" animateIn={animate}>
      <MessageContent>
        <MessageBubble variant="solid" animateIn={animate}>
          <MessageBubbleContent className={bubbleText}>
            <Said line={line} />
          </MessageBubbleContent>
        </MessageBubble>
      </MessageContent>
    </Message>
  );
}

export function WaveLine({
  line,
  source,
  animate = true,
}: {
  line: Line;
  /** Where the answer came from, shown as a small tag under the text. */
  source?: Copy;
  animate?: boolean;
}) {
  const { t } = useLang();
  return (
    <Message from="assistant" animateIn={animate}>
      <MessageContent>
        <MessageBubble variant="soft" animateIn={animate}>
          <MessageBubbleContent className={cn(bubbleText, "text-white")}>
            <Said line={line} />
            {source ? (
              <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-wave-soft px-2 py-0.5 text-[10.5px] font-medium text-wave">
                <FileText className="size-3" />
                {t(source)}
              </span>
            ) : null}
          </MessageBubbleContent>
        </MessageBubble>
      </MessageContent>
    </Message>
  );
}

export function WaveTyping() {
  return (
    <Message from="assistant" animateIn>
      <MessageContent>
        <MessageBubble variant="soft">
          <MessageBubbleContent className="px-3.5 py-2 text-muted-foreground">
            <MessageTyping label="Wave AI is replying" />
          </MessageBubbleContent>
        </MessageBubble>
      </MessageContent>
    </Message>
  );
}

/** Quick-reply chips. `picked` marks the one the customer tapped. */
export function Chips({ options, picked }: { options: string[]; picked?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap justify-end gap-1.5"
    >
      {options.map((option) => {
        const on = option === picked;
        return (
          <span
            key={option}
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors duration-300",
              on ? "border-white bg-white text-[#111113]" : "border-white/15 text-white/80",
            )}
          >
            {on ? <Check className="size-3" strokeWidth={3} /> : null}
            {option}
          </span>
        );
      })}
    </motion.div>
  );
}

function StatusRow({ tone, icon, children }: { tone: "done" | "team"; icon: ReactNode; children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.94, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className={cn(
        "flex items-center gap-2 rounded-2xl border px-3 py-2 text-[12px] font-medium",
        tone === "done"
          ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-300"
          : "border-wave/30 bg-wave-soft text-white/85",
      )}
    >
      <span
        className={cn(
          "grid size-5 shrink-0 place-items-center rounded-full text-[#0c0c0e]",
          tone === "done" ? "bg-emerald-400" : "bg-wave text-white",
        )}
      >
        {icon}
      </span>
      <span className="flex-1">{children}</span>
    </motion.div>
  );
}

export function BookedRow({ text }: { text: Copy }) {
  const { t } = useLang();
  return (
    <StatusRow tone="done" icon={<Check className="size-3" strokeWidth={3.5} />}>
      {t(text)}
    </StatusRow>
  );
}

export function HandoffRow({ text }: { text: Copy }) {
  const { t } = useLang();
  return (
    <StatusRow tone="team" icon={<UserRound className="size-3" strokeWidth={2.5} />}>
      {t(text)}
    </StatusRow>
  );
}

export function Stamp({ children }: { children: ReactNode }) {
  return (
    <p className="text-center text-[11px] font-medium tabular-nums text-muted-foreground">
      {children}
    </p>
  );
}
