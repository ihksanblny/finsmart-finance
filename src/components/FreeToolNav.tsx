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
    <div className="w-full pt-6 px-4 md:px-8 z-50 sticky top-0">
      <nav className="max-w-5xl mx-auto bg-white/70 backdrop-blur-xl border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-2 md:px-4 h-16 flex items-center justify-between">
        
        {/* Left Section: Logo & Badge */}
        <div className="flex items-center gap-6 pl-2">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <div className="w-3.5 h-3.5 bg-white rounded-sm transform rotate-45"></div>
            </div>
            <span className="font-black text-xl tracking-tight text-zinc-900 hidden sm:flex items-center gap-3">
              FinSmart
              <span className="text-zinc-800 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 shadow-sm">
                Free Tools
              </span>
            </span>
          </Link>
        </div>

        {/* Center Section: Navigation Links */}
        <div className="hidden md:flex items-center p-1 bg-zinc-50/50 border border-zinc-100 rounded-full">
           <Link 
             to="/kalkulator" 
             className={`text-sm font-bold transition-all px-5 py-2 rounded-full ${isActive('/kalkulator') ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/50' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/50'}`}
           >
              Kalkulator Inflasi
           </Link>
           <Link 
             to="/market-value" 
             className={`text-sm font-bold transition-all px-5 py-2 rounded-full ${isActive('/market-value') ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/50' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/50'}`}
           >
              Benchmark Gaji
           </Link>
        </div>

        {/* Right Section: CTAs */}
        <div className="flex items-center gap-2 pr-1">
          {session ? (
            <Link to="/dashboard" className="px-6 py-2.5 rounded-full bg-zinc-900 text-white text-sm font-bold hover:bg-black transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
              Buka Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="px-5 py-2 text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors hidden sm:block">
                Login
              </Link>
              <Link to="/register" className="px-6 py-2.5 rounded-full bg-zinc-900 text-white text-sm font-bold hover:bg-black transition-all shadow-md shadow-zinc-900/20 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
                Akses Tracker
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
