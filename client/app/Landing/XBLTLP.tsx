"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Zap,
  Download,
  Sparkles,
  Command,
  Terminal,
  Cpu,
  Globe,
  Layers,
  GripHorizontal,
  Code2,
  FileJson,
  Lock,
  HardDrive,
  Workflow,
  Crosshair,
  Rocket,
  BrainCircuit,
  Boxes,
} from "lucide-react";
import Footer from "../Components/Footer";
import { Draggable } from "gsap/all";
import Header from "../Components/Header";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Draggable);
}

const MagneticButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.2;
    const y = (e.clientY - top - height / 2) * 0.2;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex items-center justify-between px-8 py-5 bg-[#E2F609] rounded-full text-black font-bold text-lg overflow-hidden shadow-[0_0_40px_rgba(226,246,9,0.3)] hover:shadow-[0_0_60px_rgba(226,246,9,0.6)] transition-shadow cursor-pointer z-50 min-w-70"
    >
      <span className="relative z-10 flex items-center gap-3">
        <Command className="w-6 h-6" />
        <span className="tracking-tight">Download XBLT OS</span>
      </span>
      <div className="relative z-10 w-10 h-10 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-[#E2F609] transition-all duration-300">
        <Download className="w-5 h-5" />
      </div>
      <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
    </motion.button>
  );
};

const BackgroundParticles = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      char: Math.random() > 0.5 ? "1" : "0",
    }));
    setParticles(generated);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-[#E2F609]/20 font-mono text-xs select-none blur-[1px]"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ y: [0, -150], opacity: [0, 1, 0] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        >
          {p.char}
        </motion.div>
      ))}
    </div>
  );
};

