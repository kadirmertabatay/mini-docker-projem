// assets/js/category-detail.js (API Entegreli)

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('id');

    if (!categoryId) {
        document.body.innerHTML = '<h1>Geçersiz Kategori. Ana Sayfaya Yönlendiriliyorsunuz...</h1>';
        setTimeout(() => { window.location.href = "/index.html"; }, 3000);
        return;
    }

    // Kategori ve araç bilgilerini yükle
    await loadCategoryPageContent(categoryId);

    // Filtreleme ve arama için olay dinleyicilerini ayarla
    setupPageFiltersAndSearch(categoryId);

    // Footer yılını ve kategorilerini güncelle (ui.js'den çağrılabilir veya burada)
    if (window.ui && typeof window.ui.updateFooterYear === 'function') {
        window.ui.updateFooterYear();
    }
    if (window.ui && typeof window.ui.updateFooterCategories === 'function') {
        // updateFooterCategories içindeki linkler /pages/ altında olduğumuz için
        // doğru çalışmalı. Kontrol edilebilir.
        await window.ui.updateFooterCategories();
    }
});

let allToolsForThisCategory = []; // Mevcut kategoriye ait tüm araçları tutmak için

async function loadCategoryPageContent(categoryId) {
    const breadcrumbContainer = document.getElementById('breadcrumb');
    const categoryHeaderContainer = document.getElementById('categoryHeader');
    const toolsGridContainer = document.getElementById('toolsGrid');

    if (breadcrumbContainer) breadcrumbContainer.innerHTML = '<li><a href="/index.html">Ana Sayfa</a></li>'; // Başlangıç breadcrumb
    if (categoryHeaderContainer) categoryHeaderContainer.innerHTML = '<h1>Yükleniyor...</h1>';
    if (toolsGridContainer) toolsGridContainer.innerHTML = '<p>Araçlar yükleniyor...</p>';

    try {
        // API'den kategori detaylarını çek
        const category = await window.api.getCategoryById(categoryId);
        if (category && window.ui) {
            window.ui.displayBreadcrumb(category, 'breadcrumb');
            window.ui.displayCategoryHeader(category, 'categoryHeader');
        } else if (categoryHeaderContainer) {
            categoryHeaderContainer.innerHTML = '<h1>Kategori bulunamadı.</h1>';
            if (window.ui) window.ui.displayBreadcrumb(null, 'breadcrumb'); // Sadece Ana Sayfa kalsın
        }

        // API'den bu kategoriye ait araçları çek
        const tools = await window.api.getTools(`?category=${categoryId}`);
        if (tools) {
            allToolsForThisCategory = tools; // Araçları global değişkende sakla
            applyFiltersAndSorting(); // Filtreleri ve sıralamayı uygula
        } else if (toolsGridContainer) {
            toolsGridContainer.innerHTML = '<p class="no-results">Bu kategoriye ait araç bulunamadı.</p>';
        }

    } catch (error) {
        console.error("Error loading category page content:", error);
        if (categoryHeaderContainer) categoryHeaderContainer.innerHTML = '<h1>Sayfa yüklenirken bir hata oluştu.</h1>';
        if (toolsGridContainer) toolsGridContainer.innerHTML = '<p class="no-results">Araçlar yüklenemedi.</p>';
    }
}

function setupPageFiltersAndSearch(categoryId) {
    const sortOptions = document.getElementById('sortOptions');
    const priceOptions = document.getElementById('priceOptions');
    const categorySearchInput = document.getElementById('categorySearch');

    const handleFilterChange = () => applyFiltersAndSorting();

    if (sortOptions) {
        sortOptions.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                if (sortOptions.querySelector('.active')) {
                    sortOptions.querySelector('.active').classList.remove('active');
                }
                event.target.classList.add('active');
                handleFilterChange();
            }
        });
    }

    if (priceOptions) {
        priceOptions.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                if (priceOptions.querySelector('.active')) {
                    priceOptions.querySelector('.active').classList.remove('active');
                }
                event.target.classList.add('active');
                handleFilterChange();
            }
        });
    }

    if (categorySearchInput) {
        categorySearchInput.addEventListener('input', debounce(handleFilterChange, 300)); // Arama için debounce
    }
}

function applyFiltersAndSorting() {
    if (!window.ui) {
        console.error("UI object not available for applying filters.");
        return;
    }

    let filteredTools = [...allToolsForThisCategory]; // Her zaman orijinal listeyle başla

    // Fiyat Filtresi
    const activePriceFilter = document.querySelector('#priceOptions .active');
    if (activePriceFilter) {
        const priceType = activePriceFilter.dataset.price; // "all", "free", "freemium", "premium"
        if (priceType !== 'all') {
            // API'den gelen pricing alanı "Free", "Freemium", "Paid" şeklinde olmalı.
            // data-price değerleri API'den gelenlerle (küçük harfe çevrilmiş) eşleşmeli.
            filteredTools = filteredTools.filter(tool => tool.pricing && tool.pricing.toLowerCase() === priceType);
        }
    }

    // Kategori İçi Arama Filtresi
    const categorySearchInput = document.getElementById('categorySearch');
    if (categorySearchInput) {
        const searchTerm = categorySearchInput.value.toLowerCase().trim();
        if (searchTerm) {
            filteredTools = filteredTools.filter(tool =>
                (tool.name && tool.name.toLowerCase().includes(searchTerm)) ||
                (tool.description && tool.description.toLowerCase().includes(searchTerm)) ||
                (tool.tags && Array.isArray(tool.tags) && tool.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
            );
        }
    }

    // Sıralama
    const activeSortOption = document.querySelector('#sortOptions .active');
    if (activeSortOption) {
        const sortType = activeSortOption.dataset.sort; // "popular", "newest", "name"
        switch (sortType) {
            case 'popular':
                filteredTools.sort((a, b) => (b.isPopular - a.isPopular) || (parseFloat(b.rating || 0) - parseFloat(a.rating || 0)));
                break;
            case 'newest':
                // dateAdded alanı API'den Date string veya timestamp olarak gelmeli
                filteredTools.sort((a, b) => new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0));
                break;
            case 'name':
                filteredTools.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
                break;
        }
    }

    window.ui.displayTools(filteredTools, 'toolsGrid'); // UI'da araçları göster

    // TODO: Sayfalama mantığı buraya eklenebilir.
    // Şimdilik sayfalama HTML'i boş kalacak veya gizlenecek.
    const paginationContainer = document.getElementById('pagination');
    if (paginationContainer) paginationContainer.innerHTML = ''; // Veya gizle
}

// Debounce fonksiyonu (arama input'u için)
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}