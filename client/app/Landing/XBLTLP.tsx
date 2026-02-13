"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Zap,
  Download,
  UserPlus,
  Sparkles,
  Command,
  ArrowRight,
  Terminal,
  Cpu,
  Globe,
  WifiOff,
  Layers,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const XBLTLP = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const boltRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } = useScroll();

  const yHero = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        boltRef.current,
        {
          opacity: 0,
          scale: 0.8,
          filter: "drop-shadow(0 0 0px rgba(226, 246, 9, 0))",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "drop-shadow(0 0 50px rgba(226, 246, 9, 0.6))",
          duration: 1.5,
          ease: "elastic.out(1, 0.3)",
        },
      ).to(boltRef.current, {
        filter: "drop-shadow(0 0 100px rgba(226, 246, 9, 0.9))",
        repeat: -1,
        yoyo: true,
        duration: 0.1,
        repeatDelay: 2,
      });

      const revealElements = gsap.utils.toArray(".gsap-reveal");
      revealElements.forEach((elem: any) => {
        gsap.fromTo(
          elem,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
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
      className="min-h-screen bg-black text-white selection:bg-[#E2F609] selection:text-black overflow-x-hidden font-sans"
    >
      <Header />

      <motion.section
        ref={heroRef}
        style={{ y: yHero, opacity: opacityHero }}
        className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 flex flex-col items-center justify-center text-center max-w-7xl mx-auto min-h-[90vh]"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-[#E2F609]/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

        <svg
          ref={boltRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-150 -z-10 opacity-30 pointer-events-none"
          viewBox="0 0 20 23"
          fill="none"
          stroke="#E2F609"
          strokeWidth="0.1"
        >
          <path
            d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E2F609]/30 bg-[#E2F609]/5 text-[#E2F609] text-xs font-mono mb-8"
        >
          <Sparkles className="w-3 h-3" />
          <span>V2.0 IS LIVE: AGENTIC WORKFLOWS</span>
        </motion.div>

        <motion.h1
          ref={textRef}
          className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "circOut" }}
        >
          BUILD AT <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white to-gray-500">
            LIGHTNING SPEED
          </span>
        </motion.h1>

        <motion.p
          className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Describe what you want, and watch it transform into a complete,
          ready-to-launch product in seconds.{" "}
          <span className="text-[#E2F609]">Instantly.</span>
        </motion.p>

        <motion.div
          className="w-full max-w-3xl relative group mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: "spring" }}
        >
          <div className="absolute -inset-1 bg-linear-to-r from-[#E2F609] to-[#E2F609]/0 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative flex items-center bg-[#0A0A0A] border border-white/10 rounded-xl p-2 shadow-2xl">
            <div className="p-3 bg-white/5 rounded-lg mr-3">
              <Command className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Create a landing page for a SaaS with a dark theme..."
              className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 font-mono text-sm h-10"
              readOnly
            />
            <button className="px-4 py-2 bg-[#E2F609] text-black font-bold rounded-lg hover:bg-[#c9db08] transition-all flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Generate</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link href="/signin">
            <button className="cursor-pointer group relative px-8 py-4 bg-[#E2F609] text-black font-bold rounded-full overflow-hidden flex items-center justify-center gap-3 hover:scale-105 transition-transform">
              <div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <UserPlus className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Create Free Account</span>
            </button>
          </Link>

          <button className="cursor-pointer px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full flex items-center justify-center gap-3 hover:bg-white/5 hover:border-[#E2F609]/50 transition-all">
            <Download className="w-5 h-5" />
            <span>Download Desktop</span>
          </button>
        </motion.div>
      </motion.section>

      <div className="w-full border-y border-white/5 bg-white/2 py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest whitespace-nowrap">
            Trusted by Developers at
          </span>
          <div className="flex gap-12 opacity-40 grayscale mix-blend-screen w-full justify-between items-center">
            <span className="text-xl font-bold">ACME</span>
            <span className="text-xl font-bold">STRIPE</span>
            <span className="text-xl font-bold">VERCEL</span>
            <span className="text-xl font-bold">OPENAI</span>
            <span className="text-xl font-bold">FIGMA</span>
          </div>
        </div>
      </div>

      <section className="py-32 bg-[#050505] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center">
            <h2 className="gsap-reveal text-3xl md:text-5xl font-bold mb-6">
              WHY THE WEB{" "}
              <span className="text-red-500 line-through decoration-[#E2F609]">
                FAILED
              </span>{" "}
              YOU
            </h2>
            <p className="gsap-reveal text-gray-400 text-lg max-w-2xl mx-auto">
              Modern workflow tools suffer from latency, context switching, and
              browser limitations.
              <span className="text-white block mt-2">
                XBLT fixes this by bridging the gap.
              </span>
            </p>
          </div>

          <div id="#features" className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard
              title="Build Anything"
              desc="From a CLI tool to a full SaaS, XBLT can generate any type of software product with 0ms latency."
              icon={<Terminal className="text-[#E2F609]" />}
              delay={0.2}
            />

            <FeatureCard
              title="Focus on What Matters"
              desc="XBLT lets you focus on building the app you want. It's like having a personal computer for your software."
              icon={<Cpu className="text-[#E2F609]" />}
              delay={0.4}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
            <div className="space-y-6">
              <ProblemCard
                icon={<WifiOff className="text-red-500" />}
                title="Latency Bottlenecks"
                desc="Web apps depend on constant internet. Reloads, buffering, and browser sandboxes kill your flow state."
              />
              <ProblemCard
                icon={<Layers className="text-orange-500" />}
                title="Context Switching"
                desc="Alt-tabbing between IDE, Chat, and Browser tabs destroys focus. Every switch costs mental energy."
              />
              <ProblemCard
                icon={<ShieldCheck className="text-yellow-500" />}
                title="Limited System Access"
                desc="Web apps can't touch your file system or run native automation. You are renting your own computer."
              />
            </div>

            <div className="gsap-reveal relative rounded-3xl bg-zinc-900/50 border border-white/10 overflow-hidden flex items-center justify-center min-h-100">
              <div className="absolute inset-0 bg-[url('https://grainy-linears.vercel.app/noise.svg')] opacity-20"></div>
              <div className="relative text-center z-10">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#E2F609]/10 border border-[#E2F609] mb-6 shadow-[0_0_50px_rgba(226,246,9,0.3)]">
                  <Zap className="w-12 h-12 text-[#E2F609] fill-[#E2F609]" />
                </div>
                <h3 className="text-2xl font-bold">The XBLT Hybrid Engine</h3>
                <p className="text-gray-400 mt-2">
                  Web Accessibility + Native Power
                </p>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 border border-white/5 rounded-full animate-ping [animation-duration:3s]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-112.5 h-112.5 border border-white/5 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      <section
        id="engine"
        className="py-32 bg-black border-t border-white/10 relative overflow-hidden"
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-125 h-125 bg-yellow-300/15 blur-[180px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <h2 className="gsap-reveal text-4xl md:text-6xl font-bold mb-16 tracking-tighter">
            UNDER THE <span className="text-[#E2F609]">HOOD</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px]">
            <div className="gsap-reveal md:col-span-2 bg-[#080808] border border-white/10 rounded-3xl p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                <Cpu className="w-48 h-48 text-[#E2F609]" strokeWidth={0.5} />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center mb-6 text-[#E2F609]">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    Desktop Core Engine
                  </h3>
                  <p className="text-gray-400 max-w-md">
                    Built using native runtime (Electron/Tauri) with Node.js
                    backend logic. This allows direct file manipulation,
                    persistent background services, and 0ms latency.
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/5 text-xs border border-white/10">
                    Node.js
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-xs border border-white/10">
                    Rust
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-xs border border-white/10">
                    Electron
                  </span>
                </div>
              </div>
            </div>

            <div className="gsap-reveal bg-[#080808] border border-white/10 rounded-3xl p-10 relative overflow-hidden group hover:border-[#E2F609]/30 transition-colors">
              <div className="absolute inset-0 bg-linear-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Globe className="w-10 h-10 text-blue-400 mb-6" />
              <h3 className="text-xl font-bold mb-2">Hybrid Cloud Sync</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Core logic runs locally. Heavy AI inference and syncing handle
                via server. Smart caching reduces server calls.
              </p>
            </div>

            <div className="gsap-reveal bg-[#080808] border border-white/10 rounded-3xl p-10 relative overflow-hidden group hover:border-[#E2F609]/30 transition-colors">
              <ShieldCheck className="w-10 h-10 text-green-400 mb-6" />
              <h3 className="text-xl font-bold mb-2">Enterprise Auth</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Google OAuth, JWT tokens, and Passport strategy. Authenticate
                once, stay connected securely forever.
              </p>
            </div>

            <div className="gsap-reveal md:col-span-2 bg-[#080808] border border-white/10 rounded-3xl p-10 relative overflow-hidden flex items-center">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">Plugin Architecture</h3>
                <p className="text-gray-400 mb-6">
                  XBLT isn't just a tool; it's a platform. Extend functionality
                  with local automation scripts.
                </p>
                <button className="text-[#E2F609] text-sm font-bold flex items-center gap-2 hover:gap-4 transition-all">
                  Explore Marketplace <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="hidden md:block w-48 h-32 bg-zinc-900 rounded-lg border border-white/10 relative overflow-hidden">
                <div className="absolute top-2 left-2 flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                </div>
                <div className="mt-6 p-2 font-mono text-[8px] text-green-400">
                  import xblt from '@core'
                  <br />
                  xblt.initPlugin('git-sync')
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="comparison" className="py-32 bg-[#050505] relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="gsap-reveal text-center text-3xl md:text-5xl font-bold mb-4">
            THE REAL REASON <br />
            <span className="text-[#E2F609]">DESKTOP WINS</span>
          </h2>
          <p className="gsap-reveal text-center text-gray-500 mb-16">
            Web apps run in a sandbox. XBLT runs on the metal.
          </p>

          <div className="gsap-reveal border border-white/10 rounded-2xl overflow-hidden bg-[#0A0A0A] shadow-2xl">
            <div className="grid grid-cols-3 p-6 border-b border-white/10 bg-white/2 font-mono text-sm uppercase tracking-widest text-gray-500">
              <div>Feature</div>
              <div className="text-center">Web App</div>
              <div className="text-center text-[#E2F609] flex items-center justify-center gap-2">
                <Zap className="w-4 h-4 fill-[#E2F609]" /> XBLT
              </div>
            </div>

            <div className="divide-y divide-white/5">
              <ComparisonRow
                feature="Startup Speed"
                web="Slower (DNS/Loading)"
                xblt="Instant"
              />
              <ComparisonRow
                feature="Offline Mode"
                web="Limited / None"
                xblt="Full Support"
              />
              <ComparisonRow
                feature="System Access"
                web="Restricted Sandbox"
                xblt="Full Native Access"
              />
              <ComparisonRow
                feature="File Operations"
                web="Indirect / Slow"
                xblt="Native / Direct"
              />
              <ComparisonRow
                feature="Memory Control"
                web="Shared with Browser"
                xblt="Dedicated Process"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <motion.div
        className="fixed bottom-0 left-0 right-0 h-1 bg-[#E2F609] origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
};

const FeatureCard = ({
  title,
  desc,
  icon,
  delay,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: delay, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="group relative p-8 rounded-2xl bg-[#0A0A0A] border border-white/10 overflow-hidden hover:border-[#E2F609]/50 transition-colors"
    >
      <div className="absolute inset-0 bg-linear-to-b from-[#E2F609]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="w-12 h-12 rounded-lg bg-zinc-900 flex items-center justify-center text-white mb-6 group-hover:bg-[#E2F609] group-hover:text-black transition-colors duration-300">
        {icon}
      </div>

      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-500 text-sm">{desc}</p>

      <div className="mt-6 flex items-center text-[#E2F609] text-sm font-mono opacity-0 group-hover:opacity-100 transform -translate-x-2.5 group-hover:translate-x-0 transition-all duration-300">
        Deploy Template <ArrowRight className="w-4 h-4 ml-2" />
      </div>
    </motion.div>
  );
};

const ProblemCard = ({ icon, title, desc }: any) => (
  <div className="gsap-reveal flex gap-6 p-6 rounded-2xl bg-[#0A0A0A] border border-white/5 hover:border-white/20 transition-all group">
    <div className="shrink-0 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

const ComparisonRow = ({ feature, web, xblt }: any) => (
  <div className="grid grid-cols-3 p-6 hover:bg-white/5 transition-colors items-center">
    <div className="text-gray-300 font-bold text-sm">{feature}</div>
    <div className="text-center text-gray-600 text-sm">{web}</div>
    <div className="text-center text-[#E2F609] font-bold text-sm shadow-[0_0_15px_rgba(226,246,9,0.1)] rounded px-2 py-1 bg-[#E2F609]/5 border border-[#E2F609]/20">
      {xblt}
    </div>
  </div>
);

export default XBLTLP;
