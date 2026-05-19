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

1. **Cà phê pha máy** - Espresso, Cappuccino, Latte, etc.
2. **Cà phê truyền thống** - Cà phê phèn, Cà phê đen đá
3. **Trà trái cây** - Trà ổi, Trà chanh

## 📝 Validation

- Tên sản phẩm: Không được để trống
- Giá: Phải lớn hơn 0
- Danh mục: Bắt buộc

## 🔒 Lưu Ý

- Database sẽ được tạo trong thư mục `data/`
- Dữ liệu mẫu sẽ được nhập vào khi chạy `npm run init-db`

## 📄 License

MIT License

## 👨‍💻 Tác Giả

**Sinh viên**: nglum
**Môn học**: Công Nghệ Phần Mềm
