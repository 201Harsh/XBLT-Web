"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Zap,
  Terminal,
  Cpu,
  Globe,
  Layers,
  ShieldCheck,
  Code2,
  Network,
  FileJson,
  Lock,
  ArrowRight,
  Github,
  Twitter,
  Disc,
} from "lucide-react";

// Register GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const XBLTFeatures = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);

  // --- GSAP ANIMATION LOGIC ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Pin the Hologram (Right Side)
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: ".pinned-visual",
        scrub: 1,
      });

      // 2. Animate Left Text Blocks
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

  const BackgroundParticles = () => {
    const particles = Array.from({ length: 20 }).map((_, i) => ({
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
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
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

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-[#E2F609] selection:text-black"
    >
      {/* --- NAV (Consistent with LP) --- */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/10 bg-black/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <Zap className="w-6 h-6 text-[#E2F609] fill-[#E2F609]" />
            <span className="font-bold text-xl tracking-tighter">
              XBLT<span className="text-[#E2F609]">.AI</span>
            </span>
          </div>
          <div className="flex gap-4">
            <button className="text-sm font-semibold hover:text-[#E2F609] text-gray-400 transition-colors">
              Back to Home
            </button>
            <button className="bg-[#E2F609] text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#c9db08] transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden border-b border-white/10 bg-black perspective-1000">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-125 bg-[#E2F609]/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black to-transparent z-10"></div>

        <BackgroundParticles />

        <div className="max-w-7xl mx-auto px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "circOut" }}
          >
            {/* System Badge */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E2F609]/30 bg-[#E2F609]/5 text-[#E2F609] text-xs font-mono mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(226,246,9,0.2)]"
            >
              <Terminal className="w-3 h-3 animate-pulse" />
              <span className="tracking-widest">SYSTEM ARCHITECTURE V2.0</span>
            </motion.div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[0.9]">
              BEYOND THE <br />
              {/* Masked Text Effect */}
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-[#E2F609]/20 blur-lg opacity-50 animate-pulse"></span>
                <span className="relative text-transparent bg-clip-text bg-linear-to-b from-white via-gray-200 to-gray-600 drop-shadow-2xl">
                  BROWSER SANDBOX
                </span>
              </span>
            </h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              Most tools are websites pretending to be apps.{" "}
              <br className="hidden md:block" />
              <span className="text-white font-bold border-b border-[#E2F609]">
                XBLT is a native execution engine
              </span>{" "}
              that gives you raw access to your file system, local NPU, and
              hardware acceleration.
            </motion.p>
          </motion.div>
        </div>

        {/* 4. HUD STATUS BAR (Bottom) */}
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

      {/* --- THE PINNED SECTION --- */}
      <section ref={triggerRef} className="relative w-full bg-[#050505]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
          {/* LEFT: SCROLLING TEXT */}
          <div className="md:w-1/2 py-32 px-6 pb-[50vh]">
            {/* STEP 1: NEURAL */}
            <FeatureStep
              title="1. Neural Scaffold"
              subtitle="AI ARCHITECTURE"
              icon={<Network />}
              desc="XBLT doesn't just write code; it plans architecture. The NPU scans your prompt, builds a dependency graph, and pre-allocates file structures."
            />

            {/* STEP 2: FILES */}
            <FeatureStep
              title="2. Direct Injection"
              subtitle="FILE SYSTEM WRITE"
              icon={<FileJson />}
              desc="Bypassing the virtual DOM, XBLT injects code directly into your local storage. Watch package.json update in real-time."
            />

            {/* STEP 3: CODE */}
            <FeatureStep
              title="3. The Live Matrix"
              subtitle="HOT RELOADING"
              icon={<Code2 />}
              desc="Modifications happen instantly. Our custom Webpack configuration pushes HMR updates faster than you can blink."
            />

            {/* STEP 4: SYNC */}
            <FeatureStep
              title="4. Global Edge Sync"
              subtitle="DEPLOYMENT"
              icon={<Globe />}
              desc="Once local tests pass, the engine shards your build and pushes it to Vercel's Edge Network across 32 regions."
            />

            {/* STEP 5: SECURITY */}
            <FeatureStep
              title="5. Defense Grid"
              subtitle="ENTERPRISE SECURITY"
              icon={<ShieldCheck />}
              desc="JWT rotation, Env var encryption, and OWASP sanitization are baked into every generated component."
            />
          </div>

          {/* RIGHT: THE HOLOGRAM (Pinned) */}
          <div className="hidden md:flex md:w-1/2 h-screen pinned-visual sticky top-0 items-center justify-center p-6 lg:p-12">
            <div className="relative w-full h-150 bg-black border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
              {/* HOLOGRAM HEADER */}
              <div className="h-12 border-b border-white/10 flex items-center justify-between px-6 bg-white/2">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="font-mono text-xs text-[#E2F609] tracking-widest">
                  SYS_CORE ::{" "}
                  {
                    ["NEURAL", "INJECT", "MATRIX", "SYNC", "SECURE"][
                      activeFeature
                    ]
                  }
                </div>
              </div>

              {/* HOLOGRAM CONTENT AREA */}
              <div className="flex-1 relative overflow-hidden p-8 flex items-center justify-center">
                {/* Scanline Effect */}
                <div className="absolute inset-0 bg-[linear-linear(to_bottom,transparent_50%,rgba(0,0,0,0.3)_51%)] bg-size-[100%_4px] pointer-events-none z-20 opacity-20"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-[#E2F609]/20 shadow-[0_0_20px_rgba(226,246,9,0.5)] z-20 animate-scan"></div>

                <AnimatePresence mode="wait">
                  {activeFeature === 0 && <VisualNeural key="0" />}
                  {activeFeature === 1 && <VisualFiles key="1" />}
                  {activeFeature === 2 && <VisualCode key="2" />}
                  {activeFeature === 3 && <VisualGlobe key="3" />}
                  {activeFeature === 4 && <VisualSecurity key="4" />}
                </AnimatePresence>
              </div>

              {/* HOLOGRAM FOOTER */}
              <div className="h-10 border-t border-white/10 flex items-center justify-between px-6 bg-white/2 text-[10px] font-mono text-gray-500">
                <span>CPU: 12%</span>
                <span>RAM: 402MB</span>
                <span>LATENCY: 4ms</span>
                <span className="text-[#E2F609]">ONLINE</span>
              </div>

              {/* Glow Underlay */}
              <div className="absolute inset-0 z-[-1] bg-linear-to-tr from-[#E2F609]/5 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA SECTION --- */}
      <section className="py-32 bg-[#050505] border-t border-white/10 relative overflow-hidden">
        {/* Giant Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-[#E2F609]/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-white">
            READY TO <span className="text-[#E2F609]">THUNDER?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-12">
            Join 10,000+ developers shipping apps at the speed of thought.{" "}
            <br className="hidden md:block" />
            Download the engine today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-[#E2F609] text-black font-bold rounded-xl hover:bg-[#d4e608] transition-colors w-full sm:w-auto hover:shadow-[0_0_30px_rgba(226,246,9,0.4)]">
              Get Started Free
            </button>
            <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-colors w-full sm:w-auto flex items-center justify-center gap-2">
              Read Documentation <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* --- MAIN FOOTER --- */}
      <footer className="bg-black py-12 px-6 border-t border-white/10 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#E2F609] fill-[#E2F609]" />
            <span className="font-bold text-lg text-white">XBLT.AI</span>
          </div>

          <div className="flex gap-8 text-gray-500 font-medium">
            <a href="#" className="hover:text-[#E2F609] transition-colors">
              Manifesto
            </a>
            <a href="#" className="hover:text-[#E2F609] transition-colors">
              Pricing
            </a>
            <a href="#" className="hover:text-[#E2F609] transition-colors">
              Enterprise
            </a>
            <a href="#" className="hover:text-[#E2F609] transition-colors">
              Changelog
            </a>
          </div>

          <div className="flex gap-4">
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Disc className="w-5 h-5" />
            </a>{" "}
            // Disc Icon for Discord
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-white/5 text-center text-gray-600 text-xs">
          © 2026 XBLT Inc. All rights reserved. System Status:{" "}
          <span className="text-green-500">Operational</span>
        </div>
      </footer>
    </div>
  );
};

/* --- SUB-COMPONENTS (THE VISUALS) --- */

const FeatureStep = ({ title, subtitle, icon, desc }: any) => (
  <div className="feature-step min-h-[80vh] flex flex-col justify-center border-l border-white/10 pl-8 ml-4">
    <div className="inline-flex items-center gap-2 text-[#E2F609] font-mono text-xs mb-4 uppercase tracking-widest">
      {icon} {subtitle}
    </div>
    <h2 className="text-4xl md:text-5xl font-bold mb-6">{title}</h2>
    <p className="text-gray-400 text-lg leading-relaxed max-w-md">{desc}</p>
  </div>
);

// 1. NEURAL (FIXED: DETERMINISTIC MATH)
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
          // FIX: Deterministic value ensures Server matches Client
          style={{ opacity: 0.1 + ((i * 13) % 10) / 20 }}
        ></div>
      ))}
    </div>
    <div className="relative z-10 bg-black/80 backdrop-blur-md border border-[#E2F609]/30 p-6 rounded-2xl w-64 text-center shadow-[0_0_50px_rgba(226,246,9,0.2)]">
      <Cpu className="w-16 h-16 text-[#E2F609] mx-auto mb-4 animate-pulse" />
      <div className="font-mono text-sm text-[#E2F609] mb-2">
        ANALYZING PROMPT
      </div>
      <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-full bg-[#E2F609]"
        ></motion.div>
      </div>
      <div className="mt-4 text-xs text-left text-gray-500 font-mono space-y-1">
        <p>{`> Parsing intents... OK`}</p>
        <p>{`> Allocating memory... OK`}</p>
        <p>{`> Constructing graph...`}</p>
      </div>
    </div>
  </motion.div>
);

// 2. FILES
const VisualFiles = () => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    className="w-full max-w-sm font-mono text-sm"
  >
    <div className="bg-[#0A0A0A] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
      <div className="bg-white/5 p-2 flex gap-2 border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between text-blue-400">
          <span className="flex items-center gap-2">
            <Layers className="w-4 h-4" /> /app
          </span>
          <span className="text-xs text-gray-600">DIR</span>
        </div>
        <div className="pl-4 space-y-2">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 text-yellow-300"
          >
            <FileJson className="w-4 h-4" /> layout.tsx
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 text-yellow-300"
          >
            <FileJson className="w-4 h-4" /> page.tsx
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-2 text-[#E2F609]"
          >
            <FileJson className="w-4 h-4" /> globals.css{" "}
            <span className="text-[10px] bg-[#E2F609] text-black px-1 rounded">
              NEW
            </span>
          </motion.div>
        </div>
      </div>
      <div className="bg-black p-3 text-xs text-gray-500 border-t border-white/10">
        Writing 14 files to disk...
      </div>
    </div>
  </motion.div>
);

// 3. CODE
const VisualCode = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="w-full h-full p-4 relative"
  >
    <div className="absolute top-4 right-4 text-[#E2F609] animate-pulse">
      LIVE
    </div>
    <div className="font-mono text-xs md:text-sm text-gray-300 space-y-1">
      <p>
        <span className="text-purple-400">export default</span>{" "}
        <span className="text-blue-400">function</span>{" "}
        <span className="text-yellow-300">Hero</span>() {"{"}
      </p>
      <p className="pl-4">
        <span className="text-purple-400">return</span> (
      </p>
      <p className="pl-8 text-gray-500">
        {"<"}
        <span className="text-red-400">motion.div</span>
      </p>
      <p className="pl-12 text-blue-300">
        initial={"{"}
        {"{"} opacity: 0 {"}"}
        {"}"}
      </p>
      <p className="pl-12 text-blue-300">
        animate={"{"}
        {"{"} opacity: 1 {"}"}
        {"}"}
      </p>
      <p className="pl-12 text-blue-300">
        className=<span className="text-green-400">"text-6xl font-bold"</span>
      </p>
      <p className="pl-8 text-gray-500">{">"}</p>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
        className="pl-12 bg-[#E2F609]/20 text-[#E2F609] whitespace-nowrap overflow-hidden border-r-2 border-[#E2F609]"
      >
        Start Building Instantly_
      </motion.div>

      <p className="pl-8 text-gray-500">
        {"</"}
        <span className="text-red-400">motion.div</span>
        {">"}
      </p>
      <p className="pl-4">);</p>
      <p>{"}"}</p>
    </div>
  </motion.div>
);

// 4. GLOBE / SYNC
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

    {/* Satellites */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      className="absolute w-full h-full z-0"
    >
      <div className="absolute top-10 left-1/2 w-3 h-3 bg-[#E2F609] rounded-full shadow-[0_0_10px_#E2F609]"></div>
    </motion.div>

    <div className="absolute bottom-10 bg-black/80 px-4 py-2 rounded-full border border-white/10 text-xs font-mono">
      <span className="text-[#E2F609]">●</span> SYNCING: US-EAST-1
    </div>
  </motion.div>
);

// 5. SECURITY
const VisualSecurity = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex flex-col items-center justify-center w-full h-full"
  >
    <Lock className="w-20 h-20 text-green-500 mb-6" />
    <div className="w-64 space-y-3">
      <div className="flex justify-between items-center text-xs font-mono text-gray-400 border-b border-white/5 pb-1">
        <span>ENCRYPTION</span>
        <span className="text-green-500">AES-256</span>
      </div>
      <div className="flex justify-between items-center text-xs font-mono text-gray-400 border-b border-white/5 pb-1">
        <span>AUTH</span>
        <span className="text-green-500">OAUTH 2.0</span>
      </div>
      <div className="flex justify-between items-center text-xs font-mono text-gray-400 border-b border-white/5 pb-1">
        <span>HEADERS</span>
        <span className="text-green-500">SECURE</span>
      </div>
    </div>
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      className="mt-8 text-[#E2F609] text-xl font-bold tracking-widest border px-4 py-2 border-[#E2F609]"
    >
      ACCESS GRANTED
    </motion.div>
  </motion.div>
);

export default XBLTFeatures;
