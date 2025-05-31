// category-detail.js - Kategori detay sayfası için özel JS işlevleri

document.addEventListener('DOMContentLoaded', function() {
    // URL parametresinden kategori ID'sini al
    const params = new URLSearchParams(window.location.search);
    const categoryId = params.get('id');
    
    if (!categoryId) {
        console.error('Kategori ID bulunamadı!');
        window.location.href = 'index.html';
        return;
    }
    
    // Kategori bilgilerini yükle
    loadCategoryDetail(categoryId);
    
    // Filtre olaylarını ekle
    initializeFilters();
});

// Kategori detaylarını yükle
function loadCategoryDetail(categoryId) {
    // Kategori bilgilerini al
    const categoryDetail = window.aiToolsDetailedData.getCategoryDetail(categoryId);
    if (!categoryDetail) {
        console.error('Kategori bulunamadı:', categoryId);
        window.location.href = 'index.html';
        return;
    }
    
    // Sayfa başlığını güncelle
    document.title = `${categoryDetail.title} | AI Araçları Rehberi`;
    
    // Breadcrumb'ı güncelle
    updateBreadcrumb(categoryDetail.title);
    
    // Kategori başlığını ve açıklamasını güncelle
    updateCategoryHeader(categoryDetail);
    
    // Kategoriye ait araçları yükle
    loadCategoryTools(categoryId);
    
    // Footer kategori listesini güncelle
    UI.updateFooterCategories();
}

// Breadcrumb'ı güncelle
function updateBreadcrumb(categoryTitle) {
    const breadcrumb = document.getElementById('breadcrumb');
    if (!breadcrumb) return;
    
    breadcrumb.innerHTML = `
        <li><a href="../index.html">Ana Sayfa</a></li>
        <li><a href="../index.html#kategoriler">Kategoriler</a></li>
        <li><a href="#">${categoryTitle}</a></li>
    `;
}

// Kategori başlığını güncelle
function updateCategoryHeader(categoryDetail) {
    const categoryHeader = document.getElementById('categoryHeader');
    if (!categoryHeader) return;
    
    // Kategori simgesini belirle
    let categoryIcon = '🖌️'; // Varsayılan simge
    const category = window.aiToolsData.categories.find(cat => cat.name === categoryDetail.title);
    if (category) {
        categoryIcon = category.icon;
    }
    
    categoryHeader.innerHTML = `
        <div class="category-icon-large">${categoryIcon}</div>
        <div class="category-info">
            <h1>${categoryDetail.title}</h1>
            <p>${categoryDetail.description}</p>
        </div>
    `;
}

