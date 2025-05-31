const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Rota dosyalarını import et
const toolsRoutes = require('./routes/toolsRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ai_tools_db_fallback';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Bağlantısı
mongoose.connect(MONGO_URI, {
    // useNewUrlParser: true, // mongoose 6.x ve sonrası için bu seçenekler varsayılan ve gereksiz
    // useUnifiedTopology: true, // mongoose 6.x ve sonrası için bu seçenekler varsayılan ve gereksiz
})
.then(() => console.log('MongoDB connected successfully!'))
.catch(err => console.error('MongoDB connection error:', err));

// Ana Rotalar
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend API is working!' });
});

// API Rotalarını kullan
app.use('/api/tools', toolsRoutes);
app.use('/api/categories', categoriesRoutes);

app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});