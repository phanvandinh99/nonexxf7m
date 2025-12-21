# Quick Start - Scrape Content

## 🚀 Chạy thủ công

```bash
cd /www/wwwroot/nonexxf7m.com

# Scrape nội dung chính
php artisan scrape:content

# Scrape với n_ty
php artisan scrape:content --n-ty-url="https://news.7m.com.cn/news/20251214/710322.shtml"
```

## ⏰ Setup Auto Schedule (3 bước)

### Bước 1: Cấu hình đã sẵn sàng
File `app/Providers/AppServiceProvider.php` đã được cấu hình chạy mỗi giờ.

### Bước 2: Tạo Cron Job trong Baota Panel

1. Vào **计划任务** → **添加计划任务**
2. Điền:
   - **任务类型**: Shell脚本
   - **任务名称**: Laravel Scheduler
   - **执行周期**: 1 phút
   - **脚本内容**:
   ```bash
   cd /www/wwwroot/nonexxf7m.com && php artisan schedule:run >> storage/logs/scheduler.log 2>&1
   ```
3. Click **提交**

### Bước 3: Kiểm tra

```bash
# Test scheduler
php artisan schedule:list
php artisan schedule:run

# Xem log
tail -f storage/logs/scheduler.log
```

## 📝 Tùy chỉnh lịch trình

Mở `app/Providers/AppServiceProvider.php` và thay đổi:

```php
// Mỗi giờ (mặc định)
->hourly()

// Mỗi 30 phút
->everyThirtyMinutes()

// Mỗi 6 giờ
->everySixHours()

// 3 lần mỗi ngày (8h, 12h, 18h)
->dailyAt('08:00')
->dailyAt('12:00')
->dailyAt('18:00')
```

Sau đó: `php artisan config:clear`

## ✅ Kiểm tra

```bash
# Xem file đã tạo
ls -lah resources/content/

# Xem log
tail -f storage/logs/laravel.log
```

**Xem hướng dẫn đầy đủ:** [SCRAPE-GUIDE.md](SCRAPE-GUIDE.md)
