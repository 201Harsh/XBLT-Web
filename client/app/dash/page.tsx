"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Editor from "@monaco-editor/react";
import {
  Zap,
  Code2,
  Globe,
  Send,
  Mic,
  Plus,
  Monitor,
  Lock,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import clsx from "clsx";

// --- DUMMY TEMPLATES DATA ---
const TEMPLATES = [
  { id: 1, name: "ChainVault", tag: "Crypto", color: "bg-blue-500/10" },
  { id: 2, name: "TextCraft", tag: "SaaS", color: "bg-purple-500/10" },
  { id: 3, name: "TechSummit", tag: "Event", color: "bg-orange-500/10" },
  { id: 4, name: "CreativeAI", tag: "Portfolio", color: "bg-pink-500/10" },
];

// --- DUMMY GENERATED CODE ---
const TARGET_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>XBLT Generated</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #000; color: #fff; font-family: sans-serif; }
    .glass { background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); }
  </style>
</head>
<body class="h-screen flex flex-col items-center justify-center relative overflow-hidden">
  <div class="absolute inset-0 bg-[radial-linear(circle_at_center,var(--tw-linear-stops))] from-yellow-500/20 via-black to-black"></div>
  <div class="z-10 text-center glass p-12 rounded-3xl max-w-2xl border border-yellow-500/30 shadow-[0_0_50px_rgba(226,246,9,0.1)]">
    <h1 class="text-6xl font-bold mb-6 tracking-tighter">
      FUTURE <span class="text-yellow-400">READY</span>
    </h1>
    <p class="text-gray-400 text-lg mb-8">
      Architecture is not about space. It is about time.
    </p>
    <button class="bg-yellow-400 text-black font-bold px-8 py-3 rounded-full hover:scale-105 transition">
      Enter System
    </button>
  </div>
