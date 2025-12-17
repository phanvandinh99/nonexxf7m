<?php

if (!function_exists('load_content')) {
    /**
     * Load content from a file in the resources/content directory.
     *
     * @param string $filename
     * @param bool $convertLinks If true, convert all <a> href attributes to internal links.
     * @return string
     */
    function load_content($filename, $convertLinks = false)
    {
        $path = resource_path('content/' . $filename);
        
        if (!file_exists($path)) {
            return '';
        }
        
        $content = file_get_contents($path);
        
        // If we don't need to convert links, return the raw content
        if (!$convertLinks) {
            return $content;
        }
        
        // Convert <a> href attributes to internal links
        return convert_external_links_to_internal($content);
    }
}

if (!function_exists('convert_external_links_to_internal')) {
    /**
     * Convert all <a> tags whose href is an external URL into internal links
     * so that navigation always goes through detail.blade.php.
     *
     * @param string $html
     * @return string
     */
    function convert_external_links_to_internal($html)
    {
        // Use DOMDocument to parse HTML
        libxml_use_internal_errors(true);
        $dom = new \DOMDocument();
        
        // Wrap content in a <div> so we can safely parse HTML fragments
        $wrappedHtml = '<div>' . $html . '</div>';
        
        // Load HTML with UTF-8 encoding
        @$dom->loadHTML('<?xml encoding="UTF-8">' . $wrappedHtml, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        
        // Clear libxml errors
        libxml_clear_errors();
        
        // Find all <a> elements
        $xpath = new \DOMXPath($dom);
        $links = $xpath->query('//a[@href]');
        
        foreach ($links as $link) {
            $href = $link->getAttribute('href');
            
            // Skip links that are already internal (/...), or javascript:, #, mailto:, tel:, etc.
            if (empty($href) || 
                str_starts_with($href, '/') || 
                str_starts_with($href, '#') || 
                str_starts_with($href, 'javascript:') ||
                str_starts_with($href, 'mailto:') ||
                str_starts_with($href, 'tel:')) {
                continue;
            }
            
            // Parse URL to extract the path
            $parsedUrl = parse_url($href);
            
            // If there is a path, turn it into an internal route
            if (isset($parsedUrl['path'])) {
                $internalPath = $parsedUrl['path'];
                
                // Append query string if present
                if (isset($parsedUrl['query'])) {
                    $internalPath .= '?' . $parsedUrl['query'];
                }
                
                // Append fragment if present
                if (isset($parsedUrl['fragment'])) {
                    $internalPath .= '#' . $parsedUrl['fragment'];
                }
                
                // Update href to the internal path
                $link->setAttribute('href', $internalPath);
                
                // Remove target="_blank" so the link opens in the same tab
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
     * Returns an internal route that will be handled by the catch‑all route.
     *
     * @param string $key
     * @return string
     */
    function domain($key)
    {
        // Return an internal route instead of the external domain.
        // The URL will be /{key} and the catch‑all route will render detail.blade.php.
        // The visible URL structure is preserved.
        return '/' . $key;
    }
}

if (!function_exists('domain_url')) {
    /**
     * Get full URL with domain and path
     * Returns an internal route that will be handled by the catch‑all route.
     *
     * @param string $key Domain key
     * @param string $path URL path
     * @return string
     */
    function domain_url($key, $path = '')
    {
        // Return an internal route instead of the external domain.
        // The URL will be /{key}/{path} and the catch‑all route will render detail.blade.php.
        // The visible URL structure is preserved.
        
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
     * Fetch content from an iframe URL and post‑process all links
     * so that navigation goes through detail.blade.php.
     * 
     * @param string $url Iframe URL
     * @return string Processed HTML content
     */
    function load_iframe_content($url)
    {
        try {
            // Fetch raw HTML from the given URL
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
                // Fallback: try using cURL
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
                    return '<div style="padding:20px;text-align:center;">Unable to load content</div>';
                }
            }
            
            // Process all links inside the HTML
            return convert_all_links_to_internal($html);
            
        } catch (\Exception $e) {
            return '<div style="padding:20px;text-align:center;">Error while loading content: ' . htmlspecialchars($e->getMessage()) . '</div>';
        }
    }
}

if (!function_exists('convert_all_links_to_internal')) {
    /**
     * Convert ALL links (internal and external) to internal links
     * and adjust images so they render correctly when the domain changes.
     * 
     * @param string $html
     * @return string
     */
    function convert_all_links_to_internal($html)
    {
        // Use DOMDocument to parse HTML
        libxml_use_internal_errors(true);
        $dom = new \DOMDocument();
        
        // Wrap content in a <div> so we can handle HTML fragments
        $wrappedHtml = '<div>' . $html . '</div>';
        
        // Load HTML with UTF-8 encoding
        @$dom->loadHTML('<?xml encoding="UTF-8">' . $wrappedHtml, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        
        // Clear libxml errors
        libxml_clear_errors();
        
        $xpath = new \DOMXPath($dom);
        
        // ========== HANDLE ALL <a> LINKS ==========
        $links = $xpath->query('//a[@href]');
        
        foreach ($links as $link) {
            $href = $link->getAttribute('href');
            
            // Skip special links
            if (empty($href) || 
                str_starts_with($href, '#') || 
                str_starts_with($href, 'javascript:') ||
                str_starts_with($href, 'mailto:') ||
                str_starts_with($href, 'tel:')) {
                continue;
            }
            
            // Handle both internal links (starting with /) and external links
            $internalPath = '';
            
            // Handle protocol‑relative URLs (starting with //)
            if (str_starts_with($href, '//')) {
                $href = 'https:' . $href;
            }
            
            if (str_starts_with($href, '/')) {
                // Internal link: keep the path (it will be handled by the catch‑all route)
                $internalPath = $href;
            } elseif (str_starts_with($href, 'http://') || str_starts_with($href, 'https://')) {
                // External link: parse URL and keep only the path/query/fragment
                $parsedUrl = parse_url($href);
                
                if (isset($parsedUrl['path'])) {
                    $internalPath = $parsedUrl['path'];
                    
                    // Append query string if present
                    if (isset($parsedUrl['query'])) {
                        $internalPath .= '?' . $parsedUrl['query'];
                    }
                    
                    // Append fragment if present
                    if (isset($parsedUrl['fragment'])) {
                        $internalPath .= '#' . $parsedUrl['fragment'];
                    }
                } else {
                    // Nếu không có path, bỏ qua
                    continue;
                }
            } else {
                // Other links (relative paths) – keep as is
                $internalPath = $href;
            }
            
            // Update href with the internal path
            if (!empty($internalPath)) {
                $link->setAttribute('href', $internalPath);
                
                // Remove target="_blank" so the link opens in the same tab
                if ($link->hasAttribute('target')) {
                    $link->removeAttribute('target');
                }
            }
        }
        
        // ========== HANDLE ALL <img> TAGS ==========
        // Convert relative paths to full URLs based on the original domains
        $images = $xpath->query('//img[@src]');
        
        // Base domains for images coming from the original site
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
            
            // Handle protocol‑relative URLs (starting with //)
            if (str_starts_with($src, '//')) {
                $img->setAttribute('src', 'https:' . $src);
            }
            // Handle relative paths starting with / (e.g. /player_data/..., /photo/...)
            elseif (str_starts_with($src, '/') && !str_starts_with($src, '//')) {
                // Choose the most appropriate base domain according to the path
                $baseUrl = 'https://data.7m.com.cn'; // Default
                
                // Player data images live under data.7m.com.cn
                if (str_contains($src, '/player_data/')) {
                    $baseUrl = 'https://data.7m.com.cn';
                }
                // News photos usually live under news.7m.com.cn
                elseif (str_contains($src, '/photo/')) {
                    $baseUrl = 'https://news.7m.com.cn';
                }
                // Generic images / sprites usually live under img.7m.com.cn
                elseif (str_contains($src, '/img/') || str_contains($src, '/nimgs/')) {
                    $baseUrl = 'https://img.7m.com.cn';
                }
                
                // Build a full URL from the chosen base domain
                $img->setAttribute('src', $baseUrl . $src);
            }
            // Keep existing external URLs (http://, https://) as‑is.
            // Keep non‑root‑relative paths (e.g. player_data/...) as‑is.
        }
        
        // ========== HANDLE OTHER URL‑CONTAINING ATTRIBUTES (like inline styles) ==========
        // Rewrite background-image URLs in style attributes if needed
        $elementsWithStyle = $xpath->query('//*[@style]');
        foreach ($elementsWithStyle as $element) {
            $style = $element->getAttribute('style');
            if (!empty($style) && (str_contains($style, 'url(') || str_contains($style, 'url("'))) {
                // Rewrite URLs inside background-image declarations
                $style = preg_replace_callback(
                    '/url\(["\']?([^"\']+)["\']?\)/i',
                    function($matches) {
                        $url = $matches[1];
                        // For protocol‑relative URLs, force https
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
        
        // Return the modified HTML
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
