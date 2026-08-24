import Link from "next/link";
import { cn } from "@/lib/cn";
import type { QuickAction } from "@/lib/types";

interface QuickActionsProps {
  actions: QuickAction[];
  className?: string;
}

/**
 * Row of consistent quick-action pills. Every pill is identical: same height
 * (h-10), same border-radius (rounded-2xl), same 16px icon, same border/hover.
 * Icons come from the shared lucide set so they never drift from the rest of
 * the app.
 */
export function QuickActions({ actions, className }: QuickActionsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {actions.map((a) => {
        const Icon = a.icon;
        return (
          <Link
            key={a.label}
            href={a.href}
            className={cn(
              "inline-flex h-10 items-center gap-2 rounded-2xl border border-white/[0.08]",
              "bg-white/[0.04] px-4 text-sm font-semibold text-[#E7E9F5]",
              "transition-colors hover:bg-white/[0.08]"
            )}
          >
            <Icon size={16} className="text-[#B69CFF]" aria-hidden />
            <span>{a.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
