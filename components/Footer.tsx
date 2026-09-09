"use client";

import { motion } from "framer-motion";
import { Mic2, Code2, Share2, Briefcase, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Demo", href: "#demo" },
    { label: "Changelog", href: "#" },
  ],
  Developers: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "GitHub", href: "https://github.com" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "GDPR", href: "#" },
  ],
};

const socialLinks = [
  { icon: Code2, href: "https://github.com", label: "GitHub" },
  { icon: Share2, href: "#", label: "Twitter" },
  { icon: Briefcase, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "#", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-[#6D28D9]/10 bg-[#FFF8E8]">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6D28D9]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-2xl bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] flex items-center justify-center shadow-md shadow-[#6D28D9]/20">
                <Mic2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-[#211A1A] font-bold text-lg">
                VoiceDeck{" "}
                <span className="bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] bg-clip-text text-transparent">
                  AI
                </span>
              </span>
            </Link>
            <p className="text-[#5C4E4E] text-sm leading-relaxed mb-6 max-w-xs font-medium">
              Turn meetings into beautiful presentations in seconds. Powered by advanced voice processing
              and enterprise cloud technology.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-[#FFFDF7] border border-[#6D28D9]/10 hover:border-[#6D28D9]/30 hover:bg-[#EDE3FF] flex items-center justify-center text-[#5C4E4E] hover:text-[#6D28D9] transition-all shadow-sm"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-[#35115F] font-bold text-sm mb-4">{category}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[#5C4E4E] hover:text-[#6D28D9] text-sm font-medium transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      {link.href.startsWith("https") && (
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-[#6D28D9]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#6E5D5D] text-sm font-medium">
            © 2024 VoiceDeck AI. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-[#6E5D5D] text-sm font-medium">
            <span>Powered by</span>
            <span className="text-[#6D28D9] font-bold">Advanced AI</span>
            <span>&</span>
            <span className="text-[#7C3AED] font-bold">Cloud Infrastructure</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
