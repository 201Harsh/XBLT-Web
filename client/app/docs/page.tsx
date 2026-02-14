"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Search,
  Copy,
  Check,
  Terminal,
  Cpu,
  Zap,
  Hash,
  Brain,
  Code2,
  ShieldCheck,
} from "lucide-react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const DOC_SECTIONS = [
  {
    id: "introduction",
    title: "Introduction",
    content:
      "XBLT is not just a builder; it is an orchestration engine. This documentation covers the architecture, installation, and deep configuration of the XBLT runtime.",
  },
  {
    id: "architecture",
    title: "Core Architecture",
    content:
      "Understanding the Multi-Agent flow is crucial. XBLT uses a triangular loop: The Planner Agent drafts the JSON schema, the Code Agent implements the logic, and the Critic Agent validates against the schema.",
  },
  {
    id: "installation",
    title: "Installation",
    content:
      "The XBLT CLI is the entry point for both Web and Desktop modes. It requires Node.js 18+ and a valid API key for cloud inference.",
  },
  {
    id: "planner-agent",
    title: "The Planner Agent",
    content:
      "Unlike standard LLM wrappers, the Planner does not write code. It writes *plans*. It generates a strict JSON tree describing components, props, and state before any TSX is generated.",
  },
  {
    id: "rag-engine",
    title: "Local RAG Setup",
    content:
      "For Desktop users, XBLT can index your local codebase. It uses LlamaIndex to chunk and embed your existing React components to match your coding style.",
  },
  {
    id: "streaming",
    title: "Streaming Protocol",
    content:
      "XBLT uses a custom WebSocket protocol to stream DOM updates. This bypasses the traditional 'wait for completion' model, allowing for sub-100ms visual feedback.",
  },
];

const NAV_TREE = [
  {
    category: "Getting Started",
    items: ["Introduction", "Installation", "Quick Start"],
  },
  {
    category: "Core Concepts",
    items: ["Core Architecture", "The Planner Agent", "Streaming Protocol"],
  },
  {
    category: "Advanced",
    items: ["Local RAG Setup", "Custom Agents", "Plugin API"],
  },
];

