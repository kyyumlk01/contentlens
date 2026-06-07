'use client';
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
      const res = await fetch('http://localhost:5000/api/search', {
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
    <div className="min-h-screen" style={{ backgroundColor: '#C1EBE9' }}>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4"
        style={{ borderBottom: '1px solid #a8d8d6', backgroundColor: '#C1EBE9' }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4F252E' }}></div>
          <span className="font-medium text-sm" style={{ color: '#4F252E' }}>ContentLens</span>
        </div>
        <span className="text-sm" style={{ color: '#4F252E', opacity: 0.6 }}>Dashboard</span>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-medium mb-2" style={{ color: '#4F252E' }}>Research karo</h1>
        <p className="text-sm mb-8" style={{ color: '#4F252E', opacity: 0.6 }}>
          Topic daalo — AI batayega kitne views milenge
        </p>

        {/* Search Bar */}
        <div className="flex gap-2 mb-3">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="Topic type karo... e.g. home workout"
            className="flex-1 px-4 py-3 text-sm rounded-lg focus:outline-none"
            style={{ backgroundColor: '#FFF7C5', border: '1px solid #F4AE52', color: '#4F252E' }}
          />
          <button
            onClick={handleSearch}
            disabled={loading || !query}
            className="px-6 py-3 rounded-lg text-sm font-medium disabled:opacity-50"
            style={{ backgroundColor: '#F4AE52', color: '#4F252E', border: 'none' }}
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className="text-xs px-3 py-1.5 rounded-full transition-all"
              style={{
                backgroundColor: category === cat ? '#4F252E' : '#FFF7C5',
                color: category === cat ? '#FFF7C5' : '#4F252E',
                border: `1px solid ${category === cat ? '#4F252E' : '#F4AE52'}`
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="text-sm px-4 py-3 rounded-lg mb-4"
            style={{ backgroundColor: '#FFF7C5', color: '#4F252E', border: '1px solid #F4AE52' }}>
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-16">
            <div className="text-sm" style={{ color: '#4F252E', opacity: 0.5 }}>AI analyze kar raha hai...</div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-4">

            {/* Score Cards */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Demand Score', value: `${result.demandScore}/100` },
                { label: 'Expected Views', value: `${(result.expectedViewsMin/1000).toFixed(0)}K – ${(result.expectedViewsMax/1000).toFixed(0)}K` },
                { label: 'Competition', value: result.competition,
                  color: result.competition === 'Easy' ? '#2d7a2d' : result.competition === 'Medium' ? '#b87a00' : '#cc0000' }
              ].map((card, i) => (
                <div key={i} className="p-4 rounded-xl"
                  style={{ backgroundColor: '#FFF7C5', border: '1px solid #F4AE52' }}>
                  <p className="text-xs uppercase tracking-wide mb-1" style={{ color: '#4F252E', opacity: 0.5 }}>
                    {card.label}
                  </p>
                  <p className="text-2xl font-medium" style={{ color: card.color || '#4F252E' }}>
                    {card.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Content Gaps */}
            <div className="p-4 rounded-xl" style={{ backgroundColor: '#FFF7C5', border: '1px solid #F4AE52' }}>
              <p className="text-xs uppercase tracking-wide mb-3" style={{ color: '#4F252E', opacity: 0.5 }}>
                Content Gaps 💡
              </p>
              {result.contentGaps.map((gap: string, i: number) => (
                <p key={i} className="text-sm py-1.5" style={{ color: '#4F252E', borderBottom: '1px solid #F4AE5240' }}>
                  • {gap}
                </p>
              ))}
            </div>

            {/* Title Suggestions */}
            <div className="p-4 rounded-xl" style={{ backgroundColor: '#FFF7C5', border: '1px solid #F4AE52' }}>
              <p className="text-xs uppercase tracking-wide mb-3" style={{ color: '#4F252E', opacity: 0.5 }}>
                Title Ideas 🎯
              </p>
              {result.titleSuggestions.map((title: string, i: number) => (
                <p key={i} className="text-sm font-medium py-2" style={{ color: '#4F252E', borderBottom: '1px solid #F4AE5240' }}>
                  {i + 1}. {title}
                </p>
              ))}
            </div>

            {/* Verdict */}
            <div className="p-4 rounded-xl" style={{ backgroundColor: '#4F252E', border: '1px solid #4F252E' }}>
              <p className="text-xs uppercase tracking-wide mb-1" style={{ color: '#F4AE52' }}>
                AI Verdict ✨
              </p>
              <p className="text-sm font-medium" style={{ color: '#FFF7C5' }}>{result.verdict}</p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}