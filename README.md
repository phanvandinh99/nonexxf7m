# Hướng dẫn chạy dự án Laravel - nonexxf7m

## Yêu cầu hệ thống

- **PHP**: >= 8.2
- **Composer**: >= 2.0
- **Node.js**: >= 18.x và npm (tùy chọn, chỉ cần nếu build frontend assets)
- **Database**: Không cần thiết (dự án không sử dụng database)

## Đặc điểm

- ✅ Không cần cấu hình database (không dùng MySQL/PostgreSQL)
- ✅ Không cần migrations hay seeders
- ✅ Session, Cache, Queue sử dụng file storage
- ✅ Nội dung động được load từ JSON files
- ✅ URL catch-all để hiển thị nội dung động

## Cài đặt

### Bước 1: Cài đặt dependencies

```bash
cd nonexxf7m
composer install
```

### Bước 2: Cấu hình môi trường

Tạo file `.env` từ file mẫu:

```bash
copy .env.example .env
```

Hoặc trên Linux/Mac:
```bash
cp .env.example .env
```

### Bước 3: Tạo Application Key

```bash
php artisan key:generate
```

### Bước 4: Cài đặt NPM dependencies (tùy chọn - chỉ cần nếu build frontend assets)

```bash
npm install
```

## Chạy dự án

### Cách 1: Sử dụng Artisan Serve (Development)

```bash
php artisan serve
```

Ứng dụng sẽ chạy tại: `http://localhost:8000`

### Cách 2: Sử dụng script dev (Development với Vite)

```bash
composer run dev
```

Lệnh này sẽ chạy đồng thời:
- Laravel server
- Queue worker
- Pail (log viewer)
- Vite dev server

### Cách 3: Build production assets

```bash
npm run build
```

Sau đó chạy:
```bash
php artisan serve
```

## Các lệnh hữu ích

### Clear cache
```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### Tạo Storage Link (cho file uploads)
```bash
php artisan storage:link
```

## Chạy Tests

```bash
composer run test
```

Hoặc:
```bash
php artisan test
```

## Cấu trúc thư mục

```
nonexxf7m/
├── app/
│   ├── Helpers/      # Helper classes (ContentHelper)
│   ├── Http/
│   │   └── Controllers/
│   ├── Services/     # Services (DomainService)
│   ├── Providers/
│   └── helpers.php   # Global helper functions
├── bootstrap/        # Bootstrap files
├── config/           # Configuration files
├── database/         # SQLite file (nếu có)
├── public/           # Public entry point, static assets
├── resources/
│   ├── content/      # JSON và text files chứa nội dung
│   ├── css/
│   ├── js/
│   └── views/        # Blade templates
├── routes/           # Route definitions
├── storage/          # Logs, cache, sessions (file-based)
└── tests/            # Test files
```

## Ghi chú về Database

Dự án này **không sử dụng database** để lưu trữ dữ liệu. Tất cả nội dung được load từ:
- JSON files trong `resources/content/` (ví dụ: `rich_sports_news_cn_v2.json`)
- Text files trong `resources/content/`

Session, Cache, và Queue được lưu trong file system, không cần database.

## Troubleshooting

### Lỗi permission (Linux/Mac)
```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

### Lỗi composer
```bash
composer clear-cache
composer install --no-cache
```

### Lỗi npm
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Tài liệu tham khảo

- [Laravel Documentation](https://laravel.com/docs)
- [Laravel Learn](https://laravel.com/learn)

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
