// data.js - Veri yapıları

// Araçlar veri yapısı
const toolsData = [
    {
        id: 'claude',
        name: 'Claude',
        description: 'Claude, Anthropic tarafından geliştirilen, doğal dil anlama ve üretme konusunda uzmanlaşmış bir AI asistanıdır.',
        tags: ['Sohbet', 'Metin Üretimi', 'İçerik Analizi'],
        url: 'https://claude.ai',
        color: '#3498db',
        bgColor: '#f0f4f8',
        isPopular: true,
        category: 'sohbet-botu'
    },
    {
        id: 'chatgpt',
        name: 'ChatGPT',
        description: 'OpenAI tarafından geliştirilen ChatGPT, geniş dil yetenekleri ile sorulara cevap veren, içerik üreten bir AI sohbet botudur.',
        tags: ['Sohbet', 'Metin Üretimi', 'Programlama'],
        url: 'https://chat.openai.com',
        color: '#10a37f',
        bgColor: '#f0ffff',
        isPopular: true,
        category: 'sohbet-botu'
    },
    {
        id: 'midjourney',
        name: 'Midjourney',
        description: 'Midjourney, metin komutlarından yüksek kaliteli, sanatsal görseller üreten popüler bir AI görsel üretim aracıdır.',
        tags: ['Görsel Üretimi', 'Sanat', 'İllüstrasyon'],
        url: 'https://www.midjourney.com',
        color: '#ffffff',
        bgColor: '#131218',
        isPopular: true,
        category: 'gorsel-uretimi'
    },
    {
        id: 'dalle',
        name: 'DALL-E',
        description: 'OpenAI\'nin geliştirdiği DALL-E, metin açıklamalarından gerçekçi görseller üreten güçlü bir AI görsel üretim modelidir.',
        tags: ['Görsel Üretimi', 'Fotoğraf', 'İllüstrasyon'],
        url: 'https://openai.com/dall-e-3',
        color: '#ff5722',
        bgColor: '#fef3e8',
        isPopular: true,
        category: 'gorsel-uretimi'
    },
    {
        id: 'gemini',
        name: 'Gemini',
        description: 'Google\'ın geliştirdiği Gemini, metin, görsel ve ses gibi çoklu ortam girişlerini anlayabilen ve bunlara yanıt verebilen bir AI modelidir.',
        tags: ['Sohbet', 'Çoklu Ortam', 'Analiz'],
        url: 'https://gemini.google.com',
        color: '#4285f4',
        bgColor: '#e8f5fd',
        isPopular: true,
        category: 'sohbet-botu'
    },
    {
        id: 'github-copilot',
        name: 'GitHub Copilot',
        description: 'GitHub ve OpenAI işbirliğiyle geliştirilen, kod yazmaya yardımcı olan ve geliştiricilere öneriler sunan AI tabanlı bir programlama asistanı.',
        tags: ['Programlama', 'Kod Yardımcısı', 'Geliştirme'],
        url: 'https://github.com/features/copilot',
        color: '#ffffff',
        bgColor: '#0d1117',
        isPopular: true,
        category: 'programlama'
    },
    {
        id: 'stable-diffusion',
        name: 'Stable Diffusion',
        description: 'Stability AI tarafından geliştirilen açık kaynaklı bir görsel üretim modeli.',
        tags: ['Görsel Üretimi', 'Açık Kaynak', 'AI Model'],
        url: 'https://stability.ai',
        color: '#8e44ad',
        bgColor: '#f5f0ff',
        isPopular: false,
        category: 'gorsel-uretimi'
    },
    {
        id: 'suno-ai',
        name: 'Suno AI',
        description: 'Metin komutlarından yüksek kaliteli müzik parçaları üretebilen yapay zeka destekli müzik oluşturma platformu.',
        tags: ['Müzik', 'Ses Üretimi', 'Yaratıcılık'],
        url: 'https://suno.ai',
        color: '#e74c3c',
        bgColor: '#fff0f0',
        isPopular: false,
        category: 'ses-muzik'
    }
];

