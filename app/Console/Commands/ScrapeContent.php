<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\ScrapeService;

class ScrapeContent extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'scrape:content 
                            {--n-ty-url= : URL để scrape n_ty (ví dụ: https://news.7m.com.cn/news/20251214/710322.shtml)}
                            {--base-url=https://www.7m.com.cn : URL trang chủ để scrape}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Scrape nội dung từ 7m.com.cn và lưu vào resources/content/';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🚀 Bắt đầu scrape nội dung...');
        $this->newLine();

        $scrapeService = new ScrapeService();

        // Scrape n_ty nếu có URL
        $nTyUrl = $this->option('n-ty-url');
        if ($nTyUrl) {
            $this->info("📄 Scraping n_ty từ: {$nTyUrl}");
            $success = $scrapeService->scrapeNTy($nTyUrl);
            
            if ($success) {
                $this->info('✅ Scrape n_ty thành công!');
            } else {
                $this->error('❌ Scrape n_ty thất bại!');
            }
            $this->newLine();
        }

        // Scrape nội dung chính
        $this->info('📄 Scraping nội dung chính từ trang chủ...');
        $success = $scrapeService->scrapeAndSave();

        if ($success) {
            $this->info('✅ Scrape thành công!');
            $this->newLine();
            $this->info('📁 Các file đã được lưu vào: ' . resource_path('content'));
            return Command::SUCCESS;
        } else {
            $this->error('❌ Scrape thất bại!');
            return Command::FAILURE;
        }
    }
}
