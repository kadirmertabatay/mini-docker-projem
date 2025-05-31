// category_data_for_seed.js - SADECE SEEDING İÇİN HAM VERİLER

const categoryDetails = {
    "gorsel-uretimi": {
        title: "Görsel Üretimi AI Araçları",
        description: "Fotoğraf, illüstrasyon ve sanat eserleri oluşturan yapay zeka araçlarının tamamı. Metin açıklamalarından görsel oluşturmak, fotoğraf düzenlemek veya sanatsal çalışmalar yapmak için en iyi AI araçlarını keşfedin.",
        longDescription: "Yapay zeka görsel üretim araçları, sanatçılar, tasarımcılar ve içerik üreticileri için yeni bir çağ başlattı. Bu araçlar, metin açıklamalarınızı (prompt) yüksek kaliteli görüntülere dönüştürebilir, var olan görselleri düzenleyebilir veya tamamen farklı sanatsal stillerle yeni eserler oluşturabilir. Farklı ihtiyaçlar için farklı özelliklere sahip çeşitli AI görsel üretim araçları bulunmaktadır."
    },
    "metin-uretimi": {
        title: "Metin Üretimi AI Araçları",
        description: "İçerik yazımı ve düzenleme için tasarlanmış yapay zeka araçları. Blog yazıları, sosyal medya içerikleri, e-postalar ve daha fazlasını otomatik olarak oluşturun.",
        longDescription: "Metin üretimi AI araçları, blog yazıları, sosyal medya içerikleri, ürün açıklamaları, e-postalar ve daha fazlasını hızlı bir şekilde oluşturmanıza yardımcı olur. Bu araçlar, yazarlar, pazarlamacılar ve içerik üreticileri için zaman kazandırıcı çözümler sunar. Bazı araçlar içerik oluşturma konusunda uzmanlaşırken, diğerleri düzenleme, özetleme veya yeniden yazma gibi özelliklere odaklanır."
    },
    "sohbet-botu": {
        title: "Sohbet Botları ve Asistanlar",
        description: "İnteraktif AI sohbet deneyimleri ve kişisel asistanlar. Sorulara cevap verme, bilgi edinme veya çeşitli görevleri otomatikleştirmek için kullanılabilirler.",
        longDescription: "AI sohbet botları ve asistanlar, doğal dil işleme yetenekleriyle kullanıcılarla etkileşim kurarak soruları yanıtlar, görevleri gerçekleştirir veya bilgi sağlar. İş, eğitim, müşteri hizmetleri ve kişisel kullanım gibi çeşitli alanlarda yardımcı olabilirler. Bu araçlar, verilerden öğrenerek giderek daha akıllı hale gelirler ve kullanıcı deneyimini geliştirir."
    },
    "ses-muzik": {
        title: "Ses ve Müzik AI Araçları",
        description: "Müzik besteleme, ses sentezleme ve ses düzenleme için yapay zeka araçları. Metin açıklamalarından müzik oluşturabilir veya ses efektleri üretebilirsiniz.",
        longDescription: "Ses ve müzik AI araçları, müzisyenlere, içerik üreticilerine ve ses tasarımcılarına yeni yaratıcılık seviyeleri sunuyor. Bu araçlarla metinden şarkılar oluşturabilir, vokal klonlayabilir, melodiler besteleyebilir veya var olan ses kayıtlarını geliştirebilirsiniz. Hem hobi hem de profesyonel seviyede müzik prodüksiyonu için geniş bir yelpazede çözümler mevcuttur."
    },
    "veri-analizi": {
        title: "Veri Analizi AI Araçları",
        description: "Veri işleme ve analizinde yapay zeka çözümleri. Büyük veri setlerini analiz etme, örüntüleri belirleme ve öngörüler oluşturma.",
        longDescription: "Veri analizi AI araçları, büyük ve karmaşık veri setlerini işleyerek değerli içgörüler sunar. Bu araçlar, iş zekası, tahmine dayalı analitik, anomali tespiti ve daha fazlasında kullanılabilir. Yapay zeka tabanlı veri analizi çözümleri, manuel analizle tespit edilemeyecek örüntüleri ve trendleri belirleyerek daha bilinçli kararlar almanıza yardımcı olur."
    },
    "programlama": {
        title: "Programlama AI Araçları",
        description: "Kod yazma ve geliştirme süreçleri için yapay zeka destekli araçlar. Kod tamamlama, hata ayıklama ve kod dönüştürme özellikleri sunarlar.",
        longDescription: "Programlama AI araçları, geliştiricilerin daha hızlı ve daha verimli kod yazmasına yardımcı olur. Bu araçlar, kod tamamlama, hata ayıklama, test senaryoları oluşturma ve hatta programlama sorularına yanıt verme gibi çeşitli işlevler sunabilir. Yapay zeka destekli programlama asistanları, hem yeni başlayanlar hem de deneyimli geliştiriciler için kod kalitesini artırır ve geliştirme sürecini hızlandırır."
    }
};

