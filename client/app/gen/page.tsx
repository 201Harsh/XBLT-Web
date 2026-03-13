"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Terminal,
  Cpu,
  Globe,
  Layers,
  Code2,
  FileJson,
  Lock,
  HardDrive,
  Command,
  Download,
  FolderOpen,
} from "lucide-react";
import GenHeader from "../Components/gen/GenHeader";
import Footer from "../Components/Footer"; // Make sure path is correct!
import { Draggable } from "gsap/all";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Draggable);
}

// --- MAGNETIC BUTTON MICRO-INTERACTION ---
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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex items-center justify-between px-8 py-5 bg-[#E2F609] rounded-2xl text-black font-bold text-lg overflow-hidden shadow-[0_0_30px_rgba(226,246,9,0.2)] hover:shadow-[0_0_60px_rgba(226,246,9,0.5)] transition-shadow cursor-pointer w-full sm:w-auto min-w-[320px] z-50"
    >
      <span className="relative z-10 flex items-center gap-3">
        <Command className="w-6 h-6" />
        <div className="flex flex-col items-start leading-tight">
          <span>Download Engine</span>
          <span className="text-[11px] font-mono opacity-80 uppercase tracking-wider">
            Mac | Win | Linux (Parrot OS)
          </span>
        </div>
      </span>
      <div className="relative z-10 w-10 h-10 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-[#E2F609] transition-all duration-300">
        <Download className="w-5 h-5" />
      </div>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
    </motion.button>
  );
};

