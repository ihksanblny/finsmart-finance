import { motion } from 'framer-motion';
import { Check, ShieldCheck } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { TaxonomySkill } from '../../data/skillsTaxonomy';

interface BaselineSkillsProps {
  skills: TaxonomySkill[];
  ownedSubSkills: string[];
  toggleSubSkill: (sub: string) => void;
}

export function BaselineSkills({ skills, ownedSubSkills, toggleSubSkill }: BaselineSkillsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-12 relative z-10 w-full max-w-5xl mx-auto">
      {skills.map((skill, index) => {
        const ownedSubCount = skill.subSkills?.filter(sub => ownedSubSkills.includes(sub)).length || 0;
        const totalSubs = skill.subSkills?.length || 0;
        const isComplete = totalSubs > 0 && ownedSubCount === totalSubs;

        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
            key={index} 
            className="flex flex-col items-center relative w-[240px]"
          >
            {/* MAIN NODE */}
            <div className="flex flex-col items-center relative z-20 group">
              <motion.div 
                layout
                className={cn(
                  "w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all duration-500 shadow-xl relative z-10 backdrop-blur-md",
                  isComplete 
                    ? "bg-slate-800 border-emerald-400/50 shadow-[0_0_30px_rgba(16,185,129,0.15)]" 
                    : "bg-[#0B1120]/80 border-slate-700/50 group-hover:border-slate-500/80"
                )}
              >
                {isComplete ? (
                   <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                     <ShieldCheck className="w-8 h-8 text-emerald-400" />
                   </motion.div>
                ) : (
                   <span className="text-slate-400 text-lg font-medium tracking-tight">
                     <strong className="text-slate-200">{ownedSubCount}</strong>/{totalSubs}
                   </span>
                )}
              </motion.div>
              <h4 className={cn(
                "text-center mt-5 font-bold text-[13px] uppercase tracking-[0.15em] transition-colors duration-300",
                isComplete ? "text-slate-200" : "text-slate-500"
              )}>
                {skill.name}
              </h4>
            </div>

            {/* CONNECTION SPINE */}
            <div className={cn(
              "w-px h-8 transition-colors duration-500 mt-2",
              isComplete ? "bg-emerald-500/30" : "bg-slate-800"
            )}></div>

            {/* SUB-SKILLS */}
            <div className="flex flex-col w-full relative pt-2">
              <div className={cn(
                 "absolute left-1/2 -translate-x-1/2 top-0 bottom-10 w-px transition-colors duration-500 z-0",
                 isComplete ? "bg-emerald-500/30" : "bg-slate-800"
              )}></div>
              
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
                          "w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer shadow-lg backdrop-blur-sm",
                          isSubOwned 
                            ? "bg-emerald-500/20 border-emerald-400/50 text-emerald-400 z-20" 
                            : "bg-[#0f172a]/90 border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-500 z-10"
                        )}
                      >
                        {isSubOwned ? (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                            <Check className="w-5 h-5" strokeWidth={3} />
                          </motion.div>
                        ) : null}
                      </motion.button>
                      
                      <div className="absolute left-[3.5rem] top-1/2 -translate-y-1/2 w-32 text-left pointer-events-none z-20">
                         <span className={cn(
                           "text-xs font-semibold leading-tight block transition-all duration-300",
                           isSubOwned 
                             ? "text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]" 
                             : "text-slate-500 group-hover:text-slate-300 group-hover:translate-x-1"
                         )}>
                           {sub}
                         </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
          </motion.div>
        );
      })}
    </div>
  );
}
