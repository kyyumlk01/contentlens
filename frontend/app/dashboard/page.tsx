'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Toast, useToast } from '@/components/Toast';
import { ProgressBar } from '@/components/ProgressBar';

const DAILY_LIMIT = 5;

const CATEGORIES = [
  'Fitness', 'Finance', 'Gaming', 'Comedy', 'Tech', 'Food',
  'Travel', 'Education', 'Fashion', 'Beauty', 'Music', 'Dance',
  'Cooking', 'Vlog', 'Motivation', 'Sports', 'News', 'Anime',
  'Business', 'Astrology', 'Other'
];

const LANGUAGES = [
  { value: 'english', label: '🇬🇧 English' },
  { value: 'hindi', label: '🇮🇳 Hindi (Hinglish)' },
];

function getTodayKey(userId: string) {
  const today = new Date().toISOString().split('T')[0];
  return `vicobot_searches_${userId}_${today}`;
}

function getSearchCount(userId: string): number {
  if (typeof window === 'undefined') return 0;
  return parseInt(localStorage.getItem(getTodayKey(userId)) || '0');
}

function incrementSearchCount(userId: string) {
  const key = getTodayKey(userId);
  const current = getSearchCount(userId);
  localStorage.setItem(key, String(current + 1));
}

export default function Dashboard() {
  const [dark, setDark] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [language, setLanguage] = useState('english');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [searchCount, setSearchCount] = useState(0);
  const [copied, setCopied] = useState<number | null>(null);
  const router = useRouter();

  const loadingSteps = [
    { icon: '🔍', text: 'Searching YouTube data...' },
    { icon: '📊', text: 'Analyzing competition...' },
    { icon: '🤖', text: 'AI is thinking...' },
    { icon: '✨', text: 'Preparing your results...' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') setDark(true);
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.push('/login');
      else {
        setUser(data.session.user);
        setSearchCount(getSearchCount(data.session.user.id));
      }
    });
  }, []);

  useEffect(() => {
    let interval: any;
    if (loading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep(prev => (prev + 1) % loadingSteps.length);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const toggleTheme = () => {
    const newDark = !dark;
    setDark(newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const copyTitle = (title: string, i: number) => {
    navigator.clipboard.writeText(title);
    setCopied(i);
    setTimeout(() => setCopied(null), 2000);
  };

  const validateInput = () => {
    const finalCategory = category === 'Other' ? customCategory : category;
    if (!language) { setError('Please select a language.'); return false; }
    if (!finalCategory) { setError('Please select a category.'); return false; }
    if (!topic.trim()) { setError('Please enter a topic.'); return false; }
    if (topic.trim().length < 3) { setError('Please write a more descriptive topic.'); return false; }
    const meaningless = /^[^a-zA-Z\u0900-\u097F]{0,2}$|^(.)\1{4,}$|^[0-9]+$/.test(topic.trim());
    if (meaningless || topic.trim().length > 150) {
      setError("This topic doesn't make sense. Try something like: 'home workout for beginners' or 'budget travel tips'");
      return false;
    }
    return true;
  };

  const handleGenerate = async () => {
    setError('');
    setResult(null);
    if (!validateInput()) return;
    if (searchCount >= DAILY_LIMIT) {
      setError(`Daily limit of ${DAILY_LIMIT} searches reached! Come back tomorrow or upgrade to Pro 🚀`);
      return;
    }
    setLoading(true);
    try {
      const finalCategory = category === 'Other' ? customCategory : category;
      const res = await fetch('https://contentlens-production-a2e5.up.railway.app/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: topic, category: finalCategory, language })
      });
      const data = await res.json();
      if (data.error) {
        setError('Something went wrong. Please try again.');
      } else {
        setResult(data.data);
        incrementSearchCount(user.id);
        setSearchCount(prev => prev + 1);
      }
    } catch {
      setError('Could not connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const bg = dark ? '#111' : '#fff';
  const text = dark ? '#f0f0f0' : '#0A2540';
  const sub = dark ? '#aaa' : '#64748b';
  const border = dark ? '#2a2a2a' : '#e0e4ea';
  const cardBg = dark ? '#1a1a1a' : '#F8FAFF';
  const inputBg = dark ? '#1a1a1a' : '#fff';
  const inputBorder = dark ? '#333' : '#e0e4ea';
  const btnOutlineBg = dark ? '#1e1e1e' : '#f8f9fa';
  const btnOutlineColor = dark ? '#f0f0f0' : '#0A2540';
  const btnOutlineBorder = dark ? '#444' : '#ccc';
  const remaining = DAILY_LIMIT - searchCount;

  const selectStyle: React.CSSProperties = {
    width: '100%',
    border: `1px solid ${inputBorder}`,
    borderRadius: 8,
    padding: '11px 14px',
    fontSize: 14,
    color: text,
    background: inputBg,
    outline: 'none',
    cursor: 'pointer',
    appearance: 'none',
    WebkitAppearance: 'none',
  };

  return (
    <div style={{ minHeight: '100vh', background: bg, color: text, fontFamily: 'system-ui, sans-serif', transition: 'background 0.2s' }}>
      <style>{`
        * { box-sizing: border-box; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes bounce { 0%,80%,100% { transform: translateY(0); } 40% { transform: translateY(-10px); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        .result-card { animation: fadeIn 0.4s ease; }
        .score-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; }
        @media (max-width: 600px) {
          .score-grid { grid-template-columns: 1fr !important; }
          .nav-user { display: none !important; }
        }
      `}</style>

      {/* Navbar */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderBottom: `0.5px solid ${border}`, background: bg, position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => router.push('/')}>
          <div style={{ width: 28, height: 28, background: '#1B4FDB', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>🤖</div>
          <span style={{ fontWeight: 500, fontSize: 15 }}>Vicobot</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 12, color: remaining <= 1 ? '#dc2626' : sub, background: remaining <= 1 ? '#fee2e2' : cardBg, padding: '4px 10px', borderRadius: 20, border: `0.5px solid ${remaining <= 1 ? '#fca5a5' : border}`, whiteSpace: 'nowrap' }}>
            {remaining <= 0 ? '⚠️ Limit reached' : `🔍 ${remaining}/${DAILY_LIMIT} left`}
          </div>
          <button onClick={toggleTheme} style={{ width: 32, height: 32, borderRadius: 8, border: `0.5px solid ${btnOutlineBorder}`, background: btnOutlineBg, cursor: 'pointer', fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {dark ? '☀️' : '🌙'}
          </button>
          <span className="nav-user" style={{ fontSize: 13, color: sub }}>
            {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
          </span>
          <button onClick={handleLogout} style={{ fontSize: 13, color: sub, background: 'none', border: `0.5px solid ${border}`, cursor: 'pointer', padding: '5px 12px', borderRadius: 6 }}>
            Logout
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 16px' }}>

        <h1 style={{ fontSize: 24, fontWeight: 500, color: text, marginBottom: 4, letterSpacing: '-0.5px' }}>
          🎯 Research your Topic
        </h1>
        <p style={{ fontSize: 14, color: sub, marginBottom: 28 }}>
          AI will tell you expected views, competition level, and titles that get clicks.
        </p>

        {/* Step 1 - Language Dropdown */}
        <div style={{ background: cardBg, border: `0.5px solid ${border}`, borderRadius: 12, padding: 18, marginBottom: 14 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#1B4FDB', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
            Step 1 · Select Language *
          </p>
          <div style={{ position: 'relative' }}>
            <select value={language} onChange={e => setLanguage(e.target.value)} style={selectStyle}>
              {LANGUAGES.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
            <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: sub }}>▾</span>
          </div>
        </div>

        {/* Step 2 - Category Dropdown */}
        <div style={{ background: cardBg, border: `0.5px solid ${border}`, borderRadius: 12, padding: 18, marginBottom: 14 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#1B4FDB', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
            Step 2 · Select Category *
          </p>
          <div style={{ position: 'relative' }}>
            <select value={category} onChange={e => setCategory(e.target.value)} style={selectStyle}>
              <option value="">-- Select a category --</option>
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: sub }}>▾</span>
          </div>
          {category === 'Other' && (
            <input
              placeholder="Write your category..."
              value={customCategory}
              onChange={e => setCustomCategory(e.target.value)}
              style={{ marginTop: 10, width: '100%', border: `1px solid ${inputBorder}`, borderRadius: 8, padding: '10px 14px', fontSize: 14, color: text, background: inputBg, outline: 'none' }}
            />
          )}
        </div>

        {/* Step 3 - Topic */}
        <div style={{ background: cardBg, border: `0.5px solid ${border}`, borderRadius: 12, padding: 18, marginBottom: 18 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#1B4FDB', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
            Step 3 · Enter your Topic *
          </p>
          <input
            placeholder="e.g. home workout for beginners, budget travel tips..."
            value={topic}
            onChange={e => setTopic(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleGenerate()}
            style={{ width: '100%', border: `1px solid ${inputBorder}`, borderRadius: 8, padding: '12px 14px', fontSize: 14, color: text, background: inputBg, outline: 'none' }}
          />
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: dark ? '#2a1a1a' : '#FFF0F0', color: '#dc2626', fontSize: 14, padding: '12px 16px', borderRadius: 10, marginBottom: 14, border: '1px solid #fca5a5', animation: 'fadeIn 0.3s ease' }}>
            ❌ {error}
          </div>
        )}

        {/* Generate Button */}
        <button onClick={handleGenerate} disabled={loading || remaining <= 0} style={{ width: '100%', background: loading || remaining <= 0 ? '#93a5e8' : '#1B4FDB', color: '#fff', border: 'none', padding: '14px', borderRadius: 10, fontSize: 15, fontWeight: 500, cursor: loading || remaining <= 0 ? 'not-allowed' : 'pointer', marginBottom: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'background 0.2s' }}>
          {loading ? (
            <>
              <span style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
              {loadingSteps[loadingStep].text}
            </>
          ) : remaining <= 0 ? '⚠️ Daily limit reached' : '✨ Generate Analysis'}
        </button>

        {/* Loading Animation */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '24px 0', marginBottom: 24, animation: 'fadeIn 0.3s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 10, height: 10, background: '#1B4FDB', borderRadius: '50%', animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 300, margin: '0 auto' }}>
              {loadingSteps.map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderRadius: 8, background: i === loadingStep ? (dark ? '#1e2a4a' : '#dbeafe') : 'transparent', transition: 'background 0.3s', animation: i === loadingStep ? 'pulse 1.5s ease infinite' : 'none' }}>
                  <span style={{ fontSize: 18 }}>{step.icon}</span>
                  <span style={{ fontSize: 13, color: i === loadingStep ? '#1B4FDB' : sub, fontWeight: i === loadingStep ? 500 : 400 }}>{step.text}</span>
                  {i < loadingStep && <span style={{ marginLeft: 'auto', color: '#16a34a', fontSize: 14 }}>✓</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }} className="result-card">

            {/* Score Cards */}
            <div className="score-grid">
              {[
                { label: 'Demand Score', value: `${result.demandScore}/100`, sub: 'Out of 100', color: result.demandScore >= 70 ? '#16a34a' : result.demandScore >= 40 ? '#f59e0b' : '#dc2626', bg: result.demandScore >= 70 ? '#dcfce7' : result.demandScore >= 40 ? '#fef3c7' : '#fee2e2' },
                { label: 'Expected Views', value: `${(result.expectedViewsMin/1000).toFixed(0)}K–${(result.expectedViewsMax/1000).toFixed(0)}K`, sub: 'First 30 days', color: '#1B4FDB', bg: '#dbeafe' },
                { label: 'Competition', value: result.competition, sub: 'Difficulty level', color: result.competition === 'Easy' ? '#16a34a' : result.competition === 'Medium' ? '#f59e0b' : '#dc2626', bg: result.competition === 'Easy' ? '#dcfce7' : result.competition === 'Medium' ? '#fef3c7' : '#fee2e2' },
              ].map((c, i) => (
                <div key={i} style={{ background: dark ? '#1a1a1a' : c.bg, borderRadius: 12, padding: 16, border: `0.5px solid ${border}`, textAlign: 'center' }}>
                  <p style={{ fontSize: 11, color: sub, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>{c.label}</p>
                  <p style={{ fontSize: 22, fontWeight: 600, color: dark ? '#f0f0f0' : c.color }}>{c.value}</p>
                  <p style={{ fontSize: 11, color: sub, marginTop: 4 }}>{c.sub}</p>
                </div>
              ))}
            </div>

            {/* Analysis */}
            {result.demandExplanation && (
              <div style={{ background: dark ? '#1a1a1a' : '#f0f9ff', border: `0.5px solid ${dark ? '#2a2a2a' : '#bae6fd'}`, borderRadius: 12, padding: 16 }}>
                <p style={{ fontSize: 11, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8, fontWeight: 600 }}>📊 Analysis</p>
                <p style={{ fontSize: 14, color: text, lineHeight: 1.6 }}>{result.demandExplanation}</p>
              </div>
            )}

            {/* Content Gaps */}
            <div style={{ background: dark ? '#1a1a1a' : '#f0f5ff', borderRadius: 12, padding: 16, border: `0.5px solid ${dark ? '#2a3a5a' : '#c7d4f8'}` }}>
              <p style={{ fontSize: 11, color: '#1B4FDB', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12, fontWeight: 600 }}>💡 Content Gaps</p>
              {result.contentGaps?.map((gap: string, i: number) => (
                <p key={i} style={{ fontSize: 14, color: text, padding: '8px 0', borderBottom: i < result.contentGaps.length - 1 ? `1px solid ${dark ? '#2a2a2a' : '#c7d4f840'}` : 'none', lineHeight: 1.5 }}>• {gap}</p>
              ))}
            </div>

            {/* Title Suggestions */}
            <div style={{ background: dark ? '#1a1a1a' : '#fff', borderRadius: 12, padding: 16, border: `0.5px solid ${border}` }}>
              <p style={{ fontSize: 11, color: sub, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12, fontWeight: 600 }}>🎯 Title Ideas</p>
              {result.titleSuggestions?.map((title: string, i: number) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, padding: '10px 0', borderBottom: i < result.titleSuggestions.length - 1 ? `1px solid ${border}` : 'none' }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: text, lineHeight: 1.4 }}>{i + 1}. {title}</p>
                  <button onClick={() => copyTitle(title, i)} style={{ background: copied === i ? '#dcfce7' : (dark ? '#2a2a2a' : '#f1f5f9'), border: 'none', borderRadius: 6, padding: '4px 8px', cursor: 'pointer', fontSize: 12, color: copied === i ? '#16a34a' : sub, whiteSpace: 'nowrap', flexShrink: 0, transition: 'all 0.2s' }}>
                    {copied === i ? '✓ Copied' : '📋 Copy'}
                  </button>
                </div>
              ))}
            </div>

            {/* Verdict */}
            <div style={{ background: '#1B4FDB', borderRadius: 12, padding: 16 }}>
              <p style={{ fontSize: 11, color: '#88BDF2', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6, fontWeight: 600 }}>✨ AI Verdict</p>
              <p style={{ fontSize: 14, fontWeight: 500, color: '#fff', lineHeight: 1.6 }}>{result.verdict}</p>
            </div>

            {/* Pro Banner */}
            <div style={{ background: dark ? '#1a1a1a' : '#f8faff', border: `1.5px dashed #1B4FDB`, borderRadius: 12, padding: 16, textAlign: 'center' }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: text, marginBottom: 4 }}>🚀 Want more features?</p>
              <p style={{ fontSize: 13, color: sub, marginBottom: 12 }}>Pro plan includes: Video schedule, Editing tips, Channel analysis, Thumbnail ideas and more!</p>
              <button disabled style={{ background: '#1B4FDB', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'not-allowed', opacity: 0.8 }}>
                Coming Soon — ₹299/month
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
