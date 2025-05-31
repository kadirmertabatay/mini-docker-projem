// search.js - Arama işlevselliği

// Arama işlevlerini yöneten sınıf
class SearchManager {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchButton = document.getElementById('searchButton');
        this.clearSearchButton = document.getElementById('clearSearch');
        this.searchResultsSection = document.getElementById('searchResultsSection');
        
        this.init();
    }
    
    init() {
        // Arama butonuna tıklandığında
        if (this.searchButton) {
            this.searchButton.addEventListener('click', () => this.performSearch());
        }
        
        // Enter tuşuna basıldığında
        if (this.searchInput) {
            this.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
        }
        
        // Temizle butonuna tıklandığında
        if (this.clearSearchButton) {
            this.clearSearchButton.addEventListener('click', () => this.clearSearch());
        }
    }
    
    performSearch() {
        if (!this.searchInput) return;
        
        const searchTerm = this.searchInput.value.toLowerCase().trim();
        if (searchTerm === '') return;
        
        // UI üzerinden arama sonuçlarını göster
        UI.renderSearchResults(searchTerm);
    }
    
    clearSearch() {
        if (this.searchResultsSection) {
            this.searchResultsSection.style.display = 'none';
        }
        
        if (this.searchInput) {
            this.searchInput.value = '';
            this.searchInput.focus();
        }
    }
}

// Arama yöneticisini dışa aktar
window.searchManager = new SearchManager();