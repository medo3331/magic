"use client";

import Link from "next/link";
import { Play, ArrowLeft } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { LessonSummary } from "@/lib/types";

interface NextLessonCardProps {
  lesson: LessonSummary;
  /** XP awarded for the lesson, shown as a small reward line. */
  xpReward?: number;
  index?: number;
}

/**
 * "Next lesson" card — the most prominent element after the hero.
 * Layout matches the approved target: "الدرس التالي" label top-right, a violet
 * "تابع من حيث توقفت" badge top-left, title + description, an animated circular
 * progress ring (violet stroke) on the right with the centered percentage, an
 * XP/lesson-count reward line, and a solid-violet primary button (NOT yellow).
 */
export function NextLessonCard({
  lesson,
  xpReward = 100,
  index = 0,
}: NextLessonCardProps) {
  return (
    <Reveal index={index}>
      <GlassCard glow className="p-6">
        {/* Top labels */}
        <div className="mb-2 flex items-center justify-between">
          <span className="rounded-full bg-[#7C5CFF]/15 px-3 py-1 text-xs font-semibold text-[#B69CFF]">
            تابع من حيث توقفت
          </span>
          <span className="text-xs text-[#9AA0C0]">الدرس التالي</span>
        </div>

        <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
          {/* Progress ring (violet, animated) */}
          <ProgressRing
            pct={lesson.completionPct}
            size={150}
            color="#7C5CFF"
            centerLabel={`${Math.round(lesson.completionPct)}%`}
          />

          {/* Text + CTA */}
          <div className="flex-1 text-center md:text-right">
            <h2 className="text-xl font-bold text-white">{lesson.title}</h2>
            <p className="mt-1 text-sm text-[#9AA0C0]">
              مدخل بصري وأكاديمي وتطبيقي للدوال المثلثية.
            </p>
            <p className="mt-2 text-xs text-[#9AA0C0]" dir="ltr">
              ⚡ +{xpReward} XP · الدرس 2 من 3
            </p>

            <div className="mt-5 flex justify-center md:justify-start">
              <Link href={`/lesson/${lesson.id}`} className="inline-flex">
                <Button variant="primary" icon={Play} iconPosition="start">
                  متابعة الدرس
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </GlassCard>
    </Reveal>
  );
}
