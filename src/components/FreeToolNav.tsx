import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function FreeToolNav() {
  const location = useLocation();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#0e2917] rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-[#b5f164] rounded-sm transform rotate-45"></div>
            </div>
            <span className="font-bold text-xl tracking-tight text-[#0e2917] hidden sm:block">
              FinSmart <span className="text-emerald-700 font-semibold text-xs ml-2 px-2.5 py-1 rounded-full bg-emerald-100/80 border border-emerald-200/50">Free Tools</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
             <Link 
               to="/kalkulator" 
               className={`text-sm font-semibold transition-colors ${isActive('/kalkulator') ? 'text-[#0e2917]' : 'text-slate-500 hover:text-slate-800'}`}
             >
                Kalkulator Inflasi
             </Link>
             <Link 
               to="/market-value" 
               className={`text-sm font-semibold transition-colors ${isActive('/market-value') ? 'text-[#0e2917]' : 'text-slate-500 hover:text-slate-800'}`}
             >
                Benchmark Gaji
             </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {session ? (
            <Link to="/dashboard" className="px-6 py-2.5 rounded-full bg-[#0e2917] text-[#b5f164] text-sm font-semibold hover:bg-[#153a21] transition-colors shadow-sm">
              Buka Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="px-5 py-2 text-sm font-semibold text-slate-500 hover:text-[#0e2917] transition-colors hidden sm:block">
                Login
              </Link>
              <Link to="/register" className="px-6 py-2.5 rounded-full bg-[#0e2917] text-[#b5f164] text-sm font-semibold hover:bg-[#153a21] transition-colors shadow-sm">
                Daftar & Akses Tracker
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
