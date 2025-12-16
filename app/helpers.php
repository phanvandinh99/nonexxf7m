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
