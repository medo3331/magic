"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";

interface DayStudy {
  day: string;
  minutes: number;
}

interface WeeklyAnalyticsProps {
  data: readonly DayStudy[];
  index?: number;
}

/**
 * Compact weekly study-minutes bar chart.
 * Pure CSS/flex bars (no chart library); animates ONCE on mount via scaleY,
 * tallest day highlighted in emerald. Mobile-safe: slim flex bars, no overflow.
 */
export function WeeklyAnalytics({ data, index = 0 }: WeeklyAnalyticsProps) {
  const reduceMotion = useReducedMotion();
  const max = Math.max(...data.map((d) => d.minutes));
  const total = data.reduce((sum, d) => sum + d.minutes, 0);

  return (
    <Reveal index={index}>
      <GlassCard className="p-5">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">نشاطك هذا الأسبوع</h3>
            <p className="mt-0.5 text-xs text-[#9AA0C0]">دقائق الدراسة يوميًا</p>
          </div>
          <p className="font-mono text-lg font-bold text-[#2DD4BF]" dir="ltr">
            {total} <span className="text-xs font-normal text-[#9AA0C0]">دقيقة</span>
          </p>
        </div>

        {/* Bars */}
        <div
          className="flex h-28 items-end justify-between gap-1.5 sm:gap-2"
          role="img"
          aria-label={`إجمالي ${total} دقيقة دراسة خلال الأسبوع`}
        >
          {data.map((d, i) => {
            const isPeak = d.minutes === max;
            return (
              <div
                key={d.day}
                className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5"
              >
                <motion.div
                  className={`w-full rounded-t-md ${
                    isPeak
                      ? "bg-gradient-to-t from-[#2DD4BF]/70 to-[#2DD4BF]"
                      : "bg-gradient-to-t from-[#7C5CFF]/60 to-[#B69CFF]/50"
                  }`}
                  initial={reduceMotion ? false : { scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.05 * i,
                    ease: "easeOut",
                  }}
                  style={{ height: `${Math.max((d.minutes / max) * 100, 8)}%`, transformOrigin: "bottom" }}
                />
                <span className="truncate text-[10px] text-[#9AA0C0] sm:text-xs">
                  {d.day}
                </span>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </Reveal>
  );
}
