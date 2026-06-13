import FreeToolNav from '../components/FreeToolNav';
import { useRealIncome } from '../hooks/useRealIncome';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function RealIncome() {
  const {
    lastYearSalary,
    setLastYearSalary,
    currentSalary,
    setCurrentSalary,
    inflationRate,
    setInflationRate,
    result,
    calculateRealIncome
  } = useRealIncome();

  const chartData = result ? [
    {
      name: 'Tahun Lalu',
      "Pendapatan Nominal": Number(lastYearSalary),
      "Pendapatan Riil (Daya Beli)": Number(lastYearSalary)
    },
    {
      name: 'Saat Ini',
      "Pendapatan Nominal": Number(currentSalary),
      "Pendapatan Riil (Daya Beli)": result.realSalary
    }
  ] : [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#b5f164]/30 pb-20">
      <FreeToolNav />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-black tracking-tight text-[#0e2917] mb-3">Kalkulator "Real Income"</h1>
          <p className="text-slate-500">Apakah pendapatanmu tahun ini benar-benar naik, atau malah dimakan inflasi?</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Form Input */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <form onSubmit={calculateRealIncome} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Rata-rata Pendapatan Bulanan (Tahun Lalu)</label>
                <input 
                  type="number" 
                  value={lastYearSalary}
                  onChange={(e) => setLastYearSalary(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#b5f164]/50 focus:border-[#0e2917] transition-all"
                  placeholder="Contoh: 10000000"
                  required
                />
                <p className="text-[10px] text-slate-400 mt-1">Untuk karyawan masukkan gaji pokok. Untuk freelancer masukkan rata-rata sebulan.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Rata-rata Pendapatan Bulanan (Saat Ini)</label>
                <input 
                  type="number" 
                  value={currentSalary}
                  onChange={(e) => setCurrentSalary(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#b5f164]/50 focus:border-[#0e2917] transition-all"
                  placeholder="Contoh: 11000000"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Profil Gaya Hidup (Pilih Mode)</label>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <button 
                    type="button" 
                    onClick={() => setInflationRate('4.0')} 
                    className={`py-3 px-1 text-[10px] font-bold rounded-xl border transition-all flex flex-col items-center justify-center gap-1.5 ${inflationRate === '4.0' ? 'bg-[#0e2917] text-[#b5f164] border-[#0e2917] shadow-lg shadow-[#0e2917]/20' : 'bg-white text-slate-600 border-slate-200 hover:border-[#0e2917]/30 hover:bg-slate-50'}`}
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
                    className={`py-3 px-1 text-[10px] font-bold rounded-xl border transition-all flex flex-col items-center justify-center gap-1.5 ${inflationRate === '6.5' ? 'bg-[#0e2917] text-[#b5f164] border-[#0e2917] shadow-lg shadow-[#0e2917]/20' : 'bg-white text-slate-600 border-slate-200 hover:border-[#0e2917]/30 hover:bg-slate-50'}`}
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
                    className={`py-3 px-1 text-[10px] font-bold rounded-xl border transition-all flex flex-col items-center justify-center gap-1.5 ${inflationRate === '8.5' ? 'bg-[#0e2917] text-[#b5f164] border-[#0e2917] shadow-lg shadow-[#0e2917]/20' : 'bg-white text-slate-600 border-slate-200 hover:border-[#0e2917]/30 hover:bg-slate-50'}`}
                  >
                    <svg className="w-5 h-5 mb-0.5 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Tech / Global</span>
                    <span className="font-medium opacity-70">(~8.5%)</span>
                  </button>
                </div>

                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Atau Isi Manual Inflasi (%)</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#b5f164]/50 focus:border-[#0e2917] transition-all"
                  placeholder="5.5"
                  required
                />
                <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                  <strong className="text-slate-600">Info:</strong> Mode Lokal mengacu pada inflasi dasar BPS. Mode Impor mengacu pada rata-rata pelemahan Rupiah terhadap Dolar (USD).
                </p>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#0e2917] hover:bg-[#163c23] text-white font-semibold py-3.5 rounded-xl transition-all shadow-md shadow-[#0e2917]/20"
              >
                Cek Daya Beli Asli Saya
              </button>
            </form>
          </div>

          {/* Result Card */}
          <div className="h-full flex flex-col">
            {result ? (
              <div className={`flex-1 rounded-3xl p-8 border shadow-lg transition-all ${result.isHealthy ? 'bg-[#b5f164] border-[#9fd555] shadow-[#b5f164]/20' : 'bg-red-50 border-red-100 shadow-red-500/10'}`}>
                <div className="flex items-center justify-between mb-8">
                  <h3 className={`text-sm font-bold uppercase tracking-wider ${result.isHealthy ? 'text-[#0e2917]' : 'text-red-800'}`}>
                    Hasil Analisis
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${result.isHealthy ? 'bg-white/50 text-[#0e2917]' : 'bg-red-200 text-red-900'}`}>
                    {result.isHealthy ? 'DAYA BELI NAIK' : 'DAYA BELI TURUN'}
                  </span>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className={`text-sm mb-1 ${result.isHealthy ? 'text-[#0e2917]/70' : 'text-red-800/70'}`}>Kenaikan Pendapatan Nominal (Di atas kertas)</p>
                    <p className={`text-3xl font-black ${result.isHealthy ? 'text-[#0e2917]' : 'text-red-900'}`}>
                      + Rp {result.nominalIncrease.toLocaleString('id-ID')}
                    </p>
                  </div>

                  <div className={`h-px w-full ${result.isHealthy ? 'bg-[#0e2917]/10' : 'bg-red-900/10'}`}></div>

                  <div>
                    <p className={`text-sm mb-1 font-semibold ${result.isHealthy ? 'text-[#0e2917]/80' : 'text-red-800/80'}`}>Kenaikan Pendapatan Riil (Setelah dipotong inflasi)</p>
                    <p className={`text-4xl font-black tracking-tight ${result.isHealthy ? 'text-[#0e2917]' : 'text-red-600'}`}>
                      {result.realIncrease > 0 ? '+' : ''} Rp {result.realIncrease.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                    </p>
                  </div>

                  <p className={`text-sm leading-relaxed pt-4 ${result.isHealthy ? 'text-[#0e2917]/80' : 'text-red-800/80'}`}>
                    {result.isHealthy 
                      ? `Selamat! Kenaikan pendapatanmu berhasil mengalahkan inflasi. Uangmu tahun ini setara dengan Rp ${result.realSalary.toLocaleString('id-ID', { maximumFractionDigits: 0 })} di tahun lalu, yang mana masih lebih besar dari pendapatan lamamu.`
                      : `Awas! Secara nominal pendapatanmu memang naik, tapi karena harga barang naik ${inflationRate}%, daya belimu sebenarnya malah menyusut. Pendapatanmu saat ini hanya terasa seperti Rp ${result.realSalary.toLocaleString('id-ID', { maximumFractionDigits: 0 })} di tahun lalu.`
                    }
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex-1 bg-slate-100 border border-slate-200 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-slate-500 font-semibold mb-2">Belum Ada Perhitungan</h3>
                <p className="text-sm text-slate-400">Masukkan data pendapatan dan inflasi di form sebelah kiri untuk melihat hasil analisismu.</p>
              </div>
            )}
          </div>
        </div>

        {/* Chart Visualization */}
        {result && (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#0e2917] mb-6">Visualisasi Perbandingan Pendapatan</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontWeight: 600}} dy={10} />
                  <YAxis 
                    tickFormatter={(value) => `Rp ${(value / 1000000).toFixed(0)}Jt`}
                    axisLine={false}
                    tickLine={false}
                    tick={{fill: '#64748b'}}
                    dx={-10}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`Rp ${value.toLocaleString('id-ID', { maximumFractionDigits: 0 })}`, undefined]}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="Pendapatan Nominal" fill="#cbd5e1" radius={[6, 6, 0, 0]} maxBarSize={80} />
                  <Bar dataKey="Pendapatan Riil (Daya Beli)" fill={result.isHealthy ? '#b5f164' : '#f87171'} radius={[6, 6, 0, 0]} maxBarSize={80} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-slate-500 text-center mt-6 max-w-2xl mx-auto">
              *<strong className="text-slate-700">Pendapatan Nominal</strong> adalah angka yang tertera di rekeningmu. <strong className="text-slate-700">Pendapatan Riil</strong> adalah nilai uangmu yang sebenarnya setelah memperhitungkan kenaikan harga barang (inflasi).
            </p>
          </div>
        )}
      </main>
    </div>
  );
}