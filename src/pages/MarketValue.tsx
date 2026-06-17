import React, { useState } from 'react';
import FreeToolNav from '../components/FreeToolNav';
import { useMarketValue } from '../hooks/useMarketValue';
import { SalaryCalculatorCard } from '../components/market-value/SalaryCalculatorCard';
import { GoldenSkills } from '../components/market-value/GoldenSkills';
import { BaselineSkills } from '../components/market-value/BaselineSkills';
import { NicheSkills } from '../components/market-value/NicheSkills';
import { CommoditySkills } from '../components/market-value/CommoditySkills';
export default function MarketValue() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [ownedSubSkills, setOwnedSubSkills] = useState<string[]>([]);
  const { professions, loading } = useMarketValue();

  const selectedRole = professions.find(p => p.id === selectedRoleId) || null;

  const filteredRoles = professions.filter(role =>
    role.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Salary Engine Logic
  let estimatedSalary = 0;
  let feedbackText: React.ReactNode = "";
  let baselineScore = 0;
  
  if (selectedRole) {
    const baseline = selectedRole.skills.filter(s => s.category === 'baseline');
    const golden = selectedRole.skills.filter(s => s.category === 'golden');
    
    const totalBaselineSubSkills = baseline.reduce((acc, skill) => acc + (skill.subSkills?.length || 0), 0);
    const ownedBaselineCount = baseline.reduce((acc, skill) => acc + (skill.subSkills?.filter(sub => ownedSubSkills.includes(sub)).length || 0), 0);
    baselineScore = totalBaselineSubSkills > 0 ? ownedBaselineCount / totalBaselineSubSkills : 1;

    const totalGoldenSubSkills = golden.reduce((acc, skill) => acc + (skill.subSkills?.length || 0), 0);
    const ownedGoldenCount = golden.reduce((acc, skill) => acc + (skill.subSkills?.filter(sub => ownedSubSkills.includes(sub)).length || 0), 0);
    const rawGoldenScore = totalGoldenSubSkills > 0 ? ownedGoldenCount / totalGoldenSubSkills : 0;
    
    // FIX LOGIC: Golden skill butuh fondasi. Jika baseline = 0, golden tidak ada harganya.
    // Semakin tinggi baseline, semakin optimal efek golden skill.
    const goldenScore = rawGoldenScore * baselineScore;
    
    const midGap = selectedRole.salaryAvg - selectedRole.salaryMin;
    const maxGap = selectedRole.salaryMax - selectedRole.salaryAvg;
    
    estimatedSalary = selectedRole.salaryMin + (midGap * baselineScore) + (maxGap * goldenScore);
    
    if (baselineScore < 1 && rawGoldenScore > 0) {
      feedbackText = (
        <span className="flex items-start gap-2">
          <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Percuma punya skill langka kalau {totalBaselineSubSkills - ownedBaselineCount} sub-skill dasar belum dikuasai. Lengkapi Core Skills dulu!</span>
        </span>
      );
    } else if (baselineScore < 1) {
      feedbackText = `Kamu masih kurang ${totalBaselineSubSkills - ownedBaselineCount} sub-skill wajib. Pelajari segera agar fondasimu kuat.`;
    } else if (goldenScore === 0) {
      feedbackText = "Fondasi Core Skills sudah 100%! Gembok Golden Skill terbuka. Silakan tabung skill langka untuk menembus gaji Senior.";
    } else if (goldenScore > 0 && goldenScore < 1) {
      feedbackText = "Daya tawarmu meroket! Fondasi solid + skill langka memberimu senjata ampuh untuk nego gaji.";
    } else if (goldenScore === 1) {
      feedbackText = "Exceptional! Semua kombinasi skill sudah sempurna. Jangan ragu minta batas atas (Max Salary)!";
    }
  }

  const toggleSubSkill = (subSkillName: string) => {
    setOwnedSubSkills(prev => 
      prev.includes(subSkillName) 
        ? prev.filter(s => s !== subSkillName)
        : [...prev, subSkillName]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#b5f164]/30 pb-20">
      <FreeToolNav />

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Top Search Area - Google/JobStreet Style */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-black tracking-tight text-[#0e2917] mb-4">Market Value & Skill Benchmark</h1>
          <p className="text-slate-500 text-lg mb-8">
            Cari profesi untuk membedah <strong className="text-[#0e2917]">DNA skill-nya</strong> dan tingkatkan daya tawar gajimu.
          </p>

          <div className="relative">
            <div className="relative flex items-center">
              <svg className="w-7 h-7 text-emerald-600 absolute left-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Ketik profesi... (Misal: Data Analyst)"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (selectedRoleId) {
                    setSelectedRoleId(null);
                    setOwnedSubSkills([]);
                  }
                }}
                className="w-full pl-16 pr-6 py-5 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#b5f164]/30 focus:border-emerald-600 transition-all text-lg font-medium shadow-sm"
              />
            </div>
            
            {/* Search Suggestions Dropdown */}
            {searchTerm && !selectedRole && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 max-h-80 overflow-y-auto custom-scrollbar overflow-hidden">
                {filteredRoles.length > 0 ? (
                  <div className="p-2 flex flex-col">
                    {filteredRoles.map(role => (
                      <button
                        key={role.id}
                        onClick={() => {
                          setSelectedRoleId(role.id);
                          setSearchTerm(role.title);
                          setOwnedSubSkills([]);
                        }}
                        className="text-left px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors flex items-center justify-between group"
                      >
                        <span className="font-bold text-slate-700 group-hover:text-emerald-700">{role.title}</span>
                        <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-md">{role.category}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-slate-400">Profesi tidak ditemukan di database.</div>
                )}
              </div>
            )}
          </div>
          
          {/* Quick Tags */}
          {!searchTerm && !selectedRole && (
             <div className="flex flex-wrap justify-center gap-2 mt-6">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-wider w-full mb-2">Pencarian Populer:</span>
               {professions.slice(0, 5).map(role => (
                 <button 
                  key={role.id} 
                  onClick={() => {
                    setSelectedRoleId(role.id);
                    setSearchTerm(role.title);
                    setOwnedSubSkills([]);
                  }}
                  className="bg-white border border-slate-200 px-4 py-2 rounded-full text-sm font-semibold text-slate-600 hover:border-emerald-500 hover:text-emerald-700 transition-colors shadow-sm"
                 >
                   {role.title}
                 </button>
               ))}
             </div>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-medium">Memuat data pasar...</p>
          </div>
        ) : selectedRole ? (
          <div className="space-y-8 animate-fade-in">
            {/* Benchmark Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-bl-full -z-10"></div>

              <div className="flex justify-between items-start mb-10">
                <div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 uppercase tracking-wider mb-4 inline-block">
                    {selectedRole.category}
                  </span>
                  <h2 className="text-4xl font-black text-slate-800">{selectedRole.title}</h2>
                  <div className="flex items-center gap-4 mt-3">
                    <p className="text-slate-500 font-medium">Demand Index: <strong className="text-emerald-600">{selectedRole.demand}</strong></p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-center">
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-2">Entry Level</p>
                  <p className="text-2xl font-bold text-slate-700">Rp {(selectedRole.salaryMin / 1000000).toFixed(1)} Jt</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-center">
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-2">Rata-rata (Mid)</p>
                  <p className="text-2xl font-bold text-slate-700">Rp {(selectedRole.salaryAvg / 1000000).toFixed(1)} Jt</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-center">
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-2">Senior Level</p>
                  <p className="text-2xl font-bold text-slate-700">Rp {(selectedRole.salaryMax / 1000000).toFixed(1)} Jt</p>
                </div>
              </div>

              {/* Personal Value Calculator Card */}
              <SalaryCalculatorCard 
                selectedRole={selectedRole} 
                estimatedSalary={estimatedSalary} 
                feedbackText={feedbackText} 
              />
            </div>

            {/* RPG SKILL TREE CONTAINER */}
            <div className="bg-[#0B1120] border border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden font-sans">
              {/* Background Effects */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none z-0"></div>
              
              <div className="relative z-10 text-center mb-16">
                 <h3 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-600 tracking-tight uppercase drop-shadow-sm">Career Tech Tree</h3>
                 <p className="text-slate-400 mt-4 max-w-xl mx-auto text-sm">Unlock your true market value. Master core fundamentals to access high-tier specializations based on O*NET Global Standards.</p>
              </div>

              <div className="flex flex-col relative z-10">
                
                {/* LEVEL 1: Core Foundation */}
                <div className="relative z-10 mb-8">
                  <div className="text-center mb-6">
                     <span className="bg-slate-800 text-slate-300 text-xs font-bold px-4 py-1.5 rounded-full border border-slate-700 tracking-widest uppercase shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                       Tier 1: Core Foundation
                     </span>
                  </div>
                  <BaselineSkills 
                    skills={selectedRole.skills.filter(s => s.category === 'baseline')} 
                    ownedSubSkills={ownedSubSkills} 
                    toggleSubSkill={toggleSubSkill} 
                  />
                </div>

                {/* RPG Tree Visual Connecting Branches */}
                <div className="flex justify-center -my-10 relative z-0 opacity-80 pointer-events-none">
                  <svg width="400" height="160" viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Main Trunk */}
                    <path d="M200 0 V 60" stroke="#334155" strokeWidth="4" />
                    {/* Glowing Pulse Trunk */}
                    <path d="M200 0 V 60" stroke="#34d399" strokeWidth="2" className="animate-pulse" />
                    
                    {/* Branch Left */}
                    <path d="M200 60 Q 200 110 50 160" stroke="#334155" strokeWidth="3" strokeDasharray="6 6" />
                    <path d="M200 60 Q 200 110 50 160" stroke="#10b981" strokeWidth="2" strokeDasharray="6 6" className="animate-pulse" />
                    
                    {/* Branch Right */}
                    <path d="M200 60 Q 200 110 350 160" stroke="#334155" strokeWidth="3" strokeDasharray="6 6" />
                    <path d="M200 60 Q 200 110 350 160" stroke="#10b981" strokeWidth="2" strokeDasharray="6 6" className="animate-pulse" />
                    
                    {/* Branch Center Left */}
                    <path d="M200 60 Q 200 110 150 160" stroke="#334155" strokeWidth="4" />
                    <path d="M200 60 Q 200 110 150 160" stroke="#34d399" strokeWidth="2" />
                    
                    {/* Branch Center Right */}
                    <path d="M200 60 Q 200 110 250 160" stroke="#334155" strokeWidth="4" />
                    <path d="M200 60 Q 200 110 250 160" stroke="#34d399" strokeWidth="2" />

                    {/* Central Core Node */}
                    <circle cx="200" cy="60" r="10" fill="#0f172a" stroke="#34d399" strokeWidth="3" />
                    <circle cx="200" cy="60" r="4" fill="#34d399" className="animate-ping" />
                  </svg>
                </div>

                {/* LEVEL 2: Specializations */}
                <div className="relative z-10 mt-8">
                  <div className="text-center mb-6">
                     <span className="bg-emerald-900/50 text-emerald-300 text-xs font-bold px-4 py-1.5 rounded-full border border-emerald-700/50 tracking-widest uppercase shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                       Tier 2: Golden Specializations
                     </span>
                  </div>
                  <GoldenSkills 
                    skills={selectedRole.skills.filter(s => s.category === 'golden')} 
                    ownedSubSkills={ownedSubSkills} 
                    toggleSubSkill={toggleSubSkill} 
                  />
                </div>

                {/* LEVEL 3: Outdated/Niche */}
                <div className="relative z-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                   <NicheSkills />
                   <CommoditySkills />
                </div>

              </div>
            </div>

          </div>
        ) : null}
      </main>
    </div>
  );
}