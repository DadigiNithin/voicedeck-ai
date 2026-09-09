"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mic,
  FileText,
  Sparkles,
  Palette,
  Zap,
  BarChart3,
  Download,
  Shield,
} from "lucide-react";
import { features } from "@/data/mockData";

const iconMap: Record<string, React.ElementType> = {
  Mic,
  FileText,
  Sparkles,
  Palette,
  Zap,
  BarChart3,
  Download,
  Shield,
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-[#FFF8E8]">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(109,40,217,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EDE3FF] text-[#6D28D9] text-xs font-mono font-bold uppercase tracking-widest mb-4 shadow-sm border border-[#6D28D9]/10">
            <Sparkles className="w-3.5 h-3.5" />
            FEATURES
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-[#211A1A] mb-4 uppercase tracking-tight">
            POWERFUL FEATURES FOR{" "}
            <span className="bg-gradient-to-r from-[#35115F] via-[#6D28D9] to-[#7C3AED] bg-clip-text text-transparent">EVERY WORKFLOW</span>
          </h2>
          <p className="text-[#5C4E4E] text-base sm:text-lg max-w-2xl mx-auto font-medium">
            From raw audio to executive presentations — VoiceDeck AI powers every stage
            with state-of-the-art intelligence.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] ?? Zap;
            const indexStr = String(index + 1).padStart(2, "0");
            return (
              <motion.div
                key={feature.id}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative bg-[#FFFDF7] backdrop-blur-xl border border-[#6D28D9]/10 hover:border-[#7C3AED]/40 rounded-3xl p-7 cursor-default transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-[#6D28D9]/12 overflow-hidden"
              >
                {/* Icon & Index badge top right */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] flex items-center justify-center shadow-md shadow-[#6D28D9]/20 group-hover:scale-105 transition-transform duration-300"
                  >
                    <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                  </div>
                  <span className="font-mono text-xs font-bold text-[#35115F] bg-[#EDE3FF] px-2.5 py-1 rounded-full border border-[#6D28D9]/10">
                    {indexStr}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-display font-bold text-[#35115F] text-lg mb-2 uppercase tracking-wide group-hover:text-[#6D28D9] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[#5C4E4E] text-xs sm:text-sm leading-relaxed font-sans font-medium">
                  {feature.description}
                </p>

                {/* Accent bar on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
