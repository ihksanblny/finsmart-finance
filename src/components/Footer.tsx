import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-white pt-24 pb-12 relative z-30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* CTA Banner */}
        <div className="w-full bg-[#0e2917] rounded-[2rem] p-12 md:p-20 flex flex-col items-center justify-center text-center shadow-2xl mb-24 relative overflow-hidden">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight relative z-10">Amankan Masa Depan<br/>Keuanganmu Sekarang</h2>
            <p className="text-emerald-50/70 mb-10 max-w-lg relative z-10 text-lg font-light">
              Bergabunglah bersama kami dan mulailah melacak, merencanakan, dan melawan inflasi dengan FinSmart.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
              <Link to="/register" className="px-8 py-4 rounded-full bg-[#b5f164] text-[#0a2615] font-semibold text-lg hover:bg-[#a4e253] transition-colors shadow-lg">
                Buka Akun Gratis
              </Link>
              <Link to="/contact" className="px-8 py-4 rounded-full bg-white text-slate-800 font-semibold text-lg hover:bg-slate-50 transition-colors shadow-lg">
                Hubungi Kami
              </Link>
            </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16 text-slate-800">
            {/* Brand Column */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#0e2917] rounded-lg flex items-center justify-center shadow-md">
                  <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
                </div>
                <span className="font-bold text-2xl tracking-tight text-[#0e2917]">FinSmart</span>
              </div>
              <p className="text-slate-500 text-sm max-w-sm">
                Aplikasi personal finance all-in-one untuk membantumu mencatat keuangan, memahami inflasi, dan merencanakan masa depan dengan lebih pintar.
              </p>
            </div>

            {/* Links Columns */}
            <div className="flex flex-col gap-4">
              <h4 className="font-semibold text-slate-900 mb-2">Fitur Utama</h4>
              <Link to="/dashboard" className="text-slate-500 hover:text-[#0e2917] text-sm transition-colors">Smart Expense Tracker</Link>
              <Link to="/real-income" className="text-slate-500 hover:text-[#0e2917] text-sm transition-colors">Kalkulator Inflasi</Link>
              <Link to="/dashboard" className="text-slate-500 hover:text-[#0e2917] text-sm transition-colors">Widget Kurs Real-time</Link>
              <span className="text-slate-400 text-sm cursor-not-allowed">Market Value (Segera)</span>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-semibold text-slate-900 mb-2">Perusahaan</h4>
              <span className="text-slate-500 hover:text-[#0e2917] text-sm transition-colors cursor-pointer">Tentang FinSmart</span>
              <span className="text-slate-500 hover:text-[#0e2917] text-sm transition-colors cursor-pointer">Kebijakan Privasi</span>
              <Link to="/contact" className="text-slate-500 hover:text-[#0e2917] text-sm transition-colors">Hubungi Kami</Link>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-slate-500 text-sm">
              &copy; 2026 FinSmart. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-slate-400">
              <a href="#" className="hover:text-[#0e2917] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" className="hover:text-[#0e2917] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" className="hover:text-[#0e2917] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
        </div>
      </div>
    </footer>
  );
}