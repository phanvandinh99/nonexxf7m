# Hướng dẫn đầy đủ: Scrape Content và Auto Schedule

## 📋 Mục lục

1. [Cách chạy thủ công](#cách-chạy-thủ-công)
2. [Cấu hình Auto Schedule với Laravel Scheduler](#cấu-hình-auto-schedule)
3. [Setup Cron Job trong Baota Panel](#setup-cron-job)
4. [Tùy chỉnh lịch trình](#tùy-chỉnh-lịch-trình)
5. [Kiểm tra và Monitor](#kiểm-tra-và-monitor)
6. [Troubleshooting](#troubleshooting)

---

## 🚀 Cách chạy thủ công

### 1. Chạy scrape nội dung chính

```bash
cd /www/wwwroot/nonexxf7m.com
php artisan scrape:content
```

**Kết quả:**
- Scrape nội dung từ `https://www.7m.com.cn`
- Tìm các class: `content_t1`, `content_t2`, `content_t3`, `content_m1`, `content_m2`
- Thay domain trong links bằng domain ngẫu nhiên từ `domains.txt`
- Lưu vào `resources/content/*.txt`

### 2. Scrape n_ty từ URL cụ thể

```bash
php artisan scrape:content --n-ty-url="https://news.7m.com.cn/news/20251214/710322.shtml"
```

**Kết quả:**
- Scrape div class `n_ty` từ URL
- Lưu vào `resources/content/n_ty.txt`

### 3. Scrape cả hai (nội dung chính + n_ty)

```bash
php artisan scrape:content --n-ty-url="https://news.7m.com.cn/news/20251214/710322.shtml"
```

### 4. Thay đổi URL nguồn

```bash
php artisan scrape:content --base-url="https://www.7m.com.cn"
```

---

## ⏰ Cấu hình Auto Schedule với Laravel Scheduler

### Bước 1: Kiểm tra cấu hình hiện tại

File `app/Providers/AppServiceProvider.php` đã được cấu hình sẵn:

```php
$schedule->command('scrape:content')
    ->hourly()  // Chạy mỗi giờ
    ->withoutOverlapping()  // Không chạy trùng lặp
    ->runInBackground();  // Chạy background
```

### Bước 2: Tùy chỉnh lịch trình (nếu cần)

Mở file `app/Providers/AppServiceProvider.php`:

```bash
cd /www/wwwroot/nonexxf7m.com
nano app/Providers/AppServiceProvider.php
```

**Các tùy chọn lịch trình:**

```php
// Mỗi giờ (mặc định)
$schedule->command('scrape:content')->hourly();

// Mỗi 30 phút
$schedule->command('scrape:content')->everyThirtyMinutes();

// Mỗi 15 phút
$schedule->command('scrape:content')->everyFifteenMinutes();

// Mỗi 6 giờ
$schedule->command('scrape:content')->everySixHours();

// Mỗi 12 giờ
$schedule->command('scrape:content')->twiceDaily();

// Mỗi ngày vào giờ cụ thể
$schedule->command('scrape:content')->dailyAt('08:00');
$schedule->command('scrape:content')->dailyAt('12:00');
$schedule->command('scrape:content')->dailyAt('18:00');

// 3 lần mỗi ngày (8h, 12h, 18h)
$schedule->command('scrape:content')->dailyAt('08:00');
$schedule->command('scrape:content')->dailyAt('12:00');
$schedule->command('scrape:content')->dailyAt('18:00');

// Chỉ chạy vào giờ làm việc (8h-18h)
$schedule->command('scrape:content')
    ->hourly()
    ->between('8:00', '18:00');

// Chỉ chạy vào các ngày trong tuần (Thứ 2 - Thứ 6)
$schedule->command('scrape:content')
    ->hourly()
    ->weekdays();
```

**Sau khi sửa, clear cache:**
```bash
php artisan config:clear
php artisan cache:clear
```

---

## 🔧 Setup Cron Job trong Baota Panel

### Bước 1: Vào phần Plan Tasks

1. Đăng nhập Baota Panel
2. Click vào **计划任务** (Scheduled Tasks) ở menu bên trái
3. Bạn sẽ thấy danh sách các task hiện có (nếu có)

### Bước 2: Tạo Task mới

1. Click nút **添加计划任务** (Add Scheduled Task) hoặc **添加** (Add)
2. Một form/modal sẽ hiện ra

### Bước 3: Điền thông tin Task

**Các trường cần điền:**

1. **任务类型** (Task Type):
   - Chọn: **Shell脚本** (Shell Script)

2. **任务名称** (Task Name):
   - Điền: `Laravel Scheduler`
   - (Hoặc tên khác dễ nhớ, ví dụ: `Auto Scrape Content`)

3. **执行周期** (Execution Period):
   - Chọn: **N分钟** (N minutes)
   - Điền số: `1` (chạy mỗi 1 phút)
   - **Lưu ý:** Laravel scheduler cần chạy mỗi phút để kiểm tra các task đã đến giờ chưa

4. **脚本内容** (Script Content):
   - Paste đoạn code sau vào:
   
   **Version 1: Không log (đơn giản)**
   ```bash
   cd /www/wwwroot/nonexxf7m.com && php artisan schedule:run >> /dev/null 2>&1
   ```
   
   **Version 2: Có log (khuyến nghị - dễ debug)**
   ```bash
   cd /www/wwwroot/nonexxf7m.com && php artisan schedule:run >> storage/logs/scheduler.log 2>&1
   ```
   
   **Version 3: Log chi tiết với timestamp**
   ```bash
   cd /www/wwwroot/nonexxf7m.com && php artisan schedule:run >> storage/logs/scheduler.log 2>&1 && echo "[$(date '+%Y-%m-%d %H:%M:%S')] Scheduler executed" >> storage/logs/scheduler.log
   ```

5. **备注** (Notes) - Tùy chọn:
   - Có thể ghi: `Laravel scheduler để tự động scrape content mỗi giờ`

### Bước 4: Lưu Task

1. Click nút **提交** (Submit) hoặc **保存** (Save)
2. Task sẽ được thêm vào danh sách

---

## 📊 Kiểm tra Task đã chạy

### 1. Kiểm tra trong Baota Panel

1. Vào **计划任务** (Scheduled Tasks)
2. Tìm task "Laravel Scheduler" vừa tạo
3. Xem các cột:
   - **最后执行时间** (Last Execution Time) - Thời gian chạy gần nhất
   - **执行次数** (Execution Count) - Số lần đã chạy
   - **状态** (Status) - Trạng thái

### 2. Test thủ công

Bạn có thể test ngay bằng cách:

1. Trong danh sách task, tìm task "Laravel Scheduler"
2. Click nút **执行** (Execute) hoặc **运行** (Run)
3. Đợi vài giây
4. Kiểm tra log hoặc file đã được tạo

### 3. Kiểm tra bằng command

```bash
cd /www/wwwroot/nonexxf7m.com

# Xem danh sách task đã schedule
php artisan schedule:list

# Chạy scheduler một lần (test)
php artisan schedule:run

# Chạy với verbose để xem chi tiết
php artisan schedule:run -v
```

---

## 📝 Kiểm tra và Monitor

### 1. Kiểm tra file đã được tạo/cập nhật

```bash
cd /www/wwwroot/nonexxf7m.com

# Xem danh sách file
ls -lah resources/content/

# Xem thời gian sửa đổi file (phải gần đây)
stat resources/content/content_t1.txt
stat resources/content/content_t2.txt
stat resources/content/content_m1.txt

# So sánh thời gian sửa đổi
ls -lt resources/content/*.txt | head -5
```

### 2. Xem log

```bash
# Xem log Laravel (tất cả log)
tail -f storage/logs/laravel.log

# Xem log scheduler riêng (nếu dùng version có log)
tail -f storage/logs/scheduler.log

# Xem 50 dòng log cuối
tail -50 storage/logs/laravel.log

# Tìm log liên quan đến scrape
grep -i "scrape\|content" storage/logs/laravel.log | tail -20
```

### 3. Kiểm tra website

1. Truy cập: `http://nonexxf7m.com`
2. Kiểm tra nội dung có được cập nhật không
3. Test trang detail: `http://nonexxf7m.com/news/20251213/710168.shtml`

---

## ⚙️ Tùy chỉnh lịch trình chi tiết

### Ví dụ 1: Chạy mỗi 30 phút

**Trong `app/Providers/AppServiceProvider.php`:**
```php
$schedule->command('scrape:content')
    ->everyThirtyMinutes()
    ->withoutOverlapping()
    ->runInBackground();
```

### Ví dụ 2: Chạy 3 lần mỗi ngày (8h, 12h, 18h)

```php
$schedule->command('scrape:content')
    ->dailyAt('08:00')
    ->withoutOverlapping();

$schedule->command('scrape:content')
    ->dailyAt('12:00')
    ->withoutOverlapping();

$schedule->command('scrape:content')
    ->dailyAt('18:00')
    ->withoutOverlapping();
```

### Ví dụ 3: Chỉ chạy vào giờ làm việc (8h-18h), mỗi giờ

```php
$schedule->command('scrape:content')
    ->hourly()
    ->between('8:00', '18:00')
    ->withoutOverlapping()
    ->runInBackground();
```

### Ví dụ 4: Chạy mỗi 6 giờ, chỉ vào ngày trong tuần

```php
$schedule->command('scrape:content')
    ->everySixHours()
    ->weekdays()  // Chỉ Thứ 2 - Thứ 6
    ->withoutOverlapping()
    ->runInBackground();
```

### Ví dụ 5: Scrape n_ty riêng biệt

Nếu muốn scrape n_ty với lịch khác:

```php
// Scrape nội dung chính mỗi giờ
$schedule->command('scrape:content')
    ->hourly()
    ->withoutOverlapping()
    ->runInBackground();

// Scrape n_ty mỗi 6 giờ
$schedule->command('scrape:content --n-ty-url=https://news.7m.com.cn/news/20251214/710322.shtml')
    ->everySixHours()
    ->withoutOverlapping()
    ->runInBackground();
```

**Lưu ý:** Cần tạo command riêng hoặc dùng option `--n-ty-url` như trên.

---

## 🔍 Kiểm tra Scheduler hoạt động

### 1. Xem danh sách task đã schedule

```bash
php artisan schedule:list
```

**Kết quả mong đợi:**
```
+------------------+------------------+------------------+
| Command          | Interval         | Description      |
+------------------+------------------+------------------+
| scrape:content   | 0 * * * *       |                  |
+------------------+------------------+------------------+
```

### 2. Test chạy scheduler

```bash
# Chạy scheduler một lần
php artisan schedule:run

# Chạy với verbose
php artisan schedule:run -v

# Chạy và xem output
php artisan schedule:run --verbose
```

### 3. Kiểm tra log sau khi chạy

```bash
# Xem log ngay sau khi chạy
tail -20 storage/logs/laravel.log

# Tìm log scrape
grep "scrape\|Scraping" storage/logs/laravel.log | tail -10
```

---

## 📅 Lịch trình đề xuất

### Option 1: Cập nhật thường xuyên (Mỗi giờ)

**Phù hợp cho:** Website cần cập nhật nội dung thường xuyên

```php
$schedule->command('scrape:content')->hourly();
```

**Ưu điểm:**
- Nội dung luôn mới
- User thấy cập nhật thường xuyên

**Nhược điểm:**
- Tải server nhiều hơn
- Có thể scrape nội dung trùng lặp

### Option 2: Cân bằng (Mỗi 6 giờ)

**Phù hợp cho:** Website cần cập nhật nhưng không quá thường xuyên

```php
$schedule->command('scrape:content')->everySixHours();
```

**Ưu điểm:**
- Cân bằng giữa cập nhật và tải server
- Đủ để có nội dung mới

### Option 3: 3 lần mỗi ngày (8h, 12h, 18h)

**Phù hợp cho:** Website cần cập nhật vào giờ cao điểm

```php
$schedule->command('scrape:content')->dailyAt('08:00');
$schedule->command('scrape:content')->dailyAt('12:00');
$schedule->command('scrape:content')->dailyAt('18:00');
```

**Ưu điểm:**
- Cập nhật vào giờ user truy cập nhiều
- Tiết kiệm tài nguyên server

### Option 4: Mỗi ngày 1 lần (2h sáng)

**Phù hợp cho:** Website không cần cập nhật thường xuyên

```php
$schedule->command('scrape:content')->dailyAt('02:00');
```

**Ưu điểm:**
- Tiết kiệm tài nguyên nhất
- Cập nhật vào giờ ít traffic

---

## 🐛 Troubleshooting

### Lỗi: Scheduler không chạy

**Kiểm tra:**
1. Cron job có chạy không:
   - Vào Baota Panel → 计划任务
   - Xem cột "最后执行时间" có cập nhật không
   
2. Test chạy thủ công:
   ```bash
   php artisan schedule:run
   ```

3. Kiểm tra log:
   ```bash
   tail -f storage/logs/laravel.log
   tail -f storage/logs/scheduler.log
   ```

### Lỗi: Task chạy nhưng không scrape được

**Kiểm tra:**
1. File `domains.txt` có tồn tại:
   ```bash
   ls -la domains.txt
   cat domains.txt
   ```

2. Test command trực tiếp:
   ```bash
   php artisan scrape:content -v
   ```

3. Kiểm tra kết nối internet:
   ```bash
   curl -I https://www.7m.com.cn
   ```

### Lỗi: File không được cập nhật

**Kiểm tra:**
1. Quyền file:
   ```bash
   ls -la resources/content/
   chmod -R 755 resources/content/
   chown -R www:www resources/content/
   ```

2. Kiểm tra log xem có lỗi không:
   ```bash
   tail -50 storage/logs/laravel.log | grep -i error
   ```

### Lỗi: Permission denied

**Cách fix:**
```bash
chmod -R 755 storage bootstrap/cache resources/content
chown -R www:www storage bootstrap/cache resources/content
```

### Lỗi: Memory limit

**Cách fix:**
Tăng memory limit trong `php.ini` hoặc trong command:
```bash
php -d memory_limit=256M artisan scrape:content
```

Hoặc trong Baota Panel:
1. Vào PHP 8.2 → 设置 → 配置文件
2. Tìm: `memory_limit = 128M`
3. Đổi thành: `memory_limit = 256M`
4. Restart PHP-FPM

---

## 📊 Monitor và Alert

### 1. Tạo script monitor

Tạo file `check_scrape.sh`:

```bash
#!/bin/bash
# Script kiểm tra scrape có chạy không

CONTENT_DIR="/www/wwwroot/nonexxf7m.com/resources/content"
LOG_FILE="/www/wwwroot/nonexxf7m.com/storage/logs/scrape_check.log"

# Kiểm tra file có được cập nhật trong 2 giờ qua không
LAST_MODIFIED=$(stat -c %Y "$CONTENT_DIR/content_t1.txt" 2>/dev/null)
CURRENT_TIME=$(date +%s)
TIME_DIFF=$((CURRENT_TIME - LAST_MODIFIED))

# 2 giờ = 7200 giây
if [ $TIME_DIFF -gt 7200 ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] WARNING: Content files not updated in 2 hours!" >> "$LOG_FILE"
    # Có thể gửi email hoặc notification ở đây
fi
```

### 2. Kiểm tra log định kỳ

Thêm vào cron job để check log:

```bash
# Chạy mỗi ngày lúc 9h sáng để check log
0 9 * * * tail -100 /www/wwwroot/nonexxf7m.com/storage/logs/laravel.log | grep -i error >> /www/wwwroot/nonexxf7m.com/storage/logs/daily_check.log
```

---

## ✅ Checklist Setup hoàn chỉnh

- [ ] Đã test command `php artisan scrape:content` chạy thành công
- [ ] File `domains.txt` đã có và chứa domain
- [ ] File content đã được tạo trong `resources/content/`
- [ ] Đã cấu hình lịch trình trong `AppServiceProvider.php`
- [ ] Đã clear cache: `php artisan config:clear`
- [ ] Đã tạo cron job trong Baota Panel
- [ ] Cron job chạy mỗi 1 phút
- [ ] Đã test `php artisan schedule:run`
- [ ] Đã test `php artisan schedule:list`
- [ ] Đã đợi vài phút và kiểm tra file có được cập nhật
- [ ] Đã kiểm tra log không có lỗi
- [ ] Website hiển thị nội dung mới

---

## 🎯 Tóm tắt các lệnh quan trọng

```bash
# 1. Chạy scrape thủ công
cd /www/wwwroot/nonexxf7m.com
php artisan scrape:content

# 2. Scrape với n_ty
php artisan scrape:content --n-ty-url="https://news.7m.com.cn/news/20251214/710322.shtml"

# 3. Test scheduler
php artisan schedule:list
php artisan schedule:run

# 4. Xem log
tail -f storage/logs/laravel.log
tail -f storage/logs/scheduler.log

# 5. Kiểm tra file
ls -lah resources/content/
stat resources/content/content_t1.txt

# 6. Clear cache (sau khi sửa AppServiceProvider)
php artisan config:clear
php artisan cache:clear
```

---

## 📞 Hỗ trợ

Nếu gặp vấn đề:
1. Kiểm tra log: `storage/logs/laravel.log`
2. Kiểm tra cron job trong Baota Panel
3. Test command thủ công: `php artisan scrape:content`
4. Kiểm tra quyền file: `resources/content/`

---

## 💡 Tips

1. **Nên dùng log:** Luôn dùng version có log để dễ debug
2. **Test trước:** Luôn test command thủ công trước khi setup cron
3. **Monitor:** Kiểm tra log vài ngày đầu để đảm bảo hoạt động ổn định
4. **Backup:** Có thể backup file content cũ trước khi scrape (tùy chọn)
5. **Tần suất hợp lý:** Không nên scrape quá thường xuyên (mỗi 5-10 phút) để tránh tải server
