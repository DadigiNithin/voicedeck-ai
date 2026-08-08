"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, ArrowRight, Zap, Lock, Globe, Code2, Wallet } from "lucide-react";
import X402PaymentModal from "./X402PaymentModal";

const architectureSteps = [
  {
    icon: "🎤",
    label: "Client App",
    description: "Sends API request",
    color: "border-purple-500/40 bg-purple-500/10",
  },
  {
    icon: "🔒",
    label: "x402 Gateway",
    description: "HTTP 402 challenge",
    color: "border-blue-500/40 bg-blue-500/10",
  },
  {
    icon: "⛓️",
    label: "Algorand",
    description: "0.1 ALGO payment",
    color: "border-indigo-500/40 bg-indigo-500/10",
  },
  {
    icon: "🤖",
    label: "Gemini Engine",
    description: "Generates slides",
    color: "border-cyan-500/40 bg-cyan-500/10",
  },
  {
    icon: "✅",
    label: "Response",
    description: "Slides delivered",
    color: "border-green-500/40 bg-green-500/10",
  },
];

const benefits = [
  {
    icon: Lock,
    title: "HTTP 402 Protocol",
    description: "Standardized payment-required header protects generation endpoints from unauthorized access.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: Globe,
    title: "Algorand Blockchain",
    description: "Decentralized, transparent micropayments with 4-second finality and 0.001 ALGO fees.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Zap,
    title: "Pay-per-Use Billing",
    description: "Only pay for what you generate. No forced monthly subscriptions for API developers.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  {
    icon: Shield,
    title: "On-Chain Verification",
    description: "Every request is verified against the Algorand Node Indexer before computation begins.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
];

export default function X402Section() {
  const [modalOpen, setModalOpen] = useState(false);
  const [lastTxId, setLastTxId] = useState<string | null>(null);

  return (
    <section id="x402" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.08),transparent_60%)] pointer-events-none" />

      {/* Modal */}
      <X402PaymentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onPaymentSuccess={(txId) => setLastTxId(txId)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-medium mb-6">
            <Shield className="w-3.5 h-3.5" />
            x402 + Algorand Integration
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Protected by{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              x402 Algorand Protocol
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            VoiceDeck AI protects generation endpoints using HTTP 402 Payment Required — powered by Algorand blockchain micropayments for pay-per-use authorization.
          </p>

          {/* Interactive Demo Button */}
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(59,130,246,0.4)" }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setModalOpen(true)}
            className="px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-xl shadow-blue-500/25 inline-flex items-center gap-2 text-sm transition-all"
          >
            <Wallet className="w-4 h-4" />
            Test x402 Algorand Payment Challenge
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          {lastTxId && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/30 text-green-300 text-xs font-mono">
              ✓ Verified TxID: {lastTxId}
            </div>
          )}
        </motion.div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-10">
            <div className="flex items-center gap-2 mb-8">
              <Code2 className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm font-medium">x402 Algorand Sequence Architecture</span>
            </div>

            {/* Flow */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-2">
              {architectureSteps.map((step, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-center gap-2 sm:gap-2 flex-1">
                  {/* Card */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`flex-shrink-0 border ${step.color} rounded-xl p-4 text-center w-full sm:w-auto min-w-[110px] cursor-default`}
                  >
                    <div className="text-2xl mb-2">{step.icon}</div>
                    <div className="text-white font-semibold text-xs sm:text-sm">{step.label}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{step.description}</div>
                  </motion.div>

                  {/* Arrow */}
                  {index < architectureSteps.length - 1 && (
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="rotate-90 sm:rotate-0 text-gray-600 flex-shrink-0"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Code snippet */}
            <div className="mt-8 bg-black/40 rounded-xl border border-white/10 p-4 overflow-x-auto">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-gray-500 text-xs ml-2">x402 Algorand Protocol Challenge (HTTP 402)</span>
              </div>
              <pre className="text-xs sm:text-sm font-mono text-gray-300 whitespace-pre">
                <span className="text-blue-400">HTTP/1.1</span>{" "}
                <span className="text-yellow-400">402 Payment Required</span>{"\n"}
                <span className="text-purple-400">WWW-Authenticate:</span>{" "}
                <span className="text-gray-300">x402-algorand realm=&quot;VoiceDeck AI API&quot;</span>{"\n"}
                <span className="text-purple-400">X-Payment-Network:</span>{" "}
                <span className="text-green-400">algorand-testnet</span>{"\n\n"}
                <span className="text-gray-500">{"{"}</span>{"\n"}
                {"  "}<span className="text-blue-300">&quot;status&quot;</span><span className="text-gray-500">:</span> <span className="text-yellow-300">402</span><span className="text-gray-500">,</span>{"\n"}
                {"  "}<span className="text-blue-300">&quot;error&quot;</span><span className="text-gray-500">:</span> <span className="text-orange-300">&quot;Payment Required&quot;</span><span className="text-gray-500">,</span>{"\n"}
                {"  "}<span className="text-blue-300">&quot;x402&quot;</span><span className="text-gray-500">:</span> <span className="text-gray-500">{"{"}</span>{"\n"}
                {"    "}<span className="text-blue-300">&quot;protocol&quot;</span><span className="text-gray-500">:</span> <span className="text-orange-300">&quot;x402-algorand&quot;</span><span className="text-gray-500">,</span>{"\n"}
                {"    "}<span className="text-blue-300">&quot;amount_algo&quot;</span><span className="text-gray-500">:</span> <span className="text-green-300">0.1</span><span className="text-gray-500">,</span>{"\n"}
                {"    "}<span className="text-blue-300">&quot;recipient&quot;</span><span className="text-gray-500">:</span> <span className="text-orange-300">&quot;ALGO...TREASURY_ADDRESS&quot;</span>{"\n"}
                {"  "}<span className="text-gray-500">{"}"}</span>{"\n"}
                <span className="text-gray-500">{"}"}</span>
              </pre>
            </div>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-2xl p-5 transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-xl ${benefit.bg} flex items-center justify-center mb-4`}>
                <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
              </div>
              <h3 className="text-white font-semibold text-sm mb-2">{benefit.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
