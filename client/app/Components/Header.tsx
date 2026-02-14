import { Zap } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/10 bg-black/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <Zap className="w-6 h-6 text-[#E2F609] fill-[#E2F609] group-hover:scale-110 transition-transform" />
          <span className="font-bold text-xl tracking-tighter">
            XBLT<span className="text-[#E2F609]">.AI</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <Link
            href="/features"
            className="hover:text-[#E2F609] transition-colors"
          >
            Features
          </Link>
          <a href="#engine" className="hover:text-[#E2F609] transition-colors">
            The Engine
          </a>
          <a
            href="#comparison"
            className="hover:text-[#E2F609] transition-colors"
          >
            Web vs Desktop
          </a>
        </div>
        <div className="flex gap-4">
          <button className="text-sm font-semibold hover:text-white text-gray-400 transition-colors">
            Login
          </button>
          <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#E2F609] transition-colors">
            Get Early Access
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
