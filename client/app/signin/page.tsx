"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { FcGoogle } from "react-icons/fc";
import { BiErrorCircle } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const SignInContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const errorParam = searchParams.get("error");

    if (errorParam) {
      let message = "An unexpected error occurred.";

      switch (errorParam) {
        case "Google_Auth_Failed":
          message = "Google Authentication was canceled or failed.";
          break;
        case "Access_Denied":
          message = "You do not have permission to access this resource.";
          break;
        default:
          message = errorParam.replace(/_/g, " ");
      }

      setError(message);

      router.replace("/signin");

      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams, router]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        scale: 0.98,
        duration: 1,
        ease: "expo.out",
      });

      gsap.from(".animate-in", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2,
      });
    });

    const createParticles = () => {
      if (!particlesRef.current) return;
      particlesRef.current.innerHTML = "";
      const particles = 20;
      for (let i = 0; i < particles; i++) {
        const particle = document.createElement("div");
        particle.style.cssText = `
          position: absolute;
          width: ${Math.random() * 2 + 1}px;
          height: ${Math.random() * 2 + 1}px;
          background: #FFE900;
          border-radius: 50%;
          opacity: ${Math.random() * 0.2};
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
        `;
        particlesRef.current.appendChild(particle);

        gsap.to(particle, {
          y: "random(-100, 100)",
          x: "random(-100, 100)",
          duration: "random(10, 20)",
          repeat: -1,
          yoyo: true,
          ease: "none",
        });
      }
    };

    createParticles();
    return () => ctx.revert();
  }, []);

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsLoading(true);

    try {
      window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/users/google`;
    } catch (err: any) {
      console.error("Authentication failed:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Authentication failed. Please try again.",
      );
      setIsLoading(false);
      setTimeout(() => setError(null), 4000);
    }
  };

  const redirectTOPolicy = () => router.push("/policy");

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center font-sans">
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none"
      />
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-yellow-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-yellow-500/5 rounded-full blur-[120px]" />

      <div ref={containerRef} className="relative z-10 w-full max-w-110 px-6">
        <div className="text-center mb-10">
          <motion.div
            className="inline-block p-3 rounded-2xl bg-linear-to-b from-zinc-800 to-black border border-zinc-800 mb-4 animate-in"
            whileHover={{ rotate: 5 }}
          >
            <Image
              src="/img/logo.png"
              alt="XBLT Logo"
              width={64}
              height={64}
              className="rounded-lg"
            />
          </motion.div>
          <h1 className="text-4xl font-black tracking-tighter mb-2 animate-in">
            XBLT<span className="text-yellow-400">.</span>
          </h1>
          <p className="text-zinc-500 text-sm font-medium tracking-wide uppercase animate-in">
            AI-Powered Website Builder
          </p>
        </div>

        <div
          ref={cardRef}
          className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden animate-in"
        >
          <div className="relative z-10">
            <h2 className="text-xl font-semibold text-white mb-2 text-center">
              Welcome back
            </h2>
            <p className="text-zinc-400 text-sm text-center mb-8">
              Sign in to continue to your dashboard
            </p>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 text-red-200 text-sm px-4 py-3 rounded-xl">
                    <BiErrorCircle className="text-xl text-red-400 min-w-5 mt-0.5" />
                    <span className="leading-tight">{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.01, backgroundColor: "#f4f4f5" }}
              whileTap={{ scale: 0.99 }}
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-white text-black font-bold py-4 px-6 rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loader"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full"
                  />
                ) : (
                  <motion.div key="icon" className="flex items-center gap-3">
                    <FcGoogle className="text-2xl" />
                    <span>Continue with Google</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/10 blur-2xl -mr-12 -mt-12" />
        </div>

        <div className="mt-8 text-center animate-in">
          <p className="text-zinc-500 text-xs leading-relaxed">
            By continuing, you agree to our <br />
            <button
              onClick={redirectTOPolicy}
              className="text-zinc-300 hover:text-yellow-400 underline decoration-zinc-700 underline-offset-4 transition-colors"
            >
              Terms of Service
            </button>{" "}
            &{" "}
            <button
              onClick={redirectTOPolicy}
              className="text-zinc-300 hover:text-yellow-400 underline decoration-zinc-700 underline-offset-4 transition-colors"
            >
              Privacy Policy
            </button>
          </p>

          <div className="mt-10 pt-6 border-t border-zinc-900 flex justify-center items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em]">
              System Status: Operational
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SignInPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <SignInContent />
    </Suspense>
  );
};

export default SignInPage;
