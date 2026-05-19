// ===== DATA =====
let products = [
    { id: 1, name: 'Espresso', price: 35000, category: 1, status: 'Còn hàng', description: 'Cà phê đen đậm đà', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=400&h=400&fit=crop' },
    { id: 2, name: 'Cappuccino', price: 45000, category: 1, status: 'Còn hàng', description: 'Cà phê với sữa và bọt', image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=400&fit=crop' },
    { id: 3, name: 'Latte', price: 50000, category: 1, status: 'Còn hàng', description: 'Cà phê sữa mịn mềm', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop' },
    { id: 4, name: 'Americano', price: 40000, category: 1, status: 'Còn hàng', description: 'Cà phê đen lạnh', image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=400&fit=crop' },
    { id: 5, name: 'Mocha', price: 48000, category: 1, status: 'Còn hàng', description: 'Cà phê với socola', image: 'https://images.unsplash.com/photo-1578432291840-8d1c51dc1cff?w=400&h=400&fit=crop' },
    { id: 6, name: 'Macchiato', price: 42000, category: 1, status: 'Hết hàng', description: 'Cà phê với nước cà phê đậc', image: 'https://images.unsplash.com/photo-1540521613408-0ee4e6ff7ee2?w=400&h=400&fit=crop' },
    { id: 7, name: 'Cà phê Phèn', price: 25000, category: 2, status: 'Còn hàng', description: 'Cà phê truyền thống kinh điển', image: 'https://images.unsplash.com/photo-1533936886934-e8f0fb1d5a37?w=400&h=400&fit=crop' },
    { id: 8, name: 'Cà phê Đen Đá', price: 30000, category: 2, status: 'Còn hàng', description: 'Cà phê đen lạnh sảng khoái', image: 'https://images.unsplash.com/photo-1582290591522-91b3f5af1b7e?w=400&h=400&fit=crop' },
    { id: 9, name: 'Cà phê Sữa Đá', price: 35000, category: 2, status: 'Còn hàng', description: 'Cà phê sữa lạnh đậm đà', image: 'https://images.unsplash.com/photo-1571115764595-644a76fb6598?w=400&h=400&fit=crop' },
    { id: 10, name: 'Trà Ổi', price: 35000, category: 3, status: 'Còn hàng', description: 'Trà ổi tươi mát', image: 'https://images.unsplash.com/photo-1597318972632-1fe76b3d69e5?w=400&h=400&fit=crop' },
    { id: 11, name: 'Trà Chanh', price: 30000, category: 3, status: 'Còn hàng', description: 'Trà chanh tính lạnh', image: 'https://images.unsplash.com/photo-1606312519070-d91602b53ce4?w=400&h=400&fit=crop' },
    { id: 12, name: 'Trà Thanh Yên', price: 32000, category: 3, status: 'Còn hàng', description: 'Trà thanh yên thơm ngon', image: 'https://images.unsplash.com/photo-1597318972632-1fe76b3d69e5?w=400&h=400&fit=crop' }
];

const categories = {
    1: 'Cà phê pha máy',
    2: 'Cà phê truyền thống',
    3: 'Trà trái cây'
};

let editingId = null;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    displayCustomerProducts();
    updateStats();
    displayAdminProducts();
    setupEventListeners();
});

// ===== LOCAL STORAGE =====
function saveToLocalStorage() {
    localStorage.setItem('coffeeProducts', JSON.stringify(products));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('coffeeProducts');
    if (saved) products = JSON.parse(saved);
}

// ===== SECTION TOGGLE =====
document.getElementById('btnCustomer').addEventListener('click', () => {
    switchSection('customer');
});

document.getElementById('btnAdmin').addEventListener('click', () => {
    switchSection('admin');
});

function switchSection(section) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

    if (section === 'customer') {
        document.getElementById('customerSection').classList.add('active');
        document.getElementById('btnCustomer').classList.add('active');
    } else {
        document.getElementById('adminSection').classList.add('active');
        document.getElementById('btnAdmin').classList.add('active');
        displayAdminProducts();
        updateStats();
    }
}

// ===== CUSTOMER SECTION =====
function displayCustomerProducts(filtered = null) {
    const grid = document.getElementById('productsGrid');
    const data = filtered || products;

    grid.innerHTML = '';

    if (data.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">Không có sản phẩm nào</p>';
        return;
    }

    data.forEach(product => {
        const statusClass = product.status === 'Còn hàng' ? 'status-available' : 'status-unavailable';
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/200?text=Coffee'">
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${Number(product.price).toLocaleString('vi-VN')} VND</div>
                <div class="product-description">${product.description}</div>
                <span class="product-status ${statusClass}">${product.status}</span>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ===== FILTERS =====
function setupEventListeners() {
    document.getElementById('searchInput').addEventListener('input', filterProducts);
    document.getElementById('categoryFilter').addEventListener('change', filterProducts);
    document.getElementById('productForm').addEventListener('submit', handleFormSubmit);
    document.getElementById('btnCancelEdit').addEventListener('click', cancelEdit);
}

function filterProducts() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;

    const filtered = products.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search);
        const matchCategory = !category || p.category == category;
        return matchSearch && matchCategory;
    });

    displayCustomerProducts(filtered);
}

