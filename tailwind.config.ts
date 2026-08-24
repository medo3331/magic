import type { Config } from "tailwindcss";

/**
 * Tailwind config.
 * NOTE: The required palette is expressed as Tailwind *arbitrary values*
 * (e.g. bg-[#07091A]) directly in the components so they stay drop-in without
 * editing this file. The tokens below are registered ONLY as semantic names so
 * that spacing helpers and the font variables resolve cleanly.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Wired to the next/font CSS variables set in app/layout.tsx
        sans: ["var(--font-plex-arabic)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      spacing: {
        // Fixed spacing scale — 4 / 8 / 16 / 24 px (plus a 12px half-step).
        // Use only these values everywhere: p-1 p-2 p-3 p-4 p-6 ...
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "6": "24px",
      },
      colors: {
        // Semantic aliases (optional convenience; components may use arbitrary values too)
        base: "#07091A",
        card: "#0D1029",
        brand: "#7C5CFF",
        "brand-tint": "#B69CFF",
        accent: "#FB923C",
        success: "#2DD4BF",
      },
      backgroundImage: {
        "brand-glow":
          "radial-gradient(circle at 50% 0%, rgba(124,92,255,0.25), transparent 60%)",
      },
    },
  },
  plugins: [],
};

export default config;
