@extends('layouts.app')

@section('title', 'Trang chủ - 7M Sports')

@section('content')
    <!-- Hero Section -->
    <section class="hero-section">
        <div class="container">
            <h1 class="hero-title">Thông tin thể thao mới nhất</h1>
            <p class="hero-subtitle">Cập nhật liên tục các trận đấu, kết quả và tin tức thể thao</p>
        </div>
    </section>

    <!-- Live Matches Section -->
    <section class="section live-matches" id="live">
        <div class="container">
            <h2 class="section-title">Trận đấu trực tiếp</h2>
            <div class="matches-grid">
                <div class="match-card">
                    <div class="match-header">
                        <span class="match-status live">LIVE</span>
                        <span class="match-time">45'</span>
                    </div>
                    <div class="match-teams">
                        <div class="team">
                            <span class="team-name">Team A</span>
                            <span class="team-score">2</span>
                        </div>
                        <div class="vs">VS</div>
                        <div class="team">
                            <span class="team-score">1</span>
                            <span class="team-name">Team B</span>
                        </div>
                    </div>
                </div>
                <div class="match-card">
                    <div class="match-header">
                        <span class="match-status live">LIVE</span>
                        <span class="match-time">23'</span>
                    </div>
                    <div class="match-teams">
                        <div class="team">
                            <span class="team-name">Team C</span>
                            <span class="team-score">0</span>
                        </div>
                        <div class="vs">VS</div>
                        <div class="team">
                            <span class="team-score">0</span>
                            <span class="team-name">Team D</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Results Section -->
    <section class="section results" id="results">
        <div class="container">
            <h2 class="section-title">Kết quả gần đây</h2>
            <div class="results-list">
                <div class="result-item">
                    <div class="result-teams">
                        <span class="team-name">Team A</span>
                        <span class="result-score">3 - 1</span>
                        <span class="team-name">Team B</span>
                    </div>
                    <div class="result-date">Hôm qua, 20:00</div>
                </div>
                <div class="result-item">
                    <div class="result-teams">
                        <span class="team-name">Team C</span>
                        <span class="result-score">2 - 2</span>
                        <span class="team-name">Team D</span>
                    </div>
                    <div class="result-date">Hôm qua, 18:30</div>
                </div>
                <div class="result-item">
                    <div class="result-teams">
                        <span class="team-name">Team E</span>
                        <span class="result-score">1 - 0</span>
                        <span class="team-name">Team F</span>
                    </div>
                    <div class="result-date">Hôm qua, 16:00</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Fixtures Section -->
    <section class="section fixtures" id="fixtures">
        <div class="container">
            <h2 class="section-title">Lịch thi đấu</h2>
            <div class="fixtures-list">
                <div class="fixture-item">
                    <div class="fixture-date">Hôm nay, 20:00</div>
                    <div class="fixture-teams">
                        <span class="team-name">Team A</span>
                        <span class="vs">VS</span>
                        <span class="team-name">Team B</span>
                    </div>
                </div>
                <div class="fixture-item">
                    <div class="fixture-date">Ngày mai, 18:00</div>
                    <div class="fixture-teams">
                        <span class="team-name">Team C</span>
                        <span class="vs">VS</span>
                        <span class="team-name">Team D</span>
                    </div>
                </div>
                <div class="fixture-item">
                    <div class="fixture-date">Ngày mai, 20:30</div>
                    <div class="fixture-teams">
                        <span class="team-name">Team E</span>
                        <span class="vs">VS</span>
                        <span class="team-name">Team F</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- News Section -->
    <section class="section news" id="news">
        <div class="container">
            <h2 class="section-title">Tin tức thể thao</h2>
            <div class="news-grid">
                <article class="news-card">
                    <div class="news-image">
                        <div class="news-placeholder">📰</div>
                    </div>
                    <div class="news-content">
                        <h3 class="news-title">Tin tức thể thao mới nhất</h3>
                        <p class="news-excerpt">Cập nhật những thông tin mới nhất về các giải đấu và đội bóng...</p>
                        <span class="news-date">2 giờ trước</span>
                    </div>
                </article>
                <article class="news-card">
                    <div class="news-image">
                        <div class="news-placeholder">⚽</div>
                    </div>
                    <div class="news-content">
                        <h3 class="news-title">Phân tích trận đấu</h3>
                        <p class="news-excerpt">Phân tích chi tiết về các trận đấu quan trọng trong tuần...</p>
                        <span class="news-date">5 giờ trước</span>
                    </div>
                </article>
                <article class="news-card">
                    <div class="news-image">
                        <div class="news-placeholder">🏆</div>
                    </div>
                    <div class="news-content">
                        <h3 class="news-title">Bảng xếp hạng</h3>
                        <p class="news-excerpt">Cập nhật bảng xếp hạng mới nhất của các giải đấu...</p>
                        <span class="news-date">1 ngày trước</span>
                    </div>
                </article>
            </div>
        </div>
    </section>
@endsection
