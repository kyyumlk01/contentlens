'use client';
import Image from 'next/image';
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

 async function handleGoogleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `https://contentlens-abdulkayyum20006-3476s-projects.vercel.app/dashboard`
      }
    });
    if (error) setError(error.message);
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>

      <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#fff', borderRadius: '16px', padding: '36px', border: '1px solid #e8ecf0', boxShadow: '0 4px 24px #0A254010' }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
          <Image src="/logo.png" alt="ContentLens" width={28} height={28} />
          <span style={{ fontWeight: 500, fontSize: '15px', color: '#0A2540' }}>ContentLens</span>
        </div>

        {/* Heading */}
        <h1 style={{ fontSize: '24px', fontWeight: 500, color: '#0A2540', marginBottom: '6px', letterSpacing: '-0.5px' }}>
          {isSignup ? 'Create your account' : 'Welcome back'}
        </h1>
        <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '28px' }}>
          {isSignup ? 'Start researching for free' : 'Login to your ContentLens account'}
        </p>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          style={{ width: '100%', background: '#fff', color: '#0A2540', border: '1px solid #e8ecf0', padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-9 20-20 0-1.3-.1-2.7-.4-4z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.6 26.8 36 24 36c-5.2 0-9.6-2.9-11.3-7.1l-6.5 5C9.5 39.6 16.3 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.5-2.6 4.6-4.8 6l6.2 5.2C40.5 35.5 44 30.1 44 24c0-1.3-.1-2.7-.4-4z"/>
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ flex: 1, height: '1px', background: '#e8ecf0' }}></div>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: '#e8ecf0' }}></div>
        </div>

        {/* Email */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontSize: '12px', fontWeight: 500, color: '#0A2540', display: 'block', marginBottom: '6px' }}>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', border: '1px solid #e8ecf0', borderRadius: '8px', padding: '11px 14px', fontSize: '14px', color: '#0A2540', outline: 'none', background: '#fafbfc', boxSizing: 'border-box' }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '12px', fontWeight: 500, color: '#0A2540', display: 'block', marginBottom: '6px' }}>Password</label>
          <input
            type="password"
            placeholder="Min 6 characters"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAuth()}
            style={{ width: '100%', border: '1px solid #e8ecf0', borderRadius: '8px', padding: '11px 14px', fontSize: '14px', color: '#0A2540', outline: 'none', background: '#fafbfc', boxSizing: 'border-box' }}
          />
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: '#FFF0F0', color: '#cc0000', fontSize: '13px', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #fcc' }}>
            {error}
          </div>
        )}

        {/* Button */}
        <button
          onClick={handleAuth}
          disabled={loading}
          style={{ width: '100%', background: '#1B4FDB', color: '#fff', border: 'none', padding: '13px', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', opacity: loading ? 0.7 : 1, marginBottom: '16px' }}
        >
          {loading ? 'Please wait...' : (isSignup ? 'Create account' : 'Login')}
        </button>

        {/* Switch */}
        <p style={{ textAlign: 'center', fontSize: '13px', color: '#94a3b8' }}>
          {isSignup ? 'Already have an account? ' : "Don't have an account? "}
          <button
            onClick={() => { setIsSignup(!isSignup); setError(''); }}
            style={{ color: '#1B4FDB', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}
          >
            {isSignup ? 'Login' : 'Sign up for free'}
          </button>
        </p>

      </div>

      <p style={{ position: 'fixed', bottom: '20px', fontSize: '12px', color: '#94a3b8' }}>
        ContentLens · Made for Indian Creators
      </p>

    </div>
  );
}
