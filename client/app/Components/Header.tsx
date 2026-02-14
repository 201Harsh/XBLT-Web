"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, Menu, X, ChevronRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Features", href: "/features" },
    { name: "The Engine", href: "/engine" },
    { name: "Web vs Desktop", href: "/#comparison" },
    { name: "Showcase", href: "/#showcase" },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/10 bg-black/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 group cursor-pointer relative z-50"
          >
            <div className="relative">
              <Zap className="w-6 h-6 text-[#E2F609] fill-[#E2F609] group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-[#E2F609] blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
            </div>
            <span className="font-bold text-xl tracking-tighter text-white">
              XBLT<span className="text-[#E2F609] ml-1">AI</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-[#E2F609] transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E2F609] transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex gap-4 items-center">
            <button className="text-sm font-semibold hover:text-white text-gray-400 transition-colors">
              Login
            </button>
            <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#E2F609] transition-colors flex items-center gap-2">
              Get Early Access <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden relative z-50 text-white hover:text-[#E2F609] transition-colors p-2"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-60 md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-[#050505] border-l border-white/10 z-70 md:hidden shadow-2xl flex flex-col"
            >
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-[#E2F609]/10 to-transparent pointer-events-none" />

              <div className="flex items-center justify-between p-6 border-b border-white/10 relative z-20">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#E2F609] fill-[#E2F609]" />
                  <span className="font-bold text-lg tracking-tighter">
                    XBLT.AI
                  </span>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#E2F609]/50 transition-all group"
                >
                  <X className="w-5 h-5 text-gray-400 group-hover:text-[#E2F609] transition-colors" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-2 relative z-10">
                <div className="text-xs font-mono text-gray-500 mb-4 uppercase tracking-widest">
                  Navigation
                </div>

                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between text-xl font-bold text-white py-4 border-b border-white/5 hover:text-[#E2F609] hover:pl-2 transition-all group"
                    >
                      {link.name}
                      <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-[#E2F609]" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="p-6 pb-10 space-y-4 relative z-10 bg-black/20 border-t border-white/10">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="w-full bg-[#E2F609] text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-[0_0_20px_rgba(226,246,9,0.2)]"
                >
                  Get Early Access <Zap className="w-4 h-4 fill-black" />
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="w-full border border-white/10 text-white font-bold py-4 rounded-xl hover:bg-white/5 active:scale-95 transition-all"
                >
                  Login to Console
                </motion.button>

                <p className="text-center text-xs text-gray-600 mt-4 font-mono">
                  System Status:{" "}
                  <span className="text-green-500">Operational</span>
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
