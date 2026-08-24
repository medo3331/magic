"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Flame, BookOpen, Sparkles, Lock } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import type { LucideIcon } from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  unlocked: boolean;
  gold?: boolean;
  progress?: { current: number; target: number };
}

interface AchievementsStripProps {
  achievements: Achievement[];
  index?: number;
}

const ACHIEVEMENT_ICONS: Record<string, LucideIcon> = {
  "streak-7": Flame,
  "lessons-10": BookOpen,
  "xp-2500": Sparkles,
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

/**
 * Horizontal achievements strip. Unlocked badges get a gold ring (gold is the
 * achievement accent in the design system); locked ones stay muted with a
 * progress readout. Entrance staggers once — no looping animations.
 */
export function AchievementsStrip({ achievements, index = 0 }: AchievementsStripProps) {
  const reduceMotion = useReducedMotion();
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <Reveal index={index}>
      <GlassCard className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-white">الإنجازات</h3>
          <span className="rounded-full bg-white/[0.04] px-3 py-1 font-mono text-xs text-[#9AA0C0]" dir="ltr">
            {unlockedCount} / {achievements.length}
          </span>
        </div>

        <motion.div
          className="flex items-stretch gap-3 overflow-x-auto pb-1 sm:grid sm:grid-cols-3 sm:overflow-visible"
          variants={reduceMotion ? undefined : container}
          initial={reduceMotion ? undefined : "hidden"}
          animate={reduceMotion ? undefined : "show"}
        >
          {achievements.map((a) => {
            const Icon = ACHIEVEMENT_ICONS[a.id] ?? Sparkles;
            return (
              <motion.div
                key={a.id}
                variants={reduceMotion ? undefined : item}
                className={`flex min-w-[128px] flex-1 items-center gap-3 rounded-2xl border p-3 transition-transform duration-200 hover:-translate-y-0.5 ${
                  a.unlocked
                    ? a.gold
                      ? "border-amber-400/30 bg-amber-400/[0.06]"
                      : "border-[#2DD4BF]/25 bg-[#2DD4BF]/[0.05]"
                    : "border-white/[0.06] bg-white/[0.02]"
                }`}
              >
                {/* Badge disc */}
                <span
                  className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                    a.unlocked
                      ? a.gold
                        ? "bg-amber-400/15 text-amber-300 ring-1 ring-amber-400/40"
                        : "bg-[#2DD4BF]/15 text-[#2DD4BF] ring-1 ring-[#2DD4BF]/40"
                      : "bg-white/[0.04] text-[#9AA0C0]"
                  }`}
                >
                  <Icon size={20} aria-hidden />
                  {!a.unlocked && (
                    <Lock
                      size={10}
                      aria-hidden
                      className="absolute -bottom-0.5 -left-0.5 rounded-full bg-[#0D1029] p-0.5 text-[#9AA0C0]"
                    />
                  )}
                </span>

                <div className="min-w-0">
                  <p className={`truncate text-sm font-medium ${a.unlocked ? "text-white" : "text-[#C7CBE6]"}`}>
                    {a.name}
                  </p>
                  <p className="mt-0.5 text-xs text-[#9AA0C0]">
                    {a.unlocked ? (
                      "مُكتمل"
                    ) : a.progress ? (
                      <span dir="ltr" className="font-mono">
                        {a.progress.current}/{a.progress.target}
                      </span>
                    ) : (
                      "مقفل"
                    )}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </GlassCard>
    </Reveal>
  );
}
