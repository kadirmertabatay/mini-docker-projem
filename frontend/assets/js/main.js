// main.js - Ana sayfa mantığı (API Entegreli)

document.addEventListener('DOMContentLoaded', async () => {
    // Popüler araçları ve kategorileri yükle
    // ui.js'deki render fonksiyonları artık async olduğu için await ile çağırıyoruz
    if (window.ui && typeof window.ui.renderPopularTools === 'function') {
        await window.ui.renderPopularTools();
    } else {
        console.error('ui.renderPopularTools function not found. Make sure ui.js is loaded correctly and window.ui is defined.');
        const popularToolsList = document.getElementById('popularToolsList');
        if (popularToolsList) popularToolsList.innerHTML = '<p>Popüler araçlar yüklenemedi (UI hatası).</p>';
    }

    if (window.ui && typeof window.ui.renderCategories === 'function') {
        await window.ui.renderCategories(); // Bu fonksiyon içinde updateFooterCategories de çağrılıyor
    } else {
        console.error('ui.renderCategories function not found.');
        const categoryList = document.getElementById('categoryList');
        if (categoryList) categoryList.innerHTML = '<p>Kategoriler yüklenemedi (UI hatası).</p>';
    }

    // Yıl bilgisini güncelle (ui.js'den çağrılabilir veya burada kalabilir)
    if (window.ui && typeof window.ui.updateFooterYear === 'function') {
        window.ui.updateFooterYear();
    } else {
        const currentYearSpan = document.getElementById('currentYear');
        if (currentYearSpan) {
            currentYearSpan.textContent = new Date().getFullYear();
        }
    }

    // Arama butonu olay dinleyicileri
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const clearSearchButton = document.getElementById('clearSearch');

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                performSearch();
            }
        });
    }
    if (clearSearchButton) {
        clearSearchButton.addEventListener('click', clearSearchResultsAndShowMain);
    }
});

// Arama Fonksiyonları
async function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim();
    const searchResultsSection = document.getElementById('searchResultsSection');
    const searchResultsContainer = document.getElementById('searchResults');
    const resultsTitle = document.getElementById('resultsTitle');

    // Ana içerik bölümlerini gizle
    const popularSection = document.getElementById('populer');
    const categoriesSection = document.getElementById('kategoriler');
    if(popularSection) popularSection.style.display = 'none';
    if(categoriesSection) categoriesSection.style.display = 'none';


    if (!searchResultsContainer || !resultsTitle || !searchResultsSection) {
        console.error('Search result elements not found.');
        return;
    }

    if (searchTerm === '') {
        searchResultsContainer.innerHTML = '<p class="no-results">Lütfen bir arama terimi girin.</p>';
        resultsTitle.textContent = 'Arama Sonuçları';
        searchResultsSection.style.display = 'block';
        return;
    }

    resultsTitle.textContent = `"${searchTerm}" için sonuçlar`;
    searchResultsContainer.innerHTML = '<p>Aranıyor...</p>'; // Yükleniyor mesajı
    searchResultsSection.style.display = 'block';

    try {
        // API'den arama yap (Backend'de ?search=term veya ?name_like=term gibi bir endpoint olmalı)
        // Şimdilik tüm araçları çekip frontend'de filtreliyoruz, bu ideal değil.
        // Önerilen: const searchResults = await window.api.getTools(`?q=${encodeURIComponent(searchTerm)}`);
        // Bu `q` parametresini backend'de işlemeniz gerekir.

        const allTools = await window.api.getTools(); // Tüm araçları çek
        if (allTools) {
            const lowerSearchTerm = searchTerm.toLowerCase();
            const filteredTools = allTools.filter(tool =>
                (tool.name && tool.name.toLowerCase().includes(lowerSearchTerm)) ||
                (tool.description && tool.description.toLowerCase().includes(lowerSearchTerm)) ||
                (tool.tags && Array.isArray(tool.tags) && tool.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm)))
            );

            if (window.ui && typeof window.ui.displaySearchResults === 'function') {
                window.ui.displaySearchResults(filteredTools, 'searchResults');
            } else {
                 console.error('ui.displaySearchResults function not found.');
                 searchResultsContainer.innerHTML = '<p class="no-results">Arama sonuçları gösterilemedi (UI hatası).</p>';
            }

            if (filteredTools.length === 0) {
                 resultsTitle.textContent = `"${searchTerm}" için sonuç bulunamadı`;
            }

        } else {
            searchResultsContainer.innerHTML = '<p class="no-results">Arama sırasında bir hata oluştu veya araç bulunamadı.</p>';
        }
    } catch (error) {
        console.error('Error during search:', error);
        searchResultsContainer.innerHTML = '<p class="no-results">Arama sırasında bir hata oluştu.</p>';
    }
}

function clearSearchResultsAndShowMain() {
    const searchInput = document.getElementById('searchInput');
    const searchResultsSection = document.getElementById('searchResultsSection');
    const searchResultsContainer = document.getElementById('searchResults');

    if(searchInput) searchInput.value = '';
    if(searchResultsContainer) searchResultsContainer.innerHTML = '';
    if(searchResultsSection) searchResultsSection.style.display = 'none';

    // Ana içerik bölümlerini tekrar görünür yap
    const popularSection = document.getElementById('populer');
    const categoriesSection = document.getElementById('kategoriler');
    if(popularSection) popularSection.style.display = 'block'; // veya 'flex', 'grid' vb. orijinal display değeri
    if(categoriesSection) categoriesSection.style.display = 'block'; // veya 'flex', 'grid' vb. orijinal display değeri
}