import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-[#FDFDFC] pt-20 pb-12 relative z-30 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* CTA Banner - Stark Black Minimalist */}
        <div className="w-full bg-zinc-950 rounded-2xl p-12 md:p-16 flex flex-col items-center text-center shadow-2xl mb-24 relative overflow-hidden">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight relative z-10">
              Ready to command your career?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl relative z-10 text-lg font-medium">
              Bergabunglah dengan ribuan profesional yang telah mengamankan daya beli mereka.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
              <Link to="/register" className="px-8 py-3.5 rounded-full bg-white text-zinc-900 font-bold hover:bg-zinc-200 transition-colors">
                Create Free Account
              </Link>
            </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16 text-zinc-900">
            {/* Brand Column */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
                </div>
                <span className="font-black text-xl tracking-tight text-zinc-900">FinSmart</span>
              </div>
              <p className="text-zinc-500 font-medium text-sm max-w-sm leading-relaxed">
                Aplikasi personal finance all-in-one untuk membantumu mencatat keuangan, memahami inflasi, dan merencanakan masa depan dengan cerdas.
              </p>
            </div>

            {/* Links Columns */}
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-zinc-900 mb-2 text-sm uppercase tracking-wider">Product</h4>
              <Link to="/dashboard" className="text-zinc-500 hover:text-zinc-900 font-medium text-sm transition-colors">Smart Expense</Link>
              <Link to="/kalkulator" className="text-zinc-500 hover:text-zinc-900 font-medium text-sm transition-colors">Inflation Calculator</Link>
              <Link to="/market-value" className="text-zinc-500 hover:text-zinc-900 font-medium text-sm transition-colors">Market Value</Link>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-zinc-900 mb-2 text-sm uppercase tracking-wider">Company</h4>
              <span className="text-zinc-500 hover:text-zinc-900 font-medium text-sm transition-colors cursor-pointer">About</span>
              <span className="text-zinc-500 hover:text-zinc-900 font-medium text-sm transition-colors cursor-pointer">Privacy Policy</span>
              <Link to="/contact" className="text-zinc-500 hover:text-zinc-900 font-medium text-sm transition-colors">Contact</Link>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-zinc-400 font-medium text-sm">
              &copy; 2026 FinSmart. All rights reserved.
            </div>
        </div>
      </div>
    </footer>
  );
}