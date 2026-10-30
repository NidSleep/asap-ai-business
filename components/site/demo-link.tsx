"use client";

import type { ComponentProps, ReactNode } from "react";
import { ButtonLink } from "@/components/motion/button";
import { DEMO, demoVia } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Props = Omit<ComponentProps<typeof ButtonLink>, "href" | "target" | "rel" | "children"> & {
  children: ReactNode;
};

/**
 * Every "Book a demo" style button. Opens the current demo channel in a new
 * tab and tells screen-reader users where they are going, since the visible
 * label alone does not say.
 */
export function DemoLink({ children, ...rest }: Props) {
  const { t } = useLang();
  return (
    <ButtonLink href={DEMO.url} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      <span className="sr-only"> {t(demoVia[DEMO.via].sr)}</span>
    </ButtonLink>
  );
}

/** One quiet line under the main buttons saying where they lead. */
export function DemoHint({ className }: { className?: string }) {
  const { t } = useLang();
  return <p className={cn("text-[13px] text-muted-foreground", className)}>{t(demoVia[DEMO.via].hint)}</p>;
}
