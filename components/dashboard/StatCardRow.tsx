import { GlassCard } from "@/components/ui/GlassCard";
import { IconBadge } from "@/components/ui/IconBadge";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Reveal } from "@/components/ui/Reveal";
import type { StatCardData } from "@/lib/types";

interface StatCardProps {
  stat: StatCardData;
  index: number;
}

/**
 * One stat tile: icon chip + label + count-up value (mono) + unit.
 * Hover lift is CSS-only (transform + shadow) — no JS state.
 */
export function StatCard({ stat, index }: StatCardProps) {
  return (
    <Reveal index={index}>
      <GlassCard className="h-full p-4 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(124,92,255,0.12)]">
        <div className="flex items-center gap-3">
          <IconBadge icon={stat.icon} color={stat.accent} bg={`${stat.accentSolid}/15`} />
          <div className="min-w-0">
            <p className="truncate text-sm text-[#9AA0C0]">{stat.label}</p>
            <p className="mt-1 flex items-baseline gap-1">
              <AnimatedNumber
                value={stat.value}
                className="font-mono text-2xl font-bold text-white"
              />
              {stat.unit && (
                <span className="text-xs text-[#9AA0C0]">{stat.unit}</span>
              )}
            </p>
          </div>
        </div>
      </GlassCard>
    </Reveal>
  );
}

interface StatCardRowProps {
  stats: StatCardData[];
}

/** The 4-up stat row at the top of the dashboard. */
export function StatCardRow({ stats }: StatCardRowProps) {
  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {stats.map((s, i) => (
        <StatCard key={s.key} stat={s} index={i} />
      ))}
    </div>
  );
}
