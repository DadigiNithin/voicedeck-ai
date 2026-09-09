"use client";

import React from "react";
import { Sparkles, ArrowUpRight } from "lucide-react";

const items = [
  "TRANSCRIPT TO SLIDES",
  "AI SPEECH SYNTHESIS",
  "POWERPOINT PPTX EXPORT",
  "95%+ ACCURACY RATE",
  "EXECUTIVE PRESENTATIONS",
  "INSTANT WORKFLOW",
  "ONE-DAY HERO UI",
];

export default function MarqueeTicker() {
  return (
    <div className="relative w-full overflow-hidden border-y border-[#6D28D9]/10 bg-[#EDE3FF]/50 py-3.5 select-none shadow-inner">
      <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-[#FFF8E8] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-[#FFF8E8] to-transparent z-10 pointer-events-none" />
      
      <div className="animate-marquee flex items-center gap-8 text-xs sm:text-sm font-display font-bold uppercase tracking-widest text-[#5C4E4E]">
        {[...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-6 whitespace-nowrap group hover:text-[#211A1A] transition-colors">
            <span className="flex items-center gap-2">
              <span className="text-[#35115F] font-mono text-[10px] sm:text-xs font-bold">[ {String(idx % items.length + 1).padStart(2, '0')} ]</span>
              {text}
            </span>
            {idx % 2 === 0 ? (
              <Sparkles className="w-3.5 h-3.5 text-[#6D28D9]" />
            ) : (
              <ArrowUpRight className="w-3.5 h-3.5 text-[#7C3AED]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
