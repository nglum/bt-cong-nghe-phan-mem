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

  // Insert sample products - 15 sản phẩm demo
  const products = [
    // Cà phê pha máy (1-6)
    { name: 'Espresso', price: 35000, description: 'Cà phê đen đậm đà, đắng khó cưỡng', image_url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=200', category_id: 1, status: 'Còn hàng' },
    { name: 'Cappuccino', price: 45000, description: 'Cà phê với sữa nóng và bọt mềm mịn', image_url: 'https://images.unsplash.com/photo-1575523521330-7b399df4ee85?w=200', category_id: 1, status: 'Còn hàng' },
    { name: 'Latte', price: 50000, description: 'Cà phê với nhiều sữa, vị nhẹ nhàng', image_url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200', category_id: 1, status: 'Còn hàng' },
    { name: 'Americano', price: 40000, description: 'Espresso pha thêm nước nóng', image_url: 'https://images.unsplash.com/photo-1447933601403-0c6688bcf566?w=200', category_id: 1, status: 'Còn hàng' },
    { name: 'Macchiato', price: 42000, description: 'Espresso kỹ với một chút sữa', image_url: 'https://images.unsplash.com/photo-1578432291340-becc2b36b75d?w=200', category_id: 1, status: 'Còn hàng' },
    { name: 'Mocha', price: 55000, description: 'Hỗn hợp cà phê, sữa và chocolate', image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200', category_id: 1, status: 'Còn hàng' },
    
    // Cà phê truyền thống (2-6)
    { name: 'Cà phê Phèn', price: 25000, description: 'Cà phê truyền thống kinh điển của Việt Nam', image_url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200', category_id: 2, status: 'Còn hàng' },
    { name: 'Cà phê Đen Đá', price: 30000, description: 'Cà phê đen lạnh, sảng khoái và tỉnh táo', image_url: 'https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=200', category_id: 2, status: 'Còn hàng' },
    { name: 'Cà phê Sữa', price: 35000, description: 'Cà phê nóng pha sữa đậu trong từng lần', image_url: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=200', category_id: 2, status: 'Còn hàng' },
    { name: 'Cà phê Sữa Đá', price: 32000, description: 'Cà phê sữa truyền thống dùng lạnh', image_url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200', category_id: 2, status: 'Hết hàng' },
    { name: 'Cà phê Trứng', price: 40000, description: 'Cà phê đặc biệt pha trứng ngon lạ miệng', image_url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=200', category_id: 2, status: 'Còn hàng' },
    
    // Trà trái cây (3-5)
    { name: 'Trà Ổi', price: 35000, description: 'Trà ổi tươi mát, chua ngọt vừa vặn', image_url: 'https://images.unsplash.com/photo-1597318186323-9a2df8dfe7bb?w=200', category_id: 3, status: 'Còn hàng' },
    { name: 'Trà Chanh', price: 30000, description: 'Trà chanh tươi mát, giải khát tuyệt vời', image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200', category_id: 3, status: 'Còn hàng' },
    { name: 'Trà Đào', price: 38000, description: 'Trà đào thơm ngon, vị tự nhiên', image_url: 'https://images.unsplash.com/photo-1597318186323-9a2df8dfe7bb?w=200', category_id: 3, status: 'Còn hàng' },
    { name: 'Trà Dâu', price: 40000, description: 'Trà dâu tây đỏ, ngọt ngây ngả', image_url: 'https://images.unsplash.com/photo-1585518419759-c3cc4dbdd32f?w=200', category_id: 3, status: 'Còn hàng' },
    { name: 'Trà Cam', price: 35000, description: 'Trà cam vàng, vitamin C dồi dào', image_url: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64b61?w=200', category_id: 3, status: 'Còn hàng' }
  ];

  products.forEach(p => {
    db.run(
      'INSERT INTO products (name, price, description, image_url, category_id, status) VALUES (?, ?, ?, ?, ?, ?)',
      [p.name, p.price, p.description, p.image_url, p.category_id, p.status]
    );
  });

  console.log('✅ Database initialized successfully! 15 sản phẩm demo đã được thêm!');
});

db.close();
