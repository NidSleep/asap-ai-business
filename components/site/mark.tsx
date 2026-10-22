import { cn } from "@/lib/utils";

/** The two-beat mark: a short crest, then a taller one. */
export function WaveMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 18"
      aria-hidden="true"
      focusable="false"
      className={cn("h-[17px] w-[22px] shrink-0 overflow-visible", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 16v-5a4 4 0 0 1 8 0v5" />
      <path d="M10 16V8a6 6 0 0 1 12 0v8" />
    </svg>
  );
}
