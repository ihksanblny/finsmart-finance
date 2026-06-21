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
            <div className={cn("flex flex-col items-center relative z-20 group transition-all duration-500", isLocked && "opacity-60")}>
              <motion.div 
                layout
                className={cn(
                  "w-20 h-20 rotate-45 flex items-center justify-center border-2 transition-all duration-700 shadow-sm relative z-10 bg-white",
                  isComplete 
                    ? "border-zinc-900 bg-zinc-900 shadow-[0_10px_20px_rgba(0,0,0,0.1)]" 
                    : isLocked
                      ? "border-zinc-200 bg-zinc-50 border-dashed"
                      : "border-zinc-300 hover:border-zinc-900"
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
                         <Lock className="w-5 h-5 text-zinc-300" strokeWidth={2.5} />
                       </motion.div>
                     ) : isComplete ? (
                       <motion.div 
                         key="complete"
                         initial={{ opacity: 0, scale: 0.5, rotate: -180 }} 
                         animate={{ opacity: 1, scale: 1, rotate: 0 }} 
                         exit={{ opacity: 0, scale: 0.5 }}
                         transition={{ type: "spring" }}
                       >
                         <Flame className="w-8 h-8 text-white" />
                       </motion.div>
                     ) : (
                       <motion.div 
                         key="progress"
                         initial={{ opacity: 0, scale: 0.5 }} 
                         animate={{ opacity: 1, scale: 1 }} 
                         exit={{ opacity: 0, scale: 0.5 }}
                       >
                         <span className="text-zinc-900 text-lg font-black tracking-tight">
                           {ownedSubCount}<span className="text-zinc-400 text-sm font-bold">/{totalSubs}</span>
                         </span>
                       </motion.div>
                     )}
                   </AnimatePresence>
                </div>
              </motion.div>
              
              <h4 className={cn(
                "text-center mt-6 font-black text-[11px] uppercase tracking-[0.15em] transition-colors duration-300",
                isComplete 
                  ? "text-zinc-900" 
                  : isLocked
                    ? "text-zinc-400"
                    : "text-zinc-900"
              )}>
                {skill.name}
              </h4>
            </div>

            {/* SPINE */}
            <div className={cn(
              "w-px h-8 transition-colors duration-500 mt-3", 
              isComplete ? "bg-zinc-900" : isLocked ? "bg-zinc-200" : "bg-zinc-200"
            )}></div>

            {/* DYNAMIC CONTENT AREA: Either Missing Prerequisites OR Sub-skills */}
            <div className="flex flex-col w-full relative pt-2 items-center">
              {/* Center Line Background */}
              <div className={cn(
                "absolute left-1/2 -translate-x-1/2 top-0 bottom-6 w-px transition-colors duration-500 z-0", 
                isComplete ? "bg-zinc-900" : isLocked ? "bg-zinc-200 border-dashed" : "bg-zinc-200"
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
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-3 bg-white px-3 py-1 rounded-full border border-zinc-200">
                      Syarat Terkunci
                    </span>
                    <div className="flex flex-col gap-2 w-full px-4">
                      {missingPrereqs.map((req, i) => (
                        <div key={i} className="flex items-center justify-between bg-zinc-50 border border-zinc-200 py-2 px-3 rounded-lg shadow-sm">
                          <span className="text-xs font-bold text-zinc-500 truncate">{req}</span>
                          <Lock className="w-3 h-3 text-zinc-300 flex-shrink-0" />
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
                                "w-10 h-10 rotate-45 flex items-center justify-center border transition-all duration-300 cursor-pointer shadow-sm bg-white",
                                isSubOwned 
                                  ? "border-zinc-900 bg-zinc-900 z-20" 
                                  : "border-zinc-200 hover:border-zinc-400 z-10"
                              )}
                            >
                              {isSubOwned ? (
                                <motion.div className="-rotate-45" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                  <Unlock className="w-4 h-4 text-white" />
                                </motion.div>
                              ) : null}
                            </motion.button>
                            
                            <div className="absolute left-[3.5rem] top-1/2 -translate-y-1/2 w-32 text-left pointer-events-none z-20">
                               <span className={cn(
                                 "text-xs font-bold leading-tight block transition-all duration-300",
                                 isSubOwned 
                                   ? "text-zinc-900" 
                                   : "text-zinc-400 group-hover:text-zinc-600 group-hover:translate-x-1"
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
