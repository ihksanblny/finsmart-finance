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
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center text-zinc-900 gap-4">
        <div className="w-8 h-8 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin"></div>
        <div className="text-sm font-medium text-zinc-500">Memverifikasi akses...</div>
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