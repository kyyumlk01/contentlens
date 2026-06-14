'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Toast, useToast } from '@/components/Toast';

export default function LoginPage() {
  const [dark, setDark] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') setDark(true);
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.push('/dashboard');
    });
  }, []);

  const toggleTheme = () => {
    const newDark = !dark;
    setDark(newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  const handleForgotPassword = async () => {
    if (!email) { setError('Please enter your email address.'); return; }
    setLoading(true); setError('');
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://vicobot.in/reset-password'
    });
    if (error) {
      setError('Could not send reset email. Please try again.');
    } else {
      addToast('Password reset email sent! Check your inbox.', 'success');
      setIsForgot(false);
    }
    setLoading(false);
  };

  const handleAuth = async () => {
    if (!email || !password) { setError('Please enter your email and password.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true); setError(''); setSuccess('');

    if (isSignup) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError('Something went wrong. Please try again.');
      } else {
        addToast('Account created! Please log in.', 'success');
        setIsSignup(false);
        setPassword('');
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setError('Incorrect email or password. Please check and try again.');
        } else if (error.message.includes('Email not confirmed')) {
          setError('Please confirm your email first.');
        } else {
          setError('Login failed. Please try again.');
        }
      } else {
        addToast('Login successful!', 'success');
        setTimeout(() => router.push('/dashboard'), 800);
      }
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'https://vicobot.in/dashboard' }
    });
    if (error) setError('Google login failed. Please try again.');
  };

  const bg = dark ? '#111' : '#F8FAFF';
  const text = dark ? '#f0f0f0' : '#0A2540';
  const sub = dark ? '#aaa' : '#64748b';
  const border = dark ? '#2a2a2a' : '#e0e4ea';
  const cardBg = dark ? '#1a1a1a' : '#fff';
  const inputBg = dark ? '#111' : '#fafbfc';
  const inputBorder = dark ? '#333' : '#e0e4ea';
  const btnOutlineBg = dark ? '#1e1e1e' : '#f8f9fa';
  const btnOutlineColor = dark ? '#f0f0f0' : '#0A2540';
  const btnOutlineBorder = dark ? '#444' : '#ccc';

  return (
    <div style={{ minHeight: '100vh', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'system-ui, sans-serif', transition: 'background 0.2s' }}>
      <style>{`
        * { box-sizing: border-box; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <Toast toasts={toasts} removeToast={removeToast} />

      <button onClick={toggleTheme} style={{ position: 'fixed', top: 16, right: 16, width: 36, height: 36, borderRadius: 8, border: `0.5px solid ${btnOutlineBorder}`, background: btnOutlineBg, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
        {dark ? '☀️' : '🌙'}
      </button>

      <div style={{ width: '100%', maxWidth: 400, animation: 'fadeIn 0.4s ease' }}>
        <div style={{ background: cardBg, borderRadius: 16, padding: 36, border: `0.5px solid ${border}`, boxShadow: dark ? 'none' : '0 4px 24px rgba(10,37,64,0.06)' }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28, cursor: 'pointer' }} onClick={() => router.push('/')}>
            <div style={{ width: 28, height: 28, background: '#1B4FDB', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>🤖</div>
            <span style={{ fontWeight: 500, fontSize: 15, color: text }}>Vicobot</span>
          </div>

          {/* Forgot Password Mode */}
          {isForgot ? (
            <>
              <h1 style={{ fontSize: 22, fontWeight: 500, color: text, marginBottom: 6 }}>Reset password</h1>
              <p style={{ fontSize: 14, color: sub, marginBottom: 24 }}>Enter your email and we'll send you a reset link.</p>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, fontWeight: 500, color: text, display: 'block', marginBottom: 6 }}>Email</label>
                <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)}
                  style={{ width: '100%', border: `1px solid ${inputBorder}`, borderRadius: 8, padding: '11px 14px', fontSize: 14, color: text, outline: 'none', background: inputBg }}
                  onFocus={e => e.target.style.borderColor = '#1B4FDB'}
                  onBlur={e => e.target.style.borderColor = inputBorder}
                />
              </div>

              {error && (
                <div style={{ background: '#FFF0F0', color: '#cc0000', fontSize: 13, padding: '10px 14px', borderRadius: 8, marginBottom: 14, border: '1px solid #fcc' }}>❌ {error}</div>
              )}

              <button onClick={handleForgotPassword} disabled={loading} style={{ width: '100%', background: loading ? '#6b8fe8' : '#1B4FDB', color: '#fff', border: 'none', padding: 13, borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer', marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {loading ? <><span style={{ width: 16, height: 16, border: '2px solid #fff', borderTop: '2px solid transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />Sending...</> : '📧 Send reset link'}
              </button>

              <p style={{ textAlign: 'center', fontSize: 13, color: sub }}>
                Remember your password?{' '}
                <button onClick={() => { setIsForgot(false); setError(''); }} style={{ color: '#1B4FDB', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>Log in</button>
              </p>
            </>
          ) : (
            <>
              {/* Normal Login/Signup */}
              <h1 style={{ fontSize: 24, fontWeight: 500, color: text, marginBottom: 6, letterSpacing: '-0.5px' }}>
                {isSignup ? 'Create your account' : 'Welcome back'}
              </h1>
              <p style={{ fontSize: 14, color: sub, marginBottom: 28 }}>
                {isSignup ? 'Start for free — no credit card needed' : 'Log in to your Vicobot account'}
              </p>

              {/* Google */}
              <button onClick={handleGoogleLogin} style={{ width: '100%', background: btnOutlineBg, color: btnOutlineColor, border: `0.5px solid ${btnOutlineBorder}`, padding: 12, borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-9 20-20 0-1.3-.1-2.7-.4-4z"/>
                  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                  <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.6 26.8 36 24 36c-5.2 0-9.6-2.9-11.3-7.1l-6.5 5C9.5 39.6 16.3 44 24 44z"/>
                  <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.5-2.6 4.6-4.8 6l6.2 5.2C40.5 35.5 44 30.1 44 24c0-1.3-.1-2.7-.4-4z"/>
                </svg>
                Continue with Google
              </button>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ flex: 1, height: 1, background: border }} />
                <span style={{ fontSize: 12, color: sub }}>or</span>
                <div style={{ flex: 1, height: 1, background: border }} />
              </div>

              {/* Email */}
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, fontWeight: 500, color: text, display: 'block', marginBottom: 6 }}>Email</label>
                <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)}
                  style={{ width: '100%', border: `1px solid ${inputBorder}`, borderRadius: 8, padding: '11px 14px', fontSize: 14, color: text, outline: 'none', background: inputBg }}
                  onFocus={e => e.target.style.borderColor = '#1B4FDB'}
                  onBlur={e => e.target.style.borderColor = inputBorder}
                />
              </div>

              {/* Password */}
              <div style={{ marginBottom: 8 }}>
                <label style={{ fontSize: 12, fontWeight: 500, color: text, display: 'block', marginBottom: 6 }}>Password</label>
                <input type="password" placeholder="Min 6 characters" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAuth()}
                  style={{ width: '100%', border: `1px solid ${inputBorder}`, borderRadius: 8, padding: '11px 14px', fontSize: 14, color: text, outline: 'none', background: inputBg }}
                  onFocus={e => e.target.style.borderColor = '#1B4FDB'}
                  onBlur={e => e.target.style.borderColor = inputBorder}
                />
              </div>

              {/* Forgot Password Link */}
              {!isSignup && (
                <div style={{ textAlign: 'right', marginBottom: 18 }}>
                  <button onClick={() => { setIsForgot(true); setError(''); }} style={{ color: '#1B4FDB', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}>
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Error */}
              {error && (
                <div style={{ background: '#FFF0F0', color: '#cc0000', fontSize: 13, padding: '10px 14px', borderRadius: 8, marginBottom: 14, border: '1px solid #fcc', animation: 'fadeIn 0.3s ease' }}>❌ {error}</div>
              )}

              {/* Success */}
              {success && (
                <div style={{ background: '#F0FFF4', color: '#166534', fontSize: 13, padding: '10px 14px', borderRadius: 8, marginBottom: 14, border: '1px solid #bbf7d0' }}>✅ {success}</div>
              )}

              {/* Button */}
              <button onClick={handleAuth} disabled={loading} style={{ width: '100%', background: loading ? '#6b8fe8' : '#1B4FDB', color: '#fff', border: 'none', padding: 13, borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'background 0.2s' }}>
                {loading ? <><span style={{ width: 16, height: 16, border: '2px solid #fff', borderTop: '2px solid transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />Please wait...</> : isSignup ? '🚀 Create account' : '→ Log in'}
              </button>

              {/* Switch */}
              <p style={{ textAlign: 'center', fontSize: 13, color: sub }}>
                {isSignup ? 'Already have an account? ' : "Don't have an account? "}
                <button onClick={() => { setIsSignup(!isSignup); setError(''); setSuccess(''); }} style={{ color: '#1B4FDB', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>
                  {isSignup ? 'Log in' : 'Sign up for free'}
                </button>
              </p>
            </>
          )}
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: sub, marginTop: 20 }}>
          Vicobot · Made for YouTube Creators
        </p>
      </div>
    </div>
  );
}
