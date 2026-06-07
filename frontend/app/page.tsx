export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#C1EBE9' }}>
      
      {/* Navbar */}
      <nav style={{ backgroundColor: '#C1EBE9', borderBottom: '1px solid #a8d8d6' }}
        className="fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4F252E' }}></div>
          <span className="font-medium text-sm" style={{ color: '#4F252E' }}>ContentLens</span>
        </div>
        <div className="flex gap-3">
          <button style={{ color: '#4F252E', border: '1px solid #4F252E' }}
            className="text-sm px-4 py-2 rounded-lg">
            Login
          </button>
          <button style={{ backgroundColor: '#F4AE52', color: '#4F252E', border: 'none' }}
            className="text-sm px-4 py-2 rounded-lg font-medium">
            Get started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto px-6 pt-36 pb-16">
        <div className="inline-flex items-center gap-2 text-xs px-4 py-1.5 rounded-full mb-8"
          style={{ backgroundColor: '#FFF7C5', color: '#4F252E', border: '1px solid #F4AE52' }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#F4AE52' }}></div>
          India ka #1 Creator Research Tool
        </div>

        <h1 className="text-5xl font-medium leading-tight tracking-tight mb-5"
          style={{ color: '#4F252E' }}>
          Create content that <br />
          <em className="font-normal italic" style={{ color: '#F4AE52' }}>actually</em> works.
        </h1>

        <p className="text-base leading-relaxed mb-8 max-w-md mx-auto"
          style={{ color: '#4F252E', opacity: 0.7 }}>
          Video banane se pehle janlo — kitne views milenge,
          competition kaisi hai, aur konsa topic trend karne wala hai.
        </p>

        <div className="flex items-center justify-center gap-3 mb-4">
          <button style={{ backgroundColor: '#4F252E', color: '#FFF7C5' }}
            className="px-7 py-3 rounded-lg text-sm font-medium">
            Free mein shuru karo
          </button>
          <button style={{ backgroundColor: '#FFF7C5', color: '#4F252E', border: '1px solid #F4AE52' }}
            className="px-7 py-3 rounded-lg text-sm">
            Demo dekho
          </button>
        </div>
        <p className="text-xs" style={{ color: '#4F252E', opacity: 0.5 }}>
          Credit card nahi chahiye · 3 searches free
        </p>
      </div>

      {/* Stats */}
      <div className="flex justify-center mx-6 mb-16">
        <div className="flex rounded-2xl overflow-hidden" style={{ border: '1px solid #a8d8d6' }}>
          {[
            { num: '12,000+', label: 'Active creators' },
            { num: '3 lakh+', label: 'Topics analyzed' },
            { num: '4.9 / 5', label: 'User rating' },
            { num: 'Hindi + EN', label: 'Both supported' },
          ].map((stat, i) => (
            <div key={i} className="px-10 py-6 text-center"
              style={{ backgroundColor: '#FFF7C5', borderRight: i < 3 ? '1px solid #a8d8d6' : 'none' }}>
              <div className="text-2xl font-medium" style={{ color: '#4F252E' }}>{stat.num}</div>
              <div className="text-xs mt-1" style={{ color: '#4F252E', opacity: 0.6 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#F4AE52' }}>Features</p>
          <h2 className="text-3xl font-medium" style={{ color: '#4F252E' }}>Sab kuch ek jagah</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: '📊', title: 'View Prediction', desc: 'Upload se pehle AI batayega kitne views milenge.' },
            { icon: '📈', title: 'Trend Radar', desc: 'Agle hafte jo viral hoga — tumhara alert pehle aayega.' },
            { icon: '🔍', title: 'Content Gap Finder', desc: 'Jo log dhundh rahe hain lekin kisi ne video nahi banaya.' },
            { icon: '⚔️', title: 'Competition Score', desc: 'Easy / Medium / Hard — ek second mein samjho.' },
            { icon: '✍️', title: 'Title Suggestions', desc: 'CTR score ke saath 5 title ideas jo click karwaye.' },
            { icon: '📅', title: 'Content Calendar', desc: '30 din ka pura content plan auto-generated.' },
          ].map((f, i) => (
            <div key={i} className="p-5 rounded-2xl"
              style={{ backgroundColor: '#FFF7C5', border: '1px solid #F4AE52' }}>
              <div className="text-2xl mb-3">{f.icon}</div>
              <div className="font-medium mb-1 text-sm" style={{ color: '#4F252E' }}>{f.title}</div>
              <div className="text-xs leading-relaxed" style={{ color: '#4F252E', opacity: 0.7 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#F4AE52' }}>Pricing</p>
          <h2 className="text-3xl font-medium" style={{ color: '#4F252E' }}>Simple pricing</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { name: 'Free', price: '₹0', desc: 'Shuru karne ke liye', features: ['3 searches/month', 'Basic demand score', 'View estimate'], popular: false },
            { name: 'Creator', price: '₹699', desc: 'Growing creators ke liye', features: ['Unlimited searches', 'Full AI analysis', 'Trend alerts', 'Content calendar', 'Hindi + English'], popular: true },
            { name: 'Pro', price: '₹1,499', desc: 'Agencies & serious creators', features: ['Sab Creator features', 'Competitor tracking', 'Multiple channels', 'Priority support'], popular: false },
          ].map((plan, i) => (
            <div key={i} className="p-6 rounded-2xl relative"
              style={{
                backgroundColor: plan.popular ? '#4F252E' : '#FFF7C5',
                border: plan.popular ? '2px solid #F4AE52' : '1px solid #F4AE52'
              }}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs px-3 py-1 rounded-full font-medium"
                  style={{ backgroundColor: '#F4AE52', color: '#4F252E' }}>
                  Most popular
                </div>
              )}
              <div className="text-xs uppercase tracking-widest mb-3"
                style={{ color: plan.popular ? '#F4AE52' : '#4F252E', opacity: plan.popular ? 1 : 0.6 }}>
                {plan.name}
              </div>
              <div className="text-3xl font-medium mb-1"
                style={{ color: plan.popular ? '#FFF7C5' : '#4F252E' }}>
                {plan.price}
                <span className="text-sm font-normal opacity-60"> /month</span>
              </div>
              <div className="text-xs mb-4 pb-4"
                style={{ color: plan.popular ? '#FFF7C5' : '#4F252E', opacity: 0.7, borderBottom: `1px solid ${plan.popular ? '#ffffff30' : '#F4AE5260'}` }}>
                {plan.desc}
              </div>
              <ul className="space-y-2 mb-5">
                {plan.features.map((f, j) => (
                  <li key={j} className="text-xs flex items-center gap-2"
                    style={{ color: plan.popular ? '#FFF7C5' : '#4F252E' }}>
                    <span style={{ color: '#F4AE52' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-2.5 rounded-lg text-sm font-medium"
                style={{
                  backgroundColor: plan.popular ? '#F4AE52' : '#4F252E',
                  color: plan.popular ? '#4F252E' : '#FFF7C5',
                  border: 'none'
                }}>
                {plan.name === 'Free' ? 'Free mein try karo' : 'Abhi lelo'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="px-8 py-6 flex justify-between items-center"
        style={{ borderTop: '1px solid #a8d8d6', backgroundColor: '#C1EBE9' }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4F252E' }}></div>
          <span className="text-sm font-medium" style={{ color: '#4F252E' }}>ContentLens</span>
        </div>
        <div className="flex gap-5 text-xs" style={{ color: '#4F252E', opacity: 0.6 }}>
          <span>Privacy</span>
          <span>Terms</span>
          <span>Contact</span>
        </div>
      </footer>

    </main>
  );
}