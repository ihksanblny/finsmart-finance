import React from 'react';

type StatWidgetsProps = {
  totalBalance: number;
  monthIncome: number;
  monthExpense: number;
  dayaBeliStatus: { isHealthy: boolean; realPercent: number } | null;
};

export default function StatWidgets({
  totalBalance,
  monthIncome,
  monthExpense,
  dayaBeliStatus,
}: StatWidgetsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {/* Widget 1: Master Balance */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="relative z-10">
           <div className="flex justify-between items-start mb-4">
             <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
               </svg>
             </div>
             <span className="text-xs font-semibold text-zinc-500 bg-zinc-50 px-2.5 py-1 rounded-md border border-zinc-100">Live</span>
           </div>
           <h3 className="text-zinc-500 text-xs font-medium mb-1">Total Balance</h3>
           <div className="text-2xl font-bold text-zinc-900">Rp {totalBalance.toLocaleString('id-ID')}</div>
        </div>
      </div>

      {/* Widget 2: Income */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
        <h3 className="text-zinc-500 text-xs font-medium mb-1">Income (MTD)</h3>
        <div className="text-2xl font-bold text-zinc-900">+ Rp {monthIncome.toLocaleString('id-ID')}</div>
      </div>

      {/* Widget 3: Expense */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
        <h3 className="text-zinc-500 text-xs font-medium mb-1">Expense (MTD)</h3>
        <div className="text-2xl font-bold text-zinc-900">- Rp {monthExpense.toLocaleString('id-ID')}</div>
      </div>

      {/* Widget 4: Purchasing Power */}
      {dayaBeliStatus ? (
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${dayaBeliStatus.isHealthy ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-900 text-white'}`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${dayaBeliStatus.isHealthy ? 'bg-zinc-100 text-zinc-700' : 'bg-zinc-900 text-white'}`}>
              {dayaBeliStatus.isHealthy ? 'Healthy' : 'Deficit'}
            </span>
          </div>
          <h3 className="text-zinc-500 text-xs font-medium mb-1">Purchasing Power</h3>
          <div className="text-2xl font-bold text-zinc-900">
            {dayaBeliStatus.realPercent > 0 ? '+' : ''}{dayaBeliStatus.realPercent.toFixed(1)}%
          </div>
        </div>
      ) : (
        <div className="bg-zinc-50 border border-zinc-200 border-dashed rounded-2xl p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-zinc-500 text-xs font-medium mb-1">Purchasing Power</h3>
          <div className="text-lg font-semibold text-zinc-400">No Data</div>
        </div>
      )}
    </div>
  );
}
