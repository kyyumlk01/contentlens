'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AboutPage() {
  const [dark, setDark] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') setDark(true);
  }, []);

  const toggleTheme = () => {
    const newDark = !dark;
    setDark(newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  const handleAuthClick = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) router.push('/dashboard');
    else router.push('/login');
  };

  const bg = dark ? '#111' : '#fff';
  const text = dark ? '#f0f0f0' : '#0A2540';
  const sub = dark ? '#aaa' : '#555';
  const border = dark ? '#2a2a2a' : '#e0e4ea';
  const cardBg = dark ? '#1a1a1a' : '#fff';
  const btnOutlineBg = dark ? '#1e1e1e' : '#f8f9fa';
  const btnOutlineColor = dark ? '#f0f0f0' : '#0A2540';
  const btnOutlineBorder = dark ? '#444' : '#ccc';

  const features = [
    { icon: '📈', title: 'Demand Score', desc: 'Know if a topic has real audience demand before you spend hours filming.' },
    { icon: '👁️', title: 'View Prediction', desc: 'AI predicts your expected views in the first 30 days with accuracy.' },
    { icon: '🎯', title: '5 Title Ideas', desc: 'Proven title formats that drive clicks in your specific niche.' },
    { icon: '💡', title: 'Content Gaps', desc: 'Discover untapped angles your competitors have completely missed.' },
    { icon: '🌐', title: 'Hindi & English', desc: 'Hinglish results for Hindi creators, full English for English channels.' },
    { icon: '📊', title: 'Competition Level', desc: 'See if a niche is Easy, Medium or Hard before committing your time.' },
  ];

  const steps = [
    { num: '01', title: 'Select your language', desc: 'Choose English or Hindi — based on your channel.' },
    { num: '02', title: 'Pick a category', desc: 'Select the niche that best fits your content.' },
    { num: '03', title: 'Enter your topic', desc: 'Write the topic you want to make a video on.' },
    { num: '04', title: 'Hit Generate', desc: 'AI analyzes in 30 seconds and gives you full insights.' },
  ];

  return (
    <div style={{ background: bg, color: text, minHeight: '100vh', fontFamily: 'system-ui, sans-serif', transition: 'background 0.2s, color 0.2s' }}>
      <style>{`* { box-sizing: border-box; }`}</style>

      {/* Navbar */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', borderBottom: `0.5px solid ${border}`, background: bg, position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => router.push('/')}>
          <div style={{ width: 30, height: 30, background: '#1B4FDB', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🤖</div>
          <span style={{ fontWeight: 500, fontSize: 16 }}>Vicobot</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <a href="/about" style={{ fontSize: 14, color: '#1B4FDB', textDecoration: 'none', fontWeight: 500 }}>About</a>
          <span style={{ fontSize: 14, color: sub, cursor: 'pointer' }}>Blog</span>
          <button onClick={toggleTheme} style={{ width: 34, height: 34, borderRadius: 8, border: `0.5px solid ${btnOutlineBorder}`, background: btnOutlineBg, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {dark ? '☀️' : '🌙'}
          </button>
          <button onClick={handleAuthClick} style={{ background: btnOutlineBg, color: btnOutlineColor, border: `0.5px solid ${btnOutlineBorder}`, padding: '9px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
            Log in
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '64px 24px 48px', maxWidth: 700, margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, padding: '4px 12px', borderRadius: 20, fontWeight: 500, marginBottom: 20, background: dark ? '#0C447C' : '#E6F1FB', color: dark ? '#B5D4F4' : '#0C447C' }}>
          ✨ About Vicobot
        </div>
        <h1 style={{ fontSize: 'clamp(26px, 5vw, 40px)', fontWeight: 500, lineHeight: 1.2, letterSpacing: '-1px', marginBottom: 16 }}>
          Built for YouTube creators who want to{' '}
          <span style={{ color: '#1B4FDB' }}>grow faster with data.</span>
        </h1>
        <p style={{ fontSize: 16, color: sub, lineHeight: 1.8, marginBottom: 32 }}>
          Vicobot is an AI-powered content research tool that helps YouTube creators pick the right topics — so your hard work actually pays off.
        </p>
        <button onClick={handleAuthClick} style={{ background: '#1B4FDB', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: 8, fontSize: 16, fontWeight: 500, cursor: 'pointer' }}>
          🚀 Try it free
        </button>
      </div>

      {/* Story */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px 56px' }}>
        <div style={{ background: cardBg, border: `0.5px solid ${border}`, borderRadius: 16, padding: 28 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: sub, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Our Story</p>
          <h2 style={{ fontSize: 22, fontWeight: 500, color: text, marginBottom: 14, letterSpacing: '-0.5px' }}>The problem we saw</h2>
          <p style={{ fontSize: 15, color: sub, lineHeight: 1.8, marginBottom: 14 }}>
            Millions of creators in India spend hours filming and editing — only to get 200 views. The reason is almost always the same: the wrong topic.
          </p>
          <p style={{ fontSize: 15, color: sub, lineHeight: 1.8, marginBottom: 14 }}>
            Most creators pick topics based on gut feeling. But gut feeling isn't enough when you're competing with thousands of other videos.
          </p>
          <p style={{ fontSize: 15, color: sub, lineHeight: 1.8 }}>
            Vicobot solves this with AI. We analyze real YouTube data so you can pick topics that actually have demand — before you even start filming.
          </p>
        </div>
      </div>

      {/* How it works */}
      <div style={{ padding: '0 24px', marginBottom: 56 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: sub, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>How it works</p>
          <h2 style={{ fontSize: 26, fontWeight: 500, letterSpacing: '-0.5px', color: text }}>4 simple steps</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, maxWidth: 760, margin: '0 auto' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ background: cardBg, border: `0.5px solid ${border}`, borderRadius: 12, padding: 22 }}>
              <p style={{ fontSize: 28, fontWeight: 500, color: '#1B4FDB', marginBottom: 10, opacity: 0.3 }}>{s.num}</p>
              <p style={{ fontWeight: 500, fontSize: 15, color: text, marginBottom: 6 }}>{s.title}</p>
              <p style={{ fontSize: 13, color: sub, lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: '0 24px', marginBottom: 56 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: sub, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Free Features</p>
          <h2 style={{ fontSize: 26, fontWeight: 500, letterSpacing: '-0.5px', color: text }}>What you get for free</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, maxWidth: 760, margin: '0 auto' }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: cardBg, border: `0.5px solid ${border}`, borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{f.icon}</div>
              <p style={{ fontWeight: 500, fontSize: 14, color: text, marginBottom: 6 }}>{f.title}</p>
              <p style={{ fontSize: 13, color: sub, lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ padding: '0 24px', marginBottom: 56 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14, maxWidth: 560, margin: '0 auto' }}>
          {[{ num: '10,000+', label: 'Topics analyzed' }, { num: '500+', label: 'YouTube creators' }, { num: '30 sec', label: 'Analysis time' }, { num: '2', label: 'Languages supported' }].map((s, i) => (
            <div key={i} style={{ background: cardBg, border: `0.5px solid ${border}`, borderRadius: 12, padding: 18, textAlign: 'center' }}>
              <p style={{ fontSize: 26, fontWeight: 500, color: '#1B4FDB', marginBottom: 4 }}>{s.num}</p>
              <p style={{ fontSize: 13, color: sub }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ margin: '0 24px 32px', border: `0.5px solid ${border}`, borderRadius: 12, padding: '40px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 24, fontWeight: 500, marginBottom: 10, letterSpacing: '-0.5px', color: text }}>Ready to grow your channel?</h2>
        <p style={{ fontSize: 15, color: sub, marginBottom: 24 }}>Start free — no credit card needed.</p>
        <button onClick={handleAuthClick} style={{ background: '#1B4FDB', color: '#fff', border: 'none', padding: '13px 28px', borderRadius: 8, fontSize: 15, fontWeight: 500, cursor: 'pointer' }}>
          🚀 Get started now
        </button>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '20px 24px', borderTop: `0.5px solid ${border}` }}>
        <p style={{ fontSize: 13, color: sub }}>Vicobot · Made for YouTube Creators</p>
      </div>
    </div>
  );
}
