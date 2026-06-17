import type { MarketData } from '../../hooks/useMarketValue';

interface SalaryCalculatorCardProps {
  selectedRole: MarketData;
  estimatedSalary: number;
  feedbackText: React.ReactNode;
}

export function SalaryCalculatorCard({ selectedRole, estimatedSalary, feedbackText }: SalaryCalculatorCardProps) {
  return (
    <div className="mt-8 p-8 bg-[#0B1120] border border-slate-800 rounded-3xl relative overflow-hidden text-white shadow-xl">
      <div className="absolute -right-10 -top-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl z-0"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none z-0"></div>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <div className="flex-1 text-center md:text-left">
          <p className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-3 drop-shadow-md">Estimasi Daya Tawarmu</p>
          <h3 className="text-4xl md:text-5xl font-black mb-3">Rp {(estimatedSalary / 1000000).toFixed(1)} <span className="text-2xl text-slate-400">Jt</span></h3>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed mx-auto md:mx-0 bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
            {feedbackText}
          </p>
        </div>
        <div className="w-full md:w-1/3">
          <div className="text-xs font-bold text-slate-500 mb-3 flex justify-between uppercase tracking-wider">
            <span>Entry</span>
            <span>Avg</span>
            <span>Max</span>
          </div>
          <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden relative shadow-inner">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(16,185,129,0.5)]"
              style={{ width: `${Math.min(100, Math.max(0, ((estimatedSalary - selectedRole.salaryMin) / (selectedRole.salaryMax - selectedRole.salaryMin)) * 100))}%` }}
            ></div>
          </div>
          <div className="mt-4 text-center text-xs text-slate-500 font-medium animate-pulse">
            Pilih skill di bawah untuk simulasi gajimu
          </div>
        </div>
      </div>
    </div>
  );
}
