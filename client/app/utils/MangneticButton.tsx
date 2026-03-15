import { Command, Download } from "lucide-react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

const MagneticButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.8;
    const y = (e.clientY - top - height / 2) * 0.8;
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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex items-center justify-between px-8 py-5 bg-[#E2F609] rounded-2xl text-black font-bold text-lg overflow-hidden shadow-[0_0_30px_rgba(226,246,9,0.2)] hover:shadow-[0_0_60px_rgba(226,246,9,0.5)] transition-shadow cursor-pointer w-full sm:w-auto min-w-[320px] z-50"
    >
      <span className="relative z-10 flex items-center gap-3">
        <Command className="w-6 h-6" />
        <div className="flex flex-col items-start leading-tight">
          <span>Download XBLT Studio</span>
          <span className="text-[11px] font-mono opacity-80 uppercase tracking-wider">
            Win | Mac | Linux 
          </span>
        </div>
      </span>
      <div className="relative ml-2 z-10 w-10 h-10 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-[#E2F609] transition-all duration-300">
        <Download className="w-5 h-5" />
      </div>
      <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
    </motion.button>
  );
};

export default MagneticButton;
