import DashboardNav from '../components/DashboardNav';
import StatWidgets from '../components/dashboard/StatWidgets';
import { useDashboardData } from '../hooks/useDashboardData';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const {
    totalBalance,
    monthIncome,
    monthExpense,
    dayaBeliStatus,
    profile
  } = useDashboardData();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        supabase.from('profiles').select('onboarding_completed').eq('id', user.id).single()
          .then(({ data }) => {
            if (data && data.onboarding_completed === false) {
              navigate('/onboarding');
            }
          });
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-zinc-200 flex">
      <DashboardNav />

      <div className="flex-1 md:ml-64 flex flex-col w-full min-w-0">
        <main className="max-w-[90rem] mx-auto px-4 lg:px-8 py-12 w-full">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10">
            
            {/* LEFT ZONE: Cashflow Ledger (8 Cols) */}
            <div className="xl:col-span-8 flex flex-col gap-8">
              <div className="mb-2">
                <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Command Center</h1>
                <p className="text-sm font-medium text-zinc-500 mt-2">
                   {profile?.current_profession ? (
                      <>Overview finansial Anda sebagai <span className="font-bold text-zinc-900">{profile.current_profession}</span></>
                   ) : (
                      "Financial Health Snapshot"
                   )}
                </p>
              </div>

              <StatWidgets 
                baseSalary={profile?.current_salary || 0}
                totalBalance={totalBalance}
                monthIncome={monthIncome}
                monthExpense={monthExpense}
                dayaBeliStatus={dayaBeliStatus}
              />

              {/* AI Insight Alert: Executive Summary Style */}
              {dayaBeliStatus && (monthExpense > 0 || monthIncome > 0) && (
                <div className={`p-6 lg:p-8 border rounded-2xl flex flex-col lg:flex-row items-start lg:items-center gap-6 shadow-sm transition-all ${
                  (monthIncome - monthExpense < 0) 
                    ? 'bg-zinc-50 border-zinc-200 text-zinc-900' 
                    : dayaBeliStatus.remainingReal < 0 
                      ? 'bg-zinc-50 border-zinc-200 text-zinc-900'
                      : 'bg-white border-zinc-200'
                }`}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${
                    (monthIncome - monthExpense < 0) ? 'bg-zinc-900 border-zinc-800 text-white' : dayaBeliStatus.remainingReal < 0 ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-100 text-zinc-600'
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
                    <h3 className={`text-xs font-semibold uppercase tracking-wider mb-2 text-zinc-500`}>
                      Executive Summary
                    </h3>
                    
                    <div className="text-sm leading-relaxed text-zinc-700">
                      {(monthIncome - monthExpense < 0) ? (
                        <>
                          <p className="mb-2">
                            Pemasukan bulan ini baru <strong className="font-bold">Rp {monthIncome.toLocaleString('id-ID')}</strong>, 
                            tapi pengeluaran sudah mencapai <strong className="font-bold">Rp {monthExpense.toLocaleString('id-ID')}</strong>. 
                            Kamu sedang <span className="font-semibold px-2 py-0.5 rounded bg-zinc-900 text-white ml-1">Minus Rp {(monthExpense - monthIncome).toLocaleString('id-ID')}</span>
                          </p>
                          <p className="text-xs font-medium text-zinc-500 pt-3 border-t border-zinc-200 mt-3">
                            Tindakan diperlukan: Segera evaluasi pengeluaran Anda.
                          </p>
                        </>
                      ) : (
                        <>
                          Target pendapatan riil bulanan dinilai sebesar <strong className="font-bold">Rp {dayaBeliStatus.realSalary.toLocaleString('id-ID', { maximumFractionDigits: 0 })}</strong>. 
                          {monthIncome > dayaBeliStatus.realSalary ? (
                            <span> Pemasukan bulan ini <strong className="font-bold text-zinc-900">Rp {monthIncome.toLocaleString('id-ID')}</strong>, menambal batas inflasi. </span>
                          ) : monthIncome > 0 ? (
                            <span> Pemasukan yang tercatat adalah <strong className="font-bold">Rp {monthIncome.toLocaleString('id-ID')}</strong>. </span>
                          ) : (
                            <span> Belum ada pencatatan pemasukan dompet bulan ini. </span>
                          )}
                          
                          {monthExpense > 0 && (
                            <span className="block mt-3 pt-3 border-t border-zinc-100">
                              Total pengeluaran <strong className="font-bold">Rp {monthExpense.toLocaleString('id-ID')}</strong>. 
                              Kapasitas inflasi tersisa <strong className={`font-semibold px-2 py-0.5 rounded ml-1 ${dayaBeliStatus.remainingReal < 0 ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-900'}`}>
                                Rp {dayaBeliStatus.remainingReal.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                              </strong>. 
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* BIG ANALYTICS CHART PLACEHOLDER */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm flex flex-col h-[400px]">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900">Cashflow Analytics</h3>
                    <p className="text-sm text-zinc-500 mt-1">Inflow vs Outflow History</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-900"></div>
                      <span className="text-xs font-medium text-zinc-600">Inflow</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-200"></div>
                      <span className="text-xs font-medium text-zinc-600">Outflow</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 border-t border-b border-zinc-100 flex items-end justify-between py-8 px-2 gap-2">
                  {/* Simulated Bar Chart */}
                  {[...Array(7)].map((_, i) => {
                    const h1 = Math.floor(Math.random() * 60) + 20;
                    const h2 = Math.floor(Math.random() * 50) + 10;
                    return (
                      <div key={i} className="w-full flex flex-col items-center justify-end gap-1 h-full group">
                        <div className="w-full max-w-[2rem] flex justify-center items-end gap-1 h-full">
                          <div className="w-full bg-zinc-900 rounded-t-md transition-all duration-300 opacity-90 hover:opacity-100" style={{ height: `${h1}%` }}></div>
                          <div className="w-full bg-zinc-200 rounded-t-md transition-all duration-300 hover:bg-zinc-300" style={{ height: `${h2}%` }}></div>
                        </div>
                        <span className="text-[10px] font-medium text-zinc-400 mt-3">D-{6-i}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT ZONE: Info Modules (4 Cols) */}
            <div className="xl:col-span-4 flex flex-col gap-6 xl:pt-[104px]">
              {/* MINI INFLATION CALCULATOR */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                 <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                 </div>
                 <h4 className="text-lg font-bold text-zinc-900 mb-2">Inflation Engine</h4>
                 <p className="text-sm text-zinc-500 leading-relaxed mb-6">Ketahui dampak inflasi terhadap daya beli gaji Anda secara riil.</p>
                 
                 <Link to="/kalkulator" className="block w-full py-3 text-center rounded-xl bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 transition-colors">
                    Akses Kalkulator
                 </Link>
              </div>

              {/* MINI COMPETENCY MATRIX */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                 <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                 </div>
                 <h4 className="text-lg font-bold text-zinc-900 mb-2">Competency Matrix</h4>
                 <p className="text-sm text-zinc-500 leading-relaxed mb-6">Audit keterampilan Anda untuk melihat harga pasar sesungguhnya.</p>

                 <Link to="/market-value" className="block w-full py-3 text-center rounded-xl bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 transition-colors">
                    Akses Matrix
                 </Link>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}