// ===== ADMIN SECTION =====
function displayAdminProducts() {
    const tbody = document.getElementById('adminProductsTable');
    tbody.innerHTML = '';

    products.forEach(product => {
        const statusClass = product.status === 'Còn hàng' ? 'status-available' : 'status-unavailable';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${Number(product.price).toLocaleString('vi-VN')} VND</td>
            <td>${categories[product.category]}</td>
            <td><span class="product-status ${statusClass}">${product.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-edit" onclick="editProduct(${product.id})">✏️ Sửa</button>
                    <button class="btn-danger" onclick="deleteProduct(${product.id})">🗑️ Xóa</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function updateStats() {
    document.getElementById('totalProducts').textContent = products.length;
    document.getElementById('inStockCount').textContent = products.filter(p => p.status === 'Còn hàng').length;
    document.getElementById('outOfStockCount').textContent = products.filter(p => p.status === 'Hết hàng').length;
}

// ===== FORM HANDLING =====
function handleFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('productName').value.trim();
    const price = parseFloat(document.getElementById('productPrice').value);
    const category = document.getElementById('productCategory').value;
    const status = document.getElementById('productStatus').value;
    const description = document.getElementById('productDescription').value;
    const image = document.getElementById('productImage').value;

    // Validation
    if (!name) {
        alert('❌ Tên sản phẩm không được để trống');
        return;
    }
    if (price <= 0) {
        alert('❌ Giá phải lớn hơn 0');
        return;
    }
    if (!category) {
        alert('❌ Vui lòng chọn danh mục');
        return;
    }

    if (editingId) {
        // Update
        const product = products.find(p => p.id === editingId);
        if (product) {
            product.name = name;
            product.price = price;
            product.category = parseInt(category);
            product.status = status;
            product.description = description;
            product.image = image;
        }
        cancelEdit();
        alert('✅ Sản phẩm cập nhật thành công!');
    } else {
        // Create
        const newProduct = {
            id: Math.max(...products.map(p => p.id), 0) + 1,
            name, price, category: parseInt(category), status, description, image
        };
        products.push(newProduct);
        alert('✅ Sản phẩm thêm thành công!');
    }

    saveToLocalStorage();
    document.getElementById('productForm').reset();
    displayAdminProducts();
    updateStats();
    displayCustomerProducts();
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    editingId = id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productStatus').value = product.status;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productImage').value = product.image;

    document.getElementById('btnCancelEdit').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelEdit() {
    editingId = null;
    document.getElementById('productForm').reset();
    document.getElementById('btnCancelEdit').style.display = 'none';
}

function deleteProduct(id) {
    if (confirm('🗑️ Bạn có chắc chắn muốn xóa sản phẩm này?')) {
        products = products.filter(p => p.id !== id);
        saveToLocalStorage();
        displayAdminProducts();
        updateStats();
        displayCustomerProducts();
        alert('✅ Xóa sản phẩm thành công!');
    }
}