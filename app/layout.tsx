import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/**
 * Heading + body font. Loaded via next/font/google so there is no
 * layout shift and no extra network request round-trip.
 * Subsets: arabic (RTL prose) + latin (numbers / UI glyphs).
 */
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

/** Mono font — used ONLY for numbers/stats (XP, %, counts) to give a HUD/gaming feel. */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Magicly — منصة التعلم",
  description: "منصة تعليم عربية (RTL) بمظهر ألعاب تفاعلي",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${plexArabic.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-[#07091A] font-sans text-[#E7E9F5] antialiased">
        {children}
      </body>
    </html>
  );
}
