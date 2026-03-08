import { Zap, LayoutDashboard, Settings, LogOut, User } from "lucide-react";
import Link from "next/link";

const GenHeader = () => {
  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <header className="rounded-full border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl flex items-center px-2 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
          <Link
            href="/"
            className="flex items-center gap-2 pl-4 pr-6 border-r border-white/10 cursor-pointer group"
          >
            <Zap className="w-5 h-5 text-[#E2F609] fill-[#E2F609] group-hover:drop-shadow-[0_0_10px_rgba(226,246,9,0.8)] transition-all" />
            <span className="font-bold tracking-tight text-sm text-white group-hover:text-[#E2F609] transition-colors">
              XBLT
            </span>
          </Link>

          <nav className="flex items-center gap-2 px-4 border-r border-white/10">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/10 text-sm text-gray-300 hover:text-white transition-colors cursor-pointer">
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </button>
            <button className="px-4 py-2 rounded-full hover:bg-white/10 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
              Pricing
            </button>
            <button className="px-4 py-2 rounded-full hover:bg-white/10 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
              Docs
            </button>
          </nav>

          <div className="pl-4 pr-2 relative group">
            <div className="cursor-pointer w-9 h-9 rounded-full bg-linear-to-br from-[#E2F609]/20 to-transparent border border-[#E2F609]/30 flex items-center justify-center text-[#E2F609] text-xs font-bold shadow-[0_0_10px_rgba(226,246,9,0.1)] group-hover:shadow-[0_0_15px_rgba(226,246,9,0.3)] group-hover:border-[#E2F609]/60 transition-all">
              HP
            </div>

            <div className="absolute top-full right-0 mt-3 w-56 bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/5 bg-white/2">
                <p className="text-sm font-bold text-white flex items-center gap-2">
                  Harsh Pandey
                  <span className="px-1.5 py-0.5 rounded-md bg-[#E2F609]/20 text-[#E2F609] text-[10px] uppercase tracking-wider font-bold">
                    Pro
                  </span>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">harsh@xblt.app</p>
              </div>
              <div className="p-2 flex flex-col gap-1">
                <button className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer transition-colors">
                  <User className="w-4 h-4" /> Profile
                </button>
                <button className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer transition-colors">
                  <Settings className="w-4 h-4" /> Settings
                </button>
                <div className="h-px w-full bg-white/5 my-1" />
                <button className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl cursor-pointer transition-colors">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default GenHeader;