// --- BACKGROUND PARTICLES ---
const BackgroundParticles = () => {
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
    char: Math.random() > 0.5 ? "1" : "0",
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-[#E2F609]/20 font-mono text-xs select-none"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ y: [0, -200], opacity: [0, 1, 0] }}
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

export default function XBLTDesktopPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the Visualizer
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: ".pinned-visual",
        scrub: 1,
      });

      // Animate the text steps
      const steps = gsap.utils.toArray(".feature-step");
      steps.forEach((step: any, index) => {
        gsap.fromTo(
          step,
          { opacity: 0.2, filter: "blur(5px)" },
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.5,
            scrollTrigger: {
              trigger: step,
              start: "top center",
              end: "bottom center",
              toggleActions: "play reverse play reverse",
              onEnter: () => setActiveFeature(index),
              onEnterBack: () => setActiveFeature(index),
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-[#E2F609] selection:text-black"
    >
      <GenHeader />

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden border-b border-white/10 bg-black perspective-1000">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#E2F609]/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"></div>

        <BackgroundParticles />

        <div className="max-w-7xl mx-auto px-6 relative z-20 text-center mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "circOut" }}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E2F609]/30 bg-[#E2F609]/5 text-[#E2F609] text-xs font-mono mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(226,246,9,0.2)]"
            >
              <Terminal className="w-3 h-3 animate-pulse" />
              <span className="tracking-widest">SYSTEM ARCHITECTURE V2.0</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-8 leading-[0.9]">
              ESCAPE THE <br />
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-[#E2F609]/20 blur-lg opacity-50 animate-pulse"></span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-b from-[#E2F609] to-[#8a9600] drop-shadow-2xl italic pr-2">
                  SANDBOX.
                </span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12"
            >
              Web builders are toys. XBLT is an Operating System.{" "}
              <br className="hidden md:block" />
              Unlock native file-system access,{" "}
              <span className="text-white font-bold border-b border-[#E2F609]">
                local LLM inference
              </span>
              , and zero-latency generation.
            </motion.p>

            <div className="flex justify-center">
              <MagneticButton />
            </div>
          </motion.div>
        </div>

        {/* SYSTEM STATUS BAR */}
        <div className="absolute bottom-0 w-full border-t border-white/10 bg-black/50 backdrop-blur-sm z-30">
          <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-widest">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>{" "}
                ENGINE: ONLINE
              </span>
              <span className="hidden md:block">LATENCY: 1.2ms</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#E2F609]">READ/WRITE: ENABLED</span>
              <span className="hidden md:block">MEM: 64GB ALLOCATED</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- PINNED SCROLL SECTION --- */}
      <section ref={triggerRef} className="relative w-full bg-[#050505]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
          {/* LEFT: SCROLLING TEXT */}
          <div className="md:w-1/2 py-32 px-6 pb-[50vh]">
            <FeatureStep
              title="1. Neural Scaffold"
              subtitle="GROQ LPU"
              icon={<Cpu />}
              desc="XBLT doesn't just write code; it plans architecture. Powered by LLaMA 3 on Groq, the engine builds a dependency graph and pre-allocates file structures at 800 tokens/sec."
            />
            <FeatureStep
              title="2. Direct Injection"
              subtitle="FILE SYSTEM WRITE"
              icon={<HardDrive />}
              desc="Bypassing the virtual DOM, XBLT injects code directly into your local storage. Watch package.json update natively."
            />
            <FeatureStep
              title="3. The Live Matrix"
              subtitle="ZERO LATENCY"
              icon={<Code2 />}
              desc="Modifications happen instantly. Gemini 3 Flash streams production-ready HTML, Tailwind, and GSAP math directly to your IDE."
            />
            <FeatureStep
              title="4. Local Privacy"
              subtitle="OLLAMA INTEGRATION"
              icon={<Lock />}
              desc="Privacy is absolute. XBLT Desktop natively integrates with Ollama, allowing you to run Mistral or LLaMA 3 locally. Zero telemetry."
            />
            <FeatureStep
              title="5. Global Edge Sync"
              subtitle="DEPLOYMENT"
              icon={<Globe />}
              desc="Once local tests pass, the engine shards your build and pushes it to the Edge Network across 32 global regions."
            />
          </div>

          {/* RIGHT: PINNED DYNAMIC VISUALIZER */}
          <div className="hidden md:flex md:w-1/2 h-screen pinned-visual sticky top-0 items-center justify-center p-6 lg:p-12">
            <div className="relative w-full h-[500px] bg-black border border-white/10 rounded-[30px] overflow-hidden shadow-2xl flex flex-col">
              {/* Window Header */}
              <div className="h-12 border-b border-white/10 flex items-center justify-between px-6 bg-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="font-mono text-xs text-[#E2F609] tracking-widest">
                  SYS_CORE ::{" "}
                  {
                    [
                      "GROQ_LPU",
                      "NATIVE_FS",
                      "GEMINI_STREAM",
                      "OLLAMA_LOCAL",
                      "EDGE_DEPLOY",
                    ][activeFeature]
                  }
                </div>
              </div>

              {/* Window Body */}
              <div className="flex-1 relative overflow-hidden p-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_51%)] bg-[size:100%_4px] pointer-events-none z-20 opacity-20"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-[#E2F609]/20 shadow-[0_0_20px_rgba(226,246,9,0.5)] z-20 animate-[scan_3s_ease-in-out_infinite]"></div>

                <AnimatePresence mode="wait">
                  {activeFeature === 0 && <VisualNeural key="0" />}
                  {activeFeature === 1 && <VisualFiles key="1" />}
                  {activeFeature === 2 && <VisualCode key="2" />}
                  {activeFeature === 3 && <VisualSecurity key="3" />}
                  {activeFeature === 4 && <VisualGlobe key="4" />}
                </AnimatePresence>
              </div>

              {/* Window Footer */}
              <div className="h-10 border-t border-white/10 flex items-center justify-between px-6 bg-white/5 text-[10px] font-mono text-gray-500">
                <span>CPU: 12%</span>
                <span>RAM: 4.2GB</span>
                <span>LATENCY: 0ms</span>
                <span className="text-[#E2F609]">LOCAL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA FOOTER --- */}
      <section className="py-40 bg-[#E2F609] text-black text-center relative overflow-hidden rounded-t-[60px] mt-20 mx-4 md:mx-10 mb-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center px-4">
          <FolderOpen className="w-16 h-16 mb-6 opacity-80" />
          <h2 className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-8">
            READY TO MOUNT <br /> YOUR DIRECTORY?
          </h2>
          <div className="bg-black text-white p-2 rounded-3xl">
            <MagneticButton />
          </div>
        </div>
      </section>

      <Footer />

      {/* GLOBAL CSS */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `,
        }}
      />
    </div>
  );
}

/* --- SUB COMPONENTS --- */

const FeatureStep = ({ title, subtitle, icon, desc }: any) => (
  <div className="feature-step min-h-[80vh] flex flex-col justify-center border-l-2 border-white/10 pl-8 ml-4 transition-colors hover:border-[#E2F609]/50">
    <div className="inline-flex items-center gap-2 text-[#E2F609] font-mono text-xs mb-4 uppercase tracking-widest font-bold">
      {icon} {subtitle}
    </div>
    <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
      {title}
    </h2>
    <p className="text-gray-400 text-lg leading-relaxed max-w-md">{desc}</p>
  </div>
);

// --- DYNAMIC VISUALIZERS ---

const VisualNeural = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.1 }}
    className="relative w-full h-full flex items-center justify-center"
  >
    <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-2 opacity-20">
      {[...Array(36)].map((_, i) => (
        <div
          key={i}
          className="bg-[#E2F609] rounded-sm"
          style={{ opacity: 0.1 + ((i * 13) % 10) / 20 }}
        ></div>
      ))}
    </div>
    <div className="relative z-10 bg-black/80 backdrop-blur-md border border-[#E2F609]/30 p-6 rounded-2xl w-64 text-center shadow-[0_0_50px_rgba(226,246,9,0.2)]">
      <Cpu className="w-16 h-16 text-[#E2F609] mx-auto mb-4 animate-pulse" />
      <div className="font-mono text-sm text-[#E2F609] mb-2">
        GROQ LPU ENGAGED
      </div>
      <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, repeat: Infinity }}
          className="h-full bg-[#E2F609]"
        ></motion.div>
      </div>
      <div className="mt-4 text-xs text-left text-gray-500 font-mono space-y-1">
        <p>{`> Parsing intents... OK`}</p>
        <p>{`> Structuring JSON... OK`}</p>
        <p className="text-[#E2F609]">{`> 800 Tokens/sec...`}</p>
      </div>
    </div>
  </motion.div>
);

const VisualFiles = () => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    className="w-full max-w-sm font-mono text-sm"
  >
    <div className="bg-[#0A0A0A] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between text-blue-400">
          <span className="flex items-center gap-2">
            <Layers className="w-4 h-4" /> /desktop_workspace
          </span>
          <span className="text-xs text-gray-600">LOCAL</span>
        </div>
        <div className="pl-4 space-y-2">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 text-yellow-300"
          >
            <FileJson className="w-4 h-4" /> package.json
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 text-gray-300"
          >
            <Terminal className="w-4 h-4" /> npm install
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-2 text-[#E2F609]"
          >
            <Code2 className="w-4 h-4" /> native_fs.ts{" "}
            <span className="text-[10px] bg-[#E2F609] text-black px-1 rounded">
              WRITE
            </span>
          </motion.div>
        </div>
      </div>
      <div className="bg-black p-3 text-xs text-gray-500 border-t border-white/10 text-[#E2F609]">
        {`> Successfully wrote to hard drive.`}
      </div>
    </div>
  </motion.div>
);

const VisualCode = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="w-full h-full p-4 relative flex items-center justify-center"
  >
    <div className="absolute top-4 right-4 text-[#E2F609] animate-pulse font-mono text-xs border border-[#E2F609]/30 px-2 py-1 rounded">
      SSE STREAM
    </div>
    <div className="font-mono text-sm text-gray-300 space-y-1 w-full bg-black p-6 rounded-xl border border-white/5">
      <p>
        <span className="text-purple-400">export default</span>{" "}
        <span className="text-blue-400">function</span>{" "}
        <span className="text-yellow-300">GhostCode</span>() {"{"}
      </p>
      <p className="pl-4">
        <span className="text-purple-400">return</span> (
      </p>
      <p className="pl-8 text-gray-500">
        {"<"}
        <span className="text-red-400">div</span>{" "}
        <span className="text-blue-300">className</span>=
        <span className="text-green-400">"bg-black"</span>
        {">"}
      </p>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
        className="pl-12 bg-[#E2F609]/20 text-[#E2F609] whitespace-nowrap overflow-hidden border-r-2 border-[#E2F609]"
      >
        Generating GSAP Animation...
      </motion.div>

      <p className="pl-8 text-gray-500">
        {"</"}
        <span className="text-red-400">div</span>
        {">"}
      </p>
      <p className="pl-4">);</p>
      <p>{"}"}</p>
    </div>
  </motion.div>
);

const VisualGlobe = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.5 }}
    className="relative w-full h-full flex items-center justify-center"
  >
    <div className="absolute inset-0 rounded-full border border-white/10 animate-ping [animation-duration:3s]"></div>
    <div className="absolute w-48 h-48 rounded-full border border-dashed border-[#E2F609]/30 animate-spin [animation-duration:10s]"></div>
    <Globe className="w-24 h-24 text-blue-500 relative z-10" />
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      className="absolute w-full h-full z-0"
    >
      <div className="absolute top-10 left-1/2 w-3 h-3 bg-[#E2F609] rounded-full shadow-[0_0_10px_#E2F609]"></div>
    </motion.div>
    <div className="absolute bottom-10 bg-black/80 px-4 py-2 rounded-full border border-white/10 text-xs font-mono">
      <span className="text-[#E2F609]">●</span> VERCEL EDGE: SYNCED
    </div>
  </motion.div>
);

const VisualSecurity = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex flex-col items-center justify-center w-full h-full"
  >
    <Lock className="w-20 h-20 text-white mb-6" />
    <div className="w-64 space-y-3">
      <div className="flex justify-between items-center text-xs font-mono text-gray-400 border-b border-white/5 pb-1">
        <span>OLLAMA STATUS</span>
        <span className="text-green-500">ONLINE</span>
      </div>
      <div className="flex justify-between items-center text-xs font-mono text-gray-400 border-b border-white/5 pb-1">
        <span>MODEL</span>
        <span className="text-[#E2F609]">LLaMA 3 (8B)</span>
      </div>
      <div className="flex justify-between items-center text-xs font-mono text-gray-400 border-b border-white/5 pb-1">
        <span>TELEMETRY</span>
        <span className="text-red-500">OFF</span>
      </div>
    </div>
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      className="mt-8 text-black bg-[#E2F609] text-sm font-bold font-mono tracking-widest px-4 py-2 rounded"
    >
      100% PRIVATE INFERENCE
    </motion.div>
  </motion.div>
);
