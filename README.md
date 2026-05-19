# ☕ Hệ Thống Quản Lý Cửa Hàng Cà Phê

Một website đơn giản (HTML + CSS + JS) quản lý và giới thiệu sản phẩm cà phê với hai phân hệ: trang khách hàng và trang quản trị.

## 🎯 Tính Năng

### Phân Hệ Khách Hàng
- ✅ Hiển thị danh sách 12 sản phẩm cà phê
- ✅ Lọc sản phẩm theo 3 danh mục
- ✅ Tìm kiếm nhanh theo tên
- ✅ Hiển thị trạng thái (Còn hàng/Hết hàng)
- ✅ Hình ảnh thực từ Unsplash

### Phân Hệ Quản Trị (CRUD)
- ✅ **Create**: Thêm sản phẩm mới (validation)
- ✅ **Read**: Xem danh sách sản phẩm trong bảng
- ✅ **Update**: Sửa thông tin sản phẩm
- ✅ **Delete**: Xóa sản phẩm (xác nhận)
- ✅ Thống kê: Tổng, Còn hàng, Hết hàng

## 🛠️ Công Nghệ

- **HTML5** - Semantic structure
- **CSS3** - Gradient nâu chuyên nghiệp, responsive design
- **JavaScript** - Vanilla JS, localStorage

## 🚀 Cách Sử Dụng

### 1. Clone Repository
```bash
git clone https://github.com/nglum/bt-cong-nghe-phan-mem.git
cd bt-cong-nghe-phan-mem
```

### 2. Chạy Trực Tiếp
- Mở file `index.html` bằng trình duyệt
- Hoặc dùng Live Server (VS Code Extension)

## 📱 Cấu Trúc File

```
bt-cong-nghe-phan-mem/
├── index.html      (1 trang duy nhất)
├── css/
│   └── style.css   (Màu nâu chuyên nghiệp)
├── js/
│   └── script.js   (12 sản phẩm demo)
├── README.md
└── .gitignore
```

## 🎨 Danh Mục Sản Phẩm

1. **Cà phê pha máy (6)**: Espresso, Cappuccino, Latte, Americano, Mocha, Macchiato
2. **Cà phê truyền thống (3)**: Phèn, Đen Đá, Sữa Đá
3. **Trà trái cây (3)**: Ổi, Chanh, Thanh Yên

## 🎨 Bảng Màu Chuyên Nghiệp

| Thành Phần | Màu | Hex |
|---|---|---|
| Primary | Nâu Đậm | #6F4E37 |
| Primary Dark | Nâu Tối | #4A2F23 |
| Accent | Vàng Nâu | #E8B86E |
| Background | Kem | #F5F1E8 |
| Success | Xanh Lá | #27AE60 |
| Danger | Đỏ Ấm | #E74C3C |

## 💾 Lưu Trữ

- Dữ liệu được lưu trong **localStorage** (trình duyệt)
- Không cần database hay server
- Dữ liệu mất nếu xóa cache trình duyệt

## 📝 Validation

- Tên sản phẩm: Không được để trống
- Giá: Phải lớn hơn 0
- Danh mục: Bắt buộc

## 📄 License

MIT License

## 👨‍💻 Tác Giả

**Sinh viên**: nglum
**Môn học**: Công Nghệ Phần Mềm
