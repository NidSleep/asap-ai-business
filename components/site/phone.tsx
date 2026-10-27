import { BatteryFull, SignalHigh, Wifi } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * An iPhone-proportioned frame. `island` is rendered under the status bar's
 * centre, where the real Dynamic Island sits.
 */
export function Phone({
  time,
  island,
  children,
  className,
  screenClassName,
}: {
  time: string;
  island?: ReactNode;
  children: ReactNode;
  className?: string;
  screenClassName?: string;
}) {
  return (
    <div
      className={cn(
        "dark relative w-[272px] shrink-0 rounded-[48px] bg-gradient-to-b from-[#3a3a42] via-[#1e1e23] to-[#141417] p-[7px]",
        "shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8),inset_0_1px_0_rgb(255_255_255/0.08)]",
        className,
      )}
    >
      <div
        className={cn(
          "relative flex h-[568px] flex-col overflow-hidden rounded-[41px] bg-[#0c0c0e] ring-1 ring-white/5",
          screenClassName,
        )}
      >
        <div className="relative z-10 flex h-12 shrink-0 items-center justify-between px-7 pt-1 text-[13px] font-semibold tabular-nums text-white">
          <span>{time}</span>
          <span className="flex items-center gap-1" aria-hidden="true">
            <SignalHigh className="size-3.5" strokeWidth={2.5} />
            <Wifi className="size-3.5" strokeWidth={2.5} />
            <BatteryFull className="size-4" strokeWidth={2} />
          </span>
        </div>
        <div className="absolute inset-x-0 top-2.5 z-20 flex justify-center">
          {island ?? <div className="h-[34px] w-[112px] rounded-full bg-black" />}
        </div>
        {children}
      </div>
    </div>
  );
}
