"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic2,
  Menu,
  X,
  Zap,
  ChevronRight,
  LogIn,
} from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Demo", href: "#demo" },
  { label: "Workflow", href: "#workflow" },
];

function scrollTo(id: string) {
  document.getElementById(id.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-[#FFF8E8]/90 backdrop-blur-xl border-b border-[#6D28D9]/10 shadow-sm"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Badge */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] flex items-center justify-center shadow-md shadow-[#6D28D9]/20 group-hover:scale-105 transition-transform">
                <Mic2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-lg tracking-wider uppercase text-[#211A1A] flex items-center gap-1.5">
                  VOICEDECK


                </span>
                <span className="text-[9px] font-mono tracking-widest text-[#5C4E4E] uppercase -mt-1">
                  SPEECH TO PRESENTATION
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFDF7] backdrop-blur-md shadow-sm border border-[#6D28D9]/10">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href, link.external)}
                  className="px-4 py-1.5 text-xs font-display font-bold uppercase tracking-wider text-[#5C4E4E] hover:text-[#6D28D9] transition-all rounded-full hover:bg-[#EDE3FF]/60 flex items-center gap-1.5 cursor-pointer"
                >
                  {link.icon && <link.icon className="w-3.5 h-3.5" />}
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setShowLoginModal(true)}
                className="px-4 py-2 text-xs font-display font-bold uppercase tracking-wider text-[#211A1A] hover:text-[#6D28D9] rounded-full bg-white/80 hover:bg-white shadow-sm transition-all flex items-center gap-1.5 cursor-pointer border border-[#6D28D9]/10"
              >
                <LogIn className="w-3.5 h-3.5" />
                LOG IN
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 0 25px rgba(109,40,217,0.3)" }}
                whileTap={{ scale: 0.96 }}
                onClick={handleGetStarted}
                className="px-5 py-2 text-xs font-display font-bold uppercase tracking-wider text-white rounded-full bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] hover:from-[#5B21B6] hover:to-[#6D28D9] shadow-md shadow-[#6D28D9]/25 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                CREATE DECK
                <ChevronRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="md:hidden text-[#211A1A] hover:text-[#6D28D9] p-2 rounded-xl hover:bg-black/5 transition-colors"
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
            className="fixed inset-x-0 top-16 z-40 bg-[#FFF8E8]/95 backdrop-blur-xl border-b border-[#6D28D9]/10 md:hidden shadow-xl"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href, link.external)}
                  className="w-full flex items-center gap-2 px-4 py-3 text-[#5C4E4E] hover:text-[#6D28D9] hover:bg-[#EDE3FF]/40 rounded-xl transition-colors text-left font-medium"
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.label}
                  {link.external && (
                    <ExternalLink className="w-3 h-3 ml-auto text-[#6E5D5D]" />
                  )}
                </button>
              ))}
              <div className="pt-3 pb-1 border-t border-[#6D28D9]/10 flex flex-col gap-2">
                <button
                  onClick={() => { setShowLoginModal(true); setMobileOpen(false); }}
                  className="w-full px-4 py-2.5 text-[#211A1A] hover:text-[#6D28D9] text-left rounded-xl hover:bg-black/5 transition-colors flex items-center gap-2 font-medium"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
                <button
                  onClick={handleGetStarted}
                  className="w-full px-4 py-2.5 font-semibold text-white rounded-full bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] flex items-center justify-center gap-2"
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
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-[#FFFDF7] border border-[#6D28D9]/15 rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Gradient top bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#6D28D9] to-[#7C3AED]" />

              <div className="p-7">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6D28D9] to-[#7C3AED] flex items-center justify-center">
                      <Mic2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[#211A1A] font-bold">VoiceDeck AI</span>
                  </div>
                  <button
                    onClick={() => setShowLoginModal(false)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#6E5D5D] hover:text-[#211A1A] hover:bg-black/5 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <h2 className="text-2xl font-bold text-[#211A1A] mb-1">Welcome back</h2>
                <p className="text-[#5C4E4E] text-sm mb-6">
                  Sign in to access your slide decks
                </p>

                {/* Form */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-[#5C4E4E] block mb-1.5 font-medium">Email</label>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-[#6D28D9]/15 focus:border-[#6D28D9] text-[#211A1A] placeholder-[#9E8B8B] text-sm outline-none transition-colors shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-[#5C4E4E] block mb-1.5 font-medium">Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-[#6D28D9]/15 focus:border-[#6D28D9] text-[#211A1A] placeholder-[#9E8B8B] text-sm outline-none transition-colors shadow-sm"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowLoginModal(false)}
                    className="w-full py-3 rounded-full font-bold text-white bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] hover:from-[#5B21B6] hover:to-[#6D28D9] shadow-lg shadow-[#6D28D9]/20 transition-all cursor-pointer"
                  >
                    Sign In
                  </motion.button>
                  <div className="text-center">
                    <span className="text-[#5C4E4E] text-sm">Don&apos;t have an account? </span>
                    <button className="text-[#6D28D9] hover:text-[#5B21B6] text-sm font-bold transition-colors cursor-pointer">
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
