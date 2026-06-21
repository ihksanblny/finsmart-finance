import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Database, Workflow } from 'lucide-react';

const features = [
  {
    icon: <BarChart3 className="w-6 h-6 text-zinc-900" />,
    title: "Real-time Salary Analytics",
    desc: "Bandingkan gaji Anda dengan standar pasar secara akurat berdasarkan O*NET taxonomy."
  },
  {
    icon: <Workflow className="w-6 h-6 text-zinc-900" />,
    title: "Skill Dependency Graphs",
    desc: "Visualisasi peta keahlian yang harus Anda kuasai untuk naik ke level gaji berikutnya."
  },
  {
    icon: <Database className="w-6 h-6 text-zinc-900" />,
    title: "Inflation Impact Modeling",
    desc: "Proyeksikan penyusutan aset dan daya beli Anda jika gaji Anda stagnan dalam 5 tahun."
  }
];

export default function FeaturesSection() {
  return (
    <div className="w-full bg-[#FDFDFC] py-32 border-t border-zinc-200 relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row gap-16 items-start">
           <div className="w-full md:w-1/3">
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight mb-6">
                Engineered for <br/>Career Growth.
              </h2>
              <p className="text-zinc-500 font-medium leading-relaxed">
                Kami membangun alat analitik level enterprise untuk membantu para profesional memahami metrik karir mereka layaknya seorang investor memahami pasar.
              </p>
           </div>
           
           <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 rounded-2xl bg-white border border-zinc-200 shadow-sm hover:shadow-md transition-shadow"
                >
                   <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center mb-6">
                      {item.icon}
                   </div>
                   <h3 className="text-xl font-bold text-zinc-900 mb-3">{item.title}</h3>
                   <p className="text-zinc-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                </motion.div>
              ))}
              
              {/* Feature Graphic Card */}
              <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 sm:col-span-2 flex items-center justify-center min-h-[200px]"
                >
                   <div className="text-center">
                      <div className="text-zinc-400 font-mono text-sm mb-2 uppercase tracking-widest">System Status</div>
                      <div className="text-2xl font-bold text-white tracking-tight">Live Data Synchronization</div>
                   </div>
              </motion.div>
           </div>
        </div>
      </div>
    </div>
  );
}