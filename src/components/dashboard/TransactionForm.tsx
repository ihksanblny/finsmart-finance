import React, { useState } from 'react';

type TransactionFormProps = {
  onAddTransaction: (
    type: 'income' | 'expense',
    amount: string,
    category: string,
    description: string
  ) => void;
};

const categories = [
  { id: 'Makanan', label: 'Makanan & Minuman' },
  { id: 'Transportasi', label: 'Transportasi' },
  { id: 'Hiburan', label: 'Hiburan & Langganan' },
  { id: 'Belanja', label: 'Belanja Pribadi' },
  { id: 'Gaji', label: 'Gaji / Bonus' },
  { id: 'Lainnya', label: 'Lainnya' },
];

export default function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('Makanan');
  const [description, setDescription] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const formatRupiah = (value: string | number) => {
    const numberString = value.toString().replace(/[^,\d]/g, '');
    return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rawAmount = amount.replace(/\./g, '');
    if (!rawAmount || isNaN(Number(rawAmount))) return;
    onAddTransaction(type, rawAmount, category, description);
    
    // Clear form after successful submit
    setAmount('');
    setDescription('');
  };

  return (
    <div className="lg:col-span-1 bg-white border border-zinc-200 rounded-[2rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] h-fit">
      <h3 className="text-xl font-black text-zinc-900 tracking-tight mb-8">Record Ledger</h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Tipe Transaksi */}
        <div className="grid grid-cols-2 gap-2 bg-zinc-50 p-1.5 rounded-2xl border border-zinc-200">
          <button 
            type="button" 
            onClick={() => setType('expense')}
            className={`py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${type === 'expense' ? 'bg-zinc-900 text-white shadow-md' : 'text-zinc-400 hover:text-zinc-900'}`}
          >Pengeluaran</button>
          <button 
            type="button" 
            onClick={() => setType('income')}
            className={`py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${type === 'income' ? 'bg-white text-zinc-900 border border-zinc-200 shadow-md' : 'text-zinc-400 hover:text-zinc-900'}`}
          >Pemasukan</button>
        </div>

        {/* Nominal */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Nominal (Rp)</label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">Rp</span>
            <input 
              type="text" 
              required
              value={amount}
              onChange={(e) => setAmount(formatRupiah(e.target.value))}
              className="w-full pl-14 pr-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-zinc-900 font-black text-lg focus:outline-none focus:ring-4 focus:ring-zinc-900/5 focus:border-zinc-900 transition-all placeholder:text-zinc-300"
              placeholder="0"
            />
          </div>
        </div>

        {/* Kategori */}
        <div className="flex flex-col gap-2 relative">
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Kategori</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-zinc-900 font-bold focus:outline-none focus:ring-4 focus:ring-zinc-900/5 focus:border-zinc-900 transition-all flex justify-between items-center text-left"
            >
              {categories.find(c => c.id === category)?.label || 'Pilih Kategori'}
              <svg className={`w-5 h-5 text-zinc-400 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isCategoryOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsCategoryOpen(false)}></div>
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-zinc-200 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-20 overflow-hidden flex flex-col p-2">
                  {categories.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          setCategory(c.id);
                          setIsCategoryOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm font-bold rounded-xl transition-colors ${category === c.id ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'}`}
                      >
                        {c.label}
                      </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Catatan Tambahan */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Notes (Opsional)</label>
          <input 
            type="text" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-zinc-900 font-bold focus:outline-none focus:ring-4 focus:ring-zinc-900/5 focus:border-zinc-900 transition-all placeholder:text-zinc-300"
            placeholder="Referensi / Memo..."
          />
        </div>

        <button 
          type="submit" 
          className="w-full py-4 mt-4 rounded-2xl bg-zinc-950 text-white font-black text-sm uppercase tracking-widest hover:bg-zinc-800 transition-colors shadow-lg"
        >
          Execute
        </button>
      </form>
    </div>
  );
}
