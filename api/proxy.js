const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/', createProxyMiddleware({
  target: 'http://example.com', // Replace with a default target if needed
  changeOrigin: true,
  router: (req) => {
    const url = new URL(req.query.url);
    return url.origin;
  },
  pathRewrite: (path, req) => {
    const url = new URL(req.query.url);
    return url.pathname + url.search;
  },
  onError: (err, req, res) => {
    console.error('Proxy Error:', err);
    res.writeHead(500, {
      'Content-Type': 'text/plain',
    });
    res.end('Proxy error: ' + err.message);
  }
}));

module.exports = app;