const detailedTools = {
    "midjourney": {
        id: "midjourney", name: "Midjourney", description: "Metin komutlarından yüksek kaliteli, sanatsal görseller üreten popüler bir AI görsel üretim aracı. Discord üzerinden kullanılabilir.",
        longDescription: "Midjourney, metin komutlarından etkileyici sanatsal görseller üreten güçlü bir AI aracıdır. Discord arayüzü üzerinden çalışır ve özellikle sanatsal, resimsel ve yüksek kaliteli illüstrasyonlar oluşturmada başarılıdır. Fotoğrafçılık, konsept sanatı, illüstrasyon ve fantastik görsel oluşturmada tercih edilir.",
        website: "https://www.midjourney.com", // url -> website
        tags: ["Görsel Üretimi", "Sanat", "İllüstrasyon"], priceType: "premium", priceText: "Ücretli", rating: 4.9, isPopular: true, isNew: false, category: "gorsel-uretimi", dateAdded: "2023-01-15"
    },
    "dalle": {
        id: "dalle", name: "DALL-E", description: "OpenAI'nin geliştirdiği, metin açıklamalarından gerçekçi görseller üreten güçlü bir AI görsel üretim modeli. ChatGPT Plus ile birlikte kullanılabilir.",
        longDescription: "DALL-E, OpenAI tarafından geliştirilen ve metin komutlarından gerçekçi görseller oluşturabilen güçlü bir görsel üretim modelidir. DALL-E 3, önceki versiyonlara göre daha gerçekçi ve doğru görseller üretebilir, metinleri doğru şekilde görsellere dönüştürebilir ve çeşitli stillerde çalışabilir. OpenAI'ın platformlarında veya ChatGPT Plus aboneliği ile kullanılabilir.",
        website: "https://openai.com/dall-e-3", tags: ["Görsel Üretimi", "Fotoğraf", "İllüstrasyon"], priceType: "freemium", priceText: "Freemium", rating: 4.8, isPopular: true, isNew: false, category: "gorsel-uretimi", dateAdded: "2023-03-22"
    },
    "stable-diffusion": {
        id: "stable-diffusion", name: "Stable Diffusion", description: "Açık kaynaklı bir metin-görsel dönüştürme modeli. Yerel olarak çalıştırılabilir ve özelleştirilebilir, çeşitli versiyonları ve modelleri mevcuttur.",
        longDescription: "Stability AI tarafından geliştirilen Stable Diffusion, açık kaynaklı bir metin-görsel dönüştürme modelidir. Diğer görsel üretim araçlarının aksine, kendi bilgisayarınızda yerel olarak çalıştırılabilir ve tamamen özelleştirilebilir. Farklı versiyonları ve özelleştirilmiş modelleri mevcut olup, topluluk tarafından sürekli geliştirilmektedir. Güçlü özelleştirme seçenekleri ve ücretsiz kullanım imkanı sunar.",
        website: "https://stability.ai", tags: ["Görsel Üretimi", "Açık Kaynak", "AI Model"], priceType: "free", priceText: "Ücretsiz", rating: 4.7, isPopular: false, isNew: false, category: "gorsel-uretimi", dateAdded: "2022-11-10"
    },
    "leonardo-ai": {
        id: "leonardo-ai", name: "Leonardo.AI", description: "Yaratıcı profesyoneller için geliştirilmiş, yüksek kaliteli görsel içerik oluşturma platformu. Oyun assetleri, illüstrasyonlar ve konsept tasarımları üretebilir.",
        longDescription: "Leonardo.AI, özellikle yaratıcı profesyoneller, oyun geliştiricileri ve dijital sanatçılar için tasarlanmış bir AI görsel oluşturma platformudur. Standart metin-görsel dönüşümünün yanı sıra, oyun assetleri oluşturma, karakter tasarımı ve konsept sanatı gibi özel alanlar için optimize edilmiş araçlar sunar. Kullanıcı dostu arayüzü ve özelleştirilebilir modelleri ile tercih edilir.",
        website: "https://leonardo.ai", tags: ["Görsel Üretimi", "3D Model", "Oyun Assetleri"], priceType: "freemium", priceText: "Freemium", rating: 4.6, isPopular: false, isNew: false, category: "gorsel-uretimi", dateAdded: "2023-02-05"
    },
    "bing-image-creator": {
        id: "bing-image-creator", name: "Bing Image Creator", description: "Microsoft'un DALL-E teknolojisini kullanarak oluşturduğu ücretsiz metin-görsel dönüştürme aracı. Bing arama motoru üzerinden erişilebilir.",
        longDescription: "Bing Image Creator, Microsoft'un DALL-E teknolojisini kullanarak geliştirdiği ücretsiz bir görsel oluşturma aracıdır. Bing arama motoru ve Microsoft Edge tarayıcısı üzerinden kolayca erişilebilir. Basit ve kullanıcı dostu arayüzü ile metin açıklamalarından çeşitli stiller ve konularda görseller oluşturabilirsiniz. Ücretsiz bir alternatif arayanlar için iyi bir seçenektir.",
        website: "https://www.bing.com/create", tags: ["Görsel Üretimi", "Web Tabanlı", "Ücretsiz Erişim"], priceType: "free", priceText: "Ücretsiz", rating: 4.5, isPopular: false, isNew: false, category: "gorsel-uretimi", dateAdded: "2023-04-18"
    },
    "adobe-firefly": {
        id: "adobe-firefly", name: "Adobe Firefly", description: "Adobe'un metin tabanlı görsel oluşturma aracı. Ticari kullanım için güvenli içerik üretmeye odaklanmıştır ve Adobe Creative Cloud ile entegre çalışır.",
        longDescription: "Adobe Firefly, Adobe'un kendi görsel üretim modeli olup özellikle ticari kullanım için yasal olarak güvenli içerik üretmeye odaklanmıştır. Yalnızca lisanslı içerikler ve açık kaynaklı görsellerle eğitilmiştir. Adobe Creative Cloud uygulamalarıyla (Photoshop, Illustrator vb.) entegre çalışır ve yaratıcı iş akışlarını hızlandırır. Metin-görsel dönüşümünün yanı sıra stil aktarımı, renk düzenleme ve vektör dönüşümü gibi özellikler sunar.",
        website: "https://firefly.adobe.com", tags: ["Görsel Üretimi", "Ticari Kullanım", "Adobe Entegrasyonu"], priceType: "premium", priceText: "Ücretli", rating: 4.7, isPopular: false, isNew: false, category: "gorsel-uretimi", dateAdded: "2023-05-10"
    },
    "canva-ai": {
        id: "canva-ai", name: "Canva AI", description: "Canva'nın tasarım platformuna entegre edilmiş yapay zeka araçları. Text to Image, Magic Media ve Magic Design gibi özelliklerle görsel içerik oluşturabilirsiniz.",
        longDescription: "Canva AI, popüler tasarım platformu Canva'nın içine entegre edilmiş çeşitli yapay zeka özelliklerini içerir. Text to Image ile metin açıklamalarından görseller oluşturabilir, Magic Media ile fotoğrafları düzenleyebilir veya Magic Design ile tam sayfalar tasarlayabilirsiniz. Diğer tasarım araçlarıyla birlikte kullanılabilmesi ve kullanıcı dostu arayüzü ile özellikle tasarım bilgisi olmayan kullanıcılar için idealdir.",
        website: "https://www.canva.com", tags: ["Görsel Üretimi", "Tasarım", "Sosyal Medya"], priceType: "freemium", priceText: "Freemium", rating: 4.5, isPopular: false, isNew: true, category: "gorsel-uretimi", dateAdded: "2023-09-22"
    },
    "nightcafe-creator": {
        id: "nightcafe-creator", name: "NightCafe Creator", description: "Kullanıcı dostu arayüzü ile metin tabanlı görsel oluşturma platformu. Stable Diffusion, DALL-E ve diğer modelleri tek bir platformda birleştirir.",
        longDescription: "NightCafe Creator, çeşitli AI modellerini (Stable Diffusion, DALL-E, CLIP-Guided Diffusion) tek bir kullanıcı dostu platform altında toplayan bir görsel oluşturma aracıdır. Hem başlangıç seviyesindeki kullanıcılar hem de ileri düzey sanatçılar için uygun özellikler sunar. Kredi tabanlı bir sistem kullanır ve günlük ücretsiz krediler verir, böylece ücretsiz olarak da kullanılabilir.",
        website: "https://creator.nightcafe.studio", tags: ["Görsel Üretimi", "Sanat", "Çoklu Model"], priceType: "freemium", priceText: "Freemium", rating: 4.3, isPopular: false, isNew: false, category: "gorsel-uretimi", dateAdded: "2023-01-30"
    },
     "chatgpt": { // Bu zaten data.js'de var, ama buradaki detaylı bilgi daha fazla
        id: "chatgpt", name: "ChatGPT", description: "OpenAI tarafından geliştirilen ileri düzey metin üretim aracı. Blog yazıları, metin özetleme, yazı düzenleme ve yaratıcı içerikler üretebilir.",
        longDescription: "ChatGPT, OpenAI tarafından geliştirilen popüler bir metin üretim yapay zekasıdır. Kullanıcılar için blog yazıları, makaleler, ürün açıklamaları, sosyal medya içerikleri ve e-postalar gibi çeşitli içerikleri hızla oluşturabilir. Aynı zamanda, metin özetleme, dilbilgisi düzeltme ve metin yeniden yazma gibi yeteneklere de sahiptir.",
        website: "https://chat.openai.com", tags: ["Metin Üretimi", "İçerik Yazımı", "Chatbot"], priceType: "freemium", priceText: "Freemium", rating: 4.9, isPopular: true, isNew: false, category: "metin-uretimi", dateAdded: "2023-02-10"
    },
    "jasper-ai": {
        id: "jasper-ai", name: "Jasper AI", description: "Pazarlama ve içerik üretimi için optimize edilmiş yapay zeka destekli yazı asistanı.",
        longDescription: "Jasper AI, içerik üreticileri, pazarlamacılar ve şirketler için geliştirilmiş bir metin üretim aracıdır. Blog yazıları, ürün açıklamaları, sosyal medya gönderileri ve reklam metinleri gibi içerikleri üretmek için optimize edilmiştir. SEO uyumlu içerikler oluşturabilir ve yaratıcı yazım konusunda destek sunar.",
        website: "https://www.jasper.ai", tags: ["Metin Üretimi", "SEO", "Pazarlama"], priceType: "premium", priceText: "Ücretli", rating: 4.8, isPopular: true, isNew: false, category: "metin-uretimi", dateAdded: "2023-03-01"
    },
    // ... detailedTools içindeki diğer araçları da buraya ekleyin
    // (rytr, copy-ai, writesonic, notion-ai, sudowrite, hypotenuse-ai)
    // Hepsinde 'url' alanını 'website' olarak değiştirmeyi unutmayın.
    "rytr": {
        id: "rytr", name: "Rytr", description: "Uygun fiyatlı, hızlı ve etkili metin yazımı için yapay zeka destekli içerik oluşturucu.",
        longDescription: "Rytr, uygun maliyetli ve kullanıcı dostu bir yapay zeka metin üretim aracıdır. Blog yazıları, e-postalar, ürün açıklamaları, hikayeler ve daha fazlası için hızlı içerik oluşturma özellikleri sunar. Hem bireysel kullanıcılar hem de küçük işletmeler için idealdir.",
        website: "https://rytr.me", tags: ["Metin Üretimi", "Hikaye Yazımı", "SEO"], priceType: "freemium", priceText: "Freemium", rating: 4.6, isPopular: false, isNew: false, category: "metin-uretimi", dateAdded: "2023-04-05"
    },
    "copy-ai": {
        id: "copy-ai", name: "Copy.ai", description: "Kreatif içerikler oluşturmak için yapay zeka destekli metin üretim platformu.",
        longDescription: "Copy.ai, reklam metinleri, blog yazıları, sosyal medya gönderileri ve e-posta içerikleri gibi birçok farklı formatta içerik oluşturmak için geliştirilmiş bir yapay zeka aracıdır. Kullanıcı dostu arayüzü sayesinde hızlı ve etkili metin üretimi sağlar.",
        website: "https://www.copy.ai", tags: ["Metin Üretimi", "Reklam Metinleri", "Pazarlama"], priceType: "freemium", priceText: "Freemium", rating: 4.7, isPopular: false, isNew: false, category: "metin-uretimi", dateAdded: "2023-06-15"
    },
    "writesonic": {
        id: "writesonic", name: "Writesonic", description: "Blog yazıları, ürün açıklamaları ve reklam metinleri için AI destekli yazı aracı.",
        longDescription: "Writesonic, pazarlamacılar, blog yazarları ve işletmeler için hızlı ve verimli metin üretimi sunan bir yapay zeka aracıdır. SEO uyumlu içerikler üretmek için geliştirilmiştir ve kullanıcılara etkili pazarlama materyalleri oluşturma konusunda yardımcı olur.",
        website: "https://www.writesonic.com", tags: ["Metin Üretimi", "SEO", "Pazarlama"], priceType: "freemium", priceText: "Freemium", rating: 4.7, isPopular: false, isNew: false, category: "metin-uretimi", dateAdded: "2023-07-20"
    },
    "notion-ai": {
        id: "notion-ai", name: "Notion AI", description: "Notion’un içerik yazımı ve düzenleme için entegre ettiği AI destekli yazı asistanı.",
        longDescription: "Notion AI, Notion kullanıcıları için tasarlanmış, belge oluşturma, özetleme ve içerik geliştirme işlemlerini kolaylaştıran bir yapay zeka asistanıdır. İçerik yazarları, öğrenciler ve profesyoneller için oldukça kullanışlıdır.",
        website: "https://www.notion.so", tags: ["Metin Üretimi", "Doküman Yazımı", "AI Asistan"], priceType: "freemium", priceText: "Freemium", rating: 4.5, isPopular: false, isNew: false, category: "metin-uretimi", dateAdded: "2023-08-01"
    },
    "sudowrite": {
        id: "sudowrite", name: "Sudowrite", description: "Yazarlar için yapay zeka destekli yaratıcı yazım aracı.",
        longDescription: "Sudowrite, roman, kısa hikaye ve yaratıcı yazım süreçlerinde yazarlara yardımcı olmak için tasarlanmış bir AI aracıdır. Yazar blokajını aşmanıza yardımcı olur ve yazılarınızı geliştirmek için öneriler sunar.",
        website: "https://www.sudowrite.com", tags: ["Metin Üretimi", "Yaratıcı Yazım", "Roman Yazımı"], priceType: "premium", priceText: "Ücretli", rating: 4.6, isPopular: false, isNew: false, category: "metin-uretimi", dateAdded: "2023-09-12"
    },
    "hypotenuse-ai": {
        id: "hypotenuse-ai", name: "Hypotenuse AI", description: "E-ticaret ve blog içerikleri üretmek için geliştirilmiş yapay zeka yazı asistanı.",
        longDescription: "Hypotenuse AI, özellikle e-ticaret siteleri ve blog içerikleri oluşturmak için tasarlanmış bir metin üretim aracıdır. Kullanıcı dostu arayüzü sayesinde SEO uyumlu ve kaliteli içerikler üretmeyi kolaylaştırır.",
        website: "https://www.hypotenuse.ai", tags: ["Metin Üretimi", "E-Ticaret", "SEO"], priceType: "premium", priceText: "Ücretli", rating: 4.5, isPopular: false, isNew: false, category: "metin-uretimi", dateAdded: "2023-10-05"
    }
};

module.exports = {
    categoryDetails: categoryDetails,
    detailedTools: detailedTools
};