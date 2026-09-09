"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, BookOpen } from "lucide-react";

function scrollToDemo() {
  document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
}

function scrollToPricing() {
  document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
}

export default function CTABanner() {
  return (
    <section className="py-20 relative overflow-hidden bg-[#FFF8E8]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF8E8] via-[#EDE3FF]/30 to-[#FFF8E8] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(109,40,217,0.08),transparent_70%)] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EDE3FF] text-[#35115F] text-xs font-mono font-bold uppercase tracking-widest mb-8 shadow-sm border border-[#6D28D9]/10">
            <Sparkles className="w-3.5 h-3.5 text-[#6D28D9]" />
            READY TO TRANSFORM YOUR MEETINGS?
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#211A1A] mb-6 leading-tight">
            Start Generating{" "}
            <span className="bg-gradient-to-r from-[#35115F] via-[#6D28D9] to-[#7C3AED] bg-clip-text text-transparent">
              Beautiful Slides
            </span>{" "}
            Today
          </h2>

          <p className="text-[#5C4E4E] text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Join thousands of professionals who save hours every week. No credit card
            required for your first 3 decks.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(109,40,217,0.35)" }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToDemo}
              className="px-8 py-4 font-bold text-white rounded-full bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] hover:from-[#35115F] hover:to-[#6D28D9] shadow-xl shadow-[#6D28D9]/25 flex items-center justify-center gap-2 text-base transition-all cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-[#EDE3FF]" />
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToPricing}
              className="px-8 py-4 font-semibold text-[#211A1A] hover:text-[#6D28D9] rounded-full border border-[#6D28D9]/15 bg-[#FFFDF7] hover:bg-white shadow-sm transition-all text-base flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              View Pricing Plans
            </motion.button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-[#5C4E4E] font-medium">
            {[
              "Free tier available",
              "No credit card required",
              "Enterprise API security",
              "Cancel anytime",
            ].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="text-[#6D28D9] font-bold">✓</span> {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
