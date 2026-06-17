import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex w-full font-sans">
      {/* Left Side - Visual Branding (Hidden on small screens) */}
      <div className="hidden lg:flex w-1/2 bg-[#0e2917] p-12 flex-col justify-between relative overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#b5f164]/20 rounded-full blur-[80px] transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 relative z-10 w-fit hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-[#0e2917] rounded-sm transform rotate-45"></div>
          </div>
          <span className="font-bold text-2xl tracking-tight text-white">FinSmart</span>
        </Link>

        {/* Center Content */}
        <div className="relative z-10 max-w-lg mt-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
            Mulai Kendalikan Masa Depan Keuanganmu.
          </h1>
          <p className="text-emerald-50/70 text-lg font-light leading-relaxed mb-12">
            Amankan daya belimu dari gerusan inflasi. Lacak, kelola, dan temukan potensi nilai terbaik dari dirimu bersama FinSmart.
          </p>

          {/* Floating UI Mockup element */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl shadow-2xl w-3/4 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
             <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-[#b5f164] flex items-center justify-center shadow-inner">
                      <svg className="w-5 h-5 text-[#0e2917]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                   </div>
                   <div>
                      <div className="text-sm font-bold text-white">Daya Beli Terjaga</div>
                      <div className="text-xs text-emerald-50/60">Tahun 2026</div>
                   </div>
                </div>
                <div className="text-[#b5f164] font-bold text-lg">+14.5%</div>
             </div>
             <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="w-[75%] h-full bg-[#b5f164] rounded-full"></div>
             </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-emerald-50/50 text-sm">
          &copy; 2026 FinSmart. Seluruh hak cipta dilindungi.
        </div>
      </div>

      {/* Right Side - Form Area */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center items-center p-6 md:p-12 relative">
        {/* Back to Home Button (Top Right) */}
        <Link to="/" className="absolute top-8 right-6 md:right-12 flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-800 transition-colors bg-slate-50 hover:bg-slate-100 px-4 py-2 rounded-full border border-slate-100 shadow-sm z-20">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali
        </Link>

        {/* Mobile Logo (visible only on small screens) */}
        <Link to="/" className="lg:hidden absolute top-8 left-6 flex items-center gap-2 mb-10">
          <div className="w-6 h-6 bg-[#0e2917] rounded-md flex items-center justify-center shadow-md">
            <div className="w-3 h-3 bg-white rounded-[2px] transform rotate-45"></div>
          </div>
          <span className="font-bold text-xl tracking-tight text-[#0e2917]">FinSmart</span>
        </Link>

        <div className="w-full max-w-md mt-16 lg:mt-0">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">{title}</h2>
            <p className="text-slate-500">{subtitle}</p>
          </div>

          {children}

        </div>
      </div>
    </div>
  );
}