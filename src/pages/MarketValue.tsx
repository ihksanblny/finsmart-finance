import React, { useState } from 'react';
import FreeToolNav from '../components/FreeToolNav';
import { useMarketValue, type MarketData } from '../hooks/useMarketValue';

export default function MarketValue() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<MarketData | null>(null);
  const { professions, loading } = useMarketValue();

  const filteredRoles = professions.filter(role => 
    role.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#b5f164]/30 pb-20">
      <FreeToolNav />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-black tracking-tight text-[#0e2917] mb-3">Market Value & Skill Benchmark</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Jika gajimu terus-menerus kalah melawan inflasi, solusi terbaiknya bukanlah berhemat ekstrem, melainkan 
            <strong className="text-[#0e2917]"> menaikkan daya tawar profesionalmu</strong>. Cek nilai pasar profesimu saat ini.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-medium">Mengambil data pasar terbaru...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar / Search List */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col h-[600px]">
            <h3 className="font-bold text-[#0e2917] mb-4">Cari Profesi</h3>
            <div className="relative mb-6">
              <input 
                type="text" 
                placeholder="Contoh: Data Analyst..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b5f164]/50 focus:border-[#0e2917] transition-all"
              />
              <svg className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 flex flex-col gap-2">
              {filteredRoles.length > 0 ? (
                filteredRoles.map(role => (
                  <button 
                    key={role.id}
                    onClick={() => setSelectedRole(role)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selectedRole?.id === role.id 
                        ? 'bg-[#0e2917] text-white border-[#0e2917] shadow-lg shadow-[#0e2917]/20' 
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold">{role.title}</div>
                    <div className={`text-xs mt-1 ${selectedRole?.id === role.id ? 'text-emerald-300' : 'text-slate-400'}`}>
                      {role.category}
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400 text-sm">
                  Profesi tidak ditemukan.
                </div>
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8">
            {selectedRole ? (
              <div className="space-y-6">
                {/* Benchmark Card */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#b5f164]/20 to-transparent rounded-bl-full -z-10"></div>
                  
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 uppercase tracking-wider mb-4 inline-block">
                        {selectedRole.category}
                      </span>
                      <h2 className="text-3xl font-black text-[#0e2917]">{selectedRole.title}</h2>
                      <div className="flex items-center gap-4 mt-2">
                        <p className="text-slate-500">Demand di Indonesia: <strong className="text-slate-700">{selectedRole.demand}</strong></p>
                        {selectedRole.sourceUrl && (
                          <a 
                            href={selectedRole.sourceUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100 hover:bg-blue-100 transition flex items-center gap-1"
                          >
                            Lihat Sumber Asli
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Entry Level</p>
                      <p className="text-xl font-bold text-slate-700">Rp {(selectedRole.salaryMin / 1000000).toFixed(1)} Jt</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-[#0e2917] border border-[#163c23] shadow-lg transform md:-translate-y-2">
                      <p className="text-xs text-[#b5f164]/70 font-bold uppercase tracking-wider mb-1">Rata-rata (Mid)</p>
                      <p className="text-2xl font-black text-white">Rp {(selectedRole.salaryAvg / 1000000).toFixed(1)} Jt</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Senior Level</p>
                      <p className="text-xl font-bold text-slate-700">Rp {(selectedRole.salaryMax / 1000000).toFixed(1)} Jt</p>
                    </div>
                  </div>

                  {/* Visual Range Bar */}
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                    <div className="h-full bg-slate-300" style={{ width: '20%' }}></div>
                    <div className="h-full bg-emerald-500" style={{ width: '50%' }}></div>
                    <div className="h-full bg-[#0e2917]" style={{ width: '30%' }}></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-2 px-1 uppercase tracking-wider">
                    <span>Junior</span>
                    <span>Mid-Level</span>
                    <span>Senior/Lead</span>
                  </div>
                </div>

                {/* Skills Upgrade Card */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0e2917]">Skill Upgrade Suggestion</h3>
                      <p className="text-sm text-slate-500">Pelajari skill bernilai tinggi ini untuk menembus gaji batas atas (Senior).</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedRole.skills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 group hover:border-[#b5f164] hover:bg-white transition-all">
                        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#0e2917] font-bold text-xs shadow-sm group-hover:bg-[#b5f164] group-hover:border-[#b5f164] transition-colors">
                          {index + 1}
                        </div>
                        <span className="font-semibold text-slate-700">{skill}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <div className="flex gap-4 items-start p-4 rounded-2xl bg-[#b5f164]/10 border border-[#b5f164]/40">
                      <span className="text-2xl mt-1">🎯</span>
                      <div>
                        <h4 className="font-bold text-[#0e2917] text-sm mb-1">Pola Pikir Anti-Inflasi</h4>
                        <p className="text-sm text-[#0e2917]/80 leading-relaxed">
                          Inflasi sering kali melaju lebih cepat dari kenaikan gaji tahunan. Cara terampuh untuk melawannya bukan hanya dengan menekan pengeluaran, tapi dengan terus meningkatkan <strong className="font-black text-[#0e2917]">Market Value</strong> (nilai pasarmu) melalui pembelajaran skill baru.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-full bg-white border border-slate-200 border-dashed rounded-3xl flex flex-col items-center justify-center text-center p-12 min-h-[600px]">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100">
                  <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-600 mb-2">Pilih Profesi di Sebelah Kiri</h2>
                <p className="text-slate-400 max-w-sm mx-auto">
                  Lihat patokan gaji rata-rata (benchmark) di pasar saat ini dan skill apa saja yang perlu kamu pelajari untuk menaikkan daya tawarmu.
                </p>
              </div>
            )}
          </div>
          </div>
        )}
      </main>
    </div>
  );
}
