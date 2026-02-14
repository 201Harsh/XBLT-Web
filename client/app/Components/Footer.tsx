import React from "react";
import {
  Zap,
  Github,
  Twitter,
  Linkedin,
  Disc,
  ArrowRight,
  Mail,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-black border-t border-white/10 overflow-hidden font-sans selection:bg-[#E2F609] selection:text-black">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 max-w-250 h-96 bg-[#E2F609]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-12 relative z-10">
        {/* --- TOP CTA SECTION --- */}
        <div className="flex flex-col items-center text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E2F609]/30 bg-[#E2F609]/5 text-[#E2F609] text-xs font-mono mb-8 animate-pulse">
            <span className="w-2 h-2 bg-[#E2F609] rounded-full"></span>
            SYSTEM ONLINE
          </div>

          <h2 className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 text-white leading-[0.85]">
            THINK. <br />
            <span className="text-transparent bg-clip-text bg-linear-to-b from-[#E2F609] to-transparent opacity-80">
              EXECUTE.
            </span>
          </h2>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            XBLT sits between your thoughts, your system, and your cloud
            services. The Personal Execution Engine for the next generation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
            <button className="group w-full sm:w-auto px-8 py-4 bg-[#E2F609] text-black font-bold text-lg rounded-xl hover:bg-[#d4e608] hover:scale-105 transition-all shadow-[0_0_30px_rgba(226,246,9,0.3)] flex items-center justify-center gap-2">
              Start Building{" "}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-bold text-lg rounded-xl hover:bg-white/10 transition-colors">
              Read Manifesto
            </button>
          </div>
        </div>

        {/* --- MAIN FOOTER GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 border-t border-white/10 pt-16 mb-16">
          {/* Column 1: Brand (Span 2) */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[#E2F609] rounded flex items-center justify-center text-black">
                <Zap className="w-5 h-5 fill-black" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tighter">
                XBLT.AI
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-8 max-w-xs">
              The Operating System for Creation. Built for those who refuse to
              write boilerplate.
            </p>

            {/* Newsletter Input */}
            <div className="flex items-center bg-[#0A0A0A] border border-white/10 rounded-lg p-1 max-w-xs focus-within:border-[#E2F609]/50 transition-colors">
              <Mail className="w-4 h-4 text-gray-500 ml-3" />
              <input
                type="email"
                placeholder="Join the waitlist..."
                className="bg-transparent border-none text-white text-sm px-3 py-2 w-full focus:outline-none placeholder-gray-600"
              />
              <button className="p-2 bg-white/5 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <a href="#" className="hover:text-[#E2F609] transition-colors">
                  The Engine
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#E2F609] transition-colors">
                  Desktop App
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#E2F609] transition-colors">
                  Web Generator
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#E2F609] transition-colors">
                  Templates
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#E2F609] transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-white font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <a href="#" className="hover:text-[#E2F609] transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#E2F609] transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#E2F609] transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#E2F609] transition-colors">
                  Changelog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#E2F609] transition-colors">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <a href="#" className="hover:text-[#E2F609] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#E2F609] transition-colors">
                  Careers
                </a>{" "}
                <span className="text-[10px] bg-[#E2F609]/10 text-[#E2F609] px-1.5 py-0.5 rounded ml-1">
                  Hiring
                </span>
              </li>
              <li>
                <a href="#" className="hover:text-[#E2F609] transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#E2F609] transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#E2F609] transition-colors">
                  Partners
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Legal (Hidden on mobile, shown on larger screens) */}
          <div className="hidden md:block">
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <a href="#" className="hover:text-[#E2F609] transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#E2F609] transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#E2F609] transition-colors">
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-xs text-gray-600 font-mono">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span>ALL SYSTEMS OPERATIONAL</span>
          </div>

          <div className="flex gap-6">
            <SocialIcon icon={<Twitter className="w-5 h-5" />} />
            <SocialIcon icon={<Github className="w-5 h-5" />} />
            <SocialIcon icon={<Linkedin className="w-5 h-5" />} />
            <SocialIcon icon={<Disc className="w-5 h-5" />} /> {/* Discord */}
          </div>

          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} XBLT Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Helper for Social Icons
const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <a
    href="#"
    className="text-gray-500 hover:text-[#E2F609] hover:scale-110 transition-all duration-300"
  >
    {icon}
  </a>
);

export default Footer;
