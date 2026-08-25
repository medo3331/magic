import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { StatCardRow } from "@/components/dashboard/StatCardRow";
import { NextLessonCard } from "@/components/dashboard/NextLessonCard";
import { LessonList } from "@/components/dashboard/LessonList";
import { WeeklyAnalytics } from "@/components/dashboard/WeeklyAnalytics";
import { AchievementsStrip } from "@/components/dashboard/AchievementsStrip";
import { WorshipShortcutCard } from "@/components/dashboard/WorshipShortcutCard";
import { AssistantFab } from "@/components/dashboard/AssistantFab";
import { Reveal } from "@/components/ui/Reveal";
import {
  buildStatCards,
  mockAchievements,
  mockLessons,
  mockNavItems,
  mockNextLesson,
  mockQuickActions,
  mockStats,
  mockUser,
  mockWeeklyStudy,
  mockWorshipPreview,
} from "@/lib/mock-data";

/**
 * Dashboard page (App Router, server component).
 * Mock data is passed into fully-typed presentational components; swapping in a
 * real API means replacing these imports with a fetched payload of the same
 * `types`.
 *
 * Section order: Hero → Stats → Next lesson → Weekly analytics →
 * Achievements → Lesson list → Worship shortcut (+ floating assistant entry).
 */
export default function DashboardPage() {
  const stats = buildStatCards(mockStats);

  return (
    <div className="flex min-h-screen bg-[#07091A]">
      <Sidebar items={mockNavItems} user={mockUser} />

      <main className="flex-1 px-4 py-6 md:px-6 md:py-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          {/* HERO: avatar signature + greeting + quick actions + stat chips */}
          <DashboardHero user={mockUser} actions={mockQuickActions} stats={stats} />

          {/* STAT ROW (full tiles under the hero band) */}
          <StatCardRow stats={stats} />

          {/* NEXT LESSON (most prominent after hero) */}
          <NextLessonCard lesson={mockNextLesson} xpReward={100} index={1} />

          {/* WEEKLY ANALYTICS */}
          <WeeklyAnalytics data={mockWeeklyStudy} index={2} />

          {/* ACHIEVEMENTS STRIP */}
          <AchievementsStrip achievements={mockAchievements} index={3} />

          {/* LESSON LIST */}
          <LessonList lessons={mockLessons} excludeId={mockNextLesson.id} />

          {/* WORSHIP SHORTCUT → /worship (navigation + preview only) */}
          <WorshipShortcutCard
            quranWirdRead={mockWorshipPreview.quranWirdRead}
            quranWirdTarget={mockWorshipPreview.quranWirdTarget}
            index={4}
          />
        </div>
      </main>

      {/* Floating AI assistant entry (visual affordance only) */}
      <AssistantFab />
    </div>
  );
}
