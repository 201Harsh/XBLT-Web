"use client";

import { useState, useEffect, use } from "react";
import {
  Zap,
  Lock,
  Globe,
  CheckCircle2,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import clsx from "clsx";

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

export default function WorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const searchParams = useSearchParams();
  const router = useRouter();
  const initialPrompt = searchParams.get("prompt") || "New Project";

  const [code, setCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamingIndex, setStreamingIndex] = useState(0);
  const [visibility, setVisibility] = useState<"public" | "private">("public");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGenerating(true);
      setCode("");
      setStreamingIndex(0);
    }, 500);

    return () => clearTimeout(timer);
  }, [initialPrompt]);

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
    }
  }, [isGenerating, streamingIndex]);

  return (
    <div className="h-screen bg-[#050505] text-white font-sans selection:bg-[#E2F609] selection:text-black flex flex-col overflow-hidden">
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
              XBLT PREVIEW
            </span>
            <span className="text-xs text-gray-600 font-mono">/ {id}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
            <button
              onClick={() => setVisibility("public")}
              className={clsx(
                "flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all",
                visibility === "public"
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-gray-400 hover:text-gray-200",
              )}
            >
              <Globe className="w-3 h-3" /> Public
            </button>
            <button
              onClick={() => setVisibility("private")}
              className={clsx(
                "flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all",
                visibility === "private"
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-gray-400 hover:text-gray-200",
              )}
            >
              <Lock className="w-3 h-3" /> Private
            </button>
          </div>

          <div className="h-4 w-px bg-white/10" />

          {isGenerating ? (
            <div className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs rounded-full flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin" /> Building...
            </div>
          ) : (
            <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-500 text-xs rounded-full flex items-center gap-2">
              <CheckCircle2 className="w-3 h-3" /> Ready
            </div>
          )}

          <button
            onClick={() => console.log(`Deploying as ${visibility} website`)}
            className="bg-[#E2F609] hover:bg-[#c8d908] text-black text-xs font-bold px-4 py-1.5 rounded transition-colors"
          >
            Deploy
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col relative bg-[#0A0A0A] p-6 lg:p-12">
        <div className="w-full max-w-6xl mx-auto bg-black border border-white/10 rounded-t-xl h-12 flex items-center px-4 gap-4 shadow-2xl">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <div className="w-3 h-3 rounded-full bg-white/10" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-white/5 border border-white/10 rounded-md px-4 py-1.5 text-xs text-gray-400 flex items-center gap-2 w-72 justify-center shadow-inner">
              {visibility === "private" ? (
                <Lock className="w-3 h-3" />
              ) : (
                <Globe className="w-3 h-3" />
              )}
              {id}.xblt.app
            </div>
          </div>
          <div className="w-12"></div>
        </div>

        <div className="w-full max-w-6xl mx-auto flex-1 relative overflow-hidden border-x border-b border-white/10 rounded-b-xl bg-white shadow-2xl">
          <iframe
            srcDoc={code}
            className="w-full h-full border-none"
            title="Preview"
          />
        </div>
      </div>
    </div>
  );
}
