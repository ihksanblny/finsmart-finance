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
    <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#0e2917] rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-[#b5f164] rounded-sm transform rotate-45"></div>
            </div>
            <span className="font-bold text-xl tracking-tight text-[#0e2917]">FinSmart</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
             <Link 
               to="/" 
               className="text-sm font-semibold text-slate-400 hover:text-[#0e2917] transition-colors flex items-center gap-1"
               title="Kembali ke Beranda Utama"
             >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
             </Link>
             <div className="w-px h-4 bg-slate-200"></div>
             <Link 
               to="/dashboard" 
               className={`text-sm font-semibold transition-colors ${isActive('/dashboard') ? 'text-[#0e2917]' : 'text-slate-400 hover:text-slate-600'}`}
             >
                Dashboard
             </Link>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          {userName ? (
            <>
              <div className="text-sm text-slate-500 hidden md:block">
                Halo, <span className="text-[#0e2917] font-semibold">{userName}</span>
              </div>
              <button 
                onClick={handleLogout} 
                className="px-5 py-2 rounded-full border border-slate-200 text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors bg-white shadow-sm"
              >
                Keluar
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-5 py-2 text-sm font-medium text-slate-600 hover:text-[#0e2917] transition-colors">
                Masuk
              </Link>
              <Link to="/register" className="px-5 py-2 rounded-full bg-[#0e2917] text-[#b5f164] text-sm font-medium hover:bg-[#163c23] transition-colors shadow-sm">
                Daftar Gratis
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
