'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleAuth() {
    setLoading(true);
    setError('');
    if (isSignup) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) { setError(error.message); setLoading(false); return; }
      router.push('/dashboard');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { setError(error.message); setLoading(false); return; }
      router.push('/dashboard');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm p-8 border border-gray-100 rounded-2xl shadow-sm">
        
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-black"></div>
          <span className="font-medium text-sm">ContentLens</span>
        </div>

        <h1 className="text-2xl font-medium mb-1">
          {isSignup ? 'Account banao' : 'Login karo'}
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          {isSignup ? 'Free mein shuru karo' : 'Wapas aao!'}
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm mb-3 focus:outline-none focus:border-gray-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm mb-4 focus:outline-none focus:border-gray-400"
        />

        {error && (
          <p className="text-red-500 text-xs mb-3">{error}</p>
        )}

        <button
          onClick={handleAuth}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg text-sm font-medium disabled:opacity-50"
        >
          {loading ? 'Wait karo...' : (isSignup ? 'Sign Up' : 'Login')}
        </button>

        <p className="text-center text-sm text-gray-400 mt-4">
          {isSignup ? 'Already account hai? ' : 'Naya account? '}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-black underline"
          >
            {isSignup ? 'Login karo' : 'Sign up karo'}
          </button>
        </p>

      </div>
    </div>
  );
}