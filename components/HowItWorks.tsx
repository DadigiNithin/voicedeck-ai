"use client";

import { motion } from "framer-motion";
import { Upload, Brain, Presentation, ArrowDown } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: Upload,
    title: "Upload Audio or Paste Transcript",
    description:
      "Upload any audio file (MP3, WAV, MP4) or paste your meeting transcript directly into the editor.",
    color: "from-purple-500 to-violet-600",
    shadowColor: "shadow-purple-500/30",
    detail: "Supports Zoom, Google Meet, Teams transcripts",
  },
  {
    id: 2,
    icon: Brain,
    title: "Transcribes + Summarizes",
    description:
      "Our pipeline converts speech to text, then summarizes key topics, extracts action items, and structures your content intelligently.",
    color: "from-blue-500 to-indigo-600",
    shadowColor: "shadow-blue-500/30",
    detail: "95%+ accuracy, 20+ languages supported",
  },
  {
    id: 3,
    icon: Presentation,
    title: "Generate Beautiful Slides",
    description:
      "Receive a fully structured, visually stunning presentation with relevant themes, bullet points, and exportable as PPTX or PDF.",
    color: "from-cyan-500 to-blue-600",
    shadowColor: "shadow-cyan-500/30",
    detail: "Export to PPTX, PDF, or share link",
  },
];

export default function HowItWorks() {
  return (
    <section id="workflow" className="py-24 relative bg-[#FFF8E8]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(109,40,217,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EDE3FF] text-[#6D28D9] text-xs font-mono font-bold uppercase tracking-widest mb-4 shadow-sm border border-[#6D28D9]/10">
            <ArrowDown className="w-3.5 h-3.5" />
            WORKFLOW // 3-STEP PIPELINE
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-[#211A1A] mb-4 uppercase tracking-tight">
            HOW IT <span className="bg-gradient-to-r from-[#35115F] via-[#6D28D9] to-[#7C3AED] bg-clip-text text-transparent">WORKS</span>
          </h2>
          <p className="text-[#5C4E4E] text-base sm:text-lg max-w-xl mx-auto font-sans font-medium">
            From raw voice or transcript to polished executive slides in seconds.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={step.id}>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className="group relative bg-[#FFFDF7] backdrop-blur-xl border border-[#6D28D9]/10 hover:border-[#7C3AED]/40 rounded-3xl p-7 sm:p-8 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-md hover:shadow-xl hover:shadow-[#6D28D9]/12"
              >
                {/* Step Number Badge */}
                <div className="flex-shrink-0">
                  <div className="flex items-center gap-4">
                    <div className="font-mono text-xs font-bold text-[#35115F] px-3.5 py-1.5 rounded-full bg-[#EDE3FF] border border-[#6D28D9]/10">
                      STEP 0{step.id}
                    </div>
                    <div
                      className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] flex items-center justify-center shadow-lg shadow-[#6D28D9]/25 group-hover:scale-105 transition-transform duration-300"
                    >
                      <step.icon className="w-7 h-7 text-white" strokeWidth={1.75} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-display font-bold text-[#35115F] text-xl mb-2 uppercase tracking-wide group-hover:text-[#6D28D9] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[#5C4E4E] text-sm sm:text-base leading-relaxed mb-3 font-sans font-medium">
                    {step.description}
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#35115F] bg-[#EDE3FF] px-3.5 py-1 rounded-full border border-[#6D28D9]/10">
                    ✓ {step.detail}
                  </div>
                </div>
              </motion.div>

              {/* Animated Arrow */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex justify-center my-3"
                >
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="w-px h-6 bg-gradient-to-b from-[#6D28D9]/40 to-transparent" />
                    <ArrowDown className="w-4 h-4 text-[#6D28D9]" />
                  </motion.div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
