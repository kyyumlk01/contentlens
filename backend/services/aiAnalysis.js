const Groq = require('groq-sdk');
const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function analyzeContent(query, category, ytData, language = 'hindi') {
  try {
    const isHindi = language === 'hindi';

    const prompt = `
You are a YouTube content strategy expert for Indian creators.

Topic: "${query}"
Category: ${category}
Language preference: ${isHindi ? 'Hindi (respond in Hinglish - Hindi words with English terminology)' : 'English (respond in full English)'}

YouTube Data:
- Total videos on this topic: ${ytData.totalVideos}
- Average views of top videos: ${ytData.avgViews}

IMPORTANT RULES:
1. Be 100% realistic and honest. If demand is low, say so clearly.
2. If topic has low avgViews (below 5000), demandScore should be below 40.
3. If totalVideos is very high (above 1 million), competition is "Hard".
4. contentGaps and titleSuggestions must be in ${isHindi ? 'Hinglish (mix of Hindi and English)' : 'English'}.
5. verdict must be honest, helpful, and in ${isHindi ? 'Hinglish' : 'English'}.
6. demandExplanation: explain in simple words why demand is high/low.

Return ONLY a valid JSON object (no markdown, no extra text):
{
  "demandScore": <realistic score 1-100 based on avgViews: below 5000=1-30, 5000-50000=31-60, 50000-500000=61-80, above 500000=81-100>,
  "expectedViewsMin": <realistic minimum views in first 30 days>,
  "expectedViewsMax": <realistic maximum views in first 30 days>,
  "competition": <"Easy" if totalVideos below 100000, "Medium" if below 500000, "Hard" if above>,
  "demandExplanation": "${isHindi ? 'Hinglish mein explain karo kyun demand high/low hai' : 'Explain in English why demand is high or low'}",
  "contentGaps": [
    "${isHindi ? 'gap 1 in Hinglish' : 'gap 1 in English'}",
    "${isHindi ? 'gap 2 in Hinglish' : 'gap 2 in English'}",
    "${isHindi ? 'gap 3 in Hinglish' : 'gap 3 in English'}"
  ],
  "titleSuggestions": [
    "${isHindi ? 'catchy title 1 in Hinglish' : 'catchy title 1 in English'}",
    "${isHindi ? 'catchy title 2 in Hinglish' : 'catchy title 2 in English'}",
    "${isHindi ? 'catchy title 3 in Hinglish' : 'catchy title 3 in English'}",
    "${isHindi ? 'catchy title 4 in Hinglish' : 'catchy title 4 in English'}",
    "${isHindi ? 'catchy title 5 in Hinglish' : 'catchy title 5 in English'}"
  ],
  "verdict": "${isHindi ? '2 line honest summary in Hinglish' : '2 line honest summary in English'}"
}
    `;

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
    console.error('
