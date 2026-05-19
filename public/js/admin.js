let allProducts = [];
let allCategories = [];
let editingId = null;

// Load data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    loadProducts();
    setupFormListener();
});

// Load categories
async function loadCategories() {
    try {
        const response = await fetch('/api/categories');
        allCategories = await response.json();
        
        const select = document.getElementById('category_id');
        select.innerHTML = '';
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
        displayTable();
        updateStats();
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Display table
function displayTable() {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';

    allProducts.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${Number(product.price).toLocaleString('vi-VN')} VND</td>
            <td>${product.category_name || 'N/A'}</td>
            <td><span class="product-status ${product.status === 'Còn hàng' ? 'status-available' : 'status-unavailable'}">${product.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-warning" onclick="editProduct(${product.id})">✏️ Sửa</button>
                    <button class="btn-danger" onclick="deleteProduct(${product.id})">🗑️ Xóa</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Update stats
function updateStats() {
    const total = allProducts.length;
    const inStock = allProducts.filter(p => p.status === 'Còn hàng').length;
    const outOfStock = total - inStock;

    document.getElementById('totalProducts').textContent = total;
    document.getElementById('inStock').textContent = inStock;
    document.getElementById('outOfStock').textContent = outOfStock;
}

// Edit product
async function editProduct(id) {
    const product = allProducts.find(p => p.id === id);
    if (!product) return;

    document.getElementById('productId').value = product.id;
    document.getElementById('name').value = product.name;
    document.getElementById('price').value = product.price;
    document.getElementById('description').value = product.description || '';
    document.getElementById('image_url').value = product.image_url || '';
    document.getElementById('category_id').value = product.category_id || '';
    document.getElementById('status').value = product.status;

    editingId = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Delete product
function deleteProduct(id) {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
        fetch(`/api/products/${id}`, { method: 'DELETE' })
            .then(() => {
                loadProducts();
                alert('Xóa sản phẩm thành công!');
            })
            .catch(err => alert('Lỗi: ' + err));
    }
}

// Setup form listener
function setupFormListener() {
    const form = document.getElementById('productForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const price = parseFloat(document.getElementById('price').value);

        // Validation
        if (!name) {
            alert('Tên sản phẩm không được để trống');
            return;
        }
        if (price <= 0) {
            alert('Giá phải lớn hơn 0');
            return;
        }

        const productData = {
            name,
            price,
            description: document.getElementById('description').value,
            image_url: document.getElementById('image_url').value,
            category_id: document.getElementById('category_id').value,
            status: document.getElementById('status').value
        };

        try {
            const url = editingId ? `/api/products/${editingId}` : '/api/products';
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });

            if (response.ok) {
                alert(editingId ? 'Cập nhật thành công!' : 'Thêm sản phẩm thành công!');
                form.reset();
                editingId = null;
                loadProducts();
            } else {
                const error = await response.json();
                alert('Lỗi: ' + error.error);
            }
        } catch (error) {
            alert('Lỗi: ' + error);
        }
    });
}
