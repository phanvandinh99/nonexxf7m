<?php

if (!function_exists('load_content')) {
    /**
     * Load content from file in resources/content directory
     * 
     * @param string $filename
     * @param bool $convertLinks Nếu true, chuyển đổi tất cả thẻ <a> href thành internal links
     * @return string
     */
    function load_content($filename, $convertLinks = false)
    {
        $path = resource_path('content/' . $filename);
        
        if (!file_exists($path)) {
            return '';
        }
        
        $content = file_get_contents($path);
        
        // Nếu không cần convert links, trả về ngay
        if (!$convertLinks) {
            return $content;
        }
        
        // Chuyển đổi các thẻ <a> href thành internal links
        return convert_external_links_to_internal($content);
    }
}

if (!function_exists('convert_external_links_to_internal')) {
    /**
     * Chuyển đổi tất cả thẻ <a> có href là external URL thành internal links
     * để điều hướng đến trang detail.blade.php
     *
     * @param string $html
     * @return string
     */
    function convert_external_links_to_internal($html)
    {
        // Sử dụng DOMDocument để parse HTML
        libxml_use_internal_errors(true);
        $dom = new \DOMDocument();
        
        // Wrap content trong một div để xử lý fragment HTML
        $wrappedHtml = '<div>' . $html . '</div>';
        
        // Load HTML với encoding UTF-8
        @$dom->loadHTML('<?xml encoding="UTF-8">' . $wrappedHtml, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        
        // Clear libxml errors
        libxml_clear_errors();
        
        // Tìm tất cả thẻ <a>
        $xpath = new \DOMXPath($dom);
        $links = $xpath->query('//a[@href]');
        
        foreach ($links as $link) {
            $href = $link->getAttribute('href');
            
            // Bỏ qua các link đã là internal (bắt đầu bằng /) hoặc javascript:, #, mailto:, etc.
            if (empty($href) || 
                str_starts_with($href, '/') || 
                str_starts_with($href, '#') || 
                str_starts_with($href, 'javascript:') ||
                str_starts_with($href, 'mailto:') ||
                str_starts_with($href, 'tel:')) {
                continue;
            }
            
            // Parse URL để lấy path
            $parsedUrl = parse_url($href);
            
            // Nếu có path, chuyển thành internal route
            if (isset($parsedUrl['path'])) {
                $internalPath = $parsedUrl['path'];
                
                // Thêm query string nếu có
                if (isset($parsedUrl['query'])) {
                    $internalPath .= '?' . $parsedUrl['query'];
                }
                
                // Thêm fragment nếu có
                if (isset($parsedUrl['fragment'])) {
                    $internalPath .= '#' . $parsedUrl['fragment'];
                }
                
                // Cập nhật href thành internal path
                $link->setAttribute('href', $internalPath);
                
                // Bỏ target="_blank" để link mở trong cùng tab
                if ($link->hasAttribute('target')) {
                    $link->removeAttribute('target');
                }
            }
        }
        
        // Lấy HTML đã được sửa đổi
        $modifiedHtml = '';
        $body = $dom->getElementsByTagName('div')->item(0);
        if ($body) {
            foreach ($body->childNodes as $child) {
                $modifiedHtml .= $dom->saveHTML($child);
            }
        }
        
        return $modifiedHtml ?: $html;
    }
}

if (!function_exists('domain')) {
    /**
     * Get domain URL by key
     * Trả về internal route để route catch-all xử lý
     *
     * @param string $key
     * @return string
     */
    function domain($key)
    {
        // Trả về internal route thay vì external domain
        // URL sẽ là /{key} và route catch-all sẽ trả về detail.blade.php
        // Nhưng URL hiển thị vẫn giữ nguyên
        return '/' . $key;
    }
}

if (!function_exists('domain_url')) {
    /**
     * Get full URL with domain and path
     * Trả về internal route để route catch-all xử lý
     *
     * @param string $key Domain key
     * @param string $path URL path
     * @return string
     */
    function domain_url($key, $path = '')
    {
        // Trả về internal route thay vì external domain
        // URL sẽ là /{key}/{path} và route catch-all sẽ trả về detail.blade.php
        // Nhưng URL hiển thị vẫn giữ nguyên
        
        if (empty($path)) {
            return '/' . $key;
        }
        
        // Remove leading slash from path
        $path = ltrim($path, '/');
        
        return '/' . $key . '/' . $path;
    }
}

if (!function_exists('load_iframe_content')) {
    /**
     * Fetch nội dung từ iframe URL và xử lý tất cả các link để chuyển hướng đến detail.blade.php
     * 
     * @param string $url URL của iframe
     * @return string HTML content đã được xử lý
     */
    function load_iframe_content($url)
    {
        try {
            // Fetch nội dung từ URL
            $context = stream_context_create([
                'http' => [
                    'method' => 'GET',
                    'header' => [
                        'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                        'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8',
                    ],
                    'timeout' => 10,
                    'follow_location' => true,
                    'max_redirects' => 5,
                ],
                'ssl' => [
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                ],
            ]);
            
            $html = @file_get_contents($url, false, $context);
            
            if ($html === false) {
                // Fallback: thử dùng cURL
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $url);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
                curl_setopt($ch, CURLOPT_TIMEOUT, 10);
                curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
                $html = curl_exec($ch);
                $error = curl_error($ch);
                curl_close($ch);
                
                if ($html === false || !empty($error)) {
                    return '<div style="padding:20px;text-align:center;">Không thể tải nội dung</div>';
                }
            }
            
            // Xử lý tất cả các link trong nội dung
            return convert_all_links_to_internal($html);
            
        } catch (\Exception $e) {
            return '<div style="padding:20px;text-align:center;">Lỗi khi tải nội dung: ' . htmlspecialchars($e->getMessage()) . '</div>';
        }
    }
}

