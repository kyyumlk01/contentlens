# Vicobot 🤖

> AI-powered YouTube content research tool for youtube creator creators.

Vicobot helps YouTube creators pick the right topics before they start filming — using real YouTube data and AI analysis.

## What it does

- **Demand Score** — Know if a topic has real audience demand
- **View Prediction** — Expected views in first 30 days
- **Title Ideas** — 5 AI-crafted titles that drive clicks
- **Content Gaps** — Untapped angles competitors missed
- **Competition Level** — Easy, Medium or Hard
- **Hindi & English** — Results in your preferred language

## Tech Stack

**Frontend** — Next.js, TypeScript, Supabase Auth, Vercel  
**Backend** — Node.js, Express, Railway  
**AI** — Groq (Llama 3.3 70B)  
**Database** — Supabase  
**APIs** — YouTube Data API v3

## Project Structure
vicobot/

├── frontend/          # Next.js app

│   └── app/

│       ├── page.tsx           # Landing page

│       ├── about/page.tsx     # About page

│       ├── login/page.tsx     # Login & Signup

│       └── dashboard/page.tsx # Main dashboard

└── backend/           # Express API

├── routes/

│   └── search.js          # Search route

└── services/

├── youtubeAPI.js      # YouTube data fetch

└── aiAnalysis.js      # Groq AI analysis


## Getting Started

### Prerequisites
- Node.js 18+
- Supabase account
- Groq API key
- YouTube Data API key

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env.local`:

NEXT_PUBLIC_SUPABASE_URL=supabase_url

NEXT_PUBLIC_SUPABASE_ANON_KEY=supabase_anon_key

NEXT_PUBLIC_API_URL=backend_url

### Backend Setup

```bash
cd backend
npm install
node index.js
```

Backend `.env`:

GROQ_API_KEY=groq_key

YOUTUBE_API_KEY=youtube_key

SUPABASE_URL=supabase_url

SUPABASE_SERVICE_KEY=supabase_service_key

PORT=5000
## Deployment

- **Frontend** → Vercel
- **Backend** → Railway

## Pricing

| Feature | Free | Pro (Coming Soon) |
|---|---|---|
| Searches/day | 5 | Unlimited |
| Demand score | ✓ | ✓ |
| View prediction | ✓ | ✓ |
| Title ideas (5) | ✓ | ✓ |
| Content gaps | ✓ | ✓ |
| Hindi & English | ✓ | ✓ |
| Video schedule | — | ✓ |
| Editing tips | — | ✓ |
| Channel analysis | — | ✓ |
| Thumbnail ideas | — | ✓ |
| Hook script | — | ✓ |
| SEO tags | — | ✓ |
| Price | ₹0 | ₹299/month |

## License

MIT License — feel free to use and modify.

---

Made with ❤️ for YouTube Creators
