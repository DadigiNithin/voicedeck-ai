"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { timelineSteps } from "@/data/mockData";
import { ArrowRight } from "lucide-react";

export default function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-6">
            <ArrowRight className="w-3.5 h-3.5" />
            Processing Pipeline
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            The VoiceDeck{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Workflow
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Six intelligent stages transform your voice into a professional presentation.
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div ref={ref} className="hidden lg:block">
          {/* Progress line */}
          <div className="relative mb-8">
            <div className="absolute top-10 left-0 right-0 h-px bg-white/10" />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              style={{ transformOrigin: "left" }}
              className="absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500"
            />

            {/* Steps */}
            <div className="grid grid-cols-6 gap-4 relative">
              {timelineSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                  className="flex flex-col items-center"
                >
                  {/* Icon circle */}
                  <motion.div
                    whileHover={{ scale: 1.15, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-3xl shadow-2xl cursor-default mb-4 relative z-10`}
                  >
                    {step.icon}
                    {/* Glow */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} blur-xl opacity-30`} />
                  </motion.div>

                  {/* Step Number */}
                  <div className="w-6 h-6 rounded-full bg-white/10 text-white text-xs font-bold flex items-center justify-center mb-3">
                    {step.id}
                  </div>

                  {/* Labels */}
                  <h3 className="text-white font-semibold text-sm text-center mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-xs text-center leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline — Vertical */}
        <div className="lg:hidden space-y-4">
          {timelineSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4 relative"
            >
              {/* Vertical connector */}
              {index < timelineSteps.length - 1 && (
                <div className="absolute left-6 top-14 w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
              )}

              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-xl flex-shrink-0 shadow-lg`}
              >
                {step.icon}
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-white font-semibold text-sm mb-1">{step.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
