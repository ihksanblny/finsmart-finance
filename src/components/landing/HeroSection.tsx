import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <div className="mt-20 md:mt-32 mb-20 relative">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div className="flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 w-fit mb-8 text-sm">
            <span className="text-[#b5f164] text-xs">▶</span>
            <span className="text-white/90">Announcing FinSmart Beta 2.0 &rarr;</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
            All In One App <br /> Finance for Your <br /> Life.
          </h1>

          <p className="text-emerald-50/70 text-lg mb-10 max-w-md leading-relaxed font-light">
            Keep your personal account and all your finance needs safely organized under one roof. Manage money quickly, easily & efficiently against inflation.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link to="/register" className="px-8 py-4 rounded-full bg-[#b5f164] text-[#0a2615] font-semibold hover:bg-[#a4e253] transition-colors shadow-[0_0_30px_rgba(181,241,100,0.15)]">
              Buat Akun Gratis
            </Link>
            <Link to="/kalkulator" className="px-8 py-4 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10">
              Kalkulator Inflasi
            </Link>
            <Link to="/market-value" className="px-8 py-4 rounded-full bg-white/5 text-white font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm border border-white/10">
              Cek Market Value
            </Link>
          </div>
        </div>

        {/* Right Column: Visual Layouts */}
        <div className="relative mt-10 lg:mt-0 pl-10">
          {/* Main Dashboard Mockup */}
          <div className="bg-[#f8fafc] rounded-2xl p-5 shadow-2xl relative z-10 aspect-[4/3] flex flex-col overflow-hidden border border-slate-200">
            {/* Window Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>
              <div className="text-slate-400 text-xs font-medium">app.finsmart.com</div>
              <div className="w-10"></div>
            </div>

            {/* UI Mockup Details */}
            <div className="flex flex-1 gap-6">
              {/* Sidebar Mockup */}
              <div className="w-1/4 flex flex-col gap-3">
                <div className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                  <div className="w-4 h-4 bg-slate-800 rounded-sm"></div> Dashboard
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-md"></div>
                <div className="w-5/6 h-3 bg-slate-200 rounded-md"></div>
                <div className="w-4/6 h-3 bg-slate-200 rounded-md"></div>
                <div className="w-full h-3 bg-slate-200 rounded-md mt-4"></div>
                <div className="w-3/4 h-3 bg-slate-200 rounded-md"></div>
              </div>

              {/* Content Mockup */}
              <div className="w-3/4 flex flex-col gap-4">
                <div className="text-slate-800 font-bold">Dashboard</div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="text-slate-400 text-xs mb-1">Total Balance</div>
                    <div className="text-2xl font-bold text-slate-800">Rp 54.897.000</div>
                    <div className="text-emerald-500 text-xs font-semibold mt-1">+14.5% vs inflation</div>
                  </div>
                </div>

                {/* Chart Mockup */}
                <div className="w-full flex-1 bg-white rounded-xl border border-slate-100 relative overflow-hidden mt-2">
                  <svg className="absolute bottom-0 w-full h-full text-emerald-500 opacity-20" preserveAspectRatio="none" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M0,100 L0,80 Q10,70 20,80 T40,60 T60,70 T80,40 T100,50 L100,100 Z" />
                  </svg>
                  <svg className="absolute bottom-0 w-full h-full text-emerald-500" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M0,80 Q10,70 20,80 T40,60 T60,70 T80,40 T100,50" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Mockup overlapping */}
          <div className="absolute -left-10 -bottom-10 w-64 bg-white rounded-[2rem] p-6 shadow-2xl z-20 border-[6px] border-slate-800 flex flex-col">
            <div className="w-16 h-4 bg-slate-200 rounded-full mb-6"></div>

            <div className="w-full flex justify-between items-center mb-6">
              <div className="w-8 h-8 rounded-full bg-slate-200"></div>
              <div className="font-bold text-slate-800">FinSmart</div>
              <div className="w-6 h-6 rounded-full border-2 border-slate-200"></div>
            </div>

            <div className="w-full text-center mb-6">
              <div className="text-slate-400 text-xs mb-1">Real Income</div>
              <div className="text-2xl font-bold text-slate-800">Rp 12.500k</div>
            </div>

            {/* Mini Chart */}
            <div className="w-full h-24 mb-6 relative">
              <svg className="absolute bottom-0 w-full h-full text-emerald-500" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M0,60 L20,40 L40,70 L60,30 L80,50 L100,20" />
              </svg>
            </div>

            <div className="w-full">
              <div className="w-full h-14 bg-white shadow-sm rounded-xl mb-3 border border-slate-100 flex items-center px-3 gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100"></div>
                <div className="flex-1">
                  <div className="w-16 h-2 bg-slate-200 rounded mb-1"></div>
                  <div className="w-10 h-2 bg-slate-100 rounded"></div>
                </div>
              </div>
              <div className="w-full h-14 bg-white shadow-sm rounded-xl border border-slate-100 flex items-center px-3 gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100"></div>
                <div className="flex-1">
                  <div className="w-20 h-2 bg-slate-200 rounded mb-1"></div>
                  <div className="w-12 h-2 bg-slate-100 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="mt-20 pb-10 flex flex-col items-center justify-center text-emerald-50/40 animate-bounce cursor-pointer" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
        <span className="text-xs font-semibold mb-3 uppercase tracking-widest">Eksplorasi Fitur</span>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}