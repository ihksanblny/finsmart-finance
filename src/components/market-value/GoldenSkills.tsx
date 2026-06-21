import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Lock, Unlock } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { TaxonomySkill } from '../../data/skillsTaxonomy';

interface GoldenSkillsProps {
  skills: TaxonomySkill[];
  ownedSubSkills: string[];
  toggleSubSkill: (sub: string) => void;
}

export function GoldenSkills({ skills, ownedSubSkills, toggleSubSkill }: GoldenSkillsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-x-16 gap-y-16 relative z-10 w-full max-w-5xl mx-auto">
      {skills.map((skill, index) => {
        const ownedSubCount = skill.subSkills?.filter(sub => ownedSubSkills.includes(sub)).length || 0;
        const totalSubs = skill.subSkills?.length || 0;
        const isComplete = totalSubs > 0 && ownedSubCount === totalSubs;
        
        const missingPrereqs = skill.prerequisites?.filter(req => !ownedSubSkills.includes(req)) || [];
        const isLocked = missingPrereqs.length > 0;
        
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.15, duration: 0.6, type: "spring", bounce: 0.4 }}
            key={index} 
            className="flex flex-col items-center relative w-[240px] min-h-[300px]"
          >
            {/* MAIN NODE DIAMOND */}
            <div className={cn("flex flex-col items-center relative z-20 group transition-all duration-500", isLocked && "opacity-60 grayscale")}>
              <motion.div 
                layout
                className={cn(
                  "w-24 h-24 rotate-45 flex items-center justify-center border-2 transition-all duration-700 shadow-2xl relative z-10 backdrop-blur-xl",
                  isComplete 
                    ? "bg-amber-500/10 border-amber-400/60 shadow-[0_0_40px_rgba(251,191,36,0.2)]" 
                    : isLocked
                      ? "bg-[#0B1120] border-slate-700 shadow-none"
                      : "bg-[#0B1120] border-amber-900/40 hover:border-amber-600/60 shadow-[0_0_15px_rgba(251,191,36,0.05)]"
                )}
              >
                <div className="-rotate-45 flex flex-col items-center justify-center w-full h-full">
                   <AnimatePresence mode="wait">
                     {isLocked ? (
                       <motion.div 
                         key="locked"
                         initial={{ opacity: 0, scale: 0.5 }} 
                         animate={{ opacity: 1, scale: 1 }} 
                         exit={{ opacity: 0, scale: 0.5 }}
                       >
                         <Lock className="w-6 h-6 text-slate-500" strokeWidth={2.5} />
                       </motion.div>
                     ) : isComplete ? (
                       <motion.div 
                         key="complete"
                         initial={{ opacity: 0, scale: 0.5, rotate: -180 }} 
                         animate={{ opacity: 1, scale: 1, rotate: 0 }} 
                         exit={{ opacity: 0, scale: 0.5 }}
                         transition={{ type: "spring" }}
                       >
                         <Flame className="w-10 h-10 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
                       </motion.div>
                     ) : (
                       <motion.div 
                         key="progress"
                         initial={{ opacity: 0, scale: 0.5 }} 
                         animate={{ opacity: 1, scale: 1 }} 
                         exit={{ opacity: 0, scale: 0.5 }}
                       >
                         <span className="text-amber-600/80 text-xl font-medium tracking-tight">
                           <strong className="text-amber-500">{ownedSubCount}</strong>/{totalSubs}
                         </span>
                       </motion.div>
                     )}
                   </AnimatePresence>
                </div>
              </motion.div>
              
              <h4 className={cn(
                "text-center mt-8 font-black text-[13px] uppercase tracking-[0.15em] transition-colors duration-300",
                isComplete 
                  ? "text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" 
                  : isLocked
                    ? "text-slate-500"
                    : "text-amber-600"
              )}>
                {skill.name}
              </h4>
            </div>

            {/* SPINE */}
            <div className={cn(
              "w-px h-8 transition-colors duration-500 mt-3", 
              isComplete ? "bg-amber-500/30" : isLocked ? "bg-slate-800" : "bg-amber-900/30"
            )}></div>

            {/* DYNAMIC CONTENT AREA: Either Missing Prerequisites OR Sub-skills */}
            <div className="flex flex-col w-full relative pt-2 items-center">
              {/* Center Line Background */}
              <div className={cn(
                "absolute left-1/2 -translate-x-1/2 top-0 bottom-6 w-px transition-colors duration-500 z-0", 
                isComplete ? "bg-amber-500/20" : isLocked ? "bg-slate-800/50" : "bg-amber-900/20"
              )}></div>

              <AnimatePresence mode="wait">
                {isLocked ? (
                  <motion.div 
                    key="requirements"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="relative z-10 w-full flex flex-col items-center mt-2"
                  >
                    <span className="text-[9px] font-bold text-red-500/70 uppercase tracking-widest mb-3 bg-[#0B1120] px-2 py-0.5 rounded-full border border-red-900/30">
                      Unlock Requirements
                    </span>
                    <div className="flex flex-col gap-2 w-full px-4">
                      {missingPrereqs.map((req, i) => (
                        <div key={i} className="flex items-center justify-between bg-slate-900/80 border border-slate-800 py-2 px-3 rounded-lg shadow-inner">
                          <span className="text-xs font-semibold text-slate-400 truncate">{req}</span>
                          <Lock className="w-3 h-3 text-slate-600 flex-shrink-0" />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="subskills"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="relative w-full"
                  >
                    {skill.subSkills?.map((sub, i) => {
                      const isSubOwned = ownedSubSkills.includes(sub);
                      
                      return (
                        <div key={i} className="flex justify-center relative z-10 mb-6 group w-full">
                          <div className="relative flex items-center justify-center">
                            <motion.button 
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => toggleSubSkill(sub)}
                              className={cn(
                                "w-10 h-10 rotate-45 flex items-center justify-center border transition-all duration-300 cursor-pointer shadow-lg backdrop-blur-sm",
                                isSubOwned 
                                  ? "bg-amber-500/20 border-amber-400/50 z-20" 
                                  : "bg-[#0f172a]/90 border-slate-700/50 hover:bg-slate-800/80 hover:border-amber-700/50 z-10"
                              )}
                            >
                              {isSubOwned ? (
                                <motion.div className="-rotate-45" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                  <Unlock className="w-4 h-4 text-amber-400" />
                                </motion.div>
                              ) : null}
                            </motion.button>
                            
                            <div className="absolute left-[3.5rem] top-1/2 -translate-y-1/2 w-32 text-left pointer-events-none z-20">
                               <span className={cn(
                                 "text-xs font-semibold leading-tight block transition-all duration-300",
                                 isSubOwned 
                                   ? "text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" 
                                   : "text-slate-500 group-hover:text-amber-600/80 group-hover:translate-x-1"
                               )}>
                                 {sub}
                               </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
