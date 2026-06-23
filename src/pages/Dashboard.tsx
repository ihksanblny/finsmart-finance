import DashboardNav from '../components/DashboardNav';
import StatWidgets from '../components/dashboard/StatWidgets';
import TopGoalsWidget from '../components/dashboard/TopGoalsWidget';
import RecentLedgerWidget from '../components/dashboard/RecentLedgerWidget';
import ExpenseChartWidget from '../components/dashboard/ExpenseChartWidget';
import { useDashboardData } from '../hooks/useDashboardData';
import { useAiInsight } from '../hooks/useAiInsight';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const {
    totalBalance,
    monthIncome,
    monthExpense,
    dayaBeliStatus,
    profile,
    transactions,
    recentTransactions,
    activeGoals
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

  const aiInsight = useAiInsight(monthIncome, monthExpense, activeGoals);

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

              {/* AI Insight Alert: Cross Analytics System */}
              <div className={`p-6 lg:p-8 border rounded-2xl flex flex-col lg:flex-row items-start lg:items-center gap-6 shadow-sm transition-all ${
                aiInsight.type === 'danger' ? 'bg-zinc-50 border-zinc-300 text-zinc-900' : 
                aiInsight.type === 'success' ? 'bg-white border-zinc-200' : 'bg-zinc-50 border-zinc-200'
              }`}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${
                  aiInsight.type === 'danger' ? 'bg-zinc-900 border-zinc-800 text-white' : 
                  aiInsight.type === 'success' ? 'bg-zinc-100 border-zinc-200 text-zinc-900' : 
                  'bg-white border-zinc-200 text-zinc-500'
                }`}>
                   {aiInsight.type === 'danger' ? (
                     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                     </svg>
                   ) : aiInsight.type === 'warning' ? (
                     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                   ) : (
                     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                     </svg>
                   )}
                </div>
                <div className="w-full">
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2 text-zinc-500">
                    AI Cross-Analytics Insight
                  </h3>
                  
                  <div className="text-sm leading-relaxed text-zinc-800 font-medium">
                    <p>{aiInsight.message}</p>
                  </div>
                </div>
                
                <Link to={aiInsight.actionLink} className="shrink-0 w-full lg:w-auto px-5 py-3 mt-4 lg:mt-0 bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-zinc-800 transition-colors text-center">
                  {aiInsight.actionText}
                </Link>
              </div>

              {/* EXPENSE ANALYTICS CHART */}
              <ExpenseChartWidget transactions={transactions} />

              {/* RECENT LEDGER WIDGET */}
              <RecentLedgerWidget transactions={recentTransactions} />
            </div>

            {/* RIGHT ZONE: Info Modules (4 Cols) */}
            <div className="xl:col-span-4 flex flex-col gap-6 xl:pt-[104px]">
              {/* TOP GOALS WIDGET */}
              <TopGoalsWidget goals={activeGoals} />
              
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