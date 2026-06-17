import type { SkillDetail } from '../../data/skillsTaxonomy';

interface GoldenSkillsProps {
  skills: SkillDetail[];
  ownedSubSkills: string[];
  toggleSubSkill: (sub: string) => void;
}

export function GoldenSkills({ skills, ownedSubSkills, toggleSubSkill }: GoldenSkillsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-x-12 gap-y-16 relative z-10 w-full max-w-5xl mx-auto">
      {skills.map((skill, index) => {
        const ownedSubCount = skill.subSkills?.filter(sub => ownedSubSkills.includes(sub)).length || 0;
        const isComplete = ownedSubCount === (skill.subSkills?.length || 0);
        
        // Logic RPG Unlock
        const missingPrereqs = skill.prerequisites?.filter(req => !ownedSubSkills.includes(req)) || [];
        const isLocked = missingPrereqs.length > 0;
        
        return (
          <div key={index} className="flex flex-col items-center relative w-[240px]">
            
            {/* LOCKED OVERLAY - FLOATING */}
            {isLocked && (
              <div className="absolute -top-12 inset-x-0 z-30 flex flex-col items-center justify-center">
                 <div className="bg-slate-900/90 backdrop-blur-sm border border-slate-700/80 px-3 py-2 rounded-xl shadow-2xl text-center w-[120%]">
                    <svg className="w-5 h-5 mx-auto mb-1 text-slate-400 drop-shadow-md" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Requires Mastery</p>
                    <div className="flex flex-col gap-1">
                      {missingPrereqs.map((req, i) => (
                        <span key={i} className="text-[10px] font-semibold text-emerald-400/80 bg-emerald-950/40 py-0.5 px-1.5 rounded border border-emerald-900/50 truncate">
                          {req}
                        </span>
                      ))}
                    </div>
                 </div>
              </div>
            )}

            {/* MAIN NODE (The Golden Skill Category) */}
            <div className={`flex flex-col items-center relative z-20 group transition-all duration-500 ${isLocked ? 'grayscale opacity-50' : ''}`}>
              <div className={`w-24 h-24 rotate-45 flex items-center justify-center border-[3px] transition-all duration-700 shadow-2xl relative z-10
                ${isComplete 
                  ? 'bg-emerald-900 border-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.3)] scale-105' 
                  : 'bg-[#0B1120] border-emerald-800 hover:border-emerald-500'}`}>
                {/* Un-rotate inner content */}
                <div className="-rotate-45 flex flex-col items-center">
                   {isComplete ? (
                      <span className="text-3xl text-emerald-400">✦</span>
                   ) : (
                      <span className="text-emerald-600 text-xl font-bold">{ownedSubCount}/{skill.subSkills?.length}</span>
                   )}
                </div>
              </div>
              <h4 className={`text-center mt-6 font-black text-sm uppercase tracking-widest ${isComplete ? 'text-emerald-300 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'text-emerald-700'}`}>
                {skill.name}
              </h4>
            </div>

            {/* CONNECTION SPINE TO SUB-SKILLS */}
            <div className={`w-1 h-8 transition-colors duration-500 ${isComplete ? 'bg-emerald-500/50' : 'bg-slate-800'} ${isLocked ? 'opacity-30' : ''}`}></div>

            {/* SUB-SKILLS PATH */}
            <div className={`flex flex-col w-full relative pt-2 ${isLocked ? 'opacity-30 pointer-events-none' : ''}`}>
              {/* Vertical Path Line (Background) */}
              <div className={`absolute left-1/2 -translate-x-1/2 top-0 bottom-10 w-1 transition-colors duration-500 z-0
                 ${isComplete ? 'bg-emerald-500/30' : 'bg-slate-800'}`}></div>
              
              {skill.subSkills?.map((sub, i) => {
                const isSubOwned = ownedSubSkills.includes(sub);
                
                return (
                  <div key={i} className="flex justify-center relative z-10 mb-6 group w-full">
                    <div className="relative flex items-center justify-center">
                      <button 
                        onClick={() => !isLocked && toggleSubSkill(sub)}
                        disabled={isLocked}
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-[3px] transition-all duration-500 cursor-pointer hover:scale-110
                          ${isSubOwned 
                            ? 'bg-emerald-400 border-white shadow-[0_0_20px_rgba(16,185,129,0.5)] z-20' 
                            : 'bg-[#0f172a] border-emerald-900 hover:border-emerald-600 z-10'}`}
                      >
                        {isSubOwned && <div className="w-4 h-4 bg-emerald-950 rounded-full"></div>}
                      </button>
                      
                      {/* Floating Label properly positioned to the right of the button */}
                      <div className="absolute left-[3.5rem] top-1/2 -translate-y-1/2 w-32 text-left pointer-events-none z-20">
                         <span className={`text-xs font-bold leading-tight block transition-colors duration-300 drop-shadow-md
                           ${isSubOwned ? 'text-emerald-200' : 'text-slate-500 group-hover:text-emerald-600'}`}>
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
