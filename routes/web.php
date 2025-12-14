<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('index7m');
})->name('home');

// Route catch-all: Tất cả các URL khác đều trả về trang detail
// URL sẽ giữ nguyên nhưng nội dung hiển thị là detail.blade.php
Route::get('/{path}', function ($path) {
    // Bỏ qua các file tĩnh (CSS, JS, images) - Laravel sẽ tự xử lý
    if (preg_match('/\.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$/i', $path)) {
        abort(404);
    }
    
    // Lấy full path và query string để có thể sử dụng cho random content
    $fullPath = request()->path();
    $queryString = request()->getQueryString();
    $fullUrl = $fullPath . ($queryString ? '?' . $queryString : '');
    
    // Load article từ JSON dựa trên URL path
    // Cùng URL sẽ luôn trả về cùng một article
    $article = load_article_from_json($fullPath);
    
    return view('detail', [
        'path' => $fullPath,
        'fullUrl' => $fullUrl,
        'id' => null,
        'article' => $article
    ]);
})->where('path', '.*')->name('detail.catchall');
