const express = require('express');
const router = express.Router();
const Category = require('../models/Category'); // Modelimizi import ediyoruz

// GET tüm kategorileri listele
// Örnek: /api/categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        console.error("Error fetching categories:", err.message);
        res.status(500).json({ message: 'Server error while fetching categories' });
    }
});

// GET id ile tek bir kategoriyi getir (ileride detay sayfası için)
// Örnek: /api/categories/image-generation
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findOne({ id: req.params.id }); // category-data.js'deki string id'ye göre arama
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (err) {
        console.error(`Error fetching category with id ${req.params.id}:`, err.message);
        res.status(500).json({ message: 'Server error while fetching category' });
    }
});

module.exports = router;