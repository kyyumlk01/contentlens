'use client';
import Image from 'next/image';
import { useState } from 'react';

const CATEGORIES = ['Fitness', 'Finance', 'Gaming', 'Comedy', 'Tech', 'Food', 'Travel', 'Education'];

export default function Dashboard() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Fitness');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  async function handleSearch() {
    if (!query) return;
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await fetch(`https://contentlens-production-a2e5.up.railway.app/api/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, category })
      });
      const data = await res.json();
      if (data.error) { setError(data.error); return; }
      setResult(data.data);
    } catch {
      setError('Backend se connect nahi ho pa raha.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>

      {/* Navbar */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 32px', borderBottom: '1px solid #e8ecf0', backgroundColor: '#fff', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Image src="/logo.png" alt="ContentLens" width={28} height={28} />
          <span style={{ fontWeight: 500, fontSize: '15px', color: '#0A2540' }}>ContentLens</span>
        </div>
        <span style={{ fontSize: '13px', color: '#94a3b8' }}>Dashboard</span>
      </nav>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '48px 24px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 500, color: '#0A2540', marginBottom: '6px', letterSpacing: '-1px' }}>Research</h1>
        <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '28px' }}>Enter a topic — AI will tell you how many views you can get</p>

        {/* Search */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="Enter topic... e.g. home workout"
            style={{ flex: 1, border: '1px solid #e8ecf0', borderRadius: '10px', padding: '12px 16px', fontSize: '14px', color: '#0A2540', outline: 'none', background: '#fafbfc' }}
          />
          <button
            onClick={handleSearch}
            disabled={loading || !query}
            style={{ background: '#1B4FDB', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', opacity: loading || !query ? 0.5 : 1 }}
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              style={{ fontSize: '12px', padding: '5px 14px', borderRadius: '20px', border: '1px solid', borderColor: category === cat ? '#1B4FDB' : '#e8ecf0', background: category === cat ? '#1B4FDB' : '#fff', color: category === cat ? '#fff' : '#4a6080', cursor: 'pointer', fontWeight: category === cat ? 500 : 400 }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: '#FFF0F0', color: '#cc0000', fontSize: '14px', padding: '12px 16px', borderRadius: '10px', marginBottom: '16px', border: '1px solid #fcc' }}>
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>AI is analyzing your topic...</p>
            <p style={{ color: '#cbd5e1', fontSize: '12px', marginTop: '4px' }}>This takes a few seconds</p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Score Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
              {[
                { label: 'Demand Score', value: `${result.demandScore}/100`, sub: 'Out of 100', color: '#0A2540' },
                { label: 'Expected Views', value: `${(result.expectedViewsMin/1000).toFixed(0)}K – ${(result.expectedViewsMax/1000).toFixed(0)}K`, sub: 'First 30 days', color: '#0A2540' },
                { label: 'Competition', value: result.competition, sub: 'Difficulty level', color: result.competition === 'Easy' ? '#16a34a' : result.competition === 'Medium' ? '#f59e0b' : '#dc2626' },
              ].map((c, i) => (
                <div key={i} style={{ background: '#F8FAFF', borderRadius: '12px', padding: '16px', border: '1px solid #e8ecf0' }}>
                  <p style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>{c.label}</p>
                  <p style={{ fontSize: '22px', fontWeight: 500, color: c.color }}>{c.value}</p>
                  <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>{c.sub}</p>
                </div>
              ))}
            </div>

            {/* Content Gaps */}
            <div style={{ background: '#F0F5FF', borderRadius: '12px', padding: '16px', border: '1px solid #c7d4f8' }}>
              <p style={{ fontSize: '11px', color: '#1B4FDB', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', fontWeight: 500 }}>Content Gaps 💡</p>
              {result.contentGaps.map((gap: string, i: number) => (
                <p key={i} style={{ fontSize: '14px', color: '#0A2540', padding: '8px 0', borderBottom: i < result.contentGaps.length - 1 ? '1px solid #c7d4f840' : 'none' }}>• {gap}</p>
              ))}
            </div>

            {/* Title Suggestions */}
            <div style={{ background: '#fff', borderRadius: '12px', padding: '16px', border: '1px solid #e8ecf0' }}>
              <p style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', fontWeight: 500 }}>Title Ideas 🎯</p>
              {result.titleSuggestions.map((title: string, i: number) => (
                <p key={i} style={{ fontSize: '14px', fontWeight: 500, color: '#0A2540', padding: '10px 0', borderBottom: i < result.titleSuggestions.length - 1 ? '1px solid #e8ecf0' : 'none' }}>
                  {i + 1}. {title}
                </p>
              ))}
            </div>

            {/* Verdict */}
            <div style={{ background: '#1B4FDB', borderRadius: '12px', padding: '16px' }}>
              <p style={{ fontSize: '11px', color: '#88BDF2', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', fontWeight: 500 }}>AI Verdict ✨</p>
              <p style={{ fontSize: '14px', fontWeight: 500, color: '#fff' }}>{result.verdict}</p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
