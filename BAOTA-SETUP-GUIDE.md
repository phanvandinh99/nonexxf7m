# Hướng dẫn Setup và Deploy lên Baota Panel

## 📋 Yêu cầu hệ thống

- PHP 8.2 trở lên
- Composer 2.2 trở lên
- Nginx hoặc Apache
- Các PHP extensions: fileinfo, openssl, pdo_mysql, mbstring, tokenizer, xml, ctype, json

---

## 🚀 Bước 1: Upload Code lên Server

### Cách 1: Upload qua File Manager (Đơn giản)

1. **Nén project thành file .zip** (trừ `vendor`, `node_modules`, `.git`)
2. Vào Baota Panel → **文件** (File Manager)
3. Điều hướng đến `/www/wwwroot/nonexxf7m.com`
4. Click **↑上传/下载** (Upload/Download)
5. Chọn file `.zip` và upload
6. Click chuột phải vào file `.zip` → **解压** (Extract)
7. Xóa file `.zip` sau khi giải nén

### Cách 2: Upload qua FTP/SFTP (Nhanh cho project lớn)

1. Lấy thông tin FTP từ Baota Panel → **FTP**
2. Dùng FileZilla/WinSCP kết nối và upload toàn bộ project
3. Upload vào `/www/wwwroot/nonexxf7m.com`

---

## 🔧 Bước 2: Cài đặt Composer và Dependencies

### 2.1. Cài đặt/Update Composer

```bash
# Xóa composer cũ (nếu có)
rm -f /usr/bin/composer
rm -f /usr/local/bin/composer

# Cài Composer mới nhất
cd /tmp
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
chmod +x /usr/local/bin/composer

# Kiểm tra
/usr/local/bin/composer --version
```

**Lưu ý:** Nếu gặp lỗi `putenv()`, chạy composer với flag:
```bash
php -d disable_functions= /usr/local/bin/composer [command]
```

### 2.2. Cài đặt Dependencies

```bash
cd /www/wwwroot/nonexxf7m.com

# Cài dependencies (nếu gặp lỗi putenv, thêm flag -d disable_functions=)
php -d disable_functions= /usr/local/bin/composer install --no-dev --optimize-autoloader
```

---

## ⚙️ Bước 3: Cấu hình Laravel

### 3.1. Tạo file .env và Generate Key

```bash
cd /www/wwwroot/nonexxf7m.com

# Tạo .env từ .env.example
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 3.2. Cấu hình file .env

Chỉnh sửa file `.env`:

```bash
nano .env
```

Cấu hình cơ bản:
```env
APP_NAME="7M Sports"
APP_ENV=production
APP_DEBUG=false
APP_URL=http://nonexxf7m.com

# Cache và Session (QUAN TRỌNG - dùng file thay vì database)
CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync

# Database (nếu có)
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=your_database
# DB_USERNAME=your_username
# DB_PASSWORD=your_password
```

Lưu: `Ctrl+X` → `Y` → `Enter`

### 3.3. Set Quyền File

```bash
# Set quyền cho storage và cache
chmod -R 755 storage bootstrap/cache
chown -R www:www storage bootstrap/cache
```

### 3.4. Clear Cache

```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
```

---

## 🌐 Bước 4: Cấu hình Website trong Baota Panel

### 4.1. Tạo Website (Nếu chưa có)

1. Vào **网站** (Website) → **添加站点** (Add Site)
2. Điền thông tin:
   - **域名**: `nonexxf7m.com` (và `www.nonexxf7m.com` nếu cần)
   - **根目录**: `/www/wwwroot/nonexxf7m.com`
   - **PHP版本**: Chọn PHP 8.2
3. Click **提交** (Submit)

### 4.2. Cấu hình Website Directory (QUAN TRỌNG!)

1. Vào **网站** → Click **设置** của `nonexxf7m.com`
2. Click **网站目录** (Website Directory) ở menu trái
3. **QUAN TRỌNG**: Set **运行目录** (Run Directory) = `/public`
4. Click **提交** (Submit)

⚠️ **Nếu không set 运行目录 = `/public`, Laravel sẽ không chạy được!**

### 4.3. Cấu hình URL Rewrite (伪静态)

1. Trong modal cấu hình, click **伪静态** (URL Rewrite)
2. Paste code sau:

```nginx
location / {
    try_files $uri $uri/ /index.php?$query_string;
}

location ~ \.php$ {
    fastcgi_pass unix:/tmp/php-cgi-82.sock;
    fastcgi_index index.php;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    include fastcgi_params;
    fastcgi_param PATH_INFO $fastcgi_path_info;
}

