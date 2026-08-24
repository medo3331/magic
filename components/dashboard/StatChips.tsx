import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { IconBadge } from "@/components/ui/IconBadge";
import { cn } from "@/lib/cn";
import type { StatCardData } from "@/lib/types";

interface StatChipsProps {
  stats: StatCardData[];
  className?: string;
}

/**
 * The four retention stat chips. Each uses the shared IconBadge (uniform 40px
 * chip / 18px glyph) and a count-up value rendered in the mono face, so the
 * stats read as a HUD distinct from prose. Values are real bound props.
 */
export function StatChips({ stats, className }: StatChipsProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-4", className)}>
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div key={s.key} className="flex items-center gap-3">
            <IconBadge icon={Icon} color={s.accent} bg={`${s.accentSolid}/15`} />
            <div className="min-w-0">
              <p className="truncate text-xs text-[#9AA0C0]">{s.label}</p>
              <p className="mt-0.5 flex items-baseline gap-1">
                <AnimatedNumber
                  value={s.value}
                  className="font-mono text-lg font-bold text-white"
                />
                {s.unit && <span className="text-[11px] text-[#9AA0C0]">{s.unit}</span>}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
