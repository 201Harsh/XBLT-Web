"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Brain,
  Network,
  Database,
  Code2,
  Cpu,
  Workflow,
  HardDrive,
  Lock,
  Search,
  ArrowDown,
  Laptop,
  Cloud,
} from "lucide-react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const XBLTEngine = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#050505] text-white selection:bg-[#E2F609] selection:text-black font-sans overflow-x-hidden"
    >
      <Header />

      <section className="relative pt-48 pb-32 px-6 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-linear(to_right,#80808012_1px,transparent_1px),linear-linear(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-linear(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E2F609]/30 bg-[#E2F609]/5 text-[#E2F609] text-xs font-mono mb-8">
              <Cpu className="w-3 h-3" />
              <span>CORE ARCHITECTURE BREAKDOWN</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-none">
              NOT A TOY. <br />
              <span className="text-transparent bg-clip-text bg-linear-to-b from-white to-gray-600">
                A MULTI-AGENT ENGINE.
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              XBLT isn't just "Prompt-to-Code." It's an orchestration layer that
              combines{" "}
              <span className="text-white font-bold">Planner Agents</span>,{" "}
              <span className="text-white font-bold">Tool Execution</span>, and{" "}
              <span className="text-white font-bold">RAG Memory</span> to stream
              production-ready applications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 1: THE PIPELINE ANIMATION --- */}
      <section className="py-32 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold mb-4">THE EXECUTION PIPELINE</h2>
            <p className="text-gray-500">
              Real-time data flow from user intent to live DOM.
            </p>
          </div>

          <div className="relative">
            {/* The Connecting Line */}
            <div className="absolute left-7 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2"></div>

            {/* Moving Data Packet */}
            <div className="absolute left-7 md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 overflow-hidden">
              <motion.div
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute w-full h-20 bg-linear-to-b from-transparent via-[#E2F609] to-transparent"
              />
            </div>

            <div className="space-y-12 relative z-10">
              <PipelineNode
                title="1. User Prompt"
                desc="Natural language intent is captured and sanitized."
                icon={<Zap />}
                align="right"
              />
              <PipelineNode
                title="2. Planner AI"
                desc="The 'Brain' breaks tasks into a structured JSON plan. No hallucinations."
                icon={<Brain />}
                align="left"
                isSpecial
              />
              <PipelineNode
                title="3. Tool Orchestration"
                desc="LangGraph router dispatches tasks to Design, Code, and Asset agents."
                icon={<Workflow />}
                align="right"
              />
              <PipelineNode
                title="4. Asset Fetcher"
                desc="Real images and icons are fetched via tool-calling APIs (Unsplash/Lucide)."
                icon={<Search />}
                align="left"
              />
              <PipelineNode
                title="5. Streaming Engine"
                desc="Incremental DOM injection via WebSockets for instant visual feedback."
                icon={<Code2 />}
                align="right"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: THE BRAIN (PLANNING PHASE) --- */}
      <section className="py-32 bg-[#080808] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold mb-6">
              THE <span className="text-[#E2F609]">PLANNER</span> NODE
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              XBLT doesn't send one prompt and pray. The Planner Agent
              understands intent, breaks it down, and outputs a strict JSON
              architecture before writing a single line of code.
            </p>
            <div className="space-y-6">
              <FeatureItem
                title="Intent Analysis"
                desc="Deciphers 'Make it pop' into specific CSS/Animation constraints."
              />
              <FeatureItem
                title="Stateful Control"
                desc="LangGraph maintains context across edits. It knows what you changed last."
              />
              <FeatureItem
                title="JSON Strictness"
                desc="Forces the LLM to adhere to a rigid schema, preventing syntax errors."
              />
            </div>
          </div>

          {/* Code Terminal Visual */}
          <div className="lg:w-1/2 w-full">
            <div className="rounded-xl bg-black border border-white/10 p-4 shadow-2xl font-mono text-xs md:text-sm">
              <div className="flex gap-2 mb-4 border-b border-white/10 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-gray-500">planner_output.json</span>
              </div>
              <div className="text-gray-300 space-y-1">
                <p>
                  <span className="text-purple-400">{"{"}</span>
                </p>
                <p className="pl-4">
                  <span className="text-blue-400">"intent"</span>:{" "}
                  <span className="text-green-400">"landing_page"</span>,
                </p>
                <p className="pl-4">
                  <span className="text-blue-400">"style"</span>:{" "}
                  <span className="text-green-400">"modern_dark_glass"</span>,
                </p>
                <p className="pl-4">
                  <span className="text-blue-400">"sections"</span>: [
                </p>
                <p className="pl-8">
                  <span className="text-green-400">
                    "hero_section_animated"
                  </span>
                  ,
                </p>
                <p className="pl-8">
                  <span className="text-green-400">"features_grid_bento"</span>,
                </p>
                <p className="pl-8">
                  <span className="text-green-400">"pricing_table_toggle"</span>
                </p>
                <p className="pl-4">],</p>
                <p className="pl-4">
                  <span className="text-blue-400">"required_assets"</span>: [
                </p>
                <p className="pl-8">
                  <span className="text-green-400">"hero_bg_abstract"</span>,
                </p>
                <p className="pl-8">
                  <span className="text-green-400">"payment_icons"</span>
                </p>
                <p className="pl-4">]</p>
                <p>
                  <span className="text-purple-400">{"}"}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: WEB VS DESKTOP (RAG ENGINE) --- */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              TWO MODES. <span className="text-[#E2F609]">ONE BEAST.</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The Web version is for speed. The Desktop version is an OS-level
              development system with its own RAG Brain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* WEB CARD */}
            <div className="group p-8 rounded-3xl bg-[#0A0A0A] border border-white/10 hover:border-white/20 transition-all">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6">
                <Cloud className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">XBLT Web</h3>
              <p className="text-sm text-blue-400 font-mono mb-6">
                THE GENERATOR
              </p>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-center gap-3">
                  <Lock className="w-4 h-4 text-red-500" /> Browser Sandbox
                  Restrictions
                </li>
                <li className="flex items-center gap-3">
                  <Database className="w-4 h-4 text-red-500" /> Stateless Memory
                  (Session only)
                </li>
                <li className="flex items-center gap-3">
                  <Network className="w-4 h-4 text-blue-400" /> Cloud LLM
                  Inference
                </li>
                <li className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-blue-400" /> Instant Access (No
                  Install)
                </li>
              </ul>
            </div>

            {/* DESKTOP CARD */}
            <div className="group p-8 rounded-3xl bg-[#0A0A0A] border border-[#E2F609]/20 hover:border-[#E2F609] transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <HardDrive className="w-40 h-40 text-[#E2F609]" />
              </div>
              <div className="w-12 h-12 bg-[#E2F609]/10 rounded-lg flex items-center justify-center mb-6">
                <Laptop className="w-6 h-6 text-[#E2F609]" />
              </div>
              <h3 className="text-2xl font-bold mb-2">XBLT Desktop</h3>
              <p className="text-sm text-[#E2F609] font-mono mb-6">
                THE WORKSTATION
              </p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center gap-3">
                  <HardDrive className="w-4 h-4 text-[#E2F609]" /> Full File
                  System Access
                </li>
                <li className="flex items-center gap-3">
                  <Brain className="w-4 h-4 text-[#E2F609]" /> Local LlamaIndex
                  RAG Engine
                </li>
                <li className="flex items-center gap-3">
                  <Database className="w-4 h-4 text-[#E2F609]" /> Vector DB
                  (FAISS/Chroma)
                </li>
                <li className="flex items-center gap-3">
                  <Code2 className="w-4 h-4 text-[#E2F609]" /> IDE Integration
                  (VS Code)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: PERSONAL RAG EXPLAINED --- */}
      <section className="py-32 bg-zinc-900/30 border-t border-white/5 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-[#E2F609]/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-mono mb-6">
            <Database className="w-3 h-3" />
            <span>DESKTOP EXCLUSIVE FEATURE</span>
          </div>
          <h2 className="text-4xl font-bold mb-6">
            YOUR PERSONAL <span className="text-purple-400">RAG ENGINE</span>
          </h2>
          <p className="text-gray-400 text-lg mb-12">
            The Desktop version learns from you. It indexes your previous
            projects, design systems, and code snippets into a local Vector
            Database.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-6 bg-black border border-white/10 rounded-xl">
              <div className="text-gray-500 text-xs font-mono mb-2">INPUT</div>
              <div className="font-bold text-white mb-2">
                "Make it like my SaaS"
              </div>
              <p className="text-sm text-gray-400">
                User references a vague personal preference.
              </p>
            </div>
            <div className="flex items-center justify-center text-gray-600">
              <ArrowDown className="w-6 h-6 md:-rotate-90" />
            </div>
            <div className="p-6 bg-black border border-purple-500/30 rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-purple-500/5 animate-pulse"></div>
              <div className="text-purple-400 text-xs font-mono mb-2">
                LlamaIndex RETRIEVAL
              </div>
              <div className="font-bold text-white mb-2">
                Fetching Context...
              </div>
              <p className="text-sm text-gray-400">
                Retrieves: Dark Theme, GSAP Patterns, Navbar Layout.
              </p>
            </div>
            <div className="flex items-center justify-center text-gray-600">
              <ArrowDown className="w-6 h-6 md:-rotate-90" />
            </div>
            <div className="p-6 bg-black border border-[#E2F609]/30 rounded-xl">
              <div className="text-[#E2F609] text-xs font-mono mb-2">
                GENERATION
              </div>
              <div className="font-bold text-white mb-2">
                Hyper-Personalized Code
              </div>
              <p className="text-sm text-gray-400">
                The engine writes code that matches YOUR specific style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <Footer />
    </div>
  );
};

