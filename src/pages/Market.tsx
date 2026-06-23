import { useState, useEffect } from 'react';
import DashboardNav from '../components/DashboardNav';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

export default function Market() {
  const [data, setData] = useState<{ date: string; rate: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [currentRate, setCurrentRate] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [percentChange, setPercentChange] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch last 6 months of USD to IDR data
        const endDate = new Date();
        const endString = endDate.toISOString().split('T')[0];
        
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 6);
        const startString = startDate.toISOString().split('T')[0];

        const res = await fetch(`https://api.fxratesapi.com/timeseries?start_date=${startString}&end_date=${endString}&base=USD&currencies=IDR`);
        if (!res.ok) throw new Error('Gagal mengambil data dari server.');
        
        const json = await res.json();
        
        if (json.rates) {
          const sortedDates = Object.keys(json.rates).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
          const formattedData = sortedDates.map(timestamp => {
            const dateObj = new Date(timestamp);
            return {
              date: dateObj.toISOString().split('T')[0],
              rate: json.rates[timestamp].IDR
            };
          });
          
          setData(formattedData);

          if (formattedData.length > 0) {
            const latest = formattedData[formattedData.length - 1].rate;
            const oldest = formattedData[0].rate;
            
            setCurrentRate(latest);
            setPriceChange(latest - oldest);
            setPercentChange(((latest - oldest) / oldest) * 100);
          }
        }
      } catch (err: any) {
        console.error(err);
        setError('API Provider sedang mengalami gangguan. Coba lagi nanti.');
        
        // Fallback Mock Data just in case the API is down
        const mockData = Array.from({length: 30}, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (30 - i));
          return {
            date: date.toISOString().split('T')[0],
            rate: 15500 + Math.random() * 500
          };
        });
        setData(mockData);
        setCurrentRate(mockData[29].rate);
        setPriceChange(mockData[29].rate - mockData[0].rate);
        setPercentChange(((mockData[29].rate - mockData[0].rate) / mockData[0].rate) * 100);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl shadow-xl text-white">
          <p className="text-xs font-medium text-zinc-400 mb-1">{label}</p>
          <p className="text-lg font-black tracking-tight">
            Rp {payload[0].value.toLocaleString('id-ID')}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-zinc-200 flex">
      <DashboardNav />

      <div className="flex-1 md:ml-64 flex flex-col w-full min-w-0">
        <main className="max-w-[90rem] mx-auto px-4 lg:px-8 py-12 w-full">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-bold uppercase tracking-widest text-zinc-600 mb-4">
              <Activity className="w-4 h-4" /> Global Markets
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-zinc-900 tracking-tighter">Exchange Rate</h1>
            <p className="text-sm font-medium text-zinc-500 mt-3 max-w-2xl leading-relaxed">
              Pantau pergerakan nilai tukar Rupiah terhadap Dollar Amerika secara real-time. Informasi ini penting untuk mengevaluasi inflasi barang impor dan daya beli Anda.
            </p>
          </div>

          <div className="bg-white border border-zinc-200 rounded-3xl p-6 lg:p-10 shadow-sm relative overflow-hidden">
            {/* Header / Stats */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-2">USD to IDR</h2>
                <div className="flex items-end gap-4">
                  <span className="text-5xl font-black tracking-tighter">
                    {loading ? '---' : `Rp ${currentRate.toLocaleString('id-ID', { maximumFractionDigits: 0 })}`}
                  </span>
                  
                  {!loading && (
                    <div className={`flex items-center gap-1 pb-1 font-bold ${priceChange >= 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                      {priceChange >= 0 ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                      <span>{Math.abs(percentChange).toFixed(2)}% (6 Bulan)</span>
                    </div>
                  )}
                </div>
                <p className="text-xs font-medium text-zinc-400 mt-3">
                  {priceChange >= 0 ? 'Rupiah Melemah (Barang impor menjadi lebih mahal)' : 'Rupiah Menguat (Daya beli global Anda meningkat)'}
                </p>
              </div>
              
              <div className="flex bg-zinc-100 p-1 rounded-lg shrink-0">
                <button className="px-4 py-2 text-xs font-bold rounded-md bg-white text-zinc-900 shadow-sm">6M</button>
              </div>
            </div>

            {/* Chart Area */}
            <div className="w-full h-[400px] mt-8">
              {loading ? (
                <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-zinc-100 rounded-2xl">
                  <div className="w-8 h-8 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin mb-4"></div>
                  <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Memuat Data Pasar...</span>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={priceChange >= 0 ? '#ef4444' : '#10b981'} stopOpacity={0.2}/>
                        <stop offset="95%" stopColor={priceChange >= 0 ? '#ef4444' : '#10b981'} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                    <XAxis 
                      dataKey="date" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#a1a1aa', fontSize: 12, fontWeight: 500 }}
                      minTickGap={50}
                      tickFormatter={(val) => {
                         const d = new Date(val);
                         return `${d.getDate()} ${d.toLocaleString('id-ID', { month: 'short' })}`;
                      }}
                    />
                    <YAxis 
                      domain={['dataMin - 100', 'dataMax + 100']}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#a1a1aa', fontSize: 12, fontWeight: 500 }}
                      tickFormatter={(val) => val.toLocaleString('id-ID')}
                      width={60}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#d4d4d8', strokeWidth: 1, strokeDasharray: '4 4' }} />
                    <Area 
                      type="monotone" 
                      dataKey="rate" 
                      stroke={priceChange >= 0 ? '#ef4444' : '#10b981'} 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorRate)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>

            {error && (
              <div className="absolute bottom-6 right-6 bg-amber-50 text-amber-700 text-xs font-bold px-4 py-2 rounded-lg border border-amber-200">
                {error} - Menampilkan data simulasi.
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
}
