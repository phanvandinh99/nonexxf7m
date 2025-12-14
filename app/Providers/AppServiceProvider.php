<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Console\Scheduling\Schedule;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // Cấu hình Task Scheduling
        $this->app->booted(function () {
            $schedule = $this->app->make(Schedule::class);
            
            // Chạy scrape nội dung mỗi giờ
            $schedule->command('scrape:content')
                ->hourly()
                ->withoutOverlapping()
                ->runInBackground();
        });
    }
}
