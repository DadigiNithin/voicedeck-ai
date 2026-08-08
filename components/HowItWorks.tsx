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
    <section id="workflow" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-medium mb-6">
            <ArrowDown className="w-3.5 h-3.5" />
            Simple 3-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            How It{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            From raw voice to polished slides in under 30 seconds. No design skills needed.
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
                className="group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 rounded-2xl p-6 sm:p-8 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-6"
              >
                {/* Step Number */}
                <div className="flex-shrink-0">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 text-sm font-bold">
                      {step.id}
                    </div>
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl ${step.shadowColor} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <step.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg sm:text-xl mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-3">
                    {step.description}
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs font-medium text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
                    ✓ {step.detail}
                  </div>
                </div>

                {/* Step indicator glow */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none`}
                />
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
                    <div className="w-px h-6 bg-gradient-to-b from-purple-500/60 to-transparent" />
                    <ArrowDown className="w-4 h-4 text-purple-400" />
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
