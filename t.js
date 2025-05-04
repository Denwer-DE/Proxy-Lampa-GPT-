(function () {
    // Переопределение fetch для обхода блокировки TMDb
    const originalFetch = window.fetch;

    window.fetch = function(resource, options) {
        if (typeof resource === 'string') {
            if (resource.includes('image.tmdb.org')) {
                resource = resource.replace('https://image.tmdb.org', 'http://138.199.36.8');
            } else if (resource.includes('api.themoviedb.org')) {
                resource = resource.replace('https://api.themoviedb.org', 'http://108.156.46.87');
            }
        }
        return originalFetch(resource, options);
    };

    // Также переопределим XMLHttpRequest для полной совместимости
    const OriginalXHR = window.XMLHttpRequest;
    function CustomXHR() {
        const xhr = new OriginalXHR();

        const originalOpen = xhr.open;
        xhr.open = function (method, url, async, user, password) {
            if (url.includes('image.tmdb.org')) {
                url = url.replace('https://image.tmdb.org', 'http://138.199.36.8');
            } else if (url.includes('api.themoviedb.org')) {
                url = url.replace('https://api.themoviedb.org', 'http://108.156.46.87');
            }
            return originalOpen.call(this, method, url, async, user, password);
        };

        return xhr;
    }
    window.XMLHttpRequest = CustomXHR;

    console.log('[t.js] TMDb redirect plugin loaded');
})();