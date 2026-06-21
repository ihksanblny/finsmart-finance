import type { MarketData } from '../../hooks/useMarketValue';

interface SalaryCalculatorCardProps {
  selectedRole: MarketData;
  estimatedSalary: number;
  feedbackText: React.ReactNode;
}

export function SalaryCalculatorCard({ selectedRole, estimatedSalary, feedbackText }: SalaryCalculatorCardProps) {
  return (
    <div className="mt-8 p-8 md:p-10 bg-zinc-950 border border-zinc-800 rounded-3xl relative overflow-hidden text-white shadow-2xl">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none z-0"></div>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
        <div className="flex-1 text-center md:text-left">
          <p className="text-zinc-400 font-bold text-xs uppercase tracking-widest mb-3">Estimasi Nilai Pasar Anda</p>
          <h3 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">Rp {(estimatedSalary / 1000000).toFixed(1)} <span className="text-2xl text-zinc-500">Jt</span></h3>
          <div className="text-sm text-zinc-300 max-w-md leading-relaxed mx-auto md:mx-0 bg-white/5 p-4 rounded-xl border border-white/10 font-medium">
            {feedbackText}
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <div className="text-[10px] font-bold text-zinc-500 mb-3 flex justify-between uppercase tracking-widest">
            <span>Entry</span>
            <span>Avg</span>
            <span>Max</span>
          </div>
          <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden relative">
            <div 
              className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(255,255,255,0.5)]"
              style={{ width: `${Math.min(100, Math.max(0, ((estimatedSalary - selectedRole.salaryMin) / (selectedRole.salaryMax - selectedRole.salaryMin)) * 100))}%` }}
            ></div>
          </div>
          <div className="mt-4 text-center text-xs text-zinc-400 font-bold uppercase tracking-wider animate-pulse">
            Simulasi Aktif
          </div>
        </div>
      </div>
    </div>
  );
}
