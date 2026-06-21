import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex bg-[#FDFDFC] font-sans">
      
      {/* Left Panel: The Form (60%) */}
      <div className="w-full lg:w-[55%] flex flex-col relative px-6 md:px-16 lg:px-24 xl:px-32 py-10">
        
        {/* Header / Nav */}
        <div className="flex justify-between items-center w-full relative z-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <div className="w-3.5 h-3.5 bg-white rounded-sm transform rotate-45"></div>
            </div>
            <span className="font-black text-2xl tracking-tight text-zinc-900">FinSmart</span>
          </Link>

          <Link 
            to="/" 
            className="flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors group px-4 py-2 rounded-full hover:bg-zinc-100"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Kembali
          </Link>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="mb-10">
              <h1 className="text-4xl lg:text-5xl font-black text-zinc-900 mb-4 tracking-tight leading-tight">
                {title}
              </h1>
              <p className="text-zinc-500 font-medium text-lg leading-relaxed">
                {subtitle}
              </p>
            </div>

            {children}
            
          </motion.div>
        </div>

        {/* Footer */}
        <div className="w-full text-zinc-400 text-xs font-medium tracking-wide pb-4">
          &copy; 2026 FinSmart Analytics. All rights reserved.
        </div>
      </div>

      {/* Right Panel: The Editorial Showcase (45%) */}
      <div className="hidden lg:flex lg:w-[45%] bg-zinc-950 p-12 relative overflow-hidden items-end justify-center">
        
        {/* Subtle Background Effects */}
        <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)]"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-zinc-800 rounded-full blur-[120px] opacity-50"></div>

        {/* Feature / Quote Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative z-10 w-full max-w-md"
        >
          {/* dotLottie Animation Player */}
          <div className="mb-12 relative w-full aspect-square flex items-center justify-center group">
            
            {/* Subtle glow behind animation */}
            <div className="absolute inset-0 bg-white/5 rounded-full blur-[80px] group-hover:bg-white/10 transition-colors duration-700"></div>

            <div className="relative z-10 w-[100%] h-[100%] group-hover:scale-105 transition-transform duration-700 flex items-center justify-center">
              <DotLottieReact
                src="https://lottie.host/c6a7dbe8-1099-4074-83c9-3a5852f391fe/3LRZqSV4i9.lottie"
                loop
                autoplay
              />
            </div>
            
            {/* Overlay UI Badge - High Contrast Editorial Style */}
            <div className="absolute -bottom-2 lg:-bottom-6 left-4 right-4 bg-white p-4 lg:p-5 rounded-2xl flex items-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 hover:scale-[1.02] transition-transform duration-300">
               <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                 <CheckCircle2 className="w-6 h-6 text-zinc-900" />
               </div>
               <div>
                 <div className="text-zinc-900 text-sm font-black tracking-wide uppercase">Data Terenkripsi</div>
                 <div className="text-zinc-500 text-xs font-medium mt-0.5">Keamanan Enkripsi AES-256</div>
               </div>
            </div>
          </div>

          <blockquote className="text-2xl font-bold text-white leading-snug mb-6">
            "FinSmart bukan sekadar alat pelacak, ini adalah asisten strategis untuk mengalahkan inflasi."
          </blockquote>
          
          <div className="flex items-center gap-4 mt-8">
             <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
                <span className="text-zinc-900 font-black text-lg tracking-tighter">AR</span>
             </div>
             <div>
               <div className="text-white text-sm font-bold">Alexander R.</div>
               <div className="text-zinc-400 text-xs font-medium uppercase tracking-wider mt-0.5">Chief Financial Officer</div>
             </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}