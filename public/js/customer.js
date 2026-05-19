let allProducts = [];
let allCategories = [];

// Load data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    loadProducts();
    setupEventListeners();
});

// Load categories
async function loadCategories() {
    try {
        const response = await fetch('/api/categories');
        allCategories = await response.json();
        
        const select = document.getElementById('categoryFilter');
        allCategories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

// Load all products
async function loadProducts() {
    try {
        const response = await fetch('/api/products');
        allProducts = await response.json();
        displayProducts(allProducts);
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Display products
function displayProducts(products) {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';

    if (products.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">Không có sản phẩm nào</p>';
        return;
    }

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const statusClass = product.status === 'Còn hàng' ? 'status-available' : 'status-unavailable';
        
        card.innerHTML = `
            <img src="${product.image_url || 'https://via.placeholder.com/200'}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/200'">
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${Number(product.price).toLocaleString('vi-VN')} VND</div>
                <div class="product-description">${product.description || 'Không có mô tả'}</div>
                <span class="product-status ${statusClass}">${product.status}</span>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Setup filters
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');

    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
}

// Filter products
function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoryId = document.getElementById('categoryFilter').value;

    const filtered = allProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                            (product.description && product.description.toLowerCase().includes(searchTerm));
        const matchesCategory = !categoryId || product.category_id == categoryId;
        
        return matchesSearch && matchesCategory;
    });

    displayProducts(filtered);
}
