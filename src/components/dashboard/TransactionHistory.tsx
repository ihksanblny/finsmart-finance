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
  transactions: Transaction[];
  loading: boolean;
  exchangeRate: number | null;
  onDeleteTransaction: (id: string) => void;
};

export default function TransactionHistory({ transactions, loading, exchangeRate, onDeleteTransaction }: TransactionHistoryProps) {
  return (
    <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col shadow-xl shadow-slate-200/50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[#0e2917]">Riwayat Terakhir</h3>
        <button className="text-sm text-[#0e2917] font-bold hover:underline">Lihat Semua</button>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center text-slate-400 text-sm font-medium">
          Memuat data transaksi...
        </div>
      ) : transactions.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
              <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-slate-500 font-medium max-w-sm">Belum ada transaksi. Mulai catat pengeluaran pertamamu di form sebelah kiri!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 overflow-y-auto pr-2 max-h-[400px] custom-scrollbar">
            {transactions.map((t) => (
              <div key={t.id} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between hover:border-slate-200 hover:bg-white transition-all shadow-sm group">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${t.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-500'}`}>
                        {t.type === 'income' ? (
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                        ) : (
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                        )}
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800">{t.category}</h4>
                        <p className="text-xs font-medium text-slate-500 mt-0.5">{new Date(t.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} {t.description ? `• ${t.description}` : ''}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <div className={`font-bold text-lg ${t.type === 'income' ? 'text-emerald-500' : 'text-slate-800'}`}>
                          {t.type === 'income' ? '+' : '-'} Rp {t.amount.toLocaleString('id-ID')}
                      </div>
                      {/* Konversi Nostalgia Twist (Hanya muncul jika pengeluaran > 500rb) */}
                      {t.type === 'expense' && t.amount > 500000 && (
                          <div className="text-[10px] text-red-600 font-bold mt-1 bg-red-50 border border-red-100 px-2.5 py-0.5 rounded-full inline-block shadow-sm">
                            Setara $ {(t.amount / (exchangeRate || 15650)).toFixed(0)} hari ini
                          </div>
                      )}
                    </div>
                    <button 
                      onClick={() => onDeleteTransaction(t.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all focus:opacity-100"
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