// --- SUB COMPONENTS ---

const PipelineNode = ({ title, desc, icon, align, isSpecial }: any) => {
  const isLeft = align === "left";
  return (
    <div
      className={`flex items-center justify-between w-full ${isLeft ? "flex-row-reverse" : ""}`}
    >
      <div className="hidden md:block w-5/12"></div>

      {/* Center Node */}
      <div
        className={`relative z-10 w-14 h-14 rounded-full border-4 flex items-center justify-center bg-black transition-all duration-500
                ${isSpecial ? "border-[#E2F609] shadow-[0_0_30px_rgba(226,246,9,0.4)] scale-110" : "border-white/10"}`}
      >
        <div className={`${isSpecial ? "text-[#E2F609]" : "text-gray-400"}`}>
          {icon}
        </div>
      </div>

      <div className="w-[calc(100%-60px)] md:w-5/12 pl-4 md:pl-0">
        <div
          className={`p-6 rounded-2xl border bg-zinc-900/50 backdrop-blur-sm ${isSpecial ? "border-[#E2F609]/50" : "border-white/10"}`}
        >
          <h3
            className={`text-xl font-bold mb-2 ${isSpecial ? "text-[#E2F609]" : "text-white"}`}
          >
            {title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ title, desc }: any) => (
  <div className="flex gap-4">
    <div className="mt-1 w-2 h-2 rounded-full bg-[#E2F609] shrink-0" />
    <div>
      <h4 className="font-bold text-white">{title}</h4>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  </div>
);

export default XBLTEngine;
