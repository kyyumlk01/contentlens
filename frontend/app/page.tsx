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
  const navBg = dark ? '#111' : '#fff';
  const cardBg = dark ? '#1a1a1a' : '#fff';
  const btnOutlineBg = dark ? '#1e1e1e' : '#f8f9fa';
  const btnOutlineColor = dark ? '#f0f0f0' : '#0A2540';
  const btnOutlineBorder = dark ? '#444' : '#ccc';
  const statsBg = dark ? '#1a1a1a' : '#fff';
  const statsBarBg = dark ? '#2a2a2a' : '#e0e4ea';

  const features = [
    { icon: '📈', bg: '#dbeafe', iconColor: '#1d4ed8', title: 'Demand Score', desc: 'Know if a topic has real audience demand before you spend hours filming.', pro: false },
    { icon: '👁️', bg: '#dcfce7', iconColor: '#166534', title: 'View Prediction', desc: 'AI predicts your expected views in the first 30 days with accuracy.', pro: false },
    { icon: '🎯', bg: '#fef3c7', iconColor: '#92400e', title: 'Title Ideas', desc: '5 AI-crafted titles proven to drive clicks in your niche.', pro: false },
    { icon: '💡', bg: '#ede9fe', iconColor: '#5b21b6', title: 'Content Gaps', desc: 'Discover untapped angles your competitors have completely missed.', pro: false },
    { icon: '🌐', bg: '#ccfbf1', iconColor: '#065f46', title: 'Hindi & English', desc: 'Hinglish for Hindi creators, full English for English channels.', pro: false },
    { icon: '📊', bg: '#fee2e2', iconColor: '#991b1b', title: 'Competition Level', desc: 'See if a niche is Easy, Medium or Hard before committing your time.', pro: false },
    { icon: '📅', bg: '#fef3c7', iconColor: '#92400e', title: 'Video Schedule', desc: 'Full monthly content calendar tailored to your niche and audience.', pro: true },
    { icon: '✂️', bg: '#ede9fe', iconColor: '#5b21b6', title: 'Editing Tips', desc: 'AI gives editing style suggestions specific to your topic and niche.', pro: true },
    { icon: '📺', bg: '#ccfbf1', iconColor: '#065f46', title: 'Channel Analysis', desc: 'Paste your YouTube link and get personalized growth insights instantly.', pro: true },
    { icon: '🖼️', bg: '#fce7f3', iconColor: '#9d174d', title: 'Thumbnail Ideas', desc: 'AI describes exactly what your thumbnail should look like to get clicks.', pro: true },
    { icon: '🎣', bg: '#dbeafe', iconColor: '#1d4ed8', title: 'Hook Script', desc: 'Perfect first 30-second script to hook viewers immediately.', pro: true },
    { icon: '🏷️', bg: '#dcfce7', iconColor: '#166534', title: 'SEO Tags', desc: 'Best tags and keywords to rank your video higher in YouTube search.', pro: true },
  ];

  return (
    <div style={{ background: bg, color: text, minHeight: '100vh', fontFamily: 'system-ui, sans-serif', transition: 'background 0.2s, color 0.2s' }}>

      {/* Navbar */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 32px', borderBottom: `0.5px solid ${border}`, background: navBg, position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: 30, height: 30, background: '#1B4FDB', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🤖</div>
          <span style={{ fontWeight: 500, fontSize: 16 }}>Vicobot</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <a href="/about" style={{ fontSize: 14, color: sub, textDecoration: 'none' }}>About</a>
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
      <div style={{ textAlign: 'center', padding: '72px 32px 56px' }}>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 500, lineHeight: 1.15, letterSpacing: '-1.5px', marginBottom: 18, maxWidth: 600, margin: '0 auto 18px' }}>
          Stop guessing. Start creating videos that{' '}
          <span style={{ color: '#1B4FDB' }}>actually blow up.</span>
        </h1>
        <p style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: sub, maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.7 }}>
          Vicobot tells you exactly which topics to make, how many views you'll get, and what titles will make people click — before you even hit record.
        </p>
        <button onClick={handleAuthClick} style={{ background: '#1B4FDB', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: 8, fontSize: 16, fontWeight: 500, cursor: 'pointer' }}>
          🚀 Start now — it's free
        </button>
        <p style={{ fontSize: 13, color: sub, marginTop: 14 }}>No credit card · Free plan available · Hindi & English</p>
      </div>

      {/* Video Section */}
      <div style={{ padding: '0 32px', marginBottom: 56 }}>
        <div style={{ border: '0.5px solid #333', borderRadius: 12, overflow: 'hidden', background: '#000', maxWidth: 800, margin: '0 auto' }}>
          <div style={{ background: '#1a1a1a', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '0.5px solid #333' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
            <span style={{ fontSize: 12, color: '#888', marginLeft: 8 }}>vicobot.in/dashboard</span>
          </div>
          <div style={{ position: 'relative', width: '100%', paddingBottom: '50%' }}>
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ&controls=0&modestbranding=1"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
        <p style={{ textAlign: 'center', fontSize: 13, color: sub, marginTop: 12 }}>
          ▶ Watch how creators research topics in under 30 seconds
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: statsBarBg, borderTop: `0.5px solid ${border}`, borderBottom: `0.5px solid ${border}`, marginBottom: 56 }}>
        {[
          { num: '10,000+', label: 'Topics analyzed' },
          { num: '500+', label: 'Indian creators' },
          { num: 'Hi & En', label: 'Language support' },
        ].map((s, i) => (
          <div key={i} style={{ background: statsBg, padding: 20, textAlign: 'center' }}>
            <p style={{ fontSize: 24, fontWeight: 500, color: text }}>{s.num}</p>
            <p style={{ fontSize: 13, color: sub, marginTop: 4 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={{ padding: '0 32px', marginBottom: 64 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: sub, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Everything you need</p>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 500, letterSpacing: '-0.5px', color: text }}>Features built for creators</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: cardBg, border: `0.5px solid ${border}`, borderRadius: 12, padding: 20, position: 'relative' }}>
              {f.pro && (
                <span style={{ position: 'absolute', top: 12, right: 12, background: '#1B4FDB', color: '#fff', fontSize: 10, padding: '3px 8px', borderRadius: 4, fontWeight: 500 }}>
                  Coming Soon
                </span>
              )}
              <div style={{ width: 38, height: 38, borderRadius: 8, background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, fontSize: 18 }}>
                {f.icon}
              </div>
              <p style={{ fontWeight: 500, fontSize: 14, marginBottom: 6, color: text }}>{f.title}</p>
              <p style={{ fontSize: 13, lineHeight: 1.5, color: sub }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div style={{ padding: '0 32px', marginBottom: 64 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: sub, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Pricing</p>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 500, letterSpacing: '-0.5px', color: text }}>Simple, honest pricing</h2>
          <p style={{ fontSize: 15, color: sub, marginTop: 8 }}>Start free. Upgrade when you're ready.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, maxWidth: 560, margin: '0 auto' }}>

          {/* Free */}
          <div style={{ background: cardBg, border: `0.5px solid ${border}`, borderRadius: 12, padding: 28 }}>
            <p style={{ fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12, color: sub }}>Free</p>
            <p style={{ fontSize: 36, fontWeight: 500, color: text, marginBottom: 4 }}>₹0</p>
            <p style={{ fontSize: 13, color: sub, marginBottom: 20 }}>Forever free, no card needed</p>
            <div style={{ borderTop: `0.5px solid ${border}`, paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              {['5 searches per day', 'Demand score & view prediction', '5 title ideas', 'Content gaps', 'Hindi & English support'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: text }}>
                  <span style={{ color: '#16a34a', flexShrink: 0 }}>✓</span>{item}
                </div>
              ))}
            </div>
            <button onClick={handleAuthClick} style={{ width: '100%', background: btnOutlineBg, color: btnOutlineColor, border: `0.5px solid ${btnOutlineBorder}`, padding: 12, borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
              Get started free
            </button>
          </div>

          {/* Pro */}
          <div style={{ background: cardBg, border: '2px solid #1B4FDB', borderRadius: 12, padding: 28, position: 'relative' }}>
            <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#1B4FDB', color: '#fff', fontSize: 11, fontWeight: 500, padding: '4px 16px', borderRadius: 20, whiteSpace: 'nowrap' }}>
              Coming Soon
            </div>
            <p style={{ fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12, color: sub }}>Pro</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
              <span style={{ fontSize: 36, fontWeight: 500, color: text }}>₹299</span>
              <span style={{ fontSize: 14, color: sub }}>/month</span>
            </div>
            <p style={{ fontSize: 13, color: sub, marginBottom: 20 }}>Billed monthly, cancel anytime</p>
            <div style={{ borderTop: `0.5px solid ${border}`, paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              {['Unlimited searches', 'All free features', 'Video schedule & editing tips', 'Channel analysis', 'Thumbnail ideas & hook script', 'SEO tags & priority support'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: text }}>
                  <span style={{ color: '#16a34a', flexShrink: 0 }}>✓</span>{item}
                </div>
              ))}
            </div>
            <button disabled style={{ width: '100%', background: '#1B4FDB', color: '#fff', border: 'none', padding: 12, borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'not-allowed', opacity: 0.7 }}>
              Coming Soon
            </button>
          </div>

        </div>
      </div>

      {/* CTA */}
      <div style={{ margin: '0 32px 32px', border: `0.5px solid ${border}`, borderRadius: 12, padding: '48px 32px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 500, marginBottom: 10, letterSpacing: '-0.5px', color: text }}>Ready to grow your channel?</h2>
        <p style={{ fontSize: 15, color: sub, marginBottom: 28 }}>Join 500+ Indian creators already using Vicobot to get more views.</p>
        <button onClick={handleAuthClick} style={{ background: '#1B4FDB', color: '#fff', border: 'none', padding: '13px 32px', borderRadius: 8, fontSize: 15, fontWeight: 500, cursor: 'pointer' }}>
          🚀 Start for free today
        </button>
        <p style={{ fontSize: 13, color: sub, marginTop: 14 }}>No credit card · Cancel anytime</p>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '20px 32px', borderTop: `0.5px solid ${border}` }}>
        <p style={{ fontSize: 13, color: sub }}>Vicobot · Made for Indian Creators · vicobot.in</p>
      </div>

    </div>
  );
}
