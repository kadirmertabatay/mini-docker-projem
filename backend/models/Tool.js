// backend/models/Tool.js
const mongoose = require('mongoose');
const toolSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true, ref: 'Category' }, // Kategori ID'sine referans
    description: { type: String, required: true },
    longDescription: { type: String, default: '' }, // Eklendi
    imageUrl: { type: String, default: '' },
    tags: [String],
    website: { type: String, required: true },
    pricing: { type: String, enum: ['Free', 'Freemium', 'Paid', 'Contact for Pricing'], default: 'Free' },
    // priceText: { type: String }, // İsterseniz bunu da ekleyebilirsiniz
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviewCount: { type: Number, default: 0 },
    isPopular: { type: Boolean, default: false },
    isNew: { type: Boolean, default: false },
    dateAdded: { type: Date, default: Date.now }, // Eklendi ve Date tipine çevrildi
    // features: [String],
}, { timestamps: true });
module.exports = mongoose.model('Tool', toolSchema);