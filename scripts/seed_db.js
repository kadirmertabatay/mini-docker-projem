const mongoose = require('mongoose');
const Tool = require('../backend/models/Tool');
const Category = require('../backend/models/Category');

// Düzenlenmiş veri dosyalarını import et
const { tools: initialToolsData, categories: initialCategoriesData } = require('../frontend/assets/js/data_for_seed.js');
const { categoryDetails, detailedTools } = require('../frontend/assets/js/category_data_for_seed.js');

// MONGO_URI'yi docker-compose.yaml'daki gibi veya lokal MongoDB adresiniz olarak ayarlayın
const MONGO_URI = process.env.SEED_MONGO_URI || 'mongodb://localhost:27017/ai_tools_db';

async function seedDatabase() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected for seeding...');

        console.log('Clearing existing data...');
        await Tool.deleteMany({});
        await Category.deleteMany({});
        console.log('Existing data cleared.');

        // --- Kategorileri Hazırla ve Ekle ---
        console.log('Preparing and seeding categories...');
        const categoriesToSeed = [];
        for (const cat of initialCategoriesData) {
            const detail = categoryDetails[cat.id];
            categoriesToSeed.push({
                id: cat.id,
                name: cat.name,
                icon: cat.icon,
                description: detail ? detail.description : cat.description, // Detaylı açıklamayı önceliklendir
                longDescription: detail ? detail.longDescription : '', // Uzun açıklamayı ekle
                // toolCount: 0, // Bu API'den dinamik olarak hesaplanabilir veya sonra güncellenebilir
            });
        }

        if (categoriesToSeed.length > 0) {
            await Category.insertMany(categoriesToSeed);
            console.log(`${categoriesToSeed.length} categories seeded successfully.`);
        } else {
            console.log('No category data found to seed.');
        }

        // --- Araçları Hazırla ve Ekle ---
        console.log('Preparing and seeding tools...');
        const toolsToSeed = [];

        // 1. initialToolsData'dan gelen araçlar
        for (const tool of initialToolsData) {
            const detailToolInfo = detailedTools[tool.id]; // category_data_for_seed.js'den detayları al
            toolsToSeed.push({
                id: tool.id,
                name: tool.name,
                category: tool.category, // Bu bir kategori ID'si olmalı
                description: detailToolInfo ? detailToolInfo.description : tool.description,
                longDescription: detailToolInfo ? detailToolInfo.longDescription : '',
                website: detailToolInfo ? detailToolInfo.website : tool.website,
                imageUrl: tool.imageUrl || (detailToolInfo ? detailToolInfo.imageUrl : ''), // imageUrl'i birleştir
                tags: detailToolInfo ? detailToolInfo.tags : tool.tags,
                pricing: detailToolInfo ? (detailToolInfo.priceType === 'free' ? 'Free' : detailToolInfo.priceType === 'premium' ? 'Paid' : 'Freemium') : tool.pricing || 'Freemium', // pricing modeline uygun hale getir
                rating: detailToolInfo ? detailToolInfo.rating : tool.rating || 0,
                reviewCount: detailToolInfo ? detailToolInfo.reviewCount : tool.reviewCount || 0,
                isPopular: detailToolInfo ? detailToolInfo.isPopular : tool.isPopular || false,
                isNew: detailToolInfo ? detailToolInfo.isNew : tool.isNew || false,
                dateAdded: detailToolInfo ? detailToolInfo.dateAdded : (tool.dateAdded || new Date().toISOString().split('T')[0]),
                // features: detailToolInfo ? detailToolInfo.features : tool.features || [], // Modelde varsa
            });
        }

        // 2. Sadece detailedTools'da olup initialToolsData'da olmayan araçlar
        for (const toolId in detailedTools) {
            if (!toolsToSeed.find(t => t.id === toolId)) { // Eğer zaten eklenmemişse
                const tool = detailedTools[toolId];
                toolsToSeed.push({
                    id: tool.id,
                    name: tool.name,
                    category: tool.category,
                    description: tool.description,
                    longDescription: tool.longDescription || '',
                    website: tool.website,
                    imageUrl: tool.imageUrl || '',
                    tags: tool.tags || [],
                    pricing: tool.priceType === 'free' ? 'Free' : tool.priceType === 'premium' ? 'Paid' : 'Freemium',
                    rating: tool.rating || 0,
                    reviewCount: tool.reviewCount || 0,
                    isPopular: tool.isPopular || false,
                    isNew: tool.isNew || false,
                    dateAdded: tool.dateAdded || new Date().toISOString().split('T')[0],
                    // features: tool.features || [],
                });
            }
        }
        
        if (toolsToSeed.length > 0) {
            // Yinelenen ID'leri kontrol et ve kaldır (opsiyonel ama iyi bir pratik)
            const uniqueToolsToSeed = toolsToSeed.filter((tool, index, self) =>
                index === self.findIndex((t) => (
                    t.id === tool.id
                ))
            );
            await Tool.insertMany(uniqueToolsToSeed);
            console.log(`${uniqueToolsToSeed.length} tools seeded successfully.`);
        } else {
            console.log('No tool data found to seed.');
        }

        console.log('Database seeding completed!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await mongoose.disconnect();
        console.log('MongoDB disconnected.');
    }
}

seedDatabase();