import FreeToolNav from '../components/FreeToolNav';
import { useRealIncome } from '../hooks/useRealIncome';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function RealIncome() {
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
      "Pendapatan Riil (Daya Beli)": Number(lastYearSalary.replace(/\./g, ''))
    },
    {
      name: 'Saat Ini',
      "Pendapatan Nominal": Number(currentSalary.replace(/\./g, '')),
      "Pendapatan Riil (Daya Beli)": result.realSalary
    }
  ] : [];

  return (
    <div className="min-h-screen bg-[#FDFDFC] text-zinc-900 font-sans selection:bg-zinc-200 pb-20">
      <FreeToolNav />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 mb-3">Kalkulator "Real Income"</h1>
          <p className="text-zinc-500 font-medium">Apakah pendapatanmu tahun ini benar-benar naik, atau malah dimakan inflasi?</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Form Input */}
          <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm">
            <form onSubmit={calculateRealIncome} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Rata-rata Pendapatan Bulanan (Tahun Lalu)</label>
                <input 
                  type="text" 
                  value={lastYearSalary}
                  onChange={(e) => handleLastYearChange(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 transition-all font-medium"
                  placeholder="Contoh: 10.000.000"
                  required
                />
                <p className="text-[10px] text-zinc-400 mt-1">Untuk karyawan masukkan gaji pokok. Untuk freelancer masukkan rata-rata sebulan.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Rata-rata Pendapatan Bulanan (Saat Ini)</label>
                <input 
                  type="text" 
                  value={currentSalary}
                  onChange={(e) => handleCurrentChange(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 transition-all font-medium"
                  placeholder="Contoh: 11.000.000"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Profil Gaya Hidup (Pilih Mode)</label>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {/* Tombol Inflasi Riil */}
                  {realInflationRate && (
                    <button 
                      type="button" 
                      onClick={() => setInflationRate(realInflationRate.toFixed(1))} 
                      className={`py-3 px-1 text-[10px] font-bold rounded-xl border transition-all flex flex-col items-center justify-center gap-1.5 ${inflationRate === realInflationRate.toFixed(1) ? 'bg-zinc-900 text-white border-zinc-900 shadow-md' : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-100'}`}
                    >
                      <svg className="w-5 h-5 mb-0.5 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Nasional Riil</span>
                      <span className="font-medium opacity-70">(~{realInflationRate.toFixed(1)}%)</span>
                    </button>
                  )}
                  
                  <button 
                    type="button" 
                    onClick={() => setInflationRate('4.0')} 
                    className={`py-3 px-1 text-[10px] font-bold rounded-xl border transition-all flex flex-col items-center justify-center gap-1.5 ${inflationRate === '4.0' ? 'bg-zinc-900 text-white border-zinc-900 shadow-md' : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'}`}
                  >
                    <svg className="w-5 h-5 mb-0.5 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>Lokal / Hemat</span>
                    <span className="font-medium opacity-70">(~4.0%)</span>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setInflationRate('6.5')} 
                    className={`py-3 px-1 text-[10px] font-bold rounded-xl border transition-all flex flex-col items-center justify-center gap-1.5 ${inflationRate === '6.5' ? 'bg-zinc-900 text-white border-zinc-900 shadow-md' : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'}`}
                  >
                    <svg className="w-5 h-5 mb-0.5 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Kelas Menengah</span>
                    <span className="font-medium opacity-70">(~6.5%)</span>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setInflationRate('8.5')} 
                    className={`py-3 px-1 text-[10px] font-bold rounded-xl border transition-all flex flex-col items-center justify-center gap-1.5 ${inflationRate === '8.5' ? 'bg-zinc-900 text-white border-zinc-900 shadow-md' : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'}`}
                  >
                    <svg className="w-5 h-5 mb-0.5 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Tech / Global</span>
                    <span className="font-medium opacity-70">(~8.5%)</span>
                  </button>
                </div>

                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Atau Isi Manual Inflasi (%)</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 transition-all font-medium"
                  placeholder="5.5"
                  required
                />
                <p className="text-[10px] text-zinc-400 mt-2 leading-relaxed">
                  <strong className="text-zinc-600">Info:</strong> Mode Lokal mengacu pada inflasi dasar BPS. Mode Impor mengacu pada rata-rata pelemahan Rupiah terhadap Dolar (USD).
                </p>
              </div>

              <button 
                type="submit"
                className="w-full bg-zinc-900 hover:bg-black text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-zinc-900/20"
              >
                Cek Daya Beli Asli Saya
              </button>
            </form>
          </div>

          {/* Result Card */}
          <div className="h-full flex flex-col">
            {result ? (
              <div className={`flex-1 rounded-3xl p-8 border shadow-lg transition-all ${result.isHealthy ? 'bg-white border-zinc-200 shadow-zinc-900/5' : 'bg-white border-red-200 shadow-red-500/10'}`}>
                <div className="flex items-center justify-between mb-8">
                  <h3 className={`text-sm font-bold uppercase tracking-wider ${result.isHealthy ? 'text-zinc-900' : 'text-red-600'}`}>
                    Hasil Analisis
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${result.isHealthy ? 'bg-zinc-100 text-zinc-900 border border-zinc-200' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                    {result.isHealthy ? 'DAYA BELI NAIK' : 'DAYA BELI TURUN'}
                  </span>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className={`text-sm mb-1 font-semibold ${result.isHealthy ? 'text-zinc-500' : 'text-red-400'}`}>Perubahan Pendapatan Nominal (Di atas kertas)</p>
                    <p className={`text-3xl font-black ${result.isHealthy ? 'text-zinc-900' : 'text-red-500'}`}>
                      {result.nominalIncrease > 0 ? '+' : ''} Rp {result.nominalIncrease.toLocaleString('id-ID')}
                    </p>
                  </div>

                  <div className={`h-px w-full ${result.isHealthy ? 'bg-zinc-100' : 'bg-red-100'}`}></div>

                  <div>
                    <p className={`text-sm mb-1 font-bold ${result.isHealthy ? 'text-zinc-600' : 'text-red-500'}`}>Perubahan Pendapatan Riil (Setelah dipotong inflasi)</p>
                    <p className={`text-4xl font-black tracking-tight ${result.isHealthy ? 'text-zinc-900' : 'text-red-600'}`}>
                      {result.realIncrease > 0 ? '+' : ''} Rp {result.realIncrease.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                    </p>
                  </div>

                  <p className={`text-sm leading-relaxed pt-4 font-medium ${result.isHealthy ? 'text-zinc-600' : 'text-red-600'}`}>
                    {result.isHealthy 
                      ? `Selamat! Kenaikan pendapatanmu berhasil mengalahkan inflasi. Uangmu tahun ini setara dengan Rp ${result.realSalary.toLocaleString('id-ID', { maximumFractionDigits: 0 })} di tahun lalu, yang mana masih lebih besar dari pendapatan lamamu.`
                      : result.nominalIncrease > 0 
                        ? `Awas! Secara nominal pendapatanmu memang naik, tapi karena harga barang naik ${inflationRate}%, daya belimu sebenarnya malah menyusut. Pendapatanmu saat ini hanya terasa seperti Rp ${result.realSalary.toLocaleString('id-ID', { maximumFractionDigits: 0 })} di tahun lalu.`
                        : result.nominalIncrease === 0
                          ? `Hati-hati! Gajimu stagnan (tidak naik sama sekali), dan karena adanya inflasi ${inflationRate}%, daya belimu otomatis terkikis menjadi setara Rp ${result.realSalary.toLocaleString('id-ID', { maximumFractionDigits: 0 })} saja.`
                          : `Gawat! Pendapatan nominalmu turun, dan ditambah efek inflasi ${inflationRate}%, daya belimu terhantam lebih parah. Nilai uangmu sekarang hanya setara Rp ${result.realSalary.toLocaleString('id-ID', { maximumFractionDigits: 0 })} di tahun lalu.`
                    }
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex-1 bg-zinc-50 border border-zinc-200 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-white border border-zinc-100 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <svg className="w-8 h-8 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-zinc-900 font-bold mb-2">Belum Ada Perhitungan</h3>
                <p className="text-sm text-zinc-500 font-medium">Masukkan data pendapatan dan inflasi di form sebelah kiri untuk melihat hasil analisismu.</p>
              </div>
            )}
          </div>
        </div>

        {/* Chart Visualization */}
        {result && (
          <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm mt-8">
            <h3 className="text-xl font-black text-zinc-900 mb-6">Visualisasi Perbandingan Pendapatan</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontWeight: 600}} dy={10} />
                  <YAxis 
                    tickFormatter={(value) => `Rp ${(value / 1000000).toFixed(0)}Jt`}
                    axisLine={false}
                    tickLine={false}
                    tick={{fill: '#71717a', fontWeight: 500}}
                    dx={-10}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`Rp ${value.toLocaleString('id-ID', { maximumFractionDigits: 0 })}`, undefined]}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e4e4e7', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="Pendapatan Nominal" fill="#d4d4d8" radius={[6, 6, 0, 0]} maxBarSize={80} />
                  <Bar dataKey="Pendapatan Riil (Daya Beli)" fill={result.isHealthy ? '#18181b' : '#ef4444'} radius={[6, 6, 0, 0]} maxBarSize={80} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-zinc-500 font-medium text-center mt-6 max-w-2xl mx-auto">
              *<strong className="text-zinc-900">Pendapatan Nominal</strong> adalah angka yang tertera di rekeningmu. <strong className="text-zinc-900">Pendapatan Riil</strong> adalah nilai uangmu yang sebenarnya setelah memperhitungkan kenaikan harga barang (inflasi).
            </p>
          </div>
        )}
      </main>
    </div>
  );
}