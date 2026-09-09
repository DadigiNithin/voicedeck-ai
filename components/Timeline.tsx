"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { timelineSteps } from "@/data/mockData";
import { ArrowRight } from "lucide-react";

export default function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 relative overflow-hidden bg-[#FFF8E8]">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(109,40,217,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EDE3FF] text-[#35115F] text-xs font-mono font-bold uppercase tracking-widest mb-4 shadow-sm border border-[#6D28D9]/10">
            <ArrowRight className="w-3.5 h-3.5 text-[#6D28D9]" />
            PROCESSING PIPELINE // 6 STAGES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#211A1A] mb-4 tracking-tight">
            The VoiceDeck{" "}
            <span className="bg-gradient-to-r from-[#35115F] via-[#6D28D9] to-[#7C3AED] bg-clip-text text-transparent">
              Workflow
            </span>
          </h2>
          <p className="text-[#5C4E4E] text-lg max-w-xl mx-auto font-medium">
            Six intelligent stages transform your voice into a professional presentation.
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div ref={ref} className="hidden lg:block">
          {/* Progress line */}
          <div className="relative mb-8">
            <div className="absolute top-10 left-0 right-0 h-px bg-[#6D28D9]/15" />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              style={{ transformOrigin: "left" }}
              className="absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-[#35115F] via-[#6D28D9] to-[#7C3AED]"
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
                    className="w-20 h-20 rounded-3xl bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] flex items-center justify-center text-3xl shadow-lg shadow-[#6D28D9]/25 cursor-default mb-4 relative z-10 text-white"
                  >
                    {step.icon}
                  </motion.div>

                  {/* Step Number */}
                  <div className="w-7 h-7 rounded-full bg-[#EDE3FF] text-[#35115F] text-xs font-bold flex items-center justify-center mb-3 shadow-sm border border-[#6D28D9]/15">
                    {step.id}
                  </div>

                  {/* Labels */}
                  <h3 className="text-[#211A1A] font-bold text-sm text-center mb-1">
                    {step.title}
                  </h3>
                  <p className="text-[#5C4E4E] text-xs text-center leading-relaxed font-medium">
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
                <div className="absolute left-6 top-14 w-px h-8 bg-[#6D28D9]/20" />
              )}

              <div
                className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] flex items-center justify-center text-xl flex-shrink-0 shadow-md text-white"
              >
                {step.icon}
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-[#211A1A] font-bold text-sm mb-1">{step.title}</h3>
                <p className="text-[#5C4E4E] text-xs leading-relaxed font-medium">
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
