import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Navbar() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-[#0e2917] rounded-sm transform rotate-45"></div>
        </div>
        <span className="font-bold text-2xl tracking-tight text-white">FinSmart</span>
      </div>
      <div className="hidden md:flex gap-8 text-sm font-medium text-emerald-50/70">
        <a href="#features" className="hover:text-white transition-colors">Fitur Kami</a>
        <Link to="/kalkulator" className="hover:text-[#b5f164] transition-colors font-semibold text-white">Kalkulator Inflasi</Link>
        <Link to="/market-value" className="hover:text-[#b5f164] transition-colors font-semibold text-white">Skill Benchmark</Link>
      </div>
      <div className="flex items-center gap-4 text-sm font-semibold">
        {session ? (
          <Link to="/dashboard" className="px-6 py-2.5 rounded-full bg-[#b5f164] text-[#0a2615] hover:bg-[#a4e253] transition-colors flex items-center gap-2">
            Buka Dashboard
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        ) : (
          <>
            <Link to="/login" className="px-6 py-2.5 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors">
              Sign In
            </Link>
            <Link to="/register" className="px-6 py-2.5 rounded-full bg-[#b5f164] text-[#0a2615] hover:bg-[#a4e253] transition-colors">
              Open an Account
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}