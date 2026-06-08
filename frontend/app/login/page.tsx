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

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>

      {/* Card */}
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

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ flex: 1, height: '1px', background: '#e8ecf0' }}></div>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: '#e8ecf0' }}></div>
        </div>

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

      {/* Bottom note */}
      <p style={{ position: 'fixed', bottom: '20px', fontSize: '12px', color: '#94a3b8' }}>
        ContentLens · Made for Indian Creators
      </p>

    </div>
  );
}