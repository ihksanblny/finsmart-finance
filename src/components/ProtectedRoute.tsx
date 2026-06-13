import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Session } from '@supabase/supabase-js';
import type { ReactNode } from 'react';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Cek session/token saat ini di local storage
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false); // Selesai memuat
    });

    // 2. Dengarkan perubahan status auth (Misal: user tiba-tiba logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Jika sedang mengecek token, tampilkan layar loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0e2917] flex flex-col items-center justify-center text-white gap-4">
        <div className="w-8 h-8 border-4 border-[#b5f164] border-t-transparent rounded-full animate-spin"></div>
        <div className="text-sm font-medium text-emerald-50/70">Memverifikasi akses...</div>
      </div>
    );
  }

  // Jika tidak ada session (belum login), tendang ke halaman login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Jika aman, render halaman yang dituju (misal: Dashboard)
  return <>{children}</>;
}