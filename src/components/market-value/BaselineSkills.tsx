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
                  "w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all duration-500 shadow-sm relative z-10 bg-white",
                  isComplete 
                    ? "border-zinc-900 bg-zinc-900 text-white shadow-[0_10px_20px_rgba(0,0,0,0.1)]" 
                    : "border-zinc-200 text-zinc-900 group-hover:border-zinc-400"
                )}
              >
                {isComplete ? (
                   <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                     <ShieldCheck className="w-8 h-8" strokeWidth={2.5} />
                   </motion.div>
                ) : (
                   <span className="text-xl font-black tracking-tight">
                     {ownedSubCount}<span className="text-zinc-400 text-lg font-medium">/{totalSubs}</span>
                   </span>
                )}
              </motion.div>
              <h4 className={cn(
                "text-center mt-5 font-black text-[11px] uppercase tracking-[0.15em] transition-colors duration-300",
                isComplete ? "text-zinc-900" : "text-zinc-500"
              )}>
                {skill.name}
              </h4>
            </div>

            {/* CONNECTION SPINE */}
            <div className={cn(
              "w-px h-8 transition-colors duration-500 mt-2",
              isComplete ? "bg-zinc-900" : "bg-zinc-200"
            )}></div>

            {/* SUB-SKILLS */}
            <div className="flex flex-col w-full relative pt-2">
              <div className={cn(
                 "absolute left-1/2 -translate-x-1/2 top-0 bottom-10 w-px transition-colors duration-500 z-0",
                 isComplete ? "bg-zinc-900" : "bg-zinc-200"
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
                          "w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer shadow-sm bg-white",
                          isSubOwned 
                            ? "border-zinc-900 bg-zinc-900 text-white z-20" 
                            : "border-zinc-200 text-zinc-300 hover:border-zinc-400 z-10"
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
            </div>
            
          </motion.div>
        );
      })}
    </div>
  );
}
