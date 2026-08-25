"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AvatarOrbit } from "@/components/ui/AvatarOrbit";
import type { User } from "@/lib/types";

interface FloatingAvatarProps {
  user: User;
}

/**
 * Client island wrapping the hero avatar with a subtle 2–4px idle float.
 * Takes ONLY serializable props so a server parent (DashboardHero) can render
 * it without crossing the RSC boundary with functions.
 */
export function FloatingAvatar({ user }: FloatingAvatarProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <AvatarOrbit user={user} />
    </motion.div>
  );
}
