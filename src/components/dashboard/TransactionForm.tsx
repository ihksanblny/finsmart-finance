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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;
    onAddTransaction(type, amount, category, description);
    
    // Clear form after successful submit
    setAmount('');
    setDescription('');
  };

  return (
    <div className="lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-6 shadow-xl shadow-slate-200/50 h-fit">
      <h3 className="text-xl font-bold text-[#0e2917] mb-6">Catat Transaksi</h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Tipe Transaksi */}
        <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1 rounded-xl border border-slate-100">
          <button 
            type="button" 
            onClick={() => setType('expense')}
            className={`py-2 rounded-lg text-sm font-semibold transition-all ${type === 'expense' ? 'bg-red-50 text-red-600 border border-red-100 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >Pengeluaran</button>
          <button 
            type="button" 
            onClick={() => setType('income')}
            className={`py-2 rounded-lg text-sm font-semibold transition-all ${type === 'income' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >Pemasukan</button>
        </div>

        {/* Nominal */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nominal (Rp)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">Rp</span>
            <input 
              type="number" 
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0e2917] focus:bg-white transition-all"
              placeholder="0"
            />
          </div>
        </div>

        {/* Kategori */}
        <div className="flex flex-col gap-1.5 relative">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kategori</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0e2917] focus:bg-white transition-all flex justify-between items-center"
            >
              {categories.find(c => c.id === category)?.label || 'Pilih Kategori'}
              <svg className={`w-5 h-5 text-slate-400 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isCategoryOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsCategoryOpen(false)}></div>
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl shadow-slate-200/50 z-20 overflow-hidden flex flex-col">
                  {categories.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          setCategory(c.id);
                          setIsCategoryOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm font-semibold transition-colors ${category === c.id ? 'bg-[#0e2917] text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-b border-slate-100 last:border-b-0'}`}
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
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Catatan (Opsional)</label>
          <input 
            type="text" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0e2917] focus:bg-white transition-all"
            placeholder="Beli kopi, dll..."
          />
        </div>

        <button 
          type="submit" 
          className="w-full py-3.5 mt-2 rounded-xl bg-[#0e2917] text-white font-bold text-lg hover:bg-[#0a1f11] transition-colors shadow-lg shadow-[#0e2917]/20"
        >
          Simpan Catatan
        </button>
      </form>
    </div>
  );
}
