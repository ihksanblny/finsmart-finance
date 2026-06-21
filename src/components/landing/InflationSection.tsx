import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, LineChart } from 'lucide-react';

export default function InflationSection() {
  const [salary, setSalary] = useState(10000000);
  const inflationRate = 0.055; // 5.5% avg
  const years = 4; // 2020 to 2024
  
  const currentWorth = salary / Math.pow(1 + inflationRate, years);
  const lostValue = salary - currentWorth;
  const lostPercentage = ((lostValue / salary) * 100).toFixed(1);

  return (
    <div className="w-full bg-[#FDFDFC] relative z-20 py-32 border-t border-zinc-200">
      
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* Left Column: Typography */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 bg-white text-zinc-600 text-xs font-bold uppercase mb-6 w-fit"
          >
            <AlertCircle className="w-4 h-4" />
            Purchasing Power
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 tracking-tight leading-[1.1] mb-6"
          >
            Wealth doesn't <br />
            stay <span className="text-zinc-400">static.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 font-medium text-lg leading-relaxed mb-10 max-w-lg"
          >
            Simulasikan bagaimana laju inflasi menghancurkan nilai riil gaji Anda dari tahun ke tahun. Kami mengumpulkan data inflasi akurat agar Anda dapat bernegosiasi lebih baik.
          </motion.p>
        </div>

        {/* Right Column: Clean SaaS Widget */}
        <div className="w-full lg:w-7/12">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-full bg-white border border-zinc-200 rounded-2xl p-8 shadow-xl relative"
          >
            {/* Widget Header */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center">
                    <LineChart className="w-5 h-5 text-zinc-900" />
                 </div>
                 <div>
                    <div className="text-zinc-900 font-bold text-sm">Value Erosion Model</div>
                    <div className="text-zinc-500 text-xs font-medium">Based on 5.5% annual inflation</div>
                 </div>
              </div>
              {/* Keep red just for the negative indicator, everything else monochrome */}
              <div className="px-3 py-1 bg-zinc-100 text-zinc-900 border border-zinc-200 text-xs font-bold rounded-md">
                 -{lostPercentage}% Loss
              </div>
            </div>

            {/* Slider Control */}
            <div className="mb-8">
              <div className="flex justify-between text-zinc-500 text-xs font-bold uppercase tracking-wider mb-4">
                <span>Input Nominal Gaji (2020)</span>
                <span className="text-zinc-900">Rp {(salary/1000000).toFixed(1)} Jt</span>
              </div>
              <input 
                  type="range" 
                  min="5000000" 
                  max="50000000" 
                  step="500000"
                  value={salary}
                  onChange={(e) => setSalary(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900"
                />
            </div>

            {/* Data Visualization */}
            <div className="flex gap-4">
               <div className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl p-6">
                  <div className="text-zinc-500 text-xs font-semibold mb-2">Original Value (2020)</div>
                  <div className="text-xl font-black text-zinc-900">Rp {(salary/1000000).toFixed(1)} Jt</div>
               </div>
               <div className="flex-1 bg-zinc-900 rounded-xl p-6 relative overflow-hidden shadow-inner">
                  <div className="text-zinc-400 text-xs font-semibold mb-2 relative z-10">Real Value (2024)</div>
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={currentWorth}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-2xl font-black text-white relative z-10"
                    >
                      Rp {(currentWorth/1000000).toFixed(1)} Jt
                    </motion.div>
                  </AnimatePresence>
               </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}