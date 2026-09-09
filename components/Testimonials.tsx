"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/mockData";

export default function Testimonials() {
  return (
    <section className="py-24 relative bg-[#FFF8E8]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(109,40,217,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EDE3FF] text-[#35115F] text-xs font-mono font-bold uppercase tracking-widest mb-4 shadow-sm border border-[#6D28D9]/10">
            <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
            USER REVIEWS // TESTIMONIALS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#211A1A] mb-4 tracking-tight">
            Loved by{" "}
            <span className="bg-gradient-to-r from-[#35115F] via-[#6D28D9] to-[#7C3AED] bg-clip-text text-transparent">
              Teams Worldwide
            </span>
          </h2>
          <p className="text-[#5C4E4E] text-lg font-medium">
            See what our users say about VoiceDeck AI.
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="relative bg-[#FFFDF7] border border-[#6D28D9]/10 hover:border-[#7C3AED]/30 rounded-3xl p-7 transition-all duration-300 flex flex-col shadow-md hover:shadow-xl hover:shadow-[#6D28D9]/12"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-[#6D28D9]/30 mb-4 flex-shrink-0" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-500 fill-current" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-[#211A1A] text-sm leading-relaxed flex-1 mb-6 italic font-medium">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#6D28D9]/10">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-[#35115F] font-bold text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-[#5C4E4E] text-xs font-medium">
                    {testimonial.role} @ {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
