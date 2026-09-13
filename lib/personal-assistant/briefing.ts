interface PersonalAssistantContext {
  userName?: string | null;
  role?: "student" | "grad" | "graduate" | "freelancer" | null;
  language?: string;
  timezone?: string;
}

interface BriefingResult {
  greeting: string;
  baseMessage: string;
  roleMessage: string | null;
  timePeriod: "morning" | "evening";
}

const BASE_MESSAGE =
  "متنساش تقرأ الورد اليومي بتاعك\nوتصلي الفروض في وقتها\nوتخلص الأذكار\nوتبدأ تخلص مهامك عشان ربنا يوفقك 💙";

const ROLE_MESSAGES: Partial<Record<Exclude<PersonalAssistantContext["role"], null | undefined>, string>> = {
  student: "وبعدها نبدأ درس النهارده ونخلص جزء من مذاكرتك 📚",
  grad: "وبعدها نكمل تطوير مهاراتك ونقربك من هدفك المهني 🚀",
  graduate: "وبعدها نكمل تطوير مهاراتك ونقربك من هدفك المهني 🚀",
  freelancer: "وبعدها نراجع مهام شغلك ونشوف أهم حاجة محتاجة تخلصها النهارده 💼",
};

function getTimePeriod(timezone?: string): "morning" | "evening" {
  try {
    const now = new Date();
    if (timezone) {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        hour: "numeric",
      });
      const hour = parseInt(formatter.format(now), 10);
      return hour < 12 ? "morning" : "evening";
    }
  } catch {
    // ignore and fall through to local time
  }
  const hour = new Date().getHours();
  return hour < 12 ? "morning" : "evening";
}

export function getPersonalAssistantBriefing(
  context: PersonalAssistantContext
): BriefingResult {
  const { userName, role, timezone } = context;
  const timePeriod = getTimePeriod(timezone);

  const name = (userName ?? "صديقي") as string;

  const greeting =
    timePeriod === "morning"
      ? `أسعد الله صباحك بكل خير يا ${name} 💙`
      : `أسعد الله مساءك بكل خير يا ${name} 💙`;

  const roleMessage =
    role && ROLE_MESSAGES[role] ? ROLE_MESSAGES[role] : null;

  return {
    greeting,
    baseMessage: BASE_MESSAGE,
    roleMessage,
    timePeriod,
  };
}
