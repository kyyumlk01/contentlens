'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const DAILY_LIMIT = 5;

const CATEGORIES = [
  'Fitness', 'Finance', 'Gaming', 'Comedy', 'Tech', 'Food',
  'Travel', 'Education', 'Fashion', 'Beauty', 'Music', 'Dance',
  'Cooking', 'Vlog', 'Motivation', 'Sports', 'News', 'Anime',
  'Business', 'Astrology', 'Other'
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
  const [language, setLanguage] = useState<'hindi' | 'english'>('hindi');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [searchCount, setSearchCount] = useState(0);
  const router = useRouter();

  const loadingMessages = language === 'hindi'
    ? ['🔍 YouTube pe search kar raha hoon...', '📊 Data analyze ho raha hai...', '🤖 AI soch raha hai...', '✨ Results taiyar ho rahe hain...']
    : ['🔍 Searching YouTube...', '📊 Analyzing data...', '🤖 AI is thinking...', '✨ Preparing results...'];

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') setDark(true);
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push('/login');
      } else {
        setUser(data.session.user);
        setSearchCount(getSearchCount(data.session.user.id));
      }
    });
  }, []);

  const toggleTheme = () => {
    const newDark = !dark;
    setDark(newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const validateInput = () => {
    const finalCategory = category === 'Other' ? customCategory : category;
    if (!language) { setError(language === 'hindi' ? 'Language chuniye.' : 'Please select language.'); return false; }
    if (!finalCategory) { setError(language === 'hindi' ? 'Category chuniye.' : 'Please select a category.'); return false; }
    if (!topic.trim()) { setError(language === 'hindi' ? 'Topic daalo.' : 'Please enter a topic.'); return false; }
    if (topic.trim().length < 3) { setError(language === 'hindi' ? 'Topic thoda aur detail mein likho.' : 'Please write a more descriptive topic.'); return false; }

    // Meaningless input detect
    const meaningless = /^[^a-zA-Z\u0900-\u097F]{0,2}$|^(.)\1{4,}$|^[0-9]+$/.test(topic.trim());
    if (meaningless || topic.trim().length > 100) {
      setError(language === 'hindi'
        ? '🤔 Yeh topic samajh nahi aaya. Kuch aisa likho jaise: "home workout for beginners" ya "ghar pe pizza banana"'
        : '🤔 This topic doesn\'t make sense. Try something like: "home workout for beginners" or "budget travel tips"');
      return false;
    }
    return true;
  };

  const handleGenerate = async () => {
    setError('');
    setResult(null);
    if (!validateInput()) return;

    if (searchCount >= DAILY_LIMIT) {
      setError(language === 'hindi'
        ? `⚠️ Aaj ki limit (${DAILY_LIMIT} searches) khatam ho gayi! Kal phir aao ya Pro upgrade karo 🚀`
        : `⚠️ Daily limit of ${DAILY_LIMIT} searches reached! Come back tomorrow or upgrade to Pro 🚀`);
      return;
    }

    setLoading(true);
    let msgIndex = 0;
    setLoadingMsg(loadingMessages[0]);
    const interval = setInterval(() => {
      msgIndex = (msgIndex + 1) % loadingMessages.length;
      setLoadingMsg(loadingMessages[msgIndex]);
    }, 1500);

    try {
      const finalCategory = category === 'Other' ? customCategory : category;
      const res = await fetch('https://contentlens-production-a2e5.up.railway.app/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: topic, category: finalCategory, language })
      });
      const data = await res.json();
      if (data.error) {
        setError(language === 'hindi' ? 'Kuch galat hua. Dobara try karo.' : 'Something went wrong. Please try again.');
      } else {
        setResult(data.data);
        incrementSearchCount(user.id);
        setSearchCount(prev => prev + 1);
      }
    } catch {
      setError(language === 'hindi' ? 'Backend se connect nahi ho pa raha.' : 'Could not connect to server.');
    } finally {
      clearInterval(interval);
      setLoading(false);
      setLoadingMsg('');
    }
  };

  const bg = dark ? '#111' : '#fff';
  const text = dark ? '#f0f0f0' : '#0A2540';
  const sub = dark ? '#aaa' : '#64748b';
  const border = dark ? '#2a2a2a' : '#e0e4ea';
  const cardBg = dark ? '#1a1a1a' : '#F8FAFF';
  const inputBg = dark ? '#111' : '#fafbfc';
  const inputBorder = dark ? '#333' : '#e0e4ea';
  const btnOutlineBg = dark ? '#1e1e1e' : '#f8f9fa';
  const btnOutlineColor = dark ? '#f0f0f0' : '#0A2540';
  const btnOutlineBorder = dark ? '#444' : '#ccc';

  const remaining = DAILY_LIMIT - searchCount;

  return (
    <div style={{ minHeight: '100vh', background: bg, color: text, fontFamily: 'system-ui, sans-serif', transition: 'background 0.2s' }}>

      {/* Navbar */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 32px', borderBottom: `0.5px solid ${border}`, background: bg, position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => router.push('/')}>
          <div style={{ width: 28, height: 28, background: '#1B4FDB', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>🤖</div>
          <span style={{ fontWeight: 500, fontSize: 15 }}>Vicobot</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Search limit indicator */}
          <div style={{ fontSize: 13, color: remaining <= 1 ? '#dc2626' : sub, background: remaining <= 1 ? '#fee2e2' : cardBg, padding: '5px 12px', borderRadius: 20, border: `0.5px solid ${remaining <= 1 ? '#fca5a5' : border}` }}>
            {remaining <= 0 ? '⚠️ Limit khatam' : `🔍 ${remaining}/${DAILY_LIMIT} searches left`}
          </div>
          <button onClick={toggleTheme} style={{ width: 34, height: 34, borderRadius: 8, border: `0.5px solid ${btnOutlineBorder}`, background: btnOutlineBg, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {dark ? '☀️' : '🌙'}
          </button>
          <span style={{ fontSize: 13, color: sub }}>
            {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
          </span>
          <button onClick={handleLogout} style={{ fontSize: 13, color: sub, background: 'none', border: 'none', cursor: 'pointer', padding: '6px 12px', borderRadius: 6, border: `0.5px solid ${border}` }}>
            Logout
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px' }}>

        <h1 style={{ fontSize: 28, fontWeight: 500, color: text, marginBottom: 6, letterSpacing: '-0.5px' }}>
          {language === 'hindi' ? '🎯 Topic Research karo' : '🎯 Research your Topic'}
        </h1>
        <p style={{ fontSize: 14, color: sub, marginBottom: 32 }}>
          {language === 'hindi'
            ? 'AI batayega kitne views milenge, competition kaisa hai, aur kaun se titles click karwate hain.'
            : 'AI will tell you expected views, competition level, and titles that get clicks.'}
        </p>

        {/* Step 1 - Language */}
        <div style={{ background: cardBg, border: `0.5px solid ${border}`, borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: '#1B4FDB', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
            Step 1 · Language chuniye *
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            {(['hindi', 'english'] as const).map(lang => (
              <button key={lang} onClick={() => setLanguage(lang)} style={{ flex: 1, padding: '12px', borderRadius: 8, border: `1.5px solid ${language === lang ? '#1B4FDB' : inputBorder}`, background: language === lang ? '#1B4FDB' : inputBg, color: language === lang ? '#fff' : text, fontWeight: 500, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s' }}>
                {lang === 'hindi' ? '🇮🇳 Hindi' : '🇬🇧 English'}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 - Category */}
        <div style={{ background: cardBg, border: `0.5px solid ${border}`, borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: '#1B4FDB', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
            Step 2 · {language === 'hindi' ? 'Category chuniye *' : 'Select Category *'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} style={{ padding: '7px 16px', borderRadius: 20, border: `1.5px solid ${category === cat ? '#1B4FDB' : inputBorder}`, background: category === cat ? '#1B4FDB' : inputBg, color: category === cat ? '#fff' : text, fontSize: 13, fontWeight: category === cat ? 500 : 400, cursor: 'pointer', transition: 'all 0.2s' }}>
                {cat}
              </button>
            ))}
          </div>
          {category === 'Other' && (
            <input
              placeholder={language === 'hindi' ? 'Apni category likho...' : 'Write your category...'}
              value={customCategory}
              onChange={e => setCustomCategory(e.target.value)}
              style={{ marginTop: 12, width: '100%', border: `1px solid ${inputBorder}`, borderRadius: 8, padding: '10px 14px', fontSize: 14, color: text, background: inputBg, outline: 'none', boxSizing: 'border-box' }}
              onFocus={e => e.target.style.borderColor = '#1B4FDB'}
              onBlur={e => e.target.style.borderColor = inputBorder}
            />
          )}
        </div>

        {/* Step 3 - Topic */}
        <div style={{ background: cardBg, border: `0.5px solid ${border}`, borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: '#1B4FDB', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
            Step 3 · {language === 'hindi' ? 'Apna topic daalo *' : 'Enter your topic *'}
          </p>
          <input
            placeholder={language === 'hindi' ? 'Jaise: ghar pe pizza banana, beginner workout...' : 'e.g. home workout for beginners, budget travel tips...'}
            value={topic}
            onChange={e => setTopic(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleGenerate()}
            style={{ width: '100%', border: `1px solid ${inputBorder}`, borderRadius: 8, padding: '12px 16px', fontSize: 14, color: text, background: inputBg, outline: 'none', boxSizing: 'border-box' }}
            onFocus={e => e.target.style.borderColor = '#1B4FDB'}
            onBlur={e => e.target.style.borderColor = inputBorder}
          />
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: dark ? '#2a1a1a' : '#FFF0F0', color: '#cc0000', fontSize: 14, padding: '12px 16px', borderRadius: 10, marginBottom: 16, border: '1px solid #fca5a5' }}>
            {error}
          </div>
        )}

        {/* Generate Button */}
        <button onClick={handleGenerate} disabled={loading || remaining <= 0} style={{ width: '100%', background: loading || remaining <= 0 ? '#6b8fe8' : '#1B4FDB', color: '#fff', border: 'none', padding: '14px', borderRadius: 10, fontSize: 15, fontWeight: 500, cursor: loading || remaining <= 0 ? 'not-allowed' : 'pointer', marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'background 0.2s' }}>
          {loading ? (
            <>
              <span style={{ display: 'inline-block', width: 18, height: 18, border: '2px solid #fff', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              {loadingMsg}
            </>
          ) : remaining <= 0 ? '⚠️ Aaj ki limit khatam' : '✨ Generate Analysis'}
        </button>

        {/* Loading Animation */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '32px 0', marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 16 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 10, height: 10, background: '#1B4FDB', borderRadius: '50%', animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
              ))}
            </div>
            <p style={{ color: sub, fontSize: 14 }}>{loadingMsg}</p>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Score Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {[
                {
                  label: language === 'hindi' ? 'Demand Score' : 'Demand Score',
                  value: `${result.demandScore}/100`,
                  sub: language === 'hindi' ? '100 mein se' : 'Out of 100',
                  color: result.demandScore >= 70 ? '#16a34a' : result.demandScore >= 40 ? '#f59e0b' : '#dc2626',
                  bg: result.demandScore >= 70 ? '#dcfce7' : result.demandScore >= 40 ? '#fef3c7' : '#fee2e2',
                },
                {
                  label: language === 'hindi' ? 'Expected Views' : 'Expected Views',
                  value: `${(result.expectedViewsMin / 1000).toFixed(0)}K–${(result.expectedViewsMax / 1000).toFixed(0)}K`,
                  sub: language === 'hindi' ? 'Pehle 30 din mein' : 'First 30 days',
                  color: '#1B4FDB',
                  bg: dark ? '#0c1a3a' : '#dbeafe',
                },
                {
                  label: language === 'hindi' ? 'Competition' : 'Competition',
                  value: result.competition,
                  sub: language === 'hindi' ? 'Difficulty level' : 'Difficulty level',
                  color: result.competition === 'Easy' ? '#16a34a' : result.competition === 'Medium' ? '#f59e0b' : '#dc2626',
                  bg: result.competition === 'Easy' ? '#dcfce7' : result.competition === 'Medium' ? '#fef3c7' : '#fee2e2',
                },
              ].map((c, i) => (
                <div key={i} style={{ background: dark ? '#1a1a1a' : c.bg, borderRadius: 12, padding: 16, border: `0.5px solid ${border}`, textAlign: 'center' }}>
                  <p style={{ fontSize: 11, color: sub, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>{c.label}</p>
                  <p style={{ fontSize: 22, fontWeight: 600, color: dark ? '#f0f0f0' : c.color }}>{c.value}</p>
                  <p style={{ fontSize: 11, color: sub, marginTop: 4 }}>{c.sub}</p>
                </div>
              ))}
            </div>

            {/* Demand Explanation */}
            {result.demandExplanation && (
              <div style={{ background: dark ? '#1a1a1a' : '#f0f9ff', border: `0.5px solid ${dark ? '#2a2a2a' : '#bae6fd'}`, borderRadius: 12, padding: 16 }}>
                <p style={{ fontSize: 11, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8, fontWeight: 500 }}>
                  📊 {language === 'hindi' ? 'Analysis' : 'Analysis'}
                </p>
                <p style={{ fontSize: 14, color: text, lineHeight: 1.6 }}>{result.demandExplanation}</p>
              </div>
            )}

            {/* Content Gaps */}
            <div style={{ background: dark ? '#1a1a1a' : '#f0f5ff', borderRadius: 12, padding: 16, border: `0.5px solid ${dark ? '#2a3a5a' : '#c7d4f8'}` }}>
              <p style={{ fontSize: 11, color: '#1B4FDB', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12, fontWeight: 500 }}>
                💡 {language === 'hindi' ? 'Content Gaps' : 'Content Gaps'}
              </p>
              {result.contentGaps?.map((gap: string, i: number) => (
                <p key={i} style={{ fontSize: 14, color: text, padding: '8px 0', borderBottom: i < result.contentGaps.length - 1 ? `1px solid ${dark ? '#2a2a2a' : '#c7d4f840'}` : 'none', lineHeight: 1.5 }}>
                  • {gap}
                </p>
              ))}
            </div>

            {/* Title Suggestions */}
            <div style={{ background: dark ? '#1a1a1a' : '#fff', borderRadius: 12, padding: 16, border: `0.5px solid ${border}` }}>
              <p style={{ fontSize: 11, color: sub, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12, fontWeight: 500 }}>
                🎯 {language === 'hindi' ? 'Title Ideas' : 'Title Ideas'}
              </p>
              {result.titleSuggestions?.map((title: string, i: number) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < result.titleSuggestions.length - 1 ? `1px solid ${border}` : 'none' }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: text, lineHeight: 1.4 }}>
                    {i + 1}. {title}
                  </p>
                  <button onClick={() => navigator.clipboard.writeText(title)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, padding: '0 0 0 8px', flexShrink: 0 }} title="Copy">
                    📋
                  </button>
                </div>
              ))}
            </div>

            {/* AI Verdict */}
            <div style={{ background: '#1B4FDB', borderRadius: 12, padding: 16 }}>
              <p style={{ fontSize: 11, color: '#88BDF2', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6, fontWeight: 500 }}>
                ✨ {language === 'hindi' ? 'AI Verdict' : 'AI Verdict'}
              </p>
              <p style={{ fontSize: 14, fontWeight: 500, color: '#fff', lineHeight: 1.6 }}>{result.verdict}</p>
            </div>

            {/* Pro Upgrade Banner */}
            <div style={{ background: dark ? '#1a1a1a' : '#f8faff', border: `1px dashed #1B4FDB`, borderRadius: 12, padding: 16, textAlign: 'center' }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: text, marginBottom: 4 }}>
                🚀 {language === 'hindi' ? 'Aur features chahiye?' : 'Want more features?'}
              </p>
              <p style={{ fontSize: 13, color: sub, marginBottom: 12 }}>
                {language === 'hindi'
                  ? 'Pro plan mein milega: Video schedule, Editing tips, Channel analysis, Thumbnail ideas aur bahut kuch!'
                  : 'Pro plan includes: Video schedule, Editing tips, Channel analysis, Thumbnail ideas and more!'}
              </p>
              <button disabled style={{ background: '#1B4FDB', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'not-allowed', opacity: 0.8 }}>
                Coming Soon — ₹299/month
              </button>
            </div>

          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-12px); }
        }
      `}</style>

    </div>
  );
}
