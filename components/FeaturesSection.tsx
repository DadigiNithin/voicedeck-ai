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
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Everything You Need
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Powerful Features for{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Every Workflow
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From raw audio to polished presentation — VoiceDeck AI handles every step
            with cutting-edge intelligence and blockchain-secured payments.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {features.map((feature) => {
            const Icon = iconMap[feature.icon] ?? Zap;
            return (
              <motion.div
                key={feature.id}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-sm border border-white/10 hover:border-purple-500/40 rounded-2xl p-6 cursor-default transition-all duration-300"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon */}
                <div
                  className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="text-white font-semibold text-base mb-2 group-hover:text-purple-200 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Subtle corner decoration */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/5 to-blue-500/5 group-hover:from-purple-500/20 group-hover:to-blue-500/20 transition-all duration-300" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
