import React from 'react';

type Transaction = {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string | null;
  date: string;
};

type TransactionHistoryProps = {
  title?: string;
  transactions: Transaction[];
  loading: boolean;
  exchangeRate: number | null;
  onDeleteTransaction: (id: string) => void;
};

export default function TransactionHistory({ title = "Recent Activity", transactions, loading, exchangeRate, onDeleteTransaction }: TransactionHistoryProps) {
  return (
    <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-[2rem] p-8 flex flex-col shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] h-fit">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-100">
        <h3 className="text-xl font-black text-zinc-900 tracking-tight">{title}</h3>
        <button className="text-[10px] text-zinc-400 font-black hover:text-zinc-900 uppercase tracking-widest transition-colors">Lihat Semua</button>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center text-zinc-400 text-xs font-bold uppercase tracking-widest py-12">
          Memuat data...
        </div>
      ) : transactions.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
            <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mb-6 border border-zinc-200 shadow-sm">
              <svg className="w-8 h-8 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-zinc-400 font-bold text-sm max-w-sm leading-relaxed">Belum ada transaksi. Mulai catat pengeluaran pertamamu di form sebelah kiri.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 overflow-y-auto pr-2 max-h-[400px] custom-scrollbar">
            {transactions.map((t) => (
              <div key={t.id} className="bg-white border border-transparent rounded-2xl p-4 flex items-center justify-between hover:border-zinc-200 hover:bg-zinc-50 transition-all group">
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${t.type === 'income' ? 'bg-zinc-900 text-white shadow-md' : 'bg-zinc-100 text-zinc-600'}`}>
                        {t.type === 'income' ? (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                        )}
                    </div>
                    <div>
                        <h4 className="font-bold text-zinc-900 text-sm tracking-tight">{t.category}</h4>
                        <p className="text-[10px] font-bold text-zinc-400 mt-1 uppercase tracking-wider">{new Date(t.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} {t.description ? `• ${t.description}` : ''}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <div className={`font-black text-lg tracking-tight ${t.type === 'income' ? 'text-zinc-900' : 'text-zinc-400'}`}>
                          {t.type === 'income' ? '+' : '-'} Rp {t.amount.toLocaleString('id-ID')}
                      </div>
                      {/* Konversi Nostalgia Twist */}
                      {t.type === 'expense' && t.amount > 500000 && (
                          <div className="text-[9px] text-white font-bold mt-1.5 bg-zinc-900 px-2.5 py-1 rounded-full inline-block shadow-sm tracking-widest uppercase">
                            ≈ $ {(t.amount / (exchangeRate || 15650)).toFixed(0)}
                          </div>
                      )}
                    </div>
                    <button 
                      onClick={() => onDeleteTransaction(t.id)}
                      className="p-2 text-zinc-300 hover:text-white hover:bg-red-600 rounded-xl opacity-0 group-hover:opacity-100 transition-all focus:opacity-100"
                      title="Hapus Transaksi"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
