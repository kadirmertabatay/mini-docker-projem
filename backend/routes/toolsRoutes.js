const express = require('express');
const router = express.Router();
const Tool = require('../models/Tool'); // Modelimizi import ediyoruz

// GET tüm araçları listele
// Örnek: /api/tools
// Örnek query: /api/tools?category=image-generation&popular=true
router.get('/', async (req, res) => {
    try {
        const query = {};
        if (req.query.category) {
            query.category = req.query.category; // Kategoriye göre filtreleme
        }
        if (req.query.popular) {
            query.isPopular = req.query.popular === 'true'; // Popülerliğe göre filtreleme
        }
        // Diğer filtreler (isNew, pricing vs.) eklenebilir

        const tools = await Tool.find(query);
        res.json(tools);
    } catch (err) {
        console.error("Error fetching tools:", err.message);
        res.status(500).json({ message: 'Server error while fetching tools' });
    }
});

// GET id ile tek bir aracı getir (ileride detay sayfası için)
// Örnek: /api/tools/chatgpt
router.get('/:id', async (req, res) => {
    try {
        const tool = await Tool.findOne({ id: req.params.id }); // data.js'deki string id'ye göre arama
        if (!tool) {
            return res.status(404).json({ message: 'Tool not found' });
        }
        res.json(tool);
    } catch (err) {
        console.error(`Error fetching tool with id ${req.params.id}:`, err.message);
        res.status(500).json({ message: 'Server error while fetching tool' });
    }
});

// POST yeni araç ekle (Şimdilik sadece GET'e odaklanıyoruz, bu kısmı sonra geliştirebiliriz)
/*
router.post('/', async (req, res) => {
    // ...
});
*/

module.exports = router;