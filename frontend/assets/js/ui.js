// ui.js - UI elemanlarını oluşturma ve güncelleme (API Entegreli)

const UI = {
    // Araç kartı oluştur
    // ui.js - createToolCard fonksiyonu GÜNCELLENMİŞ

// ui.js - createToolCard fonksiyonu (SADECE RENKLİ BAŞLIK VERSİYONU)

// ui.js - createToolCard fonksiyonu (Orijinal Yapıya Sadık Kalarak)

createToolCard: function(tool) {
    // console.log('Original Structure - Tool Data:', tool); // DEBUG

    const toolCardElement = document.createElement('div');
    toolCardElement.className = 'tool-card'; // Orijinaldeki sınıf adı
    toolCardElement.dataset.id = tool.id;

    // API'den tool.bgColor ve tool.color gelmeli.
    const bgColor = tool.bgColor || '#f0f2f5'; // Varsayılan arkaplan rengi
    const textColor = tool.color || '#333333';   // Varsayılan metin rengi

    // isColorDark fonksiyonu orijinal UI nesnenizde vardı, onu da eklemeyi unutmayın.
    // Şimdilik olmadığını varsayarak overlayColor'ı basitçe tanımlıyorum.
    // Eğer varsa: const isDarkBg = UI.isColorDark(bgColor); (veya this.isColorDark)
    // const overlayColor = isDarkBg ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)';
    // Basit bir overlay rengi (isColorDark olmadan):
    const overlayColor = 'rgba(0,0,0,0.1)'; // Hafif karartma, veya bunu kaldırabilirsiniz

    // Orijinaldeki placeholder API'si yerine lokal bir placeholder kullanıyoruz.
    // Eğer /api/placeholder endpoint'iniz varsa, orijinaldeki gibi kullanın:
    // const placeholderImageUrl = `/api/placeholder/300/160`;
    const placeholderImageUrl = '/assets/images/placeholder-300x160.png'; // Lokal placeholder

    toolCardElement.innerHTML = `
        <div class="tool-img" style="background-color: ${bgColor}; background-image: url('${placeholderImageUrl}'); background-size: cover; background-position: center;">
            <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: ${overlayColor};">
                <span style="font-weight: bold; color: ${textColor}; font-size: 1.5rem; text-align: center; padding: 5px;">${tool.name || 'İsim Yok'}</span>
            </div>
        </div>
        <div class="tool-content">
            <h4>${tool.name || 'İsim Yok'}</h4>
            <div class="tool-tags">
                ${tool.tags && Array.isArray(tool.tags) ? tool.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
            </div>
            <p>${tool.description || 'Açıklama mevcut değil.'}</p>
            <a href="${tool.website || '#'}" target="_blank">Ziyaret Et</a>
        </div>
    `;
    
    return toolCardElement;
},

// isColorDark fonksiyonu (orijinalden alındığı varsayılarak)
// Bu fonksiyonun UI nesnesi içinde veya globalde olması gerekir.
// UI nesnesi içindeyse: UI.isColorDark veya this.isColorDark
isColorDark: function(hexColor) {
    if (!hexColor || !hexColor.startsWith('#')) return false; // Geçersiz hex ise false dön

    let r, g, b;
    const hex = hexColor.substring(1);
    if (hex.length === 3) { // Kısa hex formatı (#RGB)
        r = parseInt(hex.substring(0, 1) + hex.substring(0, 1), 16);
        g = parseInt(hex.substring(1, 2) + hex.substring(1, 2), 16);
        b = parseInt(hex.substring(2, 3) + hex.substring(2, 3), 16);
    } else if (hex.length === 6) { // Uzun hex formatı (#RRGGBB)
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
    } else {
        return false; // Geçersiz hex uzunluğu
    }
    
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
},

// ... (ui.js'in geri kalanı: createCategoryCard, renderPopularTools, renderCategories vb. aynı kalabilir)
// window.ui = UI; satırı en sonda olmalı.

// ... (ui.js'in geri kalanı aynı, createCategoryCard ve diğer render fonksiyonları)
// Özellikle renderPopularTools, renderCategories, displaySearchResults fonksiyonları bu yeni createToolCard'ı kullanacak.
// window.ui = UI; satırı en sonda olmalı.

    // Kategori kartı oluştur (Bu fonksiyonu da ilk haline benzetmek gerekebilir)
    createCategoryCard: function(category) {
        // ... (Bu fonksiyonun da benzer şekilde güncellenmesi gerekebilir) ...
        // Şimdilik aynı bırakıyorum, odak noktamız tool card.
        const categoryCardElement = document.createElement('div');
        categoryCardElement.className = 'category-card';
        categoryCardElement.dataset.id = category.id;
        categoryCardElement.innerHTML = `
            <a href="/pages/category-detail.html?id=${category.id}" class="main-link">
                <div class="category-icon">${category.icon || '📁'}</div>
                <h4>${category.name || 'Kategori Adı Yok'}</h4>
                <p>${(category.description || '').substring(0, 70)}${(category.description || '').length > 70 ? '...' : ''}</p>
            </a>
        `;
        return categoryCardElement;
    },

    // Diğer UI fonksiyonları (renderPopularTools, renderCategories vb.) aynı kalabilir,
    // çünkü createToolCard ve createCategoryCard'ı çağırıyorlar.
    // Sadece bu çağıran fonksiyonların stillerle uyumlu olduğundan emin olun.

    // Popüler araçları API'den çekip göster
    renderPopularTools: async function() {
        const container = document.getElementById('popularToolsList');
        if (!container) { console.error("Popular tools container not found"); return; }
        container.innerHTML = '<p>Yükleniyor...</p>';

        try {
            // _limit yerine limit kullanıyorum, backend'de buna göre ayarlanmalı.
            // Ya da backend'de limit için bir standart belirleyin (?limit=X veya ?_limit=X)
            const popularTools = await window.api.getTools('?isPopular=true&limit=6');
            if (popularTools && popularTools.length > 0) {
                container.innerHTML = '';
                popularTools.forEach(tool => {
                    const toolCard = this.createToolCard(tool);
                    container.appendChild(toolCard);
                });
            } else {
                container.innerHTML = '<p class="no-results">Popüler araç bulunamadı.</p>';
            }
        } catch (error) {
            console.error("Error fetching popular tools:", error);
            container.innerHTML = '<p class="no-results">Popüler araçlar yüklenirken bir hata oluştu.</p>';
        }
    },

    renderCategories: async function() {
        const container = document.getElementById('categoryList');
        if (!container) { console.error("Category list container not found"); return; }
        container.innerHTML = '<p>Yükleniyor...</p>';

        try {
            const categories = await window.api.getCategories();
            if (categories && categories.length > 0) {
                container.innerHTML = '';
                categories.forEach(category => {
                    const categoryCard = this.createCategoryCard(category);
                    container.appendChild(categoryCard);
                });
            } else {
                container.innerHTML = '<p class="no-results">Kategori bulunamadı.</p>';
            }
            await this.updateFooterCategories();
        } catch (error) {
            console.error("Error fetching categories:", error);
            container.innerHTML = '<p class="no-results">Kategoriler yüklenirken bir hata oluştu.</p>';
        }
    },

    updateFooterCategories: async function() {
        const footerCategoriesEl = document.getElementById('footerCategories');
        if (!footerCategoriesEl) return;

        try {
            const categories = await window.api.getCategories();
            if (categories && categories.length > 0) {
                footerCategoriesEl.innerHTML = '';
                categories.slice(0, 5).forEach(category => {
                    const li = document.createElement('li');
                    const linkPath = window.location.pathname.includes('/pages/') ? `category-detail.html?id=${category.id}` : `pages/category-detail.html?id=${category.id}`;
                    li.innerHTML = `<a href="${linkPath}">${category.name}</a>`;
                    footerCategoriesEl.appendChild(li);
                });
            }
        } catch (error) {
            console.error("Error fetching categories for footer:", error);
        }
    },

    displaySearchResults: function(tools, containerId) {
        const container = document.getElementById(containerId);
        if (!container) { console.error(`Search results container "${containerId}" not found`); return; }

        if (tools && tools.length > 0) {
            container.innerHTML = '';
            tools.forEach(tool => {
                const toolCard = this.createToolCard(tool);
                container.appendChild(toolCard);
            });
        } else {
            container.innerHTML = `<p class="no-results">Arama sonucu bulunamadı.</p>`;
        }
    },

    displayCategoryHeader: function(category, containerId) {
        const container = document.getElementById(containerId);
        if (container && category) {
            container.innerHTML = `
                <div class="category-icon-large">${category.icon || '📁'}</div>
                <div class="category-info">
                    <h1>${category.name || 'Kategori'}</h1>
                    <p>${category.longDescription || category.description || 'Açıklama yok.'}</p>
                </div>
            `;
        } else if (container) {
            container.innerHTML = '<h1>Kategori bilgisi bulunamadı.</h1>';
        }
    },
    displayBreadcrumb: function(category, containerId) {
        const container = document.getElementById(containerId);
         if (container && category) {
            container.innerHTML = `
                <li><a href="/index.html">Ana Sayfa</a></li>
                <li><a href="#">${category.name || 'Kategori'}</a></li>
            `;
        } else if (container) {
            container.innerHTML = `<li><a href="/index.html">Ana Sayfa</a></li>`;
        }
    },

    updateFooterYear: function() {
        const yearEl = document.getElementById('currentYear');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    }
};

window.ui = UI;