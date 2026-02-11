"use client";

import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { HiMail } from "react-icons/hi";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });
    }

    if (titleRef.current) {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: -30,
        duration: 1.2,
        delay: 0.3,
        ease: "back.out(1.7)",
      });
    }

    // Create floating particles
    const createParticles = () => {
      if (!particlesRef.current) return;

      const particles = 15;
      for (let i = 0; i < particles; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        particle.style.cssText = `
          position: absolute;
          width: ${Math.random() * 4 + 1}px;
          height: ${Math.random() * 4 + 1}px;
          background: #FFE900;
          border-radius: 50%;
          opacity: ${Math.random() * 0.3 + 0.1};
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation: float ${Math.random() * 10 + 10}s linear infinite;
        `;
        particlesRef.current.appendChild(particle);
      }
    };

    createParticles();
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle sign in logic here
      console.log("Signing in with:", email);
    }, 1500);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    // Simulate Google sign in
    setTimeout(() => {
      setIsLoading(false);
      // Handle Google sign in logic here
      console.log("Google sign in");
    }, 1500);
  };

  const redirectTOPolicy = () => {
    router.push("/policy");
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none"
      ></div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>

      <div
        ref={containerRef}
        className="relative z-10 container mx-auto px-4 py-12"
      >
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Image
                src="/img/logo.png"
                alt="XBLT Logo"
                width={98}
                height={98}
                className="rounded-lg bg-linear-to-br from-black to-gray-950 p-1"
              />
              <h1
                ref={titleRef}
                className="text-5xl font-bold bg-linear-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent tracking-wider"
              >
                XBLT
              </h1>
            </div>
            <p className="text-gray-400 text-lg">AI-Powered Website Builder</p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-yellow-500/80 text-sm mt-2 font-mono"
            >
              Build Smarter. Launch Faster.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-gray-900/50 backdrop-blur-lg border border-yellow-500/20 rounded-2xl p-8 shadow-2xl shadow-yellow-500/10"
          >
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Welcome Back
            </h2>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="cursor-pointer w-full flex items-center justify-center gap-3 bg-white text-gray-900 hover:bg-gray-100 font-semibold py-4 px-6 rounded-xl mb-6 transition-all duration-300 border border-transparent hover:border-yellow-400 group relative overflow-hidden"
            >
              <motion.div className="absolute inset-0 bg-linear-to-r from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <FcGoogle className="text-2xl" />
              <span>Continue with Google</span>
            </motion.button>

            <div className="flex items-center justify-center mb-6">
              <div className="grow h-px bg-gray-700"></div>
              <span className="mx-4 text-gray-500 text-sm">OR</span>
              <div className="grow h-px bg-gray-700"></div>
            </div>

            <form onSubmit={handleEmailSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Continue with Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <HiMail className="text-yellow-400 text-xl" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-gray-800/50 border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 text-white placeholder-gray-500 rounded-xl pl-12 pr-4 py-4 transition-all duration-300 outline-none"
                    required
                  />
                  <motion.div
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    animate={email ? { scale: 1 } : { scale: 0 }}
                  >
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  </motion.div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="cursor-pointer w-full bg-linear-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-yellow-500/25 relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  animate={isLoading ? { x: "100%" } : { x: "-100%" }}
                  transition={{
                    duration: 1,
                    repeat: isLoading ? Infinity : 0,
                    ease: "linear",
                  }}
                />
                <span className="relative flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                      />
                      Processing...
                    </>
                  ) : (
                    "Continue with Email"
                  )}
                </span>
              </motion.button>
            </form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-gray-500 text-sm text-center mt-8"
            >
              By continuing, you agree to XBLT&apos;s{" "}
              <button
                onClick={redirectTOPolicy}
                className="text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                Terms of Service
              </button>{" "}
              and{" "}
              <button
                onClick={redirectTOPolicy}
                className="text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                Privacy Policy
              </button>
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center mt-8 text-gray-600 text-sm"
          >
            <p className="font-mono">
              <span className="text-yellow-500">&gt;_</span> Build your dream
              site with AI
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
