const Footer = () => {
  return (
    <footer className="relative py-32 bg-black border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <h2 className="gsap-reveal text-6xl md:text-8xl font-bold tracking-tighter mb-8">
          THINK. <br />
          <span className="text-transparent bg-clip-text bg-linear-to-b from-[#E2F609] to-transparent">
            EXECUTE.
          </span>
        </h2>
        <p className="gsap-reveal text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          XBLT sits between your thoughts, your system, and your cloud services.
          It is the Personal Execution Engine for the next generation of
          builders.
        </p>

        <div className="gsap-reveal flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
          <button className="px-8 py-4 bg-[#E2F609] text-black font-bold rounded-xl hover:bg-[#c9db08] transition-all w-full sm:w-auto">
            Start Building Free
          </button>
          <button className="px-8 py-4 bg-zinc-900 border border-white/10 text-white font-bold rounded-xl hover:bg-zinc-800 transition-all w-full sm:w-auto">
            Read Manifesto
          </button>
        </div>

        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} XBLT Inc.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">
              Twitter
            </a>
            <a href="#" className="hover:text-white">
              GitHub
            </a>
            <a href="#" className="hover:text-white">
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
