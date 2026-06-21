import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import DashboardNav from '../components/DashboardNav';
import { useMarketValue } from '../hooks/useMarketValue';
import { SalaryCalculatorCard } from '../components/market-value/SalaryCalculatorCard';
import { GoldenSkills } from '../components/market-value/GoldenSkills';
import { BaselineSkills } from '../components/market-value/BaselineSkills';

export default function MarketValue({ embedded = false }: { embedded?: boolean }) {
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
          <span>Syarat tidak terpenuhi. Anda kehilangan {totalBaselineSubSkills - ownedBaselineCount} sub-skill dasar. Lengkapi Foundation Matrix terlebih dahulu.</span>
        </span>
      );
    } else if (baselineScore < 1) {
      feedbackText = `Defisit kompetensi: Anda kekurangan ${totalBaselineSubSkills - ownedBaselineCount} sub-skill fundamental untuk mencapai nilai rata-rata pasar.`;
    } else if (goldenScore === 0) {
      feedbackText = "Foundation Matrix tercapai (100%). Anda kini memenuhi syarat untuk membuka Specialization Index guna menembus kuartil atas gaji.";
    } else if (goldenScore > 0 && goldenScore < 1) {
      feedbackText = "Valuasi meningkat. Kombinasi fondasi solid dan skill spesialisasi memberikan Anda keunggulan negosiasi yang terukur.";
    } else if (goldenScore === 1) {
      feedbackText = "Exceptional Index. Seluruh matriks kompetensi terpenuhi. Anda berada di posisi tawar maksimum untuk peran ini.";
    }
  }

  const toggleSubSkill = (subSkillName: string) => {
    setOwnedSubSkills(prev => 
      prev.includes(subSkillName) 
        ? prev.filter(s => s !== subSkillName)
        : [...prev, subSkillName]
    );
  };

  const Content = (
    <>
      {/* Top Search Area */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 mb-6"
          >
            Market Value & Benchmark
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 text-lg mb-10 leading-relaxed font-medium"
          >
            Bedah struktur kompetensi profesi Anda berdasarkan data O*NET Global. <br className="hidden md:block" /> Ketahui skill penentu valuasi di pasar tenaga kerja profesional.
          </motion.p>

          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative flex items-center"
            >
              <Search className="w-6 h-6 text-zinc-400 absolute left-6" strokeWidth={2.5} />
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
                className="w-full pl-16 pr-6 py-5 bg-white border-2 border-zinc-200/80 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-zinc-900/5 focus:border-zinc-900 transition-all text-lg font-bold shadow-[0_20px_40px_rgba(0,0,0,0.04)]"
              />
            </motion.div>
            
            <AnimatePresence>
              {searchTerm && !selectedRole && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-3 bg-white/90 backdrop-blur-xl border border-zinc-200 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] z-50 max-h-80 overflow-y-auto"
                >
                  {filteredRoles.length > 0 ? (
                    <div className="p-3 flex flex-col gap-1">
                      {filteredRoles.map(role => (
                        <button
                          key={role.id}
                          onClick={() => {
                            setSelectedRoleId(role.id);
                            setSearchTerm(role.title);
                            setOwnedSubSkills([]);
                          }}
                          className="text-left px-5 py-4 hover:bg-zinc-50 rounded-2xl transition-all duration-300 flex items-center justify-between group"
                        >
                          <span className="font-bold text-zinc-600 group-hover:text-zinc-900 transition-colors">{role.title}</span>
                          <span className="text-xs font-bold bg-zinc-100 text-zinc-500 px-3 py-1.5 rounded-full group-hover:bg-zinc-900 group-hover:text-white transition-colors">{role.category}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-zinc-400 font-bold">Profesi tidak ditemukan di database.</div>
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
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest w-full mb-2">Pencarian Populer</span>
                {professions.slice(0, 5).map(role => (
                  <button 
                    key={role.id} 
                    onClick={() => {
                      setSelectedRoleId(role.id);
                      setSearchTerm(role.title);
                      setOwnedSubSkills([]);
                    }}
                    className="bg-white border border-zinc-200 px-5 py-2.5 rounded-full text-xs font-bold text-zinc-600 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white transition-all duration-300 shadow-sm"
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
            <div className="w-10 h-10 border-4 border-zinc-100 border-t-zinc-900 rounded-full animate-spin mb-6"></div>
            <p className="text-zinc-400 font-bold tracking-wide">Memuat data analitik...</p>
          </div>
        ) : selectedRole ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-10"
          >
            {/* Benchmark Card */}
            <div className="bg-white border border-zinc-200 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.03)] relative overflow-hidden">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <span className="text-[10px] font-black text-zinc-500 bg-zinc-100 px-4 py-2 rounded-full border border-zinc-200 uppercase tracking-widest mb-6 inline-block">
                    {selectedRole.category}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight">{selectedRole.title}</h2>
                  <div className="flex items-center gap-4 mt-4">
                    <p className="text-zinc-500 font-bold text-sm uppercase tracking-wider">Market Demand: <strong className="text-zinc-900 px-2 py-1 bg-zinc-100 rounded-md ml-1">{selectedRole.demand}</strong></p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200 flex flex-col justify-center transition-all">
                  <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-3">Entry Level</p>
                  <p className="text-3xl font-black text-zinc-800 tracking-tight">Rp {(selectedRole.salaryMin / 1000000).toFixed(1)} <span className="text-lg text-zinc-400 font-bold">Jt</span></p>
                </div>
                <div className="p-8 rounded-3xl bg-white border-2 border-zinc-900 flex flex-col justify-center transition-all shadow-[0_10px_30px_rgba(0,0,0,0.05)] relative overflow-hidden">
                  <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-3">Average (Mid)</p>
                  <p className="text-4xl font-black text-zinc-900 tracking-tighter">Rp {(selectedRole.salaryAvg / 1000000).toFixed(1)} <span className="text-xl text-zinc-400 font-bold">Jt</span></p>
                </div>
                <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200 flex flex-col justify-center transition-all">
                  <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-3">Senior Level</p>
                  <p className="text-3xl font-black text-zinc-800 tracking-tight">Rp {(selectedRole.salaryMax / 1000000).toFixed(1)} <span className="text-lg text-zinc-400 font-bold">Jt</span></p>
                </div>
              </div>

              {/* Personal Value Calculator Card */}
              <SalaryCalculatorCard 
                selectedRole={selectedRole} 
                estimatedSalary={estimatedSalary} 
                feedbackText={feedbackText} 
              />
            </div>

            {/* RPG SKILL TREE BECOMES COMPETENCY MATRIX */}
            <div className="bg-white border border-zinc-200 rounded-[2.5rem] p-8 md:p-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden font-sans">
              
              <div className="relative z-10 text-center mb-20">
                 <h3 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tighter uppercase">
                   Competency Matrix
                 </h3>
                 <p className="text-zinc-500 mt-5 max-w-xl mx-auto text-sm leading-relaxed font-medium">
                   Struktur evaluasi teknis berdasarkan standar industri. Kuasai matriks dasar (Foundation) untuk membuka akses ke valuasi tingkat lanjut (Specialization).
                 </p>
              </div>

              <div className="flex flex-col relative z-10">
                
                {/* LEVEL 1: Core Foundation */}
                <div className="relative z-10 mb-12">
                  <div className="text-center mb-10">
                     <span className="bg-zinc-100 text-zinc-600 text-[10px] font-black px-5 py-2.5 rounded-full border border-zinc-200 tracking-[0.2em] uppercase">
                       Phase 1: Foundation Matrix
                     </span>
                  </div>
                  <BaselineSkills 
                    skills={selectedRole.skills.filter(s => s.category === 'baseline')} 
                    ownedSubSkills={ownedSubSkills} 
                    toggleSubSkill={toggleSubSkill} 
                  />
                </div>

                {/* Wireframe Connecting Branches */}
                <div className="flex justify-center -my-14 relative z-0 opacity-100 pointer-events-none">
                  <svg width="400" height="160" viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M200 0 V 60" stroke="#e4e4e7" strokeWidth="4" />
                    
                    <path d="M200 60 Q 200 110 50 160" stroke="#e4e4e7" strokeWidth="3" />
                    <path d="M200 60 Q 200 110 350 160" stroke="#e4e4e7" strokeWidth="3" />
                    
                    <path d="M200 60 Q 200 110 150 160" stroke="#e4e4e7" strokeWidth="4" />
                    <path d="M200 60 Q 200 110 250 160" stroke="#e4e4e7" strokeWidth="4" />

                    <circle cx="200" cy="60" r="12" fill="#ffffff" stroke="#d4d4d8" strokeWidth="2" />
                    <circle cx="200" cy="60" r="4" fill="#a1a1aa" />
                  </svg>
                </div>

                {/* LEVEL 2: Specializations */}
                <div className="relative z-10 mt-12">
                  <div className="text-center mb-10">
                     <span className="bg-zinc-900 text-white text-[10px] font-black px-5 py-2.5 rounded-full border border-zinc-800 tracking-[0.2em] uppercase">
                       Phase 2: Specialization Index
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
    </>
  );

  if (embedded) {
    return (
      <div className="w-full">
        {Content}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-zinc-200 flex">
      <DashboardNav />
      <div className="flex-1 md:ml-64 flex flex-col w-full min-w-0">
        <main className="max-w-[90rem] mx-auto px-4 lg:px-8 py-12 w-full pb-20">
          {Content}
        </main>
      </div>
    </div>
  );
}