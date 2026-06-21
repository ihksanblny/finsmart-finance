import DashboardNav from '../components/DashboardNav';
import { useRealIncome } from '../hooks/useRealIncome';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Activity, ArrowRight, Info, AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';

export default function RealIncome({ embedded = false }: { embedded?: boolean }) {
  const {
    lastYearSalary,
    handleLastYearChange,
    currentSalary,
    handleCurrentChange,
    inflationRate,
    setInflationRate,
    realInflationRate,
    result,
    calculateRealIncome
  } = useRealIncome();

  const chartData = result ? [
    {
      name: 'Tahun Lalu',
      "Pendapatan Nominal": Number(lastYearSalary.replace(/\./g, '')),
      "Daya Beli Riil": Number(lastYearSalary.replace(/\./g, ''))
    },
    {
      name: 'Saat Ini',
      "Pendapatan Nominal": Number(currentSalary.replace(/\./g, '')),
      "Daya Beli Riil": result.realSalary
    }
  ] : [];

  const Content = (
    <>
      {!embedded && (
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 mb-3">Kalkulator "Real Income"</h1>
          <p className="text-zinc-500 font-medium max-w-2xl text-base md:text-lg">Ketahui apakah kenaikan gajimu tahun ini benar-benar sebuah peningkatan, atau diam-diam telah tergerus oleh inflasi.</p>
        </div>
      )}

      {/* The Impeccable Main Card */}
      <div className="bg-white border border-zinc-200 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col lg:flex-row">
          
          {/* LEFT PANE - INPUTS (40%) */}
          <div className="w-full lg:w-[40%] border-b lg:border-b-0 lg:border-r border-zinc-100 bg-zinc-50/50 p-6 md:p-10">
            <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-8 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Parameter Data
            </h2>
            
            <form onSubmit={calculateRealIncome} className="space-y-8">
              
              <div className="space-y-2">
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest">Pendapatan Tahun Lalu</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-zinc-400 font-bold">Rp</span>
                  </div>
                  <input 
                    type="text" 
                    value={lastYearSalary}
                    onChange={(e) => handleLastYearChange(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-zinc-200 rounded-xl text-zinc-900 focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all font-bold text-lg"
                    placeholder="10.000.000"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest">Pendapatan Saat Ini</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-zinc-400 font-bold">Rp</span>
                  </div>
                  <input 
                    type="text" 
                    value={currentSalary}
                    onChange={(e) => handleCurrentChange(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-zinc-200 rounded-xl text-zinc-900 focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all font-bold text-lg"
                    placeholder="11.000.000"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest">Profil Inflasi (%)</label>
                
                <div className="flex flex-wrap gap-2">
                  {realInflationRate && (
                    <button 
                      type="button" 
                      onClick={() => setInflationRate(realInflationRate.toFixed(1))} 
                      className={`px-4 py-2.5 rounded-lg border text-xs font-bold transition-all ${inflationRate === realInflationRate.toFixed(1) ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white border-zinc-200 text-zinc-500 hover:border-zinc-300'}`}
                    >
                      Nasional Riil (~{realInflationRate.toFixed(1)}%)
                    </button>
                  )}
                  <button 
                    type="button" 
                    onClick={() => setInflationRate('4.0')} 
                    className={`px-4 py-2.5 rounded-lg border text-xs font-bold transition-all ${inflationRate === '4.0' ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white border-zinc-200 text-zinc-500 hover:border-zinc-300'}`}
                  >
                    Gaya Hemat (~4.0%)
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setInflationRate('6.5')} 
                    className={`px-4 py-2.5 rounded-lg border text-xs font-bold transition-all ${inflationRate === '6.5' ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white border-zinc-200 text-zinc-500 hover:border-zinc-300'}`}
                  >
                    Menengah (~6.5%)
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setInflationRate('8.5')} 
                    className={`px-4 py-2.5 rounded-lg border text-xs font-bold transition-all ${inflationRate === '8.5' ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white border-zinc-200 text-zinc-500 hover:border-zinc-300'}`}
                  >
                    Global/Tech (~8.5%)
                  </button>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <div className="h-px bg-zinc-200 flex-1"></div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400">Atau</span>
                  <div className="h-px bg-zinc-200 flex-1"></div>
                </div>

                <div className="relative pt-2">
                  <input 
                    type="number" 
                    step="0.1"
                    value={inflationRate}
                    onChange={(e) => setInflationRate(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all font-bold"
                    placeholder="Input Manual (Mis: 5.5)"
                    required
                  />
                  <div className="absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-zinc-400 font-bold">%</div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full bg-zinc-900 hover:bg-black text-white font-bold py-4 rounded-xl transition-all shadow-[0_8px_20px_rgb(0,0,0,0.12)] flex items-center justify-center gap-2 group"
                >
                  Analisis Pendapatan Saya
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT PANE - RESULTS & CHART (60%) */}
          <div className="w-full lg:w-[60%] p-6 md:p-10 bg-white flex flex-col relative">
            {result ? (
              <div className="flex flex-col h-full animate-in fade-in duration-700">
                
                {/* Result Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">Daya Beli Riil (Tahun Ini)</h3>
                    <div className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900">
                      Rp {result.realSalary.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <div className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 shadow-sm ${result.isHealthy ? 'bg-zinc-50 border-zinc-200 text-zinc-900' : 'bg-red-50 border-red-200 text-red-600'}`}>
                    {result.isHealthy ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span className="text-xs font-bold uppercase tracking-wide">{result.isHealthy ? 'Positif' : 'Negatif'}</span>
                  </div>
                </div>

                {/* Micro Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-xl border border-zinc-100 bg-zinc-50/50">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">Kenaikan Nominal</p>
                    <p className="text-xl font-bold text-zinc-900">
                      {result.nominalIncrease > 0 ? '+' : ''} Rp {result.nominalIncrease.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl border ${result.isHealthy ? 'border-zinc-100 bg-zinc-50/50' : 'border-red-100 bg-red-50/50'}`}>
                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${result.isHealthy ? 'text-zinc-500' : 'text-red-500'}`}>Pertumbuhan Riil</p>
                    <p className={`text-xl font-bold ${result.isHealthy ? 'text-zinc-900' : 'text-red-600'}`}>
                      {result.realIncrease > 0 ? '+' : ''} Rp {result.realIncrease.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                </div>

                {/* Analysis Message */}
                <div className="mb-10">
                  <p className={`text-sm leading-relaxed font-medium p-4 rounded-xl border ${result.isHealthy ? 'bg-zinc-50 border-zinc-200 text-zinc-700' : 'bg-red-50/50 border-red-100 text-red-700'}`}>
                    {result.isHealthy 
                      ? `Selamat! Kenaikan pendapatanmu berhasil mengalahkan inflasi. Uangmu tahun ini setara dengan Rp ${result.realSalary.toLocaleString('id-ID', { maximumFractionDigits: 0 })} di tahun lalu, yang mana masih lebih besar dari pendapatan lamamu.`
                      : result.nominalIncrease > 0 
                        ? `Awas! Secara nominal pendapatanmu memang naik, tapi karena harga barang naik ${inflationRate}%, daya belimu sebenarnya malah menyusut. Pendapatanmu saat ini hanya terasa seperti Rp ${result.realSalary.toLocaleString('id-ID', { maximumFractionDigits: 0 })} di tahun lalu.`
                        : result.nominalIncrease === 0
                          ? `Hati-hati! Gajimu stagnan, dan karena adanya inflasi ${inflationRate}%, daya belimu otomatis terkikis menjadi setara Rp ${result.realSalary.toLocaleString('id-ID', { maximumFractionDigits: 0 })} saja.`
                          : `Gawat! Pendapatan nominalmu turun, dan ditambah efek inflasi ${inflationRate}%, daya belimu terhantam lebih parah. Nilai uangmu sekarang hanya setara Rp ${result.realSalary.toLocaleString('id-ID', { maximumFractionDigits: 0 })} di tahun lalu.`
                    }
                  </p>
                </div>

                {/* Integrated Chart */}
                <div className="flex-1 min-h-[250px] w-full mt-auto border-t border-zinc-100 pt-8">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6 flex justify-between items-center">
                    Visualisasi Daya Beli
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-zinc-200"></div><span className="text-[10px] text-zinc-500">Nominal</span></div>
                      <div className="flex items-center gap-1.5"><div className={`w-2 h-2 rounded-full ${result.isHealthy ? 'bg-zinc-900' : 'bg-red-500'}`}></div><span className="text-[10px] text-zinc-500">Riil</span></div>
                    </div>
                  </h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barGap={8}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#a1a1aa', fontSize: 12, fontWeight: 600}} dy={10} />
                      <YAxis 
                        tickFormatter={(value) => `${(value / 1000000).toFixed(0)}Jt`}
                        axisLine={false}
                        tickLine={false}
                        tick={{fill: '#a1a1aa', fontSize: 12, fontWeight: 500}}
                        dx={-10}
                      />
                      <Tooltip 
                        formatter={(value: number) => [`Rp ${value.toLocaleString('id-ID', { maximumFractionDigits: 0 })}`, undefined]}
                        contentStyle={{ borderRadius: '12px', border: '1px solid #e4e4e7', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold', fontSize: '12px' }}
                        cursor={{fill: '#fafafa'}}
                      />
                      <Bar dataKey="Pendapatan Nominal" radius={[4, 4, 0, 0]} maxBarSize={60}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-nom-${index}`} fill="#e4e4e7" />
                        ))}
                      </Bar>
                      <Bar dataKey="Daya Beli Riil" radius={[4, 4, 0, 0]} maxBarSize={60}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-real-${index}`} fill={result.isHealthy ? '#18181b' : '#ef4444'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

              </div>
            ) : (
              // Empty State
              <div className="flex-1 flex flex-col items-center justify-center text-center px-6 h-[500px]">
                <div className="w-20 h-20 bg-zinc-50 border border-zinc-100 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                  <Activity className="w-8 h-8 text-zinc-300" />
                </div>
                <h3 className="text-xl font-black text-zinc-900 mb-2">Belum Ada Data</h3>
                <p className="text-sm text-zinc-500 font-medium max-w-sm">
                  Silakan lengkapi parameter gaji dan inflasi di panel sebelah kiri. Kami akan mensimulasikan daya beli riil Anda di sini.
                </p>
                
                <div className="mt-12 p-4 bg-zinc-50 rounded-xl border border-zinc-100 max-w-sm w-full text-left flex items-start gap-3">
                   <Info className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                   <div>
                     <p className="text-xs font-bold text-zinc-900 mb-1">Tahukah Anda?</p>
                     <p className="text-[10px] text-zinc-500 leading-relaxed">Kenaikan gaji 10% tidak berarti apa-apa jika inflasi juga berada di angka 10%. Angka nominal menipu, angka riil adalah fakta.</p>
                   </div>
                </div>
              </div>
            )}
          </div>

        </div>
    </>
  );

  if (embedded) {
    return Content;
  }

  return (
    <div className="min-h-screen bg-[#FDFDFC] text-zinc-900 font-sans selection:bg-zinc-200 flex">
      <DashboardNav />

      <div className="flex-1 md:ml-64 flex flex-col w-full min-w-0">
        <main className="max-w-[90rem] mx-auto px-4 lg:px-8 py-12 w-full pb-20">
          {Content}
        </main>
      </div>
    </div>
  );
}