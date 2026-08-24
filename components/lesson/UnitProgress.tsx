"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { Lesson } from "@/lib/types";

interface UnitProgressProps {
  unitLessons: Lesson["unitLessons"];
  /** Index (0-based) of the current lesson. */
  currentIndex: number;
  className?: string;
}

/**
 * Segmented progress bar: one segment per lesson in the unit. Completed and
 * current segments glow violet; future segments are dim. The percentage + label
 * sit above it. Animated width-free (segments fill once on mount via the
 * shared Reveal/scale, kept simple here).
 */
export function UnitProgress({ unitLessons, currentIndex, className }: UnitProgressProps) {
  const total = unitLessons.length;
  const pct = Math.round(((currentIndex + 1) / total) * 100);

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-xs font-bold text-[#E7E9F5]" dir="ltr">
          الدرس {currentIndex + 1} / {total}
        </span>
        <span className="font-mono text-xs text-[#9AA0C0]" dir="ltr">
          {pct}%
        </span>
      </div>
      <div className="flex gap-1.5">
        {unitLessons.map((_, i) => {
          const on = i <= currentIndex;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scaleX: 0.6 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
              className={cn(
                "h-2.5 flex-1 rounded-full",
                on ? "bg-[#7C5CFF] shadow-[0_0_12px_rgba(124,92,255,0.7)]" : "bg-white/[0.08]"
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
