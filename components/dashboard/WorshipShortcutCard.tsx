import Link from "next/link";
import { Landmark, ChevronLeft } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Reveal } from "@/components/ui/Reveal";

interface WorshipShortcutCardProps {
  /** Preview readout mirroring what /worship shows (demo data). */
  quranWirdRead: number;
  quranWirdTarget: number;
  index?: number;
}

/**
 * Navigation-only shortcut card to the /worship section.
 * Shows a small preview of the daily Quran wird; all real prayer/worship data
 * lives in the worship pages — nothing is duplicated or hardcoded as "real".
 */
export function WorshipShortcutCard({
  quranWirdRead,
  quranWirdTarget,
  index = 0,
}: WorshipShortcutCardProps) {
  const pct = Math.round((quranWirdRead / Math.max(quranWirdTarget, 1)) * 100);

  return (
    <Reveal index={index}>
      <Link href="/worship" className="block" aria-label="فتح قسم عباداتي">
        <GlassCard className="group p-5 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-[#2DD4BF]/30 hover:shadow-[0_8px_24px_rgba(45,212,191,0.10)]">
          <div className="flex items-center gap-4">
            {/* Emerald icon chip (differentiates from purple learning cards) */}
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#2DD4BF]/15 text-[#2DD4BF]">
              <Landmark size={22} aria-hidden />
            </span>

            <div className="min-w-0 flex-1">
              <h3 className="text-base font-bold text-white">عباداتي اليوم</h3>
              <p className="mt-0.5 truncate text-sm text-[#9AA0C0]">
                ورد القرآن{" "}
                <span dir="ltr" className="font-mono text-[#2DD4BF]">
                  {quranWirdRead} / {quranWirdTarget}
                </span>{" "}
                — تابع وردك اليومي
              </p>
            </div>

            <ProgressRing pct={pct} size={48} stroke={5} color="#2DD4BF" centerLabel={`${pct}%`} />

            <ChevronLeft
              size={18}
              aria-hidden
              className="shrink-0 text-[#9AA0C0] transition-transform duration-200 group-hover:-translate-x-0.5"
            />
          </div>
        </GlassCard>
      </Link>
    </Reveal>
  );
}
