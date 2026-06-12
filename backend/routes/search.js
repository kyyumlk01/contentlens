const router = require('express').Router();
const { searchYouTube } = require('../services/youtubeAPI');
const { analyzeContent } = require('../services/aiAnalysis');

router.post('/', async (req, res) => {
  try {
    const { query, category, language } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query daalo!' });
    }

    console.log(`Searching: ${query} | Category: ${category} | Language: ${language}`);

    const ytData = await searchYouTube(query, category);
    console.log('YouTube data:', ytData.avgViews, ytData.totalVideos);

    const analysis = await analyzeContent(query, category, ytData, language);
    console.log('AI analysis done!');

    res.json({ success: true, data: analysis });
  } catch (err) {
    console.error('Search Error:', err.message);
    res.status(500).json({ error: 'Kuch galat hua, dobara try karo.' });
  }
});

module.exports = router;
