const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const db = new sqlite3.Database('./data/coffee.db');

db.serialize(() => {
  // Create categories table
  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    )
  `);

  // Create products table
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT,
      image_url TEXT,
      category_id INTEGER,
      status TEXT DEFAULT 'Còn hàng',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(category_id) REFERENCES categories(id)
    )
  `);

  // Insert categories
  const categories = [
    'Cà phê pha máy',
    'Cà phê truyền thống',
    'Trà trái cây'
  ];

  categories.forEach(cat => {
    db.run('INSERT OR IGNORE INTO categories (name) VALUES (?)', [cat]);
  });

  // Insert sample products
  const products = [
    { name: 'Espresso', price: 35000, description: 'Cà phê đen đậm đà', image_url: 'https://via.placeholder.com/200?text=Espresso', category_id: 1, status: 'Còn hàng' },
    { name: 'Cappuccino', price: 45000, description: 'Cà phê với sữa và bọt', image_url: 'https://via.placeholder.com/200?text=Cappuccino', category_id: 1, status: 'Còn hàng' },
    { name: 'Cà phê Phèn', price: 25000, description: 'Cà phê truyền thống kinh điển', image_url: 'https://via.placeholder.com/200?text=Phin', category_id: 2, status: 'Còn hàng' },
    { name: 'Cà phê Đen Đá', price: 30000, description: 'Cà phê đen lạnh, sảng khoái', image_url: 'https://via.placeholder.com/200?text=Den', category_id: 2, status: 'Hết hàng' },
    { name: 'Trà Ổi', price: 35000, description: 'Trà ổi tươi mát', image_url: 'https://via.placeholder.com/200?text=Oi', category_id: 3, status: 'Còn hàng' },
    { name: 'Trà Chanh', price: 30000, description: 'Trà chanh tính lạnh', image_url: 'https://via.placeholder.com/200?text=Chanh', category_id: 3, status: 'Còn hàng' }
  ];

  products.forEach(p => {
    db.run(
      'INSERT INTO products (name, price, description, image_url, category_id, status) VALUES (?, ?, ?, ?, ?, ?)',
      [p.name, p.price, p.description, p.image_url, p.category_id, p.status]
    );
  });

  console.log('✅ Database initialized successfully!');
});

db.close();
