"use client";

import { useState } from "react";
import { Play, Clock, Zap, Dumbbell, Bookmark, Star, HelpCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ExplanationTabs } from "@/components/ui/Tabs";
import { Breadcrumb } from "@/components/lesson/Breadcrumb";
import { UnitProgress } from "@/components/lesson/UnitProgress";
import { cn } from "@/lib/cn";
import type { Crumb, ExplanationMode, Lesson, LessonSection } from "@/lib/types";

interface LessonViewProps {
  lesson: Lesson;
  /** Explanation sections keyed by mode (Academic / Visual / Practical). */
  explanation: Record<ExplanationMode, LessonSection[]>;
  /** Breadcrumb trail. */
  crumbs: Crumb[];
}

/**
 * Lesson page body, built from the SAME design system as the dashboard:
 * glass cards, violet/amber/teal accents, mono for stats, staggered Reveal, and
 * the ONE unified Tabs control for نمط الشرح.
 */
export function LessonView({ lesson, explanation, crumbs }: LessonViewProps) {
  const [mode, setMode] = useState<ExplanationMode>("academic");
  const [saved, setSaved] = useState(false);
  const [fav, setFav] = useState(false);

  const sections = explanation[mode];
  const currentIndex = lesson.unitLessons.findIndex((u) => u.id === lesson.id);

  return (
    <div className="relative min-h-screen bg-[#07091A]">
      <main className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
        {/* Breadcrumb */}
        <Reveal index={0}>
          <Breadcrumb items={crumbs} />
        </Reveal>

        {/* Unit progress bar */}
        <Reveal index={1}>
          <UnitProgress unitLessons={lesson.unitLessons} currentIndex={Math.max(0, currentIndex)} />
        </Reveal>

        {/* Hero card */}
        <Reveal index={2}>
          <GlassCard glow className="p-6">
            <div className="flex items-start gap-5">
              {/* Lesson number box */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#7C5CFF]/15 font-mono text-base font-bold text-[#B69CFF]">
                درس {currentIndex + 1}
              </div>

              <div className="min-w-0 flex-1">
                {/* Subject eyebrow with colored underline dash */}
                <span className="inline-block border-b-2 border-[#7C5CFF] pb-1 text-xs font-bold text-[#B69CFF]">
                  {lesson.category}
                </span>
                <h1 className="mt-2 text-2xl font-bold text-white">{lesson.title}</h1>
                <p className="mt-2 text-sm text-[#C7CBE6]">{lesson.description}</p>

                {/* Badge row — each pill has a matching icon + color */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge icon={Clock} color="text-[#B69CFF]" bg="bg-[#7C5CFF]/15">
                    حوالي {lesson.durationMinutes} دقيقة
                  </Badge>
                  <Badge icon={Zap} color="text-[#FB923C]" bg="bg-[#FB923C]/15">
                    XP +{lesson.xpReward}
                  </Badge>
                  <Badge icon={Dumbbell} color="text-[#2DD4BF]" bg="bg-[#2DD4BF]/15">
                    {lesson.lessonType}
                  </Badge>
                </div>

                {/* Primary CTA */}
                <div className="mt-5">
                  <Button variant="primary" icon={Play} iconPosition="start">
                    ابدأ الدرس
                  </Button>
                </div>
              </div>
            </div>
          </GlassCard>
        </Reveal>

        {/* Secondary actions */}
        <Reveal index={3}>
          <div className="flex flex-wrap gap-2">
            <TogglePill
              icon={Bookmark}
              label="حفظ الدرس"
              active={saved}
              onClick={() => setSaved((v) => !v)}
            />
            <TogglePill
              icon={Star}
              label="إضافة للمفضلة"
              active={fav}
              onClick={() => setFav((v) => !v)}
            />
          </div>
        </Reveal>

        {/* Unified explanation-mode tabs */}
        <Reveal index={4}>
          <GlassCard className="p-4">
            <p className="mb-3 text-xs text-[#9AA0C0]">نمط الشرح</p>
            <ExplanationTabs value={mode} onChange={setMode} />
            <div key={mode} className="mt-4 flex flex-col gap-4">
              {sections.map((s, i) => (
                <Reveal key={s.heading} index={i}>
                  <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <h3 className="text-sm font-bold text-[#B69CFF]">{s.heading}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#E7E9F5]">{s.body}</p>
                  </section>
                </Reveal>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </main>

      {/* Floating help button (bottom-left in RTL) */}
      <button
        type="button"
        className={cn(
          "fixed bottom-6 left-6 z-30 inline-flex h-11 items-center gap-2 rounded-full",
          "border border-white/[0.08] bg-[#11142E] px-4 text-sm font-semibold text-[#E7E9F5]",
          "shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition-colors hover:bg-[#171a3a]"
        )}
      >
        <HelpCircle size={18} className="text-[#B69CFF]" aria-hidden />
        مساعدة
      </button>
    </div>
  );
}

/* ---------- local helpers ---------- */

function Badge({
  icon: Icon,
  color,
  bg,
  children,
}: {
  icon: typeof Clock;
  color: string;
  bg: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-semibold",
        color,
        bg
      )}
    >
      <Icon size={14} aria-hidden />
      {children}
    </span>
  );
}

function TogglePill({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: typeof Bookmark;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-11 items-center gap-2 rounded-2xl border px-4 text-sm font-semibold transition-colors",
        active
          ? "border-[#7C5CFF] bg-[#7C5CFF]/15 text-[#B69CFF]"
          : "border-white/[0.08] bg-white/[0.04] text-[#E7E9F5] hover:bg-white/[0.08]"
      )}
    >
      <Icon size={16} aria-hidden />
      {label}
    </button>
  );
}
