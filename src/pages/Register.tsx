import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { supabase } from '../lib/supabase';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          }
        }
      });

      if (signUpError) throw signUpError;
      
      if (data.session === null) {
        setMessage('Registrasi berhasil! Silakan periksa kotak masuk (atau spam) email Anda untuk verifikasi.');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat mendaftar.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error: googleError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      if (googleError) throw googleError;
    } catch (err: any) {
      setError(err.message || 'Gagal masuk dengan Google.');
    }
  };

  return (
    <AuthLayout 
      title="Create Account." 
      subtitle="Join FinSmart to track your real market value."
    >
      <div className="mb-6">
        {error && (
          <div className="mb-4 p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100">
            {error}
          </div>
        )}
        
        {message && (
          <div className="mb-4 p-4 rounded-xl bg-emerald-50 text-emerald-600 text-sm font-medium border border-emerald-100">
            {message}
          </div>
        )}
      </div>

      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-zinc-900">Full Name</label>
          <input 
            type="text" 
            placeholder="John Doe"
            className="w-full px-4 py-3.5 rounded-lg border-1.5 border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all font-medium placeholder:text-zinc-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-zinc-900">Email Address</label>
          <input 
            type="email" 
            placeholder="nama@email.com"
            className="w-full px-4 py-3.5 rounded-lg border-1.5 border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all font-medium placeholder:text-zinc-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-zinc-900">Password</label>
          <input 
            type="password" 
            placeholder="Min 8 characters"
            className="w-full px-4 py-3.5 rounded-lg border-1.5 border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all font-medium placeholder:text-zinc-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full py-4 mt-4 rounded-lg bg-zinc-900 text-white font-bold text-lg hover:bg-black disabled:opacity-70 transition-all flex items-center justify-center"
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <div className="mt-8 flex items-center gap-4">
         <div className="flex-1 h-px bg-zinc-200"></div>
         <span className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Or register with</span>
         <div className="flex-1 h-px bg-zinc-200"></div>
      </div>

      <button onClick={handleGoogleLogin} type="button" className="w-full mt-6 py-3.5 px-4 rounded-lg border-1.5 border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-900 font-bold flex items-center justify-center gap-3 transition-colors">
         <svg className="w-5 h-5 grayscale opacity-80" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
         Google
      </button>

      <p className="mt-8 text-center text-sm text-zinc-500 font-medium">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-zinc-900 hover:underline">
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
}