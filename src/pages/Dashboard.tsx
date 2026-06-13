import DashboardNav from '../components/DashboardNav';
import StatWidgets from '../components/dashboard/StatWidgets';
import TransactionForm from '../components/dashboard/TransactionForm';
import TransactionHistory from '../components/dashboard/TransactionHistory';
import { useDashboardData } from '../hooks/useDashboardData';

export default function Dashboard() {
  const {
    transactions,
    loading,
    exchangeRate,
    exchangeRateDate,
    totalBalance,
    monthIncome,
    monthExpense,
    dayaBeliStatus,
    handleAddTransaction,
    handleDeleteTransaction
  } = useDashboardData();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#b5f164]/30 pb-20">
      {/* Top Navigation Bar */}
      <DashboardNav />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8 text-[#0e2917]">Financial Health Snapshot</h1>

        {/* AI Insight Alert: Menggabungkan Real Income, Income, & Expense Tracker */}
        {dayaBeliStatus && (monthExpense > 0 || monthIncome > 0) && (
          <div className={`mb-8 p-6 border rounded-2xl flex items-start gap-4 shadow-sm transition-colors ${
            (monthIncome - monthExpense < 0) 
              ? 'bg-red-50 border-red-200' 
              : dayaBeliStatus.remainingReal < 0 
                ? 'bg-orange-50 border-orange-200'
                : 'bg-[#b5f164]/10 border-[#b5f164]/40'
          }`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${
              (monthIncome - monthExpense < 0) ? 'bg-gradient-to-br from-red-100 to-red-50 text-red-600 border border-red-200' : dayaBeliStatus.remainingReal < 0 ? 'bg-gradient-to-br from-orange-100 to-orange-50 text-orange-600 border border-orange-200' : 'bg-gradient-to-br from-[#b5f164]/50 to-[#b5f164]/20 text-[#0e2917] border border-[#b5f164]/50'
            }`}>
               {(monthIncome - monthExpense < 0) ? (
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                 </svg>
               ) : (
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                 </svg>
               )}
            </div>
            <div className="w-full">
              <h3 className={`font-bold mb-1 ${
                (monthIncome - monthExpense < 0) ? 'text-red-900' : dayaBeliStatus.remainingReal < 0 ? 'text-orange-900' : 'text-[#0e2917]'
              }`}>
                {(monthIncome - monthExpense < 0) 
                  ? 'DOMPET TEKOR: Pengeluaran Melebihi Pemasukan Nyata!' 
                  : 'Smart Insight: Strategi Melawan Inflasi'}
              </h3>
              
              <div className={`text-sm leading-relaxed ${
                (monthIncome - monthExpense < 0) ? 'text-red-800' : dayaBeliStatus.remainingReal < 0 ? 'text-orange-800' : 'text-[#0e2917]/80'
              }`}>
                {(monthIncome - monthExpense < 0) ? (
                  // Kondisi 1: Dompet Asli Minus (Prioritas Utama)
                  <>
                    <p className="mb-2">
                      Secara realita, uang yang kamu catat masuk bulan ini baru <strong className="font-black">Rp {monthIncome.toLocaleString('id-ID')}</strong>, 
                      tapi pengeluaranmu sudah mencapai <strong className="font-black">Rp {monthExpense.toLocaleString('id-ID')}</strong>. 
                      Kamu sedang <strong className="font-black px-1 rounded bg-red-200 text-red-900">Minus Rp {(monthExpense - monthIncome).toLocaleString('id-ID')}</strong> bulan ini!
                    </p>
                    <p className="text-xs opacity-80 pt-2 border-t border-red-200/50">
                      *Meskipun berdasarkan profil kalkulator daya belimu masih punya sisa target Rp {dayaBeliStatus.remainingReal.toLocaleString('id-ID')}, angka itu tidak relevan jika uang aslinya belum masuk ke dompetmu. Segera catat sisa pendapatanmu (jika ada) atau stop pengeluaran!
                    </p>
                  </>
                ) : (
                  // Kondisi 2: Dompet Asli Positif, kita bahas Inflasi
                  <>
                    Target pendapatan riil bulananmu dinilai sebesar <strong className="font-black">Rp {dayaBeliStatus.realSalary.toLocaleString('id-ID', { maximumFractionDigits: 0 })}</strong>. 
                    {monthIncome > dayaBeliStatus.realSalary ? (
                      <span> TAPI luar biasa, pemasukanmu bulan ini mencapai <strong className="font-black px-1 rounded bg-[#b5f164]/40 text-[#0e2917]">Rp {monthIncome.toLocaleString('id-ID')}</strong>! Kamu menambal inflasi dengan sukses. </span>
                    ) : monthIncome > 0 ? (
                      <span> Uang nyata yang tercatat masuk bulan ini adalah <strong className="font-black text-[#0e2917]">Rp {monthIncome.toLocaleString('id-ID')}</strong>. </span>
                    ) : (
                      <span> Kamu belum mencatat uang pemasukan ke dompet bulan ini. </span>
                    )}
                    
                    {monthExpense > 0 && (
                      <span className="block mt-2 pt-2 border-t border-black/5">
                        Pengeluaran aslimu <strong className="font-black">Rp {monthExpense.toLocaleString('id-ID')}</strong>. 
                        Kapasitas inflasimu tersisa <strong className={`font-black px-1.5 py-0.5 rounded ${dayaBeliStatus.remainingReal < 0 ? 'bg-orange-200 text-orange-900' : 'bg-white/60 text-[#0e2917]'}`}>
                          Rp {dayaBeliStatus.remainingReal.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                        </strong>. 
                        {dayaBeliStatus.remainingReal < 0 
                          ? ' Awas! Uang di dompetmu mungkin masih ada, tapi secara nilai daya beli (inflasi), kamu sudah tekor.' 
                          : ' Aman! Pengeluaranmu masih di bawah batas toleransi inflasi.'}
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <StatWidgets 
          totalBalance={totalBalance}
          monthIncome={monthIncome}
          monthExpense={monthExpense}
          dayaBeliStatus={dayaBeliStatus}
          exchangeRate={exchangeRate}
          exchangeRateDate={exchangeRateDate}
        />

        {/* Smart Expense Tracker & History Section */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <TransactionForm onAddTransaction={handleAddTransaction} />
          
          <TransactionHistory 
            transactions={transactions}
            loading={loading}
            exchangeRate={exchangeRate}
            onDeleteTransaction={handleDeleteTransaction}
          />
        </div>

      </main>
    </div>
  );
}