"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Zap,
  Download,
  Sparkles,
  Command,
  ArrowRight,
  Terminal,
  Cpu,
  Globe,
  WifiOff,
  Layers,
  ShieldCheck,
  GripHorizontal,
  Code2,
} from "lucide-react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { Draggable } from "gsap/all";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Draggable);
}

// --- MAGNETIC BUTTON ---
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
      className="group relative flex items-center justify-between px-8 py-5 bg-[#E2F609] rounded-full text-black font-bold text-lg overflow-hidden shadow-[0_0_40px_rgba(226,246,9,0.3)] hover:shadow-[0_0_60px_rgba(226,246,9,0.6)] transition-shadow cursor-pointer z-50 min-w-[280px]"
    >
      <span className="relative z-10 flex items-center gap-3">
        <Command className="w-6 h-6" />
        <span className="tracking-tight">Download XBLT Studio</span>
      </span>
      <div className="relative z-10 w-10 h-10 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-[#E2F609] transition-all duration-300">
        <Download className="w-5 h-5" />
      </div>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
    </motion.button>
  );
};

// --- HYDRATION-SAFE PARTICLES ---
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Scroll Parallax variables
  const { scrollYProgress } = useScroll({ target: containerRef });
  const yHeroText = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
  const yHeroBolt = useTransform(scrollYProgress, [0, 0.2], [0, 300]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Mouse Parallax tracking
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
      // 1. Draggable Terminal in Hero
      Draggable.create(".draggable-code", {
        bounds: heroRef.current,
        inertia: true,
        edgeResistance: 0.65,
        type: "x,y",
      });

      // 2. Bolt Pulse Animation
      gsap.to(boltRef.current, {
        filter: "drop-shadow(0 0 80px rgba(226, 246, 9, 0.7))",
        scale: 1.05,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut",
      });

      // 3. Staggered Scroll Reveals
      const revealElements = gsap.utils.toArray(".gsap-reveal");
      revealElements.forEach((elem: any) => {
        gsap.fromTo(
          elem,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 85%",
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
      className="min-h-screen bg-[#050505] text-white selection:bg-[#E2F609] selection:text-black overflow-x-hidden font-sans"
    >
      <Header />

      <section
        ref={heroRef}
        className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden border-b border-white/5 perspective-1000"
      >
        <BackgroundParticles />

        {/* Dynamic Glow following mouse */}
        <motion.div
          className="absolute z-0 w-[800px] h-[800px] bg-[#E2F609]/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"
          animate={{ x: mousePos.x * 60, y: mousePos.y * 60 }}
          transition={{ type: "tween", ease: "backOut", duration: 1 }}
        />

        {/* Parallax Bolt Background */}
        <motion.svg
          ref={boltRef}
          style={{ y: yHeroBolt }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] -z-10 opacity-10 pointer-events-none"
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
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#E2F609] to-[#8a9600] italic pr-2">
              LIGHTNING SPEED.
            </span>
          </motion.h1>

          <motion.p
            className="text-gray-400 text-xl md:text-2xl max-w-2xl mb-12 leading-relaxed font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Web builders are dead. Download the XBLT Code Editor and inject
            production-ready architectures directly into your local file system.{" "}
            <span className="text-white border-b border-[#E2F609]">
              Instantly.
            </span>
          </motion.p>

          {/* THE SINGLE, DOMINANT CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <MagneticButton />
          </motion.div>
        </motion.div>

        {/* DRAGGABLE TERMINAL (From the About page reference) */}
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
                  // Native injection initialized
                </span>
              </p>
              <p>
                <span className="text-blue-400">await</span> Editor.
                <span className="text-yellow-200">mountToFS</span>();
              </p>
              <br />
              <p className="text-[#E2F609] animate-pulse">{`> File system linked.`}</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- INFINITE MARQUEE --- */}
      <div className="w-full border-y border-white/5 bg-[#0A0A0A] py-8 overflow-hidden relative flex flex-col items-center justify-center">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />

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

      {/* --- THE PROBLEM --- */}
      <section className="py-32 bg-[#050505] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24 text-center">
            <h2 className="gsap-reveal text-4xl md:text-7xl font-extrabold mb-6 tracking-tighter">
              WHY THE WEB{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-500 to-gray-800 line-through decoration-red-500 decoration-[4px]">
                FAILED
              </span>{" "}
              YOU.
            </h2>
            <p className="gsap-reveal text-gray-400 text-xl max-w-3xl mx-auto">
              Web apps depend on browsers. Browsers depend on sandboxes.
              Sandboxes kill speed.
              <span className="text-white block mt-2 font-bold">
                XBLT runs on the metal.
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
            <div className="space-y-6 relative">
              <ProblemCard
                icon={<WifiOff className="text-red-500" />}
                title="Latency Bottlenecks"
                desc="Reloads, buffering, and browser limits destroy your flow state. The web is too slow for real-time thought."
                delay={0}
              />
              <ProblemCard
                icon={<Layers className="text-orange-500" />}
                title="Context Switching"
                desc="Alt-tabbing between Chat, IDE, and Browser kills focus. Every switch costs you mental energy."
                delay={0.2}
              />
              <ProblemCard
                icon={<ShieldCheck className="text-yellow-500" />}
                title="Restricted Access"
                desc="Web apps cannot touch your file system or run local automation. You are renting a sandbox."
                delay={0.4}
              />
            </div>

            <div className="gsap-reveal relative rounded-[40px] bg-[#0A0A0A] border border-white/10 overflow-hidden flex flex-col items-center justify-center min-h-[400px] shadow-2xl group">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#E2F609]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative text-center z-10 p-8">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-black border border-[#E2F609]/50 mb-8 shadow-[0_0_50px_rgba(226,246,9,0.3)] group-hover:scale-110 transition-transform duration-500">
                  <Zap className="w-10 h-10 text-[#E2F609] fill-[#E2F609]" />
                </div>
                <h3 className="text-3xl font-bold tracking-tight text-white mb-2">
                  The Native Editor
                </h3>
                <p className="text-gray-400 text-lg">
                  Raw file system access.
                  <br /> Zero-latency streaming.
                </p>
              </div>

              {/* Pulsing Rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-[#E2F609]/20 rounded-full animate-ping [animation-duration:3s]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white/5 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* --- UNDER THE HOOD (BENTO GRID) --- */}
      <section className="py-32 bg-black border-t border-white/5 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E2F609]/5 blur-[200px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="gsap-reveal text-5xl md:text-7xl font-extrabold mb-16 tracking-tighter">
            UNDER THE <span className="text-[#E2F609]">HOOD.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px]">
            <div className="gsap-reveal md:col-span-2 bg-[#0A0A0A] border border-white/10 rounded-[30px] p-10 relative overflow-hidden hover:border-[#E2F609]/30 transition-colors group">
              <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity duration-500 group-hover:scale-110 transform">
                <Cpu className="w-96 h-96 text-[#E2F609]" strokeWidth={0.5} />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-black border border-white/10 rounded-xl flex items-center justify-center mb-6 text-[#E2F609]">
                    <Terminal className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 tracking-tight">
                    Desktop Editor Engine
                  </h3>
                  <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                    Built natively for your hardware. This unlocks direct file
                    manipulation, persistent background services, and instant
                    local execution just like VS Code.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="px-4 py-1.5 rounded-full bg-white/5 text-xs font-bold tracking-widest border border-white/10">
                    ELECTRON
                  </span>
                  <span className="px-4 py-1.5 rounded-full bg-white/5 text-xs font-bold tracking-widest border border-white/10">
                    NODE.JS
                  </span>
                </div>
              </div>
            </div>

            <div className="gsap-reveal bg-[#0A0A0A] border border-white/10 rounded-[30px] p-10 flex flex-col justify-center relative overflow-hidden group hover:border-blue-500/30 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Globe className="w-12 h-12 text-blue-400 mb-6 relative z-10" />
              <h3 className="text-2xl font-bold mb-3 relative z-10">
                Hybrid Sync
              </h3>
              <p className="text-gray-400 text-base leading-relaxed relative z-10">
                Core logic stays local. Heavy LLM inference routes through Groq.
                Global edge deployment handles the rest.
              </p>
            </div>

            <div className="gsap-reveal bg-[#0A0A0A] border border-white/10 rounded-[30px] p-10 flex flex-col justify-center relative overflow-hidden group hover:border-green-500/30 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <ShieldCheck className="w-12 h-12 text-green-400 mb-6 relative z-10" />
              <h3 className="text-2xl font-bold mb-3 relative z-10">
                Enterprise Auth
              </h3>
              <p className="text-gray-400 text-base leading-relaxed relative z-10">
                Bank-grade security. JWT rotation and encrypted environment
                variables baked into every architecture.
              </p>
            </div>

            <div className="gsap-reveal md:col-span-2 bg-[#0A0A0A] border border-[#E2F609]/20 rounded-[30px] p-10 relative overflow-hidden flex items-center shadow-[0_0_40px_rgba(226,246,9,0.05)]">
              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-4 tracking-tight">
                  Ollama Local Integration
                </h3>
                <p className="text-gray-400 text-lg mb-8 max-w-sm">
                  Run XBLT completely offline. Connect to local models like
                  Mistral or LLaMA 3 for 100% private code generation right in
                  the editor.
                </p>
                <button className="text-black bg-[#E2F609] px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                  View Setup Guide <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="hidden md:flex flex-1 justify-end">
                <div className="w-full max-w-sm bg-black rounded-xl border border-white/10 overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="bg-white/5 p-3 flex gap-2 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="p-4 font-mono text-xs text-green-400 space-y-2">
                    <p className="text-gray-400">$ ollama run llama3</p>
                    <p>{">"} initializing local inference...</p>
                    <p>{">"} connected to XBLT editor on port 11434</p>
                    <p className="text-[#E2F609] animate-pulse">
                      Ready for prompt.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- COMPARISON MATRIX --- */}
      <section className="py-32 bg-[#050505] relative z-10 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="gsap-reveal text-center text-4xl md:text-6xl font-extrabold mb-6 tracking-tighter">
            THE REAL REASON <br />
            <span className="text-[#E2F609]">DESKTOP WINS.</span>
          </h2>
          <p className="gsap-reveal text-center text-gray-400 text-xl mb-16 font-medium">
            Stop renting a sandbox. Take control of the metal.
          </p>

          <div className="gsap-reveal border border-white/10 rounded-[30px] overflow-hidden bg-[#0A0A0A] shadow-2xl">
            <div className="grid grid-cols-3 p-6 md:p-8 border-b border-white/10 bg-white/5 font-mono text-xs md:text-sm uppercase tracking-widest text-gray-400 font-bold">
              <div>Capability</div>
              <div className="text-center">Web Sandbox</div>
              <div className="text-center text-[#E2F609] flex items-center justify-center gap-2">
                <Zap className="w-4 h-4 fill-[#E2F609]" /> XBLT Studio
              </div>
            </div>

            <div className="divide-y divide-white/5 text-sm md:text-base">
              <ComparisonRow
                feature="Startup Speed"
                web="Slower (DNS/Loading)"
                xblt="Instant (Native App)"
              />
              <ComparisonRow
                feature="Offline Mode"
                web="Throws Network Error"
                xblt="Full Support via Ollama"
              />
              <ComparisonRow
                feature="System Access"
                web="Restricted API Sandbox"
                xblt="Root Directory Access"
              />
              <ComparisonRow
                feature="Code Injection"
                web="Copy & Paste Required"
                xblt="Direct File System Write"
              />
              <ComparisonRow
                feature="Dependency Mgmt"
                web="Manual Local Installs"
                xblt="Auto NPM/Yarn Execution"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-1.5 bg-[#E2F609] origin-left z-50 shadow-[0_0_10px_#E2F609]"
        style={{ scaleX: scrollYProgress }}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shimmer { 100% { transform: translateX(100%); } }
      `,
        }}
      />
    </div>
  );
}

/* --- HELPER COMPONENTS --- */

const ProblemCard = ({ icon, title, desc, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ delay, duration: 0.5, ease: "easeOut" }}
    className="flex gap-6 p-6 md:p-8 rounded-[24px] bg-[#0A0A0A] border border-white/5 hover:border-white/20 transition-all group"
  >
    <div className="shrink-0 w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all">
      {icon}
    </div>
    <div>
      <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 text-base leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

const ComparisonRow = ({ feature, web, xblt }: any) => (
  <div className="grid grid-cols-3 p-6 md:p-8 hover:bg-white/5 transition-colors items-center group">
    <div className="text-gray-300 font-bold">{feature}</div>
    <div className="text-center text-gray-500">{web}</div>
    <div className="text-center text-[#E2F609] font-bold shadow-[0_0_20px_rgba(226,246,9,0.05)] rounded-lg px-3 py-2 bg-[#E2F609]/5 border border-[#E2F609]/20 group-hover:bg-[#E2F609]/10 transition-colors">
      {xblt}
    </div>
  </div>
);
