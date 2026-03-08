"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Plus,
  Mic,
  Send,
  MonitorDown,
  TerminalSquare,
  Cpu,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function GenPage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");

  const handleGenerate = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!prompt.trim()) return;

    // Generate a random ID for the session
    const sessionId = Math.random().toString(36).substring(7);

    // Push to the workspace dynamic route
    router.push(`/gen/${sessionId}?prompt=${encodeURIComponent(prompt)}`);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#E2F609] selection:text-black overflow-hidden flex flex-col">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#E2F609] fill-[#E2F609]" />
          <span className="font-bold tracking-tight">XBLT STUDIO</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <span className="hover:text-white cursor-pointer">Pricing</span>
          <span className="hover:text-white cursor-pointer">Docs</span>
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs text-white">
            JS
          </div>
        </div>
      </header>

      {/* HERO CONTENT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 flex flex-col items-center justify-center px-6 relative pt-24 pb-20"
      >
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#E2F609]/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="text-center mb-10 relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
            Build beautiful{" "}
            <span className="text-[#E2F609] italic">websites</span> with AI
          </h1>
          <p className="text-gray-400 text-lg">
            Describe your vision. We handle the orchestration and code output.
          </p>
        </div>

        {/* --- PURE GEN INPUT CONTAINER --- */}
        <div className="w-full max-w-3xl relative z-20">
          <div className="p-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
            <form onSubmit={handleGenerate} className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Let's create a landing page for your agency..."
                className="w-full bg-transparent text-lg text-white placeholder-gray-500 p-4 min-h-[120px] resize-none focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
              />

              {/* Bottom Actions */}
              <div className="flex items-center justify-between px-4 pb-2">
                <div className="text-xs text-gray-500 font-mono">
                  Press{" "}
                  <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-gray-400">
                    Enter
                  </kbd>{" "}
                  to generate
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                  <button
                    type="submit"
                    disabled={!prompt.trim()}
                    className="w-10 h-10 bg-[#E2F609] rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4 ml-0.5" />
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Prompt Chips */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {[
              "E-commerce Storefront",
              "Personal Portfolio",
              "SaaS Dashboard",
            ].map((item) => (
              <button
                key={item}
                onClick={() => setPrompt(`Create a ${item}`)}
                className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-gray-400 hover:border-[#E2F609]/50 hover:text-white hover:bg-white/10 transition-all"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* --- DESKTOP IDE CTA BANNER --- */}
        <div className="mt-24 w-full max-w-4xl relative z-10">
          <div className="p-[1px] rounded-3xl bg-gradient-to-b from-[#E2F609]/20 to-transparent">
            <div className="bg-[#0A0A0A] p-8 md:p-12 rounded-[23px] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
              {/* Inner Glow */}
              <div className="absolute top-0 right-0 p-32 bg-[#E2F609]/5 blur-[100px] rounded-full pointer-events-none" />

              <div className="flex-1 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E2F609]/30 bg-[#E2F609]/5 text-[#E2F609] text-xs font-mono mb-6">
                  <Zap className="w-3 h-3 fill-[#E2F609]" />
                  <span>XBLT DESKTOP</span>
                </div>
                <h3 className="text-3xl font-bold mb-3 text-white">
                  The ultimate AI workspace.
                </h3>
                <p className="text-gray-400 text-[15px] leading-relaxed mb-6 max-w-md">
                  Web is for prototyping. Desktop is for production. Download
                  the IDE to unlock real file-system access, autonomous
                  sub-agents, and lightning-fast local LLM autocomplete.
                </p>

                <div className="flex items-center gap-4">
                  <button className="px-6 py-3 bg-white text-black hover:bg-gray-200 transition-colors rounded-full text-sm font-bold flex items-center gap-2">
                    <MonitorDown className="w-4 h-4" /> Download IDE
                  </button>
                  <span className="text-xs text-gray-500 font-mono">
                    macOS / Windows / Linux
                  </span>
                </div>
              </div>

              {/* Feature Icons Grid */}
              <div className="grid grid-cols-1 gap-4 relative z-10 shrink-0">
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-xl">
                  <Cpu className="w-5 h-5 text-[#E2F609]" />
                  <span className="text-sm font-bold text-gray-300">
                    Local LLMs (Ghost Code)
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-xl">
                  <TerminalSquare className="w-5 h-5 text-[#E2F609]" />
                  <span className="text-sm font-bold text-gray-300">
                    Native File Generation
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
