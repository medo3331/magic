"use client";

import { BookOpen, Clock, TrendingUp, AlertCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";

/*
 * Secondary v0 Progress — smallest practical indicator ONLY.
 * Source: confirmed DB relationships (study_days / study_configs / profiles)
 * from economy-audit / FINAL_1.2F references. NO assessment insert/update.
 *
 * What this shows:
 *   - Structural % (temporary, engagement-only indicator, NOT mastery)
 *   - Confirmed fields: study_days.is_completed, study_configs.subject
 *   - NO mastery claims, NO tutor OS, NO new DB tables.
 */

interface SecondaryProgressProps {
  completedDays?: number; // from study_days.is_completed count (real if bound)
  totalDays?: number;     // from study_configs / planner (real if bound)
  subject?: string;       // from study_configs.subject / profiles.role
}

function structuralPct(done?: number, total?: number): number | null {
  if (done === undefined || total === undefined || total <= 0) return null;
  const p = Math.round((done / total) * 100);
  return Math.min(Math.max(p, 0), 100);
}

export function SecondaryProgress({
  completedDays,
  totalDays,
  subject,
}: SecondaryProgressProps) {
  const pct = structuralPct(completedDays, totalDays);
  const hasReal = completedDays !== undefined && totalDays !== undefined;

  return (
    <GlassCard className="p-4" aria-label="تقدّم المرحلة الثانوية (v0)">
      <div className="flex items-center justify-between px-2 pb-3">
        <h3 className="text-sm font-semibold text-[#9AA0C0]">تقدّم الثانوي</h3>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#B69CFF]/10 px-2 py-0.5 text-[10px] font-medium text-[#B69CFF]">
          <TrendingUp size={10} /> v0 — مؤقت
        </span>
      </div>

      {!hasReal ? (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <AlertCircle size={28} className="text-[#FB923C]" />
          <div>
            <p className="text-xs font-medium text-[#E7E9F5]">لا توجد بيانات تقدّم مرتبطة بعد</p>
            <p className="text-[11px] text-[#9AA0C0]">سيظهر التقدّم عند ربط study_days / study_configs</p>
          </div>
        </div>
      ) : (
        <Reveal index={0}>
          <div className="rounded-2xl bg-[#0D1029]/60 px-4 py-4 border border-white/[0.06]">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#7C5CFF]/15 text-[#B69CFF]">
                <BookOpen size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  {subject ?? "المرحلة الثانوية"}
                </p>
                <p className="text-[11px] text-[#9AA0C0]">مؤشر مؤقت — ليس إتقانًا</p>
              </div>
            </div>

            {/* Structural % bar — temporary engagement indicator */}
            <div className="mb-2">
              <div className="flex items-end justify-between text-xs mb-1">
                <span className="text-[#9AA0C0]">نسبة التقدّم الهيكلية</span>
                <span className="font-mono font-bold text-[#FB923C]" dir="ltr">
                  {pct !== null ? `${pct}%` : "—"}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-[#1A1F3D] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#FB923C]/60 to-[#FB923C] transition-all duration-700 ease-out"
                  style={{ width: pct !== null ? `${pct}%` : "0%" }}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/[0.06]">
              <div className="flex items-center gap-1.5 text-[11px] text-[#9AA0C0]">
                <Clock size={12} className="text-[#B69CFF]" />
                <span>مكتمل: {completedDays ?? 0}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#9AA0C0]">
                <BookOpen size={12} className="text-[#FB923C]" />
                <span>الإجمالي: {totalDays ?? 0}</span>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {/* Honest note — assessment gap remains unverified */}
      <p className="mt-3 text-[10px] text-[#6B6F8C] leading-relaxed">
        ملاحظة: هذا مؤشر مؤقت للتفاعل الهيكلي فقط. لم يُربط بعد بنتائج التقييم (assessment). لا يُمثّل إتقانًا أو انتقالًا تعليميًا.
      </p>
    </GlassCard>
  );
}