export default function XBLTLP() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const boltRef = useRef<SVGSVGElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeStory, setActiveStory] = useState(0);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const yHeroText = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
  const yHeroBolt = useTransform(scrollYProgress, [0, 0.2], [0, 300]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      Draggable.create(".draggable-code", {
        bounds: heroRef.current,
        inertia: true,
        edgeResistance: 0.65,
        type: "x,y",
      });

      gsap.to(boltRef.current, {
        filter: "drop-shadow(0 0 80px rgba(226, 246, 9, 0.7))",
        scale: 1.05,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut",
      });

      gsap.utils.toArray(".gsap-reveal").forEach((elem: any) => {
        gsap.fromTo(
          elem,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: elem, start: "top 85%" },
          },
        );
      });

      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: ".pinned-visual",
        scrub: 1,
      });

      gsap.utils.toArray(".story-step").forEach((step: any, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 50%",
            end: "bottom 50%",
            toggleActions: "play reverse play reverse",
            onEnter: () => setActiveStory(index),
            onEnterBack: () => setActiveStory(index),
          },
        });

        tl.fromTo(
          step,
          { opacity: 0.2, x: -30, filter: "blur(4px)" },
          { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.4 },
        ).to(
          step.querySelector(".chapter-num"),
          { x: 10, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.inOut" },
          "<",
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#050505] text-white selection:bg-[#E2F609] selection:text-black overflow-x-hidden font-sans"
    >
      <Header />

      <section
        ref={heroRef}
        className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden border-b border-white/5 perspective-1000"
      >
        <BackgroundParticles />
        <motion.div
          className="absolute z-0 w-200 h-200 bg-[#E2F609]/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"
          animate={{ x: mousePos.x * 60, y: mousePos.y * 60 }}
          transition={{ type: "tween", ease: "backOut", duration: 1 }}
        />
        <motion.svg
          ref={boltRef}
          style={{ y: yHeroBolt }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-150 -z-10 opacity-10 pointer-events-none"
          viewBox="0 0 20 23"
          fill="none"
          stroke="#E2F609"
          strokeWidth="0.2"
        >
          <path
            d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
        <motion.div
          style={{ y: yHeroText, opacity: opacityHero }}
          className="relative z-10 w-full max-w-5xl flex flex-col items-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E2F609]/30 bg-[#E2F609]/10 text-[#E2F609] text-xs font-mono mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(226,246,9,0.2)]"
          >
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span className="tracking-widest">NATIVE EDITOR IS LIVE</span>
          </motion.div>
          <motion.h1
            className="text-6xl md:text-8xl lg:text-[9rem] font-extrabold tracking-tighter leading-[0.85] mb-6"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: "circOut" }}
          >
            BUILD AT <br />
            <span className="text-transparent bg-clip-text bg-linear-to-b from-[#E2F609] to-[#8a9600] italic pr-2">
              LIGHTNING SPEED.
            </span>
          </motion.h1>
          <motion.p
            className="text-gray-400 text-xl md:text-2xl max-w-2xl mb-12 leading-relaxed font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            VS Code gave you extensions. Cursor gave you autocomplete. XBLT
            gives you an autonomous engineering team inside your local file
            system.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <MagneticButton />
          </motion.div>
        </motion.div>

        <div className="draggable-code absolute z-30 top-[25%] right-[10%] cursor-grab active:cursor-grabbing hidden xl:block">
          <div className="w-80 bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transform rotate-6 hover:rotate-0 transition-transform duration-300 hover:border-[#E2F609]/50">
            <div className="h-8 bg-white/5 border-b border-white/10 flex items-center justify-between px-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-mono text-gray-400">
                <GripHorizontal className="w-3 h-3" /> xblt_workspace.ts
              </div>
            </div>
            <div className="p-5 font-mono text-xs text-gray-300 leading-loose pointer-events-none select-none">
              <p>
                <span className="text-purple-400">import</span> {"{ Editor }"}{" "}
                <span className="text-purple-400">from</span>{" "}
                <span className="text-green-300">'@xblt/core'</span>;
              </p>
              <br />
              <p>
                <span className="text-gray-500">
                  // Bypassing browser limits
                </span>
              </p>
              <p>
                <span className="text-blue-400">await</span> Editor.
                <span className="text-yellow-200">mountToFS</span>();
              </p>
              <br />
              <p className="text-[#E2F609] animate-pulse">{`> Root access granted.`}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full border-y border-white/5 bg-[#0A0A0A] py-8 overflow-hidden relative flex flex-col items-center justify-center">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-[#050505] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-[#050505] to-transparent z-10" />
        <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-6">
          Powered by Elite Architecture
        </span>
        <motion.div
          className="flex gap-16 items-center whitespace-nowrap opacity-40 grayscale"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 items-center">
              <span className="text-2xl font-bold flex items-center gap-2">
                <Cpu className="w-6 h-6" /> GROQ LPU
              </span>
              <span className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="w-6 h-6" /> GEMINI FLASH
              </span>
              <span className="text-2xl font-bold flex items-center gap-2">
                <Globe className="w-6 h-6" /> VERCEL EDGE
              </span>
              <span className="text-2xl font-bold flex items-center gap-2">
                <Code2 className="w-6 h-6" /> NEXT.JS
              </span>
              <span className="text-2xl font-bold flex items-center gap-2">
                <Terminal className="w-6 h-6" /> OLLAMA
              </span>
              <span className="text-2xl font-bold flex items-center gap-2">
                <Layers className="w-6 h-6" /> LANGGRAPH
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <section
        ref={triggerRef}
        className="relative w-full bg-[#050505] border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
          <div className="md:w-1/2 py-32 px-6 pb-[50vh]">
            <StoryChapter
              num="01"
              title="The Evolution."
              icon={<Crosshair />}
              text="VS Code gave us syntax highlighting. Cursor gave us autocomplete. XBLT throws out the autocomplete paradigm entirely. It acts as an autonomous agent."
            />
            <StoryChapter
              num="02"
              title="The Architect."
              icon={<BrainCircuit />}
              text="Before writing a single line of code, the Groq LPU acts as the Architect. It analyzes your prompt, plans the component tree, and structures the JSON payload."
            />
            <StoryChapter
              num="03"
              title="Orchestration."
              icon={<Workflow />}
              text="XBLT uses LangGraph to route tasks. One agent designs, one codes, one critiques. This multi-agent loop ensures 99.9% syntax accuracy."
            />
            <StoryChapter
              num="04"
              title="Direct Injection."
              icon={<HardDrive />}
              text="Stop copying code from chat windows. XBLT uses native OS hooks to directly manipulate your local directory, writing Next.js setups directly to your hard drive."
            />
            <StoryChapter
              num="05"
              title="Zero Latency."
              icon={<Code2 />}
              text="Powered by Gemini 3 Flash, XBLT streams HTML, Tailwind CSS, and GSAP math directly into your IDE buffer via Server-Sent Events (SSE)."
            />
            <StoryChapter
              num="06"
              title="Auto Node Modules."
              icon={<Boxes />}
              text="XBLT doesn't just write code. It executes your CLI. It will automatically detect missing packages and run `npm install` directly in your background terminal."
            />
            <StoryChapter
              num="07"
              title="The Live Matrix."
              icon={<Zap />}
              text="See changes instantly. Because XBLT modifies your local files, your existing Webpack or Turbopack setup handles the Hot Module Replacement automatically."
            />
            <StoryChapter
              num="08"
              title="Absolute Privacy."
              icon={<Lock />}
              text="Corporate tools steal your code for training. XBLT integrates natively with Ollama. Switch off the cloud and run LLaMA 3 completely locally."
            />
            <StoryChapter
              num="09"
              title="Global Edge Sync."
              icon={<Globe />}
              text="Once your local architecture passes the visual checks, the XBLT engine shards your build and deploys it directly to the Vercel Edge Network."
            />
            <StoryChapter
              num="10"
              title="The Future."
              icon={<Rocket />}
              text="XBLT Studio is the Creation Operating System. We are building a future where anyone with an idea can architect a production system at the speed of thought."
            />
          </div>

          <div className="hidden md:flex md:w-1/2 h-screen pinned-visual sticky top-0 items-center justify-center p-6 lg:p-12">
            <div className="relative w-full h-137.5 bg-[#0A0A0A] border border-white/10 rounded-[30px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex flex-col">
              <div className="h-12 border-b border-white/10 flex items-center justify-between px-6 bg-white/5 backdrop-blur-md">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="font-mono text-xs text-[#E2F609] tracking-widest uppercase">
                  XBLT_CORE :: CHAPTER{" "}
                  {String(activeStory + 1).padStart(2, "0")}
                </div>
              </div>

              <div className="flex-1 relative overflow-hidden p-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-[linear-linear(to_bottom,transparent_50%,rgba(0,0,0,0.3)_51%)] bg-size-[100%_4px] pointer-events-none z-20 opacity-20"></div>

                <AnimatePresence mode="wait">
                  <DynamicStoryVisual key={activeStory} index={activeStory} />
                </AnimatePresence>
              </div>

              <div className="relative h-12 border-t border-white/10 bg-white/5 flex items-center justify-between px-6">
                <div
                  className="absolute top-0 left-0 h-0.5 bg-[#E2F609] shadow-[0_0_10px_#E2F609]"
                  style={{
                    width: `${((activeStory + 1) / 10) * 100}%`,
                    transition: "width 0.3s ease",
                  }}
                />
                <div className="font-mono text-[10px] text-gray-500 flex w-full justify-between">
                  <span>
                    CPU:{" "}
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      {12 + activeStory}%
                    </motion.span>
                  </span>
                  <span>MEM: ALLOCATED</span>
                  <span className="text-[#E2F609]">SYS_ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <motion.div
        className="fixed bottom-0 left-0 right-0 h-1.5 bg-[#E2F609] origin-left z-50 shadow-[0_0_10px_#E2F609]"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}

const StoryChapter = ({ num, title, icon, text }: any) => (
  <div className="story-step min-h-[60vh] flex flex-col justify-center border-l-2 border-transparent pl-8 ml-4 transition-all duration-500">
    <div className="chapter-num text-[#E2F609] font-mono text-sm mb-4 font-bold tracking-widest flex items-center gap-2">
      <span className="w-2 h-2 bg-[#E2F609] rounded-full"></span> CHAPTER {num}
    </div>
    <div className="flex items-center gap-4 mb-6">
      <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-white">
        {icon}
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
        {title}
      </h2>
    </div>
    <p className="text-gray-400 text-lg leading-relaxed max-w-md">{text}</p>
  </div>
);

const DynamicStoryVisual = ({ index }: { index: number }) => {
  const renderVisual = () => {
    switch (index) {
      case 0:
        return (
          <div className="w-full max-w-xs space-y-6 font-mono text-sm">
            <div className="flex flex-col gap-2 opacity-50">
              <div className="flex justify-between text-gray-500">
                <span>VS CODE</span>
                <span>Syntax</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full">
                <motion.div
                  animate={{ width: ["0%", "30%"] }}
                  transition={{ duration: 1 }}
                  className="h-full bg-blue-500 rounded-full"
                ></motion.div>
              </div>
            </div>
            <div className="flex flex-col gap-2 opacity-70">
              <div className="flex justify-between text-gray-400">
                <span>CURSOR</span>
                <span>Autocomplete</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full">
                <motion.div
                  animate={{ width: ["0%", "60%"] }}
                  transition={{ duration: 1.5 }}
                  className="h-full bg-white rounded-full"
                ></motion.div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-[#E2F609] font-bold">
                <span>XBLT STUDIO</span>
                <span>Autonomous Engineering</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                  animate={{ width: ["0%", "100%"] }}
                  transition={{ duration: 2, ease: "circOut" }}
                  className="h-full bg-[#E2F609] shadow-[0_0_10px_#E2F609] rounded-full relative overflow-hidden"
                >
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-white/50 w-1/2 skew-x-12"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="relative w-full h-full flex items-center justify-center font-mono">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-dashed border-[#E2F609]/20 rounded-full w-64 h-64 m-auto"
            />
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-64 h-64 m-auto flex items-center"
                style={{ rotate: i * 90 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                  className="w-4 h-4 bg-[#E2F609] rounded-full shadow-[0_0_15px_#E2F609] -ml-2"
                />
              </motion.div>
            ))}
            <Cpu className="w-16 h-16 text-[#E2F609] mx-auto relative z-10" />
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute bottom-10 text-xs text-[#E2F609] tracking-widest"
            >
              BUILDING GRAPH...
            </motion.div>
          </div>
        );
      case 2:
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center font-mono text-xs">
            <div className="relative w-48 h-48">
              <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 p-3 bg-black border border-blue-500/50 text-blue-400 rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.3)] z-10">
                PLANNER
              </motion.div>
              <motion.div className="absolute bottom-0 left-0 p-3 bg-black border border-green-500/50 text-green-400 rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.3)] z-10">
                CODER
              </motion.div>
              <motion.div className="absolute bottom-0 right-0 p-3 bg-black border border-yellow-500/50 text-yellow-400 rounded-lg shadow-[0_0_20px_rgba(234,179,8,0.3)] z-10">
                CRITIQUE
              </motion.div>
              <svg className="absolute inset-0 w-full h-full -z-10 opacity-30">
                <motion.polygon
                  points="96,20 20,180 172,180"
                  fill="none"
                  stroke="#E2F609"
                  strokeWidth="2"
                  strokeDasharray="10 5"
                  animate={{ strokeDashoffset: [0, -100] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                />
              </svg>
              <Workflow className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white opacity-50" />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="font-mono text-xs w-full max-w-xs bg-[#0A0A0A] p-6 rounded-xl border border-white/10 shadow-2xl overflow-hidden relative">
            <div className="flex items-center gap-2 text-blue-400 mb-6 pb-2 border-b border-white/10">
              <HardDrive className="w-5 h-5" /> /local_machine/app
            </div>
            <div className="space-y-4">
              {["layout.tsx", "page.tsx", "globals.css", "utils.ts"].map(
                (file, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.3,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                    className="text-gray-300 flex items-center justify-between bg-white/5 p-2 rounded"
                  >
                    <span className="flex items-center gap-2">
                      <FileJson className="w-4 h-4 text-yellow-300" /> {file}
                    </span>
                    <span className="text-[9px] bg-[#E2F609]/20 text-[#E2F609] px-1.5 py-0.5 rounded border border-[#E2F609]/30">
                      INJECTED
                    </span>
                  </motion.div>
                ),
              )}
            </div>
            <motion.div
              className="absolute top-0 left-0 w-1 h-full bg-[#E2F609]"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        );
      case 4:
        return (
          <div className="font-mono text-xs w-full max-w-sm bg-black p-6 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden">
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute top-4 right-4 text-[#E2F609] bg-[#E2F609]/10 px-2 py-1 rounded text-[10px] border border-[#E2F609]/30 flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 bg-[#E2F609] rounded-full" /> LIVE SSE
            </motion.div>
            <div className="space-y-2 mt-4 text-gray-300">
              <p>
                <span className="text-purple-400">const</span>{" "}
                <span className="text-blue-400">Stream</span> ={" "}
                <span className="text-yellow-300">()</span> {"=>"} {"{"}
              </p>
              <div className="pl-4 border-l border-white/10 ml-2 py-2">
                <motion.p
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="whitespace-nowrap overflow-hidden text-green-400"
                >
                  return {"<"}div className="absolute inset-0"{">"}
                </motion.p>
                <motion.p
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 2,
                    delay: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="whitespace-nowrap overflow-hidden text-blue-300 pl-4"
                >
                  {"<"}h1{">"}Compiling Native...{"</"}h1{">"}
                </motion.p>
              </div>
              <p>{"}"}</p>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="font-mono text-[11px] w-full max-w-sm bg-[#050505] p-5 rounded-xl border border-gray-800 shadow-2xl text-green-400">
            <div className="flex gap-2 mb-4 border-b border-white/10 pb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <p className="text-gray-500">user@xblt:~/project$</p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 4 }}
              className="text-white mt-2"
            >
              Checking dependencies...
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.5,
                duration: 0.1,
                repeat: Infinity,
                repeatDelay: 4,
              }}
              className="text-yellow-400 mt-1"
            >
              Missing: framer-motion, lucide-react
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 1,
                duration: 0.1,
                repeat: Infinity,
                repeatDelay: 4,
              }}
              className="text-green-400 mt-2"
            >
              {">"} npm install framer-motion lucide-react
            </motion.p>
            <div className="mt-2 space-y-1">
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{
                  delay: 1.5,
                  duration: 2,
                  ease: "linear",
                  repeat: Infinity,
                  repeatDelay: 4,
                }}
                className="h-1 bg-white/20 rounded-full"
              >
                <div className="h-full bg-blue-500 w-full" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 3.5,
                  duration: 0.1,
                  repeat: Infinity,
                  repeatDelay: 4,
                }}
                className="text-gray-400"
              >
                added 12 packages in 2s
              </motion.p>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="relative flex justify-center items-center h-full w-full">
            <motion.div
              animate={{ scale: [1, 2, 2.5], opacity: [0.8, 0, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
              className="absolute w-24 h-24 border-2 border-[#E2F609] rounded-full"
            ></motion.div>
            <motion.div
              animate={{ scale: [1, 1.5, 2], opacity: [0.5, 0, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                delay: 0.5,
                ease: "easeOut",
              }}
              className="absolute w-24 h-24 border border-[#E2F609] rounded-full"
            ></motion.div>
            <div className="w-32 h-32 bg-[#E2F609]/10 border border-[#E2F609]/30 rounded-full flex items-center justify-center backdrop-blur-sm z-10">
              <Zap className="w-16 h-16 text-[#E2F609] fill-[#E2F609]" />
            </div>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-32 bg-linear-to-b from-transparent via-[#E2F609] to-transparent"
                style={{ left: `${20 + i * 15}%` }}
                animate={{ y: ["-200%", "200%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5 + Math.random(),
                  delay: i * 0.2,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        );
      case 7:
        return (
          <div className="text-center font-mono relative">
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="inline-block relative"
            >
              <Lock className="w-20 h-20 text-white mb-8" />
              <motion.div
                animate={{ y: [0, 80, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-[-20%] w-[140%] h-0.5 bg-[#E2F609] shadow-[0_0_15px_#E2F609]"
              />
            </motion.div>
            <div className="space-y-3 text-xs bg-black/50 p-4 rounded-xl border border-white/5">
              <div className="flex justify-between w-56 border-b border-white/10 pb-2">
                <span>OLLAMA ENGINE</span>
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="text-green-500"
                >
                  CONNECTED
                </motion.span>
              </div>
              <div className="flex justify-between w-56 border-b border-white/10 pb-2">
                <span>LOCAL MODEL</span>
                <span className="text-[#E2F609]">LLAMA3 (8B)</span>
              </div>
              <div className="flex justify-between w-56 border-b border-white/10 pb-2">
                <span>DATA TELEMETRY</span>
                <span className="text-red-500 font-bold tracking-widest">
                  BLOCKED
                </span>
              </div>
            </div>
          </div>
        );
      case 8:
        return (
          <div className="relative flex items-center justify-center w-full h-full">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute w-64 h-64 rounded-full border border-dashed border-blue-500/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute w-48 h-48 rounded-full border border-white/10"
            >
              <div className="w-3 h-3 bg-[#E2F609] rounded-full absolute -top-1.5 left-1/2 -translate-x-1/2 shadow-[0_0_15px_#E2F609]" />
              <div className="w-3 h-3 bg-blue-400 rounded-full absolute -bottom-1.5 left-1/2 -translate-x-1/2 shadow-[0_0_15px_#60A5FA]" />
            </motion.div>
            <Globe className="w-24 h-24 text-blue-500 relative z-10" />
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-10 text-xs font-mono text-[#E2F609] bg-[#E2F609]/10 px-3 py-1 rounded-full border border-[#E2F609]/30"
            >
              VERCEL EDGE: SYNCING...
            </motion.div>
          </div>
        );
      case 9:
        return (
          <div className="relative flex flex-col items-center justify-center">
            <motion.div
              animate={{ y: [-2, 2, -2], x: [-1, 1, -1] }}
              transition={{ duration: 0.1, repeat: Infinity }}
              className="relative z-10"
            >
              <Rocket className="w-32 h-32 text-white" strokeWidth={1} />
            </motion.div>
            <div className="absolute top-25 w-full flex justify-center z-0">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, 100], scale: [1, 2], opacity: [1, 0] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                  className="w-4 h-4 bg-linear-to-b from-[#E2F609] to-red-500 rounded-full absolute"
                  style={{ left: `calc(50% + ${(i - 2.5) * 10}px)` }}
                />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full h-full flex items-center justify-center"
    >
      {renderVisual()}
    </motion.div>
  );
};
