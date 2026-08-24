"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { Reveal } from "@/components/ui/Reveal";
import { IconBadge } from "@/components/ui/IconBadge";
import { cn } from "@/lib/cn";
import { mockNavItems, mockUser } from "@/lib/mock-data";
import { CALCULATION_METHODS, MADHABS } from "@/lib/islamic/prayer-times";
import { ArrowLeft, MapPin, Bell, Music, Sun, Moon, BookOpen, Globe, Layers } from "lucide-react";
import Link from "next/link";

interface UserIslamicSettings {
  userId: string;
  location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    timezone: string;
  };
  calculationMethod: string;
  madhab: "shafi" | "hanafi";
  prayerNotifications: boolean;
  adhanEnabled: boolean;
  reminderMinutes: number;
  morningAdhkarReminder: boolean;
  eveningAdhkarReminder: boolean;
  sleepAdhkarReminder: boolean;
  quranDailyTarget: number;
}

const DEFAULT_SETTINGS: UserIslamicSettings = {
  userId: "u_01",
  location: {
    city: "القاهرة",
    country: "مصر",
    latitude: 30.0444,
    longitude: 31.2357,
    timezone: "Africa/Cairo",
  },
  calculationMethod: "egyptian",
  madhab: "shafi",
  prayerNotifications: true,
  adhanEnabled: true,
  reminderMinutes: 10,
  morningAdhkarReminder: true,
  eveningAdhkarReminder: true,
  sleepAdhkarReminder: true,
  quranDailyTarget: 10,
};

const SETTINGS_KEY = "islamic-settings";

function loadSettings(): UserIslamicSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    }
  } catch {
    // Use defaults
  }
  return DEFAULT_SETTINGS;
}

function saveSettings(settings: UserIslamicSettings): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // Ignore
  }
}

/**
 * Worship Settings Page
 * Integrated with existing settings architecture
 */
export const dynamic = "force-dynamic";

