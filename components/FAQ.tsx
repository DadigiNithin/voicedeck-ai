"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqs } from "@/data/mockData";

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section className="py-24 relative bg-[#FFF8E8]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(109,40,217,0.06),transparent_60%)] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EDE3FF] text-[#35115F] text-xs font-mono font-bold uppercase tracking-widest mb-4 shadow-sm border border-[#6D28D9]/10">
            <HelpCircle className="w-3.5 h-3.5 text-[#6D28D9]" />
            SUPPORT & FAQ // GOT QUESTIONS?
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#211A1A] mb-4 tracking-tight">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-[#35115F] via-[#6D28D9] to-[#7C3AED] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-[#5C4E4E] text-lg font-medium">
            Everything you need to know about VoiceDeck AI.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              className="bg-[#FFFDF7] border border-[#6D28D9]/10 rounded-3xl overflow-hidden hover:border-[#7C3AED]/30 transition-colors shadow-sm"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
              >
                <span className="text-[#35115F] font-bold text-sm sm:text-base leading-relaxed">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex-shrink-0 w-7 h-7 rounded-full bg-[#EDE3FF] flex items-center justify-center text-[#6D28D9]"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-5 pt-1 border-t border-[#6D28D9]/10">
                      <p className="text-[#5C4E4E] text-sm leading-relaxed font-medium">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-[#5C4E4E] text-sm mb-4 font-medium">
            Still have questions?
          </p>
          <button
            onClick={() => window.location.href = "mailto:support@voicedeck.ai"}
            className="px-6 py-3 rounded-full border border-[#6D28D9]/20 hover:border-[#6D28D9]/40 text-[#6D28D9] hover:text-[#5B21B6] text-xs font-bold uppercase tracking-wider transition-all bg-white hover:bg-[#EDE3FF]/50 shadow-sm cursor-pointer"
          >
            Contact Support →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
