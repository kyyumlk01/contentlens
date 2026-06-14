'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LandingPage() {
  const [dark, setDark] = useState(false);
  const router = useRouter();

 useEffect(() => {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') setDark(true);

  // Auto redirect if already logged in
  supabase.auth.getSession().then(({ data }) => {
    if (data.session) router.push('/dashboard');
  });
}, []);

  const toggleTheme = () => {
    const newDark = !dark;
    setDark(newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  const handleAuthClick = async () => {
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    router.push('/dashboard');
  } else {
    router.push('/login');
  }
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
    { icon: '📈', bg: '#dbeafe', title: 'Demand Score', desc: 'Know if a topic has real audience demand before spending hours filming.', pro: false },
    { icon: '👁️', bg: '#dcfce7', title: 'View Prediction', desc: 'AI predicts your expected views in the first 30 days with accuracy.', pro: false },
    { icon: '🎯', bg: '#fef3c7', title: 'Title Ideas', desc: '5 AI-crafted titles proven to drive clicks in your niche.', pro: false },
    { icon: '💡', bg: '#ede9fe', title: 'Content Gaps', desc: 'Discover untapped angles your competitors have completely missed.', pro: false },
    { icon: '🌐', bg: '#ccfbf1', title: 'Hindi & English', desc: 'Results in Hinglish for Hindi creators, full English for English channels.', pro: false },
    { icon: '📊', bg: '#fee2e2', title: 'Competition Level', desc: 'See if a niche is Easy, Medium or Hard before committing your time.', pro: false },
    { icon: '📅', bg: '#fef3c7', title: 'Video Schedule', desc: 'Full monthly content calendar tailored to your niche and audience.', pro: true },
    { icon: '✂️', bg: '#ede9fe', title: 'Editing Tips', desc: 'AI gives editing style suggestions specific to your topic and niche.', pro: true },
    { icon: '📺', bg: '#ccfbf1', title: 'Channel Analysis', desc: 'Paste your YouTube link and get personalized growth insights instantly.', pro: true },
    { icon: '🖼️', bg: '#fce7f3', title: 'Thumbnail Ideas', desc: 'AI describes exactly what your thumbnail should look like to get clicks.', pro: true },
    { icon: '🎣', bg: '#dbeafe', title: 'Hook Script', desc: 'Perfect first 30-second script to hook viewers immediately.', pro: true },
    { icon: '🏷️', bg: '#dcfce7', title: 'SEO Tags', desc: 'Best tags and keywords to rank your video higher in YouTube search.', pro: true },
  ];

  return (
   <div style={{ background: dark ? '#111' : 'linear-gradient(135deg, #FDF4FF 0%, #EEF2FF 40%, #E0F2FE 100%)', color: text, minHeight: '100vh', fontFamily: 'system-ui, sans-serif', transition: 'background 0.2s, color 0.2s' }}>
      <style>{`
        * { box-sizing: border-box; }
        .feat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .price-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; max-width: 560px; margin: 0 auto; }
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; }
        .nav-inner { padding: 14px 32px; }
        .section-pad { padding: 0 32px; }
        .hero-pad { padding: 72px 32px 56px; }
        .cta-margin { margin: 0 32px 32px; padding: 48px 32px; }
        .hero-title { font-size: 44px; }
        .hero-sub { font-size: 17px; }
        @media (max-width: 768px) {
          .feat-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .price-grid { grid-template-columns: 1fr 1fr !important; max-width: 100% !important; }
          .nav-inner { padding: 12px 16px !important; }
          .section-pad { padding: 0 16px !important; }
          .hero-pad { padding: 48px 16px 40px !important; }
          .cta-margin { margin: 0 16px 24px !important; padding: 32px 16px !important; }
          .hero-title { font-size: 26px !important; letter-spacing: -0.5px !important; }
          .hero-sub { font-size: 14px !important; }
          .nav-text { display: none; }
        }
        @media (max-width: 400px) {
          .price-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Navbar */}
      <nav className="nav-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `0.5px solid ${border}`, background: dark ? '#111' : 'rgba(253,244,255,0.8)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 30, height: 30, background: '#1B4FDB', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🤖</div>
          <span style={{ fontWeight: 500, fontSize: 16 }}>Vicobot</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <a href="/about" className="nav-text" style={{ fontSize: 14, color: sub, textDecoration: 'none' }}>About</a>
          <span className="nav-text" style={{ fontSize: 14, color: sub, cursor: 'pointer' }}>Blog</span>
          <button onClick={toggleTheme} style={{ width: 34, height: 34, borderRadius: 8, border: `0.5px solid ${btnOutlineBorder}`, background: btnOutlineBg, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {dark ? '☀️' : '🌙'}
          </button>
          <button onClick={handleAuthClick} style={{ background: btnOutlineBg, color: btnOutlineColor, border: `0.5px solid ${btnOutlineBorder}`, padding: '9px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            Log in
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="hero-pad" style={{ textAlign: 'center' }}>
        <h1 className="hero-title" style={{ fontWeight: 500, lineHeight: 1.15, letterSpacing: '-1.5px', marginBottom: 18, maxWidth: 600, margin: '0 auto 18px' }}>
          Stop guessing. Start creating videos that{' '}
          <span style={{ color: '#1B4FDB' }}>actually blow up.</span>
        </h1>
        <p className="hero-sub" style={{ color: sub, maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.7 }}>
          Vicobot tells you exactly which topics to make, how many views you'll get, and what titles will make people click — before you even hit record.
        </p>
        <button onClick={handleAuthClick} style={{ background: '#1B4FDB', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: 8, fontSize: 16, fontWeight: 500, cursor: 'pointer' }}>
          🚀 Start now — it's free
        </button>
        <p style={{ fontSize: 13, color: sub, marginTop: 14 }}>No credit card · Free plan available · Hindi & English</p>
      </div>

      {/* Video */}
      <div className="section-pad" style={{ marginBottom: 56 }}>
        <div style={{ border: '0.5px solid #333', borderRadius: 12, overflow: 'hidden', background: '#000', maxWidth: 800, margin: '0 auto' }}>
          <div style={{ background: '#1a1a1a', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '0.5px solid #333' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
            <span style={{ fontSize: 12, color: '#888', marginLeft: 8 }}>vicobot.in/dashboard</span>
          </div>
          <div style={{ position: 'relative', width: '100%', paddingBottom: '50%' }}>
            <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ&controls=0&modestbranding=1" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} allow="autoplay; encrypted-media" allowFullScreen />
          </div>
        </div>
        <p style={{ textAlign: 'center', fontSize: 13, color: sub, marginTop: 12 }}>▶ Watch how creators research topics in under 30 seconds</p>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ background: dark ? '#2a2a2a' : '#e0e4ea', borderTop: `0.5px solid ${border}`, borderBottom: `0.5px solid ${border}`, marginBottom: 56 }}>
        {[{ num: '10,000+', label: 'Topics analyzed' }, { num: '500+', label: 'YouTube creators' }, { num: 'Hi & En', label: 'Language support' }].map((s, i) => (
          <div key={i} style={{ background: dark ? '#1a1a1a' : '#fff', padding: 20, textAlign: 'center' }}>
            <p style={{ fontSize: 22, fontWeight: 500, color: text }}>{s.num}</p>
            <p style={{ fontSize: 13, color: sub, marginTop: 4 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="section-pad" style={{ marginBottom: 64 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: sub, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Everything you need</p>
          <h2 style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.5px', color: text }}>Features built for creators</h2>
        </div>
        <div className="feat-grid">
          {features.map((f, i) => (
            <div key={i} style={{ background: cardBg, border: `0.5px solid ${border}`, borderRadius: 12, padding: 16, position: 'relative' }}>
              {f.pro && <span style={{ position: 'absolute', top: 10, right: 10, background: '#1B4FDB', color: '#fff', fontSize: 9, padding: '2px 7px', borderRadius: 4, fontWeight: 500 }}>Soon</span>}
              <div style={{ width: 36, height: 36, borderRadius: 8, background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, fontSize: 18 }}>{f.icon}</div>
              <p style={{ fontWeight: 500, fontSize: 13, marginBottom: 5, color: text }}>{f.title}</p>
              <p style={{ fontSize: 12, lineHeight: 1.5, color: sub }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="section-pad" style={{ marginBottom: 64 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: sub, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Pricing</p>
          <h2 style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.5px', color: text }}>Simple, honest pricing</h2>
          <p style={{ fontSize: 15, color: sub, marginTop: 8 }}>Start free. Upgrade when you're ready.</p>
        </div>
        <div className="price-grid">
          <div style={{ background: cardBg, border: `0.5px solid ${border}`, borderRadius: 12, padding: 24 }}>
            <p style={{ fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10, color: sub }}>Free</p>
            <p style={{ fontSize: 32, fontWeight: 500, color: text, marginBottom: 4 }}>₹0</p>
            <p style={{ fontSize: 13, color: sub, marginBottom: 18 }}>Forever free</p>
            <div style={{ borderTop: `0.5px solid ${border}`, paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
              {['5 searches/day', 'Demand score', 'View prediction', '5 title ideas', 'Content gaps', 'Hindi & English'].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: text }}><span style={{ color: '#16a34a' }}>✓</span>{item}</div>
              ))}
            </div>
            <button onClick={handleAuthClick} style={{ width: '100%', background: btnOutlineBg, color: btnOutlineColor, border: `0.5px solid ${btnOutlineBorder}`, padding: '11px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Get started free</button>
          </div>

          <div style={{ background: cardBg, border: '2px solid #1B4FDB', borderRadius: 12, padding: 24, position: 'relative' }}>
            <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: '#1B4FDB', color: '#fff', fontSize: 10, fontWeight: 500, padding: '3px 14px', borderRadius: 20, whiteSpace: 'nowrap' }}>Coming Soon</div>
            <p style={{ fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10, color: sub }}>Pro</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
              <span style={{ fontSize: 32, fontWeight: 500, color: text }}>₹299</span>
              <span style={{ fontSize: 13, color: sub }}>/mo</span>
            </div>
            <p style={{ fontSize: 13, color: sub, marginBottom: 18 }}>Cancel anytime</p>
            <div style={{ borderTop: `0.5px solid ${border}`, paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
              {['Unlimited searches', 'All free features', 'Video schedule', 'Editing tips', 'Channel analysis', 'SEO tags'].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: text }}><span style={{ color: '#16a34a' }}>✓</span>{item}</div>
              ))}
            </div>
            <button disabled style={{ width: '100%', background: '#1B4FDB', color: '#fff', border: 'none', padding: '11px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'not-allowed', opacity: 0.7 }}>Coming Soon</button>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-margin" style={{ border: `0.5px solid ${border}`, borderRadius: 12, textAlign: 'center' }}>
        <h2 style={{ fontSize: 24, fontWeight: 500, marginBottom: 10, letterSpacing: '-0.5px', color: text }}>Ready to grow your channel?</h2>
        <p style={{ fontSize: 15, color: sub, marginBottom: 24 }}>Join 500+ YouTube creators already using Vicobot to get more views.</p>
        <button onClick={handleAuthClick} style={{ background: '#1B4FDB', color: '#fff', border: 'none', padding: '13px 28px', borderRadius: 8, fontSize: 15, fontWeight: 500, cursor: 'pointer' }}>
          🚀 Start for free today
        </button>
        <p style={{ fontSize: 13, color: sub, marginTop: 12 }}>No credit card · Cancel anytime</p>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '20px 32px', borderTop: `0.5px solid ${border}`, marginTop: 32 }}>
        <p style={{ fontSize: 13, color: sub }}>Vicobot · Made for YouTube Creators</p>
      </div>
    </div>
  );
}
