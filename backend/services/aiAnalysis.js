const Groq = require('groq-sdk');
const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function analyzeContent(query, category, ytData, language) {
  try {
    const isHindi = language === 'hindi';
    const lang = isHindi ? 'Hinglish (Hindi + English mix)' : 'English';
    const gapLang = isHindi ? 'Hinglish mein likho' : 'Write in English';
    const titleLang = isHindi ? 'Hinglish mein catchy title' : 'Catchy English title';
    const verdictLang = isHindi ? 'Hinglish mein 2 line summary' : '2 line English summary';

    const prompt = `You are a YouTube content strategy expert for Indian creators.

Topic: "${query}"
Category: ${category}
Language: ${lang}

YouTube Data:
- Total videos: ${ytData.totalVideos}
- Average views of top videos: ${ytData.avgViews}

RULES:
1. Be 100% honest. Low avgViews = low demandScore.
2. avgViews below 5000 = demandScore 1-30
3. avgViews 5000-50000 = demandScore 31-60
4. avgViews 50000-500000 = demandScore 61-80
5. avgViews above 500000 = demandScore 81-100
6. totalVideos below 100000 = Easy, below 500000 = Medium, above = Hard
7. All text fields must be in ${lang}
8. Return ONLY valid JSON, no markdown, no extra text

JSON format:
{
  "demandScore": <number 1-100>,
  "expectedViewsMin": <realistic minimum>,
  "expectedViewsMax": <realistic maximum>,
  "competition": "<Easy or Medium or Hard>",
  "demandExplanation": "<${gapLang}>",
  "contentGaps": ["<${gapLang}>", "<${gapLang}>", "<${gapLang}>"],
  "titleSuggestions": ["<${titleLang}>", "<${titleLang}>", "<${titleLang}>", "<${titleLang}>", "<${titleLang}>"],
  "verdict": "<${verdictLang}>"
}`;

    const response = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1200
    });

    const text = response.choices[0].message.content.trim();
    console.log('Groq Response:', text);
    const clean = text.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);

  } catch (err) {
    console.error('AI Analysis Error:', err.message);
    const isHindi = language === 'hindi';
    return {
      demandScore: 50,
      expectedViewsMin: 5000,
      expectedViewsMax: 30000,
      competition: 'Medium',
      demandExplanation: isHindi
        ? 'Is topic pe average demand hai. Na bahut zyada, na bahut kam.'
        : 'This topic has average demand. Not too high, not too low.',
      contentGaps: isHindi
        ? ['Hindi mein detailed content ki kami hai', 'Beginners ke liye content nahi hai', 'Short format content missing hai']
        : ['Lack of beginner-friendly content', 'No detailed tutorials available', 'Short format content is missing'],
      titleSuggestions: isHindi
        ? ['Is topic pe poori jankari', 'Beginners ke liye guide', 'Ghar pe kaise karein', 'Step by step tutorial', 'Sabse aasan tarika']
        : ['Complete guide to this topic', 'Beginners guide explained', 'How to do it at home', 'Step by step tutorial', 'Easiest way to get started'],
      verdict: isHindi
        ? 'Is topic pe video banao — thoda competition hai lekin scope bhi hai!'
        : 'This topic has potential — moderate competition but good scope!'
    };
  }
}

module.exports = { analyzeContent };
