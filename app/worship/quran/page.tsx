"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { QuranReader } from "@/components/worship/QuranReader";
import { mockNavItems, mockUser } from "@/lib/mock-data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

/**
 * Quran Reader Page
 * /worship/quran
 */
export const dynamic = "force-dynamic";

export default function QuranPage() {
  const navItems = mockNavItems.map(item => 
    item.href === "/worship" ? { ...item, active: true } : { ...item, active: false }
  );

  return (
    <div className="flex min-h-screen bg-[#07091A]">
      <Sidebar items={navItems} user={mockUser} />

      <main className="flex-1 px-4 py-6 md:px-6 md:py-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 h-[calc(100vh-12rem)]">
          {/* Header */}
          <div className="flex items-center justify-between flex-shrink-0">
            <div>
              <h1 className="text-2xl font-bold text-white">القرآن الكريم</h1>
              <p className="text-[#9AA0C0] mt-1">قراءة وتلاوة وتدبر كتاب الله</p>
            </div>
            <Link href="/worship" className="flex items-center gap-1 text-sm text-[#B69CFF] hover:text-[#7C5CFF] transition-colors">
              <ArrowLeft size={18} aria-hidden />
              <span>عباداتي</span>
            </Link>
          </div>

          {/* Quran Reader */}
          <div className="flex-1 overflow-hidden">
            <QuranReader
              initialSurahId={2} // Start with Al-Baqarah
              onProgressUpdate={(surahId, ayahId) => {
                console.log("Progress updated:", surahId, ayahId);
                // In production, save to database
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}