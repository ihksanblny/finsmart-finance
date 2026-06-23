import { Link } from 'react-router-dom';
import { WalletCards, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface RecentLedgerWidgetProps {
  transactions: any[];
}

export default function RecentLedgerWidget({ transactions }: RecentLedgerWidgetProps) {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-6 lg:p-8 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
            <WalletCards className="w-5 h-5 text-zinc-500" />
            Recent Transactions
          </h3>
        </div>
        <Link to="/ledger" className="text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors uppercase tracking-wider">
          See Ledger
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {transactions.length === 0 ? (
          <p className="text-sm text-zinc-500 italic py-4">Belum ada catatan mutasi.</p>
        ) : (
          transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-50 transition-colors border border-transparent hover:border-zinc-100">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600'}`}>
                  {tx.type === 'income' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 capitalize">{tx.category}</h4>
                  <p className="text-xs font-medium text-zinc-500">
                    {new Date(tx.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
              </div>
              <div className={`text-sm font-bold ${tx.type === 'income' ? 'text-zinc-900' : 'text-zinc-500'}`}>
                {tx.type === 'income' ? '+' : '-'} Rp {tx.amount.toLocaleString('id-ID')}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
