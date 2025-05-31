// backend/models/Category.js
const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    longDescription: { type: String, default: '' }, // Eklendi
    icon: { type: String, default: 'default-icon.png' },
    // toolCount: { type: Number, default: 0 }, // Bu dinamik olarak hesaplanabilir
}, { timestamps: true });
module.exports = mongoose.model('Category', categorySchema);