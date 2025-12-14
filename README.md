# 7M Sports Website

Website đọc nội dung từ file txt và json, không sử dụng database.

## 📁 Cấu trúc Project

- **Trang chủ**: `resources/views/index7m.blade.php`
- **Trang chi tiết**: `resources/views/detail.blade.php`
- **Content files**: `resources/content/` (txt và json)
- **Helper functions**: `app/helpers.php`

## 🚀 Hướng dẫn Deploy

**Xem file: [BAOTA-SETUP-GUIDE.md](BAOTA-SETUP-GUIDE.md)** để có hướng dẫn đầy đủ về cách setup và deploy lên Baota Panel.

### Tóm tắt nhanh:

1. Upload code lên server
2. Cài Composer và dependencies
3. Cấu hình Laravel (.env, permissions)
4. Cấu hình Website trong Baota Panel (运行目录 = `/public`, 伪静态)
5. Bật PHP extensions
6. Test website

## 📝 Các file quan trọng

- `BAOTA-SETUP-GUIDE.md` - Hướng dẫn setup đầy đủ trên Baota Panel
- `routes/web.php` - Routing (trang chủ và catch-all)
- `app/helpers.php` - Helper functions (load_content, load_article_from_json, domain, domain_url)
- `resources/content/` - Thư mục chứa file content (txt và json)

## 🔧 Yêu cầu hệ thống

- PHP 8.2+
- Composer 2.2+
- Nginx/Apache
- PHP extensions: fileinfo, openssl, mbstring, tokenizer, xml, ctype, json

## 📖 Cách hoạt động

1. **Trang chủ** (`/`): Load nội dung từ các file `.txt` trong `resources/content/`
2. **Trang chi tiết** (`/{path}`): Load bài viết từ file JSON dựa trên URL path (deterministic - cùng URL luôn trả về cùng bài viết)

## 🐛 Troubleshooting

Xem phần Troubleshooting trong file `BAOTA-SETUP-GUIDE.md`
