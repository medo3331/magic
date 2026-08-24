import type { PrayerTimesData, PrayerTime } from "./types";
import type { PrayerTimes } from "./types";

export { 
  getPrayerTimes, 
  getTodayPrayerTimes, 
  clearExpiredCache, 
  getCacheStats, 
  preloadPrayerTimes 
} from "./prayer-times/service";

export { 
  getNextPrayer, 
  getCurrentPrayer, 
  getTimeUntilNextPrayer, 
  formatTimeRemaining, 
  getDayProgress, 
  isPrayerTime 
} from "./prayer-times/next-prayer";

// Re-export types for convenience
export type { PrayerTimes } from "./types";

/** Calculation methods */
export const CALCULATION_METHODS = [
  { id: "muslim_world_league", name: "رابطة العالم الإسلامي" },
  { id: "egyptian", name: "الهيئة المصرية للمساحة" },
  { id: "karachi", name: "جامعة العلوم الإسلامية كراتشي" },
  { id: "umm_al_qura", name: "أم القرى" },
  { id: "dubai", name: "دبي" },
  { id: "moonsighting_committee", name: "لجنة رؤية الهلال" },
  { id: "north_america", name: "أمريكا الشمالية (ISNA)" },
  { id: "kuwait", name: "الكويت" },
  { id: "qatar", name: "قطر" },
  { id: "singapore", name: "سنغافورة" },
] as const;

export type CalculationMethodId = typeof CALCULATION_METHODS[number]["id"];

/** Madhabs */
export const MADHABS = [
  { id: "shafi", name: "الشافعي" },
  { id: "hanafi", name: "الحنفي" },
] as const;

export type MadhabId = typeof MADHABS[number]["id"];

/**
 * Get Hijri date (mock - use a proper library in production)
 */
export function getHijriDate(date: Date): string {
  // This is a placeholder - use hijri-converter or similar in production
  const hijriYear = date.getFullYear() - 622;
  const hijriMonth = date.getMonth() + 1;
  const hijriDay = date.getDate();
  return `${hijriYear}-${hijriMonth.toString().padStart(2, "0")}-${hijriDay.toString().padStart(2, "0")}`;
}

/**
 * Convert normalized PrayerTimes to legacy PrayerTimesData for backward compatibility
 */
export function convertToLegacyFormat(prayerTimes: PrayerTimes): PrayerTimesData {
  const arabicNames: Record<string, string> = {
    fajr: "الفجر",
    sunrise: "الشروق",
    dhuhr: "الظهر",
    asr: "العصر",
    maghrib: "المغرب",
    isha: "العشاء",
  };

  const times: PrayerTime[] = [
    {
      name: "Fajr",
      arabicName: "الفجر",
      time: prayerTimes.prayers.fajr,
      timestamp: prayerTimes.timestamps.fajr,
      isNext: prayerTimes.nextPrayer?.name === "Fajr",
      isCurrent: false,
    },
    {
      name: "Sunrise",
      arabicName: "الشروق",
      time: prayerTimes.prayers.sunrise,
      timestamp: prayerTimes.timestamps.sunrise,
      isNext: prayerTimes.nextPrayer?.name === "Sunrise",
      isCurrent: false,
    },
    {
      name: "Dhuhr",
      arabicName: "الظهر",
      time: prayerTimes.prayers.dhuhr,
      timestamp: prayerTimes.timestamps.dhuhr,
      isNext: prayerTimes.nextPrayer?.name === "Dhuhr",
      isCurrent: false,
    },
    {
      name: "Asr",
      arabicName: "العصر",
      time: prayerTimes.prayers.asr,
      timestamp: prayerTimes.timestamps.asr,
      isNext: prayerTimes.nextPrayer?.name === "Asr",
      isCurrent: false,
    },
    {
      name: "Maghrib",
      arabicName: "المغرب",
      time: prayerTimes.prayers.maghrib,
      timestamp: prayerTimes.timestamps.maghrib,
      isNext: prayerTimes.nextPrayer?.name === "Maghrib",
      isCurrent: false,
    },
    {
      name: "Isha",
      arabicName: "العشاء",
      time: prayerTimes.prayers.isha,
      timestamp: prayerTimes.timestamps.isha,
      isNext: prayerTimes.nextPrayer?.name === "Isha",
      isCurrent: false,
    },
  ];

  return {
    date: prayerTimes.date,
    hijriDate: prayerTimes.hijriDate,
    location: prayerTimes.location.displayName,
    calculationMethod: prayerTimes.calculationMethod.name,
    madhab: prayerTimes.madhab.name,
    times,
    nextPrayer: prayerTimes.nextPrayer,
  };
}