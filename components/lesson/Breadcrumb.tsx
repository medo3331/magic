import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Crumb } from "@/lib/types";

interface BreadcrumbProps {
  items: Crumb[];
  className?: string;
}

/**
 * Muted breadcrumb with chevron separators (RTL: chevrons point left, the
 * visual "forward" direction). The last item is the current page (no link).
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="مسار التنقل"
      className={cn("flex flex-wrap items-center gap-2 text-[#9AA0C0]", className)}
    >
      {items.map((c, i) => {
        const last = i === items.length - 1;
        return (
          <span key={`${c.label}-${i}`} className="inline-flex items-center gap-2">
            {c.href && !last ? (
              <Link href={c.href} className="text-sm transition-colors hover:text-[#E7E9F5]">
                {c.label}
              </Link>
            ) : (
              <span className={cn("text-sm", last && "text-[#E7E9F5]")}>{c.label}</span>
            )}
            {!last && <ChevronLeft size={14} className="opacity-60" aria-hidden />}
          </span>
        );
      })}
    </nav>
  );
}
