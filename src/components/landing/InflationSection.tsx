import React from 'react';

export default function InflationSection() {
  return (
    <div id="inflation-calc" className="w-full flex flex-col md:flex-row relative z-20">
       {/* Left Dark Side */}
       <div className="bg-[#0e2917] text-white py-24 px-6 md:px-20 md:w-1/2 flex flex-col justify-center items-end">
          <div className="max-w-xl w-full">
            <span className="text-emerald-400 font-semibold text-sm mb-4 block uppercase tracking-widest">Global Scale</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">Hitung Gaji vs<br/>Inflasi Riil</h2>
            <p className="text-emerald-50/70 text-lg mb-12 font-light leading-relaxed">
              Jangan tertipu angka gaji yang naik tipis. Hitung nilai asli (Daya Beli) gajimu tahun ini dibanding tahun lalu setelah digerus persentase inflasi. Jangan biarkan inflasi diam-diam merampok kekayaanmu.
            </p>
            <div className="grid grid-cols-2 gap-8">
               <div>
                  <div className="text-4xl font-bold text-[#b5f164] mb-2">-8.5%</div>
                  <div className="text-emerald-50/60 text-sm font-light">Rata-rata penurunan<br/>daya beli tahunan</div>
               </div>
               <div>
                  <div className="text-4xl font-bold text-[#b5f164] mb-2">150M</div>
                  <div className="text-emerald-50/60 text-sm font-light">Data inflasi<br/>diperbarui harian</div>
               </div>
            </div>
          </div>
       </div>
       
       {/* Right Lime Side */}
       <div className="bg-[#b5f164] py-24 px-6 md:px-20 md:w-1/2 relative flex items-center justify-start overflow-hidden min-h-[500px]">
          {/* Decorative wireframe globe */}
          <div className="absolute -bottom-[30%] -right-[10%] w-[100%] h-[120%] opacity-20 pointer-events-none">
             <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="#0e2917" strokeWidth="0.3">
                <circle cx="50" cy="50" r="45" />
                <ellipse cx="50" cy="50" rx="45" ry="15" />
                <ellipse cx="50" cy="50" rx="15" ry="45" />
                <line x1="5" y1="50" x2="95" y2="50" />
                <line x1="50" y1="5" x2="50" y2="95" />
             </svg>
          </div>
          
          {/* Floating Pills */}
          <div className="relative z-10 w-full max-w-sm flex flex-col gap-6">
             <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center justify-between transform -translate-x-4 transition-transform hover:scale-105 duration-300">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shadow-inner">
                      <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                      </svg>
                   </div>
                   <div>
                      <div className="text-sm font-bold text-slate-800">Daya Beli 2023</div>
                      <div className="text-xs text-slate-400">Turun drastis</div>
                   </div>
                </div>
                <div className="text-red-500 font-bold bg-red-50 px-3 py-1 rounded-full text-sm">-Rp 2.500k</div>
             </div>
             
             <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center justify-between transform translate-x-8 transition-transform hover:scale-105 duration-300">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shadow-inner">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                   </div>
                   <div>
                      <div className="text-sm font-bold text-slate-800">Target Gaji 2024</div>
                      <div className="text-xs text-slate-400">Harus naik</div>
                   </div>
                </div>
                <div className="text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full text-sm">+Rp 3.200k</div>
             </div>
             
             <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center justify-between transform transition-transform hover:scale-105 duration-300">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shadow-inner">
                      <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                   </div>
                   <div>
                      <div className="text-sm font-bold text-slate-800">Beban Inflasi</div>
                      <div className="text-xs text-slate-400">Tercatat</div>
                   </div>
                </div>
                <div className="text-orange-500 font-bold bg-orange-50 px-3 py-1 rounded-full text-sm">8.5%</div>
             </div>
          </div>
       </div>
    </div>
  );
}