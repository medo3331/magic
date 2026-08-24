"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { lessonStateFromPct, LESSON_STATE_META } from "@/lib/mock-data";
import type { LessonSummary } from "@/lib/types";

interface LessonListProps {
  lessons: LessonSummary[];
  /** Exclude the "next lesson" already shown as the hero card. */
  excludeId?: string;
}

/**
 * Secondary list of the learner's lessons. Lower visual weight than the hero
 * card (smaller chips, no big ring) — this is the clear hierarchy the brief
 * asked for. Each row's state badge is derived from real completion %.
 */
export function LessonList({ lessons, excludeId }: LessonListProps) {
  const rows = lessons.filter((l) => l.id !== excludeId);
  return (
    <GlassCard className="p-4">
      <h3 className="px-2 pb-3 text-sm font-semibold text-[#9AA0C0]">دروسك</h3>
      <ul className="flex flex-col gap-2">
        {rows.map((lesson, i) => {
          const state = lessonStateFromPct(lesson.completionPct);
          const meta = LESSON_STATE_META[state];
          const done = state === "review";
          return (
            <Reveal key={lesson.id} index={i}>
              <Link
                href={`/lesson/${lesson.id}`}
                className="flex items-center gap-3 rounded-2xl px-2 py-3 transition-colors hover:bg-white/[0.04]"
              >
                {/* status glyph */}
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: done
                      ? "rgba(45,212,191,0.15)"
                      : "rgba(124,92,255,0.15)",
                    color: done ? "#2DD4BF" : "#B69CFF",
                  }}
                >
                  {done ? <CheckCircle2 size={18} /> : <ArrowLeft size={18} />}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">
                    {lesson.title}
                  </p>
                  <p className="text-xs text-[#9AA0C0]">
                    {lesson.category} · {meta.label}
                  </p>
                </div>

                {/* completion % (mono HUD) */}
                <span
                  className="font-mono text-sm font-bold"
                  style={{ color: done ? "#2DD4BF" : "#FB923C" }}
                  dir="ltr"
                >
                  {Math.round(lesson.completionPct)}%
                </span>
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </GlassCard>
  );
}
