"use client";

import { motion } from "framer-motion";
import { Mic, Play, ArrowRight, Sparkles, Zap } from "lucide-react";

const floatingAnimate = {
  y: [-8, 8, -8],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

const orbAnimate = {
  scale: [1, 1.2, 1],
  opacity: [0.3, 0.6, 0.3],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

export default function Hero() {
  const scrollToDemo = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary glow */}
        <motion.div
          animate={orbAnimate}
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-3xl"
        />
        <motion.div
          animate={orbAnimate}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-blue-600/15 to-violet-600/15 blur-3xl"
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col lg:flex-row items-center gap-16">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6"
          >
            Convert Meetings into{" "}
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
              Presentation Slides
            </span>{" "}
            using AI
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-10"
          >
            Upload an audio recording or paste a transcript and instantly
            generate an{" "}
            <span className="text-white font-medium">investor-ready presentation</span>.
            Powered by advanced speech-to-text & slide synthesis.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(139,92,246,0.4)" }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToDemo}
              className="px-8 py-4 font-bold text-white rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-2xl shadow-purple-500/30 transition-all flex items-center justify-center gap-2 text-base"
            >
              <Zap className="w-5 h-5" />
              Generate Slides
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToDemo}
              className="px-8 py-4 font-semibold text-white rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all flex items-center justify-center gap-2 text-base"
            >
              <Play className="w-4 h-4 fill-current" />
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-8 justify-center lg:justify-start mt-12"
          >
            {[
              { label: "Slides Generated", value: "50K+" },
              { label: "Time Saved", value: "200hrs+" },
              { label: "Accuracy Rate", value: "95%" },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Illustration */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-lg"
          >
            {/* Main card */}
            <motion.div
              animate={floatingAnimate}
              className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <Mic className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">VoiceDeck AI</div>
                  <div className="text-gray-400 text-xs">Processing audio...</div>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-xs font-medium">Live</span>
                </div>
              </div>

              {/* Waveform visualization */}
              <div className="flex items-end gap-1 h-12 mb-5">
                {Array.from({ length: 32 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: [
                        `${20 + Math.random() * 60}%`,
                        `${20 + Math.random() * 60}%`,
                        `${20 + Math.random() * 60}%`,
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.05,
                      ease: "easeInOut",
                    }}
                    className="flex-1 rounded-full bg-gradient-to-t from-purple-600 to-blue-400 opacity-80"
                  />
                ))}
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                  <span>Analyzing...</span>
                  <span>78%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "78%" }}
                    transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                  />
                </div>
              </div>

              {/* Generated slides preview */}
              <div className="space-y-2">
                {[
                  "Q3 Business Review",
                  "Revenue Growth +34%",
                  "Hiring Plan 2024",
                ].map((title, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.2 }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                    <span className="text-sm text-gray-200 font-medium">{title}</span>
                    <div className="ml-auto">
                      <div className="w-12 h-1 rounded-full bg-gradient-to-r from-purple-500/40 to-blue-500/40" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-2.5 shadow-xl"
            >
              <div className="text-xs text-gray-400">Slides Generated</div>
              <div className="text-lg font-bold text-white">6 Slides ✨</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl px-3 py-2 shadow-xl"
            >
              <div className="text-xs text-white/80">Smart & Fast</div>
              <div className="text-sm font-bold text-white flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Fast & Secure
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-gray-500 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-4 h-7 rounded-full border-2 border-gray-600 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
