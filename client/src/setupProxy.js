const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function(app) {
    app.use(
    '/openApi',
    createProxyMiddleware({
        target: 'http://www.kopis.or.kr',
        changeOrigin: true,
    })
    )
} 