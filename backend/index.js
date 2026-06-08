const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://contentlens-abdulkayyum20006-3476s-projects.vercel.app',
    'https://contentlens-production-a2e5.up.railway.app'
  ]
}));

app.use(express.json());

app.use('/api/search', require('./routes/search'));

app.get('/', (req, res) => {
  res.json({ message: 'ContentLens Backend chal raha hai! 🚀' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});