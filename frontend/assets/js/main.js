// main.js - Ana uygulama başlatma ve yönetim

/**
 * Sayfa tamamen yüklendiğinde çalışacak kod
 */
document.addEventListener('DOMContentLoaded', function() {
    // UI içeriklerini yükle
    initializeApplication();
    
    // URL parametrelerini kontrol et
    checkUrlParameters();
    
    console.log('AI Araçları Rehberi başarıyla yüklendi!');
});

/**
 * Uygulamayı başlat ve temel bileşenleri yükle
 */
function initializeApplication() {
    // Ana sayfa içeriklerini yükle
    if (isHomePage()) {
        UI.renderPopularTools();
        UI.renderCategories();
    }
    
    // Footer yılını güncelle
    UI.updateFooterYear();
    
    // Animasyonları başlat
    initAnimations();
    
    // Responsive özellikler için event listener'lar ekle
    setupResponsiveFeatures();
}

/**
 * Geçerli sayfanın ana sayfa olup olmadığını kontrol et
 * @returns {boolean} Ana sayfada olup olmadığımız
 */
function isHomePage() {
    // URL'yi kontrol et - category-detail.html veya başka bir sayfa değilse ana sayfadır
    const currentPath = window.location.pathname;
    return !currentPath.includes('category-detail.html') && 
           !currentPath.includes('tool-detail.html');
}

/**
 * URL parametrelerini kontrol et ve gerekli işlemleri yap
 */
function checkUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Kategori detay sayfası için - category-detail.js bunu ele alıyor
    const categoryId = urlParams.get('id');
    if (categoryId && window.location.pathname.includes('category-detail.html')) {
        return; // Category detail sayfasında olduğumuz için başka bir şey yapmaya gerek yok
    }
    
    // Ana sayfada özel bir parametre olup olmadığını kontrol et
    const filterCategory = urlParams.get('filter');
    if (filterCategory) {
        scrollToSection('kategoriler');
        highlightCategory(filterCategory);
    }
    
    // Arama parametresi varsa
    const searchQuery = urlParams.get('q');
    if (searchQuery) {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = searchQuery;
            // Arama sonuçlarını göster
            if (window.searchManager) {
                window.searchManager.performSearch();
            } else {
                UI.renderSearchResults(searchQuery);
            }
        }
    }
}

/**
 * Belirli bir bölüme kaydır
 * @param {string} sectionId - Kaydırılacak bölümün ID'si
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

/**
 * Belirli bir kategoriyi vurgula
 * @param {string} categoryId - Vurgulanacak kategorinin ID'si
 */
function highlightCategory(categoryId) {
    const categoryCard = document.querySelector(`.category-card[data-id="${categoryId}"]`);
    if (categoryCard) {
        // Vurgulama efekti ekle
        categoryCard.classList.add('highlight');
        
        // Bir süre sonra vurgulamayı kaldır
        setTimeout(() => {
            categoryCard.classList.remove('highlight');
        }, 2000);
    }
}

/**
 * Animasyonları başlat
 */
function initAnimations() {
    // Görünüm içi elementler için gözlemci oluştur
    if ('IntersectionObserver' in window) {
        const appearOptions = {
            threshold: 0.25,
            rootMargin: "0px 0px -100px 0px"
        };
        
        const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            });
        }, appearOptions);
        
        // Animasyon uygulanacak elementler
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in, .tool-card, .category-card');
        animatedElements.forEach(element => {
            if (!element.classList.contains('fade-in') && !element.classList.contains('slide-in')) {
                element.classList.add('fade-in');
            }
            appearOnScroll.observe(element);
        });
    }
    
    // Sayfa içi bağlantılar için düzgün kaydırma
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Responsive özellikler için ayarlar
 */
function setupResponsiveFeatures() {
    // Mobil menü toggle butonu oluştur
    if (window.innerWidth < 768 && !document.querySelector('.menu-toggle')) {
        createMobileMenuToggle();
    }
    
    // Pencere yeniden boyutlandırıldığında kontrol et
    window.addEventListener('resize', () => {
        if (window.innerWidth < 768 && !document.querySelector('.menu-toggle')) {
            createMobileMenuToggle();
        } else if (window.innerWidth >= 768) {
            // Mobil menü açıksa kapat
            const nav = document.querySelector('header nav');
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
            
            // Toggle butonu varsa kaldır
            const menuToggle = document.querySelector('.menu-toggle');
            if (menuToggle) {
                menuToggle.remove();
            }
        }
    });
}

/**
 * Mobil menü toggle butonu oluştur
 */
function createMobileMenuToggle() {
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    
    const header = document.querySelector('header .container');
    if (header) {
        header.appendChild(menuToggle);
        
        // Toggle butonuna tıklandığında menüyü aç/kapat
        menuToggle.addEventListener('click', () => {
            const nav = document.querySelector('header nav');
            if (nav) {
                nav.classList.toggle('active');
                
                // Menü açıkken toggle simgesini değiştir
                menuToggle.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
            }
        });
    }
}