if (!function_exists('convert_all_links_to_internal')) {
    /**
     * Chuyển đổi TẤT CẢ các link (cả internal và external) thành internal links
     * và xử lý hình ảnh để hiển thị đúng khi đổi domain
     * 
     * @param string $html
     * @return string
     */
    function convert_all_links_to_internal($html)
    {
        // Sử dụng DOMDocument để parse HTML
        libxml_use_internal_errors(true);
        $dom = new \DOMDocument();
        
        // Wrap content trong một div để xử lý fragment HTML
        $wrappedHtml = '<div>' . $html . '</div>';
        
        // Load HTML với encoding UTF-8
        @$dom->loadHTML('<?xml encoding="UTF-8">' . $wrappedHtml, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        
        // Clear libxml errors
        libxml_clear_errors();
        
        $xpath = new \DOMXPath($dom);
        
        // ========== XỬ LÝ TẤT CẢ CÁC LINK <a> ==========
        $links = $xpath->query('//a[@href]');
        
        foreach ($links as $link) {
            $href = $link->getAttribute('href');
            
            // Bỏ qua các link đặc biệt
            if (empty($href) || 
                str_starts_with($href, '#') || 
                str_starts_with($href, 'javascript:') ||
                str_starts_with($href, 'mailto:') ||
                str_starts_with($href, 'tel:')) {
                continue;
            }
            
            // Xử lý cả internal links (bắt đầu bằng /) và external links
            $internalPath = '';
            
            // Xử lý protocol-relative URLs (bắt đầu bằng //)
            if (str_starts_with($href, '//')) {
                $href = 'https:' . $href;
            }
            
            if (str_starts_with($href, '/')) {
                // Internal link: giữ nguyên path (đã được route catch-all xử lý)
                $internalPath = $href;
            } elseif (str_starts_with($href, 'http://') || str_starts_with($href, 'https://')) {
                // External link: parse URL để lấy path
                $parsedUrl = parse_url($href);
                
                if (isset($parsedUrl['path'])) {
                    $internalPath = $parsedUrl['path'];
                    
                    // Thêm query string nếu có
                    if (isset($parsedUrl['query'])) {
                        $internalPath .= '?' . $parsedUrl['query'];
                    }
                    
                    // Thêm fragment nếu có
                    if (isset($parsedUrl['fragment'])) {
                        $internalPath .= '#' . $parsedUrl['fragment'];
                    }
                } else {
                    // Nếu không có path, bỏ qua
                    continue;
                }
            } else {
                // Các link khác (relative paths), giữ nguyên
                $internalPath = $href;
            }
            
            // Cập nhật href thành internal path
            if (!empty($internalPath)) {
                $link->setAttribute('href', $internalPath);
                
                // Bỏ target="_blank" để link mở trong cùng tab
                if ($link->hasAttribute('target')) {
                    $link->removeAttribute('target');
                }
            }
        }
        
        // ========== XỬ LÝ TẤT CẢ CÁC HÌNH ẢNH <img> ==========
        // Chuyển đổi relative paths thành full URLs từ domain gốc để hiển thị được
        $images = $xpath->query('//img[@src]');
        
        // Domain gốc cho hình ảnh (từ iframe content)
        // Có thể là data.7m.com.cn, news.7m.com.cn, hoặc các domain khác
        $imageBaseUrls = [
            'https://data.7m.com.cn',
            'https://news.7m.com.cn',
            'https://img.7m.com.cn',
            'https://player.7m.com.cn',
        ];
        
        foreach ($images as $img) {
            $src = $img->getAttribute('src');
            
            if (empty($src)) {
                continue;
            }
            
            // Xử lý protocol-relative URLs (bắt đầu bằng //)
            if (str_starts_with($src, '//')) {
                $img->setAttribute('src', 'https:' . $src);
            }
            // Xử lý relative paths bắt đầu bằng / (như /player_data/..., /photo/...)
            elseif (str_starts_with($src, '/') && !str_starts_with($src, '//')) {
                // Xác định domain phù hợp dựa trên path
                $baseUrl = 'https://data.7m.com.cn'; // Default
                
                // Nếu là player_data, dùng data.7m.com.cn
                if (str_contains($src, '/player_data/')) {
                    $baseUrl = 'https://data.7m.com.cn';
                }
                // Nếu là photo, có thể là news.7m.com.cn
                elseif (str_contains($src, '/photo/')) {
                    $baseUrl = 'https://news.7m.com.cn';
                }
                // Nếu là img, dùng img.7m.com.cn
                elseif (str_contains($src, '/img/') || str_contains($src, '/nimgs/')) {
                    $baseUrl = 'https://img.7m.com.cn';
                }
                
                // Chuyển thành full URL từ domain gốc
                $img->setAttribute('src', $baseUrl . $src);
            }
            // GIỮ NGUYÊN external URLs (http://, https://)
            // GIỮ NGUYÊN relative paths không bắt đầu bằng / (như player_data/...)
        }
        
        // ========== XỬ LÝ CÁC THẺ KHÁC CÓ URL (như <link>, <script>, etc.) ==========
        // Xử lý background-image trong style attributes nếu cần
        $elementsWithStyle = $xpath->query('//*[@style]');
        foreach ($elementsWithStyle as $element) {
            $style = $element->getAttribute('style');
            if (!empty($style) && (str_contains($style, 'url(') || str_contains($style, 'url("'))) {
                // Xử lý background-image URLs trong style
                $style = preg_replace_callback(
                    '/url\(["\']?([^"\']+)["\']?\)/i',
                    function($matches) {
                        $url = $matches[1];
                        // Nếu là external URL, giữ nguyên hoặc chuyển đổi tùy nhu cầu
                        if (str_starts_with($url, '//')) {
                            $url = 'https:' . $url;
                        }
                        return 'url("' . $url . '")';
                    },
                    $style
                );
                $element->setAttribute('style', $style);
            }
        }
        
        // Lấy HTML đã được sửa đổi
        $modifiedHtml = '';
        $body = $dom->getElementsByTagName('div')->item(0);
        if ($body) {
            foreach ($body->childNodes as $child) {
                $modifiedHtml .= $dom->saveHTML($child);
            }
        }
        
        return $modifiedHtml ?: $html;
    }
}

if (!function_exists('load_article_from_json')) {
    /**
     * Load article from JSON file based on URL path
     * Cùng URL sẽ luôn trả về cùng một article (deterministic)
     *
     * @param string $urlPath URL path để tạo hash
     * @param string $jsonFile Path to JSON file
     * @return array|null
     */
    function load_article_from_json($urlPath, $jsonFile = 'rich_sports_news_cn_v2.json')
    {
        $jsonPath = resource_path('content/' . $jsonFile);
        
        if (!file_exists($jsonPath)) {
            return null;
        }
        
        $jsonContent = file_get_contents($jsonPath);
        $data = json_decode($jsonContent, true);
        
        if (!isset($data['articles']) || !is_array($data['articles']) || empty($data['articles'])) {
            return null;
        }
        
        $articles = $data['articles'];
        $articleCount = count($articles);
        
        if ($articleCount === 0) {
            return null;
        }
        
        // Tạo hash từ URL path để chọn article một cách deterministic
        // Cùng URL sẽ luôn trả về cùng một article
        $hash = crc32($urlPath);
        $index = abs($hash) % $articleCount;
        
        return $articles[$index];
    }
}
