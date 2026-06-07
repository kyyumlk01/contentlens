const axios = require('axios');

async function searchYouTube(query, category) {
  try {
    const KEY = process.env.YOUTUBE_API_KEY;

    // Step 1: Videos search karo
    const searchRes = await axios.get(
      'https://www.googleapis.com/youtube/v3/search',
      {
        params: {
          key: KEY,
          q: `${query} ${category}`,
          part: 'snippet',
          type: 'video',
          maxResults: 20,
          relevanceLanguage: 'hi'
        }
      }
    );

    const items = searchRes.data.items;
    if (!items || items.length === 0) {
      return { avgViews: 0, totalVideos: 0, videos: [] };
    }

    const videoIds = items.map(v => v.id.videoId).join(',');

    // Step 2: Stats fetch karo
    const statsRes = await axios.get(
      'https://www.googleapis.com/youtube/v3/videos',
      {
        params: {
          key: KEY,
          id: videoIds,
          part: 'statistics'
        }
      }
    );

    const views = statsRes.data.items.map(v =>
      parseInt(v.statistics.viewCount || 0)
    );

    const avgViews = views.length > 0
      ? Math.round(views.reduce((a, b) => a + b, 0) / views.length)
      : 0;

    const totalVideos = searchRes.data.pageInfo?.totalResults || 0;

    return { avgViews, totalVideos, videos: items };

  } catch (err) {
    console.error('YouTube API Error:', err.message);
    return { avgViews: 0, totalVideos: 0, videos: [] };
  }
}

module.exports = { searchYouTube };