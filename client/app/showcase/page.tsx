"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ExternalLink,
  Code2,
  Heart,
  Search,
  ArrowRight,
  Star,
} from "lucide-react";
import Image from "next/image";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

// --- CONSTANTS ---
// 1. Embedded Noise (Instant Load, No 404s)
const NOISE_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`;

// 2. Reliable Project Data (Tested Image IDs)
const PROJECTS = [
  {
    id: 1,
    title: "Neon De-Fi",
    author: "@crypto_king",
    category: "Crypto",
    // Cyberpunk City
    image:
      "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2000&auto=format&fit=crop",
    stack: ["Next.js", "Solidity"],
    likes: "1.2k",
  },
  {
    id: 2,
    title: "Vortex SaaS",
    author: "@ui_wizard",
    category: "SaaS",
    // Abstract Data
    image:
      "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2000&auto=format&fit=crop",
    stack: ["React", "Supabase"],
    likes: "856",
  },
  {
    id: 3,
    title: "Zenith Portfolio",
    author: "@design_pro",
    category: "Portfolio",
    // Geometric Shapes
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
    stack: ["GSAP", "WebGL"],
    likes: "2.1k",
  },
  {
    id: 4,
    title: "Echo Commerce",
    author: "@shop_builder",
    category: "E-commerce",
    // Neon Product
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop",
    stack: ["Shopify", "Hydrogen"],
    likes: "645",
  },
  {
    id: 5,
    title: "Hyper Dashboard",
    author: "@data_nerd",
    category: "SaaS",
    // Dark Analytics
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    stack: ["Tremor", "NextAuth"],
    likes: "930",
  },
  {
    id: 6,
    title: "Astro Blog",
    author: "@content_creator",
    category: "Blog",
    // Minimal Desk
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2000&auto=format&fit=crop",
    stack: ["Astro", "MDX"],
    likes: "420",
  },
];

const CATEGORIES = ["All", "SaaS", "Crypto", "Portfolio", "E-commerce", "Blog"];

const ShowcasePage = () => {
  const [filter, setFilter] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(PROJECTS);

  useEffect(() => {
    if (filter === "All") {
      setFilteredProjects(PROJECTS);
    } else {
      setFilteredProjects(PROJECTS.filter((p) => p.category === filter));
    }
  }, [filter]);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#E2F609] selection:text-black">
      <Header />

      {/* --- HERO SECTION --- */}
      <SpotlightHero />

      {/* --- FILTER & GRID --- */}
      <section className="px-6 pb-40 relative z-20">
        {/* Sticky Filter Bar */}
        <div className="sticky top-20 z-30 py-6 mb-10 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto flex overflow-x-auto no-scrollbar gap-2 md:gap-4 pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-bold border transition-all duration-300 ${
                  filter === cat
                    ? "bg-[#E2F609] text-black border-[#E2F609] shadow-[0_0_20px_rgba(226,246,9,0.3)]"
                    : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-32">
              <Search className="w-16 h-16 text-gray-800 mx-auto mb-6" />
              <p className="text-gray-500 text-lg">
                No architectural feats found.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* --- CTA BANNER --- */}
      <section className="py-40 border-t border-white/10 bg-black relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#E2F609]/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 px-6">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-white">
            SHIP YOUR <span className="text-[#E2F609]">MASTERPIECE</span>
          </h2>
          <button className="px-10 py-5 bg-[#E2F609] text-black font-bold text-xl rounded-full hover:scale-105 transition-transform flex items-center gap-3 mx-auto shadow-[0_0_40px_rgba(226,246,9,0.3)]">
            Submit Project <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// --- SPOTLIGHT HERO (FIXED COORDINATES) ---
const SpotlightHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null); // Ref for the TEXT ITSELF

  // Framer Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth Spring Physics
  const springX = useSpring(x, { stiffness: 120, damping: 15 });
  const springY = useSpring(y, { stiffness: 120, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    // We calculate mouse position relative to the TEXT ELEMENT, not the container/window
    if (!textRef.current) return;
    const rect = textRef.current.getBoundingClientRect();

    // This math aligns (0,0) to the top-left of the text element
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;

    x.set(relativeX);
    y.set(relativeY);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative pt-48 pb-32 px-6 overflow-hidden flex flex-col items-center justify-center min-h-[60vh] bg-[#050505] cursor-crosshair"
    >
      {/* NOISE */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: NOISE_BG }}
      />

      <div className="relative z-10 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E2F609]/20 bg-[#E2F609]/5 text-[#E2F609] text-xs font-mono mb-8 backdrop-blur-md"
        >
          <Star className="w-3 h-3 fill-[#E2F609]" />
          <span>COMMUNITY SPOTLIGHT</span>
        </motion.div>

        {/* --- THE SPOTLIGHT TEXT EFFECT --- */}
        <div className="relative cursor-default pointer-events-auto select-none inline-block">
          {/* 1. Base Dark Text (Visible Always) */}
          {/* We ref this to calculate coordinates relative to IT */}
          <h1
            ref={textRef}
            className="text-6xl md:text-9xl font-bold tracking-tighter text-[#1a1a1a]"
          >
            MADE WITH XBLT
          </h1>

          {/* 2. Revealed Neon Text (Masked by Mouse) */}
          <motion.h1
            className="absolute top-0 left-0 w-full text-6xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-[#E2F609] pointer-events-none"
            style={{
              // The clip-path coordinate system is local to this element.
              // Since we calculated mouse X/Y relative to this element, it matches perfectly.
              clipPath: useTransform(
                [springX, springY],
                ([x, y]) => `circle(250px at ${x}px ${y}px)`,
              ),
              WebkitClipPath: useTransform(
                [springX, springY],
                ([x, y]) => `circle(250px at ${x}px ${y}px)`,
              ),
            }}
          >
            MADE WITH XBLT
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-gray-400 max-w-2xl mx-auto mt-8 pointer-events-auto"
        >
          Explore the architectural feats built by the XBLT engine.
          <br />
          <span className="text-white">Clone. Remix. Deploy.</span>
        </motion.p>
      </div>
    </section>
  );
};

// --- 3D TILT CARD ---
const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 200);
    y.set(yPct * 200);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden hover:border-[#E2F609]/50 transition-colors duration-500 perspective-1000"
    >
      <div
        className="aspect-[4/3] relative overflow-hidden bg-[#111]"
        style={{ transform: "translateZ(20px)" }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority={index < 4} // Optimization for LCP
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />

        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
          <button className="px-5 py-2.5 bg-[#E2F609] text-black font-bold rounded-xl text-sm flex items-center gap-2 hover:scale-105 transition-transform shadow-lg">
            <Code2 className="w-4 h-4" /> Remix
          </button>
          <button className="px-5 py-2.5 bg-white/10 text-white font-bold rounded-xl text-sm flex items-center gap-2 hover:bg-white/20 transition-colors backdrop-blur-md">
            <ExternalLink className="w-4 h-4" /> Live
          </button>
        </div>
      </div>

      <div
        className="p-6 bg-[#0A0A0A] relative z-10"
        style={{ transform: "translateZ(30px)" }}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#E2F609] transition-colors tracking-tight">
              {project.title}
            </h3>
            <p className="text-xs text-gray-500 font-mono tracking-wide">
              {project.author}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-white bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
            <Heart className="w-3 h-3 text-[#E2F609] fill-[#E2F609]" />{" "}
            {project.likes}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech: string) => (
            <span
              key={tech}
              className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] text-gray-400 font-mono uppercase tracking-wider group-hover:border-[#E2F609]/30 group-hover:text-white transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ShowcasePage;
