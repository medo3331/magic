import { LessonView } from "@/components/lesson/LessonView";
import { mockExplanation, mockLesson } from "@/lib/mock-data";
import type { Crumb } from "@/lib/types";

/**
 * Dynamic lesson route: /lesson/[id].
 * A server component that resolves the lesson by id. Here it returns the mock
 * payload; in production, replace with a DB/API lookup that returns the same
 * `Lesson` + `Record<ExplanationMode, LessonSection[]>` shape.
 */
export default function LessonPage({ params }: { params: { id: string } }) {
  // Demo data is keyed to a single lesson; a real lookup would query by params.id.
  // Breadcrumb trail for the lesson page.
  const crumbs: Crumb[] = [
    { label: "الرئيسية", href: "/" },
    { label: "الداشبورد", href: "/dashboard" },
    { label: mockLesson.category, href: "/dashboard" },
    { label: "الدرس 1" },
  ];

  return <LessonView lesson={mockLesson} explanation={mockExplanation} crumbs={crumbs} />;
}
