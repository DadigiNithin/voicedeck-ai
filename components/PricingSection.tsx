"use client";

import { motion } from "framer-motion";
import { Check, Zap, Star, Crown } from "lucide-react";
import { pricingPlans } from "@/data/mockData";

const planIcons = { free: Star, basic: Zap, pro: Crown };

function scrollToDemo() {
  document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
}

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.08),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-6">
            <Zap className="w-3.5 h-3.5" />
            Simple Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Plan
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Start free, upgrade when you need more power. All plans include instant AI slide generation.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {pricingPlans.map((plan, index) => {
            const Icon = planIcons[plan.id as keyof typeof planIcons] ?? Zap;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-gradient-to-b from-purple-600/20 to-blue-600/20 border-2 border-purple-500/60 shadow-2xl shadow-purple-500/20"
                    : "bg-white/[0.03] border border-white/10 hover:border-white/20"
                }`}
              >
                {/* Popular badge */}
                {plan.badge && (
                  <div className={`absolute top-0 left-0 right-0 text-center py-1.5 text-xs font-semibold ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "bg-white/10 text-gray-300"
                  }`}>
                    {plan.badge}
                  </div>
                )}

                <div className={`flex-1 flex flex-col p-7 ${plan.badge ? "pt-10" : ""}`}>
                  {/* Plan Icon & Name */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      plan.highlighted
                        ? "bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg shadow-purple-500/30"
                        : "bg-white/10"
                    }`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-white font-bold text-xl">{plan.name}</h3>
                  </div>

                  {/* Price */}
                  <div className="mb-3">
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-extrabold text-white">
                        {plan.price}
                      </span>
                      <span className="text-gray-400 mb-1 text-sm">/{plan.period}</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">{plan.description}</p>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/10 my-5" />

                  {/* Features */}
                  <ul className="space-y-3 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          plan.highlighted ? "bg-purple-500/30" : "bg-white/10"
                        }`}>
                          <Check className={`w-2.5 h-2.5 ${plan.highlighted ? "text-purple-300" : "text-gray-400"}`} />
                        </div>
                        <span className={plan.highlighted ? "text-gray-200" : "text-gray-400"}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={scrollToDemo}
                    className={`mt-8 w-full py-3.5 rounded-xl font-semibold text-sm transition-all ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-xl shadow-purple-500/20"
                        : "border border-white/20 hover:border-white/40 text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {plan.cta}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Security Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-purple-500/30 bg-purple-500/10 text-gray-400 text-sm">
            <span className="text-purple-400">🔒</span>
            All AI Generation APIs are protected with{" "}
            <span className="text-purple-300 font-semibold">secure end-to-end encryption</span>.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
