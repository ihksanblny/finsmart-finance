import type { SkillDetail } from '../../data/skillsTaxonomy';

interface BaselineSkillsProps {
  skills: SkillDetail[];
  ownedSubSkills: string[];
  toggleSubSkill: (sub: string) => void;
}

export function BaselineSkills({ skills, ownedSubSkills, toggleSubSkill }: BaselineSkillsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-x-12 gap-y-16 relative z-10 w-full max-w-5xl mx-auto">
      {skills.map((skill, index) => {
        const ownedSubCount = skill.subSkills?.filter(sub => ownedSubSkills.includes(sub)).length || 0;
        const isComplete = ownedSubCount === (skill.subSkills?.length || 0);

        return (
          <div key={index} className="flex flex-col items-center relative w-[240px]">
            
            {/* MAIN NODE (The Skill Category) */}
            <div className="flex flex-col items-center relative z-20 group">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center border-[3px] transition-all duration-700 shadow-2xl relative z-10
                ${isComplete 
                  ? 'bg-slate-800 border-slate-400 shadow-[0_0_30px_rgba(255,255,255,0.15)] scale-105' 
                  : 'bg-[#0B1120] border-slate-700 hover:border-slate-500'}`}>
                {isComplete ? (
                   <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                   </svg>
                ) : (
                   <span className="text-slate-500 text-xl font-bold">{ownedSubCount}/{skill.subSkills?.length}</span>
                )}
              </div>
              <h4 className={`text-center mt-4 font-black text-sm uppercase tracking-widest ${isComplete ? 'text-white' : 'text-slate-400'}`}>
                {skill.name}
              </h4>
            </div>

            {/* CONNECTION SPINE TO SUB-SKILLS */}
            <div className={`w-1 h-8 transition-colors duration-500 ${isComplete ? 'bg-slate-400' : 'bg-slate-800'}`}></div>

            {/* SUB-SKILLS PATH */}
            <div className="flex flex-col w-full relative pt-2">
              {/* Vertical Path Line (Background) */}
              <div className={`absolute left-1/2 -translate-x-1/2 top-0 bottom-10 w-1 transition-colors duration-500 z-0
                 ${isComplete ? 'bg-slate-500/50' : 'bg-slate-800'}`}></div>
              
              {skill.subSkills?.map((sub, i) => {
                const isSubOwned = ownedSubSkills.includes(sub);
                
                return (
                  <div key={i} className="flex justify-center relative z-10 mb-6 group w-full">
                    <div className="relative flex items-center justify-center">
                      <button 
                        onClick={() => toggleSubSkill(sub)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-[3px] transition-all duration-500 cursor-pointer hover:scale-110
                          ${isSubOwned 
                            ? 'bg-slate-300 border-white shadow-[0_0_20px_rgba(255,255,255,0.5)] z-20' 
                            : 'bg-[#0f172a] border-slate-700 hover:border-slate-500 z-10'}`}
                      >
                        {isSubOwned && <div className="w-4 h-4 bg-slate-900 rounded-full"></div>}
                      </button>
                      
                      {/* Floating Label properly positioned to the right of the button */}
                      <div className="absolute left-[3.5rem] top-1/2 -translate-y-1/2 w-32 text-left pointer-events-none z-20">
                         <span className={`text-xs font-bold leading-tight block transition-colors duration-300 drop-shadow-md
                           ${isSubOwned ? 'text-slate-200' : 'text-slate-500 group-hover:text-slate-400'}`}>
                           {sub}
                         </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
          </div>
        );
      })}
    </div>
  );
}
