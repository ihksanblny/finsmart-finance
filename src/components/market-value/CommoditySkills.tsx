export function CommoditySkills() {
  return (
    <div className="bg-[#0f172a]/40 border border-slate-700/50 border-dashed rounded-2xl p-6 relative flex flex-col h-full transition-all duration-300 hover:bg-[#0f172a]/60 hover:border-slate-600">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 shrink-0 shadow-inner">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>
        </div>
        <h4 className="font-bold text-slate-300 tracking-wide">Commodity</h4>
      </div>
      <p className="text-[11px] text-slate-500 mb-6 font-medium leading-relaxed flex-grow">
        (Low Demand, Low Scarcity). Skill repetitif / administratif yang rentan otomasi AI. Pahami hanya secara konsep makro.
      </p>
      <div className="flex items-center justify-center w-full h-16 px-4 text-center border border-dashed border-slate-700/50 rounded-xl bg-slate-800/20 mt-auto">
        <span className="text-[11px] text-slate-500 font-medium">Pelajari sekilas konsepnya dari Core Skill.</span>
      </div>
    </div>
  );
}
