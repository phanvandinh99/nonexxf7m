<?php

namespace App\Services;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class ScrapeService
{
    private string $baseUrl = 'https://www.7m.com.cn';
    private string $outputDir;
    private array $classes = ['content_m1', 'content_m2', 'content_t1', 'content_t2', 'content_t3'];
    private array $domains = [];

    public function __construct()
    {
        $this->outputDir = resource_path('content');
        $this->loadDomains();
    }

    /**
     * Load danh sách domain từ file domains.txt
     */
    private function loadDomains(): void
    {
        $domainsFile = base_path('domains.txt');
        
        if (!File::exists($domainsFile)) {
            Log::warning("File domains.txt không tồn tại. Tạo file mẫu...");
            File::put($domainsFile, "# Danh sách domain để thay thế ngẫu nhiên (mỗi domain một dòng)\n# Dòng bắt đầu bằng # sẽ bị bỏ qua\n\n");
            return;
        }

        $lines = File::lines($domainsFile);
        $this->domains = $lines
            ->filter(fn($line) => !empty(trim($line)) && !str_starts_with(trim($line), '#'))
            ->map(fn($line) => trim($line))
            ->toArray();

        if (empty($this->domains)) {
            Log::warning("File domains.txt không chứa domain nào.");
        } else {
            Log::info("Đã tải " . count($this->domains) . " domain từ file domains.txt");
        }
    }

    /**
     * Chuẩn hóa URL: thêm https:// nếu thiếu
     */
    private function normalizeUrl(string $url): string
    {
        if (str_starts_with($url, '//')) {
            return 'https:' . $url;
        } elseif (!str_starts_with($url, 'http://') && !str_starts_with($url, 'https://')) {
            return 'https://' . $url;
        }
        return $url;
    }

