"use client";

import { useState, useEffect, Suspense } from "react";
import { FcGoogle } from "react-icons/fc";
import { BiErrorCircle, BiLoaderAlt } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Zap, ShieldCheck, Command } from "lucide-react";

const SignInContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // --- ERROR HANDLING ---
  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      const message =
        errorParam === "Access_Denied"
          ? "Access denied. Authorization required."
          : "Authentication failed. Please try again.";
      setError(message);
      router.replace("/signin");
      setTimeout(() => setError(null), 5000);
    }
  }, [searchParams, router]);

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsLoading(true);
    try {
      window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/users/google`;
    } catch (err: any) {
      setError("Connection to identity provider failed.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-sans overflow-hidden selection:bg-[#E2F609] selection:text-black">
      {/* --- LEFT PANEL: INTERACTIVE TERMINAL (Desktop) --- */}
      <div className="hidden lg:flex w-6/12 relative flex-col justify-between p-16 border-r border-white/10 bg-black z-10 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px]"></div>

        {/* Top Branding */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#E2F609] rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(226,246,9,0.4)]">
              <Zap className="w-6 h-6 text-black fill-black" />
            </div>
            <span className="text-2xl font-bold tracking-tighter">
              XBLT IDENTITY
            </span>
          </div>
          <p className="text-gray-500 font-mono text-xs tracking-widest uppercase pl-14">
            Unified Access Portal v2.4.0
          </p>
        </motion.div>

        {/* CENTER: THE LIVE TERMINAL */}
        <div className="relative z-10 w-full">
          <div className="bg-[#0A0A0A] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            {/* Terminal Header */}
            <div className="h-8 bg-white/5 border-b border-white/5 flex items-center justify-between px-4">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
                <Command className="w-3 h-3" /> auth_handshake.sh
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 font-mono text-xs h-64 flex flex-col justify-end">
              <TerminalLogs />
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-[#E2F609] text-xs font-mono mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>SECURE CONNECTION ESTABLISHED</span>
          </div>
          <p className="text-gray-600 text-xs max-w-sm">
            This environment is monitored. All access attempts are logged for
            security auditing.
          </p>
        </div>
      </div>

      {/* --- RIGHT PANEL: LOGIN FORM --- */}
      <div className="w-full lg:w-6/12 relative flex items-center justify-center p-6 bg-[#050505]">
        {/* Ambient Glows */}
        <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-[#E2F609]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          {/* Mobile Header (Hidden on Desktop) */}
          <div className="lg:hidden text-center mb-12">
            <div className="inline-flex w-12 h-12 bg-[#E2F609] rounded-xl items-center justify-center mb-4 shadow-[0_0_30px_rgba(226,246,9,0.3)]">
              <Zap className="w-6 h-6 text-black fill-black" />
            </div>
            <h1 className="text-3xl font-bold tracking-tighter">XBLT.AI</h1>
          </div>

          {/* THE CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-10 shadow-2xl relative overflow-hidden"
          >
            {/* Top decorative line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#E2F609] to-transparent opacity-50"></div>

            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
                Enter the Engine
              </h2>
              <p className="text-gray-400 text-sm">
                Log in or Create an account to access your workspace.
              </p>
            </div>

            {/* Error Banner */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mb-6"
                >
                  <div className="bg-red-500/10 border border-red-500/20 text-red-200 text-sm p-4 rounded-xl flex items-center gap-3">
                    <BiErrorCircle className="text-lg shrink-0" />
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Google Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="cursor-pointer group relative w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-black font-bold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {/* Hover Shine Effect */}
              <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"></div>

              {isLoading ? (
                <BiLoaderAlt className="w-6 h-6 animate-spin text-black" />
              ) : (
                <>
                  <FcGoogle className="text-2xl" />
                  <span className="tracking-wide">Continue with Google</span>
                </>
              )}
            </button>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-px bg-white/10 flex-1"></div>
              <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                Single Sign-On
              </span>
              <div className="h-px bg-white/10 flex-1"></div>
            </div>
          </motion.div>

          <div className="mt-8 text-center space-y-2">
            <p className="text-xs text-gray-500">
              One account for XBLT Web, Desktop, and Cloud.
            </p>
            <div className="flex justify-center gap-4 text-xs text-gray-600">
              <a href="#" className="hover:text-[#E2F609] transition-colors">
                Terms of Service
              </a>
              <span>•</span>
              <a href="#" className="hover:text-[#E2F609] transition-colors">
                Privacy Protocol
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TerminalLogs = () => {
  const [lines, setLines] = useState<string[]>([
    "> Initializing secure handshake...",
  ]);

  useEffect(() => {
    const sequence = [
      { text: "> Resolving identity provider...", delay: 800 },
      { text: "> Connecting to auth.xblt.ai...", delay: 1600 },
      {
        text: "> TLS 1.3 connection established.",
        delay: 2400,
        color: "text-green-500",
      },
      { text: "> Verifying client integrity...", delay: 3200 },
      { text: "> Client verified.", delay: 4000, color: "text-green-500" },
      {
        text: "> Waiting for user credentials...",
        delay: 4800,
        color: "text-[#E2F609]",
      },
    ];

    let timeouts: NodeJS.Timeout[] = [];

    sequence.forEach(({ text, delay, color }) => {
      const timeout = setTimeout(() => {
        setLines((prev) => {
          const newLine = color ? <span className={color}>{text}</span> : text;
          const updated = [...prev, newLine as string];
          return updated.slice(-7);
        });
      }, delay);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="space-y-2">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-gray-400"
        >
          {typeof line === "string" ? line : line}
        </motion.div>
      ))}
      <motion.div
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="w-2 h-4 bg-[#E2F609] mt-2"
      />
    </div>
  );
};

const SignInPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <BiLoaderAlt className="text-[#E2F609] animate-spin w-8 h-8" />
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
};

export default SignInPage;
