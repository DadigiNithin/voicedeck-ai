"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic2,
  Menu,
  X,
  Github,
  Zap,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Demo", href: "#demo" },
  { label: "Workflow", href: "#workflow" },
  { label: "Pricing", href: "#pricing" },
  { label: "GitHub", href: "https://github.com", icon: Github },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
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
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5 flex items-center gap-1.5"
                >
                  {link.icon && <link.icon className="w-3.5 h-3.5" />}
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <button className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors">
                Login
              </button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-500/25 transition-all flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5" />
                Get Started
                <ChevronRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-300 hover:text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
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
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.label}
                </a>
              ))}
              <div className="pt-3 pb-1 border-t border-white/10 flex flex-col gap-2">
                <button className="w-full px-4 py-2.5 text-gray-300 hover:text-white text-left rounded-lg hover:bg-white/5 transition-colors">
                  Login
                </button>
                <button className="w-full px-4 py-2.5 font-semibold text-white rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4" />
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