    /**
     * Thay thế domain trong các thẻ <a> bằng domain ngẫu nhiên
     */
    private function replaceLinksInHtml(string $html, array $domains): string
    {
        if (empty($domains)) {
            return $html;
        }

        // Sử dụng DOMDocument để parse HTML
        libxml_use_internal_errors(true);
        $dom = new \DOMDocument();
        @$dom->loadHTML('<?xml encoding="UTF-8">' . $html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        
        $xpath = new \DOMXPath($dom);
        $links = $xpath->query('//a[@href]');

        foreach ($links as $link) {
            $href = $link->getAttribute('href');
            $hrefLower = strtolower(trim($href));

            // Bỏ qua javascript:, #, hoặc link không có //
            if (str_starts_with($hrefLower, 'javascript:') || 
                $hrefLower === '#' || 
                str_starts_with($hrefLower, '#') ||
                strpos($href, '//') === false) {
                continue;
            }

            // Tìm vị trí dấu // và dấu / thứ 3
            $doubleSlashPos = strpos($href, '//');
            if ($doubleSlashPos === false) {
                continue;
            }

            $thirdSlashPos = strpos($href, '/', $doubleSlashPos + 2);
            if ($thirdSlashPos === false) {
                continue;
            }

            $path = substr($href, $thirdSlashPos);
            if (!str_starts_with($path, '/')) {
                $path = '/' . $path;
            }

            // Thay domain bằng domain ngẫu nhiên
            $randomDomain = $domains[array_rand($domains)];
            $link->setAttribute('href', "http://{$randomDomain}{$path}");
        }

        // Lấy HTML sau khi thay đổi
        $html = $dom->saveHTML();
        
        // Loại bỏ XML declaration nếu có
        $html = preg_replace('/<\?xml[^>]*\?>/', '', $html);
        
        return $html;
    }

    /**
     * Format HTML với indent
     */
    private function formatHtml(string $html): string
    {
        if (empty(trim($html))) {
            return $html;
        }

        try {
            libxml_use_internal_errors(true);
            $dom = new \DOMDocument();
            $dom->preserveWhiteSpace = false;
            $dom->formatOutput = true;
            @$dom->loadHTML('<?xml encoding="UTF-8">' . $html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
            
            $formatted = $dom->saveHTML();
            
            // Loại bỏ XML declaration
            $formatted = preg_replace('/<\?xml[^>]*\?>/', '', $formatted);
            
            return trim($formatted);
        } catch (\Exception $e) {
            Log::warning("Lỗi khi format HTML: " . $e->getMessage());
            return $html;
        }
    }

    /**
     * Scrape HTML từ URL
     */
    private function scrapeUrl(string $url): ?\DOMDocument
    {
        $normalizedUrl = $this->normalizeUrl($url);
        Log::info("Đang lấy nội dung từ {$normalizedUrl}...");

        try {
            $html = null;

            // Thử dùng cURL trực tiếp trước (nếu có)
            if (function_exists('curl_init')) {
                $ch = curl_init();
                curl_setopt_array($ch, [
                    CURLOPT_URL => $normalizedUrl,
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_FOLLOWLOCATION => true,
                    CURLOPT_TIMEOUT => 30,
                    CURLOPT_CONNECTTIMEOUT => 30,
                    CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                    CURLOPT_SSL_VERIFYPEER => false,
                    CURLOPT_SSL_VERIFYHOST => false,
                    CURLOPT_HTTPHEADER => [
                        'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language: en-US,en;q=0.5',
                        'Connection: keep-alive',
                    ],
                ]);

                $html = curl_exec($ch);
                $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
                $error = curl_error($ch);
                curl_close($ch);

                if ($html === false || !empty($error)) {
                    Log::warning("cURL lỗi: {$error}");
                    $html = null;
                } elseif ($httpCode !== 200) {
                    Log::warning("HTTP Status code: {$httpCode}");
                    $html = null;
                }
            }

            // Nếu cURL không được, dùng file_get_contents
            if ($html === null) {
                $context = stream_context_create([
                    'http' => [
                        'method' => 'GET',
                        'header' => [
                            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                            'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                            'Connection: keep-alive',
                        ],
                        'timeout' => 30,
                        'ignore_errors' => true,
                    ],
                    'ssl' => [
                        'verify_peer' => false,
                        'verify_peer_name' => false,
                    ]
                ]);

                $html = @file_get_contents($normalizedUrl, false, $context);
            }

            if ($html === false || $html === null || empty($html)) {
                Log::warning("Không thể lấy nội dung từ URL");
                return null;
            }

            libxml_use_internal_errors(true);
            $dom = new \DOMDocument();
            @$dom->loadHTML('<?xml encoding="UTF-8">' . $html);
            
            return $dom;
        } catch (\Exception $e) {
            Log::error("Lỗi khi scrape URL: " . $e->getMessage());
            return null;
        }
    }

    /**
     * Scrape và lưu nội dung từ trang chủ
     */
    public function scrapeAndSave(): bool
    {
        if (empty($this->domains)) {
            Log::error("Không có domain nào để thay thế. Vui lòng kiểm tra file domains.txt");
            return false;
        }

        // Tạo thư mục output nếu chưa có
        if (!File::isDirectory($this->outputDir)) {
            File::makeDirectory($this->outputDir, 0755, true);
        }

        $dom = $this->scrapeUrl($this->baseUrl);
        if ($dom === null) {
            Log::error("Không thể lấy nội dung từ URL. Vui lòng kiểm tra lại.");
            return false;
        }

        $xpath = new \DOMXPath($dom);
        $allContent = [];

        // Lấy nội dung từng class
        foreach ($this->classes as $className) {
            $allContent[$className] = [];
            $elements = $xpath->query("//*[contains(@class, '{$className}')]");

            if ($elements->length > 0) {
                Log::info("Tìm thấy {$elements->length} element với class: {$className}");

                foreach ($elements as $element) {
                    $html = $dom->saveHTML($element);
                    $html = $this->replaceLinksInHtml($html, $this->domains);
                    $html = $this->formatHtml($html);
                    $allContent[$className][] = $html;
                }
            } else {
                Log::warning("Không tìm thấy element với class: {$className}");
            }
        }

        // Lưu vào file
        Log::info("Đang lưu nội dung vào các file...");

        foreach ($allContent as $className => $contents) {
            $finalHtml = implode("\n\n", $contents);
            $outputFile = $this->outputDir . '/' . $className . '.txt';

            File::put($outputFile, $finalHtml);

            if (!empty($finalHtml)) {
                Log::info("✓ {$outputFile} (" . strlen($finalHtml) . " ký tự)");
            } else {
                Log::warning("- {$outputFile} (file rỗng)");
            }
        }

        $count = count(array_filter($allContent, fn($c) => !empty($c)));
        Log::info("Hoàn thành! Đã lưu {$count} class có nội dung");

        return true;
    }

    /**
     * Scrape n_ty từ URL cụ thể (cho trang detail)
     */
    public function scrapeNTy(string $url): bool
    {
        if (empty($this->domains)) {
            Log::error("Không có domain nào để thay thế. Vui lòng kiểm tra file domains.txt");
            return false;
        }

        $dom = $this->scrapeUrl($url);
        if ($dom === null) {
            Log::error("Không thể lấy nội dung từ URL. Vui lòng kiểm tra lại.");
            return false;
        }

        $xpath = new \DOMXPath($dom);
        $nTyElements = $xpath->query("//div[contains(@class, 'n_ty')]");

        if ($nTyElements->length > 0) {
            Log::info("Tìm thấy element với class: n_ty");

            $html = $dom->saveHTML($nTyElements->item(0));
            $html = $this->replaceLinksInHtml($html, $this->domains);
            $html = $this->formatHtml($html);

            $outputFile = $this->outputDir . '/n_ty.txt';
            File::put($outputFile, $html);

            Log::info("✓ Đã lưu vào {$outputFile} (" . strlen($html) . " ký tự)");
            return true;
        } else {
            Log::warning("Không tìm thấy element với class: n_ty");
            return false;
        }
    }
}
