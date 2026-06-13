import React from 'react';

export default function FeaturesSection() {
  return (
    <div id="features" className="w-full bg-white text-slate-900 pt-32 pb-32 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section 1: 3 Cards Grid */}
        <div className="mb-32">
          <div className="mb-16">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider mb-3 block">Built for Growth</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-slate-900">Amankan Keuanganmu Lebih Cepat</h2>
            <p className="text-slate-500 max-w-2xl text-lg font-light">
              FinSmart dirancang khusus untuk memastikan daya belimu tetap aman dari gerusan inflasi tahunan. Berikut fitur andalan kami.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div id="expense-tracker" className="group cursor-default">
              <div className="bg-slate-50 rounded-2xl p-6 mb-8 h-56 border border-slate-100 flex items-center justify-center overflow-hidden relative">
                 <div className="w-full max-w-[200px] h-full bg-white shadow-sm rounded-lg border border-slate-100 p-4 transform group-hover:-translate-y-2 transition-transform duration-500">
                    <div className="flex justify-between items-center mb-6">
                       <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Pengeluaran</div>
                       <div className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-red-400 rounded-full"></div></div>
                    </div>
                    <div className="text-3xl font-bold text-slate-800 mb-1">Rp 2.4jt</div>
                    <div className="text-xs text-slate-400 mb-6">Gadget & Hiburan</div>
                    <div className="w-full h-8 bg-emerald-50 rounded-md flex items-center justify-center text-emerald-600 text-xs font-semibold">
                       Lihat Detail
                    </div>
                 </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900">Smart Expense Tracker</h3>
              <p className="text-slate-500 leading-relaxed font-light">Catat pengeluaranmu. Sistem kami akan mengubah nominal besarmu ke kurs USD historis untuk memberimu efek "nostalgia" agar berhenti boros.</p>
            </div>

            {/* Card 2 */}
            <div id="skill-benchmark" className="group cursor-default">
              <div className="bg-slate-50 rounded-2xl p-6 mb-8 h-56 border border-slate-100 flex items-center justify-center overflow-hidden relative">
                 <div className="absolute left-0 top-0 bottom-0 w-[40%] bg-[#b5f164]"></div>
                 <div className="relative z-10 w-4/5 h-[110%] bg-white shadow-lg border border-slate-100 rounded-xl p-5 flex flex-col transform group-hover:scale-105 transition-transform duration-500 rotate-[-5deg]">
                    <div className="w-1/2 h-2 bg-slate-200 rounded mb-3"></div>
                    <div className="w-full h-2 bg-slate-100 rounded mb-4"></div>
                    <div className="flex-1 w-full bg-slate-50 rounded border border-slate-100 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-[#b5f164] opacity-50"></div>
                    </div>
                 </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900">Market Value & Skill</h3>
              <p className="text-slate-500 leading-relaxed font-light">Cari tahu rata-rata gaji untuk profesimu saat ini, dan temukan skill apa yang perlu dipelajari untuk menaikkan daya tawarmu di pasar kerja.</p>
            </div>

            {/* Card 3 */}
            <div className="group cursor-default">
              <div className="bg-slate-50 rounded-2xl p-6 mb-8 h-56 border border-slate-100 flex items-center justify-center overflow-hidden relative">
                 <div className="w-full bg-white shadow-sm border border-slate-100 rounded-lg p-5 transform group-hover:translate-y-2 transition-transform duration-500">
                    <div className="flex gap-2 mb-6">
                       <div className="flex-1 h-10 bg-slate-100 rounded-md flex items-center justify-center text-xs font-semibold text-slate-500">Debit</div>
                       <div className="flex-1 h-10 bg-white rounded-md border border-slate-200 shadow-sm flex items-center justify-center text-xs font-bold text-slate-800">QRIS</div>
                    </div>
                    <div className="w-full h-8 bg-slate-50 rounded mb-3 flex items-center px-3"><div className="w-1/3 h-2 bg-slate-200 rounded"></div></div>
                    <div className="w-full h-8 bg-slate-50 rounded flex items-center px-3"><div className="w-1/2 h-2 bg-slate-200 rounded"></div></div>
                 </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900">Seamless Integration</h3>
              <p className="text-slate-500 leading-relaxed font-light">Pantau terus pembaharuan kami. Ke depan, kami akan terhubung langsung dengan rekening bank untuk otomatisasi pencatatan finansialmu.</p>
            </div>
          </div>
        </div>
        {/* End of Section 1 Grid */}
      </div>
    </div>
  );
}