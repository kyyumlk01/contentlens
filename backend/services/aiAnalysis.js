const Groq = require('groq-sdk');

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function analyzeContent(query, category, ytData) {
  try {
    const prompt = `
      You are a YouTube content strategy expert for Indian creators.
      
      Topic: "${query}"
      Category: ${category}
      YouTube Data:
      - Total videos on this topic: ${ytData.totalVideos}
      - Average views of top videos: ${ytData.avgViews}
      
      Return ONLY a JSON object (no markdown, no extra text):
      {
        ""demandScore": <strict score 1-100, use avgViews: low=1-40, medium=41-70, high=71-85, viral=86-100. Be realistic not generous>,,
      "expectedViewsMin": <based on avgViews divided by 3, give realistic number>,
      "expectedViewsMax": <based on avgViews multiplied by 2, give realistic number>,
      "competition": <"Easy" if totalVideos below 100000, "Medium" if below 500000, "Hard" if above>,
        "trending": true,
        "contentGaps": [
          "gap 1 in Hinglish",
          "gap 2 in Hinglish",
          "gap 3 in Hinglish"
        ],
        "titleSuggestions": [
          "Title 1",
          "Title 2",
          "Title 3"
        ],
        "bestDayToPost": "Tuesday",
        "monetizationPotential": "High",
        "verdict": "1 line summary in Hinglish"
      }
    `;

    const response = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000
    });

    const text = response.choices[0].message.content.trim();
    console.log('Groq Response:', text);
    const clean = text.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);

  } catch (err) {
    console.error('AI Analysis Error:', err.message);
    return {
      demandScore: 70,
      expectedViewsMin: 10000,
      expectedViewsMax: 50000,
      competition: 'Medium',
      trending: false,
      contentGaps: [
        'Hindi mein content ki kami hai',
        'Beginners ke liye content nahi hai',
        'Short format content missing hai'
      ],
      titleSuggestions: [
        'Topic pe best video',
        'Beginners guide to topic',
        'Topic explained in Hindi'
      ],
      bestDayToPost: 'Tuesday',
      monetizationPotential: 'Medium',
      verdict: 'Is topic pe video banao — accha potential hai!'
    };
  }
}

module.exports = { analyzeContent };