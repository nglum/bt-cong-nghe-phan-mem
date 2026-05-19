const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Database connection
const db = new sqlite3.Database('./data/coffee.db', (err) => {
  if (err) console.error('Database error:', err);
  else console.log('Connected to SQLite database');
});

// ===== API ROUTES =====

// GET all products
app.get('/api/products', (req, res) => {
  db.all(`
    SELECT p.*, c.name as category_name 
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    ORDER BY p.created_at DESC
  `, (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

// GET categories
app.get('/api/categories', (req, res) => {
  db.all('SELECT * FROM categories', (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

// GET single product
app.get('/api/products/:id', (req, res) => {
  db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, row) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(row || {});
  });
});

// CREATE product
app.post('/api/products', (req, res) => {
  const { name, price, description, image_url, category_id, status } = req.body;
  
  // Validation
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Tên sản phẩm không được để trống' });
  }
  if (price <= 0) {
    return res.status(400).json({ error: 'Giá phải lớn hơn 0' });
  }
  
  db.run(
    `INSERT INTO products (name, price, description, image_url, category_id, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`,
    [name, price, description, image_url, category_id, status],
    function(err) {
      if (err) res.status(500).json({ error: err.message });
      else res.json({ id: this.lastID, message: 'Sản phẩm thêm thành công' });
    }
  );
});

// UPDATE product
app.put('/api/products/:id', (req, res) => {
  const { name, price, description, image_url, category_id, status } = req.body;
  
  // Validation
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Tên sản phẩm không được để trống' });
  }
  if (price <= 0) {
    return res.status(400).json({ error: 'Giá phải lớn hơn 0' });
  }
  
  db.run(
    `UPDATE products SET name = ?, price = ?, description = ?, image_url = ?, category_id = ?, status = ?
     WHERE id = ?`,
    [name, price, description, image_url, category_id, status, req.params.id],
    function(err) {
      if (err) res.status(500).json({ error: err.message });
      else res.json({ message: 'Sản phẩm cập nhật thành công' });
    }
  );
});

// DELETE product
app.delete('/api/products/:id', (req, res) => {
  db.run('DELETE FROM products WHERE id = ?', [req.params.id], function(err) {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ message: 'Sản phẩm xóa thành công' });
  });
});

// ===== PAGE ROUTES =====
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/admin.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