</body>
</html>`;

const XBLTStudio = () => {
  // --- STATE ---
  const [hasStarted, setHasStarted] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState<"web">("web");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>(
    [],
  );

  // Editor State
  const [activeTab, setActiveTab] = useState<"code" | "preview">("preview");
  const [code, setCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamingIndex, setStreamingIndex] = useState(0);
  const [isEditorLocked, setIsEditorLocked] = useState(true);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // --- STREAMING EFFECT ---
  useEffect(() => {
    if (isGenerating && streamingIndex < TARGET_CODE.length) {
      const timeout = setTimeout(() => {
        const chunk = TARGET_CODE.slice(streamingIndex, streamingIndex + 3);
        setCode((prev) => prev + chunk);
        setStreamingIndex((prev) => prev + 3);
      }, 5);
      return () => clearTimeout(timeout);
    } else if (streamingIndex >= TARGET_CODE.length && isGenerating) {
      setIsGenerating(false);
      setIsEditorLocked(false); // Unlock only after finish
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Architecture complete. System unlocked for editing.",
        },
      ]);
    }
  }, [isGenerating, streamingIndex]);

  // Auto scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- ACTIONS ---
  const handleGenerate = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!prompt.trim()) return;

    setHasStarted(true);
    setMessages([{ role: "user", text: prompt }]);

    // Simulate thinking then start stream
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: `Analyzing "${prompt}"... Initializing Planner Agent...`,
        },
      ]);
      setIsGenerating(true);
      setActiveTab("code"); // Switch to code to show the "magic"
      setCode("");
      setStreamingIndex(0);
      setIsEditorLocked(true);
    }, 800);
  };

  return (
    <div
      className={`min-h-screen bg-[#050505] text-white font-sans selection:bg-[#E2F609] selection:text-black overflow-hidden`}
    >
      {/* HEADER (Always Visible) */}
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

      <AnimatePresence mode="wait">
        {/* === HERO MODE (Input & Templates) === */}
        {!hasStarted && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="pt-32 pb-12 px-6 flex flex-col items-center justify-center min-h-screen relative"
          >
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-150 bg-[#E2F609]/5 blur-[150px] rounded-full pointer-events-none" />

            {/* HEADLINES */}
            <div className="text-center mb-12 relative z-10">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
                Build beautiful{" "}
                <span className="text-[#E2F609] italic">websites</span> with AI
              </h1>
              <p className="text-gray-400 text-lg">
                With orchestration agents & HTML output. <br /> Your developers
                will love you.
              </p>
            </div>

            {/* GLASS INPUT CONTAINER */}
            <div className="w-full max-w-3xl relative z-20">
              <div className="glass-panel p-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
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

                  {/* Toolbar inside Input */}
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
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-white transition-colors"
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

              {/* Suggestion Chips */}
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
        )}

        {/* === WORKSPACE MODE (30/70 SPLIT) === */}
        {hasStarted && (
          <motion.div
            key="workspace"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-screen pt-16"
          >
            {/* LEFT: GLASS CHAT (30%) */}
            <div className="w-[30%] border-r border-white/5 bg-black/40 backdrop-blur-xl flex flex-col relative z-20">
              {/* Chat Header */}
              <div className="p-4 border-b border-white/5 flex justify-between items-center">
                <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">
                  Planner Agent
                </span>
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={clsx(
                      "flex flex-col gap-2",
                      m.role === "user" ? "items-end" : "items-start",
                    )}
                  >
                    <div
                      className={clsx(
                        "max-w-[90%] p-4 rounded-2xl text-sm leading-relaxed border",
                        m.role === "user"
                          ? "bg-[#E2F609]/10 border-[#E2F609]/20 text-white rounded-br-sm"
                          : "bg-white/5 border-white/10 text-gray-300 rounded-bl-sm glass-panel",
                      )}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                {isGenerating && (
                  <div className="flex items-center gap-2 text-xs text-[#E2F609] animate-pulse pl-2">
                    <Loader2 className="w-3 h-3 animate-spin" /> Architecting...
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-white/5 bg-black/60">
                <div className="relative">
                  <input
                    disabled={isGenerating}
                    placeholder="Refine the design..."
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:border-[#E2F609]/50 outline-none"
                  />
                  <button
                    disabled={isGenerating}
                    className="absolute right-2 top-2 p-1.5 bg-white/10 rounded-lg text-white hover:bg-[#E2F609] hover:text-black transition-colors disabled:opacity-30"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: IDE / PREVIEW (70%) */}
            <div className="w-[70%] bg-[#0A0A0A] flex flex-col relative">
              {/* Tabs */}
              <div className="h-12 border-b border-white/5 flex items-center justify-between px-4 bg-black">
                <div className="flex gap-1 p-1 bg-white/5 rounded-lg">
                  <button
                    onClick={() => setActiveTab("code")}
                    className={clsx(
                      "px-4 py-1 rounded text-xs font-bold transition-colors flex items-center gap-2",
                      activeTab === "code"
                        ? "bg-[#E2F609] text-black"
                        : "text-gray-500 hover:text-white",
                    )}
                  >
                    <Code2 className="w-3 h-3" /> Code
                  </button>
                  <button
                    onClick={() => setActiveTab("preview")}
                    className={clsx(
                      "px-4 py-1 rounded text-xs font-bold transition-colors flex items-center gap-2",
                      activeTab === "preview"
                        ? "bg-[#E2F609] text-black"
                        : "text-gray-500 hover:text-white",
                    )}
                  >
                    <Monitor className="w-3 h-3" /> Preview
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {isGenerating ? (
                    <div className="px-3 py-1 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs flex items-center gap-2">
                      <Lock className="w-3 h-3" /> Locked: Streaming
                    </div>
                  ) : (
                    <div className="px-3 py-1 rounded bg-green-500/10 border border-green-500/20 text-green-500 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3" /> Unlocked
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 relative overflow-hidden">
                {activeTab === "code" && (
                  <div className="relative w-full h-full">
                    <Editor
                      height="100%"
                      defaultLanguage="html"
                      theme="vs-dark"
                      value={code}
                      options={{
                        readOnly: isEditorLocked,
                        minimap: { enabled: false },
                        fontSize: 14,
                        fontFamily: "'JetBrains Mono', monospace",
                        scrollBeyondLastLine: false,
                        padding: { top: 20 },
                      }}
                      onMount={(editor, monaco) => {
                        monaco.editor.defineTheme("xblt-dark", {
                          base: "vs-dark",
                          inherit: true,
                          rules: [],
                          colors: { "editor.background": "#050505" },
                        });
                        monaco.editor.setTheme("xblt-dark");
                      }}
                    />
                    {isGenerating && (
                      <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] pointer-events-none flex items-end justify-end p-8">
                        <div className="bg-[#E2F609] text-black px-4 py-2 rounded font-mono text-xs font-bold shadow-lg animate-pulse">
                          AI WRITING...
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "preview" && (
                  <iframe
                    srcDoc={code}
                    className="w-full h-full bg-white border-none"
                    title="Preview"
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default XBLTStudio;
