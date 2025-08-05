require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sample_mflix';
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const movieSchema = new mongoose.Schema({}, { strict: false, collection: 'embedded_movies' });
const Movie = mongoose.model('Movie', movieSchema);

app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/search', async (req, res) => {
  const query = req.query.q || '';
  if (!query) {
    return res.status(400).json({ error: 'Query parameter q is required' });
  }

  try {
    const results = await Movie.find({
      title: { $regex: query, $options: 'i' }
    }).lean();
    res.json(results);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Microservice running on http://localhost:${PORT}`);
});
