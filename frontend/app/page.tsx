'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif' }}>

      {/* Navbar */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 32px', backgroundColor: '#fff', borderBottom: '1px solid #e8ecf0', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Image src="/logo.png" alt="ContentLens" width={28} height={28} />
          <span style={{ fontWeight: 500, fontSize: '15px', color: '#0A2540', letterSpacing: '-0.3px' }}>ContentLens</span>
        </div>
        <div style={{ display: 'flex', gap: '24px', fontSize: '13px', color: '#4a6080' }}>
          <span style={{ cursor: 'pointer' }}>Features</span>
          <span style={{ cursor: 'pointer' }}>Pricing</span>
          <span style={{ cursor: 'pointer' }}>Blog</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => router.push('/login')}
            style={{ background: 'transparent', border: '1px solid #cbd5e1', color: '#0A2540', padding: '7px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}>
            Login
          </button>
          <button
            onClick={() => router.push('/login')}
            style={{ background: '#1B4FDB', color: '#fff', border: 'none', padding: '7px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
            Get started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '64px 24px 48px', maxWidth: '660px', margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EEF2FF', color: '#1B4FDB', fontSize: '11px', padding: '5px 14px', borderRadius: '20px', marginBottom: '24px', letterSpacing: '0.05em', border: '1px solid #c7d4f8' }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#1B4FDB' }}></div>
          India's #1 Creator Research Tool
        </div>
        <h1 style={{ fontSize: '48px', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-2px', color: '#0A2540', marginBottom: '16px' }}>
          Create content that<br />
          <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#1B4FDB' }}>actually</em> works.
        </h1>
        <p style={{ fontSize: '15px', color: '#4a6080', lineHeight: 1.75, maxWidth: '420px', margin: '0 auto 28px' }}>
          Know your views, competition, and trending topics before you hit record.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
          <button
            onClick={() => router.push('/login')}
            style={{ background: '#1B4FDB', color: '#fff', border: 'none', padding: '13px 30px', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
            Start for free
          </button>
          <button
            style={{ background: 'transparent', border: '1px solid #cbd5e1', color: '#4a6080', padding: '13px 30px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}>
            Watch demo
          </button>
        </div>
        <p style={{ fontSize: '12px', color: '#94a3b8' }}>No credit card required · 3 free searches</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', justifyContent: 'center', borderTop: '1px solid #e8ecf0', borderBottom: '1px solid #e8ecf0', margin: '0 32px' }}>
        {[
          { num: '12,000+', label: 'Active creators' },
          { num: '3 lakh+', label: 'Topics analyzed' },
          { num: '4.9 / 5', label: 'User rating' },
          { num: 'Hindi + EN', label: 'Both supported' },
        ].map((s, i) => (
          <div key={i} style={{ padding: '20px 36px', textAlign: 'center', borderRight: i < 3 ? '1px solid #e8ecf0' : 'none' }}>
            <div style={{ fontSize: '22px', fontWeight: 500, color: '#0A2540' }}>{s.num}</div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '3px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Demo */}
      <div style={{ padding: '32px 24px', maxWidth: '600px', margin: '0 auto' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.07em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '10px' }}>Live preview</p>
        <div style={{ border: '1px solid #e8ecf0', borderRadius: '14px', overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid #e8ecf0', display: 'flex', gap: '8px', background: '#fafbfc' }}>
            <input readOnly value="home workout without equipment" style={{ flex: 1, border: '1px solid #e8ecf0', borderRadius: '8px', padding: '9px 12px', fontSize: '13px', background: '#fff', color: '#0A2540' }} />
            <button style={{ background: '#1B4FDB', color: '#fff', border: 'none', padding: '9px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>Analyze</button>
          </div>
          <div style={{ padding: '10px 16px', borderBottom: '1px solid #e8ecf0', display: 'flex', gap: '6px', background: '#fafbfc', flexWrap: 'wrap' }}>
            {['Fitness', 'Finance', 'Gaming', 'Tech', 'Food'].map((c, i) => (
              <span key={i} style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '20px', border: '1px solid', borderColor: i === 0 ? '#1B4FDB' : '#e8ecf0', background: i === 0 ? '#1B4FDB' : '#fff', color: i === 0 ? '#fff' : '#4a6080', cursor: 'pointer' }}>{c}</span>
            ))}
          </div>
          <div style={{ padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px' }}>
            {[
              { l: 'Demand score', v: '87/100', s: 'High demand', c: '#0A2540' },
              { l: 'Expected views', v: '50K–200K', s: 'First 30 days', c: '#0A2540' },
              { l: 'Competition', v: 'Medium', s: 'Achievable', c: '#f59e0b' },
            ].map((r, i) => (
              <div key={i} style={{ background: '#F8FAFF', borderRadius: '10px', padding: '14px', border: '1px solid #e8ecf0' }}>
                <p style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>{r.l}</p>
                <p style={{ fontSize: '20px', fontWeight: 500, color: r.c }}>{r.v}</p>
                <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '3px' }}>{r.s}</p>
              </div>
            ))}
          </div>
          <div style={{ margin: '0 16px 16px', background: '#F0F5FF', borderRadius: '10px', padding: '12px', border: '1px solid #c7d4f8' }}>
            <p style={{ fontSize: '13px', color: '#0A2540', marginBottom: '4px' }}>💡 No strong Hindi video exists on this topic yet</p>
            <p style={{ fontSize: '13px', color: '#0A2540' }}>💡 Low competition on "beginners" angle in India</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: '40px 24px', maxWidth: '600px', margin: '0 auto' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.07em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '8px' }}>Features</p>
        <h2 style={{ fontSize: '26px', fontWeight: 500, color: '#0A2540', marginBottom: '6px' }}>Everything in one place</h2>
        <p style={{ fontSize: '14px', color: '#4a6080', marginBottom: '20px' }}>All the research a creator needs — before hitting record.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
          {[
            { icon: '📊', title: 'View prediction', desc: 'AI tells you estimated views before you upload.' },
            { icon: '📈', title: 'Trend radar', desc: 'Get early alerts on topics about to go viral.' },
            { icon: '🔍', title: 'Content gaps', desc: 'Discover topics nobody has covered yet.' },
            { icon: '⚔️', title: 'Competition score', desc: 'Easy / Medium / Hard in one second.' },
            { icon: '✍️', title: 'Title ideas', desc: 'High CTR titles tailored to your niche.' },
            { icon: '📅', title: 'Content calendar', desc: 'Auto-generate a 30-day content plan.' },
          ].map((f, i) => (
            <div key={i} style={{ background: '#fff', padding: '18px', borderRadius: '12px', border: '1px solid #e8ecf0' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#EEF2FF', marginBottom: '10px', fontSize: '16px' }}>{f.icon}</div>
              <p style={{ fontSize: '13px', fontWeight: 500, color: '#0A2540', marginBottom: '4px' }}>{f.title}</p>
              <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div style={{ padding: '0 24px 48px', maxWidth: '600px', margin: '0 auto' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.07em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '8px' }}>Pricing</p>
        <h2 style={{ fontSize: '26px', fontWeight: 500, color: '#0A2540', marginBottom: '20px' }}>Simple, honest pricing</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
          {[
            { name: 'Free', price: '₹0', desc: 'To get started', features: ['3 searches/month', 'Basic demand score', 'View estimate'], popular: false },
            { name: 'Creator', price: '₹699', desc: 'For growing creators', features: ['Unlimited searches', 'Full AI analysis', 'Trend alerts', 'Content calendar', 'Hindi + English'], popular: true },
            { name: 'Pro', price: '₹1,499', desc: 'For agencies & pros', features: ['All Creator features', 'Competitor tracking', 'Multiple channels', 'Priority support'], popular: false },
          ].map((p, i) => (
            <div key={i} style={{ background: p.popular ? '#F8FAFF' : '#fff', border: p.popular ? '2px solid #1B4FDB' : '1px solid #e8ecf0', borderRadius: '14px', padding: '20px', position: 'relative' }}>
              {p.popular && (
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#1B4FDB', color: '#fff', fontSize: '11px', padding: '3px 14px', borderRadius: '20px', whiteSpace: 'nowrap', fontWeight: 500 }}>
                  Most popular
                </div>
              )}
              <p style={{ fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '10px' }}>{p.name}</p>
              <p style={{ fontSize: '28px', fontWeight: 500, color: '#0A2540', letterSpacing: '-1px', marginBottom: '4px' }}>
                {p.price} <span style={{ fontSize: '13px', fontWeight: 400, color: '#94a3b8' }}>/month</span>
              </p>
              <p style={{ fontSize: '12px', color: '#4a6080', marginBottom: '14px', paddingBottom: '14px', borderBottom: '1px solid #e8ecf0' }}>{p.desc}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '16px' }}>
                {p.features.map((f, j) => (
                  <li key={j} style={{ fontSize: '12px', color: '#4a6080', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: '#1B4FDB' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => router.push('/login')}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', background: p.popular ? '#1B4FDB' : 'transparent', color: p.popular ? '#fff' : '#0A2540', border: p.popular ? 'none' : '1px solid #cbd5e1' }}>
                {p.name === 'Free' ? 'Try for free' : 'Get started'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: '20px 32px', borderTop: '1px solid #e8ecf0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#1B4FDB' }}></div>
          <span style={{ fontSize: '14px', fontWeight: 500, color: '#0A2540' }}>ContentLens</span>
        </div>
        <div style={{ display: 'flex', gap: '20px', fontSize: '12px', color: '#94a3b8' }}>
          <span>Privacy</span><span>Terms</span><span>Contact</span><span>Twitter</span>
        </div>
      </footer>

    </main>
  );
}