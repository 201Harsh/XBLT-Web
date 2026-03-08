"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Send,
  MonitorDown,
  TerminalSquare,
  Cpu,
  Loader2,
  LayoutDashboard,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";

const LOADING_STEPS = [
  "XBLT is thinking...",
  "Initializing Architecture...",
  "Fetching Assets & Context...",
  "Designing Layout Architecture...",
  "Compiling Native Code...",
  "Establishing Secure Link...",
];

export default function GenPage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const handleGenerate = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    const sessionId = Math.random().toString(36).substring(7);

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep >= LOADING_STEPS.length) {
        clearInterval(interval);
        setTimeout(() => {
          router.push(`/gen/${sessionId}?prompt=${encodeURIComponent(prompt)}`);
        }, 400);
      } else {
        setLoadingStep(currentStep);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#E2F609] selection:text-black overflow-x-hidden flex flex-col relative">
      {/* Background ambient glow - Centered and subtle */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#E2F609]/10 blur-[150px] rounded-full pointer-events-none" />

      {/* FLOATING DOCK HEADER */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <header className="rounded-full border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl flex items-center px-2 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
          {/* Logo Section */}
          <div className="flex items-center gap-2 pl-4 pr-6 border-r border-white/10 cursor-pointer group">
            <Zap className="w-5 h-5 text-[#E2F609] fill-[#E2F609] group-hover:drop-shadow-[0_0_10px_rgba(226,246,9,0.8)] transition-all" />
            <span className="font-bold tracking-tight text-sm text-white group-hover:text-[#E2F609] transition-colors">
              XBLT
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-2 px-4 border-r border-white/10">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/10 text-sm text-gray-300 hover:text-white transition-colors cursor-pointer">
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </button>
            <button className="px-4 py-2 rounded-full hover:bg-white/10 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
              Pricing
            </button>
            <button className="px-4 py-2 rounded-full hover:bg-white/10 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
              Docs
            </button>
          </nav>

          {/* Account Dropdown */}
          <div className="pl-4 pr-2 relative group">
            <div className="cursor-pointer w-9 h-9 rounded-full bg-gradient-to-br from-[#E2F609]/20 to-transparent border border-[#E2F609]/30 flex items-center justify-center text-[#E2F609] text-xs font-bold shadow-[0_0_10px_rgba(226,246,9,0.1)] group-hover:shadow-[0_0_15px_rgba(226,246,9,0.3)] group-hover:border-[#E2F609]/60 transition-all">
              HP
            </div>

            {/* Hover Menu */}
            <div className="absolute top-full right-0 mt-3 w-56 bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                <p className="text-sm font-bold text-white flex items-center gap-2">
                  Harsh Pandey
                  <span className="px-1.5 py-0.5 rounded-md bg-[#E2F609]/20 text-[#E2F609] text-[10px] uppercase tracking-wider font-bold">
                    Pro
                  </span>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">harsh@xblt.app</p>
              </div>
              <div className="p-2 flex flex-col gap-1">
                <button className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer transition-colors">
                  <User className="w-4 h-4" /> Profile
                </button>
                <button className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer transition-colors">
                  <Settings className="w-4 h-4" /> Settings
                </button>
                <div className="h-px w-full bg-white/5 my-1" />
                <button className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl cursor-pointer transition-colors">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 relative pt-36 pb-24 w-full"
      >
        {/* HERO SECTION */}
        <div className="text-center mb-10 sm:mb-12 relative z-10 w-full max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight text-white drop-shadow-xl">
            Build beautiful{" "}
            <span className="text-[#E2F609] italic drop-shadow-[0_0_25px_rgba(226,246,9,0.4)]">
              websites
            </span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto font-medium">
            Describe your vision. We handle the orchestration and native code
            output.
          </p>
        </div>

        {/* PROMPT AREA */}
        <div className="w-full max-w-3xl relative z-20 flex justify-center min-h-[200px]">
          <AnimatePresence mode="wait">
            {!isGenerating ? (
              <motion.div
                key="input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                transition={{ duration: 0.2 }}
                className="w-full relative group"
              >
                {/* ELEGANT NEON GLOW WRAPPER */}
                <div className="p-[1px] rounded-[24px] bg-gradient-to-b from-[#E2F609]/40 via-white/5 to-transparent shadow-[0_0_30px_rgba(226,246,9,0.05)] focus-within:shadow-[0_0_50px_rgba(226,246,9,0.2)] focus-within:from-[#E2F609]/70 transition-all duration-500">
                  <div className="rounded-[23px] bg-[#0A0A0A] overflow-hidden">
                    <form
                      onSubmit={handleGenerate}
                      className="relative flex flex-col h-full"
                    >
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Let's create a minimal portfolio for a designer..."
                        className="w-full bg-transparent text-base sm:text-lg text-white placeholder-gray-600 p-6 min-h-[140px] resize-none focus:outline-none"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleGenerate();
                          }
                        }}
                      />

                      {/* MINIMAL TOOLBAR (Removed Mic and Plus) */}
                      <div className="flex items-center justify-between px-4 pb-4 pt-2">
                        <div className="text-xs text-gray-500 font-mono flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#E2F609] animate-pulse shadow-[0_0_8px_rgba(226,246,9,0.8)]" />
                          <span className="hidden sm:inline">Press</span>
                          <kbd className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10 text-gray-400">
                            Enter
                          </kbd>
                          <span className="hidden sm:inline">to generate</span>
                        </div>

                        {/* ONLY SEND BUTTON */}
                        <button
                          type="submit"
                          disabled={!prompt.trim()}
                          className="cursor-pointer w-10 h-10 bg-[#E2F609] rounded-full flex items-center justify-center text-black shadow-[0_0_15px_rgba(226,246,9,0.4)] hover:shadow-[0_0_25px_rgba(226,246,9,0.6)] hover:scale-105 transition-all disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
                        >
                          <Send className="w-4 h-4 ml-0.5" />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* CLEAN SUGGESTION CHIPS */}
                <div className="flex flex-wrap justify-center gap-3 mt-8">
                  {[
                    "E-commerce Storefront",
                    "Personal Portfolio",
                    "SaaS Dashboard",
                    "Landing Page for Startup",
                  ].map((item) => (
                    <button
                      key={item}
                      onClick={() => setPrompt(`Create a ${item}`)}
                      className="cursor-pointer px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-gray-400 hover:text-[#E2F609] hover:bg-[#E2F609]/10 hover:border-[#E2F609]/30 transition-all shadow-lg"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full flex flex-col items-center justify-center py-12"
              >
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-[#E2F609] blur-[20px] opacity-20 rounded-full animate-pulse" />
                  <Loader2 className="w-10 h-10 text-[#E2F609] animate-spin relative z-10" />
                </div>

                <div className="h-6 overflow-hidden relative w-full text-center">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={loadingStep}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-base font-mono text-[#E2F609] drop-shadow-[0_0_8px_rgba(226,246,9,0.5)]"
                    >
                      {LOADING_STEPS[loadingStep]}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Glowing progress bar */}
                <div className="w-64 h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
                  <motion.div
                    className="h-full bg-[#E2F609] shadow-[0_0_10px_rgba(226,246,9,1)]"
                    initial={{ width: "0%" }}
                    animate={{
                      width: `${((loadingStep + 1) / LOADING_STEPS.length) * 100}%`,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* DESKTOP APP PROMO SECTION */}
        <div className="mt-20 sm:mt-28 w-full max-w-5xl mx-auto">
          <div className="relative p-[1px] rounded-3xl bg-gradient-to-br from-[#E2F609]/30 via-transparent to-transparent">
            <div className="bg-[#0A0A0A] rounded-[23px] p-8 sm:p-10 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E2F609]/5 blur-[120px] rounded-full pointer-events-none" />

              <div className="flex-1 text-center lg:text-left relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E2F609]/30 bg-[#E2F609]/10 text-[#E2F609] text-xs font-mono font-bold mb-6 shadow-[0_0_15px_rgba(226,246,9,0.1)]">
                  <TerminalSquare className="w-3.5 h-3.5" />
                  XBLT DESKTOP
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white tracking-tight">
                  The ultimate AI workspace.
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                  Web is for prototyping.{" "}
                  <strong className="text-white font-semibold">
                    Desktop is for production.
                  </strong>{" "}
                  Download the IDE to unlock real file-system access, autonomous
                  sub-agents, and zero-latency local LLMs.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                  <button className="cursor-pointer px-6 py-3 w-full sm:w-auto bg-[#E2F609] text-black hover:bg-white transition-all rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(226,246,9,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                    <MonitorDown className="w-4 h-4" /> Download IDE
                  </button>
                  <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">
                    macOS / Win / Linux
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full lg:w-auto min-w-[280px] relative z-10">
                <div className="cursor-pointer flex items-center gap-4 bg-[#111] border border-white/5 px-5 py-4 rounded-2xl hover:border-[#E2F609]/30 transition-colors group">
                  <div className="p-2.5 bg-black rounded-xl border border-white/5 group-hover:bg-[#E2F609]/10 transition-colors">
                    <Cpu className="w-5 h-5 text-[#E2F609]" />
                  </div>
                  <div className="text-left">
                    <span className="block text-sm font-bold text-gray-200">
                      Local LLMs
                    </span>
                    <span className="block text-xs text-gray-500 font-mono mt-0.5">
                      Zero-latency Ghost Code
                    </span>
                  </div>
                </div>

                <div className="cursor-pointer flex items-center gap-4 bg-[#111] border border-white/5 px-5 py-4 rounded-2xl hover:border-[#E2F609]/30 transition-colors group">
                  <div className="p-2.5 bg-black rounded-xl border border-white/5 group-hover:bg-[#E2F609]/10 transition-colors">
                    <Zap className="w-5 h-5 text-[#E2F609]" />
                  </div>
                  <div className="text-left">
                    <span className="block text-sm font-bold text-gray-200">
                      Native Generation
                    </span>
                    <span className="block text-xs text-gray-500 font-mono mt-0.5">
                      Direct file-system write
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
