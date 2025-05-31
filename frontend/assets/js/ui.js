// ui.js - UI oluşturan fonksiyonlar

// UI işlemlerini gerçekleştiren nesneler
const UI = {
    // Araç kartı oluştur
    createToolCard: function(tool) {
        const toolCard = document.createElement('div');
        toolCard.className = 'tool-card';
        toolCard.dataset.id = tool.id;
        
        const isDarkBg = this.isColorDark(tool.bgColor);
        const overlayColor = isDarkBg ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)';
        
        toolCard.innerHTML = `
            <div class="tool-img" style="background-color: ${tool.bgColor}; background-image: url('/api/placeholder/300/160'); background-size: cover; background-position: center;">
                <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: ${overlayColor};">
                    <span style="font-weight: bold; color: ${tool.color}; font-size: 1.5rem;">${tool.name}</span>
                </div>
            </div>
            <div class="tool-content">
                <h4>${tool.name}</h4>
                <div class="tool-tags">
                    ${tool.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <p>${tool.description}</p>
                <a href="${tool.url}" target="_blank">Ziyaret Et</a>
            </div>
        `;
        
        return toolCard;
    },
    
    // Kategori kartı oluştur
    createCategoryCard: function(category) {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.dataset.id = category.id;
        
        let subcategoryHTML = '';
        category.subcategories.forEach(sub => {
            subcategoryHTML += `
                <div class="subcategory-item">
                    <a href="${sub.url}" target="_blank" class="subcategory-link">${sub.name}</a>
                </div>
            `;
        });
        
        categoryCard.innerHTML = `
            <div class="category-icon">${category.icon}</div>
            <h4>${category.name}</h4>
            <p>${category.description}</p>
            <div class="subcategories">
                <div class="subcategory-list">
                    ${subcategoryHTML}
                </div>
            </div>
            <a href="pages/category-detail.html?id=${category.id}" class="main-link">Tümünü Gör</a>
        `;
        
        return categoryCard;
    },
    
    // Arama sonuç öğesi oluştur
    createSearchResultItem: function(result) {
        if (result.type === 'tool') {
            // Araç için sonuç kartı oluştur
            return this.createToolCard(result);
        } else if (result.type === 'subcategory') {
            // Alt kategori için sonuç öğesi oluştur
            const resultDiv = document.createElement('div');
            resultDiv.className = 'search-result-item';
            resultDiv.innerHTML = `
                <h4>${result.name}</h4>
                <p>Kategori: ${result.parentName}</p>
                <a href="${result.url}" target="_blank" class="result-link">Ziyaret Et</a>
            `;
            return resultDiv;
        }
    },
    
    // Popüler araçları göster
    renderPopularTools: function() {
        const popularTools = window.aiToolsData.getPopularTools();
        const container = document.getElementById('popularToolsList');
        
        if (!container) return;
        
        container.innerHTML = '';
        popularTools.forEach(tool => {
            const toolCard = this.createToolCard(tool);
            container.appendChild(toolCard);
        });
    },
    
    // Kategorileri göster
    renderCategories: function() {
        const categories = window.aiToolsData.categories;
        const container = document.getElementById('categoryList');
        
        if (!container) return;
        
        container.innerHTML = '';
        categories.forEach(category => {
            const categoryCard = this.createCategoryCard(category);
            container.appendChild(categoryCard);
        });
        
        // Footer kategorilerini de güncelle
        this.updateFooterCategories();
    },
    
    // Footer kategorilerini güncelle
    updateFooterCategories: function() {
        const footerCategories = document.getElementById('footerCategories');
        
        if (!footerCategories) return;
        
        footerCategories.innerHTML = '';
        
        // İlk 4 kategoriyi al
        const topCategories = window.aiToolsData.categories.slice(0, 4);
        
        topCategories.forEach(category => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="pages/category-detail.html?id=${category.id}">${category.name}</a>`;
            footerCategories.appendChild(li);
        });
        
        // "Tüm Kategoriler" bağlantısını ekle
        const allCategoriesLi = document.createElement('li');
        allCategoriesLi.innerHTML = '<a href="#">Tüm Kategoriler</a>';
        footerCategories.appendChild(allCategoriesLi);
    },
    
    // Arama sonuçlarını göster
    renderSearchResults: function(searchTerm) {
        const searchResults = document.getElementById('searchResults');
        const resultsTitle = document.getElementById('resultsTitle');
        const resultsSection = document.getElementById('searchResultsSection');
        
        if (!searchResults || !resultsTitle || !resultsSection) return;
        
        searchResults.innerHTML = '';
        
        // Araçlarda ve kategorilerde ara
        const toolResults = window.aiToolsData.searchTools(searchTerm);
        const categoryResults = window.aiToolsData.searchCategories(searchTerm);
        
        // Araçları "tool" tipi ile işaretle
        const formattedToolResults = toolResults.map(tool => ({...tool, type: 'tool'}));
        
        // Tüm sonuçları birleştir
        const allResults = [...formattedToolResults, ...categoryResults];
        
        if (allResults.length === 0) {
            // Sonuç bulunamadı
            searchResults.innerHTML = `
                <div class="no-results">
                    <p>"${searchTerm}" için sonuç bulunamadı.</p>
                    <p>Farklı anahtar kelimelerle tekrar deneyin.</p>
                </div>
            `;
        } else {
            // Sonuçları ekrana yazdır
            allResults.forEach(result => {
                const resultItem = this.createSearchResultItem(result);
                if (resultItem) {
                    searchResults.appendChild(resultItem);
                }
            });
            
            // Başlığı güncelle
            resultsTitle.innerText = `"${searchTerm}" için ${allResults.length} sonuç bulundu`;
        }
        
        // Sonuç bölümünü görünür yap
        resultsSection.style.display = 'block';
        
        // Sayfayı sonuçlara kaydır
        resultsSection.scrollIntoView({behavior: 'smooth'});
    },
    
    // Rengin koyu olup olmadığını kontrol et
    isColorDark: function(hexColor) {
        // HEX rengi RGB'ye çevir
        let r, g, b;
        
        if (hexColor.startsWith('#')) {
            const hex = hexColor.substring(1);
            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);
        } else {
            // RGB ya da RGBA formatı için basit bir çözüm
            return false;
        }
        
        // Parlaklık hesapla (YIQ formülü)
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        
        // 128'den küçükse koyu
        return brightness < 128;
    },
    
    // Footer yılını güncelle
    updateFooterYear: function() {
        const yearEl = document.getElementById('currentYear');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    }
};