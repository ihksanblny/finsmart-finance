import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import FreeToolNav from '../components/FreeToolNav';
import { useMarketValue } from '../hooks/useMarketValue';
import { SalaryCalculatorCard } from '../components/market-value/SalaryCalculatorCard';
import { GoldenSkills } from '../components/market-value/GoldenSkills';
import { BaselineSkills } from '../components/market-value/BaselineSkills';

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
    
    const goldenScore = rawGoldenScore * baselineScore;
    
    const midGap = selectedRole.salaryAvg - selectedRole.salaryMin;
    const maxGap = selectedRole.salaryMax - selectedRole.salaryAvg;
    
    estimatedSalary = selectedRole.salaryMin + (midGap * baselineScore) + (maxGap * goldenScore);
    
    if (baselineScore < 1 && rawGoldenScore > 0) {
      feedbackText = (
        <span className="flex items-start gap-2">
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
        {/* Top Search Area */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-[#0e2917] mb-6"
          >
            Market Value & Skill Benchmark
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-lg mb-10 leading-relaxed"
          >
            Bedah <strong className="text-[#0e2917] font-bold">DNA skill</strong> profesimu berdasarkan data O*NET Global. Ketahui mana skill wajib dan mana skill pendongkrak gaji.
          </motion.p>

          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative flex items-center"
            >
              <Search className="w-6 h-6 text-emerald-600 absolute left-6" />
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
                className="w-full pl-16 pr-6 py-5 bg-white border-2 border-slate-200/80 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#b5f164]/20 focus:border-emerald-600 transition-all text-lg font-medium shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
              />
            </motion.div>
            
            <AnimatePresence>
              {searchTerm && !selectedRole && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-3 bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-50 max-h-80 overflow-y-auto"
                >
                  {filteredRoles.length > 0 ? (
                    <div className="p-2 flex flex-col gap-1">
                      {filteredRoles.map(role => (
                        <button
                          key={role.id}
                          onClick={() => {
                            setSelectedRoleId(role.id);
                            setSearchTerm(role.title);
                            setOwnedSubSkills([]);
                          }}
                          className="text-left px-5 py-4 hover:bg-slate-50/80 rounded-xl transition-all duration-300 flex items-center justify-between group"
                        >
                          <span className="font-bold text-slate-700 group-hover:text-emerald-700 transition-colors">{role.title}</span>
                          <span className="text-xs font-semibold bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">{role.category}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-slate-400 font-medium">Profesi tidak ditemukan di database.</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <AnimatePresence>
            {!searchTerm && !selectedRole && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-wrap justify-center gap-3 mt-8"
              >
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest w-full mb-2">Pencarian Populer:</span>
                {professions.slice(0, 5).map(role => (
                  <button 
                    key={role.id} 
                    onClick={() => {
                      setSelectedRoleId(role.id);
                      setSearchTerm(role.title);
                      setOwnedSubSkills([]);
                    }}
                    className="bg-white border border-slate-200/60 px-5 py-2.5 rounded-full text-sm font-semibold text-slate-600 hover:border-emerald-500/50 hover:bg-emerald-50/50 hover:text-emerald-700 transition-all duration-300 shadow-sm"
                  >
                    {role.title}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-10 h-10 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin mb-6"></div>
            <p className="text-slate-400 font-medium tracking-wide">Memuat data pasar...</p>
          </div>
        ) : selectedRole ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-10"
          >
            {/* Benchmark Card */}
            <div className="bg-white border border-slate-100 rounded-[2rem] p-8 md:p-12 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.05)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/5 via-emerald-500/5 to-transparent rounded-bl-full -z-10"></div>

              <div className="flex justify-between items-start mb-12">
                <div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50/80 px-4 py-2 rounded-full border border-emerald-100/50 uppercase tracking-widest mb-6 inline-block">
                    {selectedRole.category}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-[#0e2917] tracking-tight">{selectedRole.title}</h2>
                  <div className="flex items-center gap-4 mt-4">
                    <p className="text-slate-500 font-medium">Demand Index: <strong className="text-emerald-600">{selectedRole.demand}</strong></p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="p-6 rounded-2xl bg-slate-50/50 border border-slate-100/80 flex flex-col justify-center transition-all hover:bg-white hover:shadow-md">
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-2">Entry Level</p>
                  <p className="text-3xl font-black text-slate-700 tracking-tight">Rp {(selectedRole.salaryMin / 1000000).toFixed(1)} <span className="text-lg text-slate-400 font-bold">Jt</span></p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50/50 border border-slate-100/80 flex flex-col justify-center transition-all hover:bg-white hover:shadow-md relative overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400/0 via-emerald-400 to-emerald-400/0"></div>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-2">Rata-rata (Mid)</p>
                  <p className="text-3xl font-black text-emerald-900 tracking-tight">Rp {(selectedRole.salaryAvg / 1000000).toFixed(1)} <span className="text-lg text-slate-400 font-bold">Jt</span></p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50/50 border border-slate-100/80 flex flex-col justify-center transition-all hover:bg-white hover:shadow-md">
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-2">Senior Level</p>
                  <p className="text-3xl font-black text-slate-700 tracking-tight">Rp {(selectedRole.salaryMax / 1000000).toFixed(1)} <span className="text-lg text-slate-400 font-bold">Jt</span></p>
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
            <div className="bg-[#0B1120] border border-slate-800/80 rounded-[2.5rem] p-8 md:p-16 shadow-2xl relative overflow-hidden font-sans">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
              
              <div className="relative z-10 text-center mb-20">
                 <h3 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-600 tracking-tight uppercase drop-shadow-sm">
                   Career Tech Tree
                 </h3>
                 <p className="text-slate-400 mt-5 max-w-xl mx-auto text-[13px] leading-relaxed font-medium">
                   Unlock your true market value. Master core fundamentals to access high-tier specializations based on O*NET Global Standards.
                 </p>
              </div>

              <div className="flex flex-col relative z-10">
                
                {/* LEVEL 1: Core Foundation */}
                <div className="relative z-10 mb-12">
                  <div className="text-center mb-10">
                     <span className="bg-slate-800/80 backdrop-blur-md text-slate-300 text-[10px] font-black px-5 py-2.5 rounded-full border border-slate-700/80 tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(0,0,0,0.5)]">
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
                <div className="flex justify-center -my-14 relative z-0 opacity-80 pointer-events-none">
                  <svg width="400" height="160" viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M200 0 V 60" stroke="#1e293b" strokeWidth="4" />
                    <path d="M200 0 V 60" stroke="#34d399" strokeWidth="1" className="animate-pulse" />
                    
                    <path d="M200 60 Q 200 110 50 160" stroke="#1e293b" strokeWidth="3" strokeDasharray="4 6" />
                    <path d="M200 60 Q 200 110 350 160" stroke="#1e293b" strokeWidth="3" strokeDasharray="4 6" />
                    
                    <path d="M200 60 Q 200 110 150 160" stroke="#1e293b" strokeWidth="4" />
                    <path d="M200 60 Q 200 110 250 160" stroke="#1e293b" strokeWidth="4" />

                    <circle cx="200" cy="60" r="12" fill="#0f172a" stroke="#34d399" strokeWidth="2" />
                    <circle cx="200" cy="60" r="4" fill="#34d399" className="animate-ping" />
                  </svg>
                </div>

                {/* LEVEL 2: Specializations */}
                <div className="relative z-10 mt-12">
                  <div className="text-center mb-10">
                     <span className="bg-amber-900/40 backdrop-blur-md text-amber-300 text-[10px] font-black px-5 py-2.5 rounded-full border border-amber-700/50 tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                       Tier 2: Golden Specializations
                     </span>
                  </div>
                  <GoldenSkills 
                    skills={selectedRole.skills.filter(s => s.category === 'golden')} 
                    ownedSubSkills={ownedSubSkills} 
                    toggleSubSkill={toggleSubSkill} 
                  />
                </div>

              </div>
            </div>

          </motion.div>
        ) : null}
      </main>
    </div>
  );
}