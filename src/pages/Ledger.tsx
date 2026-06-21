import React from 'react';
import DashboardNav from '../components/DashboardNav';
import TransactionForm from '../components/dashboard/TransactionForm';
import TransactionHistory from '../components/dashboard/TransactionHistory';
import { useDashboardData } from '../hooks/useDashboardData';

export default function Ledger() {
  const {
    transactions,
    loading,
    exchangeRate,
    handleAddTransaction,
    handleDeleteTransaction
  } = useDashboardData();


  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-zinc-200 flex">
      <DashboardNav />

      <div className="flex-1 md:ml-64 flex flex-col w-full min-w-0">
        <main className="max-w-[90rem] mx-auto px-4 lg:px-8 py-12 w-full pb-20">
          <div className="mb-12 max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-black text-zinc-900 tracking-tighter">Cashflow Ledger</h1>
            <p className="text-sm font-bold text-zinc-500 mt-4 leading-relaxed">
              Record and audit your income and expenses. This is your pure tracking center, separated from the overview dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Input Form Area */}
            <div className="xl:col-span-4">
              <TransactionForm onAddTransaction={handleAddTransaction} />
            </div>

            {/* History Data Area */}
            <div className="xl:col-span-8">
              <TransactionHistory 
                title="Transaction History"
                transactions={transactions}
                loading={loading}
                exchangeRate={exchangeRate}
                onDeleteTransaction={handleDeleteTransaction}
              />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
