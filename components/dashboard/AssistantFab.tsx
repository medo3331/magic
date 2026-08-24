"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bot } from "lucide-react";

interface AssistantFabProps {
  /** Accessible label (Arabic-first UI). */
  label?: string;
}

/**
 * Dashboard entry point for the AI Assistant.
 * Visual affordance ONLY — no assistant logic lives here; it matches the
 * floating help-button pattern already used in LessonView (fixed bottom-left
 * in RTL) so the two read as one system. Gentle idle float, hover-only pulse;
 * respects prefers-reduced-motion. Hidden ≥72px above mobile bottom nav.
 */
export function AssistantFab({ label = "المساعد الذكي" }: AssistantFabProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      aria-label={label}
      title={label}
      className={[
        "fixed bottom-[76px] left-4 z-30 md:bottom-6 md:left-6",
        "inline-flex h-12 w-12 items-center justify-center rounded-full",
        "border border-white/[0.08] bg-gradient-to-br from-[#7C5CFF] to-[#5B3FD6]",
        "text-white shadow-[0_10px_30px_rgba(124,92,255,0.35)]",
        "transition-transform duration-200 active:scale-[0.98]",
      ].join(" ")}
      animate={reduceMotion ? undefined : { y: [0, -2, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <Bot size={22} aria-hidden />
    </motion.button>
  );
}
