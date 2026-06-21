import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';

export default function DashboardNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserName(user.user_metadata?.full_name || user.email?.split('@')[0] || 'User');
      }
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 fixed inset-y-0 left-0 bg-white border-r border-zinc-200 z-50 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      {/* Logo Area */}
      <div className="h-24 flex items-center px-8 border-b border-zinc-100 shrink-0">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-zinc-950 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
          </div>
          <span className="font-black text-xl tracking-tighter text-zinc-900">FINSMART</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-8 px-4 flex flex-col gap-2 overflow-y-auto">
        <div className="px-4 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Menu Utama</div>
        
        <Link 
          to="/dashboard" 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive('/dashboard') ? 'bg-zinc-100 text-zinc-900 shadow-sm' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'}`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Overview
        </Link>
        
        <Link 
          to="/ledger" 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive('/ledger') ? 'bg-zinc-100 text-zinc-900 shadow-sm' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'}`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          Cashflow
        </Link>

        <Link 
          to="/goals" 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive('/goals') ? 'bg-zinc-100 text-zinc-900 shadow-sm' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'}`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
          </svg>
          Financial Goals
        </Link>

        <div className="px-4 mt-8 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Free Tools</div>

        <Link 
          to="/kalkulator" 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive('/kalkulator') ? 'bg-zinc-100 text-zinc-900 shadow-sm' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'}`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          Kalk. Inflasi
        </Link>

        <Link 
          to="/market-value" 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive('/market-value') ? 'bg-zinc-100 text-zinc-900 shadow-sm' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'}`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Skill Benchmark
        </Link>
      </div>

      {/* User Footer */}
      <div className="p-6 border-t border-zinc-100 bg-zinc-50 mt-auto">
        {userName ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-200 border-2 border-white shadow-sm flex items-center justify-center text-zinc-600 font-bold uppercase">
                {userName.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <div className="text-sm font-bold text-zinc-900 truncate">{userName}</div>
                <div className="text-xs text-zinc-500">Active Session</div>
              </div>
            </div>
            <button 
              onClick={handleLogout} 
              className="w-full py-2.5 rounded-xl border border-zinc-200 text-sm font-medium text-zinc-600 hover:bg-white hover:shadow-sm transition-all"
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <Link to="/login" className="w-full py-2.5 text-center rounded-xl bg-white border border-zinc-200 text-zinc-900 text-sm font-semibold hover:bg-zinc-50 transition-colors shadow-sm">
              Masuk
            </Link>
            <Link to="/register" className="w-full py-2.5 text-center rounded-xl bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 transition-colors shadow-sm">
              Daftar Gratis
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
