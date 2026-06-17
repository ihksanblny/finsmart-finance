import React from 'react';

type StatWidgetsProps = {
  totalBalance: number;
  monthIncome: number;
  monthExpense: number;
  dayaBeliStatus: { isHealthy: boolean; realPercent: number } | null;
  exchangeRate: number | null;
  exchangeRateDate: string;
  inflationRate: number;
};

export default function StatWidgets({
  totalBalance,
  monthIncome,
  monthExpense,
  dayaBeliStatus,
  exchangeRate,
  exchangeRateDate,
  inflationRate,
}: StatWidgetsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Widget 1: Total Saldo */}
      <div className="bg-[#0e2917] border border-[#163c23] rounded-3xl p-6 flex flex-col justify-between shadow-2xl shadow-[#0e2917]/30 transform hover:-translate-y-1 transition-transform">
        <div>
           <h3 className="text-emerald-50/60 text-sm font-medium mb-1">Total Saldo Saat Ini</h3>
           <div className="text-4xl font-black tracking-tight text-white mb-6">Rp {totalBalance.toLocaleString('id-ID')}</div>
        </div>
        <div className="flex gap-6 border-t border-white/10 pt-4">
           <div>
              <p className="text-xs text-emerald-50/50 mb-0.5">Pemasukan (Bulan ini)</p>
              <p className="text-sm font-bold text-emerald-400">+ Rp {monthIncome.toLocaleString('id-ID')}</p>
           </div>
           <div>
              <p className="text-xs text-emerald-50/50 mb-0.5">Pengeluaran (Bulan ini)</p>
              <p className="text-sm font-bold text-red-400">- Rp {monthExpense.toLocaleString('id-ID')}</p>
           </div>
        </div>
      </div>

      {/* Widget 2: Status Daya Beli (Dinamis) */}
      {dayaBeliStatus ? (
        <div className={`rounded-3xl p-6 flex flex-col justify-between shadow-2xl transform hover:-translate-y-1 transition-transform ${dayaBeliStatus.isHealthy ? 'bg-[#b5f164] shadow-[#b5f164]/30' : 'bg-red-200 shadow-red-200/30'}`}>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[#0e2917]/70 text-sm font-bold tracking-wider">DAYA BELI</h3>
            <span className="bg-white/40 text-[#0e2917] text-xs font-black px-2 py-1 rounded">
              {dayaBeliStatus.isHealthy ? 'SEHAT' : 'WASPADA'}
            </span>
          </div>
          <div>
            <div className={`text-4xl font-black tracking-tight mb-2 ${dayaBeliStatus.isHealthy ? 'text-[#0e2917]' : 'text-red-900'}`}>
              {dayaBeliStatus.realPercent > 0 ? '+' : ''}{dayaBeliStatus.realPercent.toFixed(1)}%
            </div>
            <p className="text-sm font-medium text-[#0e2917]/80 leading-snug">
              {dayaBeliStatus.isHealthy 
                ? `Pertumbuhan asetmu lebih tinggi dari rata-rata inflasi riil saat ini (${inflationRate.toFixed(1)}%).` 
                : `Gajimu termakan inflasi riil (${inflationRate.toFixed(1)}%). Daya belimu sebenarnya menyusut tahun ini.`}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-slate-100 border border-slate-200 border-dashed rounded-3xl p-6 flex flex-col justify-between transform hover:-translate-y-1 transition-transform">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-slate-400 text-sm font-bold tracking-wider">DAYA BELI</h3>
          </div>
          <div>
            <div className="text-xl font-black tracking-tight text-slate-300 mb-2">
              Belum Dihitung
            </div>
            <p className="text-sm font-medium text-slate-400 leading-snug">
              Gunakan menu <span className="font-bold text-slate-500">Kalkulator Inflasi</span> untuk mengaktifkan widget ini.
            </p>
          </div>
        </div>
      )}

      {/* Widget 3: Widget Kurs Real-Time */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between shadow-xl shadow-slate-200/50">
        <h3 className="text-slate-500 text-sm font-medium mb-2 flex justify-between items-center">
           Nilai Tukar Rupiah
           <span className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Live</span>
        </h3>
        <div>
           <div className="flex items-end gap-3 mb-1">
              <div className="text-3xl font-bold text-slate-900">
                {exchangeRate ? `Rp ${exchangeRate.toLocaleString('id-ID', {maximumFractionDigits: 0})}` : 'Memuat...'}
              </div>
           </div>
           <div className="text-xs text-slate-400">1 USD (Update: {exchangeRateDate || 'hari ini'})</div>
        </div>
        
        <div className="mt-6 h-12 relative w-full border-b border-slate-100">
           <svg className="w-full h-full text-slate-300" viewBox="0 0 100 30" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M0,20 L10,22 L20,18 L30,25 L40,15 L50,17 L60,10 L70,12 L80,5 L90,8 L100,2" />
           </svg>
        </div>
      </div>
    </div>
  );
}
