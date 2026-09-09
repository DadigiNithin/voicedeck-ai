"use client";

import { motion } from "framer-motion";
import { Mic, Play, ArrowUpRight, Sparkles, Zap, ShieldCheck } from "lucide-react";

const floatingAnimate = {
  y: [-8, 8, -8],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

const orbAnimate = {
  scale: [1, 1.15, 1],
  opacity: [0.35, 0.65, 0.35],
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

export default function Hero() {
  const scrollToDemo = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Ambient Radial Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={orbAnimate}
          className="absolute top-1/4 left-1/4 w-[650px] h-[650px] rounded-full bg-gradient-to-r from-[#F7D9C4]/35 via-[#EDE3FF]/30 to-[#7C3AED]/15 blur-[140px]"
        />
        <motion.div
          animate={orbAnimate}
          className="absolute bottom-10 right-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-r from-[#7C3AED]/15 to-[#F7D9C4]/35 blur-[130px]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col lg:flex-row items-center gap-14 z-10">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          {/* Soft Lavender Category Pill */}


          {/* Oversized Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-black text-[#211A1A] leading-[1.05] tracking-tight uppercase mb-6"
          >
            TURN AUDIO & TRANSCRIPTS INTO{" "}
            <span className="block mt-1 bg-gradient-to-r from-[#35115F] via-[#6D28D9] to-[#7C3AED] bg-clip-text text-transparent font-black">
              HIGH-IMPACT SLIDES
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-[#5C4E4E] leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8 font-sans font-medium"
          >
            Turn recordings and transcripts into polished, presentation-ready slides in seconds.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 35px rgba(124,58,237,0.35)" }}
              whileTap={{ scale: 0.96 }}
              onClick={scrollToDemo}
              className="px-8 py-4 font-display font-bold uppercase tracking-wider text-white rounded-full bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] hover:from-[#35115F] hover:to-[#6D28D9] shadow-xl shadow-[#6D28D9]/25 transition-all flex items-center justify-center gap-2.5 text-sm cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current text-[#EDE3FF]" />
              GENERATE SLIDES NOW
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={scrollToDemo}
              className="px-8 py-4 font-display font-bold uppercase tracking-wider text-[#211A1A] hover:text-[#6D28D9] rounded-full border border-[#6D28D9]/15 bg-[#FFFDF7] hover:bg-white backdrop-blur-md shadow-sm transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current text-[#7C3AED]" />
              WATCH DEMO
            </motion.button>
          </motion.div>

          {/* Badges / Stats Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 mt-10 pt-8 border-t border-[#6D28D9]/10"
          >
            {[
              { label: "SLIDES GENERATED", value: "50K+" },
              { label: "TIME SAVED", value: "200 HRS+" },
              { label: "AI ACCURACY", value: "95%" },
            ].map((stat) => (
              <div key={stat.label} className="p-3.5 rounded-2xl bg-[#FFFDF7] border border-[#6D28D9]/10 text-center lg:text-left shadow-sm">
                <div className="font-display font-black text-xl text-[#35115F] tracking-tight">{stat.value}</div>
                <div className="text-[10px] font-mono tracking-widest text-[#5C4E4E] uppercase mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Interactive Mockup Card */}
        <div className="flex-1 flex justify-center lg:justify-end w-full">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-lg"
          >
            {/* Organic Card Container (#FFFDF7 Soft White Surface) */}
            <motion.div
              animate={floatingAnimate}
              className="relative bg-[#FFFDF7] backdrop-blur-2xl border border-[#6D28D9]/15 rounded-3xl p-7 shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#6D28D9]/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-[#EDE3FF] text-[#6D28D9] font-mono font-bold text-xs flex items-center justify-center">
                    01
                  </div>
                  <div>
                    <div className="font-display font-bold text-[#35115F] text-xs uppercase tracking-wider">VOICEDECK AI STUDIO</div>

                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE3FF] border border-[#6D28D9]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6D28D9] animate-pulse" />
                  <span className="text-[#35115F] font-mono text-[10px] font-bold uppercase tracking-wider">LIVE RECORD</span>
                </div>
              </div>

              {/* Dynamic Audio Waveform */}
              <div className="mb-5 p-4 rounded-2xl bg-[#FFF8E8] border border-[#6D28D9]/10">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#5C4E4E] mb-3">
                  <span>AUDIO SPECTRUM // 48kHz</span>
                  <span className="text-[#6D28D9] font-bold">ANALYZING...</span>
                </div>
                <div className="flex items-end gap-1.5 h-14">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: [
                          `${25 + Math.random() * 65}%`,
                          `${25 + Math.random() * 65}%`,
                          `${25 + Math.random() * 65}%`,
                        ],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.04,
                        ease: "easeInOut",
                      }}
                      className="flex-1 rounded-full bg-gradient-to-t from-[#6D28D9] to-[#7C3AED]"
                    />
                  ))}
                </div>
              </div>

              {/* Live Slide Generation Progress */}
              <div className="space-y-2.5">
                <div className="flex justify-between text-xs font-mono text-[#5C4E4E]">
                  <span>GENERATING DECK...</span>
                  <span className="text-[#35115F] font-bold">84% COMPLETE</span>
                </div>
                <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden p-0.5 border border-[#6D28D9]/10">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "84%" }}
                    transition={{ duration: 2, delay: 0.4, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-[#6D28D9] to-[#7C3AED]"
                  />
                </div>

                {/* Generated Slide Preview Items */}
                <div className="space-y-2 pt-2">
                  {[
                    "01 // EXECUTIVE SUMMARY & METRICS",
                    "02 // MARKET STRATEGY & ROADMAP",
                    "03 // FINANCIAL PROJECTIONS 2025",
                  ].map((title, idx) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.15 }}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-white border border-[#6D28D9]/10 hover:border-[#7C3AED]/40 transition-colors shadow-sm"
                    >
                      <span className="text-xs font-mono text-[#211A1A] font-medium">{title}</span>
                      <span className="text-[10px] font-mono text-[#6D28D9] font-bold bg-[#EDE3FF] px-2.5 py-0.5 rounded-full">READY</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating Soft Peach Accent Pill Badge 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-5 -left-5 bg-[#FFFDF7] backdrop-blur-xl border border-[#6D28D9]/15 rounded-2xl p-3.5 shadow-xl flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-[#F7D9C4] flex items-center justify-center text-[#35115F] shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#5C4E4E] uppercase">AI SYNTHESIS</div>
                <div className="font-display font-bold text-xs text-[#35115F]">6 SLIDES READY </div>
              </div>
            </motion.div>

            {/* Floating Violet Badge 2 */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="absolute -top-4 -right-4 bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] rounded-full px-4 py-2 shadow-lg flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-white" />
              <span className="text-xs font-display font-bold text-white uppercase tracking-wider">PPTX & PDF</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
