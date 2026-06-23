import { useMemo, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: string;
}

interface ExpenseChartWidgetProps {
  transactions: Transaction[];
}

const COLORS = ['#18181b', '#3f3f46', '#71717a', '#a1a1aa', '#d4d4d8', '#f4f4f5'];

export default function ExpenseChartWidget({ transactions }: ExpenseChartWidgetProps) {
  const [activeTab, setActiveTab] = useState<'expense' | 'income'>('expense');

  // Aggregate transactions for the current month by category
  const chartData = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const filteredTx = transactions.filter(t => {
      const d = new Date(t.date);
      return t.type === activeTab && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

    const grouped = filteredTx.reduce((acc, curr) => {
      const cat = curr.category || 'Lainnya';
      if (!acc[cat]) {
        acc[cat] = 0;
      }
      acc[cat] += curr.amount;
      return acc;
    }, {} as Record<string, number>);

    // Convert to array and sort by value descending
    return Object.keys(grouped)
      .map(key => ({ name: key, value: grouped[key] }))
      .sort((a, b) => b.value - a.value);
  }, [transactions, activeTab]);

  const totalAmount = chartData.reduce((acc, curr) => acc + curr.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-zinc-200 p-3 rounded-lg shadow-sm">
          <p className="text-xs font-bold text-zinc-900 capitalize mb-1">{payload[0].name}</p>
          <p className="text-sm font-semibold text-zinc-600">
            Rp {payload[0].value.toLocaleString('id-ID')}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-6 lg:p-8 shadow-sm flex flex-col min-h-[400px]">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
            <PieChartIcon className="w-5 h-5 text-zinc-500" />
            Cashflow Analytics
          </h3>
          <p className="text-sm text-zinc-500 mt-1">Distribusi keuangan bulan ini</p>
        </div>
        
        {/* Toggle Switch */}
        <div className="flex p-1 bg-zinc-100 rounded-lg">
          <button 
            onClick={() => setActiveTab('expense')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${activeTab === 'expense' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
          >
            Pengeluaran
          </button>
          <button 
            onClick={() => setActiveTab('income')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${activeTab === 'income' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
          >
            Pemasukan
          </button>
        </div>
      </div>
      
      {chartData.length === 0 ? (
        <div className="flex-1 flex items-center justify-center border-2 border-dashed border-zinc-100 rounded-xl mt-4">
          <p className="text-sm font-medium text-zinc-400">Belum ada {activeTab === 'expense' ? 'pengeluaran' : 'pemasukan'} bulan ini.</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col md:flex-row items-center gap-8 mt-4">
          <div className="w-full md:w-1/2 h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Inner Text for Donut Chart */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Total</span>
              <span className="text-sm font-black text-zinc-900">
                Rp {(totalAmount / 1000000).toFixed(1)}M
              </span>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-3">
            {chartData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm font-semibold text-zinc-700 capitalize">{item.name}</span>
                </div>
                <div className="text-sm font-bold text-zinc-900">
                  {((item.value / totalAmount) * 100).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
