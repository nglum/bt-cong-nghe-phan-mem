# ☕ Hệ Thống Quản Lý Cửa Hàng Cà Phê

Một website quản lý và giới thiệu sản phẩm cà phê với hai phân hệ: trang khách hàng và trang quản trị.

## 🎯 Tính Năng

### Phân Hệ Khách Hàng
- ✅ Hiển thị danh sách sản phẩm từ cơ sở dữ liệu
- ✅ Lọc sản phẩm theo danh mục
- ✅ Tìm kiếm nhanh theo tên sản phẩm
- ✅ Hiển thị trạng thái (Còn hàng/Hết hàng)

### Phân Hệ Quản Trị (CRUD Đầy Đủ)
- ✅ **CREATE**: Thêm sản phẩm mới
- ✅ **READ**: Xem danh sách sản phẩm
- ✅ **UPDATE**: Sửa thông tin sản phẩm
- ✅ **DELETE**: Xóa sản phẩm (với xác nhận)
- ✅ Thống kê: Tổng sản phẩm, Còn hàng, Hết hàng

## 🛠️ Công Nghệ Sử Dụng

- **Backend**: Node.js + Express
- **Database**: SQLite3
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **API**: RESTful

## 📦 Cài Đặt

### 1. Clone Repository
```bash
git clone https://github.com/nglum/bt-cong-nghe-phan-mem.git
cd bt-cong-nghe-phan-mem
```

### 2. Cài Đặt Dependencies
```bash
npm install
```

### 3. Khởi Tạo Database
```bash
npm run init-db
```

### 4. Chạy Server
```bash
npm start
```

Server sẽ chạy tại `http://localhost:3000`

## 🌐 Truy Cập

- **Trang Khách Hàng**: http://localhost:3000/
- **Trang Quản Trị**: http://localhost:3000/admin

## 📊 Cấu Trúc Database

### Bảng Categories
```sql
id (INTEGER, PRIMARY KEY)
name (TEXT, UNIQUE)
```

### Bảng Products
```sql
id (INTEGER, PRIMARY KEY)
name (TEXT) - Tên sản phẩm
price (REAL) - Giá bán
description (TEXT) - Mô tả
image_url (TEXT) - URL hình ảnh
category_id (INTEGER) - ID danh mục
status (TEXT) - Trạng thái (Còn hàng/Hết hàng)
created_at (DATETIME) - Ngày tạo
```

## 🎨 Danh Mục Sản Phẩm

1. **Cà phê pha máy** - Espresso, Cappuccino, Latte, Americano
2. **Cà phê truyền thống** - Cà phê phèn, Cà phê đen đá, Cà phê sữa đá
3. **Trà trái cây** - Trà ổi, Trà chanh, Trà thanh yên

## 📝 Validation

- Tên sản phẩm: Không được để trống
- Giá: Phải lớn hơn 0
- Danh mục: Bắt buộc

## ❌ Khắc Phục Lỗi Thường Gặp

### **Lỗi 1: "Cannot find module 'express'"**
```bash
# Giải pháp: Cài đặt dependencies
npm install
```

### **Lỗi 2: "Database error" hoặc không thấy sản phẩm**
```bash
# Giải pháp: Khởi tạo lại database
npm run init-db
```

### **Lỗi 3: "Port 3000 is already in use"**
- Chỉnh sửa `server.js` dòng `const PORT = 3000` thành `const PORT = 3001` (hoặc port khác)
- Hoặc tắt ứng dụng khác đang dùng port 3000

### **Lỗi 4: Mở index.html trực tiếp không hiển thị gì**
- ❌ **SAI**: Click mở file `views/index.html` trực tiếp
- ✅ **ĐÚNG**: Chạy `npm start` rồi truy cập `http://localhost:3000`

## 🚀 Thứ Tự Chạy Đúng

```bash
# Bước 1: Cài thư viện
npm install

# Bước 2: Tạo database & sản phẩm demo
npm run init-db

# Bước 3: Chạy server
npm start

# Bước 4: Mở trình duyệt
# - Khách hàng: http://localhost:3000
# - Admin: http://localhost:3000/admin
```

## 🎁 Sản Phẩm Demo

**10 sản phẩm mẫu được thêm vào:**

### Cà phê pha máy (4)
- Espresso - 35,000 VND
- Cappuccino - 45,000 VND
- Latte - 50,000 VND
- Americano - 40,000 VND

### Cà phê truyền thống (3)
- Cà phê Phèn - 25,000 VND
- Cà phê Đen Đá - 30,000 VND
- Cà phê Sữa Đá - 35,000 VND (Hết hàng)

### Trà trái cây (3)
- Trà Ổi - 35,000 VND
- Trà Chanh - 30,000 VND
- Trà Thanh Yên - 32,000 VND

## 🔒 Lưu Ý

- Database sẽ được tạo trong thư mục `data/`
- Dữ liệu mẫu sẽ được nhập vào khi chạy `npm run init-db`
- Để xóa toàn bộ dữ liệu: xóa file `data/coffee.db` rồi chạy `npm run init-db` lại

## 📄 License

MIT License

## 👨‍💻 Tác Giả

**Sinh viên**: nglum
**Môn học**: Công Nghệ Phần Mềm
