import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { FloatingAvatar } from "@/components/dashboard/FloatingAvatar";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { StatChips } from "@/components/dashboard/StatChips";
import type { QuickAction, StatCardData, User } from "@/lib/types";

interface DashboardHeroProps {
  user: User;
  actions: QuickAction[];
  stats: StatCardData[];
}

/**
 * Dashboard hero card: avatar signature + greeting + quick-action pills +
 * real-data stat chips. One GlassCard holds the whole greeting band so it reads
 * as the page's primary block after the avatar.
 *
 * Premium polish: subtle avatar float via the FloatingAvatar client island
 * (serializable props only — this stays a server component), one restrained
 * CSS gradient wash, staggered entrance via the existing Reveal primitive.
 */
export function DashboardHero({ user, actions, stats }: DashboardHeroProps) {
  return (
    <Reveal index={0}>
      <GlassCard className="relative overflow-hidden p-6">
        {/* Single restrained gradient wash — very low opacity, slow CSS drift */}
        <div aria-hidden className="hero-wash pointer-events-none absolute inset-0" />

        <div className="relative flex flex-col gap-6">
          {/* Avatar + greeting */}
          <div className="flex items-center gap-4">
            <FloatingAvatar user={user} />
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-white md:text-2xl">
                أهلاً بك مجددًا، {user.name} 👋
              </h1>
              <p className="mt-1 text-sm text-[#9AA0C0]">جاهز تكمل رحلتك؟</p>
              <p className="mt-0.5 text-sm font-medium text-[#B69CFF]">
                الدرس {user.lessonIndex} من {user.lessonTotal} في {user.subject}
              </p>
            </div>
          </div>

          {/* Quick actions */}
          <QuickActions actions={actions} />

          {/* Real stats */}
          <StatChips stats={stats} />
        </div>
      </GlassCard>
    </Reveal>
  );
}
