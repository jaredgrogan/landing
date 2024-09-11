const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

app.use(cors());

app.use('/', (req, res, next) => {
  let targetUrl = req.query.url;
  
  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    targetUrl = 'https://' + targetUrl;
  }

  createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    secure: false,
    ws: true,
    xfwd: true,
    followRedirects: true,
    pathRewrite: (path, req) => {
      const url = new URL(targetUrl);
      return url.pathname + url.search;
    },
    router: (req) => {
      return targetUrl;
    },
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      delete proxyRes.headers['x-frame-options'];
      delete proxyRes.headers['content-security-policy'];
    },
    onError: (err, req, res) => {
      console.error('Proxy Error:', err);
      res.writeHead(500, {
        'Content-Type': 'text/plain',
      });
      res.end('Proxy error: ' + err.message);
    }
  })(req, res, next);
});

module.exports = app;
