import React from 'react';
import { motion } from 'framer-motion';

export default function HeroIllustration() {
  return (
    <div className="relative w-full max-w-4xl aspect-[16/9] flex items-center justify-center">
      {/* Abstract Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <svg 
        viewBox="0 0 800 500" 
        className="w-full h-full drop-shadow-2xl z-10"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main Dashboard Panel */}
        <motion.rect 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          x="100" y="80" width="600" height="360" rx="16" 
          fill="#09090b" 
          stroke="#e4e4e7" strokeWidth="2"
        />
        
        {/* Dashboard Top Bar */}
        <motion.rect 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          x="100" y="80" width="600" height="40" rx="16" 
          fill="#18181b" 
        />
        <circle cx="125" cy="100" r="4" fill="#52525b" />
        <circle cx="140" cy="100" r="4" fill="#52525b" />
        <circle cx="155" cy="100" r="4" fill="#52525b" />

        {/* Dashboard Sidebar */}
        <motion.rect 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          x="120" y="140" width="120" height="280" rx="8" 
          fill="#18181b" 
        />
        <rect x="135" y="160" width="90" height="12" rx="4" fill="#27272a" />
        <rect x="135" y="190" width="70" height="8" rx="4" fill="#27272a" />
        <rect x="135" y="210" width="80" height="8" rx="4" fill="#27272a" />
        <rect x="135" y="230" width="60" height="8" rx="4" fill="#27272a" />

        {/* Main Content Area */}
        <motion.rect 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          x="260" y="140" width="420" height="280" rx="8" 
          fill="#18181b" 
        />

        {/* Animated Bar Charts */}
        <motion.rect 
          initial={{ height: 0, y: 380 }}
          animate={{ height: 60, y: 320 }}
          transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
          x="290" y="320" width="40" height="60" rx="4" 
          fill="#52525b" 
        />
        <motion.rect 
          initial={{ height: 0, y: 380 }}
          animate={{ height: 120, y: 260 }}
          transition={{ delay: 0.7, duration: 0.8, type: "spring" }}
          x="350" y="260" width="40" height="120" rx="4" 
          fill="#71717a" 
        />
        <motion.rect 
          initial={{ height: 0, y: 380 }}
          animate={{ height: 180, y: 200 }}
          transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
          x="410" y="200" width="40" height="180" rx="4" 
          fill="#a1a1aa" 
        />
        <motion.rect 
          initial={{ height: 0, y: 380 }}
          animate={{ height: 220, y: 160 }}
          transition={{ delay: 0.9, duration: 0.8, type: "spring" }}
          x="470" y="160" width="40" height="220" rx="4" 
          fill="#ffffff" 
        />

        {/* Animated Trend Line (The Magic SVG feature) */}
        <motion.path 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
          d="M 280 340 Q 320 300 360 270 T 430 200 T 500 140 L 530 110" 
          stroke="#ffffff" 
          strokeWidth="6" 
          strokeLinecap="round" 
          fill="none" 
          style={{ filter: 'drop-shadow(0px 8px 12px rgba(255,255,255,0.2))' }}
        />

        {/* Floating Data Node 1 */}
        <motion.g
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="530" cy="110" r="16" fill="#ffffff" stroke="#09090b" strokeWidth="4" />
          <circle cx="530" cy="110" r="6" fill="#09090b" />
        </motion.g>

        {/* Floating Accent Widget */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, 10, 0] }}
          transition={{ delay: 1.2, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
        >
          <rect x="620" y="120" width="160" height="80" rx="12" fill="#ffffff" stroke="#e4e4e7" strokeWidth="2" />
          <path d="M640 160 L655 145 L665 155 L685 135" stroke="#09090b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="700" y="140" width="60" height="10" rx="5" fill="#e4e4e7" />
          <rect x="700" y="160" width="40" height="10" rx="5" fill="#e4e4e7" />
        </motion.g>

        {/* Giant Abstract Magnifying Glass / Cursor */}
        <motion.g
          initial={{ opacity: 0, x: -40, y: 40 }}
          animate={{ opacity: 1, x: 0, y: [0, -15, 0] }}
          transition={{ delay: 1.4, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
        >
          <circle cx="200" cy="380" r="40" fill="transparent" stroke="#ffffff" strokeWidth="12" />
          <line x1="230" y1="410" x2="270" y2="450" stroke="#ffffff" strokeWidth="16" strokeLinecap="round" />
          <circle cx="200" cy="380" r="20" fill="#ffffff" opacity="0.2" />
        </motion.g>

      </svg>
    </div>
  );
}
