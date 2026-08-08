"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic2,
  Menu,
  X,
  ExternalLink,
  Zap,
  ChevronRight,
  LogIn,
  Wallet,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useWallet, WalletId } from "@txnlab/use-wallet-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Demo", href: "#demo" },
  { label: "Workflow", href: "#workflow" },
  { label: "x402 Protocol", href: "#x402" },
  { label: "Pricing", href: "#pricing" },
  { label: "GitHub", href: "https://github.com", icon: ExternalLink, external: true },
];

function scrollTo(id: string) {
  document.getElementById(id.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { wallets, activeAddress } = useWallet();
  const peraWallet = wallets.find((w) => w.id === WalletId.PERA);

  const handleConnectPera = async () => {
    try {
      if (peraWallet) {
        await peraWallet.connect();
      }
    } catch (err: any) {
      if (
        err?.message?.includes("closed by user") ||
        err?.message?.includes("modal is closed") ||
        err?.name === "PeraWalletConnectError"
      ) {
        console.log("[PeraWallet] Connect modal closed by user.");
        return;
      }
      console.error("Failed to connect Pera wallet:", err);
    }
  };

  const handleDisconnectPera = async () => {
    try {
      if (peraWallet) {
        await peraWallet.disconnect();
      }
    } catch (err) {
      console.error("Failed to disconnect Pera wallet:", err);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string, external?: boolean) => {
    setMobileOpen(false);
    if (external) {
      window.open(href, "_blank", "noopener");
      return;
    }
    if (href.startsWith("#")) {
      scrollTo(href);
    }
  };

  const handleGetStarted = () => {
    setMobileOpen(false);
    scrollTo("demo");
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-purple-500/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-shadow">
                <Mic2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                VoiceDeck{" "}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  AI
                </span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href, link.external)}
                  className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5 flex items-center gap-1.5 cursor-pointer"
                >
                  {link.icon && <link.icon className="w-3.5 h-3.5" />}
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {activeAddress ? (
                <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-xl px-3 py-1.5 text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-gray-300 font-semibold">Pera Wallet:</span>
                  <span className="text-purple-300 font-bold">
                    {activeAddress.substring(0, 4)}...{activeAddress.substring(activeAddress.length - 4)}
                  </span>
                  <button
                    onClick={handleDisconnectPera}
                    title="Disconnect Wallet"
                    className="ml-1 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleConnectPera}
                  className="px-3.5 py-2 text-xs font-semibold text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Wallet className="w-3.5 h-3.5 text-purple-400" />
                  Connect Pera Wallet
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowLoginModal(true)}
                className="px-3.5 py-2 text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 rounded-lg hover:bg-white/5 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleGetStarted}
                className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-500/25 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                Get Started
                <ChevronRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="md:hidden text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-black/90 backdrop-blur-xl border-b border-white/10 md:hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href, link.external)}
                  className="w-full flex items-center gap-2 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left"
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.label}
                  {link.external && (
                    <ExternalLink className="w-3 h-3 ml-auto text-gray-600" />
                  )}
                </button>
              ))}
              <div className="pt-3 pb-1 border-t border-white/10 flex flex-col gap-2">
                <button
                  onClick={() => { setShowLoginModal(true); setMobileOpen(false); }}
                  className="w-full px-4 py-2.5 text-gray-300 hover:text-white text-left rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
                <button
                  onClick={handleGetStarted}
                  className="w-full px-4 py-2.5 font-semibold text-white rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            onClick={() => setShowLoginModal(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-[#0f0f1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Gradient top bar */}
              <div className="h-1 w-full bg-gradient-to-r from-purple-600 to-blue-600" />

              <div className="p-7">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                      <Mic2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-bold">VoiceDeck AI</span>
                  </div>
                  <button
                    onClick={() => setShowLoginModal(false)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <h2 className="text-2xl font-bold text-white mb-1">Welcome back</h2>
                <p className="text-gray-400 text-sm mb-6">
                  Sign in to access your slide decks
                </p>

                {/* Form */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 block mb-1.5">Email</label>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/60 text-white placeholder-gray-600 text-sm outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-1.5">Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/60 text-white placeholder-gray-600 text-sm outline-none transition-colors"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowLoginModal(false)}
                    className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-500/20 transition-all"
                  >
                    Sign In
                  </motion.button>
                  <div className="text-center">
                    <span className="text-gray-500 text-sm">Don&apos;t have an account? </span>
                    <button className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
                      Sign Up Free
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
