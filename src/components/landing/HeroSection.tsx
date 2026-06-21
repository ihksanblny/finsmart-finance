import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, ShieldCheck } from 'lucide-react';
import HeroIllustration from './HeroIllustration';

export default function HeroSection() {
  return (
    <div className="mt-20 md:mt-28 mb-32 relative z-10 flex flex-col items-center">
      
      {/* Top Badge */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 bg-white text-zinc-600 text-xs font-semibold mb-8"
      >
        <span className="w-2 h-2 rounded-full bg-zinc-900"></span>
        Career Analytics Platform
      </motion.div>

      {/* Typography */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-5xl md:text-7xl font-black text-center text-zinc-900 tracking-tight leading-[1.1] mb-6 max-w-4xl"
      >
        Measure Your Market Value. <br />
        <span className="text-zinc-400">Master Your Career.</span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-zinc-500 text-lg md:text-xl text-center max-w-2xl leading-relaxed mb-10 font-medium"
      >
        Platform analitik komprehensif untuk memantau nilai gaji Anda, menargetkan skill berbayar tinggi, dan mengalahkan laju inflasi.
      </motion.p>

      {/* CTAs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center gap-4 mb-20"
      >
        <Link 
          to="/register" 
          className="group flex items-center gap-2 px-8 py-3.5 bg-zinc-900 text-white font-semibold rounded-full hover:bg-black transition-colors"
        >
          Start Analyzing <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link 
          to="/market-value" 
          className="px-8 py-3.5 rounded-full bg-white text-zinc-900 font-semibold hover:bg-zinc-50 transition-colors border border-zinc-200 shadow-sm"
        >
          View Live Demo
        </Link>
      </motion.div>

      {/* The Dashboard Mockup - Stark Black & White Contrast */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl relative"
      >
        {/* Native React SVG Illustration replacing the heavy mockup */}
        <HeroIllustration />

        {/* Floating Element 1 - Stark White */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-8 top-1/4 bg-white border border-zinc-200 p-4 rounded-xl shadow-xl z-20 flex items-center gap-4 hidden md:flex"
        >
          <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
             <TrendingUp className="w-5 h-5 text-zinc-900" />
          </div>
          <div>
            <div className="text-xs text-zinc-500 font-medium">Market Value</div>
            <div className="text-zinc-900 font-bold">+ Rp 4.5M/yr</div>
          </div>
        </motion.div>

        {/* Floating Element 2 - Stark White */}
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -left-10 bottom-1/4 bg-white border border-zinc-200 p-4 rounded-xl shadow-xl z-20 flex flex-col gap-2 hidden md:flex"
        >
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
             <ShieldCheck className="w-4 h-4 text-zinc-900" /> Skill Validated
          </div>
          <div className="text-sm text-zinc-900 font-bold">React Architecture</div>
          <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden mt-1">
             <div className="w-[85%] h-full bg-zinc-900"></div>
          </div>
        </motion.div>
      </motion.div>

    </div>
  );
}