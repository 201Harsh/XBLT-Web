"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Globe, Mail, Plus, Mic, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

// --- DUMMY TEMPLATES ---
const TEMPLATES = [
  {
    id: "chainvault",
    name: "ChainVault",
    tag: "Crypto",
    color: "bg-blue-500/10",
  },
  {
    id: "textcraft",
    name: "TextCraft",
    tag: "SaaS",
    color: "bg-purple-500/10",
  },
  {
    id: "techsummit",
    name: "TechSummit",
    tag: "Event",
    color: "bg-orange-500/10",
  },
  {
    id: "creativeai",
    name: "CreativeAI",
    tag: "Portfolio",
    color: "bg-pink-500/10",
  },
];

export default function GenPage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState<"web" | "email">("web");

  const handleGenerate = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!prompt.trim()) return;

    // Generate a random ID for the session
    const sessionId = Math.random().toString(36).substring(7);

    router.push(`/gen/${sessionId}`);
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
        className="flex-1 flex flex-col items-center justify-center px-6 relative pt-16"
      >
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-150 bg-[#E2F609]/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="text-center mb-12 relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
            Build beautiful{" "}
            <span className="text-[#E2F609] italic">websites</span> with AI
          </h1>
          <p className="text-gray-400 text-lg">
            With orchestration agents & HTML output. <br /> Your developers will
            love you.
          </p>
        </div>

        {/* INPUT CONTAINER */}
        <div className="w-full max-w-3xl relative z-20">
          <div className="p-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
            <form onSubmit={handleGenerate} className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Let's create a website for your agency..."
                className="w-full bg-transparent text-lg text-white placeholder-gray-500 p-4 min-h-20 resize-none focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
              />

              <div className="flex items-center justify-between px-4 pb-2">
                {/* Toggles */}
                <div className="flex bg-black/40 rounded-full p-1 border border-white/5">
                  <button
                    type="button"
                    onClick={() => setMode("web")}
                    className={clsx(
                      "px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2",
                      mode === "web"
                        ? "bg-white text-black"
                        : "text-gray-400 hover:text-white",
                    )}
                  >
                    <Globe className="w-3 h-3" /> Web
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("email")}
                    className={clsx(
                      "px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2",
                      mode === "email"
                        ? "bg-white text-black"
                        : "text-gray-400 hover:text-white",
                    )}
                  >
                    <Mail className="w-3 h-3" /> Email
                  </button>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-white"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-white"
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                  <button
                    type="submit"
                    disabled={!prompt.trim()}
                    className="w-10 h-10 bg-[#E2F609] rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 ml-0.5" />
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Chips */}
          <div className="flex justify-center gap-3 mt-6">
            {["Clone a website", "Personal Portfolio", "SaaS Landing"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => setPrompt(`Create a ${item}`)}
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-gray-400 hover:border-[#E2F609]/50 hover:text-white transition-all"
                >
                  {item}
                </button>
              ),
            )}
          </div>
        </div>

        {/* TEMPLATES GRID */}
        <div className="mt-20 w-full max-w-6xl relative z-10">
          <h3 className="text-center text-xl text-white mb-8">
            Start with a Template
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TEMPLATES.map((t) => (
              <div
                key={t.id}
                onClick={() => router.push(`/gen/${t.id}?template=${t.id}`)}
                className="group relative aspect-video rounded-xl bg-[#0A0A0A] border border-white/10 overflow-hidden hover:border-[#E2F609]/50 transition-all cursor-pointer"
              >
                <div
                  className={`absolute inset-0 ${t.color} opacity-20 group-hover:opacity-30 transition-opacity`}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="px-4 py-2 bg-black/80 rounded-full text-xs font-bold border border-white/10 text-white backdrop-blur">
                    Use Template
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black to-transparent">
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.tag}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
