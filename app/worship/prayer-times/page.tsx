"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { PrayerTimesList } from "@/components/worship/PrayerTimesList";
import { mockNavItems, mockUser } from "@/lib/mock-data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePrayerTimes, useNextPrayer, useCurrentPrayer } from "@/hooks/usePrayerTimes";

/**
 * Prayer Times Page
 * /worship/prayer-times
 */
export const dynamic = "force-dynamic";

export default function PrayerTimesPage() {
  const navItems = mockNavItems.map(item => 
    item.href === "/worship" ? { ...item, active: true } : { ...item, active: false }
  );

  // Get user settings from localStorage
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

  const { data: prayerTimes, isLoading, error, refetch } = usePrayerTimes({
    latitude: settings.latitude,
    longitude: settings.longitude,
    timezone: settings.timezone,
    calculationMethod: settings.calculationMethod,
    madhab: settings.madhab,
    enabled: true,
  });

  const nextPrayer = useNextPrayer(prayerTimes);
  const currentPrayer = useCurrentPrayer(prayerTimes);

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
                onClick={refetch}
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
          <Reveal index={0}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">مواقيت الصلاة</h1>
                <p className="text-[#9AA0C0] mt-1">مواقيت الصلاة اليومية لموقعك</p>
              </div>
              <Link href="/worship" className="flex items-center gap-1 text-sm text-[#B69CFF] hover:text-[#7C5CFF] transition-colors">
                <ArrowLeft size={18} aria-hidden />
                <span>عباداتي</span>
              </Link>
            </div>
          </Reveal>

          {/* Prayer Times List */}
          <Reveal index={1}>
            {prayerTimes ? (
              <PrayerTimesList
                data={prayerTimes}
                onSettingsClick={() => alert("Settings clicked - would open settings modal")}
              />
            ) : (
              <div className="text-center py-12 text-[#9AA0C0]">
                <p>جاري تحميل مواقيت الصلاة...</p>
              </div>
            )}
          </Reveal>

          {/* Info Card */}
          <Reveal index={2}>
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-white mb-4">حول مواقيت الصلاة</h3>
              <div className="space-y-3 text-[#C7CBE6] leading-relaxed">
                <p>
                  تُحسب مواقيت الصلاة بناءً على موقعك الجغرافي وطريقة الحساب المعتمدة.
                  الطريقة الافتراضية هي <span className="text-white font-medium">رابطة العالم الإسلامي</span>،
                  والمذهب <span className="text-white font-medium">الشافعي</span> للصلاة.
                </p>
                <p>
                  يمكنك تغيير الموقع وطريقة الحساب والمذهب من الإعدادات.
                  يُنصح بتفعيل الإشعارات لتلقي تنبيهات قبل كل صلاة.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 rounded-full text-xs bg-[#7C5CFF]/15 text-[#B69CFF]">
                    تنبيهات الصلاة
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs bg-[#2DD4BF]/15 text-[#2DD4BF]">
                    صوت الأذان
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs bg-[#FB923C]/15 text-[#FB923C]">
                    تعديل يدوي
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs bg-[#B69CFF]/15 text-[#B69CFF]">
                    طريقة الحساب
                  </span>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </main>
    </div>
  );
}