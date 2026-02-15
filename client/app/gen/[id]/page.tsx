"use client";

import { useState, useEffect, useRef, use } from "react"; // 1. Import 'use'
import Editor from "@monaco-editor/react";
import {
  Zap,
  Code2,
  Send,
  Monitor,
  Lock,
  CheckCircle2,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import clsx from "clsx";

// --- DUMMY GENERATED CODE ---
const TARGET_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>XBLT Generated</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #050505; color: #fff; font-family: sans-serif; }
    .neon { color: #E2F609; text-shadow: 0 0 10px rgba(226,246,9,0.5); }
  </style>
</head>
<body class="h-screen flex flex-col items-center justify-center">
  <h1 class="text-6xl font-bold mb-4 tracking-tighter">
    GENERATION <span class="neon">COMPLETE</span>
  </h1>
  <p class="text-gray-400 text-xl">The architecture is ready.</p>
</body>
</html>`;

// 2. Type 'params' as a Promise
export default function WorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 3. Unwrap the params Promise using React.use()
  const { id } = use(params);

  const searchParams = useSearchParams();
  const router = useRouter();
  const initialPrompt = searchParams.get("prompt") || "New Project";

  // State
  const [messages, setMessages] = useState<{ role: string; text: string }[]>(
    [],
  );
  const [activeTab, setActiveTab] = useState<"code" | "preview">("code");
  const [code, setCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamingIndex, setStreamingIndex] = useState(0);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // --- 1. AUTO-START GENERATION ON MOUNT ---
  useEffect(() => {
    // Initial user message
    setMessages([{ role: "user", text: initialPrompt }]);

    // Delay slightly then start AI stream
    const timer = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: `Initializing workspace for "${initialPrompt}"... Architecture locked.`,
        },
      ]);
      setIsGenerating(true);
      setCode("");
      setStreamingIndex(0);
    }, 500);

    return () => clearTimeout(timer);
  }, [initialPrompt]);

  // --- 2. CODE STREAMING LOGIC ---
  useEffect(() => {
    if (isGenerating && streamingIndex < TARGET_CODE.length) {
      const timeout = setTimeout(() => {
        const chunk = TARGET_CODE.slice(streamingIndex, streamingIndex + 5);
        setCode((prev) => prev + chunk);
        setStreamingIndex((prev) => prev + 5);
      }, 5);
      return () => clearTimeout(timeout);
    } else if (streamingIndex >= TARGET_CODE.length && isGenerating) {
      setIsGenerating(false);
      setActiveTab("preview"); // Switch to preview when done
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Generation complete. Previewing build." },
      ]);
    }
  }, [isGenerating, streamingIndex]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-screen bg-[#050505] text-white font-sans selection:bg-[#E2F609] selection:text-black flex flex-col overflow-hidden">
      {/* COMPACT HEADER */}
      <header className="h-14 border-b border-white/5 bg-[#050505] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/gen")}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#E2F609] fill-[#E2F609]" />
            <span className="font-bold text-sm tracking-tight">
              XBLT WORKSPACE
            </span>
            {/* 4. Use the unwrapped 'id' variable here */}
            <span className="text-xs text-gray-600 font-mono">/ {id}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isGenerating ? (
            <div className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs rounded-full flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin" /> Building...
            </div>
          ) : (
            <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-500 text-xs rounded-full flex items-center gap-2">
              <CheckCircle2 className="w-3 h-3" /> Ready
            </div>
          )}
          <button className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-1.5 rounded transition-colors">
            Deploy
          </button>
        </div>
      </header>

      {/* MAIN WORKSPACE (30/70 SPLIT) */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT: CHAT (30%) */}
        <div className="w-[30%] border-r border-white/5 bg-black/40 backdrop-blur-xl flex flex-col relative z-20">
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
                      : "bg-white/5 border-white/10 text-gray-300 rounded-bl-sm",
                  )}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/5 bg-black/60">
            <div className="relative">
              <input
                disabled={isGenerating}
                placeholder={
                  isGenerating ? "Wait for generation..." : "Refine code..."
                }
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:border-[#E2F609]/50 outline-none disabled:opacity-50"
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

        {/* RIGHT: EDITOR / PREVIEW (70%) */}
        <div className="w-[70%] bg-[#0A0A0A] flex flex-col relative">
          {/* Tabs */}
          <div className="h-10 border-b border-white/5 flex items-center justify-between px-4 bg-black">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab("code")}
                className={clsx(
                  "text-xs font-bold transition-colors flex items-center gap-2 h-10 border-b-2",
                  activeTab === "code"
                    ? "border-[#E2F609] text-white"
                    : "border-transparent text-gray-500 hover:text-white",
                )}
              >
                <Code2 className="w-3 h-3" /> Code
              </button>
              <button
                onClick={() => setActiveTab("preview")}
                className={clsx(
                  "text-xs font-bold transition-colors flex items-center gap-2 h-10 border-b-2",
                  activeTab === "preview"
                    ? "border-[#E2F609] text-white"
                    : "border-transparent text-gray-500 hover:text-white",
                )}
              >
                <Monitor className="w-3 h-3" /> Preview
              </button>
            </div>
            {isGenerating && (
              <div className="text-[10px] text-[#E2F609] flex items-center gap-1">
                <Lock className="w-3 h-3" /> Locked
              </div>
            )}
          </div>

          {/* Viewport */}
          <div className="flex-1 relative overflow-hidden">
            {activeTab === "code" && (
              <div className="relative w-full h-full">
                <Editor
                  height="100%"
                  defaultLanguage="html"
                  theme="vs-dark"
                  value={code}
                  options={{
                    readOnly: isGenerating,
                    minimap: { enabled: false },
                    fontSize: 13,
                    fontFamily: "'JetBrains Mono', monospace",
                    padding: { top: 16 },
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
      </div>
    </div>
  );
}
