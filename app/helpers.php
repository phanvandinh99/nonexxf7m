<?php

if (!function_exists('load_content')) {
    /**
     * Load content from file in resources/content directory
     *
     * @param string $filename
     * @return string
     */
    function load_content($filename)
    {
        $path = resource_path('content/' . $filename);
        
        if (file_exists($path)) {
            return file_get_contents($path);
        }
        
        return '';
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
