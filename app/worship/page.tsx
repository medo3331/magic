"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { NextPrayerCard } from "@/components/worship/NextPrayerCard";
import { TodaysWorshipCards } from "@/components/worship/TodaysWorshipCards";
import { QuranWirdCard } from "@/components/worship/QuranWirdCard";
import { DailyProgress } from "@/components/worship/DailyProgress";
import { mockNavItems, mockUser } from "@/lib/mock-data";
import { generateDailyProgressItems } from "@/lib/islamic/utils";
import { useTodayPrayerTimes, useNextPrayer, useCurrentPrayer } from "@/hooks/usePrayerTimes";

/**
 * Main Worship Dashboard Page
 * /worship
 */
export default function WorshipPage() {
  const navItems = mockNavItems.map(item => 
    item.href === "/worship" ? { ...item, active: true } : { ...item, active: false }
  );

  // Get user settings from localStorage (or context in future)
  const [settings, setSettings] = useState({
    latitude: 30.0444,
    longitude: 31.2357,
    timezone: "Africa/Cairo",
    calculationMethod: "egyptian",
    madhab: "shafi",
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("islamic-settings");
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings(prev => ({ ...prev, ...parsed }));
      }
    } catch {
      // Use defaults
    }
  }, []);

  const { data: prayerTimes, isLoading, error } = useTodayPrayerTimes(
    settings.latitude,
    settings.longitude,
    settings.timezone,
    settings.calculationMethod,
    settings.madhab
  );

  const nextPrayer = useNextPrayer(prayerTimes);
  const currentPrayer = useCurrentPrayer(prayerTimes);

  // Determine next prayer index for daily progress
  const prayerNames = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"];
  const nextPrayerIndex = prayerTimes?.times?.findIndex(p => p.isNext) ?? 0;
  const completedPrayers = new Set(["fajr", "dhuhr"]); // Mock completed prayers
  const completedAdhkar = new Set(["morning"]); // Mock completed adhkar

  const dailyProgressItems = generateDailyProgressItems(
    prayerTimes?.times?.map(p => p.time) ?? [],
    nextPrayerIndex >= 0 ? nextPrayerIndex : 0,
    completedPrayers,
    completedAdhkar
  );

  const currentDate = new Date().toLocaleDateString("ar-EG", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-[#07091A]">
        <Sidebar items={navItems} user={mockUser} />
        <main className="flex-1 px-4 py-6 md:px-6 md:py-8">
          <div className="mx-auto flex max-w-5xl flex-col gap-6">
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7C5CFF]"></div>
              <span className="ml-3 text-[#9AA0C0]">جاري تحميل مواقيت الصلاة...</span>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-[#07091A]">
        <Sidebar items={navItems} user={mockUser} />
        <main className="flex-1 px-4 py-6 md:px-6 md:py-8">
          <div className="mx-auto flex max-w-5xl flex-col gap-6">
            <div className="text-center py-12">
              <p className="text-[#FB923C]">⚠️ {error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-[#7C5CFF] text-white rounded-lg hover:bg-[#6A4CE8] transition-colors"
              >
                إعادة المحاولة
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#07091A]">
      <Sidebar items={navItems} user={mockUser} />

      <main className="flex-1 px-4 py-6 md:px-6 md:py-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          {/* Header */}
          <section className="space-y-2">
            <h1 className="text-2xl font-bold text-white">
              السلام عليكم، {mockUser.name} 👋
            </h1>
            <p className="text-[#B69CFF]">
              نسأل الله لك يومًا مباركًا مليئًا بالطاعات والتوفيق
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#9AA0C0]">
              <span>📅 {currentDate}</span>
              <span>🌙 {prayerTimes?.hijriDate}</span>
              <span>📍 {prayerTimes?.location}</span>
            </div>
          </section>

          {/* Next Prayer Card */}
          <NextPrayerCard
            prayer={nextPrayer}
            location={prayerTimes?.location ?? "غير محدد"}
          />

          {/* Today's Worship Cards */}
          <TodaysWorshipCards
            prayerProgress={{ current: 2, target: 5, completed: false }}
            adhkarProgress={{ current: 8, target: 16, completed: false }}
            quranProgress={{ 
              current: 6, 
              target: 10, 
              completed: false,
              surahName: "البقرة"
            }}
          />

          {/* Quran Daily Wird Card */}
          <QuranWirdCard
            surahName="Al-Baqarah"
            arabicSurahName="سورة البقرة"
            currentAyah={6}
            targetAyah={10}
            totalAyahs={286}
            progress={60}
            juzNumber={1}
            onContinue={() => {}}
            index={0}
          />

          {/* Daily Progress */}
          <DailyProgress
            items={dailyProgressItems}
            title="إنجازاتك اليوم"
            subtitle="تتبع عباداتك اليومية بكل سهولة ويسر"
          />
        </div>
      </main>
    </div>
  );
}