<?php

if (!function_exists('load_content')) {
    /**
     * Load content from a file in the resources/content directory.
     *
     * @param string $filename
     * @param bool $convertLinks If true, convert all <a> href attributes to internal links.
     * @param bool $executePHP If true, execute PHP code in the file.
     * @return string
     */
    function load_content($filename, $convertLinks = false, $executePHP = false)
    {
        $path = resource_path('content/' . $filename);
        
        if (!file_exists($path)) {
            return '';
        }
        
        $content = file_get_contents($path);
        
        // If executePHP is true, evaluate PHP code in the content
        if ($executePHP) {
            ob_start();
            eval('?>' . $content);
            $content = ob_get_clean();
        }
        
        // Always add alt attributes to images for SEO (after PHP execution)
        $content = add_alt_to_images($content);
        
        // If we don't need to convert links, return the content
        if (!$convertLinks) {
            return $content;
        }
        
        // Convert <a> href attributes to internal links
        return convert_external_links_to_internal($content);
    }
}

if (!function_exists('add_alt_to_images')) {
    /**
     * Add alt and title attributes to images that don't have them
     * For SEO optimization (Baidu requires alt attributes)
     *
     * @param string $html
     * @return string
     */
    function add_alt_to_images($html)
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
        
        // Find all <img> elements
        $xpath = new \DOMXPath($dom);
        $images = $xpath->query('//img');
        
        foreach ($images as $img) {
            // If image doesn't have alt attribute, try to get from various sources
            if (!$img->hasAttribute('alt') || empty(trim($img->getAttribute('alt')))) {
                $altText = '';
                
                // Try to get alt from title attribute
                if ($img->hasAttribute('title') && !empty(trim($img->getAttribute('title')))) {
                    $altText = trim($img->getAttribute('title'));
                }
                // Try to get from parent <a> tag's title
                elseif ($img->parentNode && $img->parentNode->nodeName === 'a' && $img->parentNode->hasAttribute('title')) {
                    $altText = trim($img->parentNode->getAttribute('title'));
                }
                // Try to get from filename or URL path for better context
                elseif ($img->hasAttribute('src')) {
                    $src = $img->getAttribute('src');
                    
                    // Try to extract meaningful text from URL path
                    if (strpos($src, '/player_data/') !== false) {
                        // Player photos: extract player ID or use generic text
                        if (preg_match('/\/player_data\/(\d+)\//', $src, $matches)) {
                            $altText = '球员照片';
                        } else {
                            $altText = '球员头像';
                        }
                    } elseif (strpos($src, '/transfer/') !== false) {
                        // Transfer related images
                        $altText = '转会信息图片';
                    } elseif (strpos($src, '/team_data/') !== false || strpos($src, '/basketball_team_data/') !== false) {
                        // Team logos
                        if ($img->parentNode && $img->parentNode->nodeName === 'a' && $img->parentNode->hasAttribute('title')) {
                            $altText = trim($img->parentNode->getAttribute('title')) . '队徽';
                        } else {
                            $altText = '球队标志';
                        }
                    } else {
                        // Generic filename fallback
                        $filename = basename($src);
                        $altText = pathinfo($filename, PATHINFO_FILENAME);
                    }
                }
                
                // If still no alt, use default
                if (empty($altText)) {
                    $altText = '7M体育图片';
                }
                
                $img->setAttribute('alt', $altText);
                
                // Also add title if it doesn't exist
                if (!$img->hasAttribute('title') || empty(trim($img->getAttribute('title')))) {
                    $img->setAttribute('title', $altText);
                }
            } else {
                // If alt exists but title doesn't, copy alt to title
                if (!$img->hasAttribute('title') || empty(trim($img->getAttribute('title')))) {
                    $img->setAttribute('title', $img->getAttribute('alt'));
                }
            }
            
            // Add loading="lazy" for images that don't have it (except for above-the-fold images)
            if (!$img->hasAttribute('loading')) {
                // Skip lazy loading for logo and main article images (they should be eager)
                $src = $img->getAttribute('src');
                $shouldBeEager = false;
                if ($src) {
                    // Logo images should be eager
                    if (strpos($src, 'logo') !== false || strpos($src, 'news_logo') !== false) {
                        $shouldBeEager = true;
                    }
                }
                // If parent is in header or main content area, use eager for LCP
                $parent = $img->parentNode;
                while ($parent && $parent->nodeType === XML_ELEMENT_NODE) {
                    $class = $parent->hasAttribute('class') ? $parent->getAttribute('class') : '';
                    if (strpos($class, 'header') !== false || strpos($class, 'logo') !== false) {
                        $shouldBeEager = true;
                        break;
                    }
                    $parent = $parent->parentNode;
                }
                $img->setAttribute('loading', $shouldBeEager ? 'eager' : 'lazy');
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
            
            // Handle javascript:void(0) links with CheckIsPhone - extract URL from onclick
            if (!empty($href) && (str_starts_with($href, 'javascript:') || $href === '#')) {
                $onclick = $link->hasAttribute('onclick') ? $link->getAttribute('onclick') : '';
                
                // Check if onclick contains CheckIsPhone function
                if (strpos($onclick, 'CheckIsPhone') !== false) {
                    // Extract URL from CheckIsPhone parameters (the 5th parameter is usually the default URL)
                    // Pattern: CheckIsPhone('...', '...', '...', '...', 'URL_HERE', ...)
                    if (preg_match("/CheckIsPhone\([^)]*,\s*['\"](https?:\/\/[^'\"]+)['\"]/", $onclick, $matches)) {
                        // Use the extracted URL as href
                        $link->setAttribute('href', $matches[1]);
                        // Keep onclick but ensure return false
                        if (strpos($onclick, 'return false') === false) {
                            $link->setAttribute('onclick', $onclick . '; return false;');
                        }
                        // Add rel="nofollow" and target="_blank" for external links
                        if (!$link->hasAttribute('rel') || strpos($link->getAttribute('rel'), 'nofollow') === false) {
                            $existingRel = $link->hasAttribute('rel') ? $link->getAttribute('rel') . ' ' : '';
                            $link->setAttribute('rel', trim($existingRel . 'nofollow'));
                        }
                        if (!$link->hasAttribute('target')) {
                            $link->setAttribute('target', '_blank');
                        }
                        // Add aria-label if missing
                        if (!$link->hasAttribute('aria-label')) {
                            $linkText = trim($link->textContent);
                            if (empty($linkText)) {
                                // Try to get from title or alt of child img
                                if ($link->hasAttribute('title')) {
                                    $link->setAttribute('aria-label', $link->getAttribute('title'));
                                } elseif ($img = $xpath->query('.//img', $link)->item(0)) {
                                    if ($img->hasAttribute('alt')) {
                                        $link->setAttribute('aria-label', $img->getAttribute('alt'));
                                    } elseif ($img->hasAttribute('title')) {
                                        $link->setAttribute('aria-label', $img->getAttribute('title'));
                                    }
                                }
                            }
                        }
                        continue;
                    }
                }
                
                // For other javascript: links, add rel="nofollow" and change to # if it's void(0)
                if ($href === 'javascript:void(0)' || $href === 'javascript:void(0);') {
                    $link->setAttribute('href', '#');
                }
                if (!$link->hasAttribute('rel') || strpos($link->getAttribute('rel'), 'nofollow') === false) {
                    $existingRel = $link->hasAttribute('rel') ? $link->getAttribute('rel') . ' ' : '';
                    $link->setAttribute('rel', trim($existingRel . 'nofollow'));
                }
                continue;
            }
            
            // Add aria-label for links without visible text (for accessibility)
            $linkText = trim($link->textContent);
            if (empty($linkText) && !$link->hasAttribute('aria-label')) {
                // Try to get from title attribute
                if ($link->hasAttribute('title')) {
                    $link->setAttribute('aria-label', $link->getAttribute('title'));
                } elseif ($link->hasAttribute('alt')) {
                    $link->setAttribute('aria-label', $link->getAttribute('alt'));
                }
            }
            
            // Skip links that are already internal (/...), or #, mailto:, tel:, etc.
            if (empty($href) || 
                str_starts_with($href, '/') || 
                str_starts_with($href, '#') || 
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
                
                // Normalize article URLs: Remove news/YYYYMMDD/ from URL path
                $internalPath = normalize_article_url($internalPath);
                
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
            
            // Process all links and images inside the HTML
            $html = convert_all_links_to_internal($html);
            // Also add alt attributes to images from iframe content
            return add_alt_to_images($html);
            
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
            
            // Add rel="nofollow" to javascript links for SEO
            if (!empty($href) && str_starts_with($href, 'javascript:')) {
                if (!$link->hasAttribute('rel') || strpos($link->getAttribute('rel'), 'nofollow') === false) {
                    $existingRel = $link->hasAttribute('rel') ? $link->getAttribute('rel') . ' ' : '';
                    $link->setAttribute('rel', trim($existingRel . 'nofollow'));
                }
                continue;
            }
            
            // Skip special links
            if (empty($href) || 
                str_starts_with($href, '#') || 
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
            
            // Normalize article URLs: Remove news/YYYYMMDD/ from URL path
            if (!empty($internalPath)) {
                $internalPath = normalize_article_url($internalPath);
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
            
            // Add alt attribute for SEO if missing
            if (!$img->hasAttribute('alt') || empty(trim($img->getAttribute('alt')))) {
                $altText = '';
                
                // Try to get alt from title attribute
                if ($img->hasAttribute('title') && !empty(trim($img->getAttribute('title')))) {
                    $altText = trim($img->getAttribute('title'));
                }
                // Try to get from parent <a> tag's title
                elseif ($img->parentNode && $img->parentNode->nodeName === 'a' && $img->parentNode->hasAttribute('title')) {
                    $altText = trim($img->parentNode->getAttribute('title'));
                }
                // Try to extract meaningful text from URL path
                elseif ($src) {
                    if (strpos($src, '/player_data/') !== false) {
                        // Player photos
                        $altText = '球员照片';
                    } elseif (strpos($src, '/transfer/') !== false || strpos($src, '/transfer/images/') !== false) {
                        // Transfer related images
                        if (strpos($src, 'trlm_c.jpg') !== false) {
                            $altText = '转会列表图片';
                        } else {
                            $altText = '转会信息图片';
                        }
                    } elseif (strpos($src, '/team_data/') !== false || strpos($src, '/basketball_team_data/') !== false) {
                        // Team logos
                        $altText = '球队标志';
                    } elseif ($img->parentNode && $img->parentNode->nodeName === 'a' && $img->parentNode->textContent) {
                        // Try to get from link text
                        $altText = trim($img->parentNode->textContent);
                    } else {
                        $altText = '7M体育图片';
                    }
                } else {
                    $altText = '7M体育图片';
                }
                
                $img->setAttribute('alt', $altText);
                
                // Also add title if it doesn't exist
                if (!$img->hasAttribute('title') || empty(trim($img->getAttribute('title')))) {
                    $img->setAttribute('title', $altText);
                }
            } else {
                // If alt exists but title doesn't, copy alt to title
                if (!$img->hasAttribute('title') || empty(trim($img->getAttribute('title')))) {
                    $img->setAttribute('title', $img->getAttribute('alt'));
                }
            }
            
            // Add loading="lazy" for images from iframe content (they're usually below the fold)
            if (!$img->hasAttribute('loading')) {
                $img->setAttribute('loading', 'lazy');
            }
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

if (!function_exists('load_seodata')) {
    /**
     * Load SEO data from JSON file and render as HTML
     * Items sẽ được chọn dựa trên URL path (deterministic - cùng URL sẽ luôn trả về cùng items)
     * 
     * @param string $jsonFile JSON file name (default: 'seodata.json')
     * @param string $urlPath URL path để tạo hash chọn items (nếu null sẽ lấy từ request)
     * @param int $itemCount Số lượng items cần hiển thị (default: 3)
     * @param string $defaultVersion Default version to replace {{version}} placeholder
     * @return string HTML content
     */
    function load_seodata($jsonFile = 'seodata.json', $urlPath = null, $itemCount = 3, $defaultVersion = '1.0.0')
    {
        $jsonPath = resource_path('content/' . $jsonFile);
        
        if (!file_exists($jsonPath)) {
            return '';
        }
        
        $jsonContent = file_get_contents($jsonPath);
        $data = json_decode($jsonContent, true);
        
        if (!is_array($data) || empty($data)) {
            return '';
        }
        
        // Nếu không có urlPath, lấy từ request hiện tại
        if ($urlPath === null) {
            try {
                // Thử dùng Laravel request helper nếu có
                if (function_exists('request') && request()) {
                    $urlPath = request()->path();
                } else {
                    // Fallback: lấy từ $_SERVER
                    $uri = $_SERVER['REQUEST_URI'] ?? '/';
                    // Loại bỏ query string và fragment
                    $urlPath = parse_url($uri, PHP_URL_PATH) ?? '/';
                    // Loại bỏ leading slash nếu có (để nhất quán với request()->path())
                    $urlPath = ltrim($urlPath, '/');
                    if (empty($urlPath)) {
                        $urlPath = '/';
                    }
                }
            } catch (\Exception $e) {
                $urlPath = '/';
            }
        }
        
        // Tạo hash từ URL để chọn items một cách deterministic
        $hash = crc32($urlPath);
        
        // Chọn items dựa trên hash (cùng URL sẽ luôn trả về cùng items)
        $dataCount = count($data);
        $selectedItems = [];
        
        // Sử dụng hash để tạo các index khác nhau
        for ($i = 0; $i < $itemCount && $i < $dataCount; $i++) {
            // Tạo hash khác nhau cho mỗi item bằng cách kết hợp hash gốc với index
            $itemHash = crc32($urlPath . '_' . $i . '_' . $hash);
            $index = abs($itemHash) % $dataCount;
            
            // Đảm bảo không trùng lặp
            $attempts = 0;
            while (in_array($index, array_column($selectedItems, 'index')) && $attempts < $dataCount) {
                $itemHash = crc32($urlPath . '_' . $i . '_' . $hash . '_' . $attempts);
                $index = abs($itemHash) % $dataCount;
                $attempts++;
            }
            
            $selectedItems[] = [
                'index' => $index,
                'item' => $data[$index]
            ];
        }
        
        $html = '';
        
        foreach ($selectedItems as $selected) {
            $item = $selected['item'];
            // Get version from item or use default
            $version = $item['version'] ?? $defaultVersion;
            // Replace {{version}} if it's still a placeholder
            if ($version === '{{version}}') {
                $version = $defaultVersion;
            }
            
            // Process title - replace {{version}} placeholder
            $title = $item['title'] ?? '';
            $title = str_replace('{{version}}', $version, $title);
            
            // Process description - replace {{version}} placeholder
            $desc = $item['description'] ?? '';
            $desc = str_replace('{{version}}', $version, $desc);
            
            // Shorten title for display (keep full title in title attribute)
            $titleShort = mb_strlen($title) > 30 ? mb_substr($title, 0, 30) . '...' : $title;
            
            // Escape for HTML
            $titleEscaped = htmlspecialchars($title, ENT_QUOTES, 'UTF-8');
            $titleShortEscaped = htmlspecialchars($titleShort, ENT_QUOTES, 'UTF-8');
            $descEscaped = htmlspecialchars($desc, ENT_QUOTES, 'UTF-8');
            $url = htmlspecialchars($item['url'] ?? '#', ENT_QUOTES, 'UTF-8');
            $img = htmlspecialchars($item['image_url'] ?? '', ENT_QUOTES, 'UTF-8');
            
            // Generate alt text for image (use keyword or title for SEO)
            $imageAlt = htmlspecialchars($item['keyword'] ?? $titleShort, ENT_QUOTES, 'UTF-8');
            
            // Format HTML matching the style in n_ty.txt with SEO optimization
            $html .= '                    <div class="ny_yba">' . "\n";
            $html .= '                        <p><a href="' . $url . '" target="_blank" title="' . $titleEscaped . '">' . $titleShortEscaped . '</a></p>' . "\n";
            $html .= '                        <a href="' . $url . '" target="_blank" title="' . $titleEscaped . '"><img src="' . $img . '" alt="' . $imageAlt . '" title="' . $titleEscaped . '" /></a>' . "\n";
            $html .= '                        <div class="ny_bw">' . "\n";
            $html .= '                            ' . $descEscaped . ' ……' . "\n";
            $html .= '                            <a href="' . $url . '" target="_blank" title="' . $titleEscaped . '">[详细]</a>' . "\n";
            $html .= '                        </div>' . "\n";
            $html .= '                    </div>' . "\n\n";
        }
        
        return $html;
    }
}

if (!function_exists('normalize_article_url')) {
    /**
     * Normalize article URL by removing news/YYYYMMDD/ part
     * Converts: /Article/details/news/20251220/710936.shtml
     * To: /Article/details/710936.shtml
     * Also handles: /news/20251220/710936.shtml -> /news/710936.shtml
     * 
     * @param string $urlPath
     * @return string
     */
    function normalize_article_url($urlPath)
    {
        // Pattern 1: /Article/details/news/YYYYMMDD/ID.shtml
        // Replace with: /Article/details/ID.shtml (remove news/YYYYMMDD/)
        $normalized = preg_replace(
            '#/Article/details/news/\d{8}/(\d+\.shtml)#',
            '/Article/details/$1',
            $urlPath
        );
        
        // Pattern 2: /news/YYYYMMDD/ID.shtml
        // Replace with: /Article/details/ID.shtml (convert to Article/details format)
        if ($normalized === $urlPath) {
            $normalized = preg_replace(
                '#/news/\d{8}/(\d+\.shtml)#',
                '/Article/details/$1',
                $urlPath
            );
        }
        
        // Pattern 3: /news/ID.shtml (no date, already normalized from pattern 2 or original)
        // Replace with: /Article/details/ID.shtml (convert to Article/details format)
        if ($normalized === $urlPath) {
            $normalized = preg_replace(
                '#^/news/(\d+\.shtml)$#',
                '/Article/details/$1',
                $urlPath
            );
        }
        
        return $normalized !== null ? $normalized : $urlPath;
    }
}