// Kategoriler veri yapısı
const categoriesData = [
    {
        id: 'gorsel-uretimi',
        name: 'Görsel Üretimi',
        icon: '🖌️',
        description: 'Fotoğraf ve sanat eserleri oluşturan AI araçları',
        subcategories: [
            { id: 'midjourney', name: 'Midjourney', url: 'category-detail.html?id=gorsel-uretimi' },
            { id: 'dalle', name: 'DALL-E', url: 'category-detail.html?id=gorsel-uretimi' },
            { id: 'stable-diffusion', name: 'Stable Diffusion', url: 'category-detail.html?id=gorsel-uretimi' },
            { id: 'leonardo-ai', name: 'Leonardo.AI', url: 'category-detail.html?id=gorsel-uretimi' }
        ]
    },
    {
        id: 'metin-uretimi',
        name: 'Metin Üretimi',
        icon: '✍️',
        description: 'İçerik yazımı ve düzenleme için AI araçları',
        subcategories: [
            { id: 'claude', name: 'Claude', url: 'https://claude.ai' },
            { id: 'chatgpt', name: 'ChatGPT', url: 'https://chat.openai.com' },
            { id: 'jasper', name: 'Jasper', url: 'https://www.jasper.ai' },
            { id: 'copy-ai', name: 'Copy.ai', url: 'https://www.copy.ai' }
        ]
    },
    {
        id: 'sohbet-botu',
        name: 'Sohbet Botları',
        icon: '💬',
        description: 'İnteraktif AI sohbet deneyimleri',
        subcategories: [
            { id: 'claude', name: 'Claude', url: 'https://claude.ai' },
            { id: 'chatgpt', name: 'ChatGPT', url: 'https://chat.openai.com' },
            { id: 'gemini', name: 'Gemini', url: 'https://gemini.google.com' },
            { id: 'perplexity', name: 'Perplexity', url: 'https://www.perplexity.ai' }
        ]
    },
    {
        id: 'ses-muzik',
        name: 'Ses ve Müzik',
        icon: '🎵',
        description: 'Müzik besteleme ve ses sentezleme araçları',
        subcategories: [
            { id: 'suno-ai', name: 'Suno AI', url: 'https://suno.ai' },
            { id: 'elevenlabs', name: 'ElevenLabs', url: 'https://elevenlabs.io' },
            { id: 'soundraw', name: 'Soundraw', url: 'https://soundraw.io' },
            { id: 'play-ht', name: 'Play.ht', url: 'https://play.ht' }
        ]
    },
    {
        id: 'veri-analizi',
        name: 'Veri Analizi',
        icon: '📊',
        description: 'Veri işleme ve analiz için AI araçları',
        subcategories: [
            { id: 'dataiku', name: 'Dataiku', url: 'https://www.dataiku.com' },
            { id: 'tableau', name: 'Tableau', url: 'https://www.tableau.com' },
            { id: 'ibm-watson', name: 'IBM Watson', url: 'https://www.ibm.com/watson' },
            { id: 'alteryx', name: 'Alteryx', url: 'https://www.alteryx.com' }
        ]
    },
    {
        id: 'programlama',
        name: 'Programlama',
        icon: '💻',
        description: 'Kod yazma ve geliştirme süreçleri için AI araçları',
        subcategories: [
            { id: 'github-copilot', name: 'GitHub Copilot', url: 'https://github.com/features/copilot' },
            { id: 'cursor', name: 'Cursor', url: 'https://www.cursor.so' },
            { id: 'tabnine', name: 'Tabnine', url: 'https://www.tabnine.com' },
            { id: 'cody', name: 'Cody', url: 'https://sourcegraph.com/cody' }
        ]
    }
];

// Verileri dışa aktarma
window.aiToolsData = {
    tools: toolsData,
    categories: categoriesData,
    
    // Yardımcı fonksiyonlar
    getPopularTools: function() {
        return this.tools.filter(tool => tool.isPopular);
    },
    
    getToolsByCategory: function(categoryId) {
        return this.tools.filter(tool => tool.category === categoryId);
    },
    
    getCategoryById: function(categoryId) {
        return this.categories.find(category => category.id === categoryId);
    },
    
    getToolById: function(toolId) {
        return this.tools.find(tool => tool.id === toolId);
    },
    
    searchTools: function(searchTerm) {
        searchTerm = searchTerm.toLowerCase().trim();
        if (searchTerm === '') return [];
        
        return this.tools.filter(tool => {
            // Araç adında arama
            if (tool.name.toLowerCase().includes(searchTerm)) return true;
            
            // Açıklamada arama
            if (tool.description.toLowerCase().includes(searchTerm)) return true;
            
            // Etiketlerde arama
            if (tool.tags.some(tag => tag.toLowerCase().includes(searchTerm))) return true;
            
            return false;
        });
    },
    
    searchCategories: function(searchTerm) {
        searchTerm = searchTerm.toLowerCase().trim();
        if (searchTerm === '') return [];
        
        const results = [];
        
        this.categories.forEach(category => {
            // Kategori adında arama
            if (category.name.toLowerCase().includes(searchTerm)) {
                results.push({
                    type: 'category',
                    id: category.id,
                    name: category.name,
                    parentName: null
                });
            }
            
            // Alt kategorilerde arama
            category.subcategories.forEach(sub => {
                if (sub.name.toLowerCase().includes(searchTerm)) {
                    results.push({
                        type: 'subcategory',
                        id: sub.id,
                        name: sub.name,
                        url: sub.url,
                        parentId: category.id,
                        parentName: category.name
                    });
                }
            });
        });
        
        return results;
    }
};