if (typeof (Array.prototype as any).toSorted !== "function") {
  (Array.prototype as any).toSorted = function (compareFn: any) {
    return [...this].sort(compareFn);
  };
}

import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VoiceDeck AI — Turn Meetings into Beautiful Presentations",
  description:
    "Upload an audio recording or paste a transcript and instantly generate an investor-ready presentation using AI.",
  keywords: [
    "AI presentation generator",
    "voice to slides",
    "meeting transcript to slides",
    "AI slide deck",
  ],
  authors: [{ name: "VoiceDeck AI" }],
  openGraph: {
    title: "VoiceDeck AI — Turn Meetings into Beautiful Presentations",
    description:
      "Convert voice recordings and meeting transcripts into stunning slide decks using AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-[#FFF8E8] text-[#211A1A]`}>
        {children}
      </body>
    </html>
  );
}
