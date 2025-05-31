const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ai_tools_db_fallback';

// Middleware
app.use(cors()); // CORS'u etkinleştir
app.use(express.json()); // Gelen JSON request body'lerini parse etmek için

// MongoDB Bağlantısı
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully!'))
.catch(err => console.error('MongoDB connection error:', err));

// Basit bir test route'u
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend API is working!' });
});

// TODO: AI Tools ve Kategoriler için route'lar buraya eklenecek

app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});