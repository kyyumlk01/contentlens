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
    { icon: '📈', title: 'Demand Score', desc: 'Pata karo ki topic ka audience demand kitna hai abhi ke time pe.' },
    { icon: '👁️', title: 'View Prediction', desc: 'AI predict karta hai ki pehle 30 din mein kitne views milenge.' },
    { icon: '🎯', title: '5 Title Ideas', desc: 'Proven title formats jo aapke niche mein clicks drive karte hain.' },
    { icon: '💡', title: 'Content Gaps', desc: 'Woh angles dhundho jo competitors ne miss kar diye hain.' },
    { icon: '🌐', title: 'Hindi & English', desc: 'Hindi creators ke liye Hinglish, English creators ke liye full English.' },
    { icon: '📊', title: 'Competition Level', desc: 'Easy, Medium ya Hard — pehle se hi pata karo.' },
  ];

  const steps = [
    { num: '01', title: 'Apni language choose karo', desc: 'Hindi ya English — aapke channel ke hisaab se.' },
    { num: '02', title: 'Topic daalo', desc: 'Woh topic likho jis pe video banana chahte ho.' },
    { num: '03', title: 'Generate dabao', desc: 'AI 30 seconds mein poora analysis kar deta hai.' },
    { num: '04', title: 'Results dekho', desc: 'Demand, views, titles, gaps — sab kuch ek jagah.' },
  ];

  return (
    <div style={{ background: bg, color: text, minHeight: '100vh', fontFamily: 'system-ui, sans-serif', transition: 'background 0.2s, color 0.2s' }}>

      {/* Navbar */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 32px', borderBottom: `0.5px solid ${border}`, background: bg, position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => router.push('/')}>
          <div style={{ width: 30, height: 30, background: '#1B4FDB', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🤖</div>
          <span style={{ fontWeight: 500, fontSize: 16 }}>Vicobot</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <a href="/about" style={{ fontSize: 14, color: '#1B4FDB', textDecoration: 'none', fontWeight: 500 }}>About</a>
          <span style={{ fontSize: 14, color: sub, cursor: 'pointer' }}>Blog</span>
          <button onClick={toggleTheme} style={{ width: 36, height: 36, borderRadius: 8, border: `0.5px solid ${btnOutlineBorder}`, background: btnOutlineBg, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {dark ? '☀️' : '🌙'}
          </button>
          <button onClick={handleAuthClick} style={{ background: btnOutlineBg, color: btnOutlineColor, border: `0.5px solid ${btnOutlineBorder}`, padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
            Log in
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '72px 32px 56px', maxWidth: 700, margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, padding: '4px 12px', borderRadius: 20, fontWeight: 500, marginBottom: 24, background: dark ? '#0C447C' : '#E6F1FB', color: dark ? '#B5D4F4' : '#0C447C' }}>
          ✨ About Vicobot
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 500, lineHeight: 1.15, letterSpacing: '-1.5px', marginBottom: 18 }}>
          Banaya gaya Indian creators ke liye — <span style={{ color: '#1B4FDB' }}>unke sapne poore karne ke liye</span>
        </h1>
        <p style={{ fontSize: 16, color: sub, lineHeight: 1.8, marginBottom: 36 }}>
          Vicobot ek AI-powered content research tool hai jo Indian YouTube creators ko help karta hai sahi topic choose karne mein — waste time nahi, sirf results.
        </p>
        <button onClick={handleAuthClick} style={{ background: '#1B4FDB', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: 8, fontSize: 16, fontWeight: 500, cursor: 'pointer' }}>
          🚀 Free mein try karo
        </button>
      </div>

      {/* Story Section */}
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 32px 64px' }}>
        <div style={{ background: cardBg, border: `0.5px solid ${border}`, borderRadius: 16, padding: 32 }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: sub, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Hamari kahani</p>
          <h2 style={{ fontSize: 24, fontWeight: 500, color: text, marginBottom: 16, letterSpacing: '-0.5px' }}>
            Problem jo humne dekhi
          </h2>
          <p style={{ fontSize: 15, color: sub, lineHeight: 1.8, marginBottom: 16 }}>
            India mein lakho creators hain jo YouTube pe content banate hain — lekin unhe pata nahi hota ki kaun sa topic viral hoga, kitne views milenge, ya competition kitna tough hai.
          </p>
          <p style={{ fontSize: 15, color: sub, lineHeight: 1.8, marginBottom: 16 }}>
            Bahut saare creators mehnat karte hain — ghante editing mein lagate hain — lekin video 200 views pe ruk jaati hai. Wajah sirf ek hoti hai: <strong style={{ color: text }}>galat topic.</strong>
          </p>
          <p style={{ fontSize: 15, color: sub, lineHeight: 1.8 }}>
            Vicobot isi problem ko solve karta hai. Hum AI use karte hain taaki aap sahi topic choose karo — pehle se hi — aur apni mehnat sahi jagah lagao.
          </p>
        </div>
      </div>

      {/* How it works */}
      <div style={{ padding: '0 32px', marginBottom: 64 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: sub, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Kaise kaam karta hai</p>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 500, letterSpacing: '-0.5px', color: text }}>4 simple steps</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, maxWidth: 800, margin: '0 auto' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ background: cardBg, border: `0.5px solid ${border}`, borderRadius: 12, padding: 24 }}>
              <p style={{ fontSize: 32, fontWeight: 500, color: '#1B4FDB', marginBottom: 12, opacity: 0.3 }}>{s.num}</p>
              <p style={{ fontWeight: 500, fontSize: 15, color: text, marginBottom: 8 }}>{s.title}</p>
              <p style={{ fontSize: 13, color: sub, lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: '0 32px', marginBottom: 64 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: sub, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Features</p>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 500, letterSpacing: '-0.5px', color: text }}>Free mein yeh sab milega</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, maxWidth: 800, margin: '0 auto' }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: cardBg, border: `0.5px solid ${border}`, borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 24, marginBottom: 12 }}>{f.icon}</div>
              <p style={{ fontWeight: 500, fontSize: 14, color: text, marginBottom: 6 }}>{f.title}</p>
              <p style={{ fontSize: 13, color: sub, lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ padding: '0 32px', marginBottom: 64 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16, maxWidth: 600, margin: '0 auto' }}>
          {[
            { num: '10,000+', label: 'Topics analyzed' },
            { num: '500+', label: 'Indian creators' },
            { num: '30 sec', label: 'Analysis time' },
            { num: '2', label: 'Languages supported' },
          ].map((s, i) => (
            <div key={i} style={{ background: cardBg, border: `0.5px solid ${border}`, borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <p style={{ fontSize: 28, fontWeight: 500, color: '#1B4FDB', marginBottom: 4 }}>{s.num}</p>
              <p style={{ fontSize: 13, color: sub }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ margin: '0 32px 32px', border: `0.5px solid ${border}`, borderRadius: 12, padding: '48px 32px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 500, marginBottom: 10, letterSpacing: '-0.5px', color: text }}>
          Taiyar ho apna channel grow karne ke liye?
        </h2>
        <p style={{ fontSize: 15, color: sub, marginBottom: 28 }}>
          Free mein shuru karo — koi credit card nahi chahiye.
        </p>
        <button onClick={handleAuthClick} style={{ background: '#1B4FDB', color: '#fff', border: 'none', padding: '13px 32px', borderRadius: 8, fontSize: 15, fontWeight: 500, cursor: 'pointer' }}>
          🚀 Abhi shuru karo
        </button>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '20px 32px', borderTop: `0.5px solid ${border}` }}>
        <p style={{ fontSize: 13, color: sub }}>Vicobot · Made for Indian Creators · vicobot.in</p>
      </div>

    </div>
  );
}
