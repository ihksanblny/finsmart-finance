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
    <nav className="relative flex items-center justify-between py-4">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
        </div>
        <span className="font-black text-2xl tracking-tight text-zinc-900">FinSmart</span>
      </Link>
      
      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-8 text-sm font-medium text-zinc-500">
        <Link to="/kalkulator" className="hover:text-zinc-900 transition-colors font-semibold">Kalkulator Inflasi</Link>
        <Link to="/market-value" className="hover:text-zinc-900 transition-colors font-semibold">Skill Benchmark</Link>
      </div>
      
      <div className="flex items-center gap-4 text-sm font-bold">
        {session ? (
          <Link to="/dashboard" className="px-6 py-2.5 rounded-full bg-zinc-900 text-white hover:bg-black transition-colors flex items-center gap-2 shadow-sm">
            Buka Dashboard
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        ) : (
          <>
            <Link to="/login" className="px-6 py-2.5 rounded-full border border-zinc-200 text-zinc-900 hover:bg-zinc-100 transition-colors">
              Sign In
            </Link>
            <Link to="/register" className="px-6 py-2.5 rounded-full bg-zinc-900 text-white hover:bg-black transition-colors shadow-sm">
              Open an Account
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}