/**
 * SEO-friendly event handlers
 * Replaces javascript:void(0) with data-action attributes
 */

document.addEventListener('DOMContentLoaded', function() {
    // Handle setHome action
    document.querySelectorAll('[data-action="setHome"]').forEach(function(el) {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof setHome === 'function') {
                setHome(this);
            }
        });
    });

    // Handle addFavor action
    document.querySelectorAll('[data-action="addFavor"]').forEach(function(el) {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof addFavor === 'function') {
                addFavor();
            }
        });
    });

    // Handle menu toggle
    document.querySelectorAll('[data-toggle="menu"]').forEach(function(el) {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            var target = this.getAttribute('data-target');
            if (typeof showMenu === 'function') {
                showMenu(this.id, target, -27, true);
            }
        });

        el.addEventListener('mouseout', function() {
            var target = this.getAttribute('data-target');
            if (typeof closeMenu === 'function') {
                closeMenu(target);
            }
        });
    });

    // Handle social login
    document.querySelectorAll('[data-action="weibo-login"]').forEach(function(el) {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof weibologin === 'function') {
                weibologin();
            }
        });
    });

    document.querySelectorAll('[data-action="qq-login"]').forEach(function(el) {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof qqlogin === 'function') {
                qqlogin();
            }
        });
    });

    // Handle logout
    var logoutLink = document.querySelector('[data-action="logout"]');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof logout === 'function') {
                logout();
            }
        });
    }
});

