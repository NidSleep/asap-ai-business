import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * The Wave AI "WM" mark: two black strokes forming the W and a violet
 * gradient arrow rising out of it. Redrawn from the client's logo (shared as
 * a screenshot); replace with their source file if one arrives.
 *
 * `tone="dark"` swaps the black strokes for white so the mark works on dark
 * surfaces; the arrow keeps its gradient.
 */
export function WaveMark({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const id = useId().replace(/:/g, "");
  const ink = tone === "dark" ? "#ffffff" : "#16131f";
  return (
    <svg
      viewBox="0 0 483 195"
      aria-hidden="true"
      focusable="false"
      className={cn("h-[14px] w-auto shrink-0", className)}
    >
      <defs>
        <linearGradient id={`wm-${id}`} x1="0.85" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor="#9b30ff" />
          <stop offset="1" stopColor="#3f17cc" />
        </linearGradient>
      </defs>
      {/* W: the left V and the long diagonal */}
      <path d="M0 0H70L136 123L173 61L203 113L156 195H106Z" fill={ink} />
      <path d="M158 0H223L323 195H261Z" fill={ink} />
      {/* The rising arrow */}
      <path d="M414 0H483L438 195H379L408 76L323 164L301 121Z" fill={`url(#wm-${id})`} />
    </svg>
  );
}
