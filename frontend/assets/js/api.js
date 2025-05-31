// api.js - Backend API ile iletişim kurmak için yardımcı fonksiyonlar

const API_BASE_URL = 'http://localhost:3000/api'; // Backend API'mizin adresi (docker-compose'da backend 3000 portunda)

async function fetchData(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch data from ${endpoint}:`, error);
        // Kullanıcıya bir hata mesajı göstermek için UI'ı güncelleyebilirsiniz
        return null; // veya boş bir array/object dönebilirsiniz
    }
}

// İhtiyaç duyulacak spesifik API çağrıları
const api = {
    getTools: (queryParams = '') => fetchData(`/tools${queryParams}`), // Örn: ?category=catID&isPopular=true
    getToolById: (id) => fetchData(`/tools/${id}`),
    getCategories: () => fetchData(`/categories`),
    getCategoryById: (id) => fetchData(`/categories/${id}`),
    // Arama için bir endpoint'iniz varsa:
    // searchAll: (term) => fetchData(`/search?q=${encodeURIComponent(term)}`),
};

window.api = api;

// Eğer bu dosyayı ayrı bir script olarak yüklüyorsanız, global scope'a ekleyebilirsiniz:
// window.apiService = api;
// Veya ES6 modülü olarak kullanacaksanız:
// export default api;