const XBLTDocs = () => {
  const [activeId, setActiveId] = useState("introduction");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let currentId = "introduction";

      sections.forEach((section) => {
        const top = (section as HTMLElement).offsetTop - 150;
        if (window.scrollY >= top) {
          currentId = section.getAttribute("id") || "introduction";
        }
      });
      setActiveId(currentId);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#E2F609] selection:text-black">
      <Header />

      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-20 left-0 right-0 h-0.5 bg-[#E2F609] origin-left z-40"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto flex pt-20">
        {/* --- LEFT SIDEBAR (DESKTOP) --- */}
        <aside className="hidden lg:block w-64 fixed top-20 bottom-0 left-[max(0px,calc(50%-40rem))] overflow-y-auto border-r border-white/10 bg-[#050505] pb-20">
          <div className="p-6">
            <div className="relative mb-8">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search docs..."
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-[#E2F609] focus:outline-none transition-colors"
              />
            </div>

            <nav className="space-y-8">
              {NAV_TREE.map((group, i) => (
                <div key={i}>
                  <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">
                    {group.category}
                  </h4>
                  <ul className="space-y-1">
                    {group.items.map((item) => {
                      const id = item.toLowerCase().replace(/ /g, "-");
                      const isActive = activeId === id;
                      return (
                        <li key={item}>
                          <a
                            href={`#${id}`}
                            className={`block px-3 py-2 text-sm rounded-md transition-all duration-200 border-l-2 ${isActive ? "border-[#E2F609] text-[#E2F609] bg-[#E2F609]/5" : "border-transparent text-gray-400 hover:text-white hover:bg-white/5"}`}
                          >
                            {item}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* --- MOBILE MENU TOGGLE --- */}
        <div className="lg:hidden fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="bg-[#E2F609] text-black p-4 rounded-full shadow-[0_0_20px_rgba(226,246,9,0.4)]"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 lg:pl-72 lg:pr-64 w-full min-w-0 py-12 px-6 lg:px-12">
          {/* Intro Section */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E2F609]/30 bg-[#E2F609]/5 text-[#E2F609] text-xs font-mono mb-6">
              <Terminal className="w-3 h-3" />
              <span>DOCS v2.4.0</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Documentation
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Welcome to the XBLT Engine. This guide will help you architect,
              orchestrate, and deploy AI-generated systems locally and in the
              cloud.
            </p>
          </div>

          {/* SECTIONS */}
          <div className="space-y-24">
            {/* 1. INTRODUCTION */}
            <DocSection id="introduction" title="Introduction">
              <p className="text-gray-400 mb-6">
                XBLT eliminates the "Blank Canvas" paralysis. It is a
                desktop-first engine that bridges the gap between natural
                language ideas and production-grade code. Unlike web-based
                generators, XBLT has read/write access to your file system,
                enabling true iterative development.
              </p>
              <NoteBox type="info">
                XBLT is optimized for <strong>Next.js 14 (App Router)</strong>{" "}
                and <strong>Tailwind CSS</strong>. Support for Vue/Nuxt is in
                beta.
              </NoteBox>
            </DocSection>

            {/* 2. INSTALLATION */}
            <DocSection id="installation" title="Installation">
              <p className="text-gray-400 mb-6">
                Install the CLI globally to access the engine from your
                terminal. Ensure you have Node.js 18.17.0 or later installed.
              </p>
              <CodeWindow
                title="Terminal"
                code={`npm install -g xblt-cli\n\n# Initialize a new project\nxblt init my-saas-app`}
                lang="bash"
              />
              <p className="text-gray-400 mt-6 mb-4">
                Once installed, verify the version:
              </p>
              <CodeWindow
                title="Terminal"
                code={`xblt --version\n> xblt-core v2.4.0 (stable)`}
                lang="bash"
              />
            </DocSection>

            {/* 3. CORE ARCHITECTURE */}
            <DocSection id="architecture" title="Core Architecture">
              <p className="text-gray-400 mb-6">
                The engine operates on a{" "}
                <strong className="text-white">Triangular Agentic Graph</strong>
                . This ensures code integrity before it reaches your file
                system.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <ArchCard
                  title="Planner"
                  icon={<Brain />}
                  desc="Analyzes prompt. Outputs JSON schema. No code."
                />
                <ArchCard
                  title="Coder"
                  icon={<Code2 />}
                  desc="Ingests schema. Writes TSX/CSS. No context awareness."
                />
                <ArchCard
                  title="Critic"
                  icon={<ShieldCheck />}
                  desc="Runs linting & type checks. Rejects invalid output."
                />
              </div>

              <p className="text-gray-400 mb-4">
                This separation of concerns prevents the "Hallucination Loop"
                common in single-shot LLM generators.
              </p>
            </DocSection>

            {/* 4. THE PLANNER AGENT */}
            <DocSection id="planner-agent" title="The Planner Agent">
              <p className="text-gray-400 mb-6">
                The Planner is the brain. It does not speak code; it speaks
                Architecture. When you say "Build a dashboard," the planner
                generates a JSON manifest.
              </p>
              <CodeWindow
                title="planner_manifest.json"
                code={`{
  "project_type": "dashboard",
  "theme": "dark",
  "routes": [
    { "path": "/dashboard", "component": "Overview" },
    { "path": "/settings", "component": "SettingsForm" }
  ],
  "dependencies": ["recharts", "zod", "framer-motion"]
}`}
                lang="json"
              />
            </DocSection>

            {/* 5. LOCAL RAG */}
            <DocSection id="local-rag-setup" title="Local RAG Setup">
              <p className="text-gray-400 mb-6">
                XBLT Desktop can scan your previous projects to learn your
                coding style. This is done via a local Vector Database
                (ChromaDB) and LlamaIndex.
              </p>
              <CodeWindow
                title="xblt.config.ts"
                code={`export default {
  rag: {
    enabled: true,
    sources: ["./legacy-projects", "./design-system"],
    indexing: "hybrid" // Keyword + Vector
  }
}`}
                lang="typescript"
              />
              <NoteBox type="warning">
                Indexing large repositories (1GB+) may take several minutes on
                the first run.
              </NoteBox>
            </DocSection>
          </div>

          {/* Footer for Docs */}
          <div className="mt-32 pt-10 border-t border-white/10 flex justify-between text-sm text-gray-500">
            <span>Last updated: February 14, 2026</span>
            <a href="#" className="hover:text-[#E2F609] transition-colors">
              Edit this page on GitHub
            </a>
          </div>
        </main>

        {/* --- RIGHT SIDEBAR (TOC) --- */}
        <aside className="hidden xl:block w-64 fixed top-20 bottom-0 right-[max(0px,calc(50%-40rem))] overflow-y-auto p-6">
          <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4 pl-3 border-l-2 border-[#E2F609]">
            On This Page
          </h5>
          <ul className="space-y-1 border-l border-white/10">
            {DOC_SECTIONS.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`block pl-4 py-1 text-xs transition-colors ${activeId === section.id ? "text-[#E2F609] font-bold" : "text-gray-500 hover:text-white"}`}
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* --- MOBILE DRAWER --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-y-0 right-0 w-80 bg-[#0A0A0A] border-l border-white/10 z-60 p-6 shadow-2xl overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <span className="font-bold text-lg">Documentation</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <nav className="space-y-8">
              {NAV_TREE.map((group, i) => (
                <div key={i}>
                  <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">
                    {group.category}
                  </h4>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-gray-300 hover:text-[#E2F609]"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

const DocSection = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="scroll-mt-32">
    <h2 className="text-3xl font-bold mb-6 text-white group flex items-center gap-2">
      {title}
      <a
        href={`#${id}`}
        className="opacity-0 group-hover:opacity-100 text-[#E2F609] transition-opacity"
      >
        <Hash className="w-5 h-5" />
      </a>
    </h2>
    <div className="text-lg leading-relaxed">{children}</div>
  </section>
);

const CodeWindow = ({
  title,
  code,
  lang,
}: {
  title: string;
  code: string;
  lang: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden bg-[#0A0A0A] border border-white/10 group">
      <div className="flex justify-between items-center px-4 py-2 bg-white/5 border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
        </div>
        <div className="text-xs text-gray-500 font-mono">{title}</div>
        <button
          onClick={handleCopy}
          className="text-gray-500 hover:text-white transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-sm text-gray-300">
          <code className={`language-${lang}`}>{code}</code>
        </pre>
      </div>
    </div>
  );
};

const NoteBox = ({
  type,
  children,
}: {
  type: "info" | "warning";
  children: React.ReactNode;
}) => {
  const styles = {
    info: "bg-blue-500/10 border-blue-500/20 text-blue-200",
    warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-200",
  };
  const icons = {
    info: <Zap className="w-5 h-5 text-blue-400" />,
    warning: <Cpu className="w-5 h-5 text-yellow-400" />,
  };

  return (
    <div className={`p-4 rounded-lg border flex gap-4 ${styles[type]} my-6`}>
      <div className="shrink-0 mt-1">{icons[type]}</div>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
};

const ArchCard = ({ title, icon, desc }: any) => (
  <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#E2F609]/50 transition-colors">
    <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center text-[#E2F609] mb-4">
      {icon}
    </div>
    <h4 className="font-bold text-white mb-2">{title}</h4>
    <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
  </div>
);

export default XBLTDocs;