location ~ /\.(?!well-known).* {
    deny all;
}
```

3. Click **提交** (Submit)

### 4.4. Kiểm tra Default Document

1. Click **默认文档** (Default Document)
2. Đảm bảo `index.php` có trong danh sách và ở đầu
3. Nếu không có, thêm `index.php` vào đầu danh sách
4. Click **提交** (Submit)

### 4.5. Restart Nginx

1. Vào **软件商店** → **Nginx** → **服务** → **重启** (Restart)

---

## 🔌 Bước 5: Bật PHP Extensions

1. Vào **软件商店** → **PHP 8.2** → **设置** (Settings)
2. Tab **安装扩展** (Install Extensions)
3. Bật các extension sau:
   - ✅ **fileinfo** (QUAN TRỌNG)
   - ✅ **openssl**
   - ✅ **pdo_mysql** (nếu dùng database)
   - ✅ **mbstring**
   - ✅ **tokenizer**
   - ✅ **xml**
   - ✅ **ctype**
   - ✅ **json**
4. Click **提交** (Submit)
5. **Restart PHP-FPM**: Vào **PHP** → **服务** → **重启** (Restart)

---

## ✅ Bước 6: Kiểm tra và Test

### 6.1. Kiểm tra Routes

```bash
cd /www/wwwroot/nonexxf7m.com
php artisan route:list
```

Kết quả mong đợi:
```
GET|HEAD  /  ...................... home
GET|HEAD  {path} ................ detail.catchall
```

### 6.2. Kiểm tra File

```bash
# Kiểm tra file public/index.php
ls -la public/index.php
# Phải thấy: -rwxr-xr-x 1 www www ...

# Kiểm tra quyền storage
ls -ld storage bootstrap/cache
# Phải thấy: drwxr-xr-x ... www www
```

### 6.3. Test Website

1. Truy cập: `http://nonexxf7m.com`
2. Nếu thấy trang chủ → ✅ **Thành công!**
3. Test trang detail: `http://nonexxf7m.com/news/20251213/710168.shtml`

---

## 🐛 Troubleshooting

### Lỗi 404 Not Found

**Nguyên nhân:**
- Chưa set **运行目录** = `/public`
- Chưa cấu hình **伪静态**
- Nginx chưa restart

**Cách fix:**
1. Kiểm tra lại **运行目录** = `/public` trong Baota Panel
2. Kiểm tra **伪静态** đã cấu hình chưa
3. Restart Nginx

### Lỗi 500 Internal Server Error

**Kiểm tra:**
```bash
# Xem log Laravel
tail -f /www/wwwroot/nonexxf7m.com/storage/logs/laravel.log

# Kiểm tra quyền file
ls -la storage bootstrap/cache
chmod -R 755 storage bootstrap/cache
chown -R www:www storage bootstrap/cache
```

### Lỗi Cache: Database file does not exist

**Nguyên nhân:** `.env` đang dùng `CACHE_DRIVER=database` nhưng không có database

**Cách fix:**
```bash
nano .env
# Đổi: CACHE_DRIVER=file
# Đổi: SESSION_DRIVER=file
php artisan config:clear
php artisan cache:clear
```

### Lỗi Composer: putenv() undefined

**Cách fix:**
```bash
# Chạy composer với flag bỏ qua disable_functions
php -d disable_functions= /usr/local/bin/composer [command]

# Hoặc tạo alias
echo 'alias composer="php -d disable_functions= /usr/local/bin/composer"' >> ~/.bashrc
source ~/.bashrc
```

### Không load được content từ file txt/json

**Kiểm tra:**
```bash
# Kiểm tra quyền thư mục content
ls -la resources/content/
chmod -R 755 resources/content/
```

---

## 📝 Checklist Hoàn thành

- [ ] Code đã upload lên server
- [ ] Composer đã cài đặt và cập nhật
- [ ] Dependencies đã cài đặt (`composer install`)
- [ ] File `.env` đã tạo và cấu hình
- [ ] Application key đã generate
- [ ] Quyền file `storage/` và `bootstrap/cache/` đã set đúng
- [ ] Cache đã clear
- [ ] Website đã tạo trong Baota Panel
- [ ] **运行目录** đã set = `/public`
- [ ] **伪静态** đã cấu hình
- [ ] **默认文档** đã có `index.php`
- [ ] PHP extensions đã bật
- [ ] Nginx đã restart
- [ ] PHP-FPM đã restart
- [ ] Website đã test và chạy thành công

---

## 🎯 Tóm tắt các lệnh quan trọng

```bash
# 1. Cài Composer
cd /tmp
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
chmod +x /usr/local/bin/composer

# 2. Cài dependencies
cd /www/wwwroot/nonexxf7m.com
php -d disable_functions= /usr/local/bin/composer install --no-dev --optimize-autoloader

# 3. Setup Laravel
cp .env.example .env
php artisan key:generate
chmod -R 755 storage bootstrap/cache
chown -R www:www storage bootstrap/cache
php artisan config:clear
php artisan cache:clear

# 4. Kiểm tra
php artisan route:list
ls -la public/index.php
```

---

## 📞 Hỗ trợ

Nếu gặp vấn đề, kiểm tra:
- Log Laravel: `tail -f storage/logs/laravel.log`
- Log Nginx: `tail -f /www/wwwlogs/nonexxf7m.com.log`
- Cấu hình Nginx: `cat /www/server/panel/vhost/nginx/nonexxf7m.com.conf`
