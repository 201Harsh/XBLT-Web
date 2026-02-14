"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Zap,
  Code2,
  Globe,
  Flag,
  Terminal,
  HardDrive,
  Brain,
  GripHorizontal,
  Database,
  Cpu,
  Layers,
  Rocket,
  Sparkles,
  Lock,
  Workflow,
} from "lucide-react";
import Header from "../Components/Header";
import { Draggable } from "gsap/all";
import Footer from "../Components/Footer";

// Register GSAP Plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Draggable);
}

const XBLTAbout = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeStory, setActiveStory] = useState(0);

  // --- MOUSE PARALLAX LOGIC ---
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // --- GSAP ANIMATION LOGIC ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Draggable Code Window
      Draggable.create(".draggable-code", {
        bounds: heroRef.current,
        inertia: true,
        edgeResistance: 0.65,
        type: "x,y",
      });

      // 2. Pin the Story Visual
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: ".pinned-story",
        scrub: 1,
      });

      // 3. Animate Text Steps (Wiggle + Fade)
      gsap.utils.toArray(".story-step").forEach((step: any, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 60%",
            end: "bottom 40%",
            toggleActions: "play reverse play reverse",
            onEnter: () => setActiveStory(index),
            onEnterBack: () => setActiveStory(index),
          },
        });

        tl.fromTo(
          step,
          { opacity: 0.5, x: -30, filter: "blur(4px)" },
          { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.5 },
        ).to(
          step.querySelector(".chapter-num"),
          {
            x: 10,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
          },
          "<",
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white selection:bg-[#E2F609] selection:text-black font-sans overflow-x-hidden"
    >
      <Header />

      {/* --- HERO: INTERACTIVE PARALLAX --- */}
      <section
        ref={heroRef}
        className="relative h-screen flex flex-col justify-center items-center overflow-hidden border-b border-white/10 perspective-1000 bg-[#050505]"
      >
        {/* Layer 1: Glow Orb (Subtle) */}
        <motion.div
          className="absolute z-0 w-200 h-200 bg-[#E2F609]/5 blur-[150px] rounded-full pointer-events-none mix-blend-screen"
          animate={{ x: mousePos.x * 30, y: mousePos.y * 30 }}
        />

        {/* Layer 2: Main Content */}
        <div className="relative z-10 text-center px-6 pointer-events-none">
          <motion.div
            animate={{
              x: mousePos.x * 10,
              y: mousePos.y * 10,
              rotateX: mousePos.y * -5,
              rotateY: mousePos.x * 5,
            }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E2F609]/30 bg-[#E2F609]/5 text-[#E2F609] text-xs font-mono mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(226,246,9,0.2)]">
              <Flag className="w-3 h-3" />
              <span>EST. 2026 • THE CREATION ENGINE</span>
            </div>
            <h1 className="text-7xl md:text-[10rem] font-bold tracking-tighter mb-6 leading-[0.9] text-white drop-shadow-2xl">
              NOT A <br />
              <span className="text-transparent bg-clip-text bg-linear-to-b from-white to-gray-600">
                BUILDER.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              XBLT is an{" "}
              <span className="text-white font-bold border-b border-[#E2F609]">
                Orchestration Engine
              </span>{" "}
              that turns natural language into structured, production-ready
              systems.
            </p>
          </motion.div>
        </div>

        {/* Layer 3: DRAGGABLE TERMINAL */}
        <div className="draggable-code absolute z-20 top-[20%] right-[10%] cursor-grab active:cursor-grabbing hidden md:block">
          <div className="w-80 md:w-96 bg-[#050505]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-300 hover:border-[#E2F609]/50">
            <div className="h-8 bg-white/5 border-b border-white/5 flex items-center justify-between px-3 cursor-grab active:cursor-grabbing">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-mono text-gray-500">
                <GripHorizontal className="w-3 h-3" /> xblt_core.ts
              </div>
            </div>
            <div className="p-4 font-mono text-xs text-gray-400 leading-relaxed pointer-events-none select-none">
              <p>
                <span className="text-purple-400">import</span>{" "}
                {"{ Orchestrator }"}{" "}
                <span className="text-purple-400">from</span>{" "}
                <span className="text-green-400">'@xblt/core'</span>;
              </p>
              <br />
              <p>
                <span className="text-blue-400">const</span> engine ={" "}
                <span className="text-yellow-300">new</span> Orchestrator();
              </p>
              <br />
              <p className="text-[#E2F609] animate-pulse">{`> Awaiting Input...`}</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- TECH STACK MARQUEE --- */}
      <section className="py-10 border-b border-white/10 bg-white/2 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-4 text-center text-xs font-mono text-gray-500 uppercase tracking-widest">
          Powered By Best-In-Class Tech
        </div>
        <div className="flex gap-12 justify-center items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500 flex-wrap">
          <span className="text-lg font-bold flex items-center gap-2">
            <Cpu className="w-5 h-5" /> GROQ
          </span>
          <span className="text-lg font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5" /> GEMINI 1.5
          </span>
          <span className="text-lg font-bold flex items-center gap-2">
            <Terminal className="w-5 h-5" /> OLLAMA
          </span>
          <span className="text-lg font-bold flex items-center gap-2">
            <Code2 className="w-5 h-5" /> NEXT.JS 14
          </span>
          <span className="text-lg font-bold flex items-center gap-2">
            <Database className="w-5 h-5" /> ELECTRON
          </span>
          <span className="text-lg font-bold flex items-center gap-2">
            <Layers className="w-5 h-5" /> FRAMER MOTION
          </span>
        </div>
      </section>

      {/* --- PINNED SECTION: THE JOURNEY (12 CHAPTERS) --- */}
      <section ref={triggerRef} className="relative w-full bg-[#050505]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
          {/* LEFT: SCROLLING TEXT */}
          <div className="md:w-1/2 py-32 px-6 pb-[50vh]">
            <StoryChapter
              num="01"
              title="The Barrier"
              text="We realized a fundamental flaw in web development: Friction. Non-developers are locked out by syntax errors. Developers are slowed down by boilerplate."
            />

            <StoryChapter
              num="02"
              title="The Vision"
              text="We didn't want another template builder. We wanted an Engine. A system that respects the architecture of your idea and translates natural language directly into structural reality."
            />

            <StoryChapter
              num="03"
              title="Not A Toy"
              text="Most AI coding tools are 'black boxes' that spit out spaghetti code. XBLT generates clean, semantic, component-based code that you would be proud to commit."
            />

            <StoryChapter
              num="04"
              title="The Architect"
              text="We introduced the Planner Agent. Before a single line of code is written, XBLT maps out your application's routes, components, and data flow."
            />

            <StoryChapter
              num="05"
              title="Orchestration"
              text="Single-shot prompting is dead. XBLT uses Multi-Agent Orchestration. One agent designs, one codes, one critiques. This triangular loop ensures 99.9% syntax accuracy."
            />

            <StoryChapter
              num="06"
              title="The Stream"
              text="Waiting is painful. We built a custom WebSocket engine that streams the DOM updates in real-time. You don't wait for the build; you watch the creation unfold live."
            />

            <StoryChapter
              num="07"
              title="The Desktop Leap"
              text="Web browsers are sandboxes. To be a true OS, we moved to Desktop (Electron). Now XBLT has raw access to your file system, running dev servers and modifying files."
            />

            <StoryChapter
              num="08"
              title="Local LLMs"
              text="Privacy matters. We integrated Ollama support so you can run Llama 3 or Mistral locally on your machine. Your code never has to leave your device."
            />

            <StoryChapter
              num="09"
              title="The RAG Brain"
              text="This is the Singularity moment. Using local LlamaIndex, XBLT scans your previous projects. It learns your variable naming, your design tokens, and your coding style."
            />

            <StoryChapter
              num="10"
              title="Fluid State"
              text="Speak. See. Ship. Development becomes conversational. You describe a change, and the Engine refactors the code instantly. The barrier dissolves."
            />

            <StoryChapter
              num="11"
              title="The Future"
              text="XBLT is no longer just a tool. It is the Creation Operating System. We are building a future where anyone with an idea can architect a system at the speed of thought."
            />

            <StoryChapter
              num="12"
              title="Join Us"
              text="We are just getting started. The engine is warming up. Download XBLT today and become part of the new era of software architecture."
            />
          </div>

          {/* RIGHT: PINNED VISUAL */}
          <div className="hidden md:flex md:w-1/2 h-screen pinned-story sticky top-0 items-center justify-center p-12">
            <div className="relative w-full h-96 bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
              {/* Background Grid inside card */}
              <div className="absolute inset-0 bg-size-[40px_40px] bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]"></div>

              <AnimatePresence mode="wait">
                <StoryVisual index={activeStory} />
              </AnimatePresence>

              {/* Progress Bar */}
              <div className="absolute bottom-10 left-12 right-12 h-0.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#E2F609]"
                  animate={{ width: `${((activeStory + 1) / 12) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-40 bg-black text-center border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#E2F609]/5 blur-3xl pointer-events-none"></div>
        <h2 className="text-5xl md:text-8xl font-bold mb-8 relative z-10 text-white">
          READY TO <span className="text-[#E2F609]">ARCHITECT?</span>
        </h2>
        <button className="relative z-10 px-12 py-5 bg-[#E2F609] text-black font-bold text-xl rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(226,246,9,0.4)]">
          Download Engine v2.0
        </button>
      </section>

      <Footer />
    </div>
  );
};

/* --- SUB COMPONENTS --- */

const StoryChapter = ({ num, title, text }: any) => (
  <div className="story-step min-h-[60vh] flex flex-col justify-center border-l-2 border-transparent pl-8 ml-4 transition-all duration-500">
    <div className="chapter-num text-[#E2F609] font-mono text-sm mb-4 font-bold tracking-widest flex items-center gap-2">
      <span className="w-2 h-2 bg-[#E2F609] rounded-full"></span> CHAPTER {num}
    </div>
    <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
      {title}
    </h2>
    <p className="text-gray-400 text-lg leading-relaxed max-w-lg">{text}</p>
  </div>
);

const StoryVisual = ({ index }: { index: number }) => {
  const content = [
    {
      icon: <Lock className="w-24 h-24 text-red-500" />,
      title: "THE BARRIER",
      sub: "Syntax Locked",
    },
    {
      icon: <Flag className="w-24 h-24 text-white" />,
      title: "THE VISION",
      sub: "Idea → Reality",
    },
    {
      icon: <Code2 className="w-24 h-24 text-blue-500" />,
      title: "NOT A TOY",
      sub: "Clean Code",
    },
    {
      icon: <Brain className="w-24 h-24 text-purple-500" />,
      title: "ARCHITECT",
      sub: "Planner Agent",
    },
    {
      icon: <Workflow className="w-24 h-24 text-[#E2F609]" />,
      title: "ORCHESTRA",
      sub: "Multi-Agent",
    },
    {
      icon: <Zap className="w-24 h-24 text-yellow-400" />,
      title: "STREAMING",
      sub: "WebSocket DOM",
    },
    {
      icon: <HardDrive className="w-24 h-24 text-gray-400" />,
      title: "DESKTOP OS",
      sub: "File System",
    },
    {
      icon: <Terminal className="w-24 h-24 text-orange-500" />,
      title: "LOCAL LLM",
      sub: "Ollama / Mistral",
    },
    {
      icon: <Database className="w-24 h-24 text-pink-500" />,
      title: "RAG MEMORY",
      sub: "Context Aware",
    },
    {
      icon: <Sparkles className="w-24 h-24 text-cyan-400" />,
      title: "FLUIDITY",
      sub: "Flow State",
    },
    {
      icon: <Rocket className="w-24 h-24 text-white" />,
      title: "THE FUTURE",
      sub: "Creation OS",
    },
    {
      icon: <Globe className="w-24 h-24 text-green-500" />,
      title: "JOIN US",
      sub: "Global Network",
    },
  ];

  const item = content[index] || content[0];

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
      animate={{ opacity: 1, rotateY: 0, scale: 1 }}
      exit={{ opacity: 0, rotateY: -90, scale: 0.8 }}
      transition={{ duration: 0.5, ease: "backOut" }}
      className="flex flex-col items-center justify-center h-full w-full"
    >
      <div className="mb-8 p-10 bg-white/5 rounded-full border border-white/10 shadow-[0_0_60px_rgba(255,255,255,0.05)] scale-110">
        {item.icon}
      </div>
      <h3 className="text-5xl font-bold mb-2 text-white uppercase tracking-tighter">
        {item.title}
      </h3>
      <div className="px-3 py-1 border border-[#E2F609]/30 bg-[#E2F609]/10 text-[#E2F609] font-mono text-xs tracking-widest uppercase rounded">
        SYS_CORE :: {item.sub}
      </div>

      <div className="absolute top-10 left-10 w-8 h-8 border-t-2 border-l-2 border-white/20"></div>
      <div className="absolute bottom-10 right-10 w-8 h-8 border-b-2 border-r-2 border-white/20"></div>
    </motion.div>
  );
};

export default XBLTAbout;
