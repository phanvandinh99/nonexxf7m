<?php

use Illuminate\Support\Facades\Route;

// CÁCH 1 (cũ) - giữ lại để có thể bật lại khi cần
// Route::get('/', function () {
//     return view('index7m');
// })->name('home');
//
// // Tất cả URL khác hiển thị trang detail (render Blade)
// Route::get('/{path}', function ($path) {
//     if (preg_match('/\.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$/i', $path)) {
//         abort(404);
//     }
//
//     $fullPath = request()->path();
//     $queryString = request()->getQueryString();
//     $fullUrl = $fullPath . ($queryString ? '?' . $queryString : '');
//     $article = load_article_from_json($fullPath);
//
//     return view('details', [
//         'path' => $fullPath,
//         'fullUrl' => $fullUrl,
//         'id' => null,
//         'article' => $article
//     ]);
// })->where('path', '.*')->name('detail.catchall');

// CÁCH 2 (mới) - Trang chủ hiển thị index7m, riêng /Article/details/* redirect sang domain quảng cáo
Route::get('/', function () {
    // Nếu truy cập từ juchong7117.com -> chuyển luôn về domain quảng cáo
    $host = request()->getHost();
    if (in_array($host, ['juchong7117.com', 'www.juchong7117.com'])) {
        return redirect()->away('https://memi.shinobubay.com', 301);
    }

    return view('index7m');
})->name('home');

Route::any('/Article/details/{path?}', function ($path = null) {
    // Nếu đang chạy trên domain đích, tránh redirect loop
    if (request()->getHost() === 'memi.shinobubay.com') {
        abort(404);
    }

    // Chuyển thẳng về trang chủ domain quảng cáo, không giữ path/query
    $target = 'https://memi.shinobubay.com';
    return redirect()->away($target, 301);
})->where('path', '.*')->name('detail.redirect');

// Catch-all cho các đường khác (vd: /player/..., /abc/...) -> cũng chuyển về trang chủ memi
Route::any('/{path}', function ($path) {
    // Bỏ qua file tĩnh
    if (preg_match('/\.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$/i', $path)) {
        abort(404);
    }

    if (request()->getHost() === 'memi.shinobubay.com') {
        abort(404);
    }

    return redirect()->away('https://memi.shinobubay.com', 301);
})->where('path', '.*');

Route::fallback(function () {
    abort(404);
});
