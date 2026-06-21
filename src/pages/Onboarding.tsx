import { motion, AnimatePresence } from 'framer-motion';
import { useOnboarding, PROFESSIONS, GOALS } from '../hooks/useOnboarding';

export default function Onboarding() {
  const {
    step,
    setStep,
    isProcessing,
    formData,
    setFormData,
    handleSalaryChange,
    handleComplete
  } = useOnboarding();

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-16 h-16 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin"></div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-zinc-900 mb-2">Menyiapkan Command Center...</h2>
            <p className="text-sm font-medium text-zinc-500">Menyesuaikan kalkulator inflasi dan matriks kompetensi Anda.</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white border border-zinc-200 rounded-3xl p-8 lg:p-12 shadow-sm">
        
        {/* Progress Bar */}
        <div className="flex gap-2 mb-12">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${i <= step ? 'bg-zinc-900' : 'bg-zinc-100'}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h1 className="text-3xl font-bold text-zinc-900 tracking-tight mb-2">Apa profesi Anda saat ini?</h1>
              <p className="text-zinc-500 font-medium mb-8">Pilih profesi yang paling mendekati agar kami dapat menyesuaikan Skill Benchmark Anda.</p>
              
              <div className="flex flex-wrap gap-3">
                {PROFESSIONS.map(prof => (
                  <button
                    key={prof}
                    onClick={() => { setFormData({ ...formData, profession: prof }); setStep(2); }}
                    className={`px-5 py-3 rounded-xl border text-sm font-semibold transition-all ${
                      formData.profession === prof ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 text-zinc-600 hover:border-zinc-400'
                    }`}
                  >
                    {prof}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h1 className="text-3xl font-bold text-zinc-900 tracking-tight mb-2">Berapa rata-rata pendapatan bulanan Anda?</h1>
              <p className="text-zinc-500 font-medium mb-8">Digunakan secara anonim sebagai baseline perhitungan daya beli dan inflasi riil Anda.</p>
              
              <div className="flex items-center w-full px-6 py-4 rounded-2xl border-2 border-zinc-200 focus-within:border-zinc-900 transition-colors mb-8 bg-white">
                <span className="text-xl font-bold text-zinc-400 mr-3">Rp</span>
                <input
                  type="text"
                  value={formData.salary}
                  onChange={handleSalaryChange}
                  placeholder="0"
                  className="w-full text-2xl font-bold text-zinc-900 bg-transparent outline-none placeholder:text-zinc-200"
                />
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="px-6 py-4 rounded-xl font-semibold text-zinc-500 hover:bg-zinc-50 transition-colors">Kembali</button>
                <button 
                  onClick={() => setStep(3)} 
                  disabled={!formData.salary}
                  className="flex-1 bg-zinc-900 text-white rounded-xl font-semibold py-4 hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Lanjut
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h1 className="text-3xl font-bold text-zinc-900 tracking-tight mb-2">Apa fokus utama Anda?</h1>
              <p className="text-zinc-500 font-medium mb-8">Pilih satu tujuan utama agar kami tahu prioritas perjalanan finansial Anda.</p>
              
              <div className="flex flex-col gap-4 mb-10">
                {GOALS.map(goal => (
                  <button
                    key={goal.id}
                    onClick={() => setFormData({ ...formData, goal: goal.id })}
                    className={`flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all ${
                      formData.goal === goal.id ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-100 hover:border-zinc-200'
                    }`}
                  >
                    <div className="mt-1">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.goal === goal.id ? 'border-zinc-900' : 'border-zinc-300'
                      }`}>
                        {formData.goal === goal.id && <div className="w-2.5 h-2.5 bg-zinc-900 rounded-full" />}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-900 mb-1">{goal.title}</h3>
                      <p className="text-sm font-medium text-zinc-500">{goal.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep(2)} className="px-6 py-4 rounded-xl font-semibold text-zinc-500 hover:bg-zinc-50 transition-colors">Kembali</button>
                <button 
                  onClick={handleComplete} 
                  disabled={!formData.goal || isProcessing}
                  className="flex-1 bg-zinc-900 text-white rounded-xl font-semibold py-4 hover:bg-zinc-800 disabled:opacity-50 transition-colors"
                >
                  Selesaikan Setup
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