// Kategoriye ait araçları yükle
function loadCategoryTools(categoryId, filterOptions = {}) {
    const toolsGrid = document.getElementById('toolsGrid');
    if (!toolsGrid) return;
    
    // Varsayılan filtre seçeneklerini ayarla
    const options = {
        sort: filterOptions.sort || 'popular',
        price: filterOptions.price || 'all',
        search: filterOptions.search || ''
    };
    
    // Araçları getir
    let tools = window.aiToolsDetailedData.getToolsByCategory(categoryId);
    
    // Fiyata göre filtrele
    tools = window.aiToolsDetailedData.filterToolsByPrice(tools, options.price);
    
    // Arama teriminde filtrele
    if (options.search) {
        tools = window.aiToolsDetailedData.searchTools(tools, options.search);
    }
    
    // Sırala
    tools = window.aiToolsDetailedData.sortTools(tools, options.sort);
    
    // Araç sayısını kontrol et
    if (tools.length === 0) {
        toolsGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 30px;">
                <h3>Sonuç Bulunamadı</h3>
                <p>Seçtiğiniz filtrelere uygun araç bulunamamıştır. Lütfen filtrelerinizi değiştirin.</p>
            </div>
        `;
        
        // Sayfalama gizle
        document.getElementById('pagination').style.display = 'none';
        return;
    }
    
    // Sayfalamdırma için ayarlar
    const itemsPerPage = 6;
    const currentPage = 1;
    const totalPages = Math.ceil(tools.length / itemsPerPage);
    
    // Geçerli sayfadaki araçları al
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, tools.length);
    const currentPageTools = tools.slice(startIndex, endIndex);
    
    // Grid'i temizle
    toolsGrid.innerHTML = '';
    
    // Araçları ekrana ekle
    currentPageTools.forEach(tool => {
        const toolCard = createToolCard(tool);
        toolsGrid.appendChild(toolCard);
    });
    
    // Sayfalama oluştur
    createPagination(totalPages, currentPage);
}

// Araç kartı oluştur
function createToolCard(tool) {
    const card = document.createElement('div');
    card.className = 'tool-card';
    card.dataset.id = tool.id;
    
    // Badge göster veya gizle
    let badgeHTML = '';
    if (tool.isNew) {
        badgeHTML = '<div class="tool-badge new">Yeni</div>';
    } else if (tool.isPopular) {
        badgeHTML = '<div class="tool-badge popular">Popüler</div>';
    }
    
    // Yıldız değerlendirmesi oluştur
    const fullStars = Math.floor(tool.rating);
    const halfStar = tool.rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let starsHTML = '';
    for (let i = 0; i < fullStars; i++) starsHTML += '★';
    if (halfStar) starsHTML += '★'; // İdeal olarak yarım yıldız olmalı ama basitlik için tam yıldız kullanıyoruz
    for (let i = 0; i < emptyStars; i++) starsHTML += '☆';
    
    // Etiketleri oluştur
    const tagsHTML = tool.tags.map(tag => {
        let tagClass = 'tool-tag';
        if (tool.priceType === 'free') tagClass += ' free';
        else if (tool.priceType === 'premium') tagClass += ' premium';
        return `<span class="${tagClass}">${tag}</span>`;
    }).join('');
    
    // Fiyat etiketi ekle
    const priceTagHTML = `<span class="tool-tag ${tool.priceType}">${tool.priceText}</span>`;
    
    card.innerHTML = `
        <div class="tool-img">
            <div class="tool-img-inner" style="background-color: ${tool.bgColor};">
                <div class="tool-overlay">${tool.name}</div>
            </div>
            ${badgeHTML}
        </div>
        <div class="tool-content">
            <div class="tool-header">
                <div class="tool-title">
                    <h3>${tool.name}</h3>
                </div>
                <div class="tool-rating">
                    ${starsHTML} <span>(${tool.rating.toFixed(1)})</span>
                </div>
            </div>
            <div class="tool-description">
                ${tool.description}
            </div>
            <div class="tool-tags">
                ${tagsHTML}
                ${priceTagHTML}
            </div>
            <div class="tool-actions">
                <a href="${tool.url}" target="_blank" class="tool-btn primary">Ziyaret Et</a>
                <button class="tool-btn secondary">❤️</button>
            </div>
        </div>
    `;
    
    return card;
}

// Sayfalama oluştur
function createPagination(totalPages, currentPage) {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;
    
    pagination.style.display = totalPages <= 1 ? 'none' : 'flex';
    
    if (totalPages <= 1) return;
    
    pagination.innerHTML = '';
    
    // Önceki sayfa butonu
    const prevItem = document.createElement('div');
    prevItem.className = `pagination-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevItem.textContent = '«';
    if (currentPage > 1) {
        prevItem.addEventListener('click', () => changePage(currentPage - 1));
    }
    pagination.appendChild(prevItem);
    
    // Sayfa numaraları
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageItem = document.createElement('div');
        pageItem.className = `pagination-item ${i === currentPage ? 'active' : ''}`;
        pageItem.textContent = i;
        pageItem.addEventListener('click', () => changePage(i));
        pagination.appendChild(pageItem);
    }
    
    // Sonraki sayfa butonu
    const nextItem = document.createElement('div');
    nextItem.className = `pagination-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextItem.textContent = '»';
    if (currentPage < totalPages) {
        nextItem.addEventListener('click', () => changePage(currentPage + 1));
    }
    pagination.appendChild(nextItem);
}

// Sayfa değiştir
function changePage(page) {
    // Burada sayfa değiştirme işlevselliği eklenir
    // Şu an sadece temel yapı için yer tutuyor
    console.log(`Sayfa değiştirildi: ${page}`);
    
    // Gerçek bir uygulamada burada araçları yeniden yükleyecek bir fonksiyon çağrılır
}

// Filtre olaylarını ekle
function initializeFilters() {
    // URL parametresinden kategori ID'sini al
    const params = new URLSearchParams(window.location.search);
    const categoryId = params.get('id');
    
    // Sıralama filtreleri
    const sortOptions = document.querySelectorAll('#sortOptions .filter-option');
    sortOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Aktif sınıfı kaldır
            sortOptions.forEach(opt => opt.classList.remove('active'));
            
            // Aktif sınıfı ekle
            option.classList.add('active');
            
            // Araçları yeniden yükle
            loadCategoryTools(categoryId, {
                sort: option.dataset.sort,
                price: document.querySelector('#priceOptions .filter-option.active').dataset.price,
                search: document.getElementById('categorySearch').value
            });
        });
    });
    
    // Fiyat filtreleri
    const priceOptions = document.querySelectorAll('#priceOptions .filter-option');
    priceOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Aktif sınıfı kaldır
            priceOptions.forEach(opt => opt.classList.remove('active'));
            
            // Aktif sınıfı ekle
            option.classList.add('active');
            
            // Araçları yeniden yükle
            loadCategoryTools(categoryId, {
                sort: document.querySelector('#sortOptions .filter-option.active').dataset.sort,
                price: option.dataset.price,
                search: document.getElementById('categorySearch').value
            });
        });
    });
    
    // Arama
    const searchInput = document.getElementById('categorySearch');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(() => {
            loadCategoryTools(categoryId, {
                sort: document.querySelector('#sortOptions .filter-option.active').dataset.sort,
                price: document.querySelector('#priceOptions .filter-option.active').dataset.price,
                search: searchInput.value
            });
        }, 300));
    }
}

// Debounce fonksiyonu
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}