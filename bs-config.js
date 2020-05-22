var proxyMiddleware = require('http-proxy-middleware');
var fallbackMiddleware = require('connect-history-api-fallback');

module.exports = {
    port: 80,
    server: {
        baseDir: './dist/site-for-tp/',
        middleware: {
            1: proxyMiddleware('/api', {
                target: 'localhost:3001',
                changeOrigin: true   // for vhosted sites, changes host header to match to target's host
            }),

            2: fallbackMiddleware({
                index: '/index.html', verbose: true
            })
        }
    },
    ui: {
        port: 3002
    }
};