# Hướng dẫn Setup Laravel Scheduler trên Baota Panel

## 📋 Tổng quan

Code Python đã được chuyển sang PHP/Laravel. Bây giờ bạn có thể chạy scrape tự động bằng Laravel Scheduler.

---

## ✅ Bước 1: Kiểm tra code đã sẵn sàng

### 1.1. Các file đã được tạo

- ✅ `app/Services/ScrapeService.php` - Service xử lý scraping
- ✅ `app/Console/Commands/ScrapeContent.php` - Artisan command
- ✅ `domains.txt` - Danh sách domain để thay thế
- ✅ `app/Providers/AppServiceProvider.php` - Đã cấu hình Task Scheduling

### 1.2. Test command thủ công

```bash
cd /www/wwwroot/nonexxf7m.com

# Test chạy command
php artisan scrape:content
```

Nếu thấy "✅ Scrape thành công!" → OK, tiếp tục.

---

## ⚙️ Bước 2: Cấu hình Cron Job trong Baota Panel

### 2.1. Vào phần Plan Tasks

1. Đăng nhập Baota Panel
2. Click vào **计划任务** (Scheduled Tasks) ở menu bên trái
3. Click **添加计划任务** (Add Scheduled Task)

### 2.2. Điền thông tin Task

**Các trường cần điền:**

1. **任务类型** (Task Type): Chọn **Shell脚本** (Shell Script)

2. **任务名称** (Task Name): `Laravel Scheduler`

3. **执行周期** (Execution Period): 
   - Chọn: **N分钟** (N minutes)
   - Điền số: `1` (chạy mỗi 1 phút)

4. **脚本内容** (Script Content):
   ```bash
   cd /www/wwwroot/nonexxf7m.com && php artisan schedule:run >> /dev/null 2>&1
   ```
   
   **Hoặc với log (khuyến nghị):**
   ```bash
   cd /www/wwwroot/nonexxf7m.com && php artisan schedule:run >> storage/logs/scheduler.log 2>&1
   ```

5. Click **提交** (Submit)

---

## 🧪 Bước 3: Kiểm tra

### 3.1. Test scheduler thủ công

```bash
cd /www/wwwroot/nonexxf7m.com

# Xem danh sách task đã schedule
php artisan schedule:list

# Chạy scheduler một lần
php artisan schedule:run
```

### 3.2. Kiểm tra trong Baota Panel

1. Vào **计划任务** → Tìm task "Laravel Scheduler"
2. Click **执行** (Execute) để test ngay
3. Xem **最后执行时间** (Last Execution Time) có cập nhật không

### 3.3. Đợi và kiểm tra file

Đợi 1-2 phút, sau đó:

```bash
# Kiểm tra file có được cập nhật không
ls -lah resources/content/

# Xem thời gian sửa đổi (phải gần đây)
stat resources/content/content_t1.txt
```

---

## ⏰ Tùy chỉnh tần suất chạy

Mở file `app/Providers/AppServiceProvider.php`:

```bash
nano app/Providers/AppServiceProvider.php
```

Thay đổi theo nhu cầu:

```php
// Mỗi giờ (mặc định)
$schedule->command('scrape:content')->hourly();

// Mỗi 30 phút
$schedule->command('scrape:content')->everyThirtyMinutes();

// Mỗi 6 giờ
$schedule->command('scrape:content')->everySixHours();

// 3 lần mỗi ngày (8h, 12h, 18h)
$schedule->command('scrape:content')->dailyAt('08:00');
$schedule->command('scrape:content')->dailyAt('12:00');
$schedule->command('scrape:content')->dailyAt('18:00');
```

Sau khi sửa:
```bash
php artisan config:clear
php artisan cache:clear
```

---

## 📊 Kiểm tra log

```bash
# Xem log scheduler (nếu dùng version có log)
tail -f storage/logs/scheduler.log

# Hoặc log Laravel
tail -f storage/logs/laravel.log
```

---

## 🎯 Tóm tắt

**Script cho Baota Panel:**
```bash
cd /www/wwwroot/nonexxf7m.com && php artisan schedule:run >> storage/logs/scheduler.log 2>&1
```

**Cấu hình:**
- 执行周期: 1 phút
- 任务名称: Laravel Scheduler

**Cách hoạt động:**
1. Cron job chạy mỗi 1 phút → gọi `php artisan schedule:run`
2. Laravel kiểm tra các task đã đến giờ chưa
3. Nếu đến giờ → chạy `scrape:content` (mỗi giờ)
4. Scrape nội dung → lưu vào `resources/content/*.txt`
5. Website tự động hiển thị nội dung mới

---

## ✅ Checklist

- [ ] Đã test `php artisan scrape:content` thành công
- [ ] Đã tạo cron job trong Baota Panel
- [ ] Cron job chạy mỗi 1 phút
- [ ] Đã test `php artisan schedule:run`
- [ ] Đã đợi vài phút và kiểm tra file có cập nhật
- [ ] Website hiển thị nội dung mới
