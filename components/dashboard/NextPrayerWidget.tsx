"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Moon, RefreshCw } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { formatHijriLong } from "@/lib/islamic/prayer-times";

interface NextPrayerWidgetProps {
  index?: number;
  /** Coordinates + method come from Islamic settings; sensible Cairo default. */
  latitude?: number;
  longitude?: number;
  timezone?: string;
  calculationMethod?: string;
  madhab?: string;
}

/**
 * Premium dashboard prayer-times island.
 *
 * Surfaces the LIVE next prayer with a ticking countdown and the Hijri date.
 * It is a small client island: the dashboard page stays a server component and
 * passes only serializable settings (no functions) — matching the app's RSC
 * boundary rules. If the API is unreachable the card degrades gracefully to the
 * static "عباداتي" shortcut instead of crashing the dashboard.
 */
export function NextPrayerWidget({
  index = 0,
  latitude = 30.0444,
  longitude = 31.2357,
  timezone = "Africa/Cairo",
  calculationMethod = "egyptian",
  madhab = "shafi",
}: NextPrayerWidgetProps) {
  const { data, isLoading, error, refetch } = usePrayerTimes({
    latitude,
    longitude,
    timezone,
    calculationMethod,
    madhab,
    enabled: true,
  });

  // Live ticking clock so the countdown updates every second.
  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const nextPrayer = data?.nextPrayer ?? null;
  // Authoritative Hijri date comes from the AlAdhan API; fall back to the
  // local estimate only when the API is unreachable.
  const hijri = data?.hijriDate ?? formatHijriLong(new Date());

  // Compute live remaining time to the next prayer.
  let remainingLabel = "";
  let ringPct = 0;
  if (nextPrayer?.timestamp) {
    const diffMs = nextPrayer.timestamp - now;
    if (diffMs > 0) {
      const totalMin = Math.floor(diffMs / 60000);
      const hh = Math.floor(totalMin / 60);
      const mm = totalMin % 60;
      remainingLabel = hh > 0 ? `${hh} س و ${mm} د` : `${mm} دقيقة`;
      // Day progress ring: how far through the current prayer cycle we are.
      ringPct = Math.max(0, Math.min(100, Math.round(((now % 86_400_000) / 86_400_000) * 100)));
    } else {
      remainingLabel = "حان وقت الصلاة";
      ringPct = 100;
    }
  }

  // Error / no-data state → quiet fallback, never blocks the dashboard.
  if (error && !data) {
    return (
      <Reveal index={index}>
        <GlassCard className="p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#2DD4BF]/15 text-[#2DD4BF]">
              <Moon size={20} aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-bold text-white">مواقيت الصلاة</h3>
              <p className="mt-0.5 truncate text-sm text-[#9AA0C0]">
                تعذّر تحميل المواقيت الآن
              </p>
            </div>
            <button
              onClick={() => refetch()}
              aria-label="إعادة تحميل مواقيت الصلاة"
              className="shrink-0 rounded-lg bg-white/5 p-2 text-[#9AA0C0] transition-colors hover:bg-white/10 hover:text-white"
            >
              <RefreshCw size={16} aria-hidden />
            </button>
          </div>
        </GlassCard>
      </Reveal>
    );
  }

  return (
    <Reveal index={index}>
      <GlassCard className="group p-5 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-[#2DD4BF]/30 hover:shadow-[0_8px_24px_rgba(45,212,191,0.10)]">
        <div className="flex items-center gap-4">
          {/* Emerald icon chip — matches the worship section accent */}
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#2DD4BF]/15 text-[#2DD4BF]">
            <Moon size={22} aria-hidden />
          </span>

          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-white">الصلاة القادمة</h3>

            {isLoading && !data ? (
              <p className="mt-1 animate-pulse text-sm text-[#9AA0C0]">
                جاري تحميل المواقيت…
              </p>
            ) : nextPrayer ? (
              <p className="mt-0.5 flex items-center gap-2 text-sm text-[#9AA0C0]">
                <span className="font-bold text-[#2DD4BF]">{nextPrayer.arabicName}</span>
                <span dir="ltr" className="font-mono text-white">
                  {nextPrayer.time}
                </span>
                <span className="text-[#9AA0C0]">·</span>
                <span className="text-[#C7CBE6]">{remainingLabel}</span>
              </p>
            ) : (
              <p className="mt-1 text-sm text-[#9AA0C0]">عباداتي اليوم</p>
            )}

            {/* Hijri date line */}
            <p className="mt-1 flex items-center gap-1 text-xs text-[#9AA0C0]">
              <span className="font-mono" dir="rtl">
                {hijri}
              </span>
            </p>
          </div>

          {/* Countdown ring — emerald to match worship */}
          <div className="hidden shrink-0 sm:block">
            <div
              className="relative h-14 w-14"
              role="img"
              aria-label={remainingLabel ? `الوقت المتبقي ${remainingLabel}` : "مواقيت الصلاة"}
            >
              <svg width={56} height={56} className="-rotate-90">
                <circle
                  cx={28}
                  cy={28}
                  r={23}
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth={5}
                />
                <circle
                  cx={28}
                  cy={28}
                  r={23}
                  fill="none"
                  stroke="#2DD4BF"
                  strokeWidth={5}
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 23}
                  strokeDashoffset={2 * Math.PI * 23 * (1 - ringPct / 100)}
                  style={{ transition: "stroke-dashoffset 1s linear" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Moon size={16} className="text-[#2DD4BF]" aria-hidden />
              </div>
            </div>
          </div>

          <Link
            href="/worship/prayer-times"
            aria-label="فتح مواقيت الصلاة"
            className="shrink-0 text-[#9AA0C0] transition-colors duration-200 hover:text-[#2DD4BF]"
          >
            <RefreshCw size={18} aria-hidden className="opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        </div>
      </GlassCard>
    </Reveal>
  );
}
