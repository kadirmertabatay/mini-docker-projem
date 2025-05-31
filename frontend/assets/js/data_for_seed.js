// data_for_seed.js - SADECE SEEDING İÇİN HAM VERİLER

const toolsData = [
    {
        id: 'claude',
        name: 'Claude',
        description: 'Claude, Anthropic tarafından geliştirilen, doğal dil anlama ve üretme konusunda uzmanlaşmış bir AI asistanıdır.',
        tags: ['Sohbet', 'Metin Üretimi', 'İçerik Analizi'],
        website: 'https://claude.ai', // 'url' yerine 'website' kullandım modeldeki gibi
        // color: '#3498db', // Modelde bu alanlar yok, isterseniz ekleyebilirsiniz
        // bgColor: '#f0f4f8', // Modelde bu alanlar yok
        isPopular: true,
        category: 'sohbet-botu' // Bu kategori ID'si olmalı
    },
    {
        id: 'chatgpt',
        name: 'ChatGPT',
        description: 'OpenAI tarafından geliştirilen ChatGPT, geniş dil yetenekleri ile sorulara cevap veren, içerik üreten bir AI sohbet botudur.',
        tags: ['Sohbet', 'Metin Üretimi', 'Programlama'],
        website: 'https://chat.openai.com',
        isPopular: true,
        category: 'sohbet-botu', // Kategori ID'si
        // category-data.js'deki detailedTools içindeki 'chatgpt' objesinden
        // priceType, priceText, rating, dateAdded gibi alanları buraya ekleyebilirsiniz
        // Örneğin:
        priceType: "freemium", // category-data.js'den
        priceText: "Freemium", // category-data.js'den
        rating: 4.9,         // category-data.js'den
        dateAdded: "2023-02-10" // category-data.js'den
    },
    {
        id: 'midjourney',
        name: 'Midjourney',
        description: 'Midjourney, metin komutlarından yüksek kaliteli, sanatsal görseller üreten popüler bir AI görsel üretim aracıdır.',
        tags: ['Görsel Üretimi', 'Sanat', 'İllüstrasyon'],
        website: 'https://www.midjourney.com',
        isPopular: true,
        category: 'gorsel-uretimi',
        priceType: "premium",
        priceText: "Ücretli",
        rating: 4.9,
        dateAdded: "2023-01-15"
    },
    {
        id: 'dalle',
        name: 'DALL-E',
        description: 'OpenAI\'nin geliştirdiği DALL-E, metin açıklamalarından gerçekçi görseller üreten güçlü bir AI görsel üretim modelidir.',
        tags: ['Görsel Üretimi', 'Fotoğraf', 'İllüstrasyon'],
        website: 'https://openai.com/dall-e-3',
        isPopular: true,
        category: 'gorsel-uretimi',
        priceType: "freemium",
        priceText: "Freemium",
        rating: 4.8,
        dateAdded: "2023-03-22"
    },
    {
        id: 'gemini',
        name: 'Gemini',
        description: 'Google\'ın geliştirdiği Gemini, metin, görsel ve ses gibi çoklu ortam girişlerini anlayabilen ve bunlara yanıt verebilen bir AI modelidir.',
        tags: ['Sohbet', 'Çoklu Ortam', 'Analiz'],
        website: 'https://gemini.google.com',
        isPopular: true,
        category: 'sohbet-botu'
    },
    {
        id: 'github-copilot',
        name: 'GitHub Copilot',
        description: 'GitHub ve OpenAI işbirliğiyle geliştirilen, kod yazmaya yardımcı olan ve geliştiricilere öneriler sunan AI tabanlı bir programlama asistanı.',
        tags: ['Programlama', 'Kod Yardımcısı', 'Geliştirme'],
        website: 'https://github.com/features/copilot',
        isPopular: true,
        category: 'programlama'
    },
    {
        id: 'stable-diffusion',
        name: 'Stable Diffusion',
        description: 'Stability AI tarafından geliştirilen açık kaynaklı bir görsel üretim modeli.',
        tags: ['Görsel Üretimi', 'Açık Kaynak', 'AI Model'],
        website: 'https://stability.ai',
        isPopular: false,
        category: 'gorsel-uretimi',
        priceType: "free",
        priceText: "Ücretsiz",
        rating: 4.7,
        dateAdded: "2022-11-10"
    },
    {
        id: 'suno-ai',
        name: 'Suno AI',
        description: 'Metin komutlarından yüksek kaliteli müzik parçaları üretebilen yapay zeka destekli müzik oluşturma platformu.',
        tags: ['Müzik', 'Ses Üretimi', 'Yaratıcılık'],
        website: 'https://suno.ai',
        isPopular: false,
        category: 'ses-muzik'
    }
    // category-data.js içindeki detailedTools objesindeki diğer araçları da
    // buradaki toolsData array'ine, Tool modeline uygun alanlarla ekleyebilirsiniz.
    // Örneğin, Leonardo.AI, Bing Image Creator vb.
];

const categoriesData = [
    {
        id: 'gorsel-uretimi',
        name: 'Görsel Üretimi',
        icon: '🖌️', // Modelde icon alanı var
        description: 'Fotoğraf ve sanat eserleri oluşturan AI araçları',
        // subcategories modelde yok, şimdilik çıkardım.
        // categoryDetails["gorsel-uretimi"].longDescription gibi alanları isterseniz ekleyebilirsiniz.
        longDescription: "Yapay zeka görsel üretim araçları, sanatçılar, tasarımcılar ve içerik üreticileri için yeni bir çağ başlattı..." // categoryDetails'den
    },
    {
        id: 'metin-uretimi',
        name: 'Metin Üretimi',
        icon: '✍️',
        description: 'İçerik yazımı ve düzenleme için AI araçları',
        longDescription: "Metin üretimi AI araçları, blog yazıları, sosyal medya içerikleri, ürün açıklamaları, e-postalar ve daha fazlasını hızlı bir şekilde oluşturmanıza yardımcı olur..."
    },
    {
        id: 'sohbet-botu',
        name: 'Sohbet Botları', // data.js'deki kategori adı
        icon: '💬',
        description: 'İnteraktif AI sohbet deneyimleri',
        longDescription: "AI sohbet botları ve asistanlar, doğal dil işleme yetenekleriyle kullanıcılarla etkileşim kurarak soruları yanıtlar, görevleri gerçekleştirir veya bilgi sağlar..."
    },
    {
        id: 'ses-muzik',
        name: 'Ses ve Müzik',
        icon: '🎵',
        description: 'Müzik besteleme ve ses sentezleme araçları',
        longDescription: "Ses ve müzik AI araçları, müzisyenlere, içerik üreticilerine ve ses tasarımcılarına yeni yaratıcılık seviyeleri sunuyor..."
    },
    {
        id: 'veri-analizi',
        name: 'Veri Analizi',
        icon: '📊',
        description: 'Veri işleme ve analiz için AI araçları',
        longDescription: "Veri analizi AI araçları, büyük ve karmaşık veri setlerini işleyerek değerli içgörüler sunar..."
    },
    {
        id: 'programlama',
        name: 'Programlama',
        icon: '💻',
        description: 'Kod yazma ve geliştirme süreçleri için AI araçları',
        longDescription: "Programlama AI araçları, geliştiricilerin daha hızlı ve daha verimli kod yazmasına yardımcı olur..."
    }
];

module.exports = {
    tools: toolsData,
    categories: categoriesData
};