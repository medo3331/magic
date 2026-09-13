import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { StatCardRow } from "@/components/dashboard/StatCardRow";
import { NextLessonCard } from "@/components/dashboard/NextLessonCard";
import { LessonList } from "@/components/dashboard/LessonList";
import { WeeklyAnalytics } from "@/components/dashboard/WeeklyAnalytics";
import { AchievementsStrip } from "@/components/dashboard/AchievementsStrip";
import { WorshipShortcutCard } from "@/components/dashboard/WorshipShortcutCard";
import { NextPrayerWidget } from "@/components/dashboard/NextPrayerWidget";
import { AssistantFab } from "@/components/dashboard/AssistantFab";
import { SecondaryProgress } from "@/components/dashboard/SecondaryProgress";
import { Reveal } from "@/components/ui/Reveal";
import {
  buildNavItems,
  buildQuickActions,
  buildStatCards,
  getDashboardData,
} from "@/lib/dashboard-data";

/**
 * Dashboard page (App Router, server component).
 *
 * Data flows ONE way: lib/dashboard-data.ts (server data layer) → these
 * presentational components. Every value is REAL or honestly empty — no mock
 * users, no fake statistics, no dead links.
 *
 * Section order: Hero → Stats → Next lesson → Weekly analytics →
 * Achievements → Lesson list → Worship shortcut (+ floating assistant entry).
 */
export default function DashboardPage() {
  const {
    user,
    stats,
    nextLesson,
    recentLessons,
    weeklyStudy,
    achievements,
  } = getDashboardData();

  const statCards = buildStatCards(stats ?? null);

  return (
    <div className="flex min-h-screen bg-[#07091A]">
      <Sidebar items={buildNavItems("/dashboard")} user={user} />

      <main className="flex-1 px-4 py-6 md:px-6 md:py-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          {/* HERO: avatar signature + greeting + quick actions + stat chips */}
          <DashboardHero
            user={user}
            actions={buildQuickActions()}
            stats={statCards}
          />

          {/* STAT ROW — renders nothing until real stats are bound */}
          <StatCardRow stats={statCards} />

          {/* NEXT LESSON — dynamic CTA / honest empty state */}
          <NextLessonCard lesson={nextLesson} index={1} />

          {/* WEEKLY ANALYTICS — real series only */}
          <WeeklyAnalytics data={weeklyStudy} index={2} />

          {/* ACHIEVEMENTS STRIP — derived from real progress only */}
          <AchievementsStrip achievements={achievements} index={3} />

          {/* LESSON LIST — real rows only */}
          <LessonList lessons={recentLessons} excludeId={nextLesson?.id} />

          {/* SECONDARY v0 — smallest progress indicator (temporary % + engagement) */}
          <SecondaryProgress completedDays={undefined} totalDays={undefined} />

          {/* WORSHIP: live next-prayer island + live daily-progress shortcut */}
          <NextPrayerWidget
            index={4}
            latitude={30.0444}
            longitude={31.2357}
            timezone="Africa/Cairo"
            calculationMethod="egyptian"
            madhab="shafi"
          />
          <WorshipShortcutCard index={5} />
        </div>
      </main>

      {/* Floating AI assistant entry (visual affordance only) */}
      <AssistantFab />
    </div>
  );
}
