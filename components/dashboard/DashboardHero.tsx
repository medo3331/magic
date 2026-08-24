import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { AvatarOrbit } from "@/components/ui/AvatarOrbit";
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
 */
export function DashboardHero({ user, actions, stats }: DashboardHeroProps) {
  return (
    <Reveal index={0}>
      <GlassCard className="p-6">
        <div className="flex flex-col gap-6">
          {/* Avatar + greeting */}
          <div className="flex items-center gap-4">
            <AvatarOrbit user={user} />
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-white">
                👋 أهلاً بك مجددًا، {user.name}
              </h1>
              <p className="mt-1 text-sm text-[#B69CFF]">
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