export default function WorshipSettingsPage() {
  const navItems = mockNavItems.map(item =>
    item.href === "/worship" ? { ...item, active: true } : { ...item, active: false }
  );

  const [settings, setSettings] = useState<UserIslamicSettings>(() => loadSettings());
  const [activeTab, setActiveTab] = useState<"prayer" | "adhkar" | "quran">("prayer");

  const handleSettingChange = <K extends keyof UserIslamicSettings>(
    key: K,
    value: UserIslamicSettings[K]
  ) => {
    setSettings(prev => {
      const updated = { ...prev, [key]: value };
      saveSettings(updated);
      return updated;
    });
  };

  const prayerTabs = ["prayer", "adhkar", "quran"] as const;
  const prayerTabLabels = (value: "prayer" | "adhkar" | "quran") => {
    const labels = {
      prayer: "الصلاة",
      adhkar: "الأذكار",
      quran: "القرآن",
    };
    return labels[value];
  };

  return (
    <div className="flex min-h-screen bg-[#07091A]">
      <Sidebar items={navItems} user={mockUser} />

      <main className="flex-1 px-4 py-6 md:px-6 md:py-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          {/* Header */}
          <Reveal index={0}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">إعدادات العبادات</h1>
                <p className="text-[#9AA0C0] mt-1">تخصيص مواقيت الصلاة والأذكار والقرآن</p>
              </div>
              <Link href="/worship" className="flex items-center gap-1 text-sm text-[#B69CFF] hover:text-[#7C5CFF] transition-colors">
                <ArrowLeft size={18} aria-hidden />
                <span>عباداتي</span>
              </Link>
            </div>
          </Reveal>

          {/* Tabs */}
          <Reveal index={1}>
            <GlassCard className="p-4">
              <Tabs
                options={prayerTabs}
                value={activeTab}
                onChange={setActiveTab}
                labelFor={prayerTabLabels}
              />
            </GlassCard>
          </Reveal>

          {/* Prayer Settings */}
          {activeTab === "prayer" && (
            <Reveal index={2}>
              <GlassCard className="p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <IconBadge icon={MapPin} color="text-[#FB923C]" bg="bg-[#FB923C]/15" size={40} />
                  <div>
                    <h3 className="text-lg font-bold text-white">الموقع</h3>
                    <p className="text-sm text-[#9AA0C0]">تحديد الموقع لحساب مواقيت الصلاة الدقيقة</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#C7CBE6] mb-2">المدينة</label>
                    <input
                      type="text"
                      value={settings.location.city}
                      onChange={e => handleSettingChange("location", { ...settings.location, city: e.target.value })}
                      className="w-full h-11 px-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-[#9AA0C0] focus:outline-none focus:border-[#7C5CFF]/50 focus:bg-white/[0.06]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#C7CBE6] mb-2">الدولة</label>
                    <input
                      type="text"
                      value={settings.location.country}
                      onChange={e => handleSettingChange("location", { ...settings.location, country: e.target.value })}
                      className="w-full h-11 px-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-[#9AA0C0] focus:outline-none focus:border-[#7C5CFF]/50 focus:bg-white/[0.06]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#C7CBE6] mb-2">خط العرض</label>
                      <input
                        type="number"
                        step="any"
                        value={settings.location.latitude}
                        onChange={e => handleSettingChange("location", { ...settings.location, latitude: parseFloat(e.target.value) })}
                        className="w-full h-11 px-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-[#9AA0C0] focus:outline-none focus:border-[#7C5CFF]/50 focus:bg-white/[0.06]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#C7CBE6] mb-2">خط الطول</label>
                      <input
                        type="number"
                        step="any"
                        value={settings.location.longitude}
                        onChange={e => handleSettingChange("location", { ...settings.location, longitude: parseFloat(e.target.value) })}
                        className="w-full h-11 px-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-[#9AA0C0] focus:outline-none focus:border-[#7C5CFF]/50 focus:bg-white/[0.06]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#C7CBE6] mb-2">المنطقة الزمنية</label>
                    <input
                      type="text"
                      value={settings.location.timezone}
                      onChange={e => handleSettingChange("location", { ...settings.location, timezone: e.target.value })}
                      className="w-full h-11 px-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-[#9AA0C0] focus:outline-none focus:border-[#7C5CFF]/50 focus:bg-white/[0.06]"
                    />
                  </div>

                  <Button variant="primary" icon={Globe} iconPosition="start" className="w-full">
                    استخدام الموقع الحالي
                  </Button>
                </div>
              </GlassCard>
            </Reveal>
          )}

          {activeTab === "prayer" && (
            <Reveal index={3}>
              <GlassCard className="p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <IconBadge icon={Layers} color="text-[#7C5CFF]" bg="bg-[#7C5CFF]/15" size={40} />
                  <div>
                    <h3 className="text-lg font-bold text-white">طريقة الحساب والمذهب</h3>
                    <p className="text-sm text-[#9AA0C0]">اختيار طريقة حساب مواقيت الصلاة والمذهب الفقهي</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#C7CBE6] mb-2">طريقة الحساب</label>
                    <select
                      value={settings.calculationMethod}
                      onChange={e => handleSettingChange("calculationMethod", e.target.value)}
                      className="w-full h-11 px-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white focus:outline-none focus:border-[#7C5CFF]/50 focus:bg-white/[0.06] appearance-none"
                    >
                      {CALCULATION_METHODS.map(method => (
                        <option key={method.id} value={method.name}>
                          {method.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#C7CBE6] mb-2">المذهب الفقهي</label>
                    <select
                      value={settings.madhab}
                      onChange={e => handleSettingChange("madhab", e.target.value as "shafi" | "hanafi")}
                      className="w-full h-11 px-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white focus:outline-none focus:border-[#7C5CFF]/50 focus:bg-white/[0.06] appearance-none"
                    >
                      {MADHABS.map(madhab => (
                        <option key={madhab.id} value={madhab.id}>
                          {madhab.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          )}

          {activeTab === "prayer" && (
            <Reveal index={4}>
              <GlassCard className="p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <IconBadge icon={Bell} color="text-[#2DD4BF]" bg="bg-[#2DD4BF]/15" size={40} />
                  <div>
                    <h3 className="text-lg font-bold text-white">الإشعارات والتنبيهات</h3>
                    <p className="text-sm text-[#9AA0C0]">إدارة تنبيهات الصلاة والأذان</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <SettingToggle
                    label="إشعارات الصلاة"
                    description="تلقي تنبيه عند دخول كل وقت صلاة"
                    checked={settings.prayerNotifications}
                    onChange={checked => handleSettingChange("prayerNotifications", checked)}
                  />
                  <SettingToggle
                    label="صوت الأذان"
                    description="تشغيل صوت الأذان عند وقت الصلاة"
                    checked={settings.adhanEnabled}
                    onChange={checked => handleSettingChange("adhanEnabled", checked)}
                  />
                  <SettingToggle
                    label="تنبيه قبل الصلاة"
                    description={`تنبيه قبل الصلاة بـ ${settings.reminderMinutes} دقائق`}
                    checked={settings.reminderMinutes > 0}
                    onChange={checked => handleSettingChange("reminderMinutes", checked ? 10 : 0)}
                  />
                  {settings.reminderMinutes > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-[#C7CBE6] mb-2">
                        دقائق التنبيه قبل الصلاة: {settings.reminderMinutes}
                      </label>
                      <input
                        type="range"
                        min="5"
                        max="30"
                        step="5"
                        value={settings.reminderMinutes}
                        onChange={e => handleSettingChange("reminderMinutes", parseInt(e.target.value))}
                        className="w-full h-2 bg-white/[0.06] rounded-full appearance-none accent-[#7C5CFF]"
                      />
                    </div>
                  )}
                </div>
              </GlassCard>
            </Reveal>
          )}

          {/* Adhkar Settings */}
          {activeTab === "adhkar" && (
            <Reveal index={2}>
              <GlassCard className="p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <IconBadge icon={Sun} color="text-[#FB923C]" bg="bg-[#FB923C]/15" size={40} />
                  <div>
                    <h3 className="text-lg font-bold text-white">تنبيهات الأذكار</h3>
                    <p className="text-sm text-[#9AA0C0]">تفعيل تذكيرات الأذكار اليومية</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <SettingToggle
                    label="تذكير أذكار الصباح"
                    description="تنبيه بعد صلاة الفجر لأذكار الصباح"
                    checked={settings.morningAdhkarReminder}
                    onChange={checked => handleSettingChange("morningAdhkarReminder", checked)}
                  />
                  <SettingToggle
                    label="تذكير أذكار المساء"
                    description="تنبيه بعد صلاة العصر لأذكار المساء"
                    checked={settings.eveningAdhkarReminder}
                    onChange={checked => handleSettingChange("eveningAdhkarReminder", checked)}
                  />
                  <SettingToggle
                    label="تذكير أذكار النوم"
                    description="تنبيه قبل النوم لأذكار النوم"
                    checked={settings.sleepAdhkarReminder}
                    onChange={checked => handleSettingChange("sleepAdhkarReminder", checked)}
                  />
                </div>
              </GlassCard>
            </Reveal>
          )}

          {/* Quran Settings */}
          {activeTab === "quran" && (
            <Reveal index={2}>
              <GlassCard className="p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <IconBadge icon={BookOpen} color="text-[#2DD4BF]" bg="bg-[#2DD4BF]/15" size={40} />
                  <div>
                    <h3 className="text-lg font-bold text-white">إعدادات القرآن</h3>
                    <p className="text-sm text-[#9AA0C0]">تخصيص الورد اليومي وتتبع التقدم</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#C7CBE6] mb-2">
                      الهدف اليومي للقراءة: {settings.quranDailyTarget} آيات
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="50"
                      step="5"
                      value={settings.quranDailyTarget}
                      onChange={e => handleSettingChange("quranDailyTarget", parseInt(e.target.value))}
                      className="w-full h-2 bg-white/[0.06] rounded-full appearance-none accent-[#2DD4BF]"
                    />
                    <p className="text-xs text-[#9AA0C0] mt-1">عدد الآيات المستهدف قراءتها يومياً</p>
                  </div>

                  <SettingToggle
                    label="تذكير الورد اليومي"
                    description="تنبيه يومي لمتابعة قراءة القرآن"
                    checked={true}
                    onChange={checked => console.log("Quran reminder:", checked)}
                  />

                  <SettingToggle
                    label="حفظ موضع القراءة تلقائياً"
                    description="العودة لآخر آية تمت قراءتها"
                    checked={true}
                    onChange={checked => console.log("Auto-save position:", checked)}
                  />
                </div>
              </GlassCard>
            </Reveal>
          )}

          {/* Save Button */}
          <Reveal index={5}>
            <Button 
              variant="primary" 
              className="w-full"
              onClick={() => alert("Settings saved! (In production, would save to database)")}
            >
              حفظ الإعدادات
            </Button>
          </Reveal>
        </div>
      </main>
    </div>
  );
}

interface SettingToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function SettingToggle({ label, description, checked, onChange }: SettingToggleProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
      <div className="flex-1">
        <p className="font-medium text-white">{label}</p>
        <p className="text-sm text-[#9AA0C0] mt-0.5">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        role="switch"
        aria-checked={checked}
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors",
          checked ? "bg-[#7C5CFF]" : "bg-white/[0.1]"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform",
            checked ? "translate-x-5" : "translate-x-0.5"
          )}
        />
      </button>
    </div>
  